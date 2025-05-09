/**
 * Unit tests for MongoDB connection
 */
import mongoose from 'mongoose';
import { connectToMongoDB, disconnectFromMongoDB } from '../../../src/config/mongodb';
import { 
  connectToTestMongoDB, 
  disconnectFromTestMongoDB 
} from '../../utils/db-handlers';

// Mock the logger
jest.mock('../../../src/utils/logger', () => ({
  logger: {
    info: jest.fn(),
    error: jest.fn(),
    debug: jest.fn(),
    warn: jest.fn()
  }
}));

describe('MongoDB Connection', () => {
  // Before all tests, connect to the in-memory database
  beforeAll(async () => {
    await connectToTestMongoDB();
  });

  // After all tests, disconnect and close the db server
  afterAll(async () => {
    await disconnectFromTestMongoDB();
  });

  it('should connect to MongoDB successfully', async () => {
    // Ensure mongoose is connected
    expect(mongoose.connection.readyState).toBe(1);
  });

  it('should handle connection errors appropriately', async () => {
    // Mock mongoose.connect to throw an error
    const originalConnect = mongoose.connect;
    mongoose.connect = jest.fn().mockRejectedValue(new Error('Connection error')) as any;

    // Attempt to connect and expect it to fail
    await expect(connectToMongoDB()).rejects.toThrow('Connection error');

    // Restore the original function
    mongoose.connect = originalConnect;
  });

  it('should disconnect from MongoDB successfully', async () => {
    // Since we're using the in-memory database for testing,
    // we need to first ensure we're connected before testing disconnection
    if (mongoose.connection.readyState !== 1) {
      await connectToTestMongoDB();
    }

    // Now we can test disconnection
    const mockDisconnect = jest.spyOn(mongoose, 'disconnect').mockResolvedValue(undefined);
    
    await disconnectFromMongoDB();
    
    expect(mockDisconnect).toHaveBeenCalled();
    mockDisconnect.mockRestore();
  });
});