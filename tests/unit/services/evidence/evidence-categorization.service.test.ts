/**
 * Unit tests for Evidence Categorization Service
 */
import { EvidenceType } from '../../../../src/models/common/types';
import { EvidenceCategorizationServiceImpl } from '../../../../src/services/evidence/evidence-categorization.service';
import { 
  mockSourceModel 
} from '../../../mocks/source.mocks';
import { 
  mockCitationModel,
  mockCompleteCitation,
  mockConflictingCitation
} from '../../../mocks/citation.mocks';

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

describe('Evidence Categorization Service', () => {
  let service: EvidenceCategorizationServiceImpl;

  beforeEach(() => {
    service = new EvidenceCategorizationServiceImpl();
    jest.clearAllMocks();
  });

  describe('categorizeEvidence', () => {
    it('should categorize direct evidence', async () => {
      // Mock isDirectEvidence to return true
      jest.spyOn(service, 'isDirectEvidence').mockResolvedValue(true);
      
      const evidenceType = await service.categorizeEvidence(
        'source-1', 
        'citation-1', 
        'question-1'
      );
      
      expect(evidenceType).toBe(EvidenceType.DIRECT);
    });

    it('should categorize negative evidence', async () => {
      // Mock isDirectEvidence to return false
      jest.spyOn(service, 'isDirectEvidence').mockResolvedValue(false);
      // Mock isNegativeEvidence to return true
      jest.spyOn(service, 'isNegativeEvidence').mockResolvedValue(true);
      
      const evidenceType = await service.categorizeEvidence(
        'source-1', 
        'citation-1', 
        'question-1'
      );
      
      expect(evidenceType).toBe(EvidenceType.NEGATIVE);
    });

    it('should categorize indirect evidence', async () => {
      // Mock isDirectEvidence to return false
      jest.spyOn(service, 'isDirectEvidence').mockResolvedValue(false);
      // Mock isNegativeEvidence to return false
      jest.spyOn(service, 'isNegativeEvidence').mockResolvedValue(false);
      // Mock isIndirectEvidence to return true
      jest.spyOn(service, 'isIndirectEvidence').mockResolvedValue(true);
      
      const evidenceType = await service.categorizeEvidence(
        'source-1', 
        'citation-1', 
        'question-1'
      );
      
      expect(evidenceType).toBe(EvidenceType.INDIRECT);
    });

    it('should categorize contradictory evidence', async () => {
      // Mock all methods to return false
      jest.spyOn(service, 'isDirectEvidence').mockResolvedValue(false);
      jest.spyOn(service, 'isNegativeEvidence').mockResolvedValue(false);
      jest.spyOn(service, 'isIndirectEvidence').mockResolvedValue(false);
      // Mock private method to check contradictory evidence
      jest.spyOn(service as any, 'isContradictoryEvidence').mockResolvedValue(true);
      
      const evidenceType = await service.categorizeEvidence(
        'source-4', 
        'citation-4', 
        'question-1'
      );
      
      expect(evidenceType).toBe(EvidenceType.CONTRADICTORY);
    });

    it('should default to indirect evidence if cannot determine specifically', async () => {
      // Mock all methods to return false
      jest.spyOn(service, 'isDirectEvidence').mockResolvedValue(false);
      jest.spyOn(service, 'isNegativeEvidence').mockResolvedValue(false);
      jest.spyOn(service, 'isIndirectEvidence').mockResolvedValue(false);
      jest.spyOn(service as any, 'isContradictoryEvidence').mockResolvedValue(false);
      
      const evidenceType = await service.categorizeEvidence(
        'source-1', 
        'citation-1', 
        'question-1'
      );
      
      expect(evidenceType).toBe(EvidenceType.INDIRECT);
    });

    it('should handle errors when citation is not found', async () => {
      // Mock CitationModel.findOne to return null
      mockCitationModel.findOne.mockImplementationOnce(() => ({
        exec: jest.fn().mockResolvedValue(null)
      }));
      
      await expect(service.categorizeEvidence(
        'source-1', 
        'non-existent', 
        'question-1'
      )).rejects.toThrow();
    });
  });

  describe('isDirectEvidence', () => {
    it('should identify direct evidence based on source reliability', async () => {
      // Source with direct evidence type
      const result = await service.isDirectEvidence(
        'source-1', 
        'citation-1', 
        'question-1'
      );
      
      expect(result).toBe(true);
    });

    it('should handle sources without direct evidence type', async () => {
      // mockAuthoredSource has indirect evidence
      const result = await service.isDirectEvidence(
        'source-3', 
        'citation-3', 
        'question-1'
      );
      
      expect(result).toBe(false);
    });

    it('should handle errors when source is not found', async () => {
      // Mock SourceModel.findOne to return null
      mockSourceModel.findOne.mockImplementationOnce(() => ({
        exec: jest.fn().mockResolvedValue(null)
      }));
      
      await expect(service.isDirectEvidence(
        'non-existent', 
        'citation-1', 
        'question-1'
      )).rejects.toThrow();
    });
  });

  describe('isIndirectEvidence', () => {
    it('should identify indirect evidence based on source reliability', async () => {
      // mockAuthoredSource has indirect evidence
      const result = await service.isIndirectEvidence(
        'source-3', 
        'citation-3', 
        'question-1'
      );
      
      expect(result).toBe(true);
    });

    it('should handle errors when source is not found', async () => {
      // Mock SourceModel.findOne to return null
      mockSourceModel.findOne.mockImplementationOnce(() => ({
        exec: jest.fn().mockResolvedValue(null)
      }));
      
      await expect(service.isIndirectEvidence(
        'non-existent', 
        'citation-1', 
        'question-1'
      )).rejects.toThrow();
    });
  });

  describe('isNegativeEvidence', () => {
    it('should identify negative evidence based on source reliability', async () => {
      // We need to explicitly set up a source with negative evidence
      const sourceWithNegative = { 
        ...mockSourceModel.findOne().exec(),
        reliability: { 
          evidenceType: [EvidenceType.NEGATIVE],
          score: 70,
          informationQuality: 'MEDIUM'
        }
      };
      
      // Mock SourceModel.findOne to return our source with negative evidence
      mockSourceModel.findOne.mockImplementationOnce(() => ({
        exec: jest.fn().mockResolvedValue(sourceWithNegative)
      }));
      
      const result = await service.isNegativeEvidence(
        'source-special', 
        mockCompleteCitation, 
        'question-1'
      );
      
      expect(result).toBe(true);
    });

    it('should identify negative evidence based on citation notes', async () => {
      // Citation with notes indicating negative evidence
      const citationWithNegativeNotes = {
        ...mockCompleteCitation,
        notes: 'The absence of this person in the census indicates they were not living there'
      };
      
      const result = await service.isNegativeEvidence(
        'source-1', 
        citationWithNegativeNotes, 
        'question-1'
      );
      
      expect(result).toBe(true);
    });

    it('should return false for non-negative evidence', async () => {
      const result = await service.isNegativeEvidence(
        'source-1', 
        mockCompleteCitation, 
        'question-1'
      );
      
      expect(result).toBe(false);
    });
  });

  describe('calculateEvidenceWeight', () => {
    it('should calculate high weight for direct evidence from reliable sources', async () => {
      // Mock categorizeEvidence to return DIRECT
      jest.spyOn(service, 'categorizeEvidence').mockResolvedValue(EvidenceType.DIRECT);
      
      const weight = await service.calculateEvidenceWeight(
        'source-1', 
        'citation-1', 
        'question-1'
      );
      
      expect(weight).toBeGreaterThan(80);
    });

    it('should calculate lower weight for indirect evidence', async () => {
      // Mock categorizeEvidence to return INDIRECT
      jest.spyOn(service, 'categorizeEvidence').mockResolvedValue(EvidenceType.INDIRECT);
      
      const weight = await service.calculateEvidenceWeight(
        'source-1', 
        'citation-1', 
        'question-1'
      );
      
      // Should be lower than direct evidence from same source
      expect(weight).toBeLessThan(95);
      expect(weight).toBeGreaterThan(70);
    });

    it('should calculate lowest weight for contradictory evidence', async () => {
      // Mock categorizeEvidence to return CONTRADICTORY
      jest.spyOn(service, 'categorizeEvidence').mockResolvedValue(EvidenceType.CONTRADICTORY);
      
      const weight = await service.calculateEvidenceWeight(
        'source-4', 
        'citation-4', 
        'question-1'
      );
      
      // Should have penalty for being contradictory
      expect(weight).toBeLessThan(70);
    });

    it('should adjust weight based on citation quality', async () => {
      // Mock categorizeEvidence to return DIRECT
      jest.spyOn(service, 'categorizeEvidence').mockResolvedValue(EvidenceType.DIRECT);
      
      // Complete citation
      const weight1 = await service.calculateEvidenceWeight(
        'source-1', 
        'citation-1', 
        'question-1'
      );
      
      // Minimal citation
      const weight2 = await service.calculateEvidenceWeight(
        'source-1', 
        'citation-3', 
        'question-1'
      );
      
      // Complete citation should have higher weight
      expect(weight1).toBeGreaterThan(weight2);
    });

    it('should ensure weight is within bounds (0-100)', async () => {
      // Mock categorizeEvidence to return DIRECT
      jest.spyOn(service, 'categorizeEvidence').mockResolvedValue(EvidenceType.DIRECT);
      
      const weight = await service.calculateEvidenceWeight(
        'source-1', 
        'citation-1', 
        'question-1'
      );
      
      expect(weight).toBeGreaterThanOrEqual(0);
      expect(weight).toBeLessThanOrEqual(100);
    });
  });
});