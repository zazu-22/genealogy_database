/**
 * Service Factory
 * Provides factory functions for creating service instances with proper dependencies
 */

import { 
  EvidenceAnalysisService, 
  EvidenceAnalysisServiceImpl 
} from './evidence/evidence-analysis.service';

import {
  CitationTemplateService,
  CitationTemplateServiceImpl
} from './citation/citation-template.service';

import {
  CitationFormatterService,
  CitationFormatterServiceImpl
} from './citation/citation-formatter.service';

import {
  CitationIntegrationService,
  CitationIntegrationServiceImpl
} from './evidence/citation-integration.service';

/**
 * Creates an instance of the Evidence Analysis Service
 * @returns Evidence Analysis Service instance
 */
export function createEvidenceAnalysisService(): EvidenceAnalysisService {
  return new EvidenceAnalysisServiceImpl();
}

/**
 * Creates an instance of the Citation Template Service
 * @returns Citation Template Service instance
 */
export function createCitationTemplateService(): CitationTemplateService {
  return new CitationTemplateServiceImpl();
}

/**
 * Creates an instance of the Citation Formatter Service
 * @returns Citation Formatter Service instance
 */
export function createCitationFormatterService(): CitationFormatterService {
  const templateService = createCitationTemplateService();
  return new CitationFormatterServiceImpl(templateService);
}

/**
 * Creates an instance of the Citation Integration Service
 * @returns Citation Integration Service instance
 */
export function createCitationIntegrationService(): CitationIntegrationService {
  const templateService = createCitationTemplateService();
  const formatterService = createCitationFormatterService();
  const evidenceService = createEvidenceAnalysisService();
  
  return new CitationIntegrationServiceImpl(
    templateService,
    formatterService,
    evidenceService
  );
}

/**
 * Initializes all services and returns them in a service container
 * @returns Service container object
 */
export function initializeServices() {
  const evidenceAnalysisService = createEvidenceAnalysisService();
  const citationTemplateService = createCitationTemplateService();
  const citationFormatterService = createCitationFormatterService();
  const citationIntegrationService = createCitationIntegrationService();
  
  return {
    evidenceAnalysisService,
    citationTemplateService,
    citationFormatterService,
    citationIntegrationService
  };
}