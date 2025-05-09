/**
 * Unit tests for Information Evaluation Service
 */
import { 
  ConfidenceLevel, 
  Contemporaneity, 
  EvidenceType, 
  InformantKnowledge, 
  Originality,
  Clarity
} from '../../../../src/models/common/types';
import { 
  InformationQuality, 
  SourceClassification,
  SourceFormat
} from '../../../../src/models/source/types';
import { InformationEvaluationServiceImpl } from '../../../../src/services/evidence/information-evaluation.service';
import { 
  mockOriginalSource, 
  mockDerivativeSource, 
  mockAuthoredSource, 
  mockConflictingSource, 
  mockSourceModel 
} from '../../../mocks/source.mocks';

// Mock source model
jest.mock('../../../../src/models/source/schema', () => ({
  SourceModel: mockSourceModel
}));

// Mock the SourceClassificationService
jest.mock('../../../../src/services/evidence/source-classification.service', () => {
  return {
    SourceClassificationServiceImpl: jest.fn().mockImplementation(() => {
      return {
        classifySource: jest.fn().mockImplementation((source) => {
          return Promise.resolve(source.classification || {
            originality: Originality.UNKNOWN,
            informantKnowledge: InformantKnowledge.UNDETERMINED,
            format: SourceFormat.TEXT,
            contemporaneity: Contemporaneity.UNKNOWN,
            clarity: Clarity.MEDIUM
          });
        })
      };
    })
  };
});

// Mock logger to suppress output during tests
jest.mock('../../../../src/utils/logger', () => ({
  logger: {
    info: jest.fn(),
    debug: jest.fn(),
    error: jest.fn(),
    warn: jest.fn()
  }
}));

