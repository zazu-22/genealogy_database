# Evidence Analysis Services

This document provides an overview of the Evidence Analysis Services, which are a core component of the Genealogy Database System's evidence evaluation framework.

## Overview

The Evidence Analysis Services implement professional genealogical standards for source evaluation, information assessment, and evidence categorization. These services follow Elizabeth Shown Mills' evidence evaluation framework and support the Genealogical Proof Standard (GPS) methodology.

![Evidence Analysis Services Architecture]

## Service Components

The Evidence Analysis Services are organized into four specialized components plus a main service that combines their functionality:

### 1. Source Classification Service

Evaluates sources based on their attributes to determine reliability and usefulness for genealogical research.

**Key Functions:**
- `classifySource(source)`: Provides a comprehensive classification of a source
- `determineOriginality(source)`: Determines if a source is original, derivative, or authored work
- `evaluateInformantKnowledge(source)`: Evaluates the informant's knowledge as primary or secondary
- `assessContemporaneity(source, eventDate)`: Assesses how close in time the source was created to the event it describes
- `assessClarity(source)`: Evaluates the clarity and legibility of the source

**Classification Dimensions:**
- **Originality**: ORIGINAL, DERIVATIVE, AUTHORED_WORK, UNKNOWN
- **Informant Knowledge**: PRIMARY, SECONDARY, MIXED, UNDETERMINED
- **Format**: TEXT, IMAGE, AUDIO, VIDEO, PHYSICAL_ARTIFACT, MIXED
- **Contemporaneity**: CONTEMPORARY, RECENT, DISTANT, UNKNOWN
- **Clarity**: HIGH, MEDIUM, LOW, VARIABLE

### 2. Information Evaluation Service

Evaluates the quality and reliability of information contained in sources, including detecting and resolving conflicts.

**Key Functions:**
- `evaluateInformationQuality(source, classification)`: Assesses overall information quality
- `calculateSourceReliability(source, classification)`: Calculates a numeric reliability score and evidence types
- `detectSourceConflicts(sourceId, relatedSourceIds)`: Identifies conflicts between sources
- `resolveInformationConflicts(conflictingSourceIds, resolutionNotes)`: Resolves conflicts with explanation

**Information Quality Levels:**
- HIGH, MEDIUM, LOW, UNKNOWN

**Reliability Assessment:**
- Numeric score (0-100)
- Evidence types
- Information quality
- Analysis notes
- Conflicting sources

### 3. Evidence Categorization Service

Categorizes evidence based on its relationship to research questions, following the standard division into direct, indirect, and negative evidence.

**Key Functions:**
- `categorizeEvidence(sourceId, citationId, researchQuestionId)`: Categorizes evidence type
- `isDirectEvidence(sourceId, citationId, researchQuestionId)`: Determines if evidence directly answers question
- `isIndirectEvidence(sourceId, citationId, researchQuestionId)`: Determines if evidence indirectly supports question
- `isNegativeEvidence(sourceId, citationId, researchQuestionId)`: Determines if evidence is absence of expected information
- `calculateEvidenceWeight(sourceId, citationId, researchQuestionId)`: Calculates evidence weight (0-100)

**Evidence Types:**
- DIRECT: Evidence that directly answers a research question
- INDIRECT: Evidence that supports a research question but requires inference
- NEGATIVE: Evidence based on the absence of expected information
- CONTRADICTORY: Evidence that conflicts with other evidence

### 4. GPS Evaluation Service

Evaluates research against the five elements of the Genealogical Proof Standard (GPS).

**Key Functions:**
- `evaluateExhaustiveResearch(researchQuestionId)`: Assesses reasonably exhaustive research
- `evaluateCitationCompleteness(researchQuestionId)`: Assesses citation completeness
- `evaluateAnalysisQuality(researchQuestionId)`: Evaluates analysis and correlation
- `evaluateConflictResolution(researchQuestionId)`: Assesses conflict resolution
- `evaluateConclusionSoundness(researchQuestionId)`: Evaluates conclusion soundness
- `calculateGPSCompliance(researchQuestionId)`: Calculates overall GPS compliance

**GPS Components:**
- Reasonably exhaustive research
- Complete and accurate source citations
- Analysis and correlation of evidence
- Resolution of conflicting evidence
- Soundly reasoned conclusion

### 5. Main Evidence Analysis Service

Combines all the above services to provide comprehensive evidence analysis functionality.

