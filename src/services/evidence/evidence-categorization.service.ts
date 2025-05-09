/**
 * Evidence Categorization Service
 * Implements categorization of evidence as direct, indirect, or negative
 */

import { logger } from '../../utils/logger';
import { EvidenceType } from '../../models/common/types';
import { Citation } from '../../models/source/types';
import { SourceModel, CitationModel } from '../../models/source/schema';
import { EvidenceCategorization } from './types';

/**
 * Implementation of Evidence Categorization Service
 * Classifies evidence based on its relationship to research questions
 */
export class EvidenceCategorizationServiceImpl implements EvidenceCategorization {
  constructor() {
    logger.info('Evidence Categorization Service initialized');
  }

  /**
   * Categorize evidence type for a specific research question
   * @param sourceId Source identifier
   * @param citationId Citation identifier
   * @param researchQuestionId Research question identifier
   * @returns Evidence type assessment
   */
  async categorizeEvidence(
    sourceId: string,
    citationId: string,
    researchQuestionId: string
  ): Promise<EvidenceType> {
    logger.info(`Categorizing evidence for citation ${citationId} related to question ${researchQuestionId}`);
    
    try {
      // Check if it's direct evidence
      const isDirect = await this.isDirectEvidence(sourceId, citationId, researchQuestionId);
      if (isDirect) {
        return EvidenceType.DIRECT;
      }
      
      // Check if it's negative evidence
      const citation = await CitationModel.findOne({ id: citationId }).exec();
      if (!citation) {
        throw new Error(`Citation not found: ${citationId}`);
      }
      
      const isNegative = await this.isNegativeEvidence(sourceId, citation as any, researchQuestionId);
      if (isNegative) {
        return EvidenceType.NEGATIVE;
      }
      
      // Check if it's indirect evidence
      const isIndirect = await this.isIndirectEvidence(sourceId, citationId, researchQuestionId);
      if (isIndirect) {
        return EvidenceType.INDIRECT;
      }
      
      // If it conflicts with other evidence, it's contradictory
      // This would require checking against other evidence for the same question
      const isContradictory = await this.isContradictoryEvidence(sourceId, citationId, researchQuestionId);
      if (isContradictory) {
        return EvidenceType.CONTRADICTORY;
      }
      
      // Default to indirect if we can't determine more specifically
      return EvidenceType.INDIRECT;
      
    } catch (error) {
      logger.error(`Error categorizing evidence:`, error);
      throw error;
    }
  }

  /**
   * Determine if evidence directly answers a research question
   * @param sourceId Source identifier
   * @param citationId Citation identifier
   * @param researchQuestionId Research question identifier
   * @returns Whether evidence directly answers the question
   */
  async isDirectEvidence(
    sourceId: string,
    citationId: string,
    researchQuestionId: string
  ): Promise<boolean> {
    logger.debug(`Checking if citation ${citationId} is direct evidence for question ${researchQuestionId}`);
    
    try {
      // Get the citation and source
      const citation = await CitationModel.findOne({ id: citationId }).exec();
      if (!citation) {
        throw new Error(`Citation not found: ${citationId}`);
      }
      
      const source = await SourceModel.findOne({ id: sourceId }).exec();
      if (!source) {
        throw new Error(`Source not found: ${sourceId}`);
      }
      
      // In a real implementation, we would need to:
      // 1. Retrieve the research question
      // 2. Analyze the content of the citation/source
      // 3. Determine if it directly answers the question
      
      // For now, we'll use a simplified approach
      // We'll assume the source's reliability.evidenceType includes this information
      if ((source as any).reliability?.evidenceType?.includes(EvidenceType.DIRECT)) {
        return true;
      }
      
      // In a complete implementation, we would perform textual analysis or ask the researcher
      // For now, we'll use a simple heuristic based on source type and citation quality
      return false;
      
    } catch (error) {
      logger.error(`Error determining if evidence is direct:`, error);
      throw error;
    }
  }

  /**
   * Determine if evidence indirectly supports a research question
   * @param sourceId Source identifier
   * @param citationId Citation identifier
   * @param researchQuestionId Research question identifier
   * @returns Whether evidence indirectly supports the question
   */
  async isIndirectEvidence(
    sourceId: string,
    citationId: string,
    researchQuestionId: string
  ): Promise<boolean> {
    logger.debug(`Checking if citation ${citationId} is indirect evidence for question ${researchQuestionId}`);
    
    try {
      // Get the source
      const source = await SourceModel.findOne({ id: sourceId }).exec();
      if (!source) {
        throw new Error(`Source not found: ${sourceId}`);
      }
      
      // In a real implementation, we would need to:
      // 1. Retrieve the research question
      // 2. Analyze the content of the citation/source
      // 3. Determine if it indirectly supports the question
      
      // For now, we'll use a simplified approach
      // We'll assume the source's reliability.evidenceType includes this information
      if ((source as any).reliability?.evidenceType?.includes(EvidenceType.INDIRECT)) {
        return true;
      }
      
      // If we've determined it's not direct evidence, and it's not negative or contradictory,
      // then it's likely indirect evidence if it's related to the question at all
      
      // In a complete implementation, we would perform textual analysis or ask the researcher
      // For now, we'll use a simple heuristic
      return true;
      
    } catch (error) {
      logger.error(`Error determining if evidence is indirect:`, error);
      throw error;
    }
  }

