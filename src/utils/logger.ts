/**
 * Logger utility for consistent logging throughout the application
 */
import winston from 'winston';
import { env } from '../config/env';

/**
 * Logger levels
 */
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

/**
 * Level based on environment
 */
const level = () => {
  return env.isProduction ? 'info' : env.logging.level || 'debug';
};

/**
 * Colors for each level
 */
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'blue',
};

// Add colors to winston
winston.addColors(colors);

/**
 * Format for the logger
 */
const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} [${info.level}]: ${info.message}`
  )
);

/**
 * Transports for the logger
 */
const transports = [
  new winston.transports.Console(),
  new winston.transports.File({
    filename: 'logs/error.log',
    level: 'error',
  }),
  new winston.transports.File({ filename: 'logs/all.log' }),
];

/**
 * Create the logger
 */
export const logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
});