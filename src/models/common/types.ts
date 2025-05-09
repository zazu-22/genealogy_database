/**
 * Common types and interfaces used throughout the Genealogy Database System
 * Based on GEDCOM X model with extensions for genealogical proof standard
 */

/**
 * Represents a level of confidence for a genealogical assertion
 */
export enum ConfidenceLevel {
  VERY_LOW = "VERY_LOW",       // Little evidence, highly uncertain
  LOW = "LOW",                 // Some evidence but significant doubts
  MEDIUM = "MEDIUM",           // Reasonable evidence with some doubts
  HIGH = "HIGH",               // Strong evidence with minor doubts
  VERY_HIGH = "VERY_HIGH"      // Overwhelming evidence, minimal doubts
}

/**
 * Source originality classification
 */
export enum Originality {
  ORIGINAL = "ORIGINAL",             // Created at/near time of event
  DERIVATIVE = "DERIVATIVE",         // Copy, transcription, or extract
  AUTHORED_WORK = "AUTHORED_WORK",   // Compiled, processed, or interpreted
  UNKNOWN = "UNKNOWN"                // Originality cannot be determined
}

/**
 * Informant knowledge classification
 */
export enum InformantKnowledge {
  PRIMARY = "PRIMARY",              // Firsthand knowledge of event
  SECONDARY = "SECONDARY",          // Knowledge obtained from others
  UNDETERMINED = "UNDETERMINED",    // Cannot determine knowledge level
  MIXED = "MIXED"                   // Contains both primary and secondary
}

/**
 * Time proximity of source to events described
 */
export enum Contemporaneity {
  CONTEMPORARY = "CONTEMPORARY",    // Created at time of event
  RECENT = "RECENT",                // Created within decade of event
  DISTANT = "DISTANT",              // Created long after event
  UNKNOWN = "UNKNOWN"               // Timeframe cannot be determined
}

/**
 * Evidence type classification
 */
export enum EvidenceType {
  DIRECT = "DIRECT",                // Directly answers research question
  INDIRECT = "INDIRECT",            // Contributes but doesn't directly answer
  NEGATIVE = "NEGATIVE",            // Absence of expected information
  CONTRADICTORY = "CONTRADICTORY"   // Conflicts with other evidence
}

/**
 * Clarity of source information
 */
export enum Clarity {
  HIGH = "HIGH",                    // Clear, legible, unambiguous
  MEDIUM = "MEDIUM",                // Some issues but mostly clear
  LOW = "LOW",                      // Significant clarity problems
  VARIABLE = "VARIABLE"             // Quality varies within source
}

/**
 * Research note types
 */
export enum NoteType {
  RESEARCH_LOG = "RESEARCH_LOG",           // Documentation of research process
  ANALYSIS = "ANALYSIS",                   // Analysis of evidence
  CONFLICT_RESOLUTION = "CONFLICT_RESOLUTION", // Conflict resolution notes
  CONCLUSION = "CONCLUSION",               // Conclusion notes
  TODO = "TODO",                           // Research to-do items
  GENERAL = "GENERAL"                      // General notes
}

/**
 * Research task status
 */
export enum TaskStatus {
  PLANNED = "PLANNED",              // Task planned but not started
  IN_PROGRESS = "IN_PROGRESS",      // Task in progress
  COMPLETED = "COMPLETED",          // Task completed
  BLOCKED = "BLOCKED",              // Task blocked
  CANCELLED = "CANCELLED"           // Task cancelled
}

/**
 * Date type classification
 */
export enum DateType {
  EXACT = "EXACT",                  // Exact date known
  APPROXIMATE = "APPROXIMATE",      // Approximate date ("about 1850")
  RANGE = "RANGE",                  // Range of dates
  BEFORE = "BEFORE",                // Before a certain date
  AFTER = "AFTER",                  // After a certain date
  BETWEEN = "BETWEEN",              // Between two dates
  CALCULATED = "CALCULATED",        // Calculated from other information
  UNKNOWN = "UNKNOWN"               // Date unknown
}

/**
 * Calendar system
 */
export enum CalendarSystem {
  GREGORIAN = "GREGORIAN",          // Gregorian calendar
  JULIAN = "JULIAN",                // Julian calendar
  HEBREW = "HEBREW",                // Hebrew calendar
  ISLAMIC = "ISLAMIC",              // Islamic calendar
  FRENCH_REPUBLICAN = "FRENCH_REPUBLICAN", // French Republican calendar
  OTHER = "OTHER"                   // Other calendar system
}

/**
 * Citation quality assessment
 */
export enum CitationQuality {
  COMPLETE = "COMPLETE",            // Complete citation with all elements
  PARTIAL = "PARTIAL",              // Partial citation missing some elements
  MINIMAL = "MINIMAL"               // Minimal citation with basic information
}

/**
 * Privacy level for entities
 */
export enum PrivacyLevel {
  PUBLIC = "PUBLIC",                // Visible to all users
  PRIVATE = "PRIVATE",              // Visible only to creator
  RESTRICTED = "RESTRICTED"         // Visible to select users
}

/**
 * Represents a timestamp with metadata
 */
export interface Timestamp {
  date: Date;                       // The date and time
  user: string;                     // User who created/modified
}

/**
 * Base interface for all database entities
 */
export interface BaseEntity {
  id: string;                       // Unique identifier
  created: Timestamp;               // Creation metadata
  lastModified: Timestamp;          // Modification metadata
  version: number;                  // Version tracking
}

/**
 * Represents a reference to an external system
 */
export interface ExternalIdentifier {
  system: string;                   // External system identifier
  value: string;                    // ID value in that system
}

/**
 * Interface for tracking Genealogical Proof Standard compliance
 */
export interface GPSCompliance {
  exhaustiveResearch: boolean;      // Reasonably exhaustive research
  completeCitations: boolean;       // Complete and accurate citations
  skillfulAnalysis: boolean;        // Analysis and correlation of evidence 
  conflictResolution: boolean;      // Resolution of conflicting evidence
  soundConclusion: boolean;         // Soundly reasoned conclusion
  complianceNotes: string;          // Notes on GPS compliance
}

/**
 * A wrapper for any attribute with source attribution and temporal context
 */
export interface SourcedAttribute<T> {
  value: T;                         // Attribute value
  citations: string[];              // References to Citation IDs
  timeframe?: TemporalRange;        // When attribute was valid
  confidence: ConfidenceLevel;      // Certainty assessment
  analysis?: string;                // Research analysis
  conflictResolution?: string;      // If resolving conflicts
}

/**
 * Complex date handling with support for uncertainty
 */
export interface TemporalDate {
  type: DateType;                   // Exact, range, etc.
  value: string;                    // Date value(s)
  calendar: CalendarSystem;         // Calendar system
  confidence: ConfidenceLevel;      // Certainty assessment
  display: string;                  // Formatted display
}

/**
 * Represents a temporal range
 */
export interface TemporalRange {
  startDate: TemporalDate;          // Start of range
  endDate?: TemporalDate;           // End of range
  ongoing: boolean;                 // If still continuing
}