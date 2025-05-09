/**
 * Database handlers for testing
 * Manages connections to test databases
 */
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { getNeo4jDriver, closeNeo4jDriver } from '../../src/config/neo4j';
import { logger } from '../../src/utils/logger';

// In-memory MongoDB instance
let mongoServer: MongoMemoryServer;

/**
 * Connect to the in-memory database.
 */
export const connectToTestMongoDB = async (): Promise<void> => {
  try {
    // Use MongoDB Memory Server for tests
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    
    // Set options
    const mongooseOpts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    
    // Connect to the in-memory database
    await mongoose.connect(mongoUri);
    logger.info(`Connected to in-memory MongoDB at ${mongoUri}`);
  } catch (error) {
    logger.error('Error connecting to test MongoDB:', error);
    throw error;
  }
};

/**
 * Disconnect from the in-memory database and close the MongoDB server.
 */
export const disconnectFromTestMongoDB = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    if (mongoServer) {
      await mongoServer.stop();
    }
    logger.info('Disconnected from in-memory MongoDB');
  } catch (error) {
    logger.error('Error disconnecting from test MongoDB:', error);
    throw error;
  }
};

/**
 * Clear all collections in the in-memory database.
 */
export const clearTestMongoDB = async (): Promise<void> => {
  try {
    const collections = mongoose.connection.collections;
    
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
    
    logger.info('Cleared all collections in test MongoDB');
  } catch (error) {
    logger.error('Error clearing test MongoDB collections:', error);
    throw error;
  }
};

/**
 * Connect to a test Neo4j database.
 * Note: This assumes a Neo4j server is running with a test database.
 * For fully isolated tests, Neo4j test databases would need to be created and destroyed dynamically.
 */
export const connectToTestNeo4j = (): void => {
  try {
    // Get Neo4j driver using test configuration from environment variables
    const driver = getNeo4jDriver();
    logger.info('Connected to test Neo4j database');
    return;
  } catch (error) {
    logger.error('Error connecting to test Neo4j:', error);
    throw error;
  }
};

/**
 * Disconnect from the test Neo4j database.
 */
export const disconnectFromTestNeo4j = async (): Promise<void> => {
  try {
    await closeNeo4jDriver();
    logger.info('Disconnected from test Neo4j database');
  } catch (error) {
    logger.error('Error disconnecting from test Neo4j:', error);
    throw error;
  }
};

/**
 * Clear all data from the test Neo4j database.
 */
export const clearTestNeo4j = async (): Promise<void> => {
  try {
    const driver = getNeo4jDriver();
    const session = driver.session();
    
    try {
      // Delete all nodes and relationships
      await session.run('MATCH (n) DETACH DELETE n');
      logger.info('Cleared all data from test Neo4j database');
    } finally {
      await session.close();
    }
  } catch (error) {
    logger.error('Error clearing test Neo4j database:', error);
    throw error;
  }
};