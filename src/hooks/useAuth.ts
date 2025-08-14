import { useState } from 'react'
import type { User } from '../types'

interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}

// Auth hook structure - UI only, no functional implementation
export const useAuth = (): AuthState & {
  login: (_email: string, _password: string) => Promise<void>
  logout: () => void
  register: (_userData: { name: string; email: string; password: string }) => Promise<void>
} => {
  const [authState] = useState<AuthState>({
    user: null,
    isLoading: false,
    isAuthenticated: false,
  })

  const login = async (_email: string, _password: string): Promise<void> => {
    throw new Error('Authentication not implemented - UI structure only')
  }

  const logout = (): void => {
    throw new Error('Authentication not implemented - UI structure only')
  }

  const register = async (_userData: { name: string; email: string; password: string }): Promise<void> => {
    throw new Error('Authentication not implemented - UI structure only')
  }

  return {
    ...authState,
    login,
    logout,
    register,
  }
}

export default useAuth
