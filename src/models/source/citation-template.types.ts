/**
 * Citation Template Types
 * Based on the Elizabeth Shown Mills evidence evaluation framework
 * and "Evidence Explained" citation formats
 */

import { SourceType } from './types';

/**
 * Citation field types used in templates
 */
export enum CitationFieldType {
  TEXT = 'TEXT',                      // Regular text field
  PERSON_NAME = 'PERSON_NAME',        // Person name field
  DATE = 'DATE',                      // Date field
  PLACE = 'PLACE',                    // Place field
  NUMBER = 'NUMBER',                  // Numeric field
  REPOSITORY = 'REPOSITORY',          // Repository field
  URL = 'URL',                        // URL field
  FREEFORM = 'FREEFORM'               // Freeform text area
}

/**
 * Citation format style type
 */
export enum CitationFormatStyle {
  FULL = 'FULL',                      // Full/first reference
  SHORT = 'SHORT',                    // Short/subsequent reference
  BIBLIOGRAPHY = 'BIBLIOGRAPHY'       // Bibliography entry
}

/**
 * Citation template category based on Mills' classification
 */
export enum CitationTemplateCategory {
  // Primary categories from Evidence Explained
  ARCHIVES_ARTIFACTS = 'ARCHIVES_ARTIFACTS',      // Chapter 3
  BUSINESS_RAILROAD_RECORDS = 'BUSINESS_RAILROAD_RECORDS', // Chapter 4
  CEMETERY_BURIAL_RECORDS = 'CEMETERY_BURIAL_RECORDS', // Chapter 5
  CENSUS_RECORDS = 'CENSUS_RECORDS',              // Chapter 6
  CHURCH_RECORDS = 'CHURCH_RECORDS',              // Chapter 7
  COURT_RECORDS = 'COURT_RECORDS',                // Chapter 8
  DNA_EVIDENCE = 'DNA_EVIDENCE',                  // Chapter 9
  GOVERNMENT_DOCUMENTS = 'GOVERNMENT_DOCUMENTS',  // Chapter 10
  INSTITUTIONAL_RECORDS = 'INSTITUTIONAL_RECORDS', // Chapter 11
  INTERVIEWS_VIDEOS = 'INTERVIEWS_VIDEOS',        // Chapter 12
  LAND_PROPERTY_RECORDS = 'LAND_PROPERTY_RECORDS', // Chapter 13
  LEGAL_REFERENCES = 'LEGAL_REFERENCES',          // Chapter 14
  MILITARY_RECORDS = 'MILITARY_RECORDS',          // Chapter 15
  NEWSPAPERS_MAGAZINES = 'NEWSPAPERS_MAGAZINES',  // Chapter 16
  PUBLICATIONS = 'PUBLICATIONS',                  // Chapter 17
  REFERENCE_WORKS = 'REFERENCE_WORKS',            // Chapter 18
  TAX_RECORDS = 'TAX_RECORDS',                    // Chapter 19
  VITAL_RECORDS = 'VITAL_RECORDS',                // Chapter 20
  
  // Subcategories for common types
  DIGITAL_RESOURCE = 'DIGITAL_RESOURCE',          // Online records
  AUTHORED_WORK = 'AUTHORED_WORK',                // Compiled sources
  OTHER = 'OTHER'                                 // Miscellaneous
}

/**
 * Citation template field definition
 * Defines a single element/field in a citation template
 */
export interface CitationTemplateField {
  id: string;                          // Field identifier (e.g., "author", "title")
  name: string;                        // Display name for the field
  description: string;                 // Description of what should be entered
  type: CitationFieldType;             // Type of field
  required: boolean;                   // Whether the field is required
  defaultValue?: string;               // Default value if any
  placeholder?: string;                // Example/placeholder text
  helpText?: string;                   // Additional guidance for completing the field
  validationPattern?: string;          // Regex validation pattern if applicable
  maxLength?: number;                  // Maximum character length
  order: number;                       // Display order in form
}

/**
 * Citation format pattern for a specific style
 */
export interface CitationFormatPattern {
  style: CitationFormatStyle;          // Which style this pattern is for
  formatString: string;                // Format string with {fieldId} placeholders
  description: string;                 // Description of this format
  example: string;                     // Example of the format with sample data
}

/**
 * Citation template entity
 * Defines a template for creating standardized citations
 * Based on Elizabeth Shown Mills' Evidence Explained formats
 */
export interface CitationTemplate {
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
  created: {
    date: Date;
    user: string;
  };
  lastModified: {
    date: Date;
    user: string;
  };
  version: number;                     // Version tracking
}

/**
 * Citation template library
 * Collection of citation templates with metadata
 */
export interface CitationTemplateLibrary {
  id: string;                          // Library identifier
  name: string;                        // Library name
  description: string;                 // Library description
  version: string;                     // Library version
  source: string;                      // Source of templates (e.g., "Evidence Explained 4th Edition")
  templates: CitationTemplate[];       // Templates in this library
  created: {
    date: Date;
    user: string;
  };
  lastModified: {
    date: Date;
    user: string;
  };
}