// Simple browser-compatible logger - UI structure only

interface Logger {
  debug: (_message: string, ..._meta: unknown[]) => void
  info: (_message: string, ..._meta: unknown[]) => void
  warn: (_message: string, ..._meta: unknown[]) => void
  error: (_message: string, ..._meta: unknown[]) => void
}

// Browser console logger for UI
const logger: Logger = {
  debug: (message: string, ...meta: unknown[]) => {
    console.debug(`[DEBUG] ${message}`, ...meta)
  },
  info: (message: string, ...meta: unknown[]) => {
    console.info(`[INFO] ${message}`, ...meta)
  },
  warn: (message: string, ...meta: unknown[]) => {
    console.warn(`[WARN] ${message}`, ...meta)
  },
  error: (message: string, ...meta: unknown[]) => {
    console.error(`[ERROR] ${message}`, ...meta)
  },
}

export { logger }
export default logger
