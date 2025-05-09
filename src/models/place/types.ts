/**
 * Place entity types and interfaces
 * Extends GEDCOM X Place model with temporal jurisdictions
 */

import { 
  BaseEntity, 
  ConfidenceLevel, 
  SourcedAttribute, 
  TemporalRange 
} from '../common/types';

/**
 * Types of places
 */
export enum PlaceType {
  COUNTRY = "COUNTRY",
  STATE_PROVINCE = "STATE_PROVINCE",
  COUNTY = "COUNTY",
  CITY = "CITY",
  TOWN = "TOWN",
  TOWNSHIP = "TOWNSHIP",
  VILLAGE = "VILLAGE",
  BOROUGH = "BOROUGH",
  DISTRICT = "DISTRICT",
  WARD = "WARD",
  PARISH = "PARISH",
  ADDRESS = "ADDRESS",
  BUILDING = "BUILDING",
  FARM = "FARM",
  CEMETERY = "CEMETERY",
  LANDMARK = "LANDMARK",
  NATURAL_FEATURE = "NATURAL_FEATURE",
  INDIGENOUS_AREA = "INDIGENOUS_AREA",
  MILITARY = "MILITARY",
  OTHER = "OTHER"
}

/**
 * A name for a place
 */
export interface PlaceName {
  name: string;                  // Place name
  language: string;              // Language of name
  official: boolean;             // Official designation
  timeframe?: TemporalRange;     // When name was used
  citations: string[];           // Supporting citations
}

/**
 * A jurisdictional hierarchy for a place
 */
export interface PlaceHierarchy {
  path: string[];                // Array of parent place IDs
  jurisdictionType: string;      // Type of jurisdiction
  timeframe: TemporalRange;      // When hierarchy was valid
  citations: string[];           // Supporting citations
}

/**
 * Geographic coordinates
 */
export interface GeoCoordinate {
  latitude: number;              // Latitude in decimal degrees
  longitude: number;             // Longitude in decimal degrees
  accuracy?: number;             // Accuracy in meters if known
  timeframe?: TemporalRange;     // When coordinates were valid
  citations: string[];           // Supporting citations
}

/**
 * Geographic boundary
 */
export interface GeoBoundary {
  type: string;                  // Type of boundary
  coordinates: number[][][];     // GeoJSON-style coordinates
  timeframe: TemporalRange;      // When boundary was valid
  citations: string[];           // Supporting citations
}

/**
 * A research note attached to a place
 */
export interface PlaceNote {
  text: string;                  // Note content
  type: string;                  // Type of note
  citations?: string[];          // Supporting citations
  created: Date;                 // When note was created
  lastModified: Date;            // When note was last modified
}

/**
 * Historical context for a place
 */
export interface HistoricalContext {
  description: string;           // Description of historical context
  timeframe: TemporalRange;      // Time period for context
  citations: string[];           // Supporting citations
}

/**
 * Place entity representing locations with hierarchical structure
 */
export interface Place extends BaseEntity {
  names: SourcedAttribute<PlaceName>[]; // Names with temporal context
  type: PlaceType;               // Type of location
  hierarchies: PlaceHierarchy[]; // Jurisdictional hierarchies
  coordinates?: GeoCoordinate[]; // Geocoordinates
  boundaries?: GeoBoundary[];    // Geographical boundaries
  timeframe?: TemporalRange;     // When place existed
  historicalContext?: HistoricalContext[]; // Historical context
  notes?: PlaceNote[];        // Research notes
  confidence: ConfidenceLevel;   // Certainty assessment
  evidenceAnalysis?: {           // Evidence analysis metadata
    conflictingEvidence: boolean; // Has conflicting evidence
    unresolvedConflicts: boolean; // Has unresolved conflicts
    gpsCompliant: boolean;       // Meets GPS standards
  };
}