/**
 * Event entity types and interfaces
 * Extends GEDCOM X Event model with evidence attribution
 */

import { 
  BaseEntity, 
  ConfidenceLevel, 
  PrivacyLevel, 
  SourcedAttribute,
  TemporalDate
} from '../common/types';

/**
 * Types of events
 */
export enum EventType {
  // Vital events
  BIRTH = "BIRTH",
  DEATH = "DEATH",
  MARRIAGE = "MARRIAGE",
  DIVORCE = "DIVORCE",
  ADOPTION = "ADOPTION",
  
  // Life events
  BAPTISM = "BAPTISM",
  CONFIRMATION = "CONFIRMATION",
  BAR_MITZVAH = "BAR_MITZVAH",
  BAT_MITZVAH = "BAT_MITZVAH",
  GRADUATION = "GRADUATION",
  RETIREMENT = "RETIREMENT",
  
  // Residence events
  RESIDENCE = "RESIDENCE",
  IMMIGRATION = "IMMIGRATION",
  EMIGRATION = "EMIGRATION",
  NATURALIZATION = "NATURALIZATION",
  
  // Professional events
  OCCUPATION = "OCCUPATION",
  MILITARY_SERVICE = "MILITARY_SERVICE",
  EDUCATION = "EDUCATION",
  
  // Administrative events
  CENSUS = "CENSUS",
  TAX_ASSESSMENT = "TAX_ASSESSMENT",
  LAND_TRANSACTION = "LAND_TRANSACTION",
  WILL_CREATION = "WILL_CREATION",
  PROBATE = "PROBATE",
  
  OTHER = "OTHER"
}

/**
 * Place reference for an event
 */
export interface PlaceReference {
  placeId: string;               // Reference to Place
  name?: string;                 // Display name for place
  confidence: ConfidenceLevel;   // Confidence in place reference
}

/**
 * A participant in an event
 */
export interface EventParticipant {
  entityId: string;              // Person or Relationship ID
  role: string;                  // Role in event
  primary: boolean;              // Is primary participant
  attributes?: SourcedAttribute<any>[]; // Role-specific attributes
  citations: string[];           // Supporting citations for participation
  confidence: ConfidenceLevel;   // Confidence in participation
}

/**
 * A research note attached to an event
 */
export interface EventNote {
  text: string;                  // Note content
  type: string;                  // Type of note
  citations?: string[];          // Supporting citations
  created: Date;                 // When note was created
  lastModified: Date;            // When note was last modified
}

/**
 * Event entity representing occurrences in time
 */
export interface Event extends BaseEntity {
  type: EventType;               // Type of event
  date: TemporalDate;            // When event occurred
  place?: SourcedAttribute<PlaceReference>; // Where event occurred
  participants: EventParticipant[]; // Who was involved
  attributes?: SourcedAttribute<any>[]; // Event characteristics
  notes?: EventNote[];        // Research notes
  confidence: ConfidenceLevel;   // Certainty assessment
  visibility: PrivacyLevel;      // Privacy controls
  evidenceAnalysis?: {           // Evidence analysis metadata
    conflictingEvidence: boolean; // Has conflicting evidence
    unresolvedConflicts: boolean; // Has unresolved conflicts
    gpsCompliant: boolean;       // Meets GPS standards
  };
}