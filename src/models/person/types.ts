/**
 * Person entity types and interfaces
 * Extends GEDCOM X Person model with evidence-based attributes
 */

import { 
  BaseEntity, 
  ConfidenceLevel, 
  PrivacyLevel, 
  SourcedAttribute, 
  TemporalRange 
} from '../common/types';

/**
 * Types of names a person might have
 */
export enum NameType {
  BIRTH = "BIRTH",               // Name given at birth
  MARRIED = "MARRIED",           // Married name
  RELIGIOUS = "RELIGIOUS",       // Religious name
  LEGAL_CHANGE = "LEGAL_CHANGE", // Name changed legally
  ALIAS = "ALIAS",               // Alternative name
  NICKNAME = "NICKNAME",         // Informal name
  ANGLICIZED = "ANGLICIZED",     // Anglicized version
  PHONETIC = "PHONETIC",         // Phonetic representation
  OTHER = "OTHER"                // Other type of name
}

/**
 * Gender type classification
 */
export enum GenderType {
  MALE = "MALE",
  FEMALE = "FEMALE",
  NON_BINARY = "NON_BINARY",
  UNKNOWN = "UNKNOWN"
}

/**
 * A name part (given name, surname, etc.)
 */
export interface NamePart {
  type: string;                  // Type of name part
  value: string;                 // The actual text
  qualified?: boolean;           // If qualified by additional info
}

/**
 * A specific form of a name
 */
export interface NameForm {
  fullText: string;              // Full text of the name
  parts: NamePart[];             // Component parts
  language?: string;             // Language of the name
  script?: string;               // Script used for the name
}

/**
 * A name for a person
 */
export interface Name {
  nameType: NameType;            // Type of name
  nameForms: NameForm[];         // Different forms of the name
  preferred: boolean;            // Is preferred display name
  timeframe?: TemporalRange;     // When this name was used
  culture?: string;              // Cultural context
  confidence: ConfidenceLevel;   // Certainty assessment
}

/**
 * Person's gender with evidence attribution
 */
export interface Gender {
  type: GenderType;              // Gender type
  citations: string[];           // Supporting citations
  confidence: ConfidenceLevel;   // Certainty assessment
  notes?: string;                // Notes about the gender
}

/**
 * A fact about a person (birth, death, etc.)
 */
export interface Fact {
  type: string;                  // Type of fact
  date?: SourcedAttribute<string>; // When the fact occurred
  place?: SourcedAttribute<string>; // Where the fact occurred
  value?: string;                // Value of the fact if applicable
  qualifiers?: {                 // Additional qualifiers
    [key: string]: string;
  }; 
  citations: string[];           // Supporting citations
  confidence: ConfidenceLevel;   // Certainty assessment
  primary: boolean;              // Is primary fact of this type
  notes?: string;                // Notes about the fact
}

/**
 * A research note attached to a person
 */
export interface PersonNote {
  text: string;                  // Note content
  type: string;                  // Type of note
  citations?: string[];          // Supporting citations
  created: Date;                 // When note was created
  lastModified: Date;            // When note was last modified
}

/**
 * Person entity representing an individual
 */
export interface Person extends BaseEntity {
  private?: boolean;             // Limited distribution flag
  living?: boolean;              // Living status
  principal?: boolean;           // Principal person flag
  gender?: Gender;               // Gender with evidence
  names: SourcedAttribute<Name>[]; // Multiple name forms with sources
  facts: Fact[];                 // Life events/facts with sources
  identifiers?: {                // External system identifiers
    [system: string]: string;
  };
  notes?: PersonNote[];        // Research notes
  confidenceScore?: number;      // Overall confidence (0-100)
  visibility: PrivacyLevel;      // Privacy control level
  evidenceAnalysis?: {           // Evidence analysis metadata
    conflictingEvidence: boolean; // Has conflicting evidence
    unresolvedConflicts: boolean; // Has unresolved conflicts
    gpsCompliant: boolean;       // Meets GPS standards
  };
}