/**
 * Information Evaluation Service
 * Implements evaluation of information quality and reliability
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
  InformationQuality, 
  Source, 
  SourceClassification, 
  SourceReliability 
} from '../../models/source/types';
import { InformationEvaluationService } from './types';
import { SourceModel } from '../../models/source/schema';
import { SourceClassificationServiceImpl } from './source-classification.service';

/**
 * Implementation of Information Evaluation Service
 * Assesses information quality and source reliability
 */
export class InformationEvaluationServiceImpl implements InformationEvaluationService {
  private sourceClassification: SourceClassificationServiceImpl;

  constructor() {
    this.sourceClassification = new SourceClassificationServiceImpl();
    logger.info('Information Evaluation Service initialized');
  }

  /**
   * Evaluate overall information quality
   * @param source The source containing the information
   * @param classification Source classification (if already computed)
   * @returns Information quality assessment
   */
  async evaluateInformationQuality(
    source: Source, 
    classification?: SourceClassification
  ): Promise<InformationQuality> {
    logger.info(`Evaluating information quality for source: ${source.id}`);
    
    try {
      // Get classification if not provided
      const sourceClassification = classification || 
        await this.sourceClassification.classifySource(source);
      
      // Calculate quality score based on classification attributes
      const scores = {
        originality: this.scoreOriginality(sourceClassification.originality),
        informantKnowledge: this.scoreInformantKnowledge(sourceClassification.informantKnowledge),
        contemporaneity: this.scoreContemporaneity(sourceClassification.contemporaneity),
        clarity: this.scoreClarity(sourceClassification.clarity)
      };
      
      // Calculate weighted average score
      // Weights represent relative importance of each factor
      const weights = {
        originality: 0.3,
        informantKnowledge: 0.4,
        contemporaneity: 0.2,
        clarity: 0.1
      };
      
      const weightedScore = 
        (scores.originality * weights.originality) +
        (scores.informantKnowledge * weights.informantKnowledge) +
        (scores.contemporaneity * weights.contemporaneity) +
        (scores.clarity * weights.clarity);
      
      // Convert score to information quality
      return this.scoreToInformationQuality(weightedScore);
      
    } catch (error) {
      logger.error(`Error evaluating information quality:`, error);
      throw error;
    }
  }

  /**
   * Calculate overall source reliability
   * @param source The source to evaluate
   * @param classification Source classification (if already computed)
   * @returns Source reliability assessment
   */
  async calculateSourceReliability(
    source: Source, 
    classification?: SourceClassification
  ): Promise<SourceReliability> {
    logger.info(`Calculating reliability for source: ${source.id}`);
    
    try {
      // Get classification if not provided
      const sourceClassification = classification || 
        await this.sourceClassification.classifySource(source);
      
      // Evaluate information quality
      const informationQuality = await this.evaluateInformationQuality(
        source, 
        sourceClassification
      );
      
      // Calculate base reliability score from information quality
      let reliabilityScore = this.informationQualityToScore(informationQuality);
      
      // Adjust score based on additional factors
      // For example, if source has been critically analyzed
      if (source.reliability?.analysisNotes && source.reliability.analysisNotes.length > 0) {
        reliabilityScore += 5; // Bonus for analyzed sources
      }
      
      // Detect conflicts with other sources
      const conflictsWith = await this.detectPotentialConflicts(source);
      
      // Determine evidence types
      // Initially we'll assume evidence type is the same as in the source
      // In a real implementation, this would depend on the research question
      const evidenceType = source.reliability?.evidenceType || [EvidenceType.DIRECT];
      
      // Create reliability assessment
      const reliability: SourceReliability = {
        score: Math.min(Math.max(reliabilityScore, 0), 100), // Ensure score is 0-100
        evidenceType,
        informationQuality,
        analysisNotes: source.reliability?.analysisNotes || '',
        conflictsWith
      };
      
      return reliability;
      
    } catch (error) {
      logger.error(`Error calculating source reliability:`, error);
      throw error;
    }
  }

  /**
   * Detect conflicts with other sources
   * @param source The source to check
   * @returns Array of conflicting source IDs
   */
  private async detectPotentialConflicts(source: Source): Promise<string[]> {
    // In a real implementation, this would involve sophisticated content
    // analysis and comparison with other sources
    
    // If the source already has conflicts listed, use those
    if (source.reliability?.conflictsWith && source.reliability.conflictsWith.length > 0) {
      return source.reliability.conflictsWith;
    }
    
    // Return empty array if no conflicts are detected
    return [];
  }

  /**
   * Detect potential conflicts between sources
   * @param sourceId Source identifier
   * @param relatedSourceIds Related source identifiers to compare
   * @returns Array of conflicting source IDs
   */
  async detectSourceConflicts(
    sourceId: string, 
    relatedSourceIds: string[]
  ): Promise<string[]> {
    logger.info(`Detecting conflicts for source ${sourceId} with ${relatedSourceIds.length} related sources`);
    
    try {
      // Get the source
      const source = await SourceModel.findOne({ id: sourceId }).exec();
      
      if (!source) {
        throw new Error(`Source not found: ${sourceId}`);
      }
      
      // Get related sources
      const relatedSources = await SourceModel.find({ 
        id: { $in: relatedSourceIds } 
      }).exec();
      
      // In a real implementation, this would involve sophisticated content comparison
      // For now, we'll use a simple approach that checks if any sources already
      // have conflicts listed with this source
      
      const conflicts: string[] = [];
      
      for (const relatedSource of relatedSources) {
        // If the related source lists this source as a conflict, add it
        if (relatedSource.reliability.conflictsWith?.includes(sourceId)) {
          conflicts.push(relatedSource.id);
        }
        
        // If this source lists the related source as a conflict, add it
        if (source.reliability.conflictsWith?.includes(relatedSource.id)) {
          conflicts.push(relatedSource.id);
        }
      }
      
      return conflicts;
      
    } catch (error) {
      logger.error(`Error detecting source conflicts:`, error);
      throw error;
    }
  }

  /**
   * Resolve conflicts between information sources
   * @param conflictingSourceIds Array of conflicting source IDs
   * @param resolutionNotes Explanation of resolution strategy
   * @returns Resolved assessment with explanation
   */
  async resolveInformationConflicts(
    conflictingSourceIds: string[],
    resolutionNotes: string
  ): Promise<{
    preferredSourceId: string;
    confidence: ConfidenceLevel;
    resolutionExplanation: string;
  }> {
    logger.info(`Resolving conflicts among ${conflictingSourceIds.length} sources`);
    
    try {
      // Get conflicting sources
      const sources = await SourceModel.find({ 
        id: { $in: conflictingSourceIds } 
      }).exec();
      
      if (sources.length === 0) {
        throw new Error(`No sources found for IDs: ${conflictingSourceIds.join(', ')}`);
      }
      
      // In a real implementation, this would involve sophisticated analysis
      // of the sources to determine which is most reliable
      
      // For now, we'll use a simple approach that selects the source with
      // the highest reliability score
      let preferredSource = sources[0];
      for (const source of sources) {
        if (source.reliability.score > preferredSource.reliability.score) {
          preferredSource = source;
        }
      }
      
      // Generate explanation
      const explanation = `Selected source ${preferredSource.id} as preferred based on reliability score of ${preferredSource.reliability.score}. ${resolutionNotes}`;
      
      // Determine confidence level based on reliability score
      const confidence = this.scoreToConfidenceLevel(preferredSource.reliability.score);
      
      return {
        preferredSourceId: preferredSource.id,
        confidence,
        resolutionExplanation: explanation
      };
      
    } catch (error) {
      logger.error(`Error resolving information conflicts:`, error);
      throw error;
    }
  }

  /**
   * Score originality on a scale of 0-100
   * @param originality Originality assessment
   * @returns Numeric score
   */
  private scoreOriginality(originality: Originality): number {
    switch (originality) {
      case Originality.ORIGINAL:
        return 100;
      case Originality.DERIVATIVE:
        return 70;
      case Originality.AUTHORED_WORK:
        return 40;
      case Originality.UNKNOWN:
      default:
        return 20;
    }
  }

  /**
   * Score informant knowledge on a scale of 0-100
   * @param informantKnowledge Informant knowledge assessment
   * @returns Numeric score
   */
  private scoreInformantKnowledge(informantKnowledge: InformantKnowledge): number {
    switch (informantKnowledge) {
      case InformantKnowledge.PRIMARY:
        return 100;
      case InformantKnowledge.MIXED:
        return 70;
      case InformantKnowledge.SECONDARY:
        return 40;
      case InformantKnowledge.UNDETERMINED:
      default:
        return 20;
    }
  }

  /**
   * Score contemporaneity on a scale of 0-100
   * @param contemporaneity Contemporaneity assessment
   * @returns Numeric score
   */
  private scoreContemporaneity(contemporaneity: Contemporaneity): number {
    switch (contemporaneity) {
      case Contemporaneity.CONTEMPORARY:
        return 100;
      case Contemporaneity.RECENT:
        return 70;
      case Contemporaneity.DISTANT:
        return 40;
      case Contemporaneity.UNKNOWN:
      default:
        return 20;
    }
  }

  /**
   * Score clarity on a scale of 0-100
   * @param clarity Clarity assessment
   * @returns Numeric score
   */
  private scoreClarity(clarity: Clarity): number {
    switch (clarity) {
      case Clarity.HIGH:
        return 100;
      case Clarity.MEDIUM:
        return 70;
      case Clarity.LOW:
        return 40;
      case Clarity.VARIABLE:
      default:
        return 60;
    }
  }

  /**
   * Convert numeric score to information quality
   * @param score Score (0-100)
   * @returns Information quality assessment
   */
  private scoreToInformationQuality(score: number): InformationQuality {
    if (score >= 80) return InformationQuality.HIGH;
    if (score >= 50) return InformationQuality.MEDIUM;
    if (score >= 20) return InformationQuality.LOW;
    return InformationQuality.UNKNOWN;
  }

  /**
   * Convert information quality to numeric score
   * @param quality Information quality assessment
   * @returns Score (0-100)
   */
  private informationQualityToScore(quality: InformationQuality): number {
    switch (quality) {
      case InformationQuality.HIGH:
        return 90;
      case InformationQuality.MEDIUM:
        return 70;
      case InformationQuality.LOW:
        return 40;
      case InformationQuality.UNKNOWN:
      default:
        return 20;
    }
  }

  /**
   * Convert numeric score to confidence level
   * @param score Score (0-100)
   * @returns Confidence level
   */
  private scoreToConfidenceLevel(score: number): ConfidenceLevel {
    if (score >= 90) return ConfidenceLevel.VERY_HIGH;
    if (score >= 70) return ConfidenceLevel.HIGH;
    if (score >= 50) return ConfidenceLevel.MEDIUM;
    if (score >= 30) return ConfidenceLevel.LOW;
    return ConfidenceLevel.VERY_LOW;
  }
}