/**
 * Citation Template Service
 * Implements the management of citation templates based on Elizabeth Shown Mills standards
 */

import { logger } from '../../utils/logger';
import { 
  CitationTemplate, 
  CitationTemplateLibrary,
  CitationTemplateCategory,
  CitationFormatStyle
} from '../../models/source/citation-template.types';
import { 
  CitationTemplateModel, 
  CitationTemplateLibraryModel 
} from '../../models/source/citation-template.schema';
import { SourceType } from '../../models/source/types';

/**
 * Citation Template Service interface
 */
export interface CitationTemplateService {
  // Template management
  getTemplateById(id: string): Promise<CitationTemplate | null>;
  getTemplatesByCategory(category: CitationTemplateCategory): Promise<CitationTemplate[]>;
  getTemplatesBySourceType(sourceType: SourceType): Promise<CitationTemplate[]>;
  searchTemplates(query: string): Promise<CitationTemplate[]>;
  createTemplate(template: CitationTemplate): Promise<CitationTemplate>;
  updateTemplate(id: string, template: Partial<CitationTemplate>): Promise<CitationTemplate | null>;
  deleteTemplate(id: string): Promise<boolean>;
  
  // Template library management
  getLibraryById(id: string): Promise<CitationTemplateLibrary | null>;
  getAllLibraries(): Promise<CitationTemplateLibrary[]>;
  createLibrary(library: CitationTemplateLibrary): Promise<CitationTemplateLibrary>;
  updateLibrary(id: string, library: Partial<CitationTemplateLibrary>): Promise<CitationTemplateLibrary | null>;
  deleteLibrary(id: string): Promise<boolean>;
  
  // Template usage
  formatCitation(
    templateId: string, 
    elements: Record<string, string>, 
    style: CitationFormatStyle
  ): Promise<string>;
  
  // Utility functions
  validateTemplateFields(
    templateId: string, 
    elements: Record<string, string>
  ): Promise<{ valid: boolean; missing: string[]; invalid: string[] }>;
}

/**
 * Implementation of the Citation Template Service
 */
export class CitationTemplateServiceImpl implements CitationTemplateService {
  /**
   * Get a template by ID
   * @param id Template ID
   * @returns Citation template or null if not found
   */
  async getTemplateById(id: string): Promise<CitationTemplate | null> {
    try {
      const template = await CitationTemplateModel.findOne({ id }).exec();
      return template;
    } catch (error) {
      logger.error(`Error retrieving citation template ${id}:`, error);
      throw error;
    }
  }
  
  /**
   * Get templates by category
   * @param category Template category
   * @returns Array of citation templates
   */
  async getTemplatesByCategory(category: CitationTemplateCategory): Promise<CitationTemplate[]> {
    try {
      const templates = await CitationTemplateModel.find({ category }).exec();
      return templates;
    } catch (error) {
      logger.error(`Error retrieving citation templates for category ${category}:`, error);
      throw error;
    }
  }
  
  /**
   * Get templates by source type
   * @param sourceType Source type
   * @returns Array of citation templates
   */
  async getTemplatesBySourceType(sourceType: SourceType): Promise<CitationTemplate[]> {
    try {
      const templates = await CitationTemplateModel.find({ 
        sourceTypes: sourceType 
      }).exec();
      return templates;
    } catch (error) {
      logger.error(`Error retrieving citation templates for source type ${sourceType}:`, error);
      throw error;
    }
  }
  
  /**
   * Search templates by text query
   * @param query Search query
   * @returns Array of matching citation templates
   */
  async searchTemplates(query: string): Promise<CitationTemplate[]> {
    try {
      const templates = await CitationTemplateModel.find({
        $text: { $search: query }
      }).exec();
      return templates;
    } catch (error) {
      logger.error(`Error searching citation templates for "${query}":`, error);
      throw error;
    }
  }
  
