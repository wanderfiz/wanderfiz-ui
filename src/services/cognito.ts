import {
  CognitoIdentityProviderClient,
  SignUpCommand,
  ConfirmSignUpCommand,
  InitiateAuthCommand,
  GlobalSignOutCommand,
  ResendConfirmationCodeCommand,
  GetUserCommand,
  ForgotPasswordCommand,
  ConfirmForgotPasswordCommand,
  AuthFlowType
} from '@aws-sdk/client-cognito-identity-provider'
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
  private client: CognitoIdentityProviderClient
  private clientId: string

  constructor() {
    this.client = new CognitoIdentityProviderClient({
      region: config.aws.region
    })
    this.clientId = config.aws.cognito.clientId
  }

  async signUp(userData: SignUpData): Promise<{ userSub: string; emailDeliveryDetails?: string }> {
    try {
      const command = new SignUpCommand({
        ClientId: this.clientId,
        Username: userData.email,
        Password: userData.password,
        UserAttributes: [
          {
            Name: 'email',
            Value: userData.email
          },
          {
            Name: 'given_name',
            Value: userData.givenName
          },
          {
            Name: 'family_name',
            Value: userData.familyName
          }
        ]
      })

      const response = await this.client.send(command)
      return {
        userSub: response.UserSub!,
        emailDeliveryDetails: response.CodeDeliveryDetails?.Destination
      }
    } catch (error) {
      throw this.handleCognitoError(error)
    }
  }

  async confirmSignUp(email: string, confirmationCode: string): Promise<void> {
    try {
      const command = new ConfirmSignUpCommand({
        ClientId: this.clientId,
        Username: email,
        ConfirmationCode: confirmationCode
      })

      await this.client.send(command)
    } catch (error) {
      throw this.handleCognitoError(error)
    }
  }

  async signIn(email: string, password: string): Promise<AuthTokens | { challengeName: string; session: string }> {
    try {
      const command = new InitiateAuthCommand({
        AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
        ClientId: this.clientId,
        AuthParameters: {
          USERNAME: email,
          PASSWORD: password
        }
      })

      const response = await this.client.send(command)

      if (response.ChallengeName) {
        return {
          challengeName: response.ChallengeName,
          session: response.Session!
        }
      }

      if (response.AuthenticationResult) {
        return {
          accessToken: response.AuthenticationResult.AccessToken!,
          idToken: response.AuthenticationResult.IdToken!,
          refreshToken: response.AuthenticationResult.RefreshToken!,
          expiresIn: response.AuthenticationResult.ExpiresIn!
        }
      }

      throw new Error('Authentication failed - no result returned')
    } catch (error) {
      throw this.handleCognitoError(error)
    }
  }

  async getCurrentUser(accessToken: string): Promise<CognitoUser> {
    try {
      const command = new GetUserCommand({
        AccessToken: accessToken
      })

      const response = await this.client.send(command)
      
      const attributes = response.UserAttributes || []
      const getAttributeValue = (name: string) => 
        attributes.find(attr => attr.Name === name)?.Value || ''

      return {
        email: getAttributeValue('email'),
        givenName: getAttributeValue('given_name'),
        familyName: getAttributeValue('family_name'),
        emailVerified: getAttributeValue('email_verified') === 'true',
        sub: getAttributeValue('sub')
      }
    } catch (error) {
      throw this.handleCognitoError(error)
    }
  }

  async globalSignOut(accessToken: string): Promise<void> {
    try {
      const command = new GlobalSignOutCommand({
        AccessToken: accessToken
      })

      await this.client.send(command)
    } catch (error) {
      throw this.handleCognitoError(error)
    }
  }

  async resendConfirmationCode(email: string): Promise<{ destination?: string }> {
    try {
      const command = new ResendConfirmationCodeCommand({
        ClientId: this.clientId,
        Username: email
      })

      const response = await this.client.send(command)
      return {
        destination: response.CodeDeliveryDetails?.Destination
      }
    } catch (error) {
      throw this.handleCognitoError(error)
    }
  }

  async refreshTokens(refreshToken: string): Promise<AuthTokens> {
    try {
      const command = new InitiateAuthCommand({
        AuthFlow: AuthFlowType.REFRESH_TOKEN_AUTH,
        ClientId: this.clientId,
        AuthParameters: {
          REFRESH_TOKEN: refreshToken
        }
      })

      const response = await this.client.send(command)

      if (response.AuthenticationResult) {
        return {
          accessToken: response.AuthenticationResult.AccessToken!,
          idToken: response.AuthenticationResult.IdToken!,
          refreshToken: refreshToken, // Refresh token doesn't change
          expiresIn: response.AuthenticationResult.ExpiresIn!
        }
      }

      throw new Error('Token refresh failed')
    } catch (error) {
      throw this.handleCognitoError(error)
    }
  }

  async forgotPassword(email: string): Promise<{ destination?: string }> {
    try {
      const command = new ForgotPasswordCommand({
        ClientId: this.clientId,
        Username: email
      })

      const response = await this.client.send(command)
      return {
        destination: response.CodeDeliveryDetails?.Destination
      }
    } catch (error) {
      throw this.handleCognitoError(error)
    }
  }

  async confirmForgotPassword(email: string, confirmationCode: string, newPassword: string): Promise<void> {
    try {
      const command = new ConfirmForgotPasswordCommand({
        ClientId: this.clientId,
        Username: email,
        ConfirmationCode: confirmationCode,
        Password: newPassword
      })

      await this.client.send(command)
    } catch (error) {
      throw this.handleCognitoError(error)
    }
  }

  private handleCognitoError(error: unknown): AuthError {
    const errorObj = error as { name?: string; code?: string; message?: string }
    const cognitoError: AuthError = {
      code: errorObj.name || errorObj.code || 'UnknownError',
      message: errorObj.message || 'An unknown error occurred',
      name: errorObj.name || 'CognitoError'
    }

    // Map common Cognito errors to user-friendly messages
    switch (cognitoError.code) {
      case 'UserNotConfirmedException':
        cognitoError.message = 'Please verify your email address before signing in.'
        break
      case 'NotAuthorizedException':
        cognitoError.message = 'Invalid email or password.'
        break
      case 'UserNotFoundException':
        cognitoError.message = 'No account found with this email address.'
        break
      case 'CodeMismatchException':
        cognitoError.message = 'Invalid verification code. Please try again.'
        break
      case 'ExpiredCodeException':
        cognitoError.message = 'Verification code has expired. Please request a new one.'
        break
      case 'LimitExceededException':
        cognitoError.message = 'Too many attempts. Please try again later.'
        break
      case 'InvalidPasswordException':
        cognitoError.message = 'Password does not meet requirements.'
        break
      case 'UsernameExistsException':
        cognitoError.message = 'An account with this email already exists.'
        break
      default:
        // Keep the original message for unknown errors
        break
    }

    return cognitoError
  }
}

export const cognitoService = new CognitoService()
export { CognitoService }