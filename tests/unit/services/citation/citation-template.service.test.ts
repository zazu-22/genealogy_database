/**
 * Unit tests for Citation Template Service
 */
import mongoose from 'mongoose';
import { 
  CitationTemplateService, 
  CitationTemplateServiceImpl 
} from '../../../../src/services/citation/citation-template.service';
import { 
  CitationFormatStyle,
  CitationTemplateCategory
} from '../../../../src/models/source/citation-template.types';
import { SourceType } from '../../../../src/models/source/types';
import { 
  mockCitationTemplateModel,
  mockCitationTemplateLibraryModel,
  mockBirthCertificateTemplate,
  mockCensusTemplate,
  mockDigitalResourceTemplate,
  mockCitationTemplateLibrary
} from '../../../mocks/citation-template.mocks';

// Mock the models
jest.mock('../../../../src/models/source/citation-template.schema', () => ({
  CitationTemplateModel: mockCitationTemplateModel,
  CitationTemplateLibraryModel: mockCitationTemplateLibraryModel
}));

describe('Citation Template Service', () => {
  let service: CitationTemplateService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new CitationTemplateServiceImpl();
  });

  describe('getTemplateById', () => {
    it('should return a template when it exists', async () => {
      const result = await service.getTemplateById('template-birth-certificate');
      
      expect(result).toEqual(mockBirthCertificateTemplate);
      expect(mockCitationTemplateModel.findOne).toHaveBeenCalledWith({ id: 'template-birth-certificate' });
    });

    it('should return null when template does not exist', async () => {
      const result = await service.getTemplateById('non-existent-template');
      
      expect(result).toBeNull();
      expect(mockCitationTemplateModel.findOne).toHaveBeenCalledWith({ id: 'non-existent-template' });
    });

    it('should handle database errors gracefully', async () => {
      const error = new Error('Database error');
      mockCitationTemplateModel.findOne.mockImplementationOnce(() => ({
        exec: jest.fn().mockRejectedValue(error)
      }));

      await expect(service.getTemplateById('template-birth-certificate'))
        .rejects.toThrow(error);
    });
  });

  describe('getTemplatesByCategory', () => {
    it('should return templates filtered by category', async () => {
      const result = await service.getTemplatesByCategory(CitationTemplateCategory.VITAL_RECORDS);
      
      expect(result).toEqual([mockBirthCertificateTemplate]);
      expect(mockCitationTemplateModel.find).toHaveBeenCalledWith({ category: CitationTemplateCategory.VITAL_RECORDS });
    });

    it('should handle empty results gracefully', async () => {
      mockCitationTemplateModel.find.mockImplementationOnce(() => ({
        exec: jest.fn().mockResolvedValue([])
      }));

      const result = await service.getTemplatesByCategory(CitationTemplateCategory.COURT_RECORDS);
      
      expect(result).toEqual([]);
      expect(mockCitationTemplateModel.find).toHaveBeenCalledWith({ category: CitationTemplateCategory.COURT_RECORDS });
    });

    it('should handle database errors gracefully', async () => {
      const error = new Error('Database error');
      mockCitationTemplateModel.find.mockImplementationOnce(() => ({
        exec: jest.fn().mockRejectedValue(error)
      }));

      await expect(service.getTemplatesByCategory(CitationTemplateCategory.VITAL_RECORDS))
        .rejects.toThrow(error);
    });
  });

  describe('getTemplatesBySourceType', () => {
    it('should return templates filtered by source type', async () => {
      const result = await service.getTemplatesBySourceType(SourceType.CENSUS);
      
      expect(result).toEqual([mockCensusTemplate]);
      expect(mockCitationTemplateModel.find).toHaveBeenCalledWith({ sourceTypes: SourceType.CENSUS });
    });
  });

  describe('searchTemplates', () => {
    it('should return templates matching search query', async () => {
      const result = await service.searchTemplates('birth');
      
      expect(result).toEqual([mockBirthCertificateTemplate]);
      expect(mockCitationTemplateModel.find).toHaveBeenCalledWith({ $text: { $search: 'birth' } });
    });
  });

  describe('createTemplate', () => {
    it('should create a new template successfully', async () => {
      const mockSave = jest.fn().mockResolvedValue(mockDigitalResourceTemplate);
      jest.spyOn(mongoose, 'model').mockImplementationOnce(() => {
        return function() {
          return { save: mockSave };
        };
      });

      mockCitationTemplateModel.findOne.mockImplementationOnce(() => ({
        exec: jest.fn().mockResolvedValue(null)
      }));

      const newTemplate = { ...mockDigitalResourceTemplate, id: 'new-template-id' };
      const result = await service.createTemplate(newTemplate);
      
      expect(mockCitationTemplateModel.findOne).toHaveBeenCalledWith({ id: 'new-template-id' });
    });

    it('should reject duplicate template IDs', async () => {
      await expect(service.createTemplate(mockBirthCertificateTemplate))
        .rejects.toThrow(`Template with ID ${mockBirthCertificateTemplate.id} already exists`);
    });
  });

  describe('updateTemplate', () => {
    it('should update an existing template', async () => {
      const templateUpdate = {
        name: 'Updated Birth Certificate Template',
        description: 'Updated description'
      };

      const result = await service.updateTemplate('template-birth-certificate', templateUpdate);
      
      expect(result).toEqual({
        ...mockBirthCertificateTemplate,
        ...templateUpdate,
        lastModified: expect.any(Object)
      });
      expect(mockCitationTemplateModel.findOneAndUpdate).toHaveBeenCalledWith(
        { id: 'template-birth-certificate' },
        {
          ...templateUpdate,
          'lastModified.date': expect.any(Date)
        },
        { new: true }
      );
    });

    it('should return null for non-existent templates', async () => {
      mockCitationTemplateModel.findOneAndUpdate.mockImplementationOnce(() => ({
        exec: jest.fn().mockResolvedValue(null)
      }));

      const result = await service.updateTemplate('non-existent-template', { name: 'Updated Name' });
      
      expect(result).toBeNull();
    });
  });

  describe('deleteTemplate', () => {
    it('should remove an existing template', async () => {
      const result = await service.deleteTemplate('template-birth-certificate');
      
      expect(result).toBe(true);
      expect(mockCitationTemplateModel.deleteOne).toHaveBeenCalledWith({ id: 'template-birth-certificate' });
    });

    it('should return false for non-existent templates', async () => {
      mockCitationTemplateModel.deleteOne.mockImplementationOnce(() => ({
        exec: jest.fn().mockResolvedValue({ deletedCount: 0 })
      }));

      const result = await service.deleteTemplate('non-existent-template');
      
      expect(result).toBe(false);
    });
  });

  describe('getLibraryById', () => {
    it('should return a library when it exists', async () => {
      const result = await service.getLibraryById('library-mills-4th-edition');
      
      expect(result).toEqual(mockCitationTemplateLibrary);
    });

    it('should return null when library does not exist', async () => {
      const result = await service.getLibraryById('non-existent-library');
      
      expect(result).toBeNull();
    });
  });

  describe('getAllLibraries', () => {
    it('should return all libraries', async () => {
      const result = await service.getAllLibraries();
      
      expect(result).toEqual([mockCitationTemplateLibrary]);
      expect(mockCitationTemplateLibraryModel.find).toHaveBeenCalled();
    });
  });

  describe('formatCitation', () => {
    it('should format a citation using a template', async () => {
      const elements = {
        recordType: 'Birth Certificate',
        name: 'John Smith',
        date: '10 May 1920',
        place: 'Madison County, New York',
        certificate: 'VR-1920-123',
        repository: 'Madison County Courthouse',
        accessed: '15 January 2023'
      };

      const result = await service.formatCitation('template-birth-certificate', elements, CitationFormatStyle.FULL);
      
      expect(result).toBe('Birth Certificate for John Smith, 10 May 1920, Madison County, New York, certificate VR-1920-123, Madison County Courthouse, accessed 15 January 2023.');
    });

    it('should handle different citation styles', async () => {
      const elements = {
        recordType: 'Birth Certificate',
        name: 'John Smith',
        date: '10 May 1920',
        place: 'Madison County, New York',
        repository: 'Madison County Courthouse'
      };

      const fullResult = await service.formatCitation('template-birth-certificate', elements, CitationFormatStyle.FULL);
      const shortResult = await service.formatCitation('template-birth-certificate', elements, CitationFormatStyle.SHORT);
      const bibResult = await service.formatCitation('template-birth-certificate', elements, CitationFormatStyle.BIBLIOGRAPHY);
      
      expect(fullResult).toBe('Birth Certificate for John Smith, 10 May 1920, Madison County, New York, certificate , Madison County Courthouse, accessed .');
      expect(shortResult).toBe('John Smith Birth Certificate (10 May 1920)');
      expect(bibResult).toBe('Madison County, New York. Birth Certificate for John Smith, 10 May 1920. Madison County Courthouse.');
    });

    it('should throw an error for missing templates', async () => {
      const elements = { name: 'John Smith' };

      await expect(service.formatCitation('non-existent-template', elements))
        .rejects.toThrow('Template non-existent-template not found');
    });

    it('should throw an error for missing required fields', async () => {
      const elements = { name: 'John Smith' }; // Missing required fields

      await expect(service.formatCitation('template-birth-certificate', elements))
        .rejects.toThrow('Missing required fields');
    });

    it('should clean up the formatted citation properly', async () => {
      const elements = {
        recordType: 'Birth Certificate',
        name: 'John Smith',
        date: '10 May 1920',
        place: 'Madison County, New York',
        repository: 'Madison County Courthouse'
        // Missing optional fields: certificate, accessed
      };

      const result = await service.formatCitation('template-birth-certificate', elements, CitationFormatStyle.FULL);
      
      // Should not have empty fields or double spaces
      expect(result).not.toContain('certificate ,');
      expect(result).not.toContain('  ');
      expect(result).toBe('Birth Certificate for John Smith, 10 May 1920, Madison County, New York, certificate, Madison County Courthouse, accessed.');
    });
  });

  describe('validateTemplateFields', () => {
    it('should validate required fields', async () => {
      const completeElements = {
        recordType: 'Birth Certificate',
        name: 'John Smith',
        date: '10 May 1920',
        place: 'Madison County, New York',
        repository: 'Madison County Courthouse'
      };

      const result = await service.validateTemplateFields('template-birth-certificate', completeElements);
      
      expect(result.valid).toBe(true);
      expect(result.missing).toEqual([]);
      expect(result.invalid).toEqual([]);
    });

    it('should identify missing required fields', async () => {
      const incompleteElements = {
        recordType: 'Birth Certificate',
        name: 'John Smith'
        // Missing: date, place, repository
      };

      const result = await service.validateTemplateFields('template-birth-certificate', incompleteElements);
      
      expect(result.valid).toBe(false);
      expect(result.missing).toContain('date');
      expect(result.missing).toContain('place');
      expect(result.missing).toContain('repository');
    });

    it('should throw an error for missing templates', async () => {
      const elements = { name: 'John Smith' };

      await expect(service.validateTemplateFields('non-existent-template', elements))
        .rejects.toThrow('Template non-existent-template not found');
    });
  });
});