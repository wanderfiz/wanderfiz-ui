import { useState, useEffect, useCallback } from 'react'
import { cognitoService, type CognitoUser, type AuthTokens, type SignUpData, type AuthError } from '../services/cognito'
import { tokenStorage } from '../services/tokenStorage'
import type { AuthUser } from '../types/user'
import { logger } from '../utils/logger'

interface AuthState {
  user: AuthUser | null
  isLoading: boolean
  isAuthenticated: boolean
  isInitialized: boolean
}

interface AuthActions {
  signUp: (userData: SignUpData) => Promise<{ userSub: string; emailDeliveryDetails?: string }>
  confirmSignUp: (email: string, confirmationCode: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  resendConfirmationCode: (email: string) => Promise<{ destination?: string }>
  refreshSession: () => Promise<void>
}

// Convert Cognito user to app user format
const mapCognitoUserToAuthUser = (cognitoUser: CognitoUser): AuthUser => ({
  id: cognitoUser.sub,
  email: cognitoUser.email,
  name: `${cognitoUser.givenName} ${cognitoUser.familyName}`.trim(),
  isAuthenticated: true
})

export const useAuth = (): AuthState & AuthActions => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
    isInitialized: false
  })

  const initializeAuth = useCallback(async () => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }))

      const tokens = tokenStorage.getTokens()
      if (!tokens) {
        setAuthState({
          user: null,
          isLoading: false,
          isAuthenticated: false,
          isInitialized: true
        })
        return
      }

      // Check if tokens are expired and refresh if needed
      if (tokenStorage.isTokenExpired()) {
        const refreshToken = tokenStorage.getRefreshToken()
        if (refreshToken) {
          try {
            const newTokens = await cognitoService.refreshTokens(refreshToken)
            tokenStorage.storeTokens(newTokens)
            
            const cognitoUser = await cognitoService.getCurrentUser(newTokens.accessToken)
            setAuthState({
              user: mapCognitoUserToAuthUser(cognitoUser),
              isLoading: false,
              isAuthenticated: true,
              isInitialized: true
            })
            return
          } catch (error) {
            logger.error('Token refresh failed:', error)
            tokenStorage.clearTokens()
          }
        }
      } else {
        // Tokens are valid, get current user
        try {
          const cognitoUser = await cognitoService.getCurrentUser(tokens.accessToken)
          setAuthState({
            user: mapCognitoUserToAuthUser(cognitoUser),
            isLoading: false,
            isAuthenticated: true,
            isInitialized: true
          })
          return
        } catch (error) {
          logger.error('Failed to get current user:', error)
          tokenStorage.clearTokens()
        }
      }

      // If we reach here, authentication failed
      setAuthState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
        isInitialized: true
      })
    } catch (error) {
      logger.error('Auth initialization failed:', error)
      setAuthState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
        isInitialized: true
      })
    }
  }, [])

  // Initialize authentication state on mount
  useEffect(() => {
    initializeAuth()
  }, [initializeAuth])

  const signUp = useCallback(async (userData: SignUpData): Promise<{ userSub: string; emailDeliveryDetails?: string }> => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }))
      const result = await cognitoService.signUp(userData)
      logger.info('User signed up successfully:', { email: userData.email })
      return result
    } catch (error) {
      logger.error('Sign up failed:', error)
      throw error
    } finally {
      setAuthState(prev => ({ ...prev, isLoading: false }))
    }
  }, [])

  const confirmSignUp = useCallback(async (email: string, confirmationCode: string): Promise<void> => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }))
      await cognitoService.confirmSignUp(email, confirmationCode)
      logger.info('Email verified successfully:', { email })
    } catch (error) {
      logger.error('Email verification failed:', error)
      throw error
    } finally {
      setAuthState(prev => ({ ...prev, isLoading: false }))
    }
  }, [])

  const signIn = useCallback(async (email: string, password: string): Promise<void> => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }))
      
      const result = await cognitoService.signIn(email, password)
      
      // Handle authentication challenges (like email verification)
      if ('challengeName' in result) {
        const error: AuthError = {
          code: result.challengeName,
          message: 'Authentication challenge required',
          name: 'AuthChallenge'
        }
        throw error
      }

      // Store tokens and get user information
      const tokens = result as AuthTokens
      tokenStorage.storeTokens(tokens)
      
      const cognitoUser = await cognitoService.getCurrentUser(tokens.accessToken)
      
      setAuthState({
        user: mapCognitoUserToAuthUser(cognitoUser),
        isLoading: false,
        isAuthenticated: true,
        isInitialized: true
      })
      
      logger.info('User signed in successfully:', { email })
    } catch (error) {
      logger.error('Sign in failed:', error)
      setAuthState(prev => ({ ...prev, isLoading: false }))
      throw error
    }
  }, [])

  const signOut = useCallback(async (): Promise<void> => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }))
      
      const accessToken = tokenStorage.getAccessToken()
      if (accessToken) {
        await cognitoService.globalSignOut(accessToken)
      }
      
      tokenStorage.clearTokens()
      
      setAuthState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
        isInitialized: true
      })
      
      logger.info('User signed out successfully')
    } catch (error) {
      logger.error('Sign out failed:', error)
      // Clear tokens anyway
      tokenStorage.clearTokens()
      setAuthState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
        isInitialized: true
      })
    }
  }, [])

  const resendConfirmationCode = useCallback(async (email: string): Promise<{ destination?: string }> => {
    try {
      const result = await cognitoService.resendConfirmationCode(email)
      logger.info('Confirmation code resent:', { email })
      return result
    } catch (error) {
      logger.error('Failed to resend confirmation code:', error)
      throw error
    }
  }, [])

  const refreshSession = useCallback(async (): Promise<void> => {
    try {
      const refreshToken = tokenStorage.getRefreshToken()
      if (!refreshToken) {
        throw new Error('No refresh token available')
      }

      const newTokens = await cognitoService.refreshTokens(refreshToken)
      tokenStorage.storeTokens(newTokens)
      
      const cognitoUser = await cognitoService.getCurrentUser(newTokens.accessToken)
      
      setAuthState(prev => ({
        ...prev,
        user: mapCognitoUserToAuthUser(cognitoUser)
      }))
      
      logger.info('Session refreshed successfully')
    } catch (error) {
      logger.error('Session refresh failed:', error)
      await signOut()
      throw error
    }
  }, [signOut])

  return {
    ...authState,
    signUp,
    confirmSignUp,
    signIn,
    signOut,
    resendConfirmationCode,
    refreshSession
  }
}

export default useAuth