describe('Information Evaluation Service', () => {
  let service: InformationEvaluationServiceImpl;

  beforeEach(() => {
    service = new InformationEvaluationServiceImpl();
    jest.clearAllMocks();
  });

  describe('evaluateInformationQuality', () => {
    it('should evaluate HIGH information quality for high-quality sources', async () => {
      const classification: SourceClassification = {
        originality: Originality.ORIGINAL,
        informantKnowledge: InformantKnowledge.PRIMARY,
        format: SourceFormat.TEXT,
        contemporaneity: Contemporaneity.CONTEMPORARY,
        clarity: Clarity.HIGH
      };
      
      const quality = await service.evaluateInformationQuality(mockOriginalSource, classification);
      expect(quality).toBe(InformationQuality.HIGH);
    });

    it('should evaluate MEDIUM information quality for medium-quality sources', async () => {
      const classification: SourceClassification = {
        originality: Originality.DERIVATIVE,
        informantKnowledge: InformantKnowledge.SECONDARY,
        format: SourceFormat.TEXT,
        contemporaneity: Contemporaneity.RECENT,
        clarity: Clarity.MEDIUM
      };
      
      const quality = await service.evaluateInformationQuality(mockDerivativeSource, classification);
      expect(quality).toBe(InformationQuality.MEDIUM);
    });

    it('should evaluate LOW information quality for low-quality sources', async () => {
      const classification: SourceClassification = {
        originality: Originality.AUTHORED_WORK,
        informantKnowledge: InformantKnowledge.SECONDARY,
        format: SourceFormat.TEXT,
        contemporaneity: Contemporaneity.DISTANT,
        clarity: Clarity.LOW
      };
      
      const quality = await service.evaluateInformationQuality(mockAuthoredSource, classification);
      expect(quality).toBe(InformationQuality.LOW);
    });

    it('should evaluate information quality even without a provided classification', async () => {
      const quality = await service.evaluateInformationQuality(mockOriginalSource);
      expect(quality).toBeDefined();
      expect(Object.values(InformationQuality)).toContain(quality);
    });
  });

  describe('calculateSourceReliability', () => {
    it('should calculate high reliability for high-quality original sources', async () => {
      const classification: SourceClassification = {
        originality: Originality.ORIGINAL,
        informantKnowledge: InformantKnowledge.PRIMARY,
        format: SourceFormat.TEXT,
        contemporaneity: Contemporaneity.CONTEMPORARY,
        clarity: Clarity.HIGH
      };
      
      const reliability = await service.calculateSourceReliability(mockOriginalSource, classification);
      
      expect(reliability.score).toBeGreaterThanOrEqual(80);
      expect(reliability.informationQuality).toBe(InformationQuality.HIGH);
    });

    it('should calculate medium reliability for derivative sources', async () => {
      const classification: SourceClassification = {
        originality: Originality.DERIVATIVE,
        informantKnowledge: InformantKnowledge.SECONDARY,
        format: SourceFormat.TEXT,
        contemporaneity: Contemporaneity.RECENT,
        clarity: Clarity.MEDIUM
      };
      
      const reliability = await service.calculateSourceReliability(mockDerivativeSource, classification);
      
      expect(reliability.score).toBeLessThan(80);
      expect(reliability.score).toBeGreaterThanOrEqual(50);
      expect(reliability.informationQuality).toBe(InformationQuality.MEDIUM);
    });

    it('should calculate low reliability for distant authored works', async () => {
      const classification: SourceClassification = {
        originality: Originality.AUTHORED_WORK,
        informantKnowledge: InformantKnowledge.SECONDARY,
        format: SourceFormat.TEXT,
        contemporaneity: Contemporaneity.DISTANT,
        clarity: Clarity.MEDIUM
      };
      
      const reliability = await service.calculateSourceReliability(mockAuthoredSource, classification);
      
      expect(reliability.score).toBeLessThan(50);
      expect(reliability.informationQuality).toBe(InformationQuality.MEDIUM);
    });

    it('should include analysis notes in reliability assessment if available', async () => {
      const sourceWithAnalysis = { 
        ...mockOriginalSource,
        reliability: {
          ...mockOriginalSource.reliability,
          analysisNotes: 'This is a detailed analysis'
        }
      };
      
      const reliability = await service.calculateSourceReliability(sourceWithAnalysis);
      
      expect(reliability.analysisNotes).toBe('This is a detailed analysis');
    });

    it('should detect conflicts with other sources', async () => {
      const reliability = await service.calculateSourceReliability(mockConflictingSource);
      
      expect(reliability.conflictsWith).toHaveLength(1);
      expect(reliability.conflictsWith).toContain('source-1');
    });
  });

  describe('detectSourceConflicts', () => {
    it('should detect conflicts between sources', async () => {
      const conflicts = await service.detectSourceConflicts('source-4', ['source-1', 'source-2', 'source-3']);
      
      expect(conflicts).toContain('source-1');
    });

    it('should return empty array if no conflicts exist', async () => {
      const conflicts = await service.detectSourceConflicts('source-2', ['source-3', 'source-5', 'source-6']);
      
      expect(conflicts).toEqual([]);
    });

    it('should handle case when source does not exist', async () => {
      // Mock findOne to return null
      mockSourceModel.findOne.mockImplementationOnce(() => ({
        exec: jest.fn().mockResolvedValue(null)
      }));
      
      await expect(service.detectSourceConflicts('non-existent', ['source-1'])).rejects.toThrow();
    });
  });

  describe('resolveInformationConflicts', () => {
    it('should resolve conflicts between sources', async () => {
      const resolution = await service.resolveInformationConflicts(
        ['source-1', 'source-4'], 
        'Birth certificate is considered more reliable than census record'
      );
      
      expect(resolution.preferredSourceId).toBeDefined();
      expect(resolution.confidence).toBeDefined();
      expect(resolution.resolutionExplanation).toContain('Birth certificate is considered more reliable');
    });

    it('should select source with highest reliability score as preferred', async () => {
      const resolution = await service.resolveInformationConflicts(
        ['source-1', 'source-4'], 
        'Resolution note'
      );
      
      // mockOriginalSource (source-1) has higher reliability than mockConflictingSource (source-4)
      expect(resolution.preferredSourceId).toBe('source-1');
    });

    it('should handle case when no sources are found', async () => {
      // Mock find to return empty array
      mockSourceModel.find.mockImplementationOnce(() => ({
        exec: jest.fn().mockResolvedValue([])
      }));
      
      await expect(service.resolveInformationConflicts(['non-existent'], 'note')).rejects.toThrow();
    });

    it('should set confidence level based on preferred source reliability', async () => {
      const resolution = await service.resolveInformationConflicts(
        ['source-1', 'source-2'], 
        'Resolution note'
      );
      
      // mockOriginalSource (source-1) has reliability score of 85
      expect(resolution.confidence).toBe(ConfidenceLevel.HIGH);
    });
  });
});