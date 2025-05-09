/**
 * Unit tests for Source model
 */
import { 
  Clarity,
  CitationQuality,
  Contemporaneity,
  EvidenceType,
  InformantKnowledge,
  InformationQuality,
  Originality,
  Source,
  SourceFormat,
  SourceType
} from '../../../src/models';

describe('Source Model', () => {
  it('should create a valid source object', () => {
    // Create a minimal Source object
    const source: Source = {
      id: '123456',
      type: SourceType.VITAL_RECORD,
      title: 'Birth Certificate for John Smith',
      classification: {
        originality: Originality.ORIGINAL,
        informantKnowledge: InformantKnowledge.PRIMARY,
        format: SourceFormat.IMAGE,
        contemporaneity: Contemporaneity.CONTEMPORARY,
        clarity: Clarity.HIGH
      },
      reliability: {
        score: 85,
        evidenceType: [EvidenceType.DIRECT],
        informationQuality: InformationQuality.HIGH
      },
      created: {
        date: new Date(),
        user: 'testUser'
      },
      lastModified: {
        date: new Date(),
        user: 'testUser'
      },
      version: 1
    };

    // Assert the object matches our expectations
    expect(source).toBeDefined();
    expect(source.id).toBe('123456');
    expect(source.type).toBe(SourceType.VITAL_RECORD);
    expect(source.title).toBe('Birth Certificate for John Smith');
    
    // Check classification
    expect(source.classification.originality).toBe(Originality.ORIGINAL);
    expect(source.classification.informantKnowledge).toBe(InformantKnowledge.PRIMARY);
    expect(source.classification.format).toBe(SourceFormat.IMAGE);
    expect(source.classification.contemporaneity).toBe(Contemporaneity.CONTEMPORARY);
    expect(source.classification.clarity).toBe(Clarity.HIGH);
    
    // Check reliability
    expect(source.reliability.score).toBe(85);
    expect(source.reliability.evidenceType).toContain(EvidenceType.DIRECT);
    expect(source.reliability.informationQuality).toBe(InformationQuality.HIGH);
  });

  it('should support publication and repository information', () => {
    // Create a source with publication and repository info
    const source: Partial<Source> = {
      id: '789012',
      type: SourceType.BOOK,
      title: 'History of Example County',
      publication: {
        publisher: 'Example Press',
        place: 'Example City',
        date: '1980',
        volume: '1',
        pages: '45-48'
      },
      repository: {
        name: 'Example County Library',
        location: 'Example City, State',
        collection: 'Local History',
        callNumber: '975.1 H673'
      },
      classification: {
        originality: Originality.AUTHORED_WORK,
        informantKnowledge: InformantKnowledge.SECONDARY,
        format: SourceFormat.TEXT,
        contemporaneity: Contemporaneity.DISTANT,
        clarity: Clarity.HIGH
      },
      reliability: {
        score: 60,
        evidenceType: [EvidenceType.INDIRECT],
        informationQuality: InformationQuality.MEDIUM
      }
    };

    // Assert the publication info is well-formed
    expect(source.publication).toBeDefined();
    expect(source.publication?.publisher).toBe('Example Press');
    expect(source.publication?.place).toBe('Example City');
    expect(source.publication?.date).toBe('1980');
    expect(source.publication?.volume).toBe('1');
    expect(source.publication?.pages).toBe('45-48');
    
    // Assert the repository info is well-formed
    expect(source.repository).toBeDefined();
    expect(source.repository?.name).toBe('Example County Library');
    expect(source.repository?.location).toBe('Example City, State');
    expect(source.repository?.collection).toBe('Local History');
    expect(source.repository?.callNumber).toBe('975.1 H673');
    
    // Check classification for authored work
    expect(source.classification?.originality).toBe(Originality.AUTHORED_WORK);
    expect(source.classification?.informantKnowledge).toBe(InformantKnowledge.SECONDARY);
  });

  it('should support digital objects in source content', () => {
    // Create a source with digital objects
    const source: Partial<Source> = {
      id: '345678',
      type: SourceType.CENSUS,
      title: '1900 US Census, Example County',
      content: {
        text: 'Transcription of census entry',
        abstract: 'John Smith, age 35, occupation: Carpenter',
        digitalObjects: [
          {
            type: 'image/jpeg',
            filename: 'census_1900_page_42.jpg',
            uri: 'http://example.com/images/census_1900_page_42.jpg',
            description: 'Image of census page 42'
          },
          {
            type: 'application/pdf',
            filename: 'census_1900_full.pdf',
            uri: 'http://example.com/pdfs/census_1900_full.pdf',
            description: 'Full PDF of census'
          }
        ]
      },
      classification: {
        originality: Originality.DERIVATIVE,
        informantKnowledge: InformantKnowledge.SECONDARY,
        format: SourceFormat.MIXED,
        contemporaneity: Contemporaneity.CONTEMPORARY,
        clarity: Clarity.MEDIUM
      },
      reliability: {
        score: 75,
        evidenceType: [EvidenceType.DIRECT, EvidenceType.INDIRECT],
        informationQuality: InformationQuality.MEDIUM
      }
    };

    // Assert the content is well-formed
    expect(source.content).toBeDefined();
    expect(source.content?.text).toBe('Transcription of census entry');
    expect(source.content?.abstract).toBe('John Smith, age 35, occupation: Carpenter');
    
    // Check digital objects
    expect(source.content?.digitalObjects).toHaveLength(2);
    expect(source.content?.digitalObjects?.[0].type).toBe('image/jpeg');
    expect(source.content?.digitalObjects?.[0].filename).toBe('census_1900_page_42.jpg');
    expect(source.content?.digitalObjects?.[1].type).toBe('application/pdf');
    
    // Check multiple evidence types
    expect(source.reliability?.evidenceType).toContain(EvidenceType.DIRECT);
    expect(source.reliability?.evidenceType).toContain(EvidenceType.INDIRECT);
  });
});