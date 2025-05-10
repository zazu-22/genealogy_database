/**
 * Evidence Analysis Services
 * Exports all evidence analysis related services and types
 */

export * from './types';
export * from './evidence-analysis.service';
export * from './source-classification.service';
export * from './information-evaluation.service';
export * from './evidence-categorization.service';
export * from './gps-evaluation.service';
export * from './citation-integration.service';

// Export default service implementation
import { EvidenceAnalysisServiceImpl } from './evidence-analysis.service';
export default new EvidenceAnalysisServiceImpl();