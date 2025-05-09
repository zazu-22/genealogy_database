# Data Model Documentation

This document details the core data models for the Genealogy Database System, explaining their structure, relationships, and the design principles behind them.

## Core Entities

### Person Entity

The Person entity represents an individual in the genealogical database with support for uncertain, conflicting, or evolving information.

```typescript
interface Person {
  id: string;                     // Unique identifier
  names: SourcedAttribute<Name>[];  // Multiple name forms with sources
  events: SourcedEvent[];         // Life events with sources
  attributes: SourcedAttribute<any>[]; // Characteristics with temporal context
  identifiers: ExternalIdentifier[]; // IDs in external systems
  notes: ResearchNote[];          // Research notes
  confidenceScore: number;        // Overall confidence (0-100)
  visibility: PrivacyLevel;       // Privacy controls
  created: Timestamp;             // Creation metadata
  lastModified: Timestamp;        // Modification metadata
  version: number;                // Version tracking
}

interface Name {
  nameType: NameType;             // Type (birth, married, alias, etc.)
  givenNames: string[];           // Multiple given names
  surnames: string[];             // Multiple surnames
  prefixes: string[];             // Titles, honorifics
  suffixes: string[];             // Generational, credentials
  preferred: boolean;             // Is preferred display name
  timeframe: TemporalRange;       // When this name was used
  culture: string;                // Cultural context
  confidence: ConfidenceLevel;    // Certainty assessment
}

enum NameType {
  BIRTH,
  MARRIED,
  RELIGIOUS,
  LEGAL_CHANGE,
  ALIAS,
  NICKNAME,
  ANGLICIZED,
  PHONETIC,
  OTHER
}
```

### Relationship Entity

The Relationship entity connects persons with typed, temporal connections that support both familial and non-familial relationships.

```typescript
interface Relationship {
  id: string;                     // Unique identifier
  type: RelationshipType;         // Type of relationship
  persons: RelationshipMember[];  // People in the relationship
  timeframe: TemporalRange;       // When relationship existed
  events: SourcedEvent[];         // Events in the relationship
  attributes: SourcedAttribute<any>[]; // Relationship characteristics
  confidence: ConfidenceLevel;    // Certainty assessment
  notes: ResearchNote[];          // Research notes
  visibility: PrivacyLevel;       // Privacy controls
  created: Timestamp;             // Creation metadata
  lastModified: Timestamp;        // Modification metadata
  version: number;                // Version tracking
}

interface RelationshipMember {
  personId: string;               // Reference to Person
  role: string;                   // Role in relationship
  order: number;                  // Order when relevant
}

enum RelationshipType {
  // Familial relationships
  BIRTH_PARENT_CHILD,
  ADOPTIVE_PARENT_CHILD,
  STEP_PARENT_CHILD,
  FOSTER_PARENT_CHILD,
  MARRIAGE,
  DOMESTIC_PARTNERSHIP,
  SIBLING,
  HALF_SIBLING,
  
  // Non-familial relationships
  GODPARENT_GODCHILD,
  NEIGHBOR,
  WITNESS,
  EMPLOYER_EMPLOYEE,
  TEACHER_STUDENT,
  MASTER_APPRENTICE,
  ASSOCIATE,
  FRIEND,
  
  OTHER
}
```

### Place Entity

The Place entity represents locations with hierarchical structure, historical context, and support for changing jurisdictions.

```typescript
interface Place {
  id: string;                     // Unique identifier
  names: SourcedAttribute<PlaceName>[]; // Names with temporal context
  type: PlaceType;                // Type of location
  hierarchies: PlaceHierarchy[];  // Jurisdictional hierarchies
  coordinates: GeoCoordinate[];   // Geocoordinates
  boundaries: GeoBoundary[];      // Geographical boundaries
  timeframe: TemporalRange;       // When place existed
  notes: ResearchNote[];          // Research notes
  confidence: ConfidenceLevel;    // Certainty assessment
  created: Timestamp;             // Creation metadata
  lastModified: Timestamp;        // Modification metadata
  version: number;                // Version tracking
}

interface PlaceName {
  name: string;                   // Place name
  language: string;               // Language of name
  official: boolean;              // Official designation
  timeframe: TemporalRange;       // When name was used
}

interface PlaceHierarchy {
  path: string[];                 // Array of parent place IDs
  jurisdictionType: string;       // Type of jurisdiction
  timeframe: TemporalRange;       // When hierarchy was valid
}
```

### Event Entity

The Event entity represents occurrences in time with place context, participants, and source attribution.

