/**
 * Unit tests for GPS Evaluation Service
 */
import { GPSEvaluationServiceImpl } from '../../../../src/services/evidence/gps-evaluation.service';
import { 
  mockCitationModel 
} from '../../../mocks/citation.mocks';
import {
  mockResearchQuestionModel,
  mockInProgressQuestion,
  mockCompletedQuestion,
  mockConflictQuestion,
  mockIncompleteCitationsQuestion,
  mockPoorAnalysisQuestion
} from '../../../mocks/research-question.mocks';

// Mock models
jest.mock('../../../../src/models/source/schema', () => ({
  CitationModel: mockCitationModel
}));

// Mock research question model (not explicitly defined in the project)
jest.mock('../../../../src/models/research/schema', () => ({
  ResearchQuestionModel: mockResearchQuestionModel
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

describe('GPS Evaluation Service', () => {
  let service: GPSEvaluationServiceImpl;

  beforeEach(() => {
    service = new GPSEvaluationServiceImpl();
    jest.clearAllMocks();
  });

  describe('evaluateExhaustiveResearch', () => {
    it('should evaluate research as exhaustive when sufficient', async () => {
      const result = await service.evaluateExhaustiveResearch('question-2');
      
      expect(result.isExhaustive).toBe(true);
      expect(result.score).toBeGreaterThanOrEqual(70);
    });

    it('should provide recommendations for incomplete research', async () => {
      const result = await service.evaluateExhaustiveResearch('question-1');
      
      expect(result.recommendations.length).toBeGreaterThan(0);
    });

    it('should consider multiple source types for exhaustiveness', async () => {
      const result = await service.evaluateExhaustiveResearch('question-1');
      
      // Expect a score that reflects partial coverage of source types
      expect(result.score).toBeGreaterThan(0);
      expect(result.score).toBeLessThan(100);
    });
  });

  describe('evaluateCitationCompleteness', () => {
    it('should evaluate citations as complete when all are properly cited', async () => {
      const result = await service.evaluateCitationCompleteness('question-2');
      
      expect(result.isComplete).toBe(true);
      expect(result.incompleteCount).toBe(0);
    });

    it('should identify incomplete citations', async () => {
      const result = await service.evaluateCitationCompleteness('question-4');
      
      expect(result.isComplete).toBe(false);
      expect(result.incompleteCount).toBeGreaterThan(0);
    });

    it('should calculate appropriate completeness score', async () => {
      // Mock citations with mix of complete, partial, and minimal quality
      mockCitationModel.find.mockImplementationOnce(() => ({
        exec: jest.fn().mockResolvedValue([
          { quality: 'COMPLETE' },
          { quality: 'COMPLETE' },
          { quality: 'PARTIAL' },
          { quality: 'MINIMAL' }
        ])
      }));
      
      const result = await service.evaluateCitationCompleteness('question-mix');
      
      // 2 complete, 1 partial, 1 minimal = (2*1.0 + 1*0.5 + 1*0.2)/4 = 0.675 * 100 = 67.5
      expect(result.score).toBeCloseTo(67.5);
    });
  });

  describe('evaluateAnalysisQuality', () => {
    it('should evaluate analysis as skillful when properly analyzed', async () => {
      const result = await service.evaluateAnalysisQuality('question-2');
      
      expect(result.isSkillful).toBe(true);
      expect(result.score).toBeGreaterThanOrEqual(70);
    });

    it('should identify poor analysis', async () => {
      const result = await service.evaluateAnalysisQuality('question-5');
      
      expect(result.isSkillful).toBe(false);
    });

    it('should provide recommendations for improving analysis', async () => {
      const result = await service.evaluateAnalysisQuality('question-5');
      
      expect(result.recommendations.length).toBeGreaterThan(0);
    });
  });

  describe('evaluateConflictResolution', () => {
    it('should evaluate conflicts as resolved when all are addressed', async () => {
      const result = await service.evaluateConflictResolution('question-2');
      
      expect(result.isResolved).toBe(true);
      expect(result.unresolvedCount).toBe(0);
    });

    it('should identify unresolved conflicts', async () => {
      const result = await service.evaluateConflictResolution('question-3');
      
      expect(result.isResolved).toBe(false);
      expect(result.unresolvedCount).toBeGreaterThan(0);
    });

    it('should provide recommendations for resolving conflicts', async () => {
      const result = await service.evaluateConflictResolution('question-3');
      
      expect(result.recommendations.length).toBeGreaterThan(0);
    });
  });

  describe('evaluateConclusionSoundness', () => {
    it('should evaluate conclusion as sound when properly reasoned', async () => {
      const result = await service.evaluateConclusionSoundness('question-2');
      
      expect(result.isSoundly).toBe(true);
      expect(result.score).toBeGreaterThanOrEqual(80);
    });

    it('should identify unsound conclusions', async () => {
      const result = await service.evaluateConclusionSoundness('question-5');
      
      expect(result.isSoundly).toBe(false);
    });

    it('should provide recommendations for improving conclusions', async () => {
      const result = await service.evaluateConclusionSoundness('question-5');
      
      expect(result.recommendations.length).toBeGreaterThan(0);
    });
  });

  describe('calculateGPSCompliance', () => {
    it('should evaluate overall compliance as true when all criteria are met', async () => {
      // Mock all component methods to return compliant results
      jest.spyOn(service, 'evaluateExhaustiveResearch').mockResolvedValue({
        isExhaustive: true,
        score: 90,
        recommendations: []
      });
      
      jest.spyOn(service, 'evaluateCitationCompleteness').mockResolvedValue({
        isComplete: true,
        score: 95,
        incompleteCount: 0
      });
      
      jest.spyOn(service, 'evaluateAnalysisQuality').mockResolvedValue({
        isSkillful: true,
        score: 85,
        recommendations: []
      });
      
      jest.spyOn(service, 'evaluateConflictResolution').mockResolvedValue({
        isResolved: true,
        unresolvedCount: 0,
        recommendations: []
      });
      
      jest.spyOn(service, 'evaluateConclusionSoundness').mockResolvedValue({
        isSoundly: true,
        score: 90,
        recommendations: []
      });
      
      const result = await service.calculateGPSCompliance('question-compliant');
      
      expect(result.overallCompliant).toBe(true);
      expect(result.components.exhaustiveResearch).toBe(true);
      expect(result.components.completeCitations).toBe(true);
      expect(result.components.skillfulAnalysis).toBe(true);
      expect(result.components.conflictResolution).toBe(true);
      expect(result.components.soundConclusion).toBe(true);
    });

    it('should evaluate overall compliance as false when any criterion is not met', async () => {
      // Use the conflict question which has unresolved conflicts
      const result = await service.calculateGPSCompliance('question-3');
      
      expect(result.overallCompliant).toBe(false);
    });

    it('should calculate an appropriate overall score', async () => {
      // Mock component methods with mixed results
      jest.spyOn(service, 'evaluateExhaustiveResearch').mockResolvedValue({
        isExhaustive: true,
        score: 90,
        recommendations: []
      });
      
      jest.spyOn(service, 'evaluateCitationCompleteness').mockResolvedValue({
        isComplete: true,
        score: 90,
        incompleteCount: 0
      });
      
      jest.spyOn(service, 'evaluateAnalysisQuality').mockResolvedValue({
        isSkillful: true,
        score: 80,
        recommendations: []
      });
      
      jest.spyOn(service, 'evaluateConflictResolution').mockResolvedValue({
        isResolved: false, // This one fails
        unresolvedCount: 1,
        recommendations: ['Resolve conflicts']
      });
      
      jest.spyOn(service, 'evaluateConclusionSoundness').mockResolvedValue({
        isSoundly: true,
        score: 85,
        recommendations: []
      });
      
      const result = await service.calculateGPSCompliance('question-mixed');
      
      // Expected score: (90 + 90 + 80 + 0 + 85) / 5 = 69
      expect(result.score).toBeCloseTo(69);
      expect(result.overallCompliant).toBe(false);
    });

    it('should combine recommendations from all components', async () => {
      // Use question with multiple issues
      const result = await service.calculateGPSCompliance('question-3');
      
      // Expect recommendations from multiple components
      expect(result.recommendations.length).toBeGreaterThan(0);
    });
  });
});