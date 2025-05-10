/**
 * Citation Formatter Service
 * Handles formatting of citations according to Elizabeth Shown Mills standards
 */

import { logger } from '../../utils/logger';
import { Citation } from '../../models/source/types';
import { CitationFormatStyle } from '../../models/source/citation-template.types';
import { CitationTemplateService } from './citation-template.service';

/**
 * Citation Formatter Service interface
 */
export interface CitationFormatterService {
  formatCitation(citation: Citation, style: CitationFormatStyle): Promise<string>;
  batchFormatCitations(citations: Citation[], style: CitationFormatStyle): Promise<Record<string, string>>;
  generateFormattedCitation(citation: Citation): Promise<Citation>;
  updateFormattedCitations(citationId: string): Promise<Citation | null>;
}

/**
 * Implementation of the Citation Formatter Service
 */
export class CitationFormatterServiceImpl implements CitationFormatterService {
  private citationTemplateService: CitationTemplateService;
  
  constructor(citationTemplateService: CitationTemplateService) {
    this.citationTemplateService = citationTemplateService;
    logger.info('Citation Formatter Service initialized');
  }
  
  /**
   * Format a citation according to a specific style
   * @param citation Citation to format
   * @param style Citation style to use
   * @returns Formatted citation string
   */
  async formatCitation(
    citation: Citation, 
    style: CitationFormatStyle = CitationFormatStyle.FULL
  ): Promise<string> {
    try {
      // If citation already has cached formatted versions, return it
      if (citation.formatted && style === CitationFormatStyle.FULL && citation.formatted.fullStyle) {
        return citation.formatted.fullStyle;
      }
      if (citation.formatted && style === CitationFormatStyle.SHORT && citation.formatted.shortStyle) {
        return citation.formatted.shortStyle;
      }
      if (citation.formatted && style === CitationFormatStyle.BIBLIOGRAPHY && citation.formatted.bibStyle) {
        return citation.formatted.bibStyle;
      }
      
      // If no template is specified, use simplified formatting
      if (!citation.citationTemplate) {
        return this.generateSimpleFormatting(citation, style);
      }
      
      // Format using template
      const formatted = await this.citationTemplateService.formatCitation(
        citation.citationTemplate,
        citation.elements,
        style
      );
      
      return formatted;
    } catch (error) {
      logger.error(`Error formatting citation ${citation.id}:`, error);
      throw error;
    }
  }
  
  /**
   * Format multiple citations in batch
   * @param citations Citations to format
   * @param style Citation style to use
   * @returns Record of citation IDs to formatted strings
   */
  async batchFormatCitations(
    citations: Citation[], 
    style: CitationFormatStyle = CitationFormatStyle.FULL
  ): Promise<Record<string, string>> {
    try {
      const results: Record<string, string> = {};
      
      // Process each citation
      const promises = citations.map(async (citation) => {
        const formatted = await this.formatCitation(citation, style);
        results[citation.id] = formatted;
      });
      
      await Promise.all(promises);
      return results;
    } catch (error) {
      logger.error(`Error batch formatting citations:`, error);
      throw error;
    }
  }
  
  /**
   * Generate all formatted citation styles and update the citation object
   * @param citation Citation to format
   * @returns Updated citation with formatted strings
   */
  async generateFormattedCitation(citation: Citation): Promise<Citation> {
    try {
      // Format citation in all styles
      const fullStyle = await this.formatCitation(citation, CitationFormatStyle.FULL);
      const shortStyle = await this.formatCitation(citation, CitationFormatStyle.SHORT);
      const bibStyle = await this.formatCitation(citation, CitationFormatStyle.BIBLIOGRAPHY);
      
      // Update citation with formatted strings
      const updatedCitation = {
        ...citation,
        formatted: {
          fullStyle,
          shortStyle,
          bibStyle
        }
      };
      
      return updatedCitation;
    } catch (error) {
      logger.error(`Error generating formatted citation for ${citation.id}:`, error);
      throw error;
    }
  }
  
  /**
   * Update the formatted citations for a citation by ID
   * @param citationId Citation ID
   * @returns Updated citation or null if not found
   */
  async updateFormattedCitations(citationId: string): Promise<Citation | null> {
    try {
      // This would require accessing the CitationModel, which would create
      // a circular dependency if imported here. In a real implementation, 
      // this would be handled by a higher-level service or repository pattern.
      
      // For this implementation, we'll just log that this would be implemented
      logger.info(`Citation formatting update for ${citationId} would update the database`);
      
      // Return null to indicate this is not fully implemented
      return null;
    } catch (error) {
      logger.error(`Error updating formatted citations for ${citationId}:`, error);
      throw error;
    }
  }
  
