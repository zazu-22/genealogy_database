# Changelog

## [Unreleased]

### Added
- Evidence Analysis Services implementation with:
  - Source Classification Service for evaluating genealogical sources
  - Information Evaluation Service for assessing information quality
  - Evidence Categorization Service for categorizing direct, indirect, and negative evidence
  - GPS Evaluation Service for Genealogical Proof Standard compliance
  - Main Evidence Analysis Service with source analysis and evidence correlation
- Comprehensive test suite for all Evidence Analysis Services
- Architecture documentation for Evidence Analysis Services

### Updated
- Revised implementation priorities based on in-depth analysis of genealogical methodology standards
- Restructured development roadmap to better align with BCG and professional genealogical practice
- Added FAN principle (Friends, Associates, Neighbors) support to the implementation guidelines
- Enhanced focus on Research Question Management as foundational to the genealogical research process

## [0.1.1] - 2025-05-09

### Added
- GEDCOM X Java libraries integration (submodule)
- Documentation collection from various genealogy domain sources
- Tests for foundational components (models, database connections, utilities)

### Fixed
- Interface naming conflicts across model files (`ResearchNote` renamed to type-specific notes)
- Neo4j driver async operation handling in configuration and tests
- TypeScript type errors in CypherBuilder utility
- Test utilities for proper database connection mocking
- Added test helper function `__resetDriverForTesting()` to Neo4j module

### Updated
- Documentation for test procedures and commands
- Added best practices for TypeScript interface naming
- Improved asynchronous operation handling guidelines

## [0.1.0] - 2025-05-08

### Added
- Initial repository setup
- Core project structure
- Basic documentation framework
- Environment configuration