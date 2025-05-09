# Genealogy Database System

A comprehensive genealogy database system designed to address limitations in existing solutions. This project focuses on evidence-based research management, advanced relationship modeling, and quality control while maintaining compatibility with genealogical standards and open formats.

## Project Vision

This system aims to provide professional-grade genealogical research tooling with:

- Robust data modeling for complex genealogical information
- Evidence-based research management aligned with professional standards
- Advanced relationship modeling including non-traditional and temporal relationships
- Historical context preservation for places, dates, and events
- Comprehensive version control and data quality mechanisms

## Key Features

- **Person Entity Model**: Support for uncertain data, multiple name forms, comprehensive events, and conflicting information
- **Relationship Modeling**: Complex family structures, non-familial relationships, temporal dimensions
- **Place Management**: Historical context, jurisdictional changes, geocoding integration
- **Temporal Framework**: Date approximations, calendar conversions, timeline visualization
- **Research Management**: Citation templates, source classification, research organization
- **Evidence Analysis Framework**:
  - Source classification (original/derivative/authored)
  - Information evaluation (primary/secondary/indeterminable)
  - Evidence categorization (direct/indirect/negative)
  - Genealogical Proof Standard compliance assessment
  - Conflict resolution for contradictory evidence
- **Data Quality**: Authority control, duplicate detection, validation
- **Version Control**: Field-level change tracking, multiple research theories
- **Integration**: GEDCOM X compatibility, API endpoints, repository integration
- **Publishing**: Report templates, chart generation, privacy controls

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB
- Neo4j Graph Database
- TypeScript

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/genealogy-database.git
cd genealogy-database

# Install dependencies
npm install

# Create environment configuration
cp .env.example .env
# Edit .env with your configuration

# Build the project
npm run build
```

### Development Setup

```bash
# Start the development server
npm run dev

# Run tests
npm test

# Run linting
npm run lint
```

## Architecture

This project uses a modular architecture with:

- **Data Model**: Extended GEDCOM X conceptual model
- **Graph Database**: Neo4j for relationship modeling with evidence attribution
- **Document Database**: MongoDB for source management and research process support
- **Evidence Analysis Services**: Source classification, information evaluation, and evidence categorization
- **API**: GraphQL with Apollo Server for flexible data access
- **Local-first Design**: Optional cloud synchronization

## Implementation Timeline

1. **Foundation Layer** (1-3 months):
   - ✅ Core data models leveraging GEDCOM X
   - ✅ Neo4j/MongoDB database integration
   - ✅ Basic GraphQL API framework

2. **Evidence Framework** (4-6 months):
   - ✅ Evidence Analysis Services with:
     - Source classification based on Mills' framework
     - Information quality evaluation
     - Evidence categorization (direct, indirect, negative)
     - GPS compliance assessment
   - Source citation management with Mills templates
   - Research log system for GPS compliance
   - Conflict resolution system

3. **Advanced Features** (7-9 months):
   - Research workflow implementation
   - Tools for handling uncertain information
   - Evidence correlation algorithms
   - Advanced search and retrieval

4. **Integration & Refinement** (10-12 months):
   - User interface components
   - Import/export capabilities
   - Reporting and visualization
   - Collaborative research features

## Testing

The project includes comprehensive test suites:

```bash
# Run all tests
npm test

# Run unit tests only
npm test -- --testPathPattern="unit"

# Run integration tests only
npm test -- --testPathPattern="integration"

# Skip specific test categories
npm test -- --testPathIgnorePatterns="integration" --testPathIgnorePatterns="logger"

# Run tests with coverage
npm test -- --coverage
```

Our testing approach follows these principles:
- Unit tests for all models, utilities, and services
- Integration tests for database operations
- Mocking of external dependencies
- Tests for both happy path and error conditions

See the [tests/README.md](tests/README.md) for more information on the testing framework.

## Documentation

Comprehensive documentation is available in the `/docs` directory:

- Architecture and data models:
  - [System Overview](docs/architecture/system-overview.md)
  - [Data Model](docs/architecture/data-model.md)
  - [Evidence Analysis Services](docs/architecture/evidence-analysis-services.md)
- Research methodology guidelines
- Development documentation:
  - [Implementation Status](docs/development/implementation-status.md)
  - [TypeScript Guidelines](docs/development/typescript-guidelines.md)
  - [CHANGELOG](docs/development/CHANGELOG.md)

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- BCG Genealogical Standards
- Elizabeth Shown Mills' "Evidence Explained"
- GEDCOM X Conceptual Model and Java Implementation
- FamilySearch Person Memory model