  /**
   * Generate simple formatting when no template is available
   * @param citation Citation to format
   * @param style Citation style
   * @returns Formatted citation string
   */
  private generateSimpleFormatting(
    citation: Citation, 
    style: CitationFormatStyle
  ): string {
    // Extract common elements
    const elements = citation.elements;
    
    // Simple formatting based on style
    switch (style) {
      case CitationFormatStyle.FULL:
        return this.generateSimpleFullCitation(elements);
      
      case CitationFormatStyle.SHORT:
        return this.generateSimpleShortCitation(elements);
      
      case CitationFormatStyle.BIBLIOGRAPHY:
        return this.generateSimpleBibliographyCitation(elements);
      
      default:
        return this.generateSimpleFullCitation(elements);
    }
  }
  
  /**
   * Generate simple full citation
   * @param elements Citation elements
   * @returns Formatted citation string
   */
  private generateSimpleFullCitation(elements: Record<string, string>): string {
    let citation = '';
    
    // Author/creator
    if (elements.author) {
      citation += elements.author;
      citation += elements.title ? ', ' : '. ';
    }
    
    // Title
    if (elements.title) {
      citation += `"${elements.title}"`;
      citation += '. ';
    }
    
    // Publication info
    if (elements.publication) {
      citation += elements.publication;
      citation += elements.date ? ', ' : '. ';
    }
    
    // Date
    if (elements.date) {
      citation += elements.date;
      citation += '. ';
    }
    
    // Location
    if (elements.location) {
      citation += elements.location;
      citation += '. ';
    }
    
    // Repository
    if (elements.repository) {
      citation += elements.repository;
      citation += '. ';
    }
    
    // URL
    if (elements.url) {
      citation += `${elements.url}`;
      citation += elements.accessed ? ' ' : '. ';
    }
    
    // Access date
    if (elements.accessed) {
      citation += `(accessed ${elements.accessed})`;
      citation += '. ';
    }
    
    // Clean up and return
    return citation.trim();
  }
  
  /**
   * Generate simple short citation
   * @param elements Citation elements
   * @returns Formatted citation string
   */
  private generateSimpleShortCitation(elements: Record<string, string>): string {
    let citation = '';
    
    // Author/creator
    if (elements.author) {
      const lastNameMatch = elements.author.match(/([^,]+)(?:,|$)/);
      const lastName = lastNameMatch ? lastNameMatch[1].trim() : elements.author;
      citation += lastName;
      citation += ', ';
    }
    
    // Title - shortened if needed
    if (elements.title) {
      const shortTitle = elements.title.length > 30 
        ? elements.title.substring(0, 30).trim() + '...'
        : elements.title;
      
      citation += `"${shortTitle}"`;
      citation += elements.date ? ', ' : '. ';
    }
    
    // Date
    if (elements.date) {
      citation += elements.date;
      citation += '. ';
    }
    
    // Clean up and return
    return citation.trim();
  }
  
  /**
   * Generate simple bibliography citation
   * @param elements Citation elements
   * @returns Formatted citation string
   */
  private generateSimpleBibliographyCitation(elements: Record<string, string>): string {
    let citation = '';
    
    // Author/creator - last name first
    if (elements.author) {
      if (elements.author.includes(',')) {
        citation += elements.author;
      } else {
        const nameParts = elements.author.trim().split(' ');
        const lastName = nameParts.pop() || '';
        const firstName = nameParts.join(' ');
        citation += `${lastName}, ${firstName}`;
      }
      citation += '. ';
    }
    
    // Title
    if (elements.title) {
      citation += `${elements.title}`;
      citation += '. ';
    }
    
    // Publication info
    if (elements.publication) {
      citation += elements.publication;
      citation += '. ';
    }
    
    // Location
    if (elements.location) {
      citation += elements.location;
      citation += ': ';
    }
    
    // Publisher
    if (elements.publisher) {
      citation += elements.publisher;
      citation += ', ';
    }
    
    // Date
    if (elements.date) {
      citation += elements.date;
      citation += '. ';
    }
    
    // Clean up and return
    return citation.trim();
  }
}