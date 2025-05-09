/**
 * Utility for building Cypher queries for Neo4j
 * Provides type-safe query building for common operations
 */
import { Driver, Session } from 'neo4j-driver';
import { getNeo4jDriver } from '../config/neo4j';
import { logger } from './logger';

/**
 * Parameter type for Cypher queries
 */
export type CypherParams = Record<string, any>;

/**
 * Execution result type
 */
export interface QueryResult<T = any> {
  records: T[];
  summary: {
    counters: {
      nodesCreated: number;
      nodesDeleted: number;
      relationshipsCreated: number;
      relationshipsDeleted: number;
      propertiesSet: number;
    };
  };
}

/**
 * Base Cypher query builder
 */
export class CypherBuilder {
  private driver: Driver;
  private database: string;

  /**
   * Constructor
   * @param database Database name (optional, uses default if not specified)
   */
  constructor(database?: string) {
    this.driver = getNeo4jDriver();
    this.database = database || 'genealogy';
  }

  /**
   * Get a new session
   */
  public getSession(): Session {
    return this.driver.session({ database: this.database });
  }

  /**
   * Execute a Cypher query
   * @param cypher Cypher query
   * @param params Query parameters
   * @returns Query result
   */
  public async executeQuery<T = any>(cypher: string, params: CypherParams = {}): Promise<QueryResult<T>> {
    const session = this.getSession();
    
    try {
      logger.debug(`Executing Cypher query: ${cypher}`);
      const result = await session.run(cypher, params);
      
      return {
        records: result.records.map(record => {
          const obj: Record<string, any> = {};
          
          record.keys.forEach(key => {
            obj[key.toString()] = this.transformValue(record.get(key));
          });
          
          return obj as T;
        }),
        summary: {
          counters: {
            nodesCreated: result.summary.counters.updates().nodesCreated,
            nodesDeleted: result.summary.counters.updates().nodesDeleted,
            relationshipsCreated: result.summary.counters.updates().relationshipsCreated,
            relationshipsDeleted: result.summary.counters.updates().relationshipsDeleted,
            propertiesSet: result.summary.counters.updates().propertiesSet,
          },
        },
      };
    } catch (error) {
      logger.error('Error executing Cypher query:', error);
      throw error;
    } finally {
      await session.close();
    }
  }

  /**
   * Transform Neo4j values to JavaScript values
   * @param value Neo4j value
   * @returns Transformed JavaScript value
   */
  private transformValue(value: any): any {
    if (value === null || value === undefined) {
      return value;
    }
    
    // Handle Neo4j types
    if (value.constructor.name === 'Node') {
      const result = { ...value.properties, id: value.identity.toString() };
      
      // Add labels
      if (value.labels && value.labels.length > 0) {
        result.labels = value.labels;
      }
      
      return result;
    }
    
    if (value.constructor.name === 'Relationship') {
      return {
        ...value.properties,
        id: value.identity.toString(),
        type: value.type,
        start: value.start.toString(),
        end: value.end.toString(),
      };
    }
    
    if (value.constructor.name === 'Path') {
      return {
        start: this.transformValue(value.start),
        end: this.transformValue(value.end),
        segments: value.segments.map((segment: any) => ({
          start: this.transformValue(segment.start),
          relationship: this.transformValue(segment.relationship),
          end: this.transformValue(segment.end),
        })),
      };
    }
    
    // Handle arrays
    if (Array.isArray(value)) {
      return value.map(item => this.transformValue(item));
    }
    
    // Handle objects
    if (typeof value === 'object') {
      const result: Record<string, any> = {};
      
      for (const key in value) {
        result[key] = this.transformValue(value[key]);
      }
      
      return result;
    }
    
    return value;
  }

  /**
   * Create a Person node
   * @param properties Person properties
   * @returns Query result with created Person
   */
  public async createPerson(properties: Record<string, any>): Promise<QueryResult> {
    const cypher = `
      CREATE (p:Person $properties)
      RETURN p
    `;
    
    return this.executeQuery(cypher, { properties });
  }

  /**
   * Find a Person node by ID
   * @param id Person ID
   * @returns Query result with found Person
   */
  public async findPersonById(id: string): Promise<QueryResult> {
    const cypher = `
      MATCH (p:Person {id: $id})
      RETURN p
    `;
    
    return this.executeQuery(cypher, { id });
  }

  /**
   * Create a relationship between two Person nodes
   * @param person1Id First person ID
   * @param person2Id Second person ID
   * @param type Relationship type
   * @param properties Relationship properties
   * @returns Query result with created relationship
   */
  public async createRelationship(
    person1Id: string,
    person2Id: string,
    type: string,
    properties: Record<string, any>
  ): Promise<QueryResult> {
    const cypher = `
      MATCH (p1:Person {id: $person1Id})
      MATCH (p2:Person {id: $person2Id})
      CREATE (p1)-[r:${type} $properties]->(p2)
      RETURN p1, r, p2
    `;
    
    return this.executeQuery(cypher, { person1Id, person2Id, properties });
  }

  /**
   * Find relationships for a Person
   * @param personId Person ID
   * @param relationshipType Optional relationship type
   * @param direction Relationship direction ('OUTGOING', 'INCOMING', or 'BOTH')
   * @returns Query result with relationships
   */
  public async findRelationships(
    personId: string,
    relationshipType?: string,
    direction: 'OUTGOING' | 'INCOMING' | 'BOTH' = 'BOTH'
  ): Promise<QueryResult> {
    let cypher: string;
    const params = { personId };
    
    const typeFilter = relationshipType ? `[:${relationshipType}]` : '';
    
    if (direction === 'OUTGOING') {
      cypher = `
        MATCH (p:Person {id: $personId})-[r${typeFilter}]->(other)
        RETURN p, r, other
      `;
    } else if (direction === 'INCOMING') {
      cypher = `
        MATCH (p:Person {id: $personId})<-[r${typeFilter}]-(other)
        RETURN other, r, p
      `;
    } else {
      cypher = `
        MATCH (p:Person {id: $personId})-[r${typeFilter}]-(other)
        RETURN p, r, other
      `;
    }
    
    return this.executeQuery(cypher, params);
  }
}