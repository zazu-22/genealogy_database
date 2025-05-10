# Citation Management Service Test Plan

This document outlines the test plan for the Citation Management Service, which implements the management of citation templates based on Elizabeth Shown Mills' standards.

## Components to Test

1. Citation Template Service
2. Citation Formatter Service

## Test Categories

### 1. Unit Tests

Unit tests will validate the core functionality of each service in isolation, using mocked dependencies.

### 2. Integration Tests

Integration tests will verify that services work together properly and integrate correctly with MongoDB.

## Citation Template Service Tests

### Template Management

1. **Template Retrieval**
   - `getTemplateById` should return a template when it exists
   - `getTemplateById` should return null when template doesn't exist
   - `getTemplateById` should handle database errors gracefully

2. **Template Filtering and Search**
   - `getTemplatesByCategory` should return templates filtered by category
   - `getTemplatesBySourceType` should return templates filtered by source type
   - `searchTemplates` should return templates matching search query
   - All methods should handle empty results gracefully
   - All methods should handle database errors gracefully

3. **Template CRUD Operations**
   - `createTemplate` should create a new template successfully
   - `createTemplate` should reject duplicate template IDs
   - `updateTemplate` should update an existing template
   - `updateTemplate` should return null for non-existent templates
   - `deleteTemplate` should remove an existing template
   - `deleteTemplate` should return false for non-existent templates
   - All methods should handle database errors gracefully

### Template Library Management

1. **Library Retrieval**
   - `getLibraryById` should return a library when it exists
   - `getLibraryById` should return null when library doesn't exist
   - `getAllLibraries` should return all libraries
   - All methods should handle database errors gracefully

2. **Library CRUD Operations**
   - `createLibrary` should create a new library successfully
   - `createLibrary` should reject duplicate library IDs
   - `updateLibrary` should update an existing library
   - `updateLibrary` should return null for non-existent libraries
   - `deleteLibrary` should remove an existing library
   - `deleteLibrary` should return false for non-existent libraries
   - All methods should handle database errors gracefully

### Template Usage

1. **Citation Formatting**
   - `formatCitation` should format a citation using the template
   - `formatCitation` should throw an error for missing templates
   - `formatCitation` should throw an error for missing required fields
   - `formatCitation` should handle different citation styles
   - `formatCitation` should clean up the formatted citation properly

2. **Template Validation**
   - `validateTemplateFields` should validate required fields
   - `validateTemplateFields` should validate field patterns if specified
   - `validateTemplateFields` should return appropriate validation results
   - `validateTemplateFields` should throw an error for missing templates

## Citation Formatter Service Tests

1. **Citation Formatting**
   - `formatCitation` should use cached formatted versions when available
   - `formatCitation` should use template-based formatting when template is specified
   - `formatCitation` should use simple formatting when no template is specified
   - `formatCitation` should handle all citation styles
   - `formatCitation` should handle database errors gracefully

2. **Batch Formatting**
   - `batchFormatCitations` should format multiple citations
   - `batchFormatCitations` should handle empty arrays
   - `batchFormatCitations` should handle errors in individual citations

3. **Formatted Citation Generation**
   - `generateFormattedCitation` should generate all formatting styles
   - `generateFormattedCitation` should update the citation object correctly

4. **Simple Formatting Logic**
   - Simple full citation formatter should format citations correctly
   - Simple short citation formatter should format citations correctly
   - Simple bibliography citation formatter should format citations correctly
   - All formatters should handle missing elements gracefully

## Test Data

### Mock Citation Templates

Create mock citation templates for common source types:
- Birth certificate
- Census record
- Marriage record
- Newspaper article
- Published book
- Digital resource

### Mock Citation Elements

Create mock element sets for different citation scenarios:
- Complete element set (all fields provided)
- Partial element set (only required fields)
- Missing required fields
- Invalid field values

## Test Environment Setup

1. Use Jest as the testing framework
2. Create mock MongoDB models for:
   - CitationTemplateModel
   - CitationTemplateLibraryModel
3. Create test database infrastructure using mongodb-memory-server
4. Setup test environment with appropriate configuration

## Test Implementation Priority

1. Unit tests for core template management functions
2. Unit tests for citation formatting functions
3. Integration tests for template and citation management
4. End-to-end tests for the citation workflow

## Success Criteria

All tests should:
1. Test both happy paths and edge cases
2. Verify error handling
3. Ensure data consistency
4. Validate integration with existing system components
5. Meet code coverage requirements (80%+ for critical paths)