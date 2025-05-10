/**
 * Mock citation template data for testing
 */
import { 
  CitationTemplate,
  CitationTemplateLibrary,
  CitationFieldType,
  CitationFormatStyle,
  CitationTemplateCategory
} from '../../src/models/source/citation-template.types';
import { SourceType } from '../../src/models/source/types';

/**
 * Generate a mock citation template with the specified properties
 */
export const createMockCitationTemplate = (
  overrides: Partial<CitationTemplate> = {}
): CitationTemplate => {
  const defaultTemplate: CitationTemplate = {
    id: 'template-birth-certificate',
    name: 'Birth Certificate',
    description: 'Template for citing birth certificates from government vital records offices',
    category: CitationTemplateCategory.VITAL_RECORDS,
    sourceTypes: [SourceType.VITAL_RECORD],
    fields: [
      {
        id: 'recordType',
        name: 'Record Type',
        description: 'Type of vital record',
        type: CitationFieldType.TEXT,
        required: true,
        defaultValue: 'Birth Certificate',
        placeholder: 'Birth Certificate',
        order: 1
      },
      {
        id: 'name',
        name: 'Person Name',
        description: 'Full name of the person on the certificate',
        type: CitationFieldType.PERSON_NAME,
        required: true,
        placeholder: 'John Smith',
        order: 2
      },
      {
        id: 'date',
        name: 'Birth Date',
        description: 'Date of birth',
        type: CitationFieldType.DATE,
        required: true,
        placeholder: '10 May 1920',
        order: 3
      },
      {
        id: 'place',
        name: 'Birth Place',
        description: 'Place of birth',
        type: CitationFieldType.PLACE,
        required: true,
        placeholder: 'Madison County, New York',
        order: 4
      },
      {
        id: 'certificate',
        name: 'Certificate Number',
        description: 'Official certificate number or identifier',
        type: CitationFieldType.TEXT,
        required: false,
        placeholder: 'VR-1920-123',
        order: 5
      },
      {
        id: 'repository',
        name: 'Repository',
        description: 'Where the certificate is stored',
        type: CitationFieldType.REPOSITORY,
        required: true,
        placeholder: 'Madison County Clerk\'s Office',
        order: 6
      },
      {
        id: 'accessed',
        name: 'Access Date',
        description: 'Date when the record was accessed',
        type: CitationFieldType.DATE,
        required: false,
        placeholder: '15 January 2023',
        order: 7
      }
    ],
    formatPatterns: [
      {
        style: CitationFormatStyle.FULL,
        formatString: '{recordType} for {name}, {date}, {place}, certificate {certificate}, {repository}, accessed {accessed}.',
        description: 'Full citation style for first reference',
        example: 'Birth Certificate for John Smith, 10 May 1920, Madison County, New York, certificate VR-1920-123, Madison County Clerk\'s Office, accessed 15 January 2023.'
      },
      {
        style: CitationFormatStyle.SHORT,
        formatString: '{name} {recordType} ({date})',
        description: 'Short citation style for subsequent references',
        example: 'John Smith Birth Certificate (10 May 1920)'
      },
      {
        style: CitationFormatStyle.BIBLIOGRAPHY,
        formatString: '{place}. {recordType} for {name}, {date}. {repository}.',
        description: 'Bibliography citation style',
        example: 'Madison County, New York. Birth Certificate for John Smith, 10 May 1920. Madison County Clerk\'s Office.'
      }
    ],
    millsReference: 'Evidence Explained, 4th Edition, pp. 194-196',
    commonUsage: 'Use this template for official birth certificates issued by government agencies',
    examples: [
      'Birth Certificate for John Smith, 10 May 1920, Madison County, New York, certificate VR-1920-123, Madison County Clerk\'s Office, accessed 15 January 2023.',
      'Birth Certificate for Jane Doe, 3 January 1943, Cook County, Illinois, certificate D-324567, Cook County Clerk\'s Office, accessed 12 March 2022.'
    ],
    created: {
      date: new Date('2023-01-01'),
      user: 'system'
    },
    lastModified: {
      date: new Date('2023-01-01'),
      user: 'system'
    },
    version: 1
  };

  return { ...defaultTemplate, ...overrides };
};

/**
 * Generate a mock census record citation template
 */
