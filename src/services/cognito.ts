import { config } from '../config/environment'

export interface CognitoUser {
  email: string
  givenName: string
  familyName: string
  emailVerified: boolean
  sub: string
}

export interface AuthTokens {
  accessToken: string
  idToken: string
  refreshToken: string
  expiresIn: number
}

export interface SignUpData {
  email: string
  password: string
  givenName: string
  familyName: string
}

export interface AuthError {
  code: string
  message: string
  name: string
}

class CognitoService {
  private apiBaseUrl: string

  constructor() {
    this.apiBaseUrl = config.api.gatewayUrl
  }

  async signUp(userData: SignUpData): Promise<{ userSub: string; emailDeliveryDetails?: string }> {
    try {
      // Validate input data
      if (!userData.email || !userData.password || !userData.givenName || !userData.familyName) {
        throw new Error('Missing required fields')
      }
      
      const response = await fetch(`${this.apiBaseUrl}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Registration failed' }))
        throw new Error(errorData.message || `HTTP ${response.status}: Registration failed`)
      }

      const result = await response.json()
      return {
        userSub: result.userSub,
        emailDeliveryDetails: result.emailDeliveryDetails
      }
    } catch (error) {
      throw this.handleApiError(error)
    }
  }

  async confirmSignUp(email: string, confirmationCode: string): Promise<void> {
    try {
      const response = await fetch(`${this.apiBaseUrl}/api/auth/confirm?email=${encodeURIComponent(email)}&confirmationCode=${encodeURIComponent(confirmationCode)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Email confirmation failed' }))
        throw new Error(errorData.message || `HTTP ${response.status}: Email confirmation failed`)
      }
    } catch (error) {
      throw this.handleApiError(error)
    }
  }

  async signIn(email: string, password: string): Promise<AuthTokens | { challengeName: string; session: string }> {
    try {
      const response = await fetch(`${this.apiBaseUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Login failed' }))
        throw new Error(errorData.message || `HTTP ${response.status}: Login failed`)
      }

      const result = await response.json()
      return {
        accessToken: result.accessToken,
        idToken: result.idToken,
        refreshToken: result.refreshToken,
        expiresIn: result.expiresIn
      }
    } catch (error) {
      throw this.handleApiError(error)
    }
  }

  async getCurrentUser(accessToken: string): Promise<CognitoUser> {
    try {
      // For now, decode the user info from the JWT token
      // In a production app, you might want to call an API endpoint to get user details
      const payload = JSON.parse(atob(accessToken.split('.')[1]))
      
      return {
        email: payload.email || '',
        givenName: payload.given_name || '',
        familyName: payload.family_name || '',
        emailVerified: payload.email_verified === 'true' || payload.email_verified === true,
        sub: payload.sub || ''
      }
    } catch (error) {
      throw this.handleApiError(error)
    }
  }

  async globalSignOut(accessToken: string): Promise<void> {
    try {
      const response = await fetch(`${this.apiBaseUrl}/api/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Logout failed' }))
        throw new Error(errorData.message || `HTTP ${response.status}: Logout failed`)
      }
    } catch (error) {
      throw this.handleApiError(error)
    }
  }

  async resendConfirmationCode(email: string): Promise<{ destination?: string }> {
    try {
      const response = await fetch(`${this.apiBaseUrl}/api/auth/resend-confirmation?email=${encodeURIComponent(email)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Resend confirmation failed' }))
        throw new Error(errorData.message || `HTTP ${response.status}: Resend confirmation failed`)
      }

      const result = await response.json()
      return {
        destination: result.destination
      }
    } catch (error) {
      throw this.handleApiError(error)
    }
  }

  async refreshTokens(refreshToken: string): Promise<AuthTokens> {
    try {
      const response = await fetch(`${this.apiBaseUrl}/api/auth/refresh?refreshToken=${encodeURIComponent(refreshToken)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Token refresh failed' }))
        throw new Error(errorData.message || `HTTP ${response.status}: Token refresh failed`)
      }

      const result = await response.json()
      return {
        accessToken: result.accessToken,
        idToken: result.idToken,
        refreshToken: result.refreshToken,
        expiresIn: result.expiresIn
      }
    } catch (error) {
      throw this.handleApiError(error)
    }
  }

  async forgotPassword(email: string): Promise<{ destination?: string }> {
    try {
      // This would need to be implemented in the API Gateway as well
      const response = await fetch(`${this.apiBaseUrl}/api/auth/forgot-password?email=${encodeURIComponent(email)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Forgot password failed' }))
        throw new Error(errorData.message || `HTTP ${response.status}: Forgot password failed`)
      }

      const result = await response.json()
      return {
        destination: result.destination
      }
    } catch (error) {
      throw this.handleApiError(error)
    }
  }

  async confirmForgotPassword(email: string, confirmationCode: string, newPassword: string): Promise<void> {
    try {
      const response = await fetch(`${this.apiBaseUrl}/api/auth/confirm-forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          confirmationCode,
          newPassword
        })
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Password reset confirmation failed' }))
        throw new Error(errorData.message || `HTTP ${response.status}: Password reset confirmation failed`)
      }
    } catch (error) {
      throw this.handleApiError(error)
    }
  }

  private handleApiError(error: unknown): AuthError {
    const errorObj = error as { message?: string; name?: string; code?: string }
    
    let message = errorObj.message || 'An unknown error occurred'
    let code = 'UnknownError'
    
    // Try to extract error code from message if it contains known patterns
    if (message.includes('email already exists')) {
      code = 'UsernameExistsException'
    } else if (message.includes('verify your email')) {
      code = 'UserNotConfirmedException'
    } else if (message.includes('Invalid email or password')) {
      code = 'NotAuthorizedException'
    } else if (message.includes('account found')) {
      code = 'UserNotFoundException'
    } else if (message.includes('verification code')) {
      code = 'CodeMismatchException'
    } else if (message.includes('expired')) {
      code = 'ExpiredCodeException'
    } else if (message.includes('Too many')) {
      code = 'LimitExceededException'
    } else if (message.includes('Password')) {
      code = 'InvalidPasswordException'
    }

    const cognitoError: AuthError = {
      code: code,
      message: message,
      name: errorObj.name || 'ApiError'
    }

    return cognitoError
  }
}

export const cognitoService = new CognitoService()
export { CognitoService }