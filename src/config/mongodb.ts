/**
 * MongoDB Configuration
 * Handles connection to MongoDB for document storage
 */
import mongoose from 'mongoose';
import { env } from './env';
import { logger } from '../utils/logger';

/**
 * Connects to MongoDB
 */
export const connectToMongoDB = async (): Promise<mongoose.Connection> => {
  try {
    logger.info('Connecting to MongoDB...');
    await mongoose.connect(env.mongodb.url);
    logger.info('Connected to MongoDB successfully.');
    return mongoose.connection;
  } catch (error) {
    logger.error('MongoDB connection error:', error);
    throw error;
  }
};

/**
 * Disconnects from MongoDB
 */
export const disconnectFromMongoDB = async (): Promise<void> => {
  try {
    logger.info('Disconnecting from MongoDB...');
    await mongoose.disconnect();
    logger.info('Disconnected from MongoDB successfully.');
  } catch (error) {
    logger.error('MongoDB disconnection error:', error);
    throw error;
  }
};