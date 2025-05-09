/**
 * Source Classification Service
 * Implements classification of sources based on Elizabeth Shown Mills' evidence evaluation framework
 */

import { logger } from '../../utils/logger';
import { 
  Clarity, 
  Contemporaneity, 
  InformantKnowledge, 
  Originality 
} from '../../models/common/types';
import { 
  Source, 
  SourceClassification, 
  SourceFormat, 
  SourceType 
} from '../../models/source/types';
import { SourceClassificationService } from './types';

/**
 * Implementation of Source Classification Service
 * Evaluates sources based on professional genealogical standards
 */
export class SourceClassificationServiceImpl implements SourceClassificationService {
  constructor() {
    logger.info('Source Classification Service initialized');
  }

  /**
   * Classify a source based on its attributes
   * @param source The source to classify
   * @returns Source classification assessment
   */
  async classifySource(source: Partial<Source>): Promise<SourceClassification> {
    logger.info(`Classifying source: ${source.id || 'new source'}`);
    
    try {
      // Determine source attributes
      const originality = await this.determineOriginality(source);
      const informantKnowledge = await this.evaluateInformantKnowledge(source);
      const format = this.determineFormat(source);
      const contemporaneity = await this.assessContemporaneity(source);
      const clarity = await this.assessClarity(source);
      
      // Combine into classification
      const classification: SourceClassification = {
        originality,
        informantKnowledge,
        format,
        contemporaneity,
        clarity
      };
      
      logger.debug(`Source classification results: ${JSON.stringify(classification)}`);
      
      return classification;
    } catch (error) {
      logger.error(`Error classifying source:`, error);
      throw error;
    }
  }

  /**
   * Determine source originality
   * @param source The source to evaluate
   * @returns Originality assessment
   */
  async determineOriginality(source: Partial<Source>): Promise<Originality> {
    // Default to UNKNOWN if insufficient information
    if (!source.type) {
      return Originality.UNKNOWN;
    }
    
    // Original sources: Created at or near the time of the event
    // by someone with direct knowledge or official responsibility
    const originalSourceTypes = [
      SourceType.VITAL_RECORD,
      SourceType.CHURCH_RECORD,
      SourceType.COURT_RECORD,
      SourceType.LAND_RECORD,
      SourceType.CENSUS,
      SourceType.GRAVESTONE,
      SourceType.PERSONAL_COMMUNICATION
    ];
    
    // Derivative sources: Copied, transcribed, abstracted, or extracted from originals
    const derivativeSourceTypes = [
      SourceType.DIGITAL_RESOURCE,
      SourceType.NEWSPAPER
    ];
    
    // Authored works: Compiled, processed works that interpret information
    const authoredWorkTypes = [
      SourceType.BOOK,
      SourceType.MANUSCRIPT
    ];
    
    if (originalSourceTypes.includes(source.type)) {
      // Further refine original classification with additional context
      // For census records, check if it's a published transcription or original
      if (source.type === SourceType.CENSUS && source.publication) {
        return Originality.DERIVATIVE;
      }
      
      return Originality.ORIGINAL;
    } else if (derivativeSourceTypes.includes(source.type)) {
      return Originality.DERIVATIVE;
    } else if (authoredWorkTypes.includes(source.type)) {
      return Originality.AUTHORED_WORK;
    } else {
      return Originality.UNKNOWN;
    }
  }

  /**
   * Evaluate informant knowledge
   * @param source The source to evaluate
   * @returns Informant knowledge assessment
   */
  async evaluateInformantKnowledge(source: Partial<Source>): Promise<InformantKnowledge> {
    // If the source already has an informant knowledge assessment, use it
    if (source.classification?.informantKnowledge) {
      return source.classification.informantKnowledge;
    }

    // Default to UNDETERMINED if insufficient information
    if (!source.type) {
      return InformantKnowledge.UNDETERMINED;
    }
    
    // Primary information: Reported by an eyewitness or participant
    const primaryInformationTypes = [
      SourceType.PERSONAL_COMMUNICATION,
      SourceType.GRAVESTONE,
      SourceType.PHOTOGRAPH
    ];
    
    // Secondary information: Reported by someone without firsthand knowledge
    const secondaryInformationTypes = [
      SourceType.BOOK,
      SourceType.MANUSCRIPT,
      SourceType.DIGITAL_RESOURCE
    ];
    
    // Mixed information: Contains both primary and secondary information
    const mixedInformationTypes = [
      SourceType.NEWSPAPER,
      SourceType.CENSUS,
      SourceType.VITAL_RECORD
    ];
    
    if (primaryInformationTypes.includes(source.type)) {
      return InformantKnowledge.PRIMARY;
    } else if (secondaryInformationTypes.includes(source.type)) {
      return InformantKnowledge.SECONDARY;
    } else if (mixedInformationTypes.includes(source.type)) {
      // For mixed types, we need additional context to determine
      // For example, birth information on a death certificate is secondary
      // but death information may be primary
      if (source.type === SourceType.VITAL_RECORD) {
        // Default to MIXED for vital records without more context
        return InformantKnowledge.MIXED;
      }
      
      return InformantKnowledge.MIXED;
    } else {
      return InformantKnowledge.UNDETERMINED;
    }
  }

  /**
   * Determine source format
   * @param source The source to evaluate
   * @returns Source format assessment
   */
  private determineFormat(source: Partial<Source>): SourceFormat {
    // If the format is already specified, use it
    if (source.classification?.format) {
      return source.classification.format;
    }
    
    // Default to MIXED if insufficient information
    if (!source.type || !source.content) {
      return SourceFormat.MIXED;
    }
    
    // Infer format from digital objects if present
    if (source.content.digitalObjects && source.content.digitalObjects.length > 0) {
      const types = source.content.digitalObjects.map(obj => obj.type);
      
      if (types.every(type => type.includes('image'))) {
        return SourceFormat.IMAGE;
      } else if (types.every(type => type.includes('audio'))) {
        return SourceFormat.AUDIO;
      } else if (types.every(type => type.includes('video'))) {
        return SourceFormat.VIDEO;
      } else if (types.every(type => type.includes('text'))) {
        return SourceFormat.TEXT;
      } else {
        return SourceFormat.MIXED;
      }
    }
    
    // Infer format from source type
    switch (source.type) {
      case SourceType.BOOK:
      case SourceType.MANUSCRIPT:
      case SourceType.NEWSPAPER:
      case SourceType.VITAL_RECORD:
      case SourceType.CENSUS:
      case SourceType.COURT_RECORD:
        return SourceFormat.TEXT;
      
      case SourceType.PHOTOGRAPH:
        return SourceFormat.IMAGE;
      
      case SourceType.GRAVESTONE:
      case SourceType.ARTIFACT:
        return SourceFormat.PHYSICAL_ARTIFACT;
      
      default:
        return SourceFormat.MIXED;
    }
  }

  /**
   * Assess source contemporaneity
   * @param source The source to evaluate
   * @param eventDate Optional date of the event described
   * @returns Contemporaneity assessment
   */
  async assessContemporaneity(
    source: Partial<Source>,
    eventDate?: string
  ): Promise<Contemporaneity> {
    // If the source already has a contemporaneity assessment, use it
    if (source.classification?.contemporaneity) {
      return source.classification.contemporaneity;
    }

    // Default to UNKNOWN if insufficient information
    if (!source.publication?.date && !source.access?.accessed) {
      return Contemporaneity.UNKNOWN;
    }

    // If we have both the event date and the publication/creation date,
    // we can compare them to determine contemporaneity
    if (eventDate && source.publication?.date) {
      const event = new Date(eventDate);
      const publication = new Date(source.publication.date);

      if (isNaN(event.getTime()) || isNaN(publication.getTime())) {
        // Invalid date formats
        return Contemporaneity.UNKNOWN;
      }

      // Calculate difference in years
      const diffYears = Math.abs(publication.getTime() - event.getTime()) / (1000 * 60 * 60 * 24 * 365);

      if (diffYears <= 1) {
        return Contemporaneity.CONTEMPORARY;
      } else if (diffYears <= 10) {
        return Contemporaneity.RECENT;
      } else {
        return Contemporaneity.DISTANT;
      }
    }
    
    // Without an event date, infer from source type
    const contemporaryTypes = [
      SourceType.VITAL_RECORD,
      SourceType.CENSUS,
      SourceType.COURT_RECORD,
      SourceType.NEWSPAPER,
      SourceType.PERSONAL_COMMUNICATION
    ];
    
    const recentTypes = [
      SourceType.GRAVESTONE
    ];
    
    const distantTypes = [
      SourceType.BOOK,
      SourceType.MANUSCRIPT,
      SourceType.DIGITAL_RESOURCE
    ];
    
    if (contemporaryTypes.includes(source.type!)) {
      return Contemporaneity.CONTEMPORARY;
    } else if (recentTypes.includes(source.type!)) {
      return Contemporaneity.RECENT;
    } else if (distantTypes.includes(source.type!)) {
      return Contemporaneity.DISTANT;
    } else {
      return Contemporaneity.UNKNOWN;
    }
  }

  /**
   * Assess source clarity
   * @param source The source to evaluate
   * @returns Clarity assessment
   */
  async assessClarity(source: Partial<Source>): Promise<Clarity> {
    // If the source already has a clarity assessment, use it
    if (source.classification?.clarity) {
      return source.classification.clarity;
    }

    // If we have no content, we can't assess clarity
    if (!source.content) {
      return Clarity.MEDIUM;
    }
    
    // Infer clarity from digital objects if present
    if (source.content.digitalObjects && source.content.digitalObjects.length > 0) {
      // For now, we'll use a simple heuristic assuming most sources are medium clarity
      // In a real implementation, this could use image analysis or other techniques
      return Clarity.MEDIUM;
    }
    
    // Text content could be assessed for completeness and legibility
    if (source.content.text) {
      // Simple heuristic - if the text contains phrases indicating poor legibility
      const text = source.content.text.toLowerCase();
      if (text.includes('illegible') || text.includes('unclear') || text.includes('difficult to read')) {
        return Clarity.LOW;
      }
      
      // If there's a substantial amount of text, assume it's reasonably clear
      if (text.length > 100) {
        return Clarity.HIGH;
      }
    }
    
    // Default to medium clarity
    return Clarity.MEDIUM;
  }
}