import { api, ApiCredentials, ApiUserData } from '../api'

describe('API Service', () => {
  describe('interfaces', () => {
    it('defines correct ApiCredentials interface', () => {
      const credentials: ApiCredentials = {
        email: 'test@example.com',
        password: 'password123'
      }
      
      expect(credentials.email).toBe('test@example.com')
      expect(credentials.password).toBe('password123')
    })

    it('defines correct ApiUserData interface', () => {
      const userData: ApiUserData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'securePassword'
      }
      
      expect(userData.name).toBe('John Doe')
      expect(userData.email).toBe('john@example.com')
      expect(userData.password).toBe('securePassword')
    })
  })

  describe('auth endpoints', () => {
    it('throws error for login (not implemented)', async () => {
      const credentials: ApiCredentials = {
        email: 'test@example.com',
        password: 'password'
      }

      await expect(api.auth.login(credentials)).rejects.toThrow(
        'API service not implemented - UI structure only'
      )
    })

    it('throws error for register (not implemented)', async () => {
      const userData: ApiUserData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password'
      }

      await expect(api.auth.register(userData)).rejects.toThrow(
        'API service not implemented - UI structure only'
      )
    })

    it('throws error for logout (not implemented)', async () => {
      await expect(api.auth.logout()).rejects.toThrow(
        'API service not implemented - UI structure only'
      )
    })
  })

  describe('user endpoints', () => {
    it('throws error for getProfile (not implemented)', async () => {
      await expect(api.users.getProfile()).rejects.toThrow(
        'API service not implemented - UI structure only'
      )
    })

    it('throws error for updateProfile (not implemented)', async () => {
      const userData = { name: 'Updated Name' }

      await expect(api.users.updateProfile(userData)).rejects.toThrow(
        'API service not implemented - UI structure only'
      )
    })
  })

  describe('trip endpoints', () => {
    it('throws error for getAll (not implemented)', async () => {
      await expect(api.trips.getAll()).rejects.toThrow(
        'API service not implemented - UI structure only'
      )
    })

    it('throws error for getById (not implemented)', async () => {
      await expect(api.trips.getById('trip-id')).rejects.toThrow(
        'API service not implemented - UI structure only'
      )
    })

    it('throws error for create (not implemented)', async () => {
      const tripData = { name: 'Test Trip', destination: 'Paris' }

      await expect(api.trips.create(tripData)).rejects.toThrow(
        'API service not implemented - UI structure only'
      )
    })

    it('throws error for update (not implemented)', async () => {
      const tripData = { name: 'Updated Trip' }

      await expect(api.trips.update('trip-id', tripData)).rejects.toThrow(
        'API service not implemented - UI structure only'
      )
    })

    it('throws error for delete (not implemented)', async () => {
      await expect(api.trips.delete('trip-id')).rejects.toThrow(
        'API service not implemented - UI structure only'
      )
    })
  })

  describe('ai endpoints', () => {
    it('throws error for getRecommendations (not implemented)', async () => {
      await expect(api.ai.getRecommendations('trip-id')).rejects.toThrow(
        'API service not implemented - UI structure only'
      )
    })
  })

  describe('service structure', () => {
    it('has all expected service sections', () => {
      expect(api).toHaveProperty('auth')
      expect(api).toHaveProperty('users')
      expect(api).toHaveProperty('trips')
      expect(api).toHaveProperty('ai')
    })

    it('auth service has all expected methods', () => {
      expect(api.auth).toHaveProperty('login')
      expect(api.auth).toHaveProperty('register')
      expect(api.auth).toHaveProperty('logout')
      
      expect(typeof api.auth.login).toBe('function')
      expect(typeof api.auth.register).toBe('function')
      expect(typeof api.auth.logout).toBe('function')
    })

    it('users service has all expected methods', () => {
      expect(api.users).toHaveProperty('getProfile')
      expect(api.users).toHaveProperty('updateProfile')
      
      expect(typeof api.users.getProfile).toBe('function')
      expect(typeof api.users.updateProfile).toBe('function')
    })

    it('trips service has all expected methods', () => {
      expect(api.trips).toHaveProperty('getAll')
      expect(api.trips).toHaveProperty('getById')
      expect(api.trips).toHaveProperty('create')
      expect(api.trips).toHaveProperty('update')
      expect(api.trips).toHaveProperty('delete')
      
      expect(typeof api.trips.getAll).toBe('function')
      expect(typeof api.trips.getById).toBe('function')
      expect(typeof api.trips.create).toBe('function')
      expect(typeof api.trips.update).toBe('function')
      expect(typeof api.trips.delete).toBe('function')
    })

    it('ai service has all expected methods', () => {
      expect(api.ai).toHaveProperty('getRecommendations')
      
      expect(typeof api.ai.getRecommendations).toBe('function')
    })
  })

  describe('method signatures', () => {
    it('login accepts credentials and returns Promise<void>', async () => {
      const credentials: ApiCredentials = {
        email: 'test@example.com',
        password: 'password'
      }

      const result = api.auth.login(credentials)
      expect(result).toBeInstanceOf(Promise)
      
      await expect(result).rejects.toThrow()
    })

    it('register accepts user data and returns Promise<void>', async () => {
      const userData: ApiUserData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password'
      }

      const result = api.auth.register(userData)
      expect(result).toBeInstanceOf(Promise)
      
      await expect(result).rejects.toThrow()
    })

    it('getById accepts string ID parameter', async () => {
      const result = api.trips.getById('test-id')
      expect(result).toBeInstanceOf(Promise)
      
      await expect(result).rejects.toThrow()
    })

    it('update accepts ID and data parameters', async () => {
      const result = api.trips.update('test-id', { name: 'Updated' })
      expect(result).toBeInstanceOf(Promise)
      
      await expect(result).rejects.toThrow()
    })

    it('getRecommendations accepts trip ID parameter', async () => {
      const result = api.ai.getRecommendations('trip-id')
      expect(result).toBeInstanceOf(Promise)
      
      await expect(result).rejects.toThrow()
    })
  })

  describe('default export', () => {
    it('exports api as default export', () => {
      const defaultApi = require('../api').default
      expect(defaultApi).toBe(api)
    })
  })
})