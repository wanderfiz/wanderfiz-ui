import { config } from '../config/environment'

export function debugConfig() {
  console.log('=== Current Configuration ===')
  console.log('AWS Region:', config.aws.region)
  console.log('User Pool ID:', config.aws.cognito.userPoolId)
  console.log('Client ID:', config.aws.cognito.clientId)
  console.log('Domain:', config.aws.cognito.domain)
  console.log('Full config:', JSON.stringify(config, null, 2))
  
  // Check if env vars are available
  console.log('=== Environment Variables ===')
  console.log('VITE_AWS_REGION:', import.meta.env.VITE_AWS_REGION)
  console.log('VITE_COGNITO_USER_POOL_ID:', import.meta.env.VITE_COGNITO_USER_POOL_ID)
  console.log('VITE_COGNITO_CLIENT_ID:', import.meta.env.VITE_COGNITO_CLIENT_ID)
  
  return config
}

// Export for browser console
if (typeof window !== 'undefined') {
  (window as Window & { debugConfig?: typeof debugConfig }).debugConfig = debugConfig
  
  // Auto-run on load
  console.log('Debug config available. Run debugConfig() in console.')
}