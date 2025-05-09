# Contributing to the Genealogy Database System

Thank you for your interest in contributing to this project. This document provides guidelines and workflows to ensure consistent, high-quality contributions that align with the project's goals and standards.

## Core Principles

When contributing to this project, please adhere to these foundational principles:

1. **Evidence-based methodology**: All features must support proper source attribution and evidence evaluation
2. **Data integrity**: Prioritize accuracy, completeness, and consistency of genealogical data
3. **Professional standards**: Follow established genealogical standards (BCG, Evidence Explained)
4. **Extensibility**: Design components to be modular and extensible
5. **User empowerment**: Features should enhance the researcher's capabilities without forcing methodological compromises

## Development Workflow

### Getting Started

1. Fork the repository
2. Clone your fork locally
3. Install dependencies with `npm install`
4. Create a new branch for your feature or fix
5. Implement your changes following the guidelines below
6. Submit a pull request

### Test-Driven Development

We follow test-driven development practices:

1. Write tests that define the expected behavior
2. Implement the minimal code needed to pass tests
3. Refactor for quality while keeping tests passing

### Coding Standards

- Use TypeScript for all new code
- Follow the established code style (enforced by ESLint)
- Write meaningful commit messages following conventional commits format
- Document all public APIs and complex implementations
- Include inline comments for non-obvious code sections

### Documentation

When adding features or making significant changes:

1. Update relevant documentation in the `/docs` directory
2. Add inline code documentation for public APIs
3. Update any affected user guides
4. Include examples where appropriate

## Pull Request Process

1. Ensure all tests pass locally
2. Update documentation as necessary
3. Verify your changes address the relevant issue or user story
4. Submit a pull request with a clear title and description
5. Link to any related issues using GitHub keywords

## Code Review Criteria

Pull requests will be evaluated based on:

- Adherence to project principles and standards
- Test coverage and quality
- Code clarity and maintainability
- Documentation quality
- Backwards compatibility (or clear migration path if breaking)

## Genealogical Domain Expertise

Contributors are encouraged to familiarize themselves with:

- The [Genealogical Proof Standard](https://bcgcertification.org/ethics-standards/)
- Elizabeth Shown Mills' "Evidence Explained" methodology
- Core genealogical research principles

## Communication Channels

- GitHub Issues: For bug reports and feature requests
- Project Discussion Board: For design discussions and community support

## Development Environment

### Recommended Tools

- VSCode with recommended extensions (see .vscode/extensions.json)
- Neo4j Desktop for local graph database development
- Node.js (version specified in package.json)

### Useful Commands

- `npm run dev`: Start development server
- `npm run test`: Run test suite
- `npm run lint`: Check code style
- `npm run build`: Build the project
- `npm run docs`: Generate documentation

## License

By contributing to this project, you agree that your contributions will be licensed under the same license as the project (see LICENSE file).
