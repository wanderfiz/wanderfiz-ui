import winston from 'winston'

// Configurable log paths from environment variables
const LOG_LEVEL = process.env.VITE_LOG_LEVEL || 'info'
const LOG_FILE_PATH = process.env.VITE_LOG_FILE_PATH || './logs/wanderfiz-ui.log'
const ERROR_LOG_PATH = process.env.VITE_ERROR_LOG_PATH || './logs/wanderfiz-ui-error.log'

// Create Winston logger with configurable paths
export const logger = winston.createLogger({
  level: LOG_LEVEL,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'wanderfiz-ui' },
  transports: [
    // Error logs - configurable path
    new winston.transports.File({
      filename: ERROR_LOG_PATH,
      level: 'error',
    }),
    // Combined logs - configurable path
    new winston.transports.File({
      filename: LOG_FILE_PATH,
    }),
  ],
})

// Console logging for development
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    })
  )
}

// Browser logger for production
if (typeof window !== 'undefined') {
  // Simple browser console logger
  const browserLogger = {
    error: (message: string, meta?: any) => console.error(message, meta),
    warn: (message: string, meta?: any) => console.warn(message, meta),
    info: (message: string, meta?: any) => console.info(message, meta),
    debug: (message: string, meta?: any) => console.debug(message, meta),
  }
  
  // Export browser logger for client-side use
  if (process.env.NODE_ENV === 'production') {
    Object.assign(logger, browserLogger)
  }
}

export default logger
