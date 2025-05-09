/**
 * MongoDB schema for Person entity
 */
import mongoose from 'mongoose';
import { Person, NameType, GenderType } from './types';
import { ConfidenceLevel, PrivacyLevel } from '../common/types';

// Name part schema
const namePartSchema = new mongoose.Schema({
  type: { type: String, required: true },
  value: { type: String, required: true },
  qualified: { type: Boolean, default: false }
}, { _id: false });

// Name form schema
const nameFormSchema = new mongoose.Schema({
  fullText: { type: String, required: true },
  parts: [namePartSchema],
  language: String,
  script: String
}, { _id: false });

// Name schema
const nameSchema = new mongoose.Schema({
  nameType: { 
    type: String, 
    enum: Object.values(NameType),
    required: true 
  },
  nameForms: [nameFormSchema],
  preferred: { type: Boolean, default: false },
  timeframe: {
    startDate: {
      type: { type: String, required: true },
      value: { type: String, required: true },
      calendar: { type: String, required: true },
      confidence: { 
        type: String, 
        enum: Object.values(ConfidenceLevel),
        default: ConfidenceLevel.MEDIUM 
      },
      display: String
    },
    endDate: {
      type: { type: String },
      value: { type: String },
      calendar: { type: String },
      confidence: { 
        type: String, 
        enum: Object.values(ConfidenceLevel) 
      },
      display: String
    },
    ongoing: { type: Boolean, default: false }
  },
  culture: String,
  confidence: { 
    type: String, 
    enum: Object.values(ConfidenceLevel),
    default: ConfidenceLevel.MEDIUM 
  }
}, { _id: false });

// Sourced name schema
const sourcedNameSchema = new mongoose.Schema({
  value: nameSchema,
  citations: [{ type: String, ref: 'Citation' }],
  timeframe: {
    startDate: {
      type: { type: String, required: true },
      value: { type: String, required: true },
      calendar: { type: String, required: true },
      confidence: { 
        type: String, 
        enum: Object.values(ConfidenceLevel),
        default: ConfidenceLevel.MEDIUM 
      },
      display: String
    },
    endDate: {
      type: { type: String },
      value: { type: String },
      calendar: { type: String },
      confidence: { type: String, enum: Object.values(ConfidenceLevel) },
      display: String
    },
    ongoing: { type: Boolean, default: false }
  },
  confidence: { 
    type: String, 
    enum: Object.values(ConfidenceLevel),
    default: ConfidenceLevel.MEDIUM 
  },
  analysis: String,
  conflictResolution: String
}, { _id: false });

// Gender schema
const genderSchema = new mongoose.Schema({
  type: { 
    type: String, 
    enum: Object.values(GenderType),
    required: true 
  },
  citations: [{ type: String, ref: 'Citation' }],
  confidence: { 
    type: String, 
    enum: Object.values(ConfidenceLevel),
    default: ConfidenceLevel.MEDIUM 
  },
  notes: String
}, { _id: false });

// Fact schema
const factSchema = new mongoose.Schema({
  type: { type: String, required: true },
  date: {
    value: String,
    citations: [{ type: String, ref: 'Citation' }],
    timeframe: {
      startDate: {
        type: { type: String },
        value: { type: String },
        calendar: { type: String },
        confidence: { type: String, enum: Object.values(ConfidenceLevel) },
        display: String
      },
      endDate: {
        type: { type: String },
        value: { type: String },
        calendar: { type: String },
        confidence: { type: String, enum: Object.values(ConfidenceLevel) },
        display: String
      },
      ongoing: { type: Boolean, default: false }
    },
    confidence: { 
      type: String, 
      enum: Object.values(ConfidenceLevel),
      default: ConfidenceLevel.MEDIUM 
    },
    analysis: String,
    conflictResolution: String
  },
  place: {
    value: String,
    citations: [{ type: String, ref: 'Citation' }],
    timeframe: {
      startDate: {
        type: { type: String },
        value: { type: String },
        calendar: { type: String },
        confidence: { type: String, enum: Object.values(ConfidenceLevel) },
        display: String
      },
      endDate: {
        type: { type: String },
        value: { type: String },
        calendar: { type: String },
        confidence: { type: String, enum: Object.values(ConfidenceLevel) },
        display: String
      },
      ongoing: { type: Boolean, default: false }
    },
    confidence: { 
      type: String, 
      enum: Object.values(ConfidenceLevel),
      default: ConfidenceLevel.MEDIUM 
    },
    analysis: String,
    conflictResolution: String
  },
  value: String,
  qualifiers: { type: Map, of: String },
  citations: [{ type: String, ref: 'Citation' }],
  confidence: { 
    type: String, 
    enum: Object.values(ConfidenceLevel),
    default: ConfidenceLevel.MEDIUM 
  },
  primary: { type: Boolean, default: false },
  notes: String
}, { _id: false });

// Research note schema
const researchNoteSchema = new mongoose.Schema({
  text: { type: String, required: true },
  type: { type: String, required: true },
  citations: [{ type: String, ref: 'Citation' }],
  created: { type: Date, default: Date.now },
  lastModified: { type: Date, default: Date.now }
}, { _id: false });

// Person schema
const personSchema = new mongoose.Schema<Person>({
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

  // Person-specific fields
  private: { type: Boolean, default: false },
  living: { type: Boolean, default: false },
  principal: { type: Boolean, default: false },
  gender: genderSchema,
  names: { type: [sourcedNameSchema], required: true },
  facts: [factSchema],
  identifiers: { type: Map, of: String },
  notes: [researchNoteSchema],
  confidenceScore: { type: Number, min: 0, max: 100 },
  visibility: { 
    type: String, 
    enum: Object.values(PrivacyLevel),
    default: PrivacyLevel.PRIVATE 
  },
  evidenceAnalysis: {
    conflictingEvidence: { type: Boolean, default: false },
    unresolvedConflicts: { type: Boolean, default: false },
    gpsCompliant: { type: Boolean, default: false }
  }
}, {
  timestamps: true,
  collection: 'persons'
});

// Create text index for search
personSchema.index({
  'names.value.nameForms.fullText': 'text',
  'facts.value': 'text'
});

// Export the model
export const PersonModel = mongoose.model<Person & mongoose.Document>('Person', personSchema);