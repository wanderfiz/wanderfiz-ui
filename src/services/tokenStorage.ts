import type { AuthTokens } from './cognito'

interface StoredTokens extends AuthTokens {
  expiresAt: number
}

class TokenStorageService {
  private readonly ACCESS_TOKEN_KEY = 'wanderfiz_access_token'
  private readonly ID_TOKEN_KEY = 'wanderfiz_id_token'
  private readonly REFRESH_TOKEN_KEY = 'wanderfiz_refresh_token'
  private readonly EXPIRES_AT_KEY = 'wanderfiz_expires_at'

  storeTokens(tokens: AuthTokens): void {
    try {
      const expiresAt = Date.now() + (tokens.expiresIn * 1000)
      
      // Store tokens in memory/sessionStorage for security
      // Access and ID tokens in sessionStorage (cleared on tab close)
      sessionStorage.setItem(this.ACCESS_TOKEN_KEY, tokens.accessToken)
      sessionStorage.setItem(this.ID_TOKEN_KEY, tokens.idToken)
      sessionStorage.setItem(this.EXPIRES_AT_KEY, expiresAt.toString())
      
      // Refresh token in localStorage for persistence across sessions
      // In production, consider httpOnly cookies for enhanced security
      localStorage.setItem(this.REFRESH_TOKEN_KEY, tokens.refreshToken)
    } catch {
      // Ignore storage errors
    }
  }

  getTokens(): StoredTokens | null {
    try {
      const accessToken = sessionStorage.getItem(this.ACCESS_TOKEN_KEY)
      const idToken = sessionStorage.getItem(this.ID_TOKEN_KEY)
      const refreshToken = localStorage.getItem(this.REFRESH_TOKEN_KEY)
      const expiresAt = sessionStorage.getItem(this.EXPIRES_AT_KEY)

      if (!accessToken || !idToken || !refreshToken || !expiresAt) {
        return null
      }

      return {
        accessToken,
        idToken,
        refreshToken,
        expiresIn: Math.max(0, Math.floor((parseInt(expiresAt) - Date.now()) / 1000)),
        expiresAt: parseInt(expiresAt)
      }
    } catch {
      return null
    }
  }

  getAccessToken(): string | null {
    try {
      return sessionStorage.getItem(this.ACCESS_TOKEN_KEY)
    } catch {
      return null
    }
  }

  getRefreshToken(): string | null {
    try {
      return localStorage.getItem(this.REFRESH_TOKEN_KEY)
    } catch {
      return null
    }
  }

  clearTokens(): void {
    try {
      sessionStorage.removeItem(this.ACCESS_TOKEN_KEY)
      sessionStorage.removeItem(this.ID_TOKEN_KEY)
      sessionStorage.removeItem(this.EXPIRES_AT_KEY)
      localStorage.removeItem(this.REFRESH_TOKEN_KEY)
    } catch {
      // Ignore storage errors
    }
  }

  isTokenExpired(): boolean {
    try {
      const expiresAt = sessionStorage.getItem(this.EXPIRES_AT_KEY)
      if (!expiresAt) return true
      
      // Add 5 minute buffer for token refresh
      return Date.now() >= (parseInt(expiresAt) - 5 * 60 * 1000)
    } catch {
      return true
    }
  }

  hasValidTokens(): boolean {
    const tokens = this.getTokens()
    return tokens !== null && !this.isTokenExpired()
  }
}

export const tokenStorage = new TokenStorageService()
export { TokenStorageService }