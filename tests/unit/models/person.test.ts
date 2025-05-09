/**
 * Unit tests for Person model
 */
import { 
  ConfidenceLevel, 
  GenderType, 
  Name, 
  NameType, 
  Person, 
  PrivacyLevel 
} from '../../../src/models';

describe('Person Model', () => {
  it('should create a valid person object', () => {
    // Create a minimal Person object
    const person: Person = {
      id: '123456',
      names: [
        {
          value: {
            nameType: NameType.BIRTH,
            nameForms: [
              {
                fullText: 'John Smith',
                parts: [
                  {
                    type: 'given',
                    value: 'John'
                  },
                  {
                    type: 'surname',
                    value: 'Smith'
                  }
                ]
              }
            ],
            preferred: true,
            confidence: ConfidenceLevel.HIGH
          },
          citations: ['citation1'],
          confidence: ConfidenceLevel.HIGH
        }
      ],
      facts: [],
      gender: {
        type: GenderType.MALE,
        citations: ['citation1'],
        confidence: ConfidenceLevel.HIGH
      },
      visibility: PrivacyLevel.PRIVATE,
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
    expect(person).toBeDefined();
    expect(person.id).toBe('123456');
    expect(person.names).toHaveLength(1);
    
    // Check name details
    const name = person.names[0].value;
    expect(name.nameType).toBe(NameType.BIRTH);
    expect(name.nameForms[0].fullText).toBe('John Smith');
    expect(name.nameForms[0].parts).toHaveLength(2);
    expect(name.preferred).toBe(true);
    
    // Check gender
    expect(person.gender?.type).toBe(GenderType.MALE);
    expect(person.gender?.confidence).toBe(ConfidenceLevel.HIGH);
    
    // Check visibility
    expect(person.visibility).toBe(PrivacyLevel.PRIVATE);
  });

  it('should support multiple names with different types', () => {
    // Create a name list
    const names = [
      createSourcedName('John Smith', NameType.BIRTH, true),
      createSourcedName('Johnny Smith', NameType.NICKNAME, false),
      createSourcedName('John S.', NameType.OTHER, false)
    ];

    // Assert the names are well-formed
    expect(names).toHaveLength(3);
    expect(names[0].value.nameType).toBe(NameType.BIRTH);
    expect(names[0].value.preferred).toBe(true);
    expect(names[1].value.nameType).toBe(NameType.NICKNAME);
    expect(names[2].value.nameType).toBe(NameType.OTHER);
  });

  it('should support facts with citations', () => {
    // Create a birth fact
    const fact = {
      type: 'Birth',
      date: {
        value: '1980-01-01',
        citations: ['citation1', 'citation2'],
        confidence: ConfidenceLevel.HIGH
      },
      place: {
        value: 'New York, NY, USA',
        citations: ['citation3'],
        confidence: ConfidenceLevel.MEDIUM
      },
      citations: ['citation1', 'citation3'],
      confidence: ConfidenceLevel.HIGH,
      primary: true
    };

    // Assert the fact is well-formed
    expect(fact.type).toBe('Birth');
    expect(fact.date.value).toBe('1980-01-01');
    expect(fact.date.citations).toContain('citation1');
    expect(fact.date.citations).toContain('citation2');
    expect(fact.place.value).toBe('New York, NY, USA');
    expect(fact.confidence).toBe(ConfidenceLevel.HIGH);
    expect(fact.primary).toBe(true);
  });
});

// Helper function to create a sourced name
function createSourcedName(fullText: string, nameType: NameType, preferred: boolean) {
  const name: Name = {
    nameType,
    nameForms: [
      {
        fullText,
        parts: fullText.split(' ').map((part, index) => ({
          type: index === 0 ? 'given' : 'surname',
          value: part
        }))
      }
    ],
    preferred,
    confidence: ConfidenceLevel.HIGH
  };

  return {
    value: name,
    citations: ['citation1'],
    confidence: ConfidenceLevel.HIGH
  };
}