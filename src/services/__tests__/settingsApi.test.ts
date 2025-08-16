import { describe, it, expect, beforeEach, vi } from 'vitest'
import settingsApi from '../settingsApi'
import { tokenStorage } from '../tokenStorage'

// Mock fetch globally
global.fetch = vi.fn()

// Mock tokenStorage
vi.mock('../tokenStorage', () => ({
  tokenStorage: {
    getAccessToken: vi.fn(),
    clearTokens: vi.fn()
  }
}))

describe('settingsApi', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(tokenStorage.getAccessToken).mockReturnValue('test-jwt-token')
  })

  describe('getSettingsByCategory', () => {
    it('fetches settings by category with correct headers', async () => {
      const mockSettings = [
        { id: '1', category: 'profile', settingKey: 'name', settingValue: 'John' }
      ]
      
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockSettings
      } as Response)

      const result = await settingsApi.getSettingsByCategory('user-123', 'profile')

      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:8443/api/user/settings/user-123/profile',
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            'Authorization': 'Bearer test-jwt-token',
            'Content-Type': 'application/json'
          })
        })
      )
      expect(result).toEqual(mockSettings)
    })

    it('throws error when no access token is available', async () => {
      vi.mocked(tokenStorage.getAccessToken).mockReturnValue(null)

      await expect(
        settingsApi.getSettingsByCategory('user-123', 'profile')
      ).rejects.toThrow('No access token available')
    })

    it('handles 401 error by clearing tokens', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: false,
        status: 401,
        statusText: 'Unauthorized'
      } as Response)

      await expect(
        settingsApi.getSettingsByCategory('user-123', 'profile')
      ).rejects.toThrow('Unauthorized')

      expect(tokenStorage.clearTokens).toHaveBeenCalled()
    })
  })

  describe('createSetting', () => {
    it('creates a new setting with correct payload', async () => {
      const newSetting = {
        category: 'profile',
        subcategory: 'personal_info',
        settingKey: 'name',
        settingValue: { first: 'John', last: 'Doe' },
        dataType: 'json'
      }

      const mockResponse = { id: '123', ...newSetting }

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      } as Response)

      const result = await settingsApi.createSetting('user-123', newSetting)

      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:8443/api/user/settings/user-123',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Authorization': 'Bearer test-jwt-token',
            'Content-Type': 'application/json'
          }),
          body: JSON.stringify(newSetting)
        })
      )
      expect(result).toEqual(mockResponse)
    })

    it('handles network errors gracefully', async () => {
      vi.mocked(fetch).mockRejectedValueOnce(new Error('Network error'))

      await expect(
        settingsApi.createSetting('user-123', {
          category: 'profile',
          settingKey: 'test',
          settingValue: 'value',
          dataType: 'string'
        })
      ).rejects.toThrow('Network error')
    })
  })

  describe('updateSetting', () => {
    it('updates an existing setting', async () => {
      const updateData = {
        settingValue: { name: 'Jane Doe' }
      }

      const mockResponse = { id: '123', ...updateData }

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      } as Response)

      const result = await settingsApi.updateSetting('user-123', 'setting-123', updateData)

      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:8443/api/user/settings/user-123/setting-123',
        expect.objectContaining({
          method: 'PUT',
          headers: expect.objectContaining({
            'Authorization': 'Bearer test-jwt-token',
            'Content-Type': 'application/json'
          }),
          body: JSON.stringify(updateData)
        })
      )
      expect(result).toEqual(mockResponse)
    })
  })

  describe('deleteSetting', () => {
    it('deletes a setting', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({})
      } as Response)

      await settingsApi.deleteSetting('user-123', 'setting-123')

      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:8443/api/user/settings/user-123/setting-123',
        expect.objectContaining({
          method: 'DELETE',
          headers: expect.objectContaining({
            'Authorization': 'Bearer test-jwt-token'
          })
        })
      )
    })
  })

  describe('getAllSettings', () => {
    it('fetches all settings for a user', async () => {
      const mockSettings = [
        { id: '1', category: 'profile' },
        { id: '2', category: 'notifications' }
      ]

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockSettings
      } as Response)

      const result = await settingsApi.getAllSettings('user-123')

      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:8443/api/user/settings/user-123',
        expect.objectContaining({
          method: 'GET'
        })
      )
      expect(result).toEqual(mockSettings)
    })
  })

  describe('getSettingByKey', () => {
    it('fetches a specific setting by key', async () => {
      const mockSetting = { 
        id: '1', 
        category: 'profile', 
        settingKey: 'theme',
        settingValue: 'dark'
      }

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockSetting
      } as Response)

      const result = await settingsApi.getSettingByKey('user-123', 'profile', 'theme')

      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:8443/api/user/settings/user-123/profile/theme',
        expect.objectContaining({
          method: 'GET'
        })
      )
      expect(result).toEqual(mockSetting)
    })
  })

  describe('Error handling', () => {
    it('handles 400 Bad Request error', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: false,
        status: 400,
        statusText: 'Bad Request'
      } as Response)

      await expect(
        settingsApi.getAllSettings('user-123')
      ).rejects.toThrow('Bad Request')
    })

    it('handles 403 Forbidden error', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: false,
        status: 403,
        statusText: 'Forbidden'
      } as Response)

      await expect(
        settingsApi.getAllSettings('user-123')
      ).rejects.toThrow('Forbidden')
    })

    it('handles 404 Not Found error', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found'
      } as Response)

      await expect(
        settingsApi.getAllSettings('user-123')
      ).rejects.toThrow('Not Found')
    })

    it('handles 500 Internal Server Error', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error'
      } as Response)

      await expect(
        settingsApi.getAllSettings('user-123')
      ).rejects.toThrow('Internal Server Error')
    })
  })

  describe('Batch operations', () => {
    it('updates multiple settings in a batch', async () => {
      const batchUpdate = [
        { category: 'profile', settingKey: 'name', settingValue: 'John' },
        { category: 'profile', settingKey: 'email', settingValue: 'john@example.com' }
      ]

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => batchUpdate
      } as Response)

      const result = await settingsApi.batchUpdateSettings('user-123', batchUpdate)

      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:8443/api/user/settings/user-123/batch',
        expect.objectContaining({
          method: 'PUT',
          body: JSON.stringify(batchUpdate)
        })
      )
      expect(result).toEqual(batchUpdate)
    })
  })
})