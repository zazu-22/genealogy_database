/**
 * Jest setup file
 * Sets up global test environment before running tests
 */

// Import test environment configuration
require('./tests/test-env');

// Increase timeout for all tests
jest.setTimeout(30000);

// Disable logging during tests unless specifically needed
jest.mock('./src/utils/logger', () => ({
  logger: {
    error: jest.fn(),
    warn: jest.fn(),
    info: jest.fn(),
    debug: jest.fn(),
    http: jest.fn()
  }
}));