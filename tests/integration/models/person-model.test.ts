/**
 * Integration tests for Person MongoDB model
 */
import mongoose from 'mongoose';
import { 
  ConfidenceLevel, 
  GenderType, 
  NameType, 
  PrivacyLevel 
} from '../../../src/models';
import { PersonModel } from '../../../src/models/person/schema';
import { 
  connectToTestMongoDB, 
  disconnectFromTestMongoDB, 
  clearTestMongoDB 
} from '../../utils/db-handlers';

describe('Person Model Integration', () => {
  // Connect to in-memory database before all tests
  beforeAll(async () => {
    await connectToTestMongoDB();
  });
  
  // Clear all test data after each test
  afterEach(async () => {
    await clearTestMongoDB();
  });
  
  // Disconnect after all tests
  afterAll(async () => {
    await disconnectFromTestMongoDB();
  });
  
  it('should create and save a Person successfully', async () => {
    // Create a test person
    const testPerson = new PersonModel({
      id: 'test123',
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
      facts: [
        {
          type: 'Birth',
          date: {
            value: '1980-01-01',
            citations: ['citation1'],
            confidence: ConfidenceLevel.MEDIUM
          },
          place: {
            value: 'New York, NY, USA',
            citations: ['citation2'],
            confidence: ConfidenceLevel.MEDIUM
          },
          citations: ['citation1', 'citation2'],
          confidence: ConfidenceLevel.MEDIUM,
          primary: true
        }
      ],
      gender: {
        type: GenderType.MALE,
        citations: ['citation1'],
        confidence: ConfidenceLevel.HIGH
      },
      visibility: PrivacyLevel.PRIVATE,
      created: {
        date: new Date('2023-01-01'),
        user: 'testUser'
      },
      lastModified: {
        date: new Date('2023-01-01'),
        user: 'testUser'
      },
      version: 1
    });
    
    // Save the person
    const savedPerson = await testPerson.save();
    
    // Verify the saved person
    expect(savedPerson).toBeDefined();
    expect(savedPerson.id).toBe('test123');
    expect(savedPerson.names).toHaveLength(1);
    expect(savedPerson.facts).toHaveLength(1);
    expect(savedPerson.gender).toBeDefined();
    expect(savedPerson.gender.type).toBe(GenderType.MALE);
    
    // Verify we can retrieve it from the database
    const foundPerson = await PersonModel.findOne({ id: 'test123' });
    
    expect(foundPerson).toBeDefined();
    expect(foundPerson?.id).toBe('test123');
    expect(foundPerson?.names[0].value.nameForms[0].fullText).toBe('John Smith');
  });
  
  it('should validate required fields for Person', async () => {
    // Create an invalid person without required fields
    const invalidPerson = new PersonModel({
      // Missing id
      gender: {
        type: GenderType.MALE,
        citations: ['citation1'],
        confidence: ConfidenceLevel.HIGH
      },
      // Missing names (required)
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
    });
    
    // Attempt to save and expect validation error
    await expect(invalidPerson.save()).rejects.toThrow(mongoose.Error.ValidationError);
  });
  
  it('should update a Person successfully', async () => {
    // Create a test person
    const testPerson = new PersonModel({
      id: 'test456',
      names: [
        {
          value: {
            nameType: NameType.BIRTH,
            nameForms: [
              {
                fullText: 'Jane Smith',
                parts: [
                  {
                    type: 'given',
                    value: 'Jane'
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
      gender: {
        type: GenderType.FEMALE,
        citations: ['citation1'],
        confidence: ConfidenceLevel.HIGH
      },
      visibility: PrivacyLevel.PRIVATE,
      created: {
        date: new Date('2023-01-01'),
        user: 'testUser'
      },
      lastModified: {
        date: new Date('2023-01-01'),
        user: 'testUser'
      },
      version: 1
    });
    
    // Save the person
    await testPerson.save();
    
    // Update the person
    const updatedData = {
      visibility: PrivacyLevel.PUBLIC,
      lastModified: {
        date: new Date('2023-02-01'),
        user: 'updateUser'
      },
      version: 2
    };
    
    await PersonModel.updateOne({ id: 'test456' }, updatedData);
    
    // Fetch the updated person
    const updatedPerson = await PersonModel.findOne({ id: 'test456' });
    
    expect(updatedPerson).toBeDefined();
    expect(updatedPerson?.visibility).toBe(PrivacyLevel.PUBLIC);
    expect(updatedPerson?.version).toBe(2);
    expect(updatedPerson?.lastModified.user).toBe('updateUser');
  });
  
  it('should handle multiple names and facts for a Person', async () => {
    // Create a test person with multiple names and facts
    const testPerson = new PersonModel({
      id: 'test789',
      names: [
        {
          value: {
            nameType: NameType.BIRTH,
            nameForms: [
              {
                fullText: 'Robert Johnson',
                parts: [
                  { type: 'given', value: 'Robert' },
                  { type: 'surname', value: 'Johnson' }
                ]
              }
            ],
            preferred: true,
            confidence: ConfidenceLevel.HIGH
          },
          citations: ['citation1'],
          confidence: ConfidenceLevel.HIGH
        },
        {
          value: {
            nameType: NameType.NICKNAME,
            nameForms: [
              {
                fullText: 'Bob Johnson',
                parts: [
                  { type: 'given', value: 'Bob' },
                  { type: 'surname', value: 'Johnson' }
                ]
              }
            ],
            preferred: false,
            confidence: ConfidenceLevel.MEDIUM
          },
          citations: ['citation2'],
          confidence: ConfidenceLevel.MEDIUM
        }
      ],
      facts: [
        {
          type: 'Birth',
          date: {
            value: '1975-03-15',
            citations: ['citation1'],
            confidence: ConfidenceLevel.HIGH
          },
          place: {
            value: 'Chicago, IL, USA',
            citations: ['citation2'],
            confidence: ConfidenceLevel.MEDIUM
          },
          citations: ['citation1', 'citation2'],
          confidence: ConfidenceLevel.HIGH,
          primary: true
        },
        {
          type: 'Marriage',
          date: {
            value: '2000-06-10',
            citations: ['citation3'],
            confidence: ConfidenceLevel.HIGH
          },
          place: {
            value: 'Los Angeles, CA, USA',
            citations: ['citation3'],
            confidence: ConfidenceLevel.HIGH
          },
          citations: ['citation3'],
          confidence: ConfidenceLevel.HIGH,
          primary: true
        }
      ],
      gender: {
        type: GenderType.MALE,
        citations: ['citation1'],
        confidence: ConfidenceLevel.HIGH
      },
      visibility: PrivacyLevel.PRIVATE,
      created: {
        date: new Date('2023-01-01'),
        user: 'testUser'
      },
      lastModified: {
        date: new Date('2023-01-01'),
        user: 'testUser'
      },
      version: 1
    });
    
    // Save the person
    const savedPerson = await testPerson.save();
    
    // Verify the saved person
    expect(savedPerson).toBeDefined();
    expect(savedPerson.names).toHaveLength(2);
    expect(savedPerson.facts).toHaveLength(2);
    
    // Verify we can retrieve it from the database
    const foundPerson = await PersonModel.findOne({ id: 'test789' });
    
    expect(foundPerson).toBeDefined();
    expect(foundPerson?.names).toHaveLength(2);
    expect(foundPerson?.names[0].value.nameType).toBe(NameType.BIRTH);
    expect(foundPerson?.names[1].value.nameType).toBe(NameType.NICKNAME);
    
    expect(foundPerson?.facts).toHaveLength(2);
    expect(foundPerson?.facts[0].type).toBe('Birth');
    expect(foundPerson?.facts[1].type).toBe('Marriage');
  });
});