/**
 * Unit tests for Neo4j connection
 */
import neo4j from 'neo4j-driver';
import {
  initNeo4jDriver,
  getNeo4jDriver,
  closeNeo4jDriver,
  __resetDriverForTesting
} from '../../../src/config/neo4j';
import { env } from '../../../src/config/env';

// Mock the neo4j-driver
jest.mock('neo4j-driver');

// Mock the logger
jest.mock('../../../src/utils/logger', () => ({
  logger: {
    info: jest.fn(),
    error: jest.fn(),
    debug: jest.fn(),
    warn: jest.fn()
  }
}));

describe('Neo4j Connection', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('should initialize Neo4j driver successfully', () => {
    // Mock the driver auth
    const mockAuth = {
      basic: jest.fn().mockReturnValue('auth-result')
    };
    (neo4j.auth as any) = mockAuth;

    // Mock the driver creation
    const mockDriver = {
      getServerInfo: jest.fn().mockReturnValue({ address: 'test-server' })
    };
    (neo4j.driver as jest.Mock).mockReturnValue(mockDriver);

    // Initialize the driver
    const result = initNeo4jDriver();

    // Verify the driver was created with the correct parameters
    expect(neo4j.auth.basic).toHaveBeenCalledWith(
      env.neo4j.username,
      env.neo4j.password
    );
    expect(neo4j.driver).toHaveBeenCalledWith(
      env.neo4j.url,
      'auth-result',
      expect.any(Object)
    );
    expect(mockDriver.getServerInfo).toHaveBeenCalled();
    expect(result).toBe(mockDriver);
  });

  it('should return the existing driver if already initialized', () => {
    // Mock the driver auth
    const mockAuth = {
      basic: jest.fn().mockReturnValue('auth-result')
    };
    (neo4j.auth as any) = mockAuth;

    // Mock the driver creation
    const mockDriver = {
      getServerInfo: jest.fn().mockReturnValue({ address: 'test-server' })
    };
    (neo4j.driver as jest.Mock).mockReturnValue(mockDriver);

    // Initialize the driver first time
    const initialDriver = initNeo4jDriver();

    // Clear mocks to verify they're not called again
    jest.clearAllMocks();

    // Get the driver
    const result = getNeo4jDriver();

    // Verify the driver was not created again
    expect(neo4j.auth.basic).not.toHaveBeenCalled();
    expect(neo4j.driver).not.toHaveBeenCalled();
    expect(result).toBe(initialDriver);
  });

  it('should handle initialization errors', () => {
    // Mock the driver auth
    const mockAuth = {
      basic: jest.fn().mockReturnValue('auth-result')
    };
    (neo4j.auth as any) = mockAuth;

    // Mock the driver to throw an error
    (neo4j.driver as jest.Mock).mockImplementation(() => {
      throw new Error('Driver initialization error');
    });

    // Reset the driver variable before testing
    // @ts-ignore - Access private variable for testing
    require('../../../src/config/neo4j').__resetDriverForTesting();

    // Attempt to initialize and expect it to fail
    expect(() => initNeo4jDriver()).toThrow('Driver initialization error');
  });

  it('should close the Neo4j driver successfully', async () => {
    // Reset the driver first
    __resetDriverForTesting();

    // Mock the driver
    const mockClose = jest.fn().mockResolvedValue(undefined);
    const mockDriver = {
      getServerInfo: jest.fn().mockReturnValue({ address: 'test-server' }),
      close: mockClose
    };
    (neo4j.driver as jest.Mock).mockReturnValue(mockDriver);

    // Initialize the driver
    initNeo4jDriver();

    // Close the driver
    await closeNeo4jDriver();

    // Verify close was called
    expect(mockClose).toHaveBeenCalled();
  });

  it('should handle driver close errors', async () => {
    // Reset the driver first
    __resetDriverForTesting();

    // Mock the driver
    const mockClose = jest.fn().mockRejectedValue(new Error('Close error'));
    const mockDriver = {
      getServerInfo: jest.fn().mockReturnValue({ address: 'test-server' }),
      close: mockClose
    };
    (neo4j.driver as jest.Mock).mockReturnValue(mockDriver);

    // Initialize the driver
    initNeo4jDriver();

    // Attempt to close and expect it to fail
    await expect(closeNeo4jDriver()).rejects.toThrow('Close error');
  });
});