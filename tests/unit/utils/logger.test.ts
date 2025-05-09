/**
 * Unit tests for logger utility
 */
import winston from 'winston';
import { env } from '../../../src/config/env';

// Backup the original environment
const originalEnv = { ...process.env };

// Mock winston
jest.mock('winston', () => {
  const mockFormat = {
    timestamp: jest.fn().mockReturnValue('timestamp-format'),
    colorize: jest.fn().mockReturnValue('colorize-format'),
    printf: jest.fn().mockReturnValue('printf-format'),
    combine: jest.fn().mockReturnValue('combined-format')
  };
  
  const mockTransports = {
    Console: jest.fn(),
    File: jest.fn()
  };
  
  return {
    format: mockFormat,
    transports: mockTransports,
    addColors: jest.fn(),
    createLogger: jest.fn().mockReturnValue({
      info: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
      debug: jest.fn(),
      http: jest.fn()
    })
  };
});

describe('Logger', () => {
  // Reset env and mocks before each test
  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });
  
  // Restore original env after all tests
  afterAll(() => {
    process.env = originalEnv;
  });
  
  it('should create a logger with default settings', () => {
    // Import the logger module (after mocks are set up)
    const { logger } = require('../../../src/utils/logger');
    
    // Verify winston.createLogger was called with correct settings
    expect(winston.createLogger).toHaveBeenCalledWith({
      level: expect.any(String),
      levels: expect.any(Object),
      format: 'combined-format',
      transports: expect.any(Array)
    });
    
    // Verify the logger has all required methods
    expect(logger).toHaveProperty('info');
    expect(logger).toHaveProperty('error');
    expect(logger).toHaveProperty('warn');
    expect(logger).toHaveProperty('debug');
    expect(logger).toHaveProperty('http');
  });
  
  it('should set info level in production environment', () => {
    // Set environment to production
    process.env.NODE_ENV = 'production';
    
    // Create mock level function
    const levelSpy = jest.spyOn(env, 'isProduction', 'get').mockReturnValue(true);
    
    // Re-import the logger module
    jest.isolateModules(() => {
      require('../../../src/utils/logger');
    });
    
    // Verify winston.createLogger was called with level 'info'
    expect(winston.createLogger).toHaveBeenCalledWith(
      expect.objectContaining({
        level: 'info'
      })
    );
    
    // Restore original environment
    levelSpy.mockRestore();
  });
  
  it('should set debug level in development environment', () => {
    // Set environment to development
    process.env.NODE_ENV = 'development';
    process.env.LOG_LEVEL = 'debug';
    
    // Create mock level function
    const levelSpy = jest.spyOn(env, 'isProduction', 'get').mockReturnValue(false);
    
    // Re-import the logger module
    jest.isolateModules(() => {
      require('../../../src/utils/logger');
    });
    
    // Verify winston.createLogger was called with level 'debug'
    expect(winston.createLogger).toHaveBeenCalledWith(
      expect.objectContaining({
        level: 'debug'
      })
    );
    
    // Restore original environment
    levelSpy.mockRestore();
  });
  
  it('should configure format with timestamp, color, and printf', () => {
    // Import the logger module
    require('../../../src/utils/logger');
    
    // Verify format configuration
    expect(winston.format.timestamp).toHaveBeenCalledWith({
      format: 'YYYY-MM-DD HH:mm:ss:ms'
    });
    
    expect(winston.format.colorize).toHaveBeenCalledWith({
      all: true
    });
    
    expect(winston.format.printf).toHaveBeenCalledWith(
      expect.any(Function)
    );
    
    expect(winston.format.combine).toHaveBeenCalledWith(
      'timestamp-format',
      'colorize-format',
      'printf-format'
    );
  });
  
  it('should configure console and file transports', () => {
    // Import the logger module
    require('../../../src/utils/logger');
    
    // Verify Console transport was created
    expect(winston.transports.Console).toHaveBeenCalled();
    
    // Verify File transports were created
    expect(winston.transports.File).toHaveBeenCalledWith({
      filename: 'logs/error.log',
      level: 'error'
    });
    
    expect(winston.transports.File).toHaveBeenCalledWith({
      filename: 'logs/all.log'
    });
  });
});