  /**
   * Create a new citation template
   * @param template Template to create
   * @returns Created template
   */
  async createTemplate(template: CitationTemplate): Promise<CitationTemplate> {
    try {
      // Check if template with this ID already exists
      const existing = await CitationTemplateModel.findOne({ id: template.id }).exec();
      if (existing) {
        throw new Error(`Template with ID ${template.id} already exists`);
      }
      
      // Create new template
      const newTemplate = new CitationTemplateModel(template);
      await newTemplate.save();
      return newTemplate;
    } catch (error) {
      logger.error(`Error creating citation template:`, error);
      throw error;
    }
  }
  
  /**
   * Update an existing citation template
   * @param id Template ID
   * @param template Template fields to update
   * @returns Updated template or null if not found
   */
  async updateTemplate(
    id: string, 
    template: Partial<CitationTemplate>
  ): Promise<CitationTemplate | null> {
    try {
      // Find and update template
      const updatedTemplate = await CitationTemplateModel.findOneAndUpdate(
        { id },
        { 
          ...template,
          'lastModified.date': new Date()
        },
        { new: true }
      ).exec();
      
      return updatedTemplate;
    } catch (error) {
      logger.error(`Error updating citation template ${id}:`, error);
      throw error;
    }
  }
  
  /**
   * Delete a citation template
   * @param id Template ID
   * @returns True if deleted, false if not found
   */
  async deleteTemplate(id: string): Promise<boolean> {
    try {
      const result = await CitationTemplateModel.deleteOne({ id }).exec();
      return result.deletedCount > 0;
    } catch (error) {
      logger.error(`Error deleting citation template ${id}:`, error);
      throw error;
    }
  }
  
  /**
   * Get a template library by ID
   * @param id Library ID
   * @returns Template library or null if not found
   */
  async getLibraryById(id: string): Promise<CitationTemplateLibrary | null> {
    try {
      const library = await CitationTemplateLibraryModel.findOne({ id })
        .populate('templates')
        .exec();
      return library;
    } catch (error) {
      logger.error(`Error retrieving citation template library ${id}:`, error);
      throw error;
    }
  }
  
  /**
   * Get all template libraries
   * @returns Array of template libraries
   */
  async getAllLibraries(): Promise<CitationTemplateLibrary[]> {
    try {
      const libraries = await CitationTemplateLibraryModel.find().exec();
      return libraries;
    } catch (error) {
      logger.error(`Error retrieving all citation template libraries:`, error);
      throw error;
    }
  }
  
  /**
   * Create a new template library
   * @param library Library to create
   * @returns Created library
   */
  async createLibrary(library: CitationTemplateLibrary): Promise<CitationTemplateLibrary> {
    try {
      // Check if library with this ID already exists
      const existing = await CitationTemplateLibraryModel.findOne({ id: library.id }).exec();
      if (existing) {
        throw new Error(`Template library with ID ${library.id} already exists`);
      }
      
      // Create new library
      const newLibrary = new CitationTemplateLibraryModel(library);
      await newLibrary.save();
      return newLibrary;
    } catch (error) {
      logger.error(`Error creating citation template library:`, error);
      throw error;
    }
  }
  
  /**
   * Update an existing template library
   * @param id Library ID
   * @param library Library fields to update
   * @returns Updated library or null if not found
   */
  async updateLibrary(
    id: string, 
    library: Partial<CitationTemplateLibrary>
  ): Promise<CitationTemplateLibrary | null> {
    try {
      // Find and update library
      const updatedLibrary = await CitationTemplateLibraryModel.findOneAndUpdate(
        { id },
        { 
          ...library,
          'lastModified.date': new Date()
        },
        { new: true }
      ).exec();
      
      return updatedLibrary;
    } catch (error) {
      logger.error(`Error updating citation template library ${id}:`, error);
      throw error;
    }
  }
  
  /**
   * Delete a template library
   * @param id Library ID
   * @returns True if deleted, false if not found
   */
  async deleteLibrary(id: string): Promise<boolean> {
    try {
      const result = await CitationTemplateLibraryModel.deleteOne({ id }).exec();
      return result.deletedCount > 0;
    } catch (error) {
      logger.error(`Error deleting citation template library ${id}:`, error);
      throw error;
    }
  }
  
