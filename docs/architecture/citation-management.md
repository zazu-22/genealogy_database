# Citation Management Services

This document details the Citation Management Services, which provide comprehensive citation template management, formatting, and integration with the evidence analysis framework.

## Overview

The Citation Management Services implement a flexible system for managing and formatting standardized source citations based on Elizabeth Shown Mills' evidence evaluation framework. These services are a critical component of the Genealogy Database System's evidence attribution capabilities.

![Citation Management Services Architecture]

## Service Components

The Citation Management Services are organized into two specialized components:

### 1. Citation Template Service

Manages a library of citation templates based on Elizabeth Shown Mills' "Evidence Explained" standards.

**Key Functions:**

- **Template Management**
  - `getTemplateById(id)`: Retrieves a specific citation template
  - `getTemplatesByCategory(category)`: Returns templates filtered by category
  - `getTemplatesBySourceType(sourceType)`: Returns templates for a specific source type
  - `searchTemplates(query)`: Searches templates by text query
  - `createTemplate(template)`: Creates a new citation template
  - `updateTemplate(id, template)`: Updates an existing template
  - `deleteTemplate(id)`: Removes a template

- **Template Library Management**
  - `getLibraryById(id)`: Retrieves a specific template library
  - `getAllLibraries()`: Returns all template libraries
  - `createLibrary(library)`: Creates a new template library
  - `updateLibrary(id, library)`: Updates an existing library
  - `deleteLibrary(id)`: Removes a library

- **Template Usage**
  - `formatCitation(templateId, elements, style)`: Formats a citation using a template
  - `validateTemplateFields(templateId, elements)`: Validates citation elements against a template

### 2. Citation Formatter Service

Handles the formatting of citations according to different citation styles.

**Key Functions:**

- `formatCitation(citation, style)`: Formats a citation according to a specific style
- `batchFormatCitations(citations, style)`: Formats multiple citations in batch
- `generateFormattedCitation(citation)`: Generates all formatted citation styles for a citation
- `updateFormattedCitations(citationId)`: Updates the formatted citations for a citation

## Data Model

### Citation Template

Defines a template for creating standardized citations based on Elizabeth Shown Mills' "Evidence Explained" formats:

```typescript
interface CitationTemplate {
  id: string;                          // Template identifier
  name: string;                        // Template name
  description: string;                 // Description of when to use this template
  category: CitationTemplateCategory;  // Classification category
  sourceTypes: SourceType[];           // Applicable source types
  fields: CitationTemplateField[];     // Required and optional fields/elements
  formatPatterns: CitationFormatPattern[]; // Format patterns for different styles
  millsReference?: string;             // Reference to Evidence Explained (page/section)
  commonUsage: string;                 // Description of when this template is commonly used
  examples: string[];                  // Full examples of citations using this template
}
```

### Citation Field Types

```typescript
enum CitationFieldType {
  TEXT = 'TEXT',                      // Regular text field
  PERSON_NAME = 'PERSON_NAME',        // Person name field
  DATE = 'DATE',                      // Date field
  PLACE = 'PLACE',                    // Place field
  NUMBER = 'NUMBER',                  // Numeric field
  REPOSITORY = 'REPOSITORY',          // Repository field
  URL = 'URL',                        // URL field
  FREEFORM = 'FREEFORM'               // Freeform text area
}
```

### Citation Format Styles

```typescript
enum CitationFormatStyle {
  FULL = 'FULL',                      // Full/first reference
  SHORT = 'SHORT',                    // Short/subsequent reference
  BIBLIOGRAPHY = 'BIBLIOGRAPHY'       // Bibliography entry
}
```

### Template Categories

Categories based on Mills' classification in "Evidence Explained":

```typescript
enum CitationTemplateCategory {
  ARCHIVES_ARTIFACTS = 'ARCHIVES_ARTIFACTS',      
  BUSINESS_RAILROAD_RECORDS = 'BUSINESS_RAILROAD_RECORDS',
  CEMETERY_BURIAL_RECORDS = 'CEMETERY_BURIAL_RECORDS',
  CENSUS_RECORDS = 'CENSUS_RECORDS',              
  CHURCH_RECORDS = 'CHURCH_RECORDS',             
  COURT_RECORDS = 'COURT_RECORDS',
  // Additional categories...
}
```

