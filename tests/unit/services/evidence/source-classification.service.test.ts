/**
 * Unit tests for Source Classification Service
 */
import { 
  Clarity, 
  Contemporaneity, 
  InformantKnowledge, 
  Originality 
} from '../../../../src/models/common/types';
import { SourceFormat, SourceType } from '../../../../src/models/source/types';
import { SourceClassificationServiceImpl } from '../../../../src/services/evidence/source-classification.service';
import { 
  mockOriginalSource, 
  mockDerivativeSource, 
  mockAuthoredSource, 
  mockLowClaritySource, 
  mockMinimalSource 
} from '../../../mocks/source.mocks';

// Mock logger to suppress output during tests
jest.mock('../../../../src/utils/logger', () => ({
  logger: {
    info: jest.fn(),
    debug: jest.fn(),
    error: jest.fn(),
    warn: jest.fn()
  }
}));

describe('Source Classification Service', () => {
  let service: SourceClassificationServiceImpl;

  beforeEach(() => {
    service = new SourceClassificationServiceImpl();
  });

  describe('classifySource', () => {
    it('should classify a complete source', async () => {
      const classification = await service.classifySource(mockOriginalSource);
      
      expect(classification).toEqual({
        originality: Originality.ORIGINAL,
        informantKnowledge: InformantKnowledge.PRIMARY,
        format: SourceFormat.TEXT,
        contemporaneity: Contemporaneity.CONTEMPORARY,
        clarity: Clarity.HIGH
      });
    });

    it('should classify a derivative source', async () => {
      const classification = await service.classifySource(mockDerivativeSource);
      
      expect(classification.originality).toBe(Originality.DERIVATIVE);
      expect(classification.informantKnowledge).toBe(InformantKnowledge.SECONDARY);
    });

    it('should classify an authored work', async () => {
      const classification = await service.classifySource(mockAuthoredSource);
      
      expect(classification.originality).toBe(Originality.AUTHORED_WORK);
      expect(classification.informantKnowledge).toBe(InformantKnowledge.SECONDARY);
    });

    it('should classify a source with low clarity', async () => {
      const classification = await service.classifySource(mockLowClaritySource);
      
      expect(classification.clarity).toBe(Clarity.LOW);
    });

    it('should classify a minimal source with unknown attributes', async () => {
      const classification = await service.classifySource(mockMinimalSource);
      
      expect(classification.originality).toBe(Originality.UNKNOWN);
      expect(classification.informantKnowledge).toBe(InformantKnowledge.UNDETERMINED);
    });

    it('should handle a source with minimal information', async () => {
      const minimalSource = { type: SourceType.VITAL_RECORD };
      const classification = await service.classifySource(minimalSource);
      
      // Should still provide a classification even with minimal info
      expect(classification).toBeDefined();
      expect(classification.originality).toBeDefined();
      expect(classification.informantKnowledge).toBeDefined();
      expect(classification.format).toBeDefined();
      expect(classification.contemporaneity).toBeDefined();
      expect(classification.clarity).toBeDefined();
    });
  });

  describe('determineOriginality', () => {
    it('should determine originality as ORIGINAL for original sources', async () => {
      const result = await service.determineOriginality(mockOriginalSource);
      expect(result).toBe(Originality.ORIGINAL);
    });

    it('should determine originality as DERIVATIVE for derivative sources', async () => {
      const result = await service.determineOriginality(mockDerivativeSource);
      expect(result).toBe(Originality.DERIVATIVE);
    });

    it('should determine originality as AUTHORED_WORK for authored works', async () => {
      const result = await service.determineOriginality(mockAuthoredSource);
      expect(result).toBe(Originality.AUTHORED_WORK);
    });

    it('should determine originality as UNKNOWN for sources with insufficient information', async () => {
      const result = await service.determineOriginality({});
      expect(result).toBe(Originality.UNKNOWN);
    });

    it('should handle census records with publication as DERIVATIVE', async () => {
      const censusWithPublication = {
        type: SourceType.CENSUS,
        publication: { publisher: 'Ancestry.com' }
      };
      const result = await service.determineOriginality(censusWithPublication);
      expect(result).toBe(Originality.DERIVATIVE);
    });
  });

  describe('evaluateInformantKnowledge', () => {
    it('should evaluate informant knowledge as PRIMARY for primary sources', async () => {
      const result = await service.evaluateInformantKnowledge(mockOriginalSource);
      expect(result).toBe(InformantKnowledge.PRIMARY);
    });

    it('should evaluate informant knowledge as SECONDARY for secondary sources', async () => {
      const result = await service.evaluateInformantKnowledge(mockAuthoredSource);
      expect(result).toBe(InformantKnowledge.SECONDARY);
    });

    it('should evaluate informant knowledge as MIXED for sources with mixed knowledge', async () => {
      const vitalRecord = { type: SourceType.VITAL_RECORD };
      const result = await service.evaluateInformantKnowledge(vitalRecord);
      expect(result).toBe(InformantKnowledge.MIXED);
    });

    it('should evaluate informant knowledge as UNDETERMINED for sources with insufficient information', async () => {
      const result = await service.evaluateInformantKnowledge({});
      expect(result).toBe(InformantKnowledge.UNDETERMINED);
    });
  });

  describe('assessContemporaneity', () => {
    it('should assess contemporaneity as CONTEMPORARY for contemporary sources', async () => {
      const result = await service.assessContemporaneity(mockOriginalSource);
      expect(result).toBe(Contemporaneity.CONTEMPORARY);
    });

    it('should assess contemporaneity as DISTANT for distant sources', async () => {
      const result = await service.assessContemporaneity(mockAuthoredSource);
      expect(result).toBe(Contemporaneity.DISTANT);
    });

    it('should assess contemporaneity based on event date when provided', async () => {
      // Source from 1920, event from 1920 (contemporary)
      let result = await service.assessContemporaneity(mockOriginalSource, '1920-05-10');
      expect(result).toBe(Contemporaneity.CONTEMPORARY);
      
      // Source from 1920, event from 1910 (within 10 years, so contemporary by our test)
      result = await service.assessContemporaneity(mockOriginalSource, '1910-01-01');
      expect(result).toBe(Contemporaneity.CONTEMPORARY);
      
      // Source from 1980, event from 1920 (distant)
      result = await service.assessContemporaneity(mockAuthoredSource, '1920-05-10');
      expect(result).toBe(Contemporaneity.DISTANT);
    });

    it('should assess contemporaneity as UNKNOWN for sources with insufficient information', async () => {
      const result = await service.assessContemporaneity({});
      expect(result).toBe(Contemporaneity.UNKNOWN);
    });
  });

  describe('assessClarity', () => {
    it('should assess clarity as HIGH for clear sources', async () => {
      const result = await service.assessClarity(mockOriginalSource);
      expect(result).toBe(Clarity.HIGH);
    });

    it('should assess clarity as LOW for unclear sources', async () => {
      const result = await service.assessClarity(mockLowClaritySource);
      expect(result).toBe(Clarity.LOW);
    });

    it('should assess clarity based on text content', async () => {
      const sourceWithUnclearText = {
        content: {
          text: 'This document is illegible in parts and difficult to read.'
        }
      };
      const result = await service.assessClarity(sourceWithUnclearText);
      expect(result).toBe(Clarity.LOW);
    });

    it('should default to MEDIUM clarity when insufficient information is available', async () => {
      const result = await service.assessClarity({});
      expect(result).toBe(Clarity.MEDIUM);
    });

    it('should use existing clarity assessment if available', async () => {
      const sourceWithClassification = {
        classification: {
          clarity: Clarity.HIGH,
          originality: Originality.ORIGINAL,
          informantKnowledge: InformantKnowledge.PRIMARY,
          format: SourceFormat.TEXT,
          contemporaneity: Contemporaneity.CONTEMPORARY
        }
      };
      const result = await service.assessClarity(sourceWithClassification);
      expect(result).toBe(Clarity.HIGH);
    });
  });
});