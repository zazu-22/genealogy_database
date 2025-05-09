/**
 * Unit tests for CypherBuilder utility
 */
import { CypherBuilder } from '../../../src/utils/cypher-builder';
import * as neo4jConfig from '../../../src/config/neo4j';

// Mock the Neo4j driver and session
jest.mock('../../../src/config/neo4j', () => ({
  getNeo4jDriver: jest.fn(),
  initNeo4jDriver: jest.fn()
}));

// Mock the logger
jest.mock('../../../src/utils/logger', () => ({
  logger: {
    info: jest.fn(),
    error: jest.fn(),
    debug: jest.fn(),
    warn: jest.fn()
  }
}));

describe('CypherBuilder', () => {
  let cypherBuilder: CypherBuilder;
  let mockSession: any;
  let mockDriver: any;

  beforeEach(() => {
    // Set up mock session
    mockSession = {
      run: jest.fn(),
      close: jest.fn().mockResolvedValue(undefined)
    };

    // Set up mock driver
    mockDriver = {
      session: jest.fn().mockReturnValue(mockSession)
    };

    // Mock the Neo4j driver
    (neo4jConfig.getNeo4jDriver as jest.Mock).mockReturnValue(mockDriver);

    // Create a new CypherBuilder instance
    cypherBuilder = new CypherBuilder('test_db');
  });

  it('should create a session with the correct database', () => {
    cypherBuilder.getSession();
    
    expect(mockDriver.session).toHaveBeenCalledWith({
      database: 'test_db'
    });
  });

  it('should execute a Cypher query successfully', async () => {
    // Mock the session run result
    const mockRecord1 = {
      keys: ['p'],
      get: jest.fn().mockImplementation(key => {
        if (key === 'p') {
          return {
            properties: { name: 'John', age: 30 },
            identity: { toString: () => '1' },
            labels: ['Person']
          };
        }
        return null;
      })
    };
    
    const mockResult = {
      records: [mockRecord1],
      summary: {
        counters: {
          updates: () => ({
            nodesCreated: 1,
            nodesDeleted: 0,
            relationshipsCreated: 0,
            relationshipsDeleted: 0,
            propertiesSet: 2
          })
        }
      }
    };
    
    mockSession.run.mockResolvedValue(mockResult);

    // Execute a query
    const result = await cypherBuilder.executeQuery(
      'CREATE (p:Person {name: $name, age: $age}) RETURN p',
      { name: 'John', age: 30 }
    );

    // Verify session methods were called
    expect(mockSession.run).toHaveBeenCalledWith(
      'CREATE (p:Person {name: $name, age: $age}) RETURN p',
      { name: 'John', age: 30 }
    );
    expect(mockSession.close).toHaveBeenCalled();

    // Verify result transformation
    expect(result.records).toHaveLength(1);
    expect(result.records[0]).toEqual({
      p: {
        id: '1',
        name: 'John',
        age: 30,
        labels: ['Person']
      }
    });
    
    expect(result.summary.counters).toEqual({
      nodesCreated: 1,
      nodesDeleted: 0,
      relationshipsCreated: 0,
      relationshipsDeleted: 0,
      propertiesSet: 2
    });
  });

  it('should handle query execution errors', async () => {
    // Mock the session run to throw an error
    mockSession.run.mockRejectedValue(new Error('Query execution error'));

    // Attempt to execute a query and expect it to fail
    await expect(cypherBuilder.executeQuery('INVALID QUERY')).rejects.toThrow('Query execution error');

    // Verify session close was called even in case of error
    expect(mockSession.close).toHaveBeenCalled();
  });

  it('should create a Person node', async () => {
    // Mock the session run result
    const mockRecord = {
      keys: ['p'],
      get: jest.fn().mockImplementation(key => {
        if (key === 'p') {
          return {
            properties: { id: '123', name: 'John', age: 30 },
            identity: { toString: () => '1' },
            labels: ['Person']
          };
        }
        return null;
      })
    };
    
    const mockResult = {
      records: [mockRecord],
      summary: {
        counters: {
          updates: () => ({
            nodesCreated: 1,
            nodesDeleted: 0,
            relationshipsCreated: 0,
            relationshipsDeleted: 0,
            propertiesSet: 3
          })
        }
      }
    };
    
    mockSession.run.mockResolvedValue(mockResult);

    // Create a Person node
    const result = await cypherBuilder.createPerson({
      id: '123',
      name: 'John',
      age: 30
    });

    // Verify the correct query was executed
    expect(mockSession.run).toHaveBeenCalledWith(
      expect.stringContaining('CREATE (p:Person $properties)'),
      { properties: { id: '123', name: 'John', age: 30 } }
    );

    // Verify the result
    expect(result.records[0].p).toEqual({
      id: '123',
      name: 'John',
      age: 30,
      labels: ['Person']
    });
  });

  it('should find a Person by ID', async () => {
    // Mock the session run result
    const mockRecord = {
      keys: ['p'],
      get: jest.fn().mockImplementation(key => {
        if (key === 'p') {
          return {
            properties: { id: '123', name: 'John', age: 30 },
            identity: { toString: () => '1' },
            labels: ['Person']
          };
        }
        return null;
      })
    };
    
    const mockResult = {
      records: [mockRecord],
      summary: {
        counters: {
          updates: () => ({
            nodesCreated: 0,
            nodesDeleted: 0,
            relationshipsCreated: 0,
            relationshipsDeleted: 0,
            propertiesSet: 0
          })
        }
      }
    };
    
    mockSession.run.mockResolvedValue(mockResult);

    // Find a Person by ID
    const result = await cypherBuilder.findPersonById('123');

    // Verify the correct query was executed
    expect(mockSession.run).toHaveBeenCalledWith(
      expect.stringContaining('MATCH (p:Person {id: $id})'),
      { id: '123' }
    );

    // Verify the result
    expect(result.records[0].p).toEqual({
      id: '123',
      name: 'John',
      age: 30,
      labels: ['Person']
    });
  });

  it('should create a relationship between two Person nodes', async () => {
    // Mock the session run result
    const mockRecord = {
      keys: ['p1', 'r', 'p2'],
      get: jest.fn().mockImplementation(key => {
        if (key === 'p1') {
          return {
            properties: { id: '123', name: 'John' },
            identity: { toString: () => '1' },
            labels: ['Person']
          };
        } else if (key === 'p2') {
          return {
            properties: { id: '456', name: 'Jane' },
            identity: { toString: () => '2' },
            labels: ['Person']
          };
        } else if (key === 'r') {
          return {
            properties: { since: 2010 },
            identity: { toString: () => '3' },
            type: 'MARRIED_TO',
            start: { toString: () => '1' },
            end: { toString: () => '2' }
          };
        }
        return null;
      })
    };
    
    const mockResult = {
      records: [mockRecord],
      summary: {
        counters: {
          updates: () => ({
            nodesCreated: 0,
            nodesDeleted: 0,
            relationshipsCreated: 1,
            relationshipsDeleted: 0,
            propertiesSet: 1
          })
        }
      }
    };
    
    mockSession.run.mockResolvedValue(mockResult);

    // Create a relationship
    const result = await cypherBuilder.createRelationship(
      '123',
      '456',
      'MARRIED_TO',
      { since: 2010 }
    );

    // Verify the correct query was executed
    expect(mockSession.run).toHaveBeenCalledWith(
      expect.stringContaining('CREATE (p1)-[r:MARRIED_TO $properties]->(p2)'),
      {
        person1Id: '123',
        person2Id: '456',
        properties: { since: 2010 }
      }
    );

    // Verify the result contains the relationship
    expect(result.records[0].r).toEqual({
      id: '3',
      since: 2010,
      type: 'MARRIED_TO',
      start: '1',
      end: '2'
    });
  });
});