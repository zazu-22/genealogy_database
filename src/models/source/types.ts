/**
 * Source and Citation entity types and interfaces
 * Implements Elizabeth Shown Mills' evidence evaluation framework
 */

import { 
  BaseEntity, 
  Clarity, 
  CitationQuality, 
  Contemporaneity, 
  EvidenceType,
  InformantKnowledge, 
  Originality 
} from '../common/types';

/**
 * Source types classification
 */
export enum SourceType {
  VITAL_RECORD = "VITAL_RECORD",           // Birth, marriage, death certificates
  CENSUS = "CENSUS",                       // Census records
  CHURCH_RECORD = "CHURCH_RECORD",         // Church records (baptism, etc.)
  MILITARY_RECORD = "MILITARY_RECORD",     // Military service records
  LAND_RECORD = "LAND_RECORD",             // Deeds, land grants, etc.
  PROBATE_RECORD = "PROBATE_RECORD",       // Wills, estate inventories
  COURT_RECORD = "COURT_RECORD",           // Court proceedings
  NEWSPAPER = "NEWSPAPER",                 // Newspaper articles
  BOOK = "BOOK",                           // Published books
  MANUSCRIPT = "MANUSCRIPT",               // Unpublished manuscripts
  PERSONAL_COMMUNICATION = "PERSONAL_COMMUNICATION", // Letters, emails
  GRAVESTONE = "GRAVESTONE",               // Cemetery markers
  PHOTOGRAPH = "PHOTOGRAPH",               // Photographs
  DIGITAL_RESOURCE = "DIGITAL_RESOURCE",   // Online databases
  ARTIFACT = "ARTIFACT",                   // Physical objects
  OTHER = "OTHER"                          // Other types
}

/**
 * Source format classification
 */
export enum SourceFormat {
  TEXT = "TEXT",                           // Textual record
  IMAGE = "IMAGE",                         // Image
  AUDIO = "AUDIO",                         // Audio recording
  VIDEO = "VIDEO",                         // Video recording
  PHYSICAL_ARTIFACT = "PHYSICAL_ARTIFACT", // Physical object
  MIXED = "MIXED"                          // Multiple formats
}

/**
 * Information quality assessment 
 */
export enum InformationQuality {
  HIGH = "HIGH",                           // High quality information
  MEDIUM = "MEDIUM",                       // Medium quality information
  LOW = "LOW",                             // Low quality information
  UNKNOWN = "UNKNOWN"                      // Cannot determine quality
}

/**
 * Publication information for a source
 */
export interface PublicationInfo {
  publisher?: string;                      // Publisher name
  place?: string;                          // Publication place
  date?: string;                           // Publication date
  volume?: string;                         // Volume number/name
  issue?: string;                          // Issue number/name
  pages?: string;                          // Page numbers
}

/**
 * Repository information for a source
 */
export interface RepositoryInfo {
  name: string;                            // Repository name
  location?: string;                       // Repository location
  collection?: string;                     // Collection name
  callNumber?: string;                     // Call number/identifier
  url?: string;                            // URL if applicable
}

/**
 * Source content information
 */
export interface SourceContent {
  text?: string;                           // Transcription or extracted text
  translation?: string;                    // Translated content if applicable
  abstract?: string;                       // Abstract/summary
  digitalObjects?: DigitalObject[];        // Associated digital objects
}

/**
 * Digital object attached to a source
 */
export interface DigitalObject {
  type: string;                            // Type of digital object
  filename: string;                        // Filename
  uri: string;                             // URI to access the object
  description?: string;                    // Description of the object
}

/**
 * Access information for a source
 */
export interface AccessInfo {
  accessed?: Date;                         // When source was accessed
  restrictions?: string;                   // Access restrictions if any
  rights?: string;                         // Rights information
}

/**
 * Source classification according to evidence evaluation standards
 */
export interface SourceClassification {
  originality: Originality;                // Original, derivative, etc.
  informantKnowledge: InformantKnowledge;  // Primary, secondary
  format: SourceFormat;                    // Format of source
  contemporaneity: Contemporaneity;        // Time proximity to events
  clarity: Clarity;                        // Legibility/understandability
}

/**
 * Source reliability assessment
 */
export interface SourceReliability {
  score: number;                           // 0-100 reliability score
  evidenceType: EvidenceType[];            // Direct, indirect, negative
  informationQuality: InformationQuality;  // Quality assessment
  analysisNotes?: string;                  // Researcher's reliability analysis
  conflictsWith?: string[];                // IDs of conflicting sources
}

/**
 * Research note attached to a source
 */
export interface SourceNote {
  text: string;                            // Note content
  type: string;                            // Type of note
  created: Date;                           // When note was created
  lastModified: Date;                      // When note was last modified
}

/**
 * Source entity representing research materials
 */
export interface Source extends BaseEntity {
  type: SourceType;                        // Type of source
  title: string;                           // Source title
  creator?: string[];                      // Authors/creators
  publication?: PublicationInfo;           // Publication details
  repository?: RepositoryInfo;             // Where source is held
  classification: SourceClassification;    // Evidence-based classification
  content?: SourceContent;                 // Source content with attachments
  access?: AccessInfo;                     // Access information
  reliability: SourceReliability;          // Overall source reliability
  notes?: SourceNote[];                    // Research notes
}

/**
 * Citation element for structured citations
 */
export interface CitationElement {
  field: string;                           // Element name
  value: string;                           // Element value
  required: boolean;                       // If element is required
}

/**
 * Citation template for standardized citations
 */
export interface CitationTemplate {
  id: string;                              // Template identifier
  name: string;                            // Template name
  sourceType: SourceType;                  // Applicable source type
  elements: CitationElement[];             // Required and optional elements
  format: string;                          // Format string for template
  millsReference?: string;                 // Reference to Mills citation guide
}

/**
 * Citation entity connecting information to sources
 */
export interface Citation extends BaseEntity {
  sourceId: string;                        // Reference to Source
  citationTemplate?: string;               // Citation template used
  elements: {                              // Citation elements
    [field: string]: string;
  };
  quality: CitationQuality;                // Citation quality assessment
  notes?: string;                          // Citation notes
  formatted?: {                            // Formatted citations
    fullStyle: string;                     // Full citation
    shortStyle: string;                    // Short citation
    bibStyle: string;                      // Bibliography style
  };
}