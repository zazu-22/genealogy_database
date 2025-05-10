/**
 * Citation Integration Service
 * Integrates the Citation Management Services with the Evidence Analysis framework
 */

import { logger } from '../../utils/logger';
import { 
  Citation, 
  Source, 
  SourceModel, 
  CitationModel 
} from '../../models/source/schema';
import { CitationQuality } from '../../models/common/types';
import { 
  CitationTemplateService 
} from '../citation/citation-template.service';
import { 
  CitationFormatterService 
} from '../citation/citation-formatter.service';
import { CitationFormatStyle } from '../../models/source/citation-template.types';
import { EvidenceAnalysisService } from './types';

/**
 * Citation Integration Service interface
 */
export interface CitationIntegrationService {
  // Citation-Source Integration
  addCitationToSource(
    sourceId: string, 
    citationData: Partial<Citation>
  ): Promise<Citation>;
  
  getCitationsForSource(sourceId: string): Promise<Citation[]>;
  
  updateCitationWithSource(
    citationId: string, 
    sourceId: string
  ): Promise<Citation | null>;
  
  // Citation-Evidence Integration
  assessCitationQuality(citation: Citation): Promise<CitationQuality>;
  
  getCitationsByQuality(quality: CitationQuality): Promise<Citation[]>;
  
  updateCitationQualityAssessment(
    citationId: string
  ): Promise<Citation | null>;
  
  // Evidence Analysis Integration
  getEvidenceStrengthForCitation(
    citationId: string, 
    researchQuestionId: string
  ): Promise<number>;
}

/**
 * Implementation of the Citation Integration Service
 */
export class CitationIntegrationServiceImpl implements CitationIntegrationService {
  private citationTemplateService: CitationTemplateService;
  private citationFormatterService: CitationFormatterService;
  private evidenceAnalysisService: EvidenceAnalysisService;
  
  constructor(
    citationTemplateService: CitationTemplateService,
    citationFormatterService: CitationFormatterService,
    evidenceAnalysisService: EvidenceAnalysisService
  ) {
    this.citationTemplateService = citationTemplateService;
    this.citationFormatterService = citationFormatterService;
    this.evidenceAnalysisService = evidenceAnalysisService;
    
    logger.info('Citation Integration Service initialized');
  }
  
  /**
   * Add a citation to a source
   * @param sourceId Source ID
   * @param citationData Citation data
   * @returns Created citation
   */
  async addCitationToSource(
    sourceId: string, 
    citationData: Partial<Citation>
  ): Promise<Citation> {
    try {
      // Check if source exists
      const source = await SourceModel.findOne({ id: sourceId }).exec();
      if (!source) {
        throw new Error(`Source ${sourceId} not found`);
      }
      
      // Format citation if template is specified
      let formatted;
      if (citationData.citationTemplate && citationData.elements) {
        const fullStyle = await this.citationTemplateService.formatCitation(
          citationData.citationTemplate,
          citationData.elements,
          CitationFormatStyle.FULL
        );
        
        const shortStyle = await this.citationTemplateService.formatCitation(
          citationData.citationTemplate,
          citationData.elements,
          CitationFormatStyle.SHORT
        );
        
        const bibStyle = await this.citationTemplateService.formatCitation(
          citationData.citationTemplate,
          citationData.elements,
          CitationFormatStyle.BIBLIOGRAPHY
        );
        
        formatted = {
          fullStyle,
          shortStyle,
          bibStyle
        };
      }
      
      // Assess citation quality
      const quality = citationData.quality || 
        await this.assessCitationQuality(citationData as Citation);
      
      // Create citation
      const citation = new CitationModel({
        ...citationData,
        sourceId,
        quality,
        formatted
      });
      
      await citation.save();
      
      logger.info(`Added citation ${citation.id} to source ${sourceId}`);
      
      return citation;
    } catch (error) {
      logger.error(`Error adding citation to source ${sourceId}:`, error);
      throw error;
    }
  }
  
  /**
   * Get all citations for a source
   * @param sourceId Source ID
   * @returns Array of citations
   */
  async getCitationsForSource(sourceId: string): Promise<Citation[]> {
    try {
      const citations = await CitationModel.find({ sourceId }).exec();
      return citations;
    } catch (error) {
      logger.error(`Error getting citations for source ${sourceId}:`, error);
      throw error;
    }
  }
  