```typescript
interface Event {
  id: string;                     // Unique identifier
  type: EventType;                // Type of event
  date: TemporalDate;             // When event occurred
  place: SourcedAttribute<PlaceReference>; // Where event occurred
  participants: EventParticipant[]; // Who was involved
  attributes: SourcedAttribute<any>[]; // Event characteristics
  notes: ResearchNote[];          // Research notes
  confidence: ConfidenceLevel;    // Certainty assessment
  visibility: PrivacyLevel;       // Privacy controls
  created: Timestamp;             // Creation metadata
  lastModified: Timestamp;        // Modification metadata
  version: number;                // Version tracking
}

interface EventParticipant {
  entityId: string;               // Person or Relationship ID
  role: string;                   // Role in event
  attributes: SourcedAttribute<any>[]; // Role-specific attributes
}

enum EventType {
  // Vital events
  BIRTH,
  DEATH,
  MARRIAGE,
  DIVORCE,
  ADOPTION,
  
  // Life events
  BAPTISM,
  CONFIRMATION,
  BAR_MITZVAH,
  GRADUATION,
  RETIREMENT,
  
  // Residence events
  RESIDENCE,
  IMMIGRATION,
  EMIGRATION,
  NATURALIZATION,
  
  // Professional events
  OCCUPATION,
  MILITARY_SERVICE,
  EDUCATION,
  
  // Administrative events
  CENSUS,
  TAX_ASSESSMENT,
  LAND_TRANSACTION,
  WILL_CREATION,
  PROBATE,
  
  OTHER
}
```

### Source Entity

The Source entity represents research materials with classification based on Elizabeth Shown Mills' evidence evaluation framework, repository information, and citation details.

```typescript
interface Source {
  id: string;                     // Unique identifier
  type: SourceType;               // Type of source
  title: string;                  // Source title
  creator: string[];              // Authors/creators
  publication: PublicationInfo;   // Publication details
  repository: RepositoryInfo;     // Where source is held
  classification: SourceClassification; // Evidence-based classification
  content: SourceContent;         // Source content with digital attachments
  access: AccessInfo;             // Access information
  reliability: SourceReliability; // Overall source reliability assessment
  notes: ResearchNote[];          // Research notes
  created: Timestamp;             // Creation metadata
  lastModified: Timestamp;        // Modification metadata
  version: number;                // Version tracking
}

interface SourceClassification {
  originality: Originality;       // Original, derivative, etc.
  informantKnowledge: InformantKnowledge; // Primary, secondary
  format: SourceFormat;           // Format of source
  contemporaneity: Contemporaneity; // Time proximity to events described
  clarity: Clarity;               // Legibility/understandability
}

interface SourceReliability {
  score: number;                  // 0-100 reliability score
  evidenceType: EvidenceType[];   // Direct, indirect, negative
  informationQuality: InformationQuality; // Quality assessment
  analysisNotes: string;          // Researcher's reliability analysis
  conflictsWith: string[];        // IDs of conflicting sources
}

enum Originality {
  ORIGINAL,                      // Created at/near time of event
  DERIVATIVE,                    // Copy, transcription, or extract
  AUTHORED_WORK,                 // Compiled, processed, or interpreted
  UNKNOWN                        // Originality cannot be determined
}

enum InformantKnowledge {
  PRIMARY,                       // Firsthand knowledge of event
  SECONDARY,                     // Knowledge obtained from others
  UNDETERMINED,                  // Cannot determine knowledge level
  MIXED                          // Contains both primary and secondary
}

enum Contemporaneity {
  CONTEMPORARY,                  // Created at time of event
  RECENT,                        // Created within decade of event
  DISTANT,                       // Created long after event
  UNKNOWN                        // Timeframe cannot be determined
}

enum Clarity {
  HIGH,                          // Clear, legible, unambiguous
  MEDIUM,                        // Some issues but mostly clear
  LOW,                           // Significant clarity problems
  VARIABLE                       // Quality varies within source
}

enum EvidenceType {
  DIRECT,                        // Directly answers research question
  INDIRECT,                      // Contributes but doesn't directly answer
  NEGATIVE,                      // Absence of expected information
  CONTRADICTORY                  // Conflicts with other evidence
}
```

### Citation Entity

The Citation entity connects information to sources with precise citation details and information extraction documentation.

```typescript
interface Citation {
  id: string;                     // Unique identifier
  sourceId: string;               // Reference to Source
  citationTemplate: string;       // Citation template used
  elements: CitationElement[];    // Citation elements
  quality: CitationQuality;       // Citation quality assessment
  notes: string;                  // Citation notes
  created: Timestamp;             // Creation metadata
  lastModified: Timestamp;        // Modification metadata
}

interface CitationElement {
  field: string;                  // Element name
  value: string;                  // Element value
  type: ElementType;              // Type of element
}

enum CitationQuality {
  COMPLETE,
  PARTIAL,
  MINIMAL
}
```

## Support Types

### Sourced Attribute

A wrapper for any attribute with source attribution and temporal context.

```typescript
interface SourcedAttribute<T> {
  value: T;                       // Attribute value
  citations: Citation[];          // Supporting sources
  timeframe: TemporalRange;       // When attribute was valid
  confidence: ConfidenceLevel;    // Certainty assessment
  analysis: string;               // Research analysis
  conflictResolution: string;     // If resolving conflicts
}
```

### Temporal Types

Complex date handling with support for uncertainty, ranges, and historical calendars.

```typescript
interface TemporalDate {
  type: DateType;                 // Exact, range, etc.
  value: string;                  // Date value(s)
  calendar: CalendarSystem;       // Calendar system
  confidence: ConfidenceLevel;    // Certainty assessment
  display: string;                // Formatted display
}

interface TemporalRange {
  startDate: TemporalDate;        // Start of range
  endDate: TemporalDate;          // End of range
  ongoing: boolean;               // If still continuing
}

enum DateType {
  EXACT,
  APPROXIMATE,
  RANGE,
  BEFORE,
  AFTER,
  BETWEEN,
  CALCULATED,
  UNKNOWN
}

enum CalendarSystem {
  GREGORIAN,
  JULIAN,
  HEBREW,
  ISLAMIC,
  FRENCH_REPUBLICAN,
  OTHER
}
```

### Research and Evidence Analysis Types

Support for Genealogical Proof Standard methodology, research management, and evidence assessment.

```typescript
interface ResearchNote {
  id: string;                     // Unique identifier
  text: string;                   // Note content
  type: NoteType;                 // Type of note
  status: ResearchStatus;         // Research status
  sources: Citation[];            // Supporting sources
  created: Timestamp;             // Creation metadata
  lastModified: Timestamp;        // Modification metadata
}

interface ResearchQuestion {
  id: string;                     // Unique identifier
  question: string;               // Question text
  hypotheses: Hypothesis[];       // Possible answers
  status: ResearchStatus;         // Research status
  plan: ResearchTask[];           // Research plan
  conclusion: ConclusionElement;  // Final reasoned conclusion
  gpsCompliance: GPSCompliance;   // GPS compliance assessment
}

interface Hypothesis {
  id: string;                     // Unique identifier
  statement: string;              // Hypothesis statement
  supportingEvidence: Evidence[]; // Supporting evidence
  conflictingEvidence: Evidence[]; // Conflicting evidence
  conflictResolution: string;     // How conflicts were resolved
  analysis: string;               // Analysis of evidence
  confidence: ConfidenceLevel;    // Assessment of likelihood
}

interface ResearchTask {
  id: string;                     // Unique identifier
  description: string;            // Task description
  sources: SourceReference[];     // Sources to consult
  status: TaskStatus;             // Task status
  results: string;                // Research findings
  followupTasks: string[];        // IDs of followup tasks
}

interface ConclusionElement {
  statement: string;              // Conclusion statement
  evidenceSummary: string;        // Summary of supporting evidence
  conflictResolution: string;     // How conflicts were resolved
  confidence: ConfidenceLevel;    // Overall confidence level
  citations: Citation[];          // Supporting citations
}

interface GPSCompliance {
  exhaustiveResearch: boolean;    // Reasonably exhaustive research
  completeCitations: boolean;     // Complete and accurate citations
  skillfulAnalysis: boolean;      // Analysis and correlation of evidence
  conflictResolution: boolean;    // Resolution of conflicting evidence
  soundConclusion: boolean;       // Soundly reasoned conclusion
  complianceNotes: string;        // Notes on GPS compliance
}

interface Evidence {
  id: string;                     // Unique identifier
  type: EvidenceType;             // Direct, indirect, negative
  sourceId: string;               // Source reference
  citationId: string;             // Citation reference
  relevance: string;              // How evidence relates to question
  analysis: string;               // Analysis of evidence quality
  weight: number;                 // Evidence weight (0-100)
}

enum NoteType {
  RESEARCH_LOG,                   // Documentation of research process
  ANALYSIS,                       // Analysis of evidence
  CONFLICT_RESOLUTION,            // Conflict resolution notes
  CONCLUSION,                     // Conclusion notes
  TODO,                           // Research to-do items
  GENERAL                         // General notes
}

enum TaskStatus {
  PLANNED,                        // Task planned but not started
  IN_PROGRESS,                    // Task in progress
  COMPLETED,                      // Task completed
  BLOCKED,                        // Task blocked
  CANCELLED                       // Task cancelled
}
```

## Data Model Principles

The data model extends GEDCOM X while following these key principles:

1. **Evidence-Based Attribution**: All assertions link to supporting sources with evidence quality assessment
2. **Genealogical Proof Standard Compliance**: Data structure supports GPS methodology at all levels
3. **Temporal Context**: All entities and attributes exist within a historical temporal context
4. **Uncertainty Representation**: Confidence levels and alternative interpretations are built-in
5. **Evidence Evaluation**: Source classification, information assessment, and evidence categorization
6. **Conflict Resolution**: Support for contradictory evidence with resolution mechanisms
7. **Version Control**: Changes tracked at the field level with full attribution history

## Implementation Patterns

### Graph Structure

The Neo4j graph database implementation is designed to support the GEDCOM X data model with enhanced evidence attribution:

- **Core Entity Nodes**:
  - Person: Individuals with attributed properties
  - Place: Locations with temporal jurisdictions
  - Event: Occurrences with participants and temporal context
  - Source: Research materials with classification
  - Evidence: Direct, indirect, and negative evidence connections

- **Relationship Types**:
  - RELATED_TO: Connects persons with typed relationships (parent-child, spouse, etc.)
  - PARTICIPATED_IN: Connects persons to events with roles
  - LOCATED_AT: Connects events to places with temporal context
  - EVIDENCED_BY: Connects any assertion to supporting evidence
  - CONTRADICTED_BY: Connects contradictory evidence
  - PART_OF: Connects places to jurisdictional hierarchies

- **Property Attribution**:
  - All node properties include source citations
  - All relationships include confidence levels and temporal bounds
  - Conflicting information stored as multiple property versions with evidence links

- **Temporal Modeling**:
  - All relationships include valid-time temporal properties
  - Historical boundaries preserved for places
  - Life events anchored in time with relative dating when absolute dates unknown

- **Evidence Network**:
  - Research questions connected to evidence chains
  - Hypotheses connected to supporting/contradicting evidence
  - GPS compliance tracking at the relationship level

- **Graph Projections**:
  - Time-period specific views of data
  - Confidence-threshold views (only showing high-confidence data)
  - Research-state views (showing work-in-progress vs. proven conclusions)

### Document Structure

The MongoDB document database implementation is optimized for source management and research process support:

- **Source Repository**:
  - Complete source content with metadata
  - Digital attachments (images, PDFs, transcriptions)
  - Full-text search with historical context awareness
  - Evidence classification and quality assessment
  - Elizabeth Shown Mills citation template library

- **Research Process Management**:
  - Research logs with GPS compliance tracking
  - Research questions and hypothesis management
  - Evidence analysis workspaces
  - Conflict resolution documentation
  - To-do and task management for research planning

- **Evidence Evaluation System**:
  - Source classification framework (original/derivative/authored)
  - Information assessment (primary/secondary/indeterminable)
  - Evidence categorization (direct/indirect/negative)
  - Confidence scoring algorithms
  - Contradictory evidence tracking

- **Citation Management**:
  - Comprehensive citation template library
  - Citation element extraction and validation
  - Citation quality assessment
  - Citation relationship tracking (source of source)
  - Citation rendering in multiple formats

- **Analytical Collections**:
  - Research timelines with evidence connections
  - Ancestor research completeness metrics
  - Evidence correlation matrices
  - Historical context reference materials
  - Locality guides and historical jurisdictions

## Data Validation Rules

1. All Person entities must have at least one Name
2. All assertions must have at least one Citation
3. All dates must be consistent with historical context
4. All relationships must connect valid Person entities
5. All places must exist within a geographical hierarchy

## Migration Strategies

The data model supports migration from existing formats:

1. **GEDCOM Import**:
   - Map GEDCOM individuals to Person entities
   - Map GEDCOM families to Relationship entities
   - Convert GEDCOM sources to Source entities

2. **GEDCOM-X Import**:
   - Direct mapping to Relationship model
   - Enhanced source attribution preservation

## Scalability Considerations

The data model is designed to scale:

- Horizontally for large family networks (billions of relationships)
- Vertically for deep source attribution (thousands of sources per person)
- Temporally for historical depth (millennia of history)
