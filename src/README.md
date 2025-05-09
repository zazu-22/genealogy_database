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
  - `/evidence`: Evidence analysis services
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

## Development Guidelines

1. Follow TypeScript best practices
2. Write tests for all business logic
3. Document all public interfaces and functions
4. Handle uncertain or conflicting information appropriately
5. Maintain evidence attribution throughout the system
6. Support the full Genealogical Proof Standard workflow