  /**
   * Format a citation using a template and provided elements
   * @param templateId Template ID
   * @param elements Citation elements
   * @param style Citation style
   * @returns Formatted citation string
   */
  async formatCitation(
    templateId: string, 
    elements: Record<string, string>, 
    style: CitationFormatStyle = CitationFormatStyle.FULL
  ): Promise<string> {
    try {
      // Get the template
      const template = await this.getTemplateById(templateId);
      if (!template) {
        throw new Error(`Template ${templateId} not found`);
      }
      
      // Find the format pattern for the requested style
      const formatPattern = template.formatPatterns.find(p => p.style === style);
      if (!formatPattern) {
        throw new Error(`Format pattern for style ${style} not found in template ${templateId}`);
      }
      
      // Validate required fields are present
      const validation = await this.validateTemplateFields(templateId, elements);
      if (!validation.valid) {
        throw new Error(`Missing required fields: ${validation.missing.join(', ')}`);
      }
      
      // Format the citation
      let formattedCitation = formatPattern.formatString;
      
      // Replace all {fieldId} placeholders with their values
      for (const [key, value] of Object.entries(elements)) {
        const placeholder = `{${key}}`;
        formattedCitation = formattedCitation.replace(
          new RegExp(placeholder, 'g'), 
          value
        );
      }
      
      // Remove any remaining placeholders for optional fields
      formattedCitation = formattedCitation.replace(/\{[^{}]+\}/g, '');
      
      // Clean up any double spaces, double punctuation, etc.
      formattedCitation = this.cleanFormattedCitation(formattedCitation);
      
      return formattedCitation;
    } catch (error) {
      logger.error(`Error formatting citation:`, error);
      throw error;
    }
  }
  
  /**
   * Validate that all required fields for a template are present
   * @param templateId Template ID
   * @param elements Citation elements
   * @returns Validation result
   */
  async validateTemplateFields(
    templateId: string, 
    elements: Record<string, string>
  ): Promise<{ valid: boolean; missing: string[]; invalid: string[] }> {
    try {
      // Get the template
      const template = await this.getTemplateById(templateId);
      if (!template) {
        throw new Error(`Template ${templateId} not found`);
      }
      
      const missing: string[] = [];
      const invalid: string[] = [];
      
      // Check for missing required fields
      for (const field of template.fields) {
        if (field.required && (!elements[field.id] || elements[field.id].trim() === '')) {
          missing.push(field.id);
        }
        
        // Check field validation patterns if present
        if (
          field.validationPattern && 
          elements[field.id] && 
          !new RegExp(field.validationPattern).test(elements[field.id])
        ) {
          invalid.push(field.id);
        }
      }
      
      return {
        valid: missing.length === 0 && invalid.length === 0,
        missing,
        invalid
      };
    } catch (error) {
      logger.error(`Error validating template fields:`, error);
      throw error;
    }
  }
  
  /**
   * Clean up a formatted citation string
   * Remove double spaces, fix punctuation, etc.
   * @param citation Formatted citation string
   * @returns Cleaned citation string
   */
  private cleanFormattedCitation(citation: string): string {
    let cleaned = citation;
    
    // Remove optional placeholders with their surrounding punctuation
    cleaned = cleaned.replace(/\s*\[[^[\]]*\{[^{}]+\}[^[\]]*\]/g, '');
    
    // Fix double spaces
    cleaned = cleaned.replace(/\s{2,}/g, ' ');
    
    // Fix punctuation spacing
    cleaned = cleaned.replace(/\s+([.,;:!?)])/g, '$1');
    cleaned = cleaned.replace(/([([])(\s+)/g, '$1');
    
    // Fix double punctuation
    cleaned = cleaned.replace(/([.,;:!?])([.,;:!?])+/g, '$1');
    
    // Clean up empty parentheses
    cleaned = cleaned.replace(/\(\s*\)/g, '');
    cleaned = cleaned.replace(/\[\s*\]/g, '');
    
    // Trim white space
    cleaned = cleaned.trim();
    
    // Ensure the citation ends with a period unless it ends with another punctuation mark
    if (!/[.,;:!?]$/.test(cleaned)) {
      cleaned += '.';
    }
    
    return cleaned;
  }
}