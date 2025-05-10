# Research Question Management Service

This document outlines the design and architecture for the Research Question Management Service, a critical component of the Genealogy Database System that provides a structured approach to genealogical research following BCG standards.

## Overview

The Research Question Management Service will provide functionality to formulate, track, and evaluate research questions throughout the genealogical research process. This service implements the methodological principles described in BCG's "Ten-Minute Methodology: How to Ask Good Research Questions" and forms the foundation for applying the Genealogical Proof Standard (GPS).

## Core Components

### Research Question Entity

The central entity of this service is the `ResearchQuestion` which represents a specific, focused inquiry about an individual, relationship, or event. A research question:

- Identifies a unique individual (or group/event)
- Specifies what we want to learn about the subject
- Can be measured against the Genealogical Proof Standard

```typescript
interface ResearchQuestion {
  id: string;                          // Unique identifier
  question: string;                    // The research question text
  subject: ResearchSubject;            // The subject of the question (person, relationship, etc.)
  type: QuestionType;                  // Type of question (identity, relationship, event)
  status: ResearchStatus;              // Current status of the question
  plan: ResearchPlan;                  // Associated research plan
  hypotheses: Hypothesis[];            // Possible answers being tested
  evidence: EvidenceReference[];       // Evidence collected for this question
  conclusion: ConclusionElement;       // Final reasoned conclusion
  gpsCompliance: GPSCompliance;        // GPS compliance assessment
  parentQuestionId?: string;           // For sub-questions
  childQuestionIds?: string[];         // Related sub-questions
  created: Timestamp;                  // Creation metadata
  lastModified: Timestamp;             // Modification metadata
  notes: ResearchNote[];               // Analysis and process notes
}

enum QuestionType {
  IDENTITY_QUESTION,                   // Who is this person?
  PARENTAGE_QUESTION,                  // Who are the parents of this person?
  MARRIAGE_QUESTION,                   // Did this person marry? Who? When? Where?
  EVENT_QUESTION,                      // Did this event occur? When? Where?
  LOCATION_QUESTION,                   // Where did this person live?
  RELATIONSHIP_QUESTION,               // How are these people related?
  CONFLICT_RESOLUTION_QUESTION,        // How can we resolve this conflict?
  OTHER                                // Other types of questions
}

enum ResearchStatus {
  PLANNING,                            // Question defined, planning research
  IN_PROGRESS,                         // Actively researching
  REVIEW,                              // Reviewing evidence and analysis
  CONCLUSION_DRAFT,                    // Drafting conclusion
  COMPLETED,                           // Research completed with conclusion
  INSUFFICIENT_EVIDENCE,               // Not enough evidence to reach conclusion
  ON_HOLD                              // Research temporarily paused
}
```

### Research Question Service

The core service will provide functionality to manage the lifecycle of research questions:

```typescript
interface ResearchQuestionService {
  // Creation and management
  createQuestion(question: Partial<ResearchQuestion>): Promise<ResearchQuestion>;
  updateQuestion(id: string, updates: Partial<ResearchQuestion>): Promise<ResearchQuestion>;
  getQuestion(id: string): Promise<ResearchQuestion>;
  listQuestions(filters?: QuestionFilters): Promise<ResearchQuestion[]>;
  
  // Research process
  addHypothesis(questionId: string, hypothesis: Partial<Hypothesis>): Promise<Hypothesis>;
  updateHypothesis(questionId: string, hypothesisId: string, updates: Partial<Hypothesis>): Promise<Hypothesis>;
  addEvidence(questionId: string, evidence: EvidenceReference): Promise<ResearchQuestion>;
  
  // Analysis and conclusion
  addConclusion(questionId: string, conclusion: ConclusionElement): Promise<ResearchQuestion>;
  evaluateGPSCompliance(questionId: string): Promise<GPSCompliance>;
  
  // Structure and relationships
  createSubQuestion(parentId: string, question: Partial<ResearchQuestion>): Promise<ResearchQuestion>;
  getQuestionHierarchy(rootId: string): Promise<ResearchQuestionHierarchy>;
}
```