export const createMockCensusTemplate = (): CitationTemplate => {
  return createMockCitationTemplate({
    id: 'template-us-census',
    name: 'U.S. Federal Census',
    description: 'Template for citing U.S. Federal Census records',
    category: CitationTemplateCategory.CENSUS_RECORDS,
    sourceTypes: [SourceType.CENSUS],
    fields: [
      {
        id: 'year',
        name: 'Census Year',
        description: 'Year of the census',
        type: CitationFieldType.TEXT,
        required: true,
        placeholder: '1920',
        order: 1
      },
      {
        id: 'state',
        name: 'State',
        description: 'State of residence',
        type: CitationFieldType.TEXT,
        required: true,
        placeholder: 'New York',
        order: 2
      },
      {
        id: 'county',
        name: 'County',
        description: 'County of residence',
        type: CitationFieldType.TEXT,
        required: true,
        placeholder: 'Madison',
        order: 3
      },
      {
        id: 'enumeration',
        name: 'Enumeration District',
        description: 'ED and sheet number',
        type: CitationFieldType.TEXT,
        required: true,
        placeholder: 'ED 123, sheet 45',
        order: 4
      },
      {
        id: 'household',
        name: 'Household Number',
        description: 'Household number',
        type: CitationFieldType.TEXT,
        required: false,
        placeholder: '67',
        order: 5
      },
      {
        id: 'line',
        name: 'Line Number',
        description: 'Line number',
        type: CitationFieldType.TEXT,
        required: false,
        placeholder: '12',
        order: 6
      },
      {
        id: 'name',
        name: 'Person Name',
        description: 'Name of the person',
        type: CitationFieldType.PERSON_NAME,
        required: true,
        placeholder: 'John Smith',
        order: 7
      },
      {
        id: 'repository',
        name: 'Repository',
        description: 'Where the record is stored',
        type: CitationFieldType.REPOSITORY,
        required: true,
        placeholder: 'National Archives',
        order: 8
      }
    ],
    formatPatterns: [
      {
        style: CitationFormatStyle.FULL,
        formatString: '{year} U.S. Census, {county} County, {state}, {enumeration}, household {household}, line {line}, {name}; {repository}.',
        description: 'Full citation style for first reference',
        example: '1920 U.S. Census, Madison County, New York, ED 123, sheet 45, household 67, line 12, John Smith; National Archives.'
      },
      {
        style: CitationFormatStyle.SHORT,
        formatString: '{year} Census, {name}',
        description: 'Short citation style for subsequent references',
        example: '1920 Census, John Smith'
      },
      {
        style: CitationFormatStyle.BIBLIOGRAPHY,
        formatString: '{year} U.S. Census, {county} County, {state}. {enumeration}, household {household}, line {line}, {name}. {repository}.',
        description: 'Bibliography citation style',
        example: '1920 U.S. Census, Madison County, New York. ED 123, sheet 45, household 67, line 12, John Smith. National Archives.'
      }
    ],
    millsReference: 'Evidence Explained, 4th Edition, pp. 240-245',
    commonUsage: 'Use this template for U.S. Federal Census records'
  });
};

/**
 * Mock citation templates
 */
export const mockBirthCertificateTemplate = createMockCitationTemplate();
export const mockCensusTemplate = createMockCensusTemplate();

/**
 * Generate a mock digital resource template
 */
export const mockDigitalResourceTemplate = createMockCitationTemplate({
  id: 'template-digital-resource',
  name: 'Digital Resource',
  description: 'Template for citing online databases and digital resources',
  category: CitationTemplateCategory.DIGITAL_RESOURCE,
  sourceTypes: [SourceType.DIGITAL_RESOURCE],
  fields: [
    {
      id: 'title',
      name: 'Resource Title',
      description: 'Title of the digital resource',
      type: CitationFieldType.TEXT,
      required: true,
      placeholder: 'Family Tree Database',
      order: 1
    },
    {
      id: 'itemType',
      name: 'Item Type',
      description: 'Type of item within the resource',
      type: CitationFieldType.TEXT,
      required: true,
      placeholder: 'Birth Certificate',
      order: 2
    },
    {
      id: 'person',
      name: 'Person',
      description: 'Person referenced in the record',
      type: CitationFieldType.PERSON_NAME,
      required: true,
      placeholder: 'John Smith',
      order: 3
    },
    {
      id: 'publisher',
      name: 'Publisher/Website',
      description: 'Publisher or website name',
      type: CitationFieldType.TEXT,
      required: true,
      placeholder: 'Ancestry.com',
      order: 4
    },
    {
      id: 'url',
      name: 'URL',
      description: 'Direct URL to the resource',
      type: CitationFieldType.URL,
      required: false,
      placeholder: 'https://www.ancestry.com/records/12345',
      order: 5
    },
    {
      id: 'accessed',
      name: 'Access Date',
      description: 'Date when the resource was accessed',
      type: CitationFieldType.DATE,
      required: true,
      placeholder: '10 May 2023',
      order: 6
    }
  ],
  formatPatterns: [
    {
      style: CitationFormatStyle.FULL,
      formatString: '"{title}", {itemType} for {person}, {publisher} ({url} : accessed {accessed}).',
      description: 'Full citation style for first reference',
      example: '"New York Births, 1880-1930", Birth Certificate for John Smith, Ancestry.com (https://www.ancestry.com/records/12345 : accessed 10 May 2023).'
    },
    {
      style: CitationFormatStyle.SHORT,
      formatString: '{publisher}, "{title}" for {person}',
      description: 'Short citation style for subsequent references',
      example: 'Ancestry.com, "New York Births, 1880-1930" for John Smith'
    },
    {
      style: CitationFormatStyle.BIBLIOGRAPHY,
      formatString: '{publisher}. "{title}." Database online. {url} : accessed {accessed}.',
      description: 'Bibliography citation style',
      example: 'Ancestry.com. "New York Births, 1880-1930." Database online. https://www.ancestry.com/records/12345 : accessed 10 May 2023.'
    }
  ],
  millsReference: 'Evidence Explained, 4th Edition, pp. 520-525',
  commonUsage: 'Use this template for online databases and digital resources'
});

