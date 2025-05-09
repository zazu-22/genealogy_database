/**
 * Test environment setup
 * Sets up environment variables and configurations for testing
 */
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.test file if it exists, otherwise use .env
dotenv.config({ path: path.join(__dirname, '../.env.test') });
dotenv.config({ path: path.join(__dirname, '../.env') });

// Set environment to test
process.env.NODE_ENV = 'test';

// Override database connections to use test databases
process.env.MONGODB_URL = process.env.TEST_MONGODB_URL || 'mongodb://localhost:27017/genealogy_test';
process.env.NEO4J_DATABASE = process.env.TEST_NEO4J_DATABASE || 'genealogy_test';

// Reduce logging during tests
process.env.LOG_LEVEL = process.env.TEST_LOG_LEVEL || 'error';