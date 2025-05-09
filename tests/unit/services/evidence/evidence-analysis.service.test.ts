/**
 * Unit tests for Evidence Analysis Service
 */
import { ConfidenceLevel } from '../../../../src/models/common/types';
import { EvidenceAnalysisServiceImpl } from '../../../../src/services/evidence/evidence-analysis.service';
import { 
  mockSourceModel,
  mockOriginalSource,
  mockDerivativeSource,
  mockConflictingSource 
} from '../../../mocks/source.mocks';
import { 
  mockCitationModel,
  mockCompleteCitation,
  mockPartialCitation
} from '../../../mocks/citation.mocks';

// Mock sub-services
jest.mock('../../../../src/services/evidence/source-classification.service', () => {
  return {
    SourceClassificationServiceImpl: jest.fn().mockImplementation(() => ({
      classifySource: jest.fn().mockResolvedValue({
        originality: Originality.ORIGINAL,
        informantKnowledge: InformantKnowledge.PRIMARY,
        format: SourceFormat.TEXT,
        contemporaneity: Contemporaneity.CONTEMPORARY,
        clarity: Clarity.HIGH
      }),
      determineOriginality: jest.fn().mockResolvedValue(Originality.ORIGINAL),
      evaluateInformantKnowledge: jest.fn().mockResolvedValue(InformantKnowledge.PRIMARY),
      assessContemporaneity: jest.fn().mockResolvedValue(Contemporaneity.CONTEMPORARY),
      assessClarity: jest.fn().mockResolvedValue(Clarity.HIGH)
    }))
  };
});

jest.mock('../../../../src/services/evidence/information-evaluation.service', () => {
  return {
    InformationEvaluationServiceImpl: jest.fn().mockImplementation(() => ({
      evaluateInformationQuality: jest.fn().mockResolvedValue(InformationQuality.HIGH),
      calculateSourceReliability: jest.fn().mockResolvedValue({
        score: 85,
        evidenceType: [EvidenceType.DIRECT],
        informationQuality: InformationQuality.HIGH,
        analysisNotes: '',
        conflictsWith: []
      }),
      detectSourceConflicts: jest.fn().mockResolvedValue([]),
      resolveInformationConflicts: jest.fn().mockResolvedValue({
        preferredSourceId: 'source-1',
        confidence: ConfidenceLevel.HIGH,
        resolutionExplanation: 'Resolution explanation'
      })
    }))
  };
});

jest.mock('../../../../src/services/evidence/evidence-categorization.service', () => {
  return {
    EvidenceCategorizationServiceImpl: jest.fn().mockImplementation(() => ({
      categorizeEvidence: jest.fn().mockResolvedValue(EvidenceType.DIRECT),
      isDirectEvidence: jest.fn().mockResolvedValue(true),
      isIndirectEvidence: jest.fn().mockResolvedValue(false),
      isNegativeEvidence: jest.fn().mockResolvedValue(false),
      calculateEvidenceWeight: jest.fn().mockResolvedValue(85)
    }))
  };
});

jest.mock('../../../../src/services/evidence/gps-evaluation.service', () => {
  return {
    GPSEvaluationServiceImpl: jest.fn().mockImplementation(() => ({
      evaluateExhaustiveResearch: jest.fn().mockResolvedValue({
        isExhaustive: true,
        score: 90,
        recommendations: []
      }),
      evaluateCitationCompleteness: jest.fn().mockResolvedValue({
        isComplete: true,
        score: 95,
        incompleteCount: 0
      }),
      evaluateAnalysisQuality: jest.fn().mockResolvedValue({
        isSkillful: true,
        score: 85,
        recommendations: []
      }),
      evaluateConflictResolution: jest.fn().mockResolvedValue({
        isResolved: true,
        unresolvedCount: 0,
        recommendations: []
      }),
      evaluateConclusionSoundness: jest.fn().mockResolvedValue({
        isSoundly: true,
        score: 90,
        recommendations: []
      }),
      calculateGPSCompliance: jest.fn().mockResolvedValue({
        overallCompliant: true,
        components: {
          exhaustiveResearch: true,
          completeCitations: true,
          skillfulAnalysis: true,
          conflictResolution: true,
          soundConclusion: true
        },
        score: 90,
        recommendations: []
      })
    }))
  };
});

// Mock models
jest.mock('../../../../src/models/source/schema', () => ({
  SourceModel: mockSourceModel,
  CitationModel: mockCitationModel
}));

// Mock logger to suppress output during tests
jest.mock('../../../../src/utils/logger', () => ({
  logger: {
    info: jest.fn(),
    debug: jest.fn(),
    error: jest.fn(),
    warn: jest.fn()
  }
}));

