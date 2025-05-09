/**
 * Tests for Evidence Analysis Services module
 */
import * as evidenceServices from '../../../../src/services/evidence';
import defaultService from '../../../../src/services/evidence';
import { EvidenceAnalysisServiceImpl } from '../../../../src/services/evidence/evidence-analysis.service';

// Mock logger to suppress output during tests
jest.mock('../../../../src/utils/logger', () => ({
  logger: {
    info: jest.fn(),
    debug: jest.fn(),
    error: jest.fn(),
    warn: jest.fn()
  }
}));

describe('Evidence Analysis Services Module', () => {
  it('should export service implementation classes', () => {
    expect(evidenceServices.EvidenceAnalysisServiceImpl).toBeDefined();
    expect(evidenceServices.SourceClassificationServiceImpl).toBeDefined();
    expect(evidenceServices.InformationEvaluationServiceImpl).toBeDefined();
    expect(evidenceServices.EvidenceCategorizationServiceImpl).toBeDefined();
    expect(evidenceServices.GPSEvaluationServiceImpl).toBeDefined();
  });

  it('should export a default service instance', () => {
    expect(defaultService).toBeDefined();
    expect(defaultService).toBeInstanceOf(EvidenceAnalysisServiceImpl);
  });
});