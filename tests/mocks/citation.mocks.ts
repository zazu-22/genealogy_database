/**
 * Mock citation data for testing
 */
import { CitationQuality } from '../../src/models/common/types';
import { Citation } from '../../src/models/source/types';

/**
 * Generate a mock citation with the specified properties
 */
export const createMockCitation = (
  overrides: Partial<Citation> = {}
): Citation => {
  const defaultCitation: Citation = {
    id: 'citation-1',
    sourceId: 'source-1',
    citationTemplate: 'template-birth-certificate',
    elements: {
      'recordType': 'Birth Certificate',
      'name': 'John Smith',
      'date': '10 May 1920',
      'place': 'Madison County, New York',
      'certificate': 'VR-1920-123',
      'repository': 'Madison County Courthouse',
      'accessed': '15 January 2023'
    },
    quality: CitationQuality.COMPLETE,
    notes: 'Complete citation for birth certificate',
    formatted: {
      fullStyle: 'Birth Certificate for John Smith, 10 May 1920, Madison County, New York, certificate VR-1920-123, Madison County Courthouse, accessed 15 January 2023.',
      shortStyle: 'John Smith birth certificate (1920)',
      bibStyle: 'Madison County, New York. Birth Certificate for John Smith, 10 May 1920. Madison County Courthouse.'
    },
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

  return { ...defaultCitation, ...overrides };
};

/**
 * Mock citation - Complete citation for original source
 */
export const mockCompleteCitation: Citation = createMockCitation();

/**
 * Mock citation - Partial citation for derivative source
 */
export const mockPartialCitation: Citation = createMockCitation({
  id: 'citation-2',
  sourceId: 'source-2',
  elements: {
    'author': 'Smith Genealogical Society',
    'title': 'Transcription of John Smith Birth Certificate',
    'date': '2010',
    'website': 'Smith Family Archives'
  },
  quality: CitationQuality.PARTIAL,
  notes: 'Partial citation missing some elements',
  formatted: {
    fullStyle: 'Smith Genealogical Society, "Transcription of John Smith Birth Certificate" (2010), Smith Family Archives.',
    shortStyle: 'Smith Genealogical Society, "Transcription" (2010)',
    bibStyle: 'Smith Genealogical Society. "Transcription of John Smith Birth Certificate." Smith Family Archives, 2010.'
  }
});

/**
 * Mock citation - Minimal citation for authored source
 */
export const mockMinimalCitation: Citation = createMockCitation({
  id: 'citation-3',
  sourceId: 'source-3',
  elements: {
    'author': 'Jane Smith',
    'title': 'Smith Family History',
    'year': '1980'
  },
  quality: CitationQuality.MINIMAL,
  notes: 'Minimal citation with basic information',
  formatted: {
    fullStyle: 'Jane Smith, Smith Family History (1980).',
    shortStyle: 'Smith, Smith Family History.',
    bibStyle: 'Smith, Jane. Smith Family History. 1980.'
  }
});

/**
 * Mock citation - Complete citation for conflicting source
 */
export const mockConflictingCitation: Citation = createMockCitation({
  id: 'citation-4',
  sourceId: 'source-4',
  elements: {
    'recordType': 'U.S. Census',
    'year': '1920',
    'state': 'New York',
    'county': 'Madison',
    'enumeration': 'ED 123, sheet 45',
    'household': '67',
    'line': '12',
    'name': 'John Smith',
    'repository': 'National Archives'
  },
  quality: CitationQuality.COMPLETE,
  notes: 'Census shows birth year as 1919 instead of 1920',
  formatted: {
    fullStyle: '1920 U.S. Census, Madison County, New York, ED 123, sheet 45, household 67, line 12, John Smith; National Archives.',
    shortStyle: '1920 Census, John Smith',
    bibStyle: '1920 U.S. Census, Madison County, New York. ED 123, sheet 45, household 67, line 12, John Smith. National Archives.'
  }
});

/**
 * Mock citation - Partial citation for low clarity source
 */
export const mockLowClarityCitation: Citation = createMockCitation({
  id: 'citation-5',
  sourceId: 'source-5',
  elements: {
    'newspaper': 'Madison County Gazette',
    'date': '20 May 1920',
    'section': 'Birth Announcements',
    'page': '3'
  },
  quality: CitationQuality.PARTIAL,
  notes: 'Newspaper announcement partially illegible',
  formatted: {
    fullStyle: 'Madison County Gazette, 20 May 1920, Birth Announcements, p. 3.',
    shortStyle: 'Madison County Gazette (20 May 1920)',
    bibStyle: 'Madison County Gazette. 20 May 1920, Birth Announcements, p. 3.'
  }
});

/**
 * Mock citation - Minimal citation for minimal source
 */
export const mockMinimalSourceCitation: Citation = createMockCitation({
  id: 'citation-6',
  sourceId: 'source-6',
  elements: {
    'title': 'Miscellaneous Notes on Smith Family',
    'date': 'n.d.'
  },
  quality: CitationQuality.MINIMAL,
  notes: 'Minimal citation for notes of unknown origin',
  formatted: {
    fullStyle: 'Miscellaneous Notes on Smith Family, n.d.',
    shortStyle: 'Misc. Notes on Smith Family',
    bibStyle: 'Miscellaneous Notes on Smith Family. n.d.'
  }
});

/**
 * Array of all mock citations
 */
export const mockCitations: Citation[] = [
  mockCompleteCitation,
  mockPartialCitation,
  mockMinimalCitation,
  mockConflictingCitation,
  mockLowClarityCitation,
  mockMinimalSourceCitation
];

/**
 * Mock citation model for tests that use database operations
 */
export const mockCitationModel = {
  find: jest.fn().mockImplementation(() => ({
    exec: jest.fn().mockResolvedValue(mockCitations)
  })),
  findOne: jest.fn().mockImplementation((query) => ({
    exec: jest.fn().mockImplementation(() => {
      const id = query?.id;
      if (!id) return Promise.resolve(null);
      const citation = mockCitations.find(c => c.id === id);
      return Promise.resolve(citation || null);
    })
  }))
};