  /**
   * Determine if evidence is negative (absence of expected information)
   * @param sourceId Source identifier
   * @param citation Citation object
   * @param researchQuestionId Research question identifier
   * @returns Whether evidence is negative
   */
  async isNegativeEvidence(
    sourceId: string,
    citation: Citation,
    researchQuestionId: string
  ): Promise<boolean> {
    logger.debug(`Checking if citation ${citation.id} is negative evidence for question ${researchQuestionId}`);
    
    try {
      // Get the source
      const source = await SourceModel.findOne({ id: sourceId }).exec();
      if (!source) {
        throw new Error(`Source not found: ${sourceId}`);
      }
      
      // In a real implementation, we would need to:
      // 1. Retrieve the research question
      // 2. Analyze the content of the citation/source
      // 3. Determine if expected information is absent
      
      // For now, we'll use a simplified approach
      // We'll assume the source's reliability.evidenceType includes this information
      if ((source as any).reliability?.evidenceType?.includes(EvidenceType.NEGATIVE)) {
        return true;
      }
      
      // Check for indicators of negative evidence in citation notes
      if (citation.notes) {
        const negativeKeywords = [
          'absent', 'missing', 'not found', 'not listed', 'not mentioned',
          'not recorded', 'no record', 'lack of', 'absence of'
        ];
        
        const notes = citation.notes.toLowerCase();
        if (negativeKeywords.some(keyword => notes.includes(keyword))) {
          return true;
        }
      }
      
      // In a complete implementation, we would perform textual analysis or ask the researcher
      return false;
      
    } catch (error) {
      logger.error(`Error determining if evidence is negative:`, error);
      throw error;
    }
  }

  /**
   * Determine if evidence is contradictory to other evidence
   * @param sourceId Source identifier
   * @param citationId Citation identifier
   * @param researchQuestionId Research question identifier
   * @returns Whether evidence is contradictory
   */
  private async isContradictoryEvidence(
    sourceId: string,
    citationId: string,
    researchQuestionId: string
  ): Promise<boolean> {
    logger.debug(`Checking if citation ${citationId} is contradictory evidence for question ${researchQuestionId}`);
    
    try {
      // Get the source
      const source = await SourceModel.findOne({ id: sourceId }).exec();
      if (!source) {
        throw new Error(`Source not found: ${sourceId}`);
      }
      
      // For now, we'll use a simplified approach
      // We'll assume the source's reliability.evidenceType includes this information
      if ((source as any).reliability?.evidenceType?.includes(EvidenceType.CONTRADICTORY)) {
        return true;
      }

      // Check if source has conflicting sources
      if ((source as any).reliability?.conflictsWith && (source as any).reliability.conflictsWith.length > 0) {
        // In a real implementation, we would check if any of the conflicting sources
        // are also evidence for this research question
        return true;
      }
      
      return false;
      
    } catch (error) {
      logger.error(`Error determining if evidence is contradictory:`, error);
      throw error;
    }
  }

  /**
   * Calculate evidence weight based on quality and relevance
   * @param sourceId Source identifier
   * @param citationId Citation identifier
   * @param researchQuestionId Research question identifier
   * @returns Evidence weight (0-100)
   */
  async calculateEvidenceWeight(
    sourceId: string,
    citationId: string,
    researchQuestionId: string
  ): Promise<number> {
    logger.info(`Calculating evidence weight for citation ${citationId} related to question ${researchQuestionId}`);
    
    try {
      // Get the source and citation
      const source = await SourceModel.findOne({ id: sourceId }).exec();
      if (!source) {
        throw new Error(`Source not found: ${sourceId}`);
      }
      
      const citation = await CitationModel.findOne({ id: citationId }).exec();
      if (!citation) {
        throw new Error(`Citation not found: ${citationId}`);
      }
      
      // Start with the base reliability score
      let weight = source.reliability.score;
      
      // Adjust based on evidence type
      const evidenceType = await this.categorizeEvidence(sourceId, citationId, researchQuestionId);
      
      switch (evidenceType) {
        case EvidenceType.DIRECT:
          // Direct evidence gets a bonus
          weight += 10;
          break;
        case EvidenceType.INDIRECT:
          // Indirect evidence is slightly less valuable
          weight -= 5;
          break;
        case EvidenceType.NEGATIVE:
          // Negative evidence is valuable but weighted differently
          weight -= 0;
          break;
        case EvidenceType.CONTRADICTORY:
          // Contradictory evidence is important but requires resolution
          weight -= 10;
          break;
      }
      
      // Adjust based on citation quality
      switch (citation.quality) {
        case 'COMPLETE':
          weight += 5;
          break;
        case 'PARTIAL':
          weight += 0;
          break;
        case 'MINIMAL':
          weight -= 5;
          break;
      }
      
      // Ensure weight is within bounds
      return Math.max(0, Math.min(100, weight));
      
    } catch (error) {
      logger.error(`Error calculating evidence weight:`, error);
      throw error;
    }
  }
}