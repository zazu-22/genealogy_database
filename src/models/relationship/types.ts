/**
 * Relationship entity types and interfaces
 * Extends GEDCOM X Relationship model with evidence attribution
 */

import { 
  BaseEntity, 
  ConfidenceLevel, 
  PrivacyLevel, 
  SourcedAttribute, 
  TemporalRange 
} from '../common/types';
import { Fact } from '../person/types';

/**
 * Types of relationships between persons
 */
export enum RelationshipType {
  // Familial relationships
  BIRTH_PARENT_CHILD = "BIRTH_PARENT_CHILD",
  ADOPTIVE_PARENT_CHILD = "ADOPTIVE_PARENT_CHILD",
  STEP_PARENT_CHILD = "STEP_PARENT_CHILD",
  FOSTER_PARENT_CHILD = "FOSTER_PARENT_CHILD",
  MARRIAGE = "MARRIAGE",
  DOMESTIC_PARTNERSHIP = "DOMESTIC_PARTNERSHIP",
  SIBLING = "SIBLING",
  HALF_SIBLING = "HALF_SIBLING",
  
  // Non-familial relationships
  GODPARENT_GODCHILD = "GODPARENT_GODCHILD",
  NEIGHBOR = "NEIGHBOR",
  WITNESS = "WITNESS",
  EMPLOYER_EMPLOYEE = "EMPLOYER_EMPLOYEE",
  TEACHER_STUDENT = "TEACHER_STUDENT",
  MASTER_APPRENTICE = "MASTER_APPRENTICE",
  ASSOCIATE = "ASSOCIATE",
  FRIEND = "FRIEND",
  
  OTHER = "OTHER"
}

/**
 * A member in a relationship
 */
export interface RelationshipMember {
  personId: string;              // Reference to Person
  role: string;                  // Role in relationship
  order?: number;                // Order when relevant
  citations: string[];           // Supporting citations for this role
  confidence: ConfidenceLevel;   // Confidence in this person's role
}

/**
 * A research note attached to a relationship
 */
export interface RelationshipNote {
  text: string;                  // Note content
  type: string;                  // Type of note
  citations?: string[];          // Supporting citations
  created: Date;                 // When note was created
  lastModified: Date;            // When note was last modified
}

/**
 * Relationship entity connecting persons with typed, temporal relationships
 */
export interface Relationship extends BaseEntity {
  type: RelationshipType;        // Type of relationship
  persons: RelationshipMember[]; // People in the relationship
  timeframe?: TemporalRange;     // When relationship existed
  facts: Fact[];                 // Facts about the relationship
  attributes?: SourcedAttribute<any>[]; // Relationship characteristics
  confidence: ConfidenceLevel;   // Certainty assessment
  notes?: RelationshipNote[];        // Research notes
  visibility: PrivacyLevel;      // Privacy controls
  evidenceAnalysis?: {           // Evidence analysis metadata
    conflictingEvidence: boolean; // Has conflicting evidence
    unresolvedConflicts: boolean; // Has unresolved conflicts
    gpsCompliant: boolean;       // Meets GPS standards
  };
}