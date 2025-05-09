/**
 * Evidence Analysis Service
 * Implements source classification, information evaluation, and evidence categorization
 * following professional genealogical standards
 */

import { logger } from '../../utils/logger';
import { 
  Clarity,
  ConfidenceLevel, 
  Contemporaneity, 
  EvidenceType, 
  InformantKnowledge, 
  Originality 
} from '../../models/common/types';
import { 
  Citation, 
  InformationQuality, 
  Source, 
  SourceClassification, 
  SourceReliability 
} from '../../models/source/types';
import { SourceModel, CitationModel } from '../../models/source/schema';
import { 
  EvidenceAnalysisService, 
  GPSEvaluationService 
} from './types';
import { SourceClassificationServiceImpl } from './source-classification.service';
import { InformationEvaluationServiceImpl } from './information-evaluation.service';
import { EvidenceCategorizationServiceImpl } from './evidence-categorization.service';
import { GPSEvaluationServiceImpl } from './gps-evaluation.service';

/**
 * Implementation of Evidence Analysis Service
 * Combines source classification, information evaluation, evidence categorization,
 * and GPS evaluation into a comprehensive evidence analysis system
 */
export class EvidenceAnalysisServiceImpl implements EvidenceAnalysisService {
  private sourceClassification: SourceClassificationServiceImpl;
  private informationEvaluation: InformationEvaluationServiceImpl;
  private evidenceCategorization: EvidenceCategorizationServiceImpl;
  private gpsEvaluation: GPSEvaluationServiceImpl;

  constructor() {
    this.sourceClassification = new SourceClassificationServiceImpl();
    this.informationEvaluation = new InformationEvaluationServiceImpl();
    this.evidenceCategorization = new EvidenceCategorizationServiceImpl();
    this.gpsEvaluation = new GPSEvaluationServiceImpl();
    
    logger.info('Evidence Analysis Service initialized');
  }

  /**
   * Analyze a source for complete evidence assessment
   * @param source The source to analyze
   * @returns Complete evidence analysis
   */
  async analyzeSource(source: Source): Promise<{
    classification: SourceClassification;
    reliability: SourceReliability;
    recommendations: string[];
  }> {
    logger.info(`Analyzing source: ${source.id}`);
    
    try {
      // Classify the source
      const classification = await this.classifySource(source);
      
      // Evaluate source reliability
      const reliability = await this.calculateSourceReliability(source, classification);
      
      // Generate recommendations based on classification and reliability
      const recommendations = this.generateSourceRecommendations(classification, reliability);
      
      return {
        classification,
        reliability,
        recommendations
      };
    } catch (error) {
      logger.error(`Error analyzing source ${source.id}:`, error);
      throw error;
    }
  }

  /**
   * Generate recommendations for improving source quality
   * @param classification Source classification
   * @param reliability Source reliability assessment
   * @returns Array of recommendations
   */
  private generateSourceRecommendations(
    classification: SourceClassification,
    reliability: SourceReliability
  ): string[] {
    const recommendations: string[] = [];
    
    // Check originality
    if (classification.originality === Originality.DERIVATIVE) {
      recommendations.push('Consider locating the original source if possible');
    }
    
    // Check informant knowledge
    if (classification.informantKnowledge === InformantKnowledge.SECONDARY) {
      recommendations.push('Search for sources with firsthand (primary) knowledge');
    }
    
    // Check contemporaneity
    if (classification.contemporaneity === Contemporaneity.DISTANT) {
      recommendations.push('Look for sources created closer to the event');
    }
    
    // Check clarity
    if (classification.clarity === Clarity.LOW) {
      recommendations.push('Consider alternate versions or interpretations if source is unclear');
    }
    
    // Check reliability score
    if (reliability.score < 50) {
      recommendations.push('Source has low reliability; corroborate with additional sources');
    }
    
    // Check for conflicts
    if (reliability.conflictsWith && reliability.conflictsWith.length > 0) {
      recommendations.push(`Resolve conflicts with ${reliability.conflictsWith.length} other source(s)`);
    }
    
    return recommendations;
  }

  /**
   * Calculate confidence level for an assertion based on supporting evidence
   * @param citationIds Array of citation IDs supporting the assertion
   * @returns Assessed confidence level
   */
  async calculateAssertionConfidence(citationIds: string[]): Promise<ConfidenceLevel> {
    if (!citationIds || citationIds.length === 0) {
      return ConfidenceLevel.VERY_LOW;
    }
    
    try {
      // Get all citations
      const citations = await CitationModel.find({ id: { $in: citationIds } }).exec();
      
      if (citations.length === 0) {
        logger.warn(`No citations found for IDs: ${citationIds.join(', ')}`);
        return ConfidenceLevel.VERY_LOW;
      }
      
      // Get all sources referenced by citations
      const sourceIds = citations.map(citation => citation.sourceId);
      const sources = await SourceModel.find({ id: { $in: sourceIds } }).exec();
      
      if (sources.length === 0) {
        logger.warn(`No sources found for citations: ${citationIds.join(', ')}`);
        return ConfidenceLevel.VERY_LOW;
      }
      
      // Calculate average reliability score
      const totalScore = sources.reduce((sum, source) => sum + source.reliability.score, 0);
      const averageScore = totalScore / sources.length;
      
      // Convert score to confidence level
      return this.scoreToConfidenceLevel(averageScore);
      
    } catch (error) {
      logger.error(`Error calculating assertion confidence:`, error);
      throw error;
    }
  }

  /**
   * Convert numeric score to confidence level enum
   * @param score Numeric score (0-100)
   * @returns Corresponding confidence level
   */
  private scoreToConfidenceLevel(score: number): ConfidenceLevel {
    if (score >= 90) return ConfidenceLevel.VERY_HIGH;
    if (score >= 70) return ConfidenceLevel.HIGH;
    if (score >= 50) return ConfidenceLevel.MEDIUM;
    if (score >= 30) return ConfidenceLevel.LOW;
    return ConfidenceLevel.VERY_LOW;
  }

  /**
   * Correlate evidence from multiple sources
   * @param citationIds Array of citation IDs to correlate
   * @param researchQuestionId Research question identifier
   * @returns Evidence correlation assessment
   */
  async correlateEvidence(
    citationIds: string[],
    researchQuestionId: string
  ): Promise<{
    consistent: boolean;
    confidence: ConfidenceLevel;
    conflicts: Array<{
      citationIds: string[];
      description: string;
    }>;
    analysis: string;
  }> {
    logger.info(`Correlating evidence for research question: ${researchQuestionId}`);
    
    try {
      // Get all citations
      const citations = await CitationModel.find({ id: { $in: citationIds } }).exec();
      
      if (citations.length === 0) {
        throw new Error(`No citations found for IDs: ${citationIds.join(', ')}`);
      }
      
      // Get sources referenced by citations
      const sourceIds = citations.map(citation => citation.sourceId);
      const sources = await SourceModel.find({ id: { $in: sourceIds } }).exec();
      
      // Detect conflicts between sources
      const conflicts: Array<{
        citationIds: string[];
        description: string;
      }> = [];
      
      // For now, use a simplified conflict detection approach based on reliability.conflictsWith
      // In a real implementation, this would involve more sophisticated conflict detection logic
      for (const source of sources) {
        if (source.reliability.conflictsWith && source.reliability.conflictsWith.length > 0) {
          const conflictingSourceIds = source.reliability.conflictsWith.filter(id => 
            sourceIds.includes(id)
          );
          
          if (conflictingSourceIds.length > 0) {
            const conflictingCitations = citations.filter(citation => 
              conflictingSourceIds.includes(citation.sourceId)
            );
            
            conflicts.push({
              citationIds: conflictingCitations.map(c => c.id),
              description: `Conflict between source ${source.id} and sources: ${conflictingSourceIds.join(', ')}`
            });
          }
        }
      }
      
      // Calculate average reliability score
      const totalScore = sources.reduce((sum, source) => sum + source.reliability.score, 0);
      const averageScore = totalScore / sources.length;
      
      // Adjust score down if conflicts exist
      const adjustedScore = conflicts.length > 0 
        ? Math.max(averageScore - (conflicts.length * 10), 0) 
        : averageScore;
      
      // Generate analysis text
      const analysis = this.generateCorrelationAnalysis(sources, conflicts);
      
      return {
        consistent: conflicts.length === 0,
        confidence: this.scoreToConfidenceLevel(adjustedScore),
        conflicts,
        analysis
      };
      
    } catch (error) {
      logger.error(`Error correlating evidence:`, error);
      throw error;
    }
  }

  /**
   * Generate analysis text for evidence correlation
   * @param sources Array of sources
   * @param conflicts Array of detected conflicts
   * @returns Analysis text
   */
  private generateCorrelationAnalysis(
    sources: Source[],
    conflicts: Array<{
      citationIds: string[];
      description: string;
    }>
  ): string {
    let analysis = `Analysis based on ${sources.length} source(s).\n`;
    
    // Add source quality summary
    const originalCount = sources.filter(s => 
      s.classification.originality === Originality.ORIGINAL
    ).length;
    
    const primaryCount = sources.filter(s => 
      s.classification.informantKnowledge === InformantKnowledge.PRIMARY
    ).length;
    
    analysis += `Sources include ${originalCount} original source(s) and ${primaryCount} with primary information.\n`;
    
    // Add conflict summary if any exist
    if (conflicts.length > 0) {
      analysis += `There are ${conflicts.length} conflict(s) that need resolution:\n`;
      conflicts.forEach((conflict, index) => {
        analysis += `${index + 1}. ${conflict.description}\n`;
      });
      analysis += 'Consider evaluating each conflict using "Evaluate the Evidence" framework.\n';
    } else {
      analysis += 'All sources are consistent with each other.\n';
    }
    
    return analysis;
  }

  // SourceClassificationService implementation
  async classifySource(source: Partial<Source>): Promise<SourceClassification> {
    return this.sourceClassification.classifySource(source);
  }

  async determineOriginality(source: Partial<Source>): Promise<Originality> {
    return this.sourceClassification.determineOriginality(source);
  }

  async evaluateInformantKnowledge(source: Partial<Source>): Promise<InformantKnowledge> {
    return this.sourceClassification.evaluateInformantKnowledge(source);
  }

  async assessContemporaneity(source: Partial<Source>, eventDate?: string): Promise<Contemporaneity> {
    return this.sourceClassification.assessContemporaneity(source, eventDate);
  }

  async assessClarity(source: Partial<Source>): Promise<Clarity> {
    return this.sourceClassification.assessClarity(source);
  }

  // InformationEvaluationService implementation
  async evaluateInformationQuality(
    source: Source, 
    classification?: SourceClassification
  ): Promise<InformationQuality> {
    return this.informationEvaluation.evaluateInformationQuality(source, classification);
  }

  async calculateSourceReliability(
    source: Source, 
    classification?: SourceClassification
  ): Promise<SourceReliability> {
    return this.informationEvaluation.calculateSourceReliability(source, classification);
  }

  async detectSourceConflicts(sourceId: string, relatedSourceIds: string[]): Promise<string[]> {
    return this.informationEvaluation.detectSourceConflicts(sourceId, relatedSourceIds);
  }

  async resolveInformationConflicts(
    conflictingSourceIds: string[], 
    resolutionNotes: string
  ): Promise<{ 
    preferredSourceId: string; 
    confidence: ConfidenceLevel; 
    resolutionExplanation: string; 
  }> {
    return this.informationEvaluation.resolveInformationConflicts(
      conflictingSourceIds, 
      resolutionNotes
    );
  }

  // EvidenceCategorization implementation
  async categorizeEvidence(
    sourceId: string, 
    citationId: string, 
    researchQuestionId: string
  ): Promise<EvidenceType> {
    return this.evidenceCategorization.categorizeEvidence(
      sourceId, 
      citationId, 
      researchQuestionId
    );
  }

  async isDirectEvidence(
    sourceId: string, 
    citationId: string, 
    researchQuestionId: string
  ): Promise<boolean> {
    return this.evidenceCategorization.isDirectEvidence(
      sourceId, 
      citationId, 
      researchQuestionId
    );
  }

  async isIndirectEvidence(
    sourceId: string, 
    citationId: string, 
    researchQuestionId: string
  ): Promise<boolean> {
    return this.evidenceCategorization.isIndirectEvidence(
      sourceId, 
      citationId, 
      researchQuestionId
    );
  }

  async isNegativeEvidence(
    sourceId: string, 
    citationId: Citation, 
    researchQuestionId: string
  ): Promise<boolean> {
    return this.evidenceCategorization.isNegativeEvidence(
      sourceId, 
      citationId, 
      researchQuestionId
    );
  }

  async calculateEvidenceWeight(
    sourceId: string, 
    citationId: string, 
    researchQuestionId: string
  ): Promise<number> {
    return this.evidenceCategorization.calculateEvidenceWeight(
      sourceId, 
      citationId, 
      researchQuestionId
    );
  }

  // GPSEvaluationService implementation
  async evaluateExhaustiveResearch(researchQuestionId: string): Promise<{ 
    isExhaustive: boolean; 
    score: number; 
    recommendations: string[]; 
  }> {
    return this.gpsEvaluation.evaluateExhaustiveResearch(researchQuestionId);
  }

  async evaluateCitationCompleteness(researchQuestionId: string): Promise<{ 
    isComplete: boolean; 
    score: number; 
    incompleteCount: number; 
  }> {
    return this.gpsEvaluation.evaluateCitationCompleteness(researchQuestionId);
  }

  async evaluateAnalysisQuality(researchQuestionId: string): Promise<{ 
    isSkillful: boolean; 
    score: number; 
    recommendations: string[]; 
  }> {
    return this.gpsEvaluation.evaluateAnalysisQuality(researchQuestionId);
  }

  async evaluateConflictResolution(researchQuestionId: string): Promise<{ 
    isResolved: boolean; 
    unresolvedCount: number; 
    recommendations: string[]; 
  }> {
    return this.gpsEvaluation.evaluateConflictResolution(researchQuestionId);
  }

  async evaluateConclusionSoundness(researchQuestionId: string): Promise<{ 
    isSoundly: boolean; 
    score: number; 
    recommendations: string[]; 
  }> {
    return this.gpsEvaluation.evaluateConclusionSoundness(researchQuestionId);
  }

  async calculateGPSCompliance(researchQuestionId: string): Promise<{ 
    overallCompliant: boolean; 
    components: { 
      exhaustiveResearch: boolean; 
      completeCitations: boolean; 
      skillfulAnalysis: boolean; 
      conflictResolution: boolean; 
      soundConclusion: boolean; 
    }; 
    score: number; 
    recommendations: string[]; 
  }> {
    return this.gpsEvaluation.calculateGPSCompliance(researchQuestionId);
  }
}