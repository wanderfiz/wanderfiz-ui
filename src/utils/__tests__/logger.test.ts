import { logger } from '../logger'

// Mock console methods
const originalConsole = {
  debug: console.debug,
  info: console.info,
  warn: console.warn,
  error: console.error
}

const mockConsole = {
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn()
}

describe('Logger', () => {
  beforeEach(() => {
    // Mock console methods
    console.debug = mockConsole.debug
    console.info = mockConsole.info
    console.warn = mockConsole.warn
    console.error = mockConsole.error
    
    // Clear mock calls
    Object.values(mockConsole).forEach(mock => mock.mockClear())
  })

  afterAll(() => {
    // Restore original console methods
    console.debug = originalConsole.debug
    console.info = originalConsole.info
    console.warn = originalConsole.warn
    console.error = originalConsole.error
  })

  describe('logger interface', () => {
    it('has all required methods', () => {
      expect(logger).toHaveProperty('debug')
      expect(logger).toHaveProperty('info')
      expect(logger).toHaveProperty('warn')
      expect(logger).toHaveProperty('error')
      
      expect(typeof logger.debug).toBe('function')
      expect(typeof logger.info).toBe('function')
      expect(typeof logger.warn).toBe('function')
      expect(typeof logger.error).toBe('function')
    })
  })

  describe('debug method', () => {
    it('calls console.debug with formatted message', () => {
      logger.debug('Test debug message')
      
      expect(mockConsole.debug).toHaveBeenCalledTimes(1)
      expect(mockConsole.debug).toHaveBeenCalledWith('[DEBUG] Test debug message')
    })

    it('passes through additional metadata', () => {
      const metadata = { userId: 123, action: 'login' }
      logger.debug('User action', metadata, 'extra data')
      
      expect(mockConsole.debug).toHaveBeenCalledWith(
        '[DEBUG] User action',
        metadata,
        'extra data'
      )
    })

    it('handles empty message', () => {
      logger.debug('')
      
      expect(mockConsole.debug).toHaveBeenCalledWith('[DEBUG] ')
    })

    it('handles multiple metadata arguments', () => {
      logger.debug('Test', 'arg1', 'arg2', { key: 'value' }, 123)
      
      expect(mockConsole.debug).toHaveBeenCalledWith(
        '[DEBUG] Test',
        'arg1',
        'arg2',
        { key: 'value' },
        123
      )
    })
  })

  describe('info method', () => {
    it('calls console.info with formatted message', () => {
      logger.info('Test info message')
      
      expect(mockConsole.info).toHaveBeenCalledTimes(1)
      expect(mockConsole.info).toHaveBeenCalledWith('[INFO] Test info message')
    })

    it('passes through additional metadata', () => {
      const metadata = { status: 'success' }
      logger.info('Operation completed', metadata)
      
      expect(mockConsole.info).toHaveBeenCalledWith(
        '[INFO] Operation completed',
        metadata
      )
    })

    it('handles no metadata', () => {
      logger.info('Simple message')
      
      expect(mockConsole.info).toHaveBeenCalledWith('[INFO] Simple message')
    })
  })

  describe('warn method', () => {
    it('calls console.warn with formatted message', () => {
      logger.warn('Test warning message')
      
      expect(mockConsole.warn).toHaveBeenCalledTimes(1)
      expect(mockConsole.warn).toHaveBeenCalledWith('[WARN] Test warning message')
    })

    it('passes through additional metadata', () => {
      const metadata = { deprecatedFeature: 'oldAPI' }
      logger.warn('Deprecated feature used', metadata)
      
      expect(mockConsole.warn).toHaveBeenCalledWith(
        '[WARN] Deprecated feature used',
        metadata
      )
    })

    it('handles arrays and objects as metadata', () => {
      const arrayData = ['item1', 'item2']
      const objectData = { prop: 'value' }
      
      logger.warn('Complex data warning', arrayData, objectData)
      
      expect(mockConsole.warn).toHaveBeenCalledWith(
        '[WARN] Complex data warning',
        arrayData,
        objectData
      )
    })
  })

  describe('error method', () => {
    it('calls console.error with formatted message', () => {
      logger.error('Test error message')
      
      expect(mockConsole.error).toHaveBeenCalledTimes(1)
      expect(mockConsole.error).toHaveBeenCalledWith('[ERROR] Test error message')
    })

    it('passes through error objects', () => {
      const error = new Error('Something went wrong')
      logger.error('An error occurred', error)
      
      expect(mockConsole.error).toHaveBeenCalledWith(
        '[ERROR] An error occurred',
        error
      )
    })

    it('handles stack traces and error details', () => {
      const errorDetails = {
        stack: 'Error stack trace...',
        code: 'NETWORK_ERROR',
        status: 500
      }
      
      logger.error('Network request failed', errorDetails)
      
      expect(mockConsole.error).toHaveBeenCalledWith(
        '[ERROR] Network request failed',
        errorDetails
      )
    })
  })

  describe('method consistency', () => {
    it('all methods accept string message as first parameter', () => {
      const testMessage = 'Consistent test message'
      
      logger.debug(testMessage)
      logger.info(testMessage)
      logger.warn(testMessage)
      logger.error(testMessage)
      
      expect(mockConsole.debug).toHaveBeenCalledWith('[DEBUG] Consistent test message')
      expect(mockConsole.info).toHaveBeenCalledWith('[INFO] Consistent test message')
      expect(mockConsole.warn).toHaveBeenCalledWith('[WARN] Consistent test message')
      expect(mockConsole.error).toHaveBeenCalledWith('[ERROR] Consistent test message')
    })

    it('all methods handle rest parameters consistently', () => {
      const meta1 = { id: 1 }
      const meta2 = 'extra'
      
      logger.debug('Test', meta1, meta2)
      logger.info('Test', meta1, meta2)
      logger.warn('Test', meta1, meta2)
      logger.error('Test', meta1, meta2)
      
      expect(mockConsole.debug).toHaveBeenCalledWith('[DEBUG] Test', meta1, meta2)
      expect(mockConsole.info).toHaveBeenCalledWith('[INFO] Test', meta1, meta2)
      expect(mockConsole.warn).toHaveBeenCalledWith('[WARN] Test', meta1, meta2)
      expect(mockConsole.error).toHaveBeenCalledWith('[ERROR] Test', meta1, meta2)
    })
  })

  describe('message formatting', () => {
    it('properly formats log level prefix', () => {
      logger.debug('msg')
      logger.info('msg')
      logger.warn('msg')
      logger.error('msg')
      
      expect(mockConsole.debug).toHaveBeenCalledWith('[DEBUG] msg')
      expect(mockConsole.info).toHaveBeenCalledWith('[INFO] msg')
      expect(mockConsole.warn).toHaveBeenCalledWith('[WARN] msg')
      expect(mockConsole.error).toHaveBeenCalledWith('[ERROR] msg')
    })

    it('handles special characters in messages', () => {
      const specialMessage = 'Message with "quotes" and \'apostrophes\' and 🚀 emoji'
      
      logger.info(specialMessage)
      
      expect(mockConsole.info).toHaveBeenCalledWith(`[INFO] ${specialMessage}`)
    })

    it('handles multiline messages', () => {
      const multilineMessage = 'Line 1\nLine 2\nLine 3'
      
      logger.error(multilineMessage)
      
      expect(mockConsole.error).toHaveBeenCalledWith(`[ERROR] ${multilineMessage}`)
    })
  })

  describe('type safety', () => {
    it('accepts different types of metadata', () => {
      // Should not throw type errors
      logger.info('String meta', 'string')
      logger.info('Number meta', 42)
      logger.info('Boolean meta', true)
      logger.info('Object meta', { key: 'value' })
      logger.info('Array meta', [1, 2, 3])
      logger.info('Null meta', null)
      logger.info('Undefined meta', undefined)
      
      expect(mockConsole.info).toHaveBeenCalledTimes(7)
    })

    it('preserves metadata types when passing to console', () => {
      const objectMeta = { nested: { prop: 'value' } }
      const arrayMeta = [{ id: 1 }, { id: 2 }]
      
      logger.debug('Complex types', objectMeta, arrayMeta)
      
      expect(mockConsole.debug).toHaveBeenCalledWith(
        '[DEBUG] Complex types',
        objectMeta,
        arrayMeta
      )
    })
  })

  describe('default export', () => {
    it('exports logger as default export', () => {
      const defaultLogger = require('../logger').default
      expect(defaultLogger).toBe(logger)
    })

    it('named and default exports are the same', () => {
      const { logger: namedLogger } = require('../logger')
      const defaultLogger = require('../logger').default
      expect(namedLogger).toBe(defaultLogger)
    })
  })
})