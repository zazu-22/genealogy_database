# Changelog

## [Unreleased]

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