import { 
  CognitoIdentityProviderClient, 
  SignUpCommand,
  SignUpCommandInput 
} from '@aws-sdk/client-cognito-identity-provider'

export async function directCognitoTest() {
  const client = new CognitoIdentityProviderClient({
    region: 'us-east-1'
  })
  
  const timestamp = Date.now()
  const testEmail = `test${timestamp}@example.com`
  
  const input: SignUpCommandInput = {
    ClientId: '7igae1fubblqgsdoj041n1kivi',
    Username: testEmail,
    Password: 'TestPassword123!',
    UserAttributes: [
      { Name: 'email', Value: testEmail },
      { Name: 'given_name', Value: 'Test' },
      { Name: 'family_name', Value: 'User' }
    ]
  }
  
  console.log('Test input:', JSON.stringify(input, null, 2))
  
  try {
    const command = new SignUpCommand(input)
    const response = await client.send(command)
    console.log('✅ Direct test successful!', response)
    return response
  } catch (error) {
    console.error('❌ Direct test failed:', error)
    if (error && typeof error === 'object') {
      console.error('Error details:', JSON.stringify(error, null, 2))
    }
    throw error
  }
}

// Export for browser console
if (typeof window !== 'undefined') {
  (window as Window & { directCognitoTest?: typeof directCognitoTest }).directCognitoTest = directCognitoTest
}