/**
 * Array of all mock citation templates
 */
export const mockCitationTemplates: CitationTemplate[] = [
  mockBirthCertificateTemplate,
  mockCensusTemplate,
  mockDigitalResourceTemplate
];

/**
 * Mock citation template library
 */
export const mockCitationTemplateLibrary: CitationTemplateLibrary = {
  id: 'library-mills-4th-edition',
  name: 'Mills Citation Templates',
  description: 'Citation templates based on Elizabeth Shown Mills\' Evidence Explained, 4th Edition',
  version: '1.0.0',
  source: 'Evidence Explained, 4th Edition',
  templates: mockCitationTemplates.map(template => template.id),
  created: {
    date: new Date('2023-01-01'),
    user: 'system'
  },
  lastModified: {
    date: new Date('2023-01-01'),
    user: 'system'
  }
};

/**
 * Mock citation template model for tests that use database operations
 */
export const mockCitationTemplateModel = {
  find: jest.fn().mockImplementation((query) => ({
    exec: jest.fn().mockImplementation(() => {
      if (query?.category) {
        return Promise.resolve(mockCitationTemplates.filter(t => t.category === query.category));
      }
      if (query?.sourceTypes) {
        return Promise.resolve(mockCitationTemplates.filter(t => t.sourceTypes.includes(query.sourceTypes)));
      }
      if (query?.$text?.$search) {
        const searchTerm = query.$text.$search.toLowerCase();
        return Promise.resolve(mockCitationTemplates.filter(t => 
          t.name.toLowerCase().includes(searchTerm) || 
          t.description.toLowerCase().includes(searchTerm) ||
          t.commonUsage.toLowerCase().includes(searchTerm)
        ));
      }
      return Promise.resolve(mockCitationTemplates);
    })
  })),
  findOne: jest.fn().mockImplementation((query) => ({
    exec: jest.fn().mockImplementation(() => {
      const id = query?.id;
      if (!id) return Promise.resolve(null);
      const template = mockCitationTemplates.find(t => t.id === id);
      return Promise.resolve(template || null);
    })
  })),
  findOneAndUpdate: jest.fn().mockImplementation((query, update, options) => ({
    exec: jest.fn().mockImplementation(() => {
      const id = query?.id;
      if (!id) return Promise.resolve(null);
      const template = mockCitationTemplates.find(t => t.id === id);
      if (!template) return Promise.resolve(null);
      
      const updatedTemplate = { ...template, ...update };
      return Promise.resolve(updatedTemplate);
    })
  })),
  deleteOne: jest.fn().mockImplementation((query) => ({
    exec: jest.fn().mockImplementation(() => {
      const id = query?.id;
      if (!id) return Promise.resolve({ deletedCount: 0 });
      const template = mockCitationTemplates.find(t => t.id === id);
      if (!template) return Promise.resolve({ deletedCount: 0 });
      return Promise.resolve({ deletedCount: 1 });
    })
  }))
};

/**
 * Mock citation template library model for tests that use database operations
 */
export const mockCitationTemplateLibraryModel = {
  find: jest.fn().mockImplementation(() => ({
    exec: jest.fn().mockResolvedValue([mockCitationTemplateLibrary])
  })),
  findOne: jest.fn().mockImplementation((query) => ({
    populate: jest.fn().mockImplementation(() => ({
      exec: jest.fn().mockImplementation(() => {
        const id = query?.id;
        if (!id || id !== mockCitationTemplateLibrary.id) return Promise.resolve(null);
        return Promise.resolve(mockCitationTemplateLibrary);
      })
    }))
  })),
  findOneAndUpdate: jest.fn().mockImplementation((query, update, options) => ({
    exec: jest.fn().mockImplementation(() => {
      const id = query?.id;
      if (!id || id !== mockCitationTemplateLibrary.id) return Promise.resolve(null);
      const updatedLibrary = { ...mockCitationTemplateLibrary, ...update };
      return Promise.resolve(updatedLibrary);
    })
  })),
  deleteOne: jest.fn().mockImplementation((query) => ({
    exec: jest.fn().mockImplementation(() => {
      const id = query?.id;
      if (!id || id !== mockCitationTemplateLibrary.id) {
        return Promise.resolve({ deletedCount: 0 });
      }
      return Promise.resolve({ deletedCount: 1 });
    })
  }))
};