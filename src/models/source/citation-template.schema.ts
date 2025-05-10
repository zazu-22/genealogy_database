/**
 * MongoDB schema for Citation Templates
 */
import mongoose from 'mongoose';
import { 
  CitationTemplate, 
  CitationTemplateLibrary,
  CitationFieldType,
  CitationFormatStyle,
  CitationTemplateCategory
} from './citation-template.types';
import { SourceType } from './types';

// Citation template field schema
const citationTemplateFieldSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  type: { 
    type: String, 
    enum: Object.values(CitationFieldType),
    required: true 
  },
  required: { type: Boolean, required: true },
  defaultValue: String,
  placeholder: String,
  helpText: String,
  validationPattern: String,
  maxLength: Number,
  order: { type: Number, required: true }
}, { _id: false });

// Citation format pattern schema
const citationFormatPatternSchema = new mongoose.Schema({
  style: { 
    type: String, 
    enum: Object.values(CitationFormatStyle),
    required: true 
  },
  formatString: { type: String, required: true },
  description: { type: String, required: true },
  example: { type: String, required: true }
}, { _id: false });

// Citation template schema
const citationTemplateSchema = new mongoose.Schema<CitationTemplate>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { 
    type: String, 
    enum: Object.values(CitationTemplateCategory),
    required: true 
  },
  sourceTypes: [{ 
    type: String, 
    enum: Object.values(SourceType),
    required: true 
  }],
  fields: [citationTemplateFieldSchema],
  formatPatterns: [citationFormatPatternSchema],
  millsReference: String,
  commonUsage: { type: String, required: true },
  examples: [String],
  created: {
    date: { type: Date, default: Date.now },
    user: { type: String, required: true }
  },
  lastModified: {
    date: { type: Date, default: Date.now },
    user: { type: String, required: true }
  },
  version: { type: Number, default: 1 }
}, {
  timestamps: true,
  collection: 'citation_templates'
});

// Citation template library schema
const citationTemplateLibrarySchema = new mongoose.Schema<CitationTemplateLibrary>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  version: { type: String, required: true },
  source: { type: String, required: true },
  templates: [{ type: String, ref: 'CitationTemplate' }],
  created: {
    date: { type: Date, default: Date.now },
    user: { type: String, required: true }
  },
  lastModified: {
    date: { type: Date, default: Date.now },
    user: { type: String, required: true }
  }
}, {
  timestamps: true,
  collection: 'citation_template_libraries'
});

// Create indexes for search
citationTemplateSchema.index({
  name: 'text',
  description: 'text',
  commonUsage: 'text'
});

citationTemplateLibrarySchema.index({
  name: 'text',
  description: 'text'
});

// Export the models
export const CitationTemplateModel = mongoose.model<CitationTemplate & mongoose.Document>(
  'CitationTemplate', 
  citationTemplateSchema
);

export const CitationTemplateLibraryModel = mongoose.model<CitationTemplateLibrary & mongoose.Document>(
  'CitationTemplateLibrary', 
  citationTemplateLibrarySchema
);