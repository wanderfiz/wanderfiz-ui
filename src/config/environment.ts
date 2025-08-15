interface EnvironmentConfig {
  aws: {
    region: string
    cognito: {
      userPoolId: string
      clientId: string
      domain: string
    }
  }
  api: {
    baseUrl: string
    gatewayUrl: string
    timeout: number
  }
  app: {
    name: string
    version: string
    environment: string
  }
  logging: {
    level: string
    filePath: string
    errorPath: string
  }
}

class ConfigurationError extends Error {
  constructor(message: string) {
    super(`Configuration Error: ${message}`)
    this.name = 'ConfigurationError'
  }
}

const requiredEnvVars = [
  'VITE_AWS_REGION',
  'VITE_COGNITO_USER_POOL_ID', 
  'VITE_COGNITO_CLIENT_ID',
  'VITE_COGNITO_DOMAIN',
  'VITE_API_GATEWAY_URL'
] as const

function validateEnvironmentVariable(key: string, value: string | undefined): string {
  if (!value || value.trim() === '') {
    throw new ConfigurationError(`Missing required environment variable: ${key}`)
  }
  return value.trim()
}

function getEnvVariable(key: string): string | undefined {
  // Use import.meta.env in production, process.env in tests
  if (typeof window !== 'undefined' && typeof import.meta?.env !== 'undefined') {
    return import.meta.env[key]
  }
  return process.env[key]
}

function loadEnvironmentConfig(): EnvironmentConfig {
  try {
    // In test environment, provide default values
    const isTest = process.env.NODE_ENV === 'test'
    
    if (isTest) {
      return {
        aws: {
          region: 'us-east-1',
          cognito: {
            userPoolId: 'test-pool-id',
            clientId: 'test-client-id',
            domain: 'test-domain'
          }
        },
        api: {
          baseUrl: 'http://localhost:8080/api',
          gatewayUrl: 'http://localhost:8443',
          timeout: 10000
        },
        app: {
          name: 'WanderFiz',
          version: '1.0.0',
          environment: 'test'
        },
        logging: {
          level: 'info',
          filePath: './logs/wanderfiz-ui.log',
          errorPath: './logs/wanderfiz-ui-error.log'
        }
      }
    }

    // Validate required environment variables in non-test environments
    for (const envVar of requiredEnvVars) {
      validateEnvironmentVariable(envVar, getEnvVariable(envVar))
    }

    return {
      aws: {
        region: validateEnvironmentVariable('VITE_AWS_REGION', getEnvVariable('VITE_AWS_REGION')),
        cognito: {
          userPoolId: validateEnvironmentVariable('VITE_COGNITO_USER_POOL_ID', getEnvVariable('VITE_COGNITO_USER_POOL_ID')),
          clientId: validateEnvironmentVariable('VITE_COGNITO_CLIENT_ID', getEnvVariable('VITE_COGNITO_CLIENT_ID')),
          domain: validateEnvironmentVariable('VITE_COGNITO_DOMAIN', getEnvVariable('VITE_COGNITO_DOMAIN'))
        }
      },
      api: {
        baseUrl: getEnvVariable('VITE_API_BASE_URL') || 'http://localhost:8080/api',
        gatewayUrl: validateEnvironmentVariable('VITE_API_GATEWAY_URL', getEnvVariable('VITE_API_GATEWAY_URL')),
        timeout: parseInt(getEnvVariable('VITE_API_TIMEOUT') || '10000', 10)
      },
      app: {
        name: getEnvVariable('VITE_APP_NAME') || 'WanderFiz',
        version: getEnvVariable('VITE_APP_VERSION') || '1.0.0',
        environment: getEnvVariable('VITE_ENVIRONMENT') || 'development'
      },
      logging: {
        level: getEnvVariable('VITE_LOG_LEVEL') || 'info',
        filePath: getEnvVariable('VITE_LOG_FILE_PATH') || './logs/wanderfiz-ui.log',
        errorPath: getEnvVariable('VITE_ERROR_LOG_PATH') || './logs/wanderfiz-ui-error.log'
      }
    }
  } catch (error) {
    if (error instanceof ConfigurationError) {
      console.error('❌ Configuration validation failed:', error.message)
      throw error
    }
    throw new ConfigurationError(`Failed to load configuration: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

export const config = loadEnvironmentConfig()

export type { EnvironmentConfig }
export { ConfigurationError }