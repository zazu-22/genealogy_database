/**
 * Evidence Analysis Services Types
 * Defines interfaces and types for evidence analysis functionality
 */

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

/**
 * Interface for source classification functionality
 */
export interface SourceClassificationService {
  /**
   * Classify a source based on its attributes
   * @param source The source to classify
   * @returns Source classification assessment
   */
  classifySource(source: Partial<Source>): Promise<SourceClassification>;

  /**
   * Determine source originality
   * @param source The source to evaluate
   * @returns Originality assessment
   */
  determineOriginality(source: Partial<Source>): Promise<Originality>;

  /**
   * Evaluate informant knowledge
   * @param source The source to evaluate
   * @returns Informant knowledge assessment
   */
  evaluateInformantKnowledge(source: Partial<Source>): Promise<InformantKnowledge>;

  /**
   * Assess source contemporaneity
   * @param source The source to evaluate
   * @param eventDate Optional date of the event described
   * @returns Contemporaneity assessment
   */
  assessContemporaneity(
    source: Partial<Source>, 
    eventDate?: string
  ): Promise<Contemporaneity>;

  /**
   * Assess source clarity
   * @param source The source to evaluate
   * @returns Clarity assessment
   */
  assessClarity(source: Partial<Source>): Promise<Clarity>;
}

/**
 * Interface for information evaluation functionality
 */
export interface InformationEvaluationService {
  /**
   * Evaluate overall information quality
   * @param source The source containing the information
   * @param classification Source classification (if already computed)
   * @returns Information quality assessment
   */
  evaluateInformationQuality(
    source: Source, 
    classification?: SourceClassification
  ): Promise<InformationQuality>;

  /**
   * Calculate overall source reliability
   * @param source The source to evaluate
   * @param classification Source classification (if already computed)
   * @returns Source reliability assessment
   */
  calculateSourceReliability(
    source: Source, 
    classification?: SourceClassification
  ): Promise<SourceReliability>;

  /**
   * Detect potential conflicts between sources
   * @param sourceId Source identifier
   * @param relatedSourceIds Related source identifiers to compare
   * @returns Array of conflicting source IDs
   */
  detectSourceConflicts(
    sourceId: string, 
    relatedSourceIds: string[]
  ): Promise<string[]>;

  /**
   * Resolve conflicts between information sources
   * @param conflictingSourceIds Array of conflicting source IDs
   * @param resolutionNotes Explanation of resolution strategy
   * @returns Resolved assessment with explanation
   */
  resolveInformationConflicts(
    conflictingSourceIds: string[],
    resolutionNotes: string
  ): Promise<{
    preferredSourceId: string;
    confidence: ConfidenceLevel;
    resolutionExplanation: string;
  }>;
}

/**
 * Interface for evidence categorization functionality
 */
export interface EvidenceCategorization {
  /**
   * Categorize evidence type for a specific research question
   * @param sourceId Source identifier
   * @param citationId Citation identifier
   * @param researchQuestionId Research question identifier
   * @returns Evidence type assessment
   */
  categorizeEvidence(
    sourceId: string,
    citationId: string,
    researchQuestionId: string
  ): Promise<EvidenceType>;

  /**
   * Determine if evidence directly answers a research question
   * @param sourceId Source identifier
   * @param citationId Citation identifier
   * @param researchQuestionId Research question identifier
   * @returns Whether evidence directly answers the question
   */
  isDirectEvidence(
    sourceId: string,
    citationId: string,
    researchQuestionId: string
  ): Promise<boolean>;

  /**
   * Determine if evidence indirectly supports a research question
   * @param sourceId Source identifier
   * @param citationId Citation identifier
   * @param researchQuestionId Research question identifier
   * @returns Whether evidence indirectly supports the question
   */
  isIndirectEvidence(
    sourceId: string,
    citationId: string,
    researchQuestionId: string
  ): Promise<boolean>;

  /**
   * Determine if evidence is negative (absence of expected information)
   * @param sourceId Source identifier
   * @param citationId Citation identifier
   * @param researchQuestionId Research question identifier
   * @returns Whether evidence is negative
   */
  isNegativeEvidence(
    sourceId: string,
    citationId: Citation,
    researchQuestionId: string
  ): Promise<boolean>;

  /**
   * Calculate evidence weight based on quality and relevance
   * @param sourceId Source identifier
   * @param citationId Citation identifier
   * @param researchQuestionId Research question identifier
   * @returns Evidence weight (0-100)
   */
  calculateEvidenceWeight(
    sourceId: string,
    citationId: string,
    researchQuestionId: string
  ): Promise<number>;
}

/**
 * Interface for Genealogical Proof Standard (GPS) evaluation
 */
export interface GPSEvaluationService {
  /**
   * Evaluate reasonably exhaustive research
   * @param researchQuestionId Research question identifier
   * @returns Assessment of research exhaustiveness
   */
  evaluateExhaustiveResearch(
    researchQuestionId: string
  ): Promise<{
    isExhaustive: boolean;
    score: number;
    recommendations: string[];
  }>;

  /**
   * Evaluate citation completeness
   * @param researchQuestionId Research question identifier
   * @returns Assessment of citation completeness
   */
  evaluateCitationCompleteness(
    researchQuestionId: string
  ): Promise<{
    isComplete: boolean;
    score: number;
    incompleteCount: number;
  }>;

  /**
   * Evaluate analysis quality
   * @param researchQuestionId Research question identifier
   * @returns Assessment of analysis quality
   */
  evaluateAnalysisQuality(
    researchQuestionId: string
  ): Promise<{
    isSkillful: boolean;
    score: number;
    recommendations: string[];
  }>;

  /**
   * Evaluate conflict resolution
   * @param researchQuestionId Research question identifier
   * @returns Assessment of conflict resolution
   */
  evaluateConflictResolution(
    researchQuestionId: string
  ): Promise<{
    isResolved: boolean;
    unresolvedCount: number;
    recommendations: string[];
  }>;

  /**
   * Evaluate soundness of conclusion
   * @param researchQuestionId Research question identifier
   * @returns Assessment of conclusion soundness
   */
  evaluateConclusionSoundness(
    researchQuestionId: string
  ): Promise<{
    isSoundly: boolean;
    score: number;
    recommendations: string[];
  }>;

  /**
   * Calculate overall GPS compliance
   * @param researchQuestionId Research question identifier
   * @returns Complete GPS compliance assessment
   */
  calculateGPSCompliance(
    researchQuestionId: string
  ): Promise<{
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
  }>;
}

/**
 * Main interface for Evidence Analysis Service
 * Combines source classification, information evaluation,
 * evidence categorization, and GPS compliance
 */
export interface EvidenceAnalysisService 
  extends SourceClassificationService,
    InformationEvaluationService,
    EvidenceCategorization,
    GPSEvaluationService {
  
  /**
   * Analyze a source for complete evidence assessment
   * @param source The source to analyze
   * @returns Complete evidence analysis
   */
  analyzeSource(source: Source): Promise<{
    classification: SourceClassification;
    reliability: SourceReliability;
    recommendations: string[];
  }>;

  /**
   * Calculate confidence level for an assertion based on supporting evidence
   * @param citationIds Array of citation IDs supporting the assertion
   * @returns Assessed confidence level
   */
  calculateAssertionConfidence(
    citationIds: string[]
  ): Promise<ConfidenceLevel>;

  /**
   * Correlate evidence from multiple sources
   * @param citationIds Array of citation IDs to correlate
   * @param researchQuestionId Research question identifier
   * @returns Evidence correlation assessment
   */
  correlateEvidence(
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
  }>;
}