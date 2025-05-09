/**
 * Mock research question data for testing
 */
import { ConfidenceLevel, TaskStatus } from '../../src/models/common/types';

/**
 * Research question interface (simplified for testing)
 */
export interface ResearchQuestion {
  id: string;
  question: string;
  hypotheses: Hypothesis[];
  status: string;
  plan: ResearchTask[];
  conclusion?: ConclusionElement;
  gpsCompliance?: GPSCompliance;
  created: {
    date: Date;
    user: string;
  };
  lastModified: {
    date: Date;
    user: string;
  };
}

/**
 * Hypothesis interface (simplified for testing)
 */
export interface Hypothesis {
  id: string;
  statement: string;
  supportingEvidence: string[];
  conflictingEvidence: string[];
  conflictResolution?: string;
  analysis?: string;
  confidence: ConfidenceLevel;
}

/**
 * Research task interface (simplified for testing)
 */
export interface ResearchTask {
  id: string;
  description: string;
  sources: string[];
  status: TaskStatus;
  results?: string;
  followupTasks?: string[];
}

/**
 * Conclusion element interface (simplified for testing)
 */
export interface ConclusionElement {
  statement: string;
  evidenceSummary: string;
  conflictResolution?: string;
  confidence: ConfidenceLevel;
  citations: string[];
}

/**
 * GPS compliance interface (simplified for testing)
 */
export interface GPSCompliance {
  exhaustiveResearch: boolean;
  completeCitations: boolean;
  skillfulAnalysis: boolean;
  conflictResolution: boolean;
  soundConclusion: boolean;
  complianceNotes?: string;
}

/**
 * Generate a mock research question
 */
export const createMockResearchQuestion = (
  overrides: Partial<ResearchQuestion> = {}
): ResearchQuestion => {
  const defaultQuestion: ResearchQuestion = {
    id: 'question-1',
    question: 'When and where was John Smith born?',
    hypotheses: [
      {
        id: 'hypothesis-1',
        statement: 'John Smith was born on May 10, 1920 in Madison County, New York',
        supportingEvidence: ['citation-1', 'citation-5'],
        conflictingEvidence: ['citation-4'],
        conflictResolution: 'Birth certificate is considered more reliable than census record',
        analysis: 'Birth certificate provides direct evidence of birth date and location',
        confidence: ConfidenceLevel.HIGH
      },
      {
        id: 'hypothesis-2',
        statement: 'John Smith was born in 1919 in Madison County, New York',
        supportingEvidence: ['citation-4'],
        conflictingEvidence: ['citation-1', 'citation-5'],
        analysis: 'Only the census record supports this date',
        confidence: ConfidenceLevel.LOW
      }
    ],
    status: 'IN_PROGRESS',
    plan: [
      {
        id: 'task-1',
        description: 'Locate birth certificate',
        sources: ['source-1'],
        status: TaskStatus.COMPLETED,
        results: 'Found birth certificate showing birth date of May 10, 1920'
      },
      {
        id: 'task-2',
        description: 'Check census records',
        sources: ['source-4'],
        status: TaskStatus.COMPLETED,
        results: 'Found 1920 census showing birth year as 1919'
      },
      {
        id: 'task-3',
        description: 'Search local newspapers',
        sources: ['source-5'],
        status: TaskStatus.COMPLETED,
        results: 'Found birth announcement in local newspaper'
      },
      {
        id: 'task-4',
        description: 'Check church baptismal records',
        sources: [],
        status: TaskStatus.PLANNED
      }
    ],
    created: {
      date: new Date('2023-01-01'),
      user: 'test-user'
    },
    lastModified: {
      date: new Date('2023-01-15'),
      user: 'test-user'
    }
  };

  return { ...defaultQuestion, ...overrides };
};

/**
 * Mock research question - In progress
 */
export const mockInProgressQuestion: ResearchQuestion = createMockResearchQuestion();

/**
 * Mock research question - Completed with full GPS compliance
 */
export const mockCompletedQuestion: ResearchQuestion = createMockResearchQuestion({
  id: 'question-2',
  question: 'Who were the parents of John Smith?',
  status: 'COMPLETED',
  hypotheses: [
    {
      id: 'hypothesis-3',
      statement: 'James and Mary Smith were the parents of John Smith',
      supportingEvidence: ['citation-1', 'citation-3', 'citation-4'],
      conflictingEvidence: [],
      analysis: 'Multiple sources confirm James and Mary as parents',
      confidence: ConfidenceLevel.VERY_HIGH
    }
  ],
  conclusion: {
    statement: 'James Smith (1890-1950) and Mary Johnson Smith (1895-1960) were the parents of John Smith',
    evidenceSummary: 'Birth certificate, family history, and census records all identify James and Mary as parents',
    confidence: ConfidenceLevel.VERY_HIGH,
    citations: ['citation-1', 'citation-3', 'citation-4']
  },
  gpsCompliance: {
    exhaustiveResearch: true,
    completeCitations: true,
    skillfulAnalysis: true,
    conflictResolution: true,
    soundConclusion: true,
    complianceNotes: 'Research meets all GPS criteria'
  }
});

/**
 * Mock research question - With conflicts not resolved
 */
export const mockConflictQuestion: ResearchQuestion = createMockResearchQuestion({
  id: 'question-3',
  question: 'When did John Smith marry Sarah Johnson?',
  status: 'IN_PROGRESS',
  hypotheses: [
    {
      id: 'hypothesis-4',
      statement: 'John Smith married Sarah Johnson on June 12, 1942',
      supportingEvidence: ['citation-7'],
      conflictingEvidence: ['citation-8'],
      confidence: ConfidenceLevel.MEDIUM
    },
    {
      id: 'hypothesis-5',
      statement: 'John Smith married Sarah Johnson on June 12, 1943',
      supportingEvidence: ['citation-8'],
      conflictingEvidence: ['citation-7'],
      confidence: ConfidenceLevel.MEDIUM
    }
  ],
  gpsCompliance: {
    exhaustiveResearch: true,
    completeCitations: true,
    skillfulAnalysis: true,
    conflictResolution: false,
    soundConclusion: false,
    complianceNotes: 'Conflicting evidence about marriage date has not been resolved'
  }
});

/**
 * Mock research question - With incomplete citations
 */
export const mockIncompleteCitationsQuestion: ResearchQuestion = createMockResearchQuestion({
  id: 'question-4',
  question: 'Where did John Smith live in 1930?',
  status: 'IN_PROGRESS',
  gpsCompliance: {
    exhaustiveResearch: true,
    completeCitations: false,
    skillfulAnalysis: true,
    conflictResolution: true,
    soundConclusion: false,
    complianceNotes: 'Citations are incomplete for several sources'
  }
});

/**
 * Mock research question - With poor analysis
 */
export const mockPoorAnalysisQuestion: ResearchQuestion = createMockResearchQuestion({
  id: 'question-5',
  question: 'What occupation did John Smith have?',
  status: 'IN_PROGRESS',
  gpsCompliance: {
    exhaustiveResearch: true,
    completeCitations: true,
    skillfulAnalysis: false,
    conflictResolution: true,
    soundConclusion: false,
    complianceNotes: 'Evidence has not been properly analyzed and correlated'
  }
});

/**
 * Array of all mock research questions
 */
export const mockResearchQuestions: ResearchQuestion[] = [
  mockInProgressQuestion,
  mockCompletedQuestion,
  mockConflictQuestion,
  mockIncompleteCitationsQuestion,
  mockPoorAnalysisQuestion
];

/**
 * Mock research question model for tests that use database operations
 */
export const mockResearchQuestionModel = {
  find: jest.fn().mockImplementation(() => ({
    exec: jest.fn().mockResolvedValue(mockResearchQuestions)
  })),
  findOne: jest.fn().mockImplementation((query) => ({
    exec: jest.fn().mockImplementation(() => {
      const id = query?.id;
      if (!id) return Promise.resolve(null);
      const question = mockResearchQuestions.find(q => q.id === id);
      return Promise.resolve(question || null);
    })
  }))
};