/**
 * Research process entity types and interfaces
 * Implements Genealogical Proof Standard methodology
 */

import { 
  BaseEntity, 
  ConfidenceLevel, 
  EvidenceType, 
  GPSCompliance,
  NoteType, 
  TaskStatus 
} from '../common/types';

/**
 * Research status
 */
export enum ResearchStatus {
  NOT_STARTED = "NOT_STARTED",       // Research not yet started
  IN_PROGRESS = "IN_PROGRESS",       // Research in progress
  INCONCLUSIVE = "INCONCLUSIVE",     // Research inconclusive
  PARTIALLY_RESOLVED = "PARTIALLY_RESOLVED", // Partially resolved
  RESOLVED = "RESOLVED",             // Fully resolved
  DISPROVEN = "DISPROVEN"            // Question disproven
}

/**
 * Source evaluation assessment categories
 */
export enum EvaluationCategory {
  INFORMANT = "INFORMANT",           // Informant knowledge assessment
  INFORMATION = "INFORMATION",       // Information quality assessment
  EVIDENCE = "EVIDENCE",             // Evidence type assessment
  CORRELATION = "CORRELATION",       // Correlation with other evidence
  RESOLUTION = "RESOLUTION"          // Conflict resolution assessment
}

/**
 * Source reference
 */
export interface SourceReference {
  sourceId: string;                  // Reference to Source
  citationId: string;                // Reference to Citation
  notes?: string;                    // Notes about this reference
}

/**
 * Research task
 */
export interface ResearchTask {
  id: string;                        // Unique identifier
  description: string;               // Task description
  sources: SourceReference[];        // Sources to consult
  status: TaskStatus;                // Task status
  priority: string;                  // Task priority
  assignedTo?: string;               // Person assigned to task
  dueDate?: Date;                    // When task is due
  results?: string;                  // Research findings
  followupTasks?: string[];          // IDs of followup tasks
  created: Date;                     // When task was created
  lastModified: Date;                // When task was last modified
}

/**
 * Evidence for a research question
 */
export interface Evidence {
  id: string;                        // Unique identifier
  type: EvidenceType;                // Direct, indirect, negative
  sourceId: string;                  // Source reference
  citationId: string;                // Citation reference
  relevance: string;                 // How evidence relates to question
  analysis: string;                  // Analysis of evidence quality
  weight: number;                    // Evidence weight (0-100)
  evaluations: {                     // Detailed evaluations
    [category in EvaluationCategory]: number; // 0-100 score
  };
  conflicts?: string[];              // IDs of conflicting evidence
}

/**
 * Hypothesis for a research question
 */
export interface Hypothesis {
  id: string;                        // Unique identifier
  statement: string;                 // Hypothesis statement
  supportingEvidence: Evidence[];    // Supporting evidence
  conflictingEvidence: Evidence[];   // Conflicting evidence
  conflictResolution?: string;       // How conflicts were resolved
  analysis: string;                  // Analysis of evidence
  confidence: ConfidenceLevel;       // Assessment of likelihood
  created: Date;                     // When hypothesis was created
  lastModified: Date;                // When hypothesis was modified
}

/**
 * Conclusion for a research question
 */
export interface ConclusionElement {
  statement: string;                 // Conclusion statement
  evidenceSummary: string;           // Summary of supporting evidence
  conflictResolution?: string;       // How conflicts were resolved
  confidence: ConfidenceLevel;       // Overall confidence level
  citations: string[];               // Supporting citations
}

/**
 * Research note
 */
export interface ResearchNote {
  id: string;                        // Unique identifier
  text: string;                      // Note content
  type: NoteType;                    // Type of note
  status: ResearchStatus;            // Research status
  sources?: string[];                // Supporting sources
  created: Date;                     // When note was created
  lastModified: Date;                // When note was last modified
}

/**
 * Research log entry
 */
export interface ResearchLogEntry {
  id: string;                        // Unique identifier
  date: Date;                        // Date of research
  researcher: string;                // Person who did research
  description: string;               // Description of what was done
  sources: SourceReference[];        // Sources consulted
  findings: string;                  // What was found
  nextSteps?: string;                // Next steps to take
  relatedQuestions?: string[];       // Related research questions
}

/**
 * Research question entity
 */
export interface ResearchQuestion extends BaseEntity {
  question: string;                  // Question text
  entities: {                        // Related entities
    persons?: string[];              // Person IDs
    relationships?: string[];        // Relationship IDs
    places?: string[];               // Place IDs
    events?: string[];               // Event IDs
  };
  hypotheses: Hypothesis[];          // Possible answers
  status: ResearchStatus;            // Research status
  plan: ResearchTask[];              // Research plan
  logEntries?: ResearchLogEntry[];   // Research log entries
  conclusion?: ConclusionElement;    // Final reasoned conclusion
  gpsCompliance: GPSCompliance;      // GPS compliance assessment
  priority: string;                  // Research priority
  tags?: string[];                   // Organizational tags
  notes?: ResearchNote[];            // Research notes
}