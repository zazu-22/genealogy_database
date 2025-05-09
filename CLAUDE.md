# Genealogy Database System - Claude Guide

This document serves as a special guide for Claude Code when working on this genealogy database system project. It provides essential context about the project's goals, architecture, standards, and workflows.

## Project Overview

This system aims to create a comprehensive genealogy database that addresses limitations in existing solutions, focusing on evidence-based research management, advanced relationship modeling, and quality control while maintaining compatibility with genealogical standards.

## Core Principles

IMPORTANT: Always adhere to these foundational principles when working on this project:

1. Data integrity and evidence-based methodology are the highest priorities
2. Support for uncertain, conflicting, or incomplete information is essential
3. All data should be fully attributed to sources with proper citations
4. Temporal context must be preserved for all entities and relationships
5. Design should follow professional genealogical standards (BCG, Evidence Explained)

## Technical Guidelines

### Architecture

The system uses a modular architecture with:

- **Graph database** (Neo4j) for relationship modeling with evidence attribution
- **Document storage** (MongoDB) for source materials with citation templates
- **GEDCOM X** as the foundational data model, extended for evidence evaluation
- **Local-first design** with optional cloud sync
- **GraphQL API** with Apollo Server for flexible data access
- **Responsive web interface** with research workflow components
- **Command-line interface** for power users

### Development Standards

- Use **TypeScript** for type safety and documentation
- Follow **TDD practices** with clear test specifications
- Implement **field-level change tracking** for all assertions
- Ensure all data follows the **Genealogical Proof Standard**
- Design for extensibility through plugins or scripting

### Important Files and Directories

- `/docs/architecture/`: Contains detailed system design documents
- `/src/models/`: Core data models (Person, Relationship, Place, etc.)
- `/src/services/`: Business logic and evidence analysis services
- `/src/api/`: GraphQL API and REST endpoints
- `/src/ui/`: User interface components for research workflows
- `/tests/`: Test suites organized by type

## Genealogical Concepts

YOU MUST understand these domain-specific concepts:

### Evidence Evaluation Terms

- **Information**: What a source contains
- **Evidence**: Information used to answer a research question
- **Primary Information**: Recorded by a witness to the event
- **Secondary Information**: Recorded by someone without firsthand knowledge
- **Direct Evidence**: Directly answers a research question
- **Indirect Evidence**: Requires additional reasoning to answer a question
- **Negative Evidence**: The absence of information where it would be expected

### Genealogical Proof Standard

1. Reasonably exhaustive research
2. Complete and accurate source citations
3. Analysis and correlation of collected information
4. Resolution of conflicting evidence
5. Soundly reasoned, coherently written conclusion

## Common Commands

- `npm run build`: Build the project
- `npm run test`: Run test suite
- `npm run migrate`: Run database migrations
- `npm run lint`: Check code style
- `npm run docs`: Generate API documentation

## Development Workflow

1. Tasks should be implemented following TDD principles
2. Create tests first that reflect the requirements
3. Implement the feature until tests pass
4. Document the implementation in appropriate /docs files
5. Update relevant models and ensure change tracking is implemented

## Implementation Priorities

1. **Foundation Layer** (1-3 months)
   - Core data models leveraging GEDCOM X
   - Neo4j/MongoDB database integration
   - Basic GraphQL API framework

2. **Evidence Framework** (4-6 months)
   - Source citation management with Mills templates
   - Evidence evaluation services
   - Research log system for GPS compliance
   - Conflict resolution system

3. **Advanced Features** (7-9 months)
   - Research workflow implementation
   - Tools for handling uncertain information
   - Evidence correlation algorithms
   - Advanced search and retrieval

4. **Integration & Refinement** (10-12 months)
   - User interface components
   - Import/export capabilities
   - Reporting and visualization
   - Collaborative research features

When implementing any feature, ALWAYS:
- Consider how it handles uncertain or conflicting information
- Ensure proper source attribution
- Maintain historical context
- Support the Genealogical Proof Standard methodology

## Advanced Features Reference

### Person Entity Model
Person entities must support multiple, uncertain name forms with temporal context and source attribution. Every assertion must have citation support with evidence quality assessment. Events in a person's life should be comprehensive, going beyond basic birth/marriage/death to include residence, occupation, and other life events.

### Relationship Modeling
Relationships must support complex family structures (adoption, foster, step) as well as non-familial relationships (neighbors, witnesses, employers) with temporal dimensions and confidence indicators. All relationships require evidence support and quality assessment.

### Place Management
Places must be handled as hierarchical entities with support for jurisdictional changes over time, name variants, and historical context. Place assertions must include source citations and temporal boundaries.

### Temporal Framework
Dates must support ranges, approximations, and qualifiers, with conversion between calendar systems and timeline visualization. Historical context must be maintained for all temporal data.

### Evidence Analysis System
The system must implement a comprehensive evidence analysis framework with:
- Elizabeth Shown Mills' citation templates
- Source classification (original/derivative/authored)
- Information assessment (primary/secondary/indeterminable)
- Evidence evaluation (direct/indirect/negative)
- Conflict resolution mechanisms
- GPS compliance tracking