## Integration with System Components

The Citation Management Services integrate with:

- **Data Layer**: Uses MongoDB for storing citation templates and formatted citations
- **Source Management**: Provides citation templates for standardized source attribution
- **Evidence Analysis Services**: Supports the evidence evaluation framework with quality citations
- **API Layer**: Provides citation management capabilities for client applications

## Citation Formatting Process

1. User selects a citation template appropriate for the source type
2. System presents form with required and optional fields based on template
3. User enters citation elements (source details)
4. System validates all required fields are present
5. System formats the citation according to requested style
6. Formatted citation is stored with the source and can be used in research reports

## Template Format Patterns

Templates include format patterns for different citation styles:

- **Full Style**: Complete citation for first reference
  - Example: "Birth Certificate for John Smith, 10 May 1920, Madison County, New York, certificate VR-1920-123, Madison County Clerk's Office, accessed 15 January 2023."

- **Short Style**: Abbreviated citation for subsequent references
  - Example: "John Smith Birth Certificate (10 May 1920)"

- **Bibliography Style**: Citation format for bibliographies
  - Example: "Madison County, New York. Birth Certificate for John Smith, 10 May 1920. Madison County Clerk's Office."

## Implementation Strategy

### Phase 1: Core Template Management

- Implement citation template data model
- Create template management service
- Develop basic formatting capabilities
- Integrate with existing source model

### Phase 2: Advanced Formatting

- Implement full citation formatting service
- Support all citation styles (full, short, bibliography)
- Add template validation
- Create batch formatting capabilities

### Phase 3: Template Library

- Implement template library management
- Create initial set of templates based on Mills' standards
- Categorize templates by source type
- Add search and filtering capabilities

### Phase 4: Integration and UI

- Integrate with evidence analysis framework
- Create user interface for template selection
- Add citation quality assessment
- Implement citation preview and export

## Usage Examples

### Creating a Citation Using a Template

```typescript
// Get the citation template
const template = await citationTemplateService.getTemplateById('template-birth-certificate');

// Prepare citation elements
const elements = {
  recordType: 'Birth Certificate',
  name: 'John Smith',
  date: '10 May 1920',
  place: 'Madison County, New York',
  certificate: 'VR-1920-123',
  repository: 'Madison County Courthouse',
  accessed: '15 January 2023'
};

// Format the citation
const formattedCitation = await citationTemplateService.formatCitation(
  template.id,
  elements,
  CitationFormatStyle.FULL
);

// Result: "Birth Certificate for John Smith, 10 May 1920, Madison County, New York, 
//         certificate VR-1920-123, Madison County Courthouse, accessed 15 January 2023."
```

### Adding a Citation to a Source

```typescript
// Create a new citation
const citation = {
  id: generateUniqueId(),
  sourceId: 'source-123',
  citationTemplate: 'template-birth-certificate',
  elements: {
    recordType: 'Birth Certificate',
    name: 'John Smith',
    date: '10 May 1920',
    place: 'Madison County, New York',
    certificate: 'VR-1920-123',
    repository: 'Madison County Courthouse',
    accessed: '15 January 2023'
  },
  quality: CitationQuality.COMPLETE,
  notes: 'Original birth certificate'
};

// Generate formatted versions
const citationWithFormatting = await citationFormatterService.generateFormattedCitation(citation);

// Save the citation
await saveCitation(citationWithFormatting);
```

## Conclusion

The Citation Management Services provide a comprehensive framework for managing and formatting citations according to professional genealogical standards. They support the creation of high-quality source citations with appropriate attribution, which is a cornerstone of the Genealogical Proof Standard.

By implementing these services, the Genealogy Database System ensures that all assertions are properly sourced and that citations follow consistent, professional standards based on Elizabeth Shown Mills' evidence evaluation framework.