  /**
   * Update a citation with a new source
   * @param citationId Citation ID
   * @param sourceId Source ID
   * @returns Updated citation
   */
  async updateCitationWithSource(
    citationId: string, 
    sourceId: string
  ): Promise<Citation | null> {
    try {
      // Check if source exists
      const source = await SourceModel.findOne({ id: sourceId }).exec();
      if (!source) {
        throw new Error(`Source ${sourceId} not found`);
      }
      
      // Update citation
      const citation = await CitationModel.findOneAndUpdate(
        { id: citationId },
        { 
          sourceId,
          'lastModified.date': new Date()
        },
        { new: true }
      ).exec();
      
      if (citation) {
        logger.info(`Updated citation ${citationId} with source ${sourceId}`);
      }
      
      return citation;
    } catch (error) {
      logger.error(`Error updating citation ${citationId} with source ${sourceId}:`, error);
      throw error;
    }
  }
  
  /**
   * Assess the quality of a citation
   * @param citation Citation to assess
   * @returns Citation quality assessment
   */
  async assessCitationQuality(citation: Citation): Promise<CitationQuality> {
    try {
      // If quality is already set, return it
      if (citation.quality) {
        return citation.quality;
      }
      
      // Check if template exists for this citation
      if (!citation.citationTemplate) {
        return CitationQuality.MINIMAL;
      }
      
      // Get the template
      const template = await this.citationTemplateService.getTemplateById(
        citation.citationTemplate
      );
      
      if (!template) {
        return CitationQuality.MINIMAL;
      }
      
      // Validate against template
      const validation = await this.citationTemplateService.validateTemplateFields(
        citation.citationTemplate,
        citation.elements
      );
      
      // Calculate quality based on required fields
      if (validation.valid) {
        // Count optional fields
        const optionalFields = template.fields.filter(field => !field.required);
        const providedOptionalFields = optionalFields.filter(
          field => citation.elements[field.id] && citation.elements[field.id].trim() !== ''
        );
        
        // Determine quality based on optional field coverage
        const optionalFieldRatio = providedOptionalFields.length / optionalFields.length;
        
        if (optionalFieldRatio >= 0.8) {
          return CitationQuality.COMPLETE;
        } else if (optionalFieldRatio >= 0.4) {
          return CitationQuality.PARTIAL;
        } else {
          return CitationQuality.MINIMAL;
        }
      } else {
        // Missing required fields
        return CitationQuality.MINIMAL;
      }
    } catch (error) {
      logger.error(`Error assessing citation quality:`, error);
      
      // Default to minimal if there's an error
      return CitationQuality.MINIMAL;
    }
  }
  
  /**
   * Get citations by quality assessment
   * @param quality Citation quality to filter by
   * @returns Array of citations
   */
  async getCitationsByQuality(quality: CitationQuality): Promise<Citation[]> {
    try {
      const citations = await CitationModel.find({ quality }).exec();
      return citations;
    } catch (error) {
      logger.error(`Error getting citations by quality ${quality}:`, error);
      throw error;
    }
  }
  
  /**
   * Update the quality assessment for a citation
   * @param citationId Citation ID
   * @returns Updated citation
   */
  async updateCitationQualityAssessment(
    citationId: string
  ): Promise<Citation | null> {
    try {
      // Get the citation
      const citation = await CitationModel.findOne({ id: citationId }).exec();
      if (!citation) {
        return null;
      }
      
      // Assess quality
      const quality = await this.assessCitationQuality(citation);
      
      // Update citation if quality has changed
      if (quality !== citation.quality) {
        const updatedCitation = await CitationModel.findOneAndUpdate(
          { id: citationId },
          { 
            quality,
            'lastModified.date': new Date()
          },
          { new: true }
        ).exec();
        
        logger.info(`Updated citation ${citationId} quality to ${quality}`);
        
        return updatedCitation;
      }
      
      return citation;
    } catch (error) {
      logger.error(`Error updating citation quality assessment for ${citationId}:`, error);
      throw error;
    }
  }
  
  /**
   * Get the evidence strength for a citation in relation to a research question
   * @param citationId Citation ID
   * @param researchQuestionId Research question ID
   * @returns Evidence strength score (0-100)
   */
  async getEvidenceStrengthForCitation(
    citationId: string, 
    researchQuestionId: string
  ): Promise<number> {
    try {
      // Get the citation
      const citation = await CitationModel.findOne({ id: citationId }).exec();
      if (!citation) {
        throw new Error(`Citation ${citationId} not found`);
      }
      
      // Get the source
      const source = await SourceModel.findOne({ id: citation.sourceId }).exec();
      if (!source) {
        throw new Error(`Source ${citation.sourceId} not found`);
      }
      
      // Calculate evidence weight using Evidence Analysis Service
      const evidenceWeight = await this.evidenceAnalysisService.calculateEvidenceWeight(
        source.id,
        citation.id,
        researchQuestionId
      );
      
      return evidenceWeight;
    } catch (error) {
      logger.error(`Error getting evidence strength for citation ${citationId}:`, error);
      throw error;
    }
  }
}