### Hypothesis Management

A key aspect of the research process is formulating and testing hypotheses:

```typescript
interface Hypothesis {
  id: string;                          // Unique identifier
  statement: string;                   // Hypothesis statement
  confidence: ConfidenceLevel;         // Current confidence assessment
  supportingEvidence: EvidenceReference[]; // Evidence supporting this hypothesis
  conflictingEvidence: EvidenceReference[]; // Evidence contradicting this hypothesis
  analysis: string;                    // Analysis of the evidence
  status: HypothesisStatus;            // Current status of hypothesis
  created: Timestamp;                  // Creation metadata
  lastModified: Timestamp;             // Modification metadata
}

enum HypothesisStatus {
  PROPOSED,                            // Initial hypothesis
  TESTING,                             // Gathering evidence to test
  SUPPORTED,                           // Evidence supports hypothesis
  REFUTED,                             // Evidence refutes hypothesis
  INCONCLUSIVE                         // Evidence is insufficient to determine
}
```

### Research Planning

The service will include functionality to plan research strategies for each question:

```typescript
interface ResearchPlan {
  id: string;                          // Unique identifier
  questionId: string;                  // Associated research question
  sourcesToConsult: PlannedSource[];   // Sources to check
  repositories: string[];              // Repositories to visit
  tasks: ResearchTask[];               // Tasks to complete
  notes: string;                       // Planning notes
  status: PlanStatus;                  // Current status
  created: Timestamp;                  // Creation metadata
  lastModified: Timestamp;             // Modification metadata
}

interface PlannedSource {
  id: string;                          // Unique identifier
  sourceType: SourceType;              // Type of source
  description: string;                 // Description of source
  location: string;                    // Where to find it
  priority: Priority;                  // Search priority
  status: SearchStatus;                // Current status
  notes: string;                       // Notes about this source
}

enum SearchStatus {
  PLANNED,                             // Not yet searched
  SEARCHED_FOUND,                      // Searched and found
  SEARCHED_NOT_FOUND,                  // Searched but not found
  INACCESSIBLE                         // Unable to access source
}
```

## Integration with Other Services

The Research Question Management Service integrates with other system components:

- **Evidence Analysis Services** - For evaluating evidence related to research questions
- **GPS Evaluation Service** - For assessing GPS compliance of research and conclusions
- **Research Log Services** - For tracking the research process related to each question
- **Source Citation Services** - For citing sources as evidence for research questions
- **Person/Relationship Services** - For connecting questions to the subjects they investigate

## Search and Discovery

The service will provide robust search capabilities:

- Search for questions by text content
- Filter questions by status, type, subject, and date
- Group related questions by subject or time period
- Identify similar questions across research projects

## User Interface Support

The service will support the following UI workflows:

- Question formulation wizard to guide users in creating focused questions
- Research question dashboard showing status and progress
- Evidence collection and analysis interface
- Hypothesis testing workspace
- Conclusion builder with GPS compliance assessment

## Benefits

Implementing the Research Question Management Service as a foundational component provides:

1. **Structure** - Forces disciplined, focused research rather than aimless searching
2. **Methodology** - Embeds professional genealogical standards into the research process
3. **Organization** - Groups related sources, evidence, and analysis around specific questions
4. **Metrics** - Allows measuring progress and quality of research
5. **Guidance** - Directs researchers to appropriate sources and methods

## Implementation Phases

The implementation will proceed in phases:

1. **Core Model** - Define data model and basic CRUD operations
2. **Question Management** - Implement creation, tracking, and organization of questions
3. **Hypothesis Testing** - Add support for creating and evaluating hypotheses
4. **Research Planning** - Implement research planning functionality
5. **GPS Integration** - Connect with GPS evaluation for compliance assessment
6. **Advanced Features** - Add search capabilities, recommendations, and analytics