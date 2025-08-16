import React from 'react'

function SimpleApp() {
  console.log('SimpleApp rendered')
  console.log('import.meta.env:', import.meta.env)
  
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>WanderFiz UI - Debug Mode</h1>
      <p>Environment Variables:</p>
      <ul>
        <li>AWS Region: {import.meta.env.VITE_AWS_REGION || 'not set'}</li>
        <li>User Pool ID: {import.meta.env.VITE_COGNITO_USER_POOL_ID || 'not set'}</li>
        <li>Client ID: {import.meta.env.VITE_COGNITO_CLIENT_ID || 'not set'}</li>
        <li>Domain: {import.meta.env.VITE_COGNITO_DOMAIN || 'not set'}</li>
      </ul>
      <button onClick={() => console.log('Button clicked!')}>Test Button</button>
    </div>
  )
}

export default SimpleApp