import { renderHook, act } from '@testing-library/react'
import { useAuth } from '../useAuth'

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
})

describe('useAuth', () => {
  beforeEach(() => {
    localStorageMock.getItem.mockClear()
    localStorageMock.setItem.mockClear()
    localStorageMock.removeItem.mockClear()
  })

  it('initializes with no user when localStorage is empty', () => {
    localStorageMock.getItem.mockReturnValue(null)
    const { result } = renderHook(() => useAuth())
    
    expect(result.current.user).toBeNull()
    expect(result.current.isAuthenticated).toBe(false)
  })

  it('initializes with user from localStorage', () => {
    const mockUser = { id: '1', email: 'test@example.com', name: 'Test User' }
    localStorageMock.getItem.mockReturnValue(JSON.stringify(mockUser))
    
    const { result } = renderHook(() => useAuth())
    
    expect(result.current.user).toEqual(mockUser)
    expect(result.current.isAuthenticated).toBe(true)
  })

  it('handles invalid JSON in localStorage', () => {
    localStorageMock.getItem.mockReturnValue('invalid-json')
    
    const { result } = renderHook(() => useAuth())
    
    expect(result.current.user).toBeNull()
    expect(result.current.isAuthenticated).toBe(false)
  })

  it('logs in user successfully', () => {
    localStorageMock.getItem.mockReturnValue(null)
    const { result } = renderHook(() => useAuth())
    
    const userData = { email: 'test@example.com', password: 'password' }
    
    act(() => {
      result.current.login(userData)
    })
    
    expect(result.current.user).toEqual({
      id: '1',
      email: 'test@example.com',
      name: 'Demo User'
    })
    expect(result.current.isAuthenticated).toBe(true)
    expect(localStorageMock.setItem).toHaveBeenCalledWith('user', JSON.stringify({
      id: '1',
      email: 'test@example.com',
      name: 'Demo User'
    }))
  })

  it('logs out user successfully', () => {
    const mockUser = { id: '1', email: 'test@example.com', name: 'Test User' }
    localStorageMock.getItem.mockReturnValue(JSON.stringify(mockUser))
    
    const { result } = renderHook(() => useAuth())
    
    act(() => {
      result.current.logout()
    })
    
    expect(result.current.user).toBeNull()
    expect(result.current.isAuthenticated).toBe(false)
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('user')
  })

  it('registers user successfully', () => {
    localStorageMock.getItem.mockReturnValue(null)
    const { result } = renderHook(() => useAuth())
    
    const userData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'password'
    }
    
    act(() => {
      result.current.register(userData)
    })
    
    expect(result.current.user).toEqual({
      id: '1',
      email: 'john@example.com',
      name: 'John Doe'
    })
    expect(result.current.isAuthenticated).toBe(true)
    expect(localStorageMock.setItem).toHaveBeenCalledWith('user', JSON.stringify({
      id: '1',
      email: 'john@example.com',
      name: 'John Doe'
    }))
  })
})