**Key Functions:**
- `analyzeSource(source)`: Provides complete source analysis with recommendations
- `calculateAssertionConfidence(citationIds)`: Calculates confidence level for assertions
- `correlateEvidence(citationIds, researchQuestionId)`: Correlates evidence from multiple sources

## Data Flow

1. **Source Classification**: Sources are classified based on their attributes
2. **Information Evaluation**: Information quality and reliability are assessed
3. **Evidence Categorization**: Evidence is categorized as direct, indirect, or negative
4. **GPS Evaluation**: Research is evaluated against GPS standards
5. **Evidence Correlation**: Evidence from multiple sources is correlated and conflicts are identified
6. **Confidence Assessment**: Assertions are assigned confidence levels

## Integration with System Components

The Evidence Analysis Services integrate with:

- **Data Layer**: Uses the graph database for relationship assertions and the document database for sources
- **Entity Services**: Provides confidence metrics for entity assertions
- **Research Management Services**: Supports research question evaluation and GPS compliance
- **API Layer**: Provides evidence assessment information for client applications

## Dependency Graph

```
                                 +----------------------------+
                                 |                            |
                                 | Evidence Analysis Service  |
                                 |                            |
                                 +----------------------------+
                                        ^      ^      ^      ^
                                        |      |      |      |
+------------------+   +-------------------+   |      |   +------------------+
|                  |   |                   |   |      |   |                  |
| Classification   |   | Information       |   |      |   | GPS Evaluation   |
| Service          |   | Evaluation        |   |      |   | Service          |
|                  |   | Service           |   |      |   |                  |
+------------------+   +-------------------+   |      |   +------------------+
                                               |      |
                                   +-------------------------+
                                   |                         |
                                   | Evidence Categorization |
                                   | Service                 |
                                   |                         |
                                   +-------------------------+
```

## Implementation Guidelines

When using the Evidence Analysis Services, follow these guidelines:

1. **Source Attribution**: All assertions should include source attribution via citations
2. **Evidence Assessment**: Evaluate all evidence for type and quality
3. **Correlation**: Correlate evidence from multiple sources before drawing conclusions
4. **Confidence Metrics**: Include confidence levels for all assertions
5. **Conflict Resolution**: Explicitly resolve any conflicts between sources

## Usage Examples

### Analyzing a Source

```typescript
// Get a source
const source = await SourceModel.findOne({ id: 'source-123' }).exec();

// Analyze the source
const analysisService = new EvidenceAnalysisServiceImpl();
const analysis = await analysisService.analyzeSource(source);

// Use the analysis results
console.log(`Source classification: ${JSON.stringify(analysis.classification)}`);
console.log(`Source reliability: ${analysis.reliability.score}`);
console.log(`Recommendations: ${analysis.recommendations.join(', ')}`);
```

### Calculating Assertion Confidence

```typescript
// Get citation IDs supporting an assertion
const citationIds = ['citation-1', 'citation-2', 'citation-3'];

// Calculate confidence level
const analysisService = new EvidenceAnalysisServiceImpl();
const confidence = await analysisService.calculateAssertionConfidence(citationIds);

// Use the confidence level
console.log(`Assertion confidence: ${confidence}`);
```

### Correlating Evidence for a Research Question

```typescript
// Get citation IDs for a research question
const citationIds = ['citation-1', 'citation-2', 'citation-3'];
const researchQuestionId = 'question-123';

// Correlate evidence
const analysisService = new EvidenceAnalysisServiceImpl();
const correlation = await analysisService.correlateEvidence(citationIds, researchQuestionId);

// Use the correlation results
console.log(`Evidence is consistent: ${correlation.consistent}`);
console.log(`Confidence level: ${correlation.confidence}`);
console.log(`Number of conflicts: ${correlation.conflicts.length}`);
console.log(`Analysis: ${correlation.analysis}`);
```

### Evaluating GPS Compliance

```typescript
// Get a research question ID
const researchQuestionId = 'question-123';

// Evaluate GPS compliance
const gpsService = new GPSEvaluationServiceImpl();
const compliance = await gpsService.calculateGPSCompliance(researchQuestionId);

// Use the compliance results
console.log(`Overall compliant: ${compliance.overallCompliant}`);
console.log(`Compliance score: ${compliance.score}`);
console.log(`Recommendations: ${compliance.recommendations.join(', ')}`);
```

## Conclusion

The Evidence Analysis Services provide a comprehensive framework for evaluating genealogical sources, information, and evidence. They implement professional standards and bring methodological rigor to the research process, supporting the creation of high-quality family history datasets with appropriate source attribution and confidence metrics.