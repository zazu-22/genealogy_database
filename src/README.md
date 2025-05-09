# Genealogy Database System Source Code

This directory contains the source code for the Genealogy Database System, organized into the following structure:

## Directory Structure

- **/api**: GraphQL API and REST endpoints
  - `/graphql`: GraphQL schema, resolvers, and types
  - `/rest`: REST API endpoints

- **/config**: Configuration files
  - `env.ts`: Environment configuration
  - `mongodb.ts`: MongoDB connection configuration
  - `neo4j.ts`: Neo4j connection configuration

- **/models**: Data models and schemas
  - `/common`: Common types and interfaces
  - `/person`: Person entity model
  - `/relationship`: Relationship entity model
  - `/place`: Place entity model
  - `/event`: Event entity model
  - `/source`: Source and Citation entity models
  - `/research`: Research process models (GPS tracking)

- **/services**: Business logic services
  - `/entity`: Entity management services
  - `/evidence`: Evidence analysis services:
    - Source classification based on Mills' framework
    - Information quality evaluation
    - Evidence categorization (direct/indirect/negative)
    - GPS compliance assessment
  - `/research`: Research management services

- **/ui**: User interface components (for future implementation)

- **/utils**: Utility functions
  - `logger.ts`: Logging utility
  - `cypher-builder.ts`: Neo4j Cypher query builder

## Implementation Notes

### Data Model

The data model is based on the GEDCOM X standard with extensions for evidence-based genealogical research following the Genealogical Proof Standard. Key features include:

- Evidence attribution on all assertions
- Temporal context for all entities and attributes
- Support for uncertain, conflicting, or incomplete information
- Source classification and reliability assessment

### Database Architecture

- **Neo4j**: Graph database for relationship modeling
  - Stores person entities, relationships, and their interconnections
  - Supports complex traversal queries across family networks
  - Implements evidence attribution on relationship edges

- **MongoDB**: Document database for source management
  - Stores source documents with evidence classification
  - Manages citation templates based on Elizabeth Shown Mills standards
  - Implements research process tracking for GPS compliance

### API Design

- **GraphQL API**: Primary interface for client applications
  - Provides flexible querying with evidence attribution
  - Supports complex relationship navigation with confidence metrics
  - Enables efficient data retrieval for UI components

## Using the Evidence Analysis Services

### Source Classification

```typescript
import { SourceClassificationServiceImpl } from './services/evidence/source-classification.service';
import { Source } from './models/source/types';

// Create a source classification service
const classificationService = new SourceClassificationServiceImpl();

// Classify a source
const source: Source = /* get source from database */;
const classification = await classificationService.classifySource(source);

console.log(`Source originality: ${classification.originality}`);
console.log(`Informant knowledge: ${classification.informantKnowledge}`);
console.log(`Contemporaneity: ${classification.contemporaneity}`);
console.log(`Clarity: ${classification.clarity}`);
```

### Information Evaluation

```typescript
import { InformationEvaluationServiceImpl } from './services/evidence/information-evaluation.service';

// Create an information evaluation service
const evaluationService = new InformationEvaluationServiceImpl();

// Evaluate source reliability
const reliability = await evaluationService.calculateSourceReliability(source);

console.log(`Reliability score: ${reliability.score}`);
console.log(`Information quality: ${reliability.informationQuality}`);
```

### Evidence Categorization

```typescript
import { EvidenceCategorizationServiceImpl } from './services/evidence/evidence-categorization.service';

// Create an evidence categorization service
const categorizationService = new EvidenceCategorizationServiceImpl();

// Categorize evidence
const evidenceType = await categorizationService.categorizeEvidence(
  'source-123',
  'citation-456',
  'question-789'
);

console.log(`Evidence type: ${evidenceType}`);
```

### Complete Evidence Analysis

```typescript
import evidenceAnalysisService from './services/evidence';

// Analyze a source
const analysis = await evidenceAnalysisService.analyzeSource(source);

// Correlate evidence from multiple sources
const correlation = await evidenceAnalysisService.correlateEvidence(
  ['citation-1', 'citation-2', 'citation-3'],
  'research-question-123'
);

// Calculate confidence level for assertions
const confidence = await evidenceAnalysisService.calculateAssertionConfidence(
  ['citation-1', 'citation-2']
);
```

## Development Guidelines

1. Follow TypeScript best practices
2. Write tests for all business logic
3. Document all public interfaces and functions
4. Handle uncertain or conflicting information appropriately
5. Maintain evidence attribution throughout the system
6. Support the full Genealogical Proof Standard workflow