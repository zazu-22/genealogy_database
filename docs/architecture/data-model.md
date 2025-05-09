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

The Source entity represents research materials with classification, repository information, and citation details.

```typescript
interface Source {
  id: string;                     // Unique identifier
  type: SourceType;               // Type of source
  title: string;                  // Source title
  creator: string[];              // Authors/creators
  publication: PublicationInfo;   // Publication details
  repository: RepositoryInfo;     // Where source is held
  classification: SourceClassification; // Source classification
  content: SourceContent;         // Source content
  access: AccessInfo;             // Access information
  notes: ResearchNote[];          // Research notes
  created: Timestamp;             // Creation metadata
  lastModified: Timestamp;        // Modification metadata
  version: number;                // Version tracking
}

interface SourceClassification {
  originality: Originality;       // Original, derivative, etc.
  informantKnowledge: InformantKnowledge; // Primary, secondary
  format: SourceFormat;           // Format of source
  evidenceType: EvidenceType[];   // Direct, indirect, negative
}

enum Originality {
  ORIGINAL,
  DERIVATIVE,
  AUTHORED_WORK
}

enum InformantKnowledge {
  PRIMARY,
  SECONDARY,
  UNDETERMINED
}

enum EvidenceType {
  DIRECT,
  INDIRECT,
  NEGATIVE
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

### Research Types

Support for research methodology and evidence assessment.

```typescript
interface ResearchNote {
  id: string;                     // Unique identifier
  text: string;                   // Note content
  type: NoteType;                 // Type of note
  status: ResearchStatus;         // Research status
  created: Timestamp;             // Creation metadata
  lastModified: Timestamp;        // Modification metadata
}

interface ResearchQuestion {
  id: string;                     // Unique identifier
  question: string;               // Question text
  hypotheses: Hypothesis[];       // Possible answers
  status: ResearchStatus;         // Research status
  plan: ResearchTask[];           // Research plan
  conclusion: string;             // Final conclusion
  confidence: ConfidenceLevel;    // Certainty in conclusion
}

interface Hypothesis {
  id: string;                     // Unique identifier
  statement: string;              // Hypothesis statement
  supportingEvidence: Evidence[]; // Supporting evidence
  conflictingEvidence: Evidence[]; // Conflicting evidence
  analysis: string;               // Analysis of evidence
  confidence: ConfidenceLevel;    // Assessment of likelihood
}
```

## Data Model Principles

The data model follows these key principles:

1. **Attribution**: All assertions link to supporting sources through citations
2. **Temporal Context**: All entities and attributes exist within a temporal context
3. **Uncertainty Representation**: Confidence levels and alternative interpretations are built-in
4. **Evidence Documentation**: Clear tracking of information extraction and analysis
5. **Version Control**: Changes tracked at the field level with full history

## Implementation Patterns

### Graph Structure

The graph database implementation uses the following patterns:

- Nodes: Person, Place, Event, Source entities
- Relationships: Connect entities with typed, directed edges
- Properties: Store attributes on both nodes and relationships
- Temporal Properties: Add temporal context to relationships
- Graph Projections: Create alternative views based on confidence or time periods

### Document Structure

The document database implementation focuses on:

- Source content storage with metadata
- Full-text search capabilities
- Attachment management
- Citation template storage and rendering
- Research note organization

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
