/**
 * Environment configuration
 */
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, '../../.env') });

/**
 * Environment configuration
 */
export const env = {
  // Node environment
  nodeEnv: process.env.NODE_ENV || 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isDevelopment: process.env.NODE_ENV === 'development',
  isTest: process.env.NODE_ENV === 'test',

  // Server configuration
  port: parseInt(process.env.PORT || '4000', 10),
  host: process.env.HOST || 'localhost',

  // Neo4j configuration
  neo4j: {
    url: process.env.NEO4J_URL || 'bolt://localhost:7687',
    username: process.env.NEO4J_USERNAME || 'neo4j',
    password: process.env.NEO4J_PASSWORD || 'password',
    database: process.env.NEO4J_DATABASE || 'genealogy',
  },

  // MongoDB configuration
  mongodb: {
    url: process.env.MONGODB_URL || 'mongodb://localhost:27017/genealogy',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },

  // JWT configuration
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key',
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  },

  // Logging configuration
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    format: process.env.LOG_FORMAT || 'dev',
  },
};