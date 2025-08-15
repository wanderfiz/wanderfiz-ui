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

function loadEnvironmentConfig(): EnvironmentConfig {
  try {
    // Validate required environment variables
    for (const envVar of requiredEnvVars) {
      validateEnvironmentVariable(envVar, import.meta.env[envVar])
    }

    return {
      aws: {
        region: validateEnvironmentVariable('VITE_AWS_REGION', import.meta.env.VITE_AWS_REGION),
        cognito: {
          userPoolId: validateEnvironmentVariable('VITE_COGNITO_USER_POOL_ID', import.meta.env.VITE_COGNITO_USER_POOL_ID),
          clientId: validateEnvironmentVariable('VITE_COGNITO_CLIENT_ID', import.meta.env.VITE_COGNITO_CLIENT_ID),
          domain: validateEnvironmentVariable('VITE_COGNITO_DOMAIN', import.meta.env.VITE_COGNITO_DOMAIN)
        }
      },
      api: {
        baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
        gatewayUrl: validateEnvironmentVariable('VITE_API_GATEWAY_URL', import.meta.env.VITE_API_GATEWAY_URL),
        timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '10000', 10)
      },
      app: {
        name: import.meta.env.VITE_APP_NAME || 'WanderFiz',
        version: import.meta.env.VITE_APP_VERSION || '1.0.0',
        environment: import.meta.env.VITE_ENVIRONMENT || 'development'
      },
      logging: {
        level: import.meta.env.VITE_LOG_LEVEL || 'info',
        filePath: import.meta.env.VITE_LOG_FILE_PATH || './logs/wanderfiz-ui.log',
        errorPath: import.meta.env.VITE_ERROR_LOG_PATH || './logs/wanderfiz-ui-error.log'
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