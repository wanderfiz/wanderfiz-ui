import { cognitoService } from '../services/cognito'

export async function testCognitoConnection() {
  console.log('Testing Cognito connection...')
  
  try {
    // Test with a dummy sign-up to see if we can reach Cognito
    const testEmail = `test-${Date.now()}@example.com`
    const result = await cognitoService.signUp({
      email: testEmail,
      password: 'TestPassword123!',
      givenName: 'Test',
      familyName: 'User'
    })
    console.log('✅ Cognito connection successful!', result)
    return true
  } catch (error) {
    console.error('❌ Cognito connection failed:', error)
    return false
  }
}

// Export for use in browser console
if (typeof window !== 'undefined') {
  (window as any).testCognitoConnection = testCognitoConnection
}