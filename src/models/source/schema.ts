/**
 * MongoDB schema for Source and Citation entities
 */
import mongoose from 'mongoose';
import { 
  Source, 
  SourceType, 
  SourceFormat, 
  Citation,
  CitationTemplate,
  InformationQuality
} from './types';
import { 
  Clarity, 
  CitationQuality, 
  Contemporaneity, 
  EvidenceType, 
  InformantKnowledge, 
  Originality 
} from '../common/types';

// Publication info schema
const publicationInfoSchema = new mongoose.Schema({
  publisher: String,
  place: String,
  date: String,
  volume: String,
  issue: String,
  pages: String
}, { _id: false });

// Repository info schema
const repositoryInfoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: String,
  collection: String,
  callNumber: String,
  url: String
}, { _id: false });

// Digital object schema
const digitalObjectSchema = new mongoose.Schema({
  type: { type: String, required: true },
  filename: { type: String, required: true },
  uri: { type: String, required: true },
  description: String
}, { _id: false });

// Source content schema
const sourceContentSchema = new mongoose.Schema({
  text: String,
  translation: String,
  abstract: String,
  digitalObjects: [digitalObjectSchema]
}, { _id: false });

// Access info schema
const accessInfoSchema = new mongoose.Schema({
  accessed: Date,
  restrictions: String,
  rights: String
}, { _id: false });

// Source classification schema
const sourceClassificationSchema = new mongoose.Schema({
  originality: { 
    type: String, 
    enum: Object.values(Originality),
    required: true 
  },
  informantKnowledge: { 
    type: String, 
    enum: Object.values(InformantKnowledge),
    required: true 
  },
  format: { 
    type: String, 
    enum: Object.values(SourceFormat),
    required: true 
  },
  contemporaneity: { 
    type: String, 
    enum: Object.values(Contemporaneity),
    required: true 
  },
  clarity: { 
    type: String, 
    enum: Object.values(Clarity),
    required: true 
  }
}, { _id: false });

// Source reliability schema
const sourceReliabilitySchema = new mongoose.Schema({
  score: { type: Number, min: 0, max: 100, required: true },
  evidenceType: [{ 
    type: String, 
    enum: Object.values(EvidenceType),
    required: true 
  }],
  informationQuality: { 
    type: String, 
    enum: Object.values(InformationQuality),
    required: true 
  },
  analysisNotes: String,
  conflictsWith: [String]
}, { _id: false });

// Source note schema
const sourceNoteSchema = new mongoose.Schema({
  text: { type: String, required: true },
  type: { type: String, required: true },
  created: { type: Date, default: Date.now },
  lastModified: { type: Date, default: Date.now }
}, { _id: false });

// Source schema
const sourceSchema = new mongoose.Schema<Source>({
  // Base entity fields
  id: { type: String, required: true, unique: true },
  created: {
    date: { type: Date, default: Date.now },
    user: { type: String, required: true }
  },
  lastModified: {
    date: { type: Date, default: Date.now },
    user: { type: String, required: true }
  },
  version: { type: Number, default: 1 },

  // Source-specific fields
  type: { 
    type: String, 
    enum: Object.values(SourceType),
    required: true 
  },
  title: { type: String, required: true },
  creator: [String],
  publication: publicationInfoSchema,
  repository: repositoryInfoSchema,
  classification: { type: sourceClassificationSchema, required: true },
  content: sourceContentSchema,
  access: accessInfoSchema,
  reliability: { type: sourceReliabilitySchema, required: true },
  notes: [sourceNoteSchema]
}, {
  timestamps: true,
  collection: 'sources'
});

// Citation element schema
const citationElementSchema = new mongoose.Schema({
  field: { type: String, required: true },
  value: { type: String, required: true },
  required: { type: Boolean, default: true }
}, { _id: false });

// Citation template schema
const citationTemplateSchema = new mongoose.Schema<CitationTemplate>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  sourceType: { 
    type: String, 
    enum: Object.values(SourceType),
    required: true 
  },
  elements: [citationElementSchema],
  format: { type: String, required: true },
  millsReference: String
}, {
  timestamps: true,
  collection: 'citation_templates'
});

// Citation schema
const citationSchema = new mongoose.Schema<Citation>({
  // Base entity fields
  id: { type: String, required: true, unique: true },
  created: {
    date: { type: Date, default: Date.now },
    user: { type: String, required: true }
  },
  lastModified: {
    date: { type: Date, default: Date.now },
    user: { type: String, required: true }
  },
  version: { type: Number, default: 1 },

  // Citation-specific fields
  sourceId: { type: String, required: true, ref: 'Source' },
  citationTemplate: { type: String, ref: 'CitationTemplate' },
  elements: { type: Map, of: String, required: true },
  quality: { 
    type: String, 
    enum: Object.values(CitationQuality),
    default: CitationQuality.PARTIAL 
  },
  notes: String,
  formatted: {
    fullStyle: String,
    shortStyle: String,
    bibStyle: String
  }
}, {
  timestamps: true,
  collection: 'citations'
});

// Create text indexes for search
sourceSchema.index({
  title: 'text',
  'content.text': 'text',
  'content.abstract': 'text'
});

// Export the models
export const SourceModel = mongoose.model<Source & mongoose.Document>('Source', sourceSchema);
export const CitationTemplateModel = mongoose.model<CitationTemplate & mongoose.Document>('CitationTemplate', citationTemplateSchema);
export const CitationModel = mongoose.model<Citation & mongoose.Document>('Citation', citationSchema);