describe('Evidence Analysis Service', () => {
  let service: EvidenceAnalysisServiceImpl;

  beforeEach(() => {
    service = new EvidenceAnalysisServiceImpl();
    jest.clearAllMocks();
  });

  describe('analyzeSource', () => {
    it('should analyze a source and provide classification, reliability, and recommendations', async () => {
      const result = await service.analyzeSource(mockOriginalSource);
      
      expect(result.classification).toBeDefined();
      expect(result.reliability).toBeDefined();
      expect(result.recommendations).toBeDefined();
    });

    it('should generate appropriate recommendations for derivative sources', async () => {
      // Mock calculateSourceReliability to return a derivative source reliability
      jest.spyOn(service, 'calculateSourceReliability').mockResolvedValueOnce({
        score: 65,
        evidenceType: ['DIRECT'],
        informationQuality: 'MEDIUM',
        analysisNotes: '',
        conflictsWith: []
      });
      
      // Mock classifySource to return a derivative classification
      jest.spyOn(service, 'classifySource').mockResolvedValueOnce({
        originality: 'DERIVATIVE',
        informantKnowledge: 'SECONDARY',
        format: 'TEXT',
        contemporaneity: 'RECENT',
        clarity: 'MEDIUM'
      });
      
      const result = await service.analyzeSource(mockDerivativeSource);
      
      // Should recommend finding original source
      expect(result.recommendations.some(r => 
        r.toLowerCase().includes('original')
      )).toBe(true);
    });

    it('should generate recommendations for resolving conflicts', async () => {
      // Mock calculateSourceReliability to return a source with conflicts
      jest.spyOn(service, 'calculateSourceReliability').mockResolvedValueOnce({
        score: 70,
        evidenceType: ['DIRECT', 'CONTRADICTORY'],
        informationQuality: 'MEDIUM',
        analysisNotes: '',
        conflictsWith: ['source-1']
      });
      
      const result = await service.analyzeSource(mockConflictingSource);
      
      // Should recommend resolving conflicts
      expect(result.recommendations.some(r => 
        r.toLowerCase().includes('conflict')
      )).toBe(true);
    });

    it('should handle errors during analysis', async () => {
      // Mock classifySource to throw an error
      jest.spyOn(service, 'classifySource').mockRejectedValueOnce(
        new Error('Classification error')
      );
      
      await expect(service.analyzeSource(mockOriginalSource)).rejects.toThrow();
    });
  });

  describe('calculateAssertionConfidence', () => {
    it('should calculate high confidence for assertions with high-quality sources', async () => {
      // Mock to return original source with high reliability
      mockCitationModel.find.mockImplementationOnce(() => ({
        exec: jest.fn().mockResolvedValue([mockCompleteCitation])
      }));
      
      mockSourceModel.find.mockImplementationOnce(() => ({
        exec: jest.fn().mockResolvedValue([mockOriginalSource])
      }));
      
      const confidence = await service.calculateAssertionConfidence(['citation-1']);
      
      expect(confidence).toBe(ConfidenceLevel.HIGH);
    });

    it('should calculate medium confidence for assertions with mixed sources', async () => {
      // Mock to return mix of high and medium reliability sources
      mockCitationModel.find.mockImplementationOnce(() => ({
        exec: jest.fn().mockResolvedValue([mockCompleteCitation, mockPartialCitation])
      }));
      
      mockSourceModel.find.mockImplementationOnce(() => ({
        exec: jest.fn().mockResolvedValue([mockOriginalSource, mockDerivativeSource])
      }));
      
      const confidence = await service.calculateAssertionConfidence(['citation-1', 'citation-2']);
      
      expect(confidence).toBe(ConfidenceLevel.MEDIUM);
    });

    it('should return very low confidence when no sources are found', async () => {
      // Mock to return empty arrays
      mockCitationModel.find.mockImplementationOnce(() => ({
        exec: jest.fn().mockResolvedValue([])
      }));
      
      const confidence = await service.calculateAssertionConfidence(['non-existent']);
      
      expect(confidence).toBe(ConfidenceLevel.VERY_LOW);
    });

    it('should handle empty citation list', async () => {
      const confidence = await service.calculateAssertionConfidence([]);
      
      expect(confidence).toBe(ConfidenceLevel.VERY_LOW);
    });
  });

  describe('correlateEvidence', () => {
    it('should correlate evidence from multiple consistent sources', async () => {
      // Mock to return non-conflicting sources
      mockCitationModel.find.mockImplementationOnce(() => ({
        exec: jest.fn().mockResolvedValue([mockCompleteCitation, mockPartialCitation])
      }));
      
      mockSourceModel.find.mockImplementationOnce(() => ({
        exec: jest.fn().mockResolvedValue([mockOriginalSource, mockDerivativeSource])
      }));
      
      const result = await service.correlateEvidence(
        ['citation-1', 'citation-2'], 
        'question-1'
      );
      
      expect(result.consistent).toBe(true);
      expect(result.conflicts).toHaveLength(0);
      expect(result.confidence).toBeDefined();
      expect(result.analysis).toBeDefined();
    });

    it('should identify conflicts between sources', async () => {
      // Mock to return conflicting sources
      mockCitationModel.find.mockImplementationOnce(() => ({
        exec: jest.fn().mockResolvedValue([mockCompleteCitation, mockPartialCitation])
      }));
      
      mockSourceModel.find.mockImplementationOnce(() => ({
        exec: jest.fn().mockResolvedValue([
          {
            ...mockOriginalSource,
            reliability: {
              ...mockOriginalSource.reliability,
              conflictsWith: ['source-2']
            }
          }, 
          mockDerivativeSource
        ])
      }));
      
      const result = await service.correlateEvidence(
        ['citation-1', 'citation-2'], 
        'question-1'
      );
      
      expect(result.consistent).toBe(false);
      expect(result.conflicts.length).toBeGreaterThan(0);
      // Confidence should be lower due to conflicts
      expect(result.confidence).not.toBe(ConfidenceLevel.VERY_HIGH);
    });

    it('should generate analysis text that includes source quality summary', async () => {
      // Mock to return a mix of sources
      mockCitationModel.find.mockImplementationOnce(() => ({
        exec: jest.fn().mockResolvedValue([mockCompleteCitation, mockPartialCitation])
      }));
      
      mockSourceModel.find.mockImplementationOnce(() => ({
        exec: jest.fn().mockResolvedValue([mockOriginalSource, mockDerivativeSource])
      }));
      
      const result = await service.correlateEvidence(
        ['citation-1', 'citation-2'], 
        'question-1'
      );
      
      // Analysis should mention original sources and primary information
      expect(result.analysis).toContain('original source');
      expect(result.analysis).toContain('primary');
    });

    it('should throw error when no citations are found', async () => {
      // Mock to return empty array
      mockCitationModel.find.mockImplementationOnce(() => ({
        exec: jest.fn().mockResolvedValue([])
      }));
      
      await expect(service.correlateEvidence(
        ['non-existent'], 
        'question-1'
      )).rejects.toThrow();
    });
  });

  // Test the scoreToConfidenceLevel method indirectly
  describe('confidence level conversion', () => {
    it('should convert scores to appropriate confidence levels', async () => {
      // Test very high confidence
      mockSourceModel.find.mockImplementationOnce(() => ({
        exec: jest.fn().mockResolvedValue([{
          reliability: { score: 95 }
        }])
      }));
      
      mockCitationModel.find.mockImplementationOnce(() => ({
        exec: jest.fn().mockResolvedValue([{ id: 'citation-x' }])
      }));
      
      let confidence = await service.calculateAssertionConfidence(['citation-x']);
      expect(confidence).toBe(ConfidenceLevel.VERY_HIGH);
      
      // Test high confidence
      mockSourceModel.find.mockImplementationOnce(() => ({
        exec: jest.fn().mockResolvedValue([{
          reliability: { score: 75 }
        }])
      }));
      
      mockCitationModel.find.mockImplementationOnce(() => ({
        exec: jest.fn().mockResolvedValue([{ id: 'citation-x' }])
      }));
      
      confidence = await service.calculateAssertionConfidence(['citation-x']);
      expect(confidence).toBe(ConfidenceLevel.HIGH);
      
      // Test medium confidence
      mockSourceModel.find.mockImplementationOnce(() => ({
        exec: jest.fn().mockResolvedValue([{
          reliability: { score: 55 }
        }])
      }));
      
      mockCitationModel.find.mockImplementationOnce(() => ({
        exec: jest.fn().mockResolvedValue([{ id: 'citation-x' }])
      }));
      
      confidence = await service.calculateAssertionConfidence(['citation-x']);
      expect(confidence).toBe(ConfidenceLevel.MEDIUM);
      
      // Test low confidence
      mockSourceModel.find.mockImplementationOnce(() => ({
        exec: jest.fn().mockResolvedValue([{
          reliability: { score: 35 }
        }])
      }));
      
      mockCitationModel.find.mockImplementationOnce(() => ({
        exec: jest.fn().mockResolvedValue([{ id: 'citation-x' }])
      }));
      
      confidence = await service.calculateAssertionConfidence(['citation-x']);
      expect(confidence).toBe(ConfidenceLevel.LOW);
      
      // Test very low confidence
      mockSourceModel.find.mockImplementationOnce(() => ({
        exec: jest.fn().mockResolvedValue([{
          reliability: { score: 15 }
        }])
      }));
      
      mockCitationModel.find.mockImplementationOnce(() => ({
        exec: jest.fn().mockResolvedValue([{ id: 'citation-x' }])
      }));
      
      confidence = await service.calculateAssertionConfidence(['citation-x']);
      expect(confidence).toBe(ConfidenceLevel.VERY_LOW);
    });
  });
});