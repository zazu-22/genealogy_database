/**
 * Mock source data for testing
 */
import { 
  Clarity, 
  Contemporaneity, 
  EvidenceType, 
  InformantKnowledge, 
  Originality 
} from '../../src/models/common/types';
import { 
  InformationQuality, 
  Source, 
  SourceFormat, 
  SourceType 
} from '../../src/models/source/types';

/**
 * Generate a mock source with the specified properties
 */
export const createMockSource = (
  overrides: Partial<Source> = {}
): Source => {
  const defaultSource: Source = {
    id: 'source-1',
    type: SourceType.VITAL_RECORD,
    title: 'Birth Certificate for John Smith',
    creator: ['County Clerk'],
    publication: {
      place: 'Madison County, New York',
      date: '1920-05-15'
    },
    repository: {
      name: 'Madison County Courthouse',
      location: 'Madison, NY',
      callNumber: 'VR-1920-123'
    },
    classification: {
      originality: Originality.ORIGINAL,
      informantKnowledge: InformantKnowledge.PRIMARY,
      format: SourceFormat.TEXT,
      contemporaneity: Contemporaneity.CONTEMPORARY,
      clarity: Clarity.HIGH
    },
    content: {
      text: 'Birth Certificate for John Smith, born May 10, 1920',
      digitalObjects: [
        {
          type: 'image/jpeg',
          filename: 'john_smith_birth.jpg',
          uri: 'file:///source/john_smith_birth.jpg',
          description: 'Scanned birth certificate'
        }
      ]
    },
    access: {
      accessed: new Date('2023-01-15'),
      restrictions: 'None'
    },
    reliability: {
      score: 85,
      evidenceType: [EvidenceType.DIRECT],
      informationQuality: InformationQuality.HIGH,
      analysisNotes: 'Original birth certificate with clear information',
      conflictsWith: []
    },
    notes: [
      {
        text: 'Certificate is in excellent condition with all fields filled in',
        type: 'research',
        created: new Date('2023-01-15'),
        lastModified: new Date('2023-01-15')
      }
    ],
    created: {
      date: new Date('2023-01-15'),
      user: 'test-user'
    },
    lastModified: {
      date: new Date('2023-01-15'),
      user: 'test-user'
    },
    version: 1
  };

  return { ...defaultSource, ...overrides };
};

/**
 * Mock source - Original high-quality birth certificate
 */
export const mockOriginalSource: Source = createMockSource();

/**
 * Mock source - Derivative source (transcription)
 */
export const mockDerivativeSource: Source = createMockSource({
  id: 'source-2',
  type: SourceType.DIGITAL_RESOURCE,
  title: 'Transcription of John Smith Birth Certificate',
  classification: {
    originality: Originality.DERIVATIVE,
    informantKnowledge: InformantKnowledge.SECONDARY,
    format: SourceFormat.TEXT,
    contemporaneity: Contemporaneity.RECENT,
    clarity: Clarity.MEDIUM
  },
  reliability: {
    score: 65,
    evidenceType: [EvidenceType.DIRECT],
    informationQuality: InformationQuality.MEDIUM,
    analysisNotes: 'Transcription made from original certificate',
    conflictsWith: []
  }
});

/**
 * Mock source - Authored work (family history)
 */
export const mockAuthoredSource: Source = createMockSource({
  id: 'source-3',
  type: SourceType.BOOK,
  title: 'Smith Family History',
  creator: ['Jane Smith'],
  publication: {
    publisher: 'Smith Publishing',
    place: 'Boston, MA',
    date: '1980-01-01'
  },
  classification: {
    originality: Originality.AUTHORED_WORK,
    informantKnowledge: InformantKnowledge.SECONDARY,
    format: SourceFormat.TEXT,
    contemporaneity: Contemporaneity.DISTANT,
    clarity: Clarity.HIGH
  },
  reliability: {
    score: 45,
    evidenceType: [EvidenceType.INDIRECT],
    informationQuality: InformationQuality.MEDIUM,
    analysisNotes: 'Family history compiled from various sources',
    conflictsWith: []
  }
});

/**
 * Mock source - Conflicting information
 */
export const mockConflictingSource: Source = createMockSource({
  id: 'source-4',
  type: SourceType.CENSUS,
  title: '1920 Census, Madison County, New York',
  classification: {
    originality: Originality.ORIGINAL,
    informantKnowledge: InformantKnowledge.SECONDARY,
    format: SourceFormat.TEXT,
    contemporaneity: Contemporaneity.CONTEMPORARY,
    clarity: Clarity.MEDIUM
  },
  reliability: {
    score: 70,
    evidenceType: [EvidenceType.DIRECT, EvidenceType.CONTRADICTORY],
    informationQuality: InformationQuality.MEDIUM,
    analysisNotes: 'Census shows different birth date than birth certificate',
    conflictsWith: ['source-1']
  }
});

/**
 * Mock source - Low clarity newspaper
 */
export const mockLowClaritySource: Source = createMockSource({
  id: 'source-5',
  type: SourceType.NEWSPAPER,
  title: 'Madison County Gazette, Birth Announcements',
  publication: {
    publisher: 'Madison County Gazette',
    place: 'Madison, NY',
    date: '1920-05-20'
  },
  classification: {
    originality: Originality.ORIGINAL,
    informantKnowledge: InformantKnowledge.SECONDARY,
    format: SourceFormat.TEXT,
    contemporaneity: Contemporaneity.CONTEMPORARY,
    clarity: Clarity.LOW
  },
  reliability: {
    score: 55,
    evidenceType: [EvidenceType.INDIRECT],
    informationQuality: InformationQuality.LOW,
    analysisNotes: 'Newspaper is partially illegible due to poor preservation',
    conflictsWith: []
  }
});

/**
 * Mock source - Minimal information
 */
export const mockMinimalSource: Source = createMockSource({
  id: 'source-6',
  type: SourceType.OTHER,
  title: 'Miscellaneous Notes on Smith Family',
  classification: {
    originality: Originality.UNKNOWN,
    informantKnowledge: InformantKnowledge.UNDETERMINED,
    format: SourceFormat.TEXT,
    contemporaneity: Contemporaneity.UNKNOWN,
    clarity: Clarity.MEDIUM
  },
  reliability: {
    score: 30,
    evidenceType: [EvidenceType.INDIRECT],
    informationQuality: InformationQuality.LOW,
    analysisNotes: 'Limited information of unknown origin',
    conflictsWith: []
  },
  content: {
    text: 'John Smith born about 1920'
  }
});

/**
 * Array of all mock sources
 */
export const mockSources: Source[] = [
  mockOriginalSource,
  mockDerivativeSource,
  mockAuthoredSource,
  mockConflictingSource,
  mockLowClaritySource,
  mockMinimalSource
];

/**
 * Mock source model for tests that use database operations
 */
export const mockSourceModel = {
  find: jest.fn().mockImplementation(() => ({
    exec: jest.fn().mockResolvedValue(mockSources)
  })),
  findOne: jest.fn().mockImplementation((query) => ({
    exec: jest.fn().mockImplementation(() => {
      const id = query?.id;
      if (!id) return Promise.resolve(null);
      const source = mockSources.find(s => s.id === id);
      return Promise.resolve(source || null);
    })
  }))
};