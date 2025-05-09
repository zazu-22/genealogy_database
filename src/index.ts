/**
 * Main entry point for the Genealogy Database System
 * Initializes database connections and starts the server
 */
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { env, connectToMongoDB, initNeo4jDriver, closeNeo4jDriver } from './config';
import { logger } from './utils/logger';

/**
 * Create Express application
 */
const app = express();

/**
 * Start the server
 */
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectToMongoDB();
    
    // Initialize Neo4j driver
    initNeo4jDriver();
    
    // Configure Express middleware
    app.use(express.json());
    
    // Basic health check endpoint
    app.get('/health', (req, res) => {
      res.status(200).json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: env.nodeEnv,
      });
    });
    
    // TODO: Add Apollo Server setup for GraphQL API
    // const schema = makeExecutableSchema({
    //   typeDefs,
    //   resolvers,
    // });
    // 
    // const apolloServer = new ApolloServer({
    //   schema,
    //   context: ({ req }) => {
    //     // Add authentication and context setup here
    //     return {
    //       // context objects
    //     };
    //   },
    // });
    // 
    // await apolloServer.start();
    // apolloServer.applyMiddleware({ app });
    
    // Start the server
    app.listen(env.port, () => {
      logger.info(`Server running at http://${env.host}:${env.port}`);
      logger.info(`Environment: ${env.nodeEnv}`);
    });
    
    // Handle graceful shutdown
    const shutdown = async () => {
      logger.info('Shutting down server...');
      
      // Close database connections
      await closeNeo4jDriver();
      await import('./config/mongodb').then(({ disconnectFromMongoDB }) => disconnectFromMongoDB());
      
      process.exit(0);
    };
    
    // Listen for termination signals
    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);
    
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server
startServer();