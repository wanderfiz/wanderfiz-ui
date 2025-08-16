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
  // Use import.meta.env for Vite, fallback to process.env for Jest
  if (typeof window !== 'undefined') {
    return (import.meta.env as any)[key]
  }
  return process.env[key]
}

function loadEnvironmentConfig(): EnvironmentConfig {
  try {
    // In test, development, or build environment, provide default values
    const isTest = process.env.NODE_ENV === 'test'
    const isDev = process.env.NODE_ENV === 'development'
    const isBuild = process.env.NODE_ENV === 'production' && process.env.CI
    
    if (isTest || isDev || isBuild) {
      return {
        aws: {
          region: getEnvVariable('VITE_AWS_REGION') || 'us-east-1',
          cognito: {
            userPoolId: getEnvVariable('VITE_COGNITO_USER_POOL_ID') || 'default-pool-id',
            clientId: getEnvVariable('VITE_COGNITO_CLIENT_ID') || 'default-client-id',
            domain: getEnvVariable('VITE_COGNITO_DOMAIN') || 'default-domain'
          }
        },
        api: {
          baseUrl: getEnvVariable('VITE_API_BASE_URL') || 'http://localhost:8080/api',
          gatewayUrl: getEnvVariable('VITE_API_GATEWAY_URL') || 'http://localhost:8443',
          timeout: parseInt(getEnvVariable('VITE_API_TIMEOUT') || '10000', 10)
        },
        app: {
          name: getEnvVariable('VITE_APP_NAME') || 'WanderFiz',
          version: getEnvVariable('VITE_APP_VERSION') || '1.0.0',
          environment: getEnvVariable('VITE_ENVIRONMENT') || (isTest ? 'test' : isDev ? 'development' : 'build')
        },
        logging: {
          level: getEnvVariable('VITE_LOG_LEVEL') || 'info',
          filePath: getEnvVariable('VITE_LOG_FILE_PATH') || './logs/wanderfiz-ui.log',
          errorPath: getEnvVariable('VITE_ERROR_LOG_PATH') || './logs/wanderfiz-ui-error.log'
        }
      }
    }

    // Validate required environment variables in non-test/non-build environments
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