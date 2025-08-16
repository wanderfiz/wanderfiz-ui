import { tokenStorage } from './tokenStorage'
import { 
  UserSettings, 
  EmergencyContact, 
  UserMedicalInfo, 
  NotificationPreference,
  CreateUserSettingsRequest,
  UpdateUserSettingsRequest,
  CreateEmergencyContactRequest,
  UpdateEmergencyContactRequest,
  CreateMedicalInfoRequest,
  UpdateMedicalInfoRequest,
  CreateNotificationPreferenceRequest,
  UpdateNotificationPreferenceRequest
} from '../types/settings'

const API_BASE_URL = import.meta.env.VITE_API_GATEWAY_URL || 'http://localhost:8443'

class SettingsApiService {
  private async makeRequest<T>(
    endpoint: string,
    options: Partial<Request> = {}
  ): Promise<T> {
    const accessToken = tokenStorage.getAccessToken()
    
    if (!accessToken) {
      throw new Error('No access token available. Please login again.')
    }

    const url = `${API_BASE_URL}${endpoint}`
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
      ...options.headers,
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      })

      if (!response.ok) {
        if (response.status === 401) {
          // Token might be expired, redirect to login
          tokenStorage.clearTokens()
          window.location.href = '/login'
          throw new Error('Authentication required. Please login again.')
        }
        
        const errorText = await response.text()
        throw new Error(`API Error: ${response.status} - ${errorText}`)
      }

      // Handle empty responses (204 No Content)
      if (response.status === 204) {
        return {} as T
      }

      return response.json()
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error)
      throw error
    }
  }

  // User Settings API
  async getAllUserSettings(userId: string): Promise<UserSettings[]> {
    return this.makeRequest<UserSettings[]>(`/api/user/settings/${userId}`)
  }

  async getSettingsByCategory(userId: string, category: string): Promise<UserSettings[]> {
    return this.makeRequest<UserSettings[]>(`/api/user/settings/${userId}/category/${category}`)
  }

  async getSetting(userId: string, category: string, settingKey: string): Promise<UserSettings> {
    return this.makeRequest<UserSettings>(`/api/user/settings/${userId}/category/${category}/key/${settingKey}`)
  }

  async getSettingWithSubcategory(
    userId: string, 
    category: string, 
    subcategory: string, 
    settingKey: string
  ): Promise<UserSettings> {
    return this.makeRequest<UserSettings>(
      `/api/user/settings/${userId}/category/${category}/subcategory/${subcategory}/key/${settingKey}`
    )
  }

  async createSetting(userId: string, settingData: CreateUserSettingsRequest): Promise<UserSettings> {
    return this.makeRequest<UserSettings>(`/api/user/settings/${userId}`, {
      method: 'POST',
      body: JSON.stringify(settingData),
    })
  }

  async updateSetting(userId: string, settingData: UpdateUserSettingsRequest): Promise<UserSettings> {
    return this.makeRequest<UserSettings>(`/api/user/settings/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(settingData),
    })
  }

  async updateMultipleSettings(
    userId: string, 
    category: string, 
    settingsMap: Record<string, Record<string, any>>
  ): Promise<UserSettings[]> {
    return this.makeRequest<UserSettings[]>(`/api/user/settings/${userId}/category/${category}/bulk`, {
      method: 'PUT',
      body: JSON.stringify(settingsMap),
    })
  }

  async deleteSetting(userId: string, category: string, settingKey: string): Promise<void> {
    return this.makeRequest<void>(`/api/user/settings/${userId}/category/${category}/key/${settingKey}`, {
      method: 'DELETE',
    })
  }

  async deleteAllUserSettings(userId: string): Promise<void> {
    return this.makeRequest<void>(`/api/user/settings/${userId}`, {
      method: 'DELETE',
    })
  }

  async deleteCategorySettings(userId: string, category: string): Promise<void> {
    return this.makeRequest<void>(`/api/user/settings/${userId}/category/${category}`, {
      method: 'DELETE',
    })
  }

  async getUserCategories(userId: string): Promise<string[]> {
    return this.makeRequest<string[]>(`/api/user/settings/${userId}/categories`)
  }

  async resetToDefaults(userId: string): Promise<void> {
    return this.makeRequest<void>(`/api/user/settings/${userId}/reset`, {
      method: 'POST',
    })
  }

  // Emergency Contacts API
  async getAllEmergencyContacts(userId: string): Promise<EmergencyContact[]> {
    return this.makeRequest<EmergencyContact[]>(`/api/user/emergency-contacts/${userId}`)
  }

  async getEmergencyContact(userId: string, contactId: string): Promise<EmergencyContact> {
    return this.makeRequest<EmergencyContact>(`/api/user/emergency-contacts/${userId}/${contactId}`)
  }

  async createEmergencyContact(userId: string, contactData: CreateEmergencyContactRequest): Promise<EmergencyContact> {
    return this.makeRequest<EmergencyContact>(`/api/user/emergency-contacts/${userId}`, {
      method: 'POST',
      body: JSON.stringify(contactData),
    })
  }

  async updateEmergencyContact(userId: string, contactId: string, contactData: UpdateEmergencyContactRequest): Promise<EmergencyContact> {
    return this.makeRequest<EmergencyContact>(`/api/user/emergency-contacts/${userId}/${contactId}`, {
      method: 'PUT',
      body: JSON.stringify(contactData),
    })
  }

  async deleteEmergencyContact(userId: string, contactId: string): Promise<void> {
    return this.makeRequest<void>(`/api/user/emergency-contacts/${userId}/${contactId}`, {
      method: 'DELETE',
    })
  }

  async deleteAllEmergencyContacts(userId: string): Promise<void> {
    return this.makeRequest<void>(`/api/user/emergency-contacts/${userId}`, {
      method: 'DELETE',
    })
  }

  async getPrimaryEmergencyContact(userId: string): Promise<EmergencyContact> {
    return this.makeRequest<EmergencyContact>(`/api/user/emergency-contacts/${userId}/primary`)
  }

  async setPrimaryContact(userId: string, contactId: string): Promise<EmergencyContact> {
    return this.makeRequest<EmergencyContact>(`/api/user/emergency-contacts/${userId}/${contactId}/primary`, {
      method: 'PUT',
    })
  }

  // Medical Info API
  async getMedicalInfo(userId: string): Promise<UserMedicalInfo> {
    return this.makeRequest<UserMedicalInfo>(`/api/user/medical-info/${userId}`)
  }

  async createOrUpdateMedicalInfo(userId: string, medicalData: CreateMedicalInfoRequest): Promise<UserMedicalInfo> {
    return this.makeRequest<UserMedicalInfo>(`/api/user/medical-info/${userId}`, {
      method: 'POST',
      body: JSON.stringify(medicalData),
    })
  }

  async updateMedicalInfo(userId: string, medicalData: UpdateMedicalInfoRequest): Promise<UserMedicalInfo> {
    return this.makeRequest<UserMedicalInfo>(`/api/user/medical-info/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(medicalData),
    })
  }

  async updateAllergies(userId: string, allergies: string[]): Promise<UserMedicalInfo> {
    return this.makeRequest<UserMedicalInfo>(`/api/user/medical-info/${userId}/allergies`, {
      method: 'PUT',
      body: JSON.stringify(allergies),
    })
  }

  async updateMedications(userId: string, medications: Record<string, any>): Promise<UserMedicalInfo> {
    return this.makeRequest<UserMedicalInfo>(`/api/user/medical-info/${userId}/medications`, {
      method: 'PUT',
      body: JSON.stringify(medications),
    })
  }

  async updateMedicalConditions(userId: string, conditions: string[]): Promise<UserMedicalInfo> {
    return this.makeRequest<UserMedicalInfo>(`/api/user/medical-info/${userId}/conditions`, {
      method: 'PUT',
      body: JSON.stringify(conditions),
    })
  }

  async updateBloodType(userId: string, bloodType: string): Promise<UserMedicalInfo> {
    return this.makeRequest<UserMedicalInfo>(`/api/user/medical-info/${userId}/blood-type`, {
      method: 'PUT',
      body: JSON.stringify({ bloodType }),
    })
  }

  async updateInsuranceInfo(userId: string, insuranceInfo: Record<string, any>): Promise<UserMedicalInfo> {
    return this.makeRequest<UserMedicalInfo>(`/api/user/medical-info/${userId}/insurance`, {
      method: 'PUT',
      body: JSON.stringify(insuranceInfo),
    })
  }

  async deleteMedicalInfo(userId: string): Promise<void> {
    return this.makeRequest<void>(`/api/user/medical-info/${userId}`, {
      method: 'DELETE',
    })
  }

  // Notification Preferences API
  async getAllNotificationPreferences(userId: string): Promise<NotificationPreference[]> {
    return this.makeRequest<NotificationPreference[]>(`/api/user/notifications/${userId}`)
  }

  async getNotificationPreference(userId: string, notificationType: string): Promise<NotificationPreference> {
    return this.makeRequest<NotificationPreference>(`/api/user/notifications/${userId}/${notificationType}`)
  }

  async createOrUpdateNotificationPreference(
    userId: string, 
    preferenceData: CreateNotificationPreferenceRequest
  ): Promise<NotificationPreference> {
    return this.makeRequest<NotificationPreference>(`/api/user/notifications/${userId}`, {
      method: 'POST',
      body: JSON.stringify(preferenceData),
    })
  }

  async updateNotificationPreference(
    userId: string, 
    notificationType: string, 
    preferenceData: UpdateNotificationPreferenceRequest
  ): Promise<NotificationPreference> {
    return this.makeRequest<NotificationPreference>(`/api/user/notifications/${userId}/${notificationType}`, {
      method: 'PUT',
      body: JSON.stringify(preferenceData),
    })
  }

  async updateEmailPreference(userId: string, notificationType: string, enabled: boolean): Promise<NotificationPreference> {
    return this.makeRequest<NotificationPreference>(`/api/user/notifications/${userId}/${notificationType}/email`, {
      method: 'PUT',
      body: JSON.stringify({ enabled }),
    })
  }

  async updatePushPreference(userId: string, notificationType: string, enabled: boolean): Promise<NotificationPreference> {
    return this.makeRequest<NotificationPreference>(`/api/user/notifications/${userId}/${notificationType}/push`, {
      method: 'PUT',
      body: JSON.stringify({ enabled }),
    })
  }

  async updateSmsPreference(userId: string, notificationType: string, enabled: boolean): Promise<NotificationPreference> {
    return this.makeRequest<NotificationPreference>(`/api/user/notifications/${userId}/${notificationType}/sms`, {
      method: 'PUT',
      body: JSON.stringify({ enabled }),
    })
  }

  async updateFrequency(userId: string, notificationType: string, frequency: string): Promise<NotificationPreference> {
    return this.makeRequest<NotificationPreference>(`/api/user/notifications/${userId}/${notificationType}/frequency`, {
      method: 'PUT',
      body: JSON.stringify({ frequency }),
    })
  }

  async deleteNotificationPreference(userId: string, notificationType: string): Promise<void> {
    return this.makeRequest<void>(`/api/user/notifications/${userId}/${notificationType}`, {
      method: 'DELETE',
    })
  }

  async deleteAllNotificationPreferences(userId: string): Promise<void> {
    return this.makeRequest<void>(`/api/user/notifications/${userId}`, {
      method: 'DELETE',
    })
  }

  async getEmailEnabledPreferences(userId: string): Promise<NotificationPreference[]> {
    return this.makeRequest<NotificationPreference[]>(`/api/user/notifications/${userId}/email-enabled`)
  }

  async getPushEnabledPreferences(userId: string): Promise<NotificationPreference[]> {
    return this.makeRequest<NotificationPreference[]>(`/api/user/notifications/${userId}/push-enabled`)
  }

  async getSmsEnabledPreferences(userId: string): Promise<NotificationPreference[]> {
    return this.makeRequest<NotificationPreference[]>(`/api/user/notifications/${userId}/sms-enabled`)
  }

  async getConfiguredNotificationTypes(userId: string): Promise<string[]> {
    return this.makeRequest<string[]>(`/api/user/notifications/${userId}/types`)
  }

  async initializeDefaultNotificationPreferences(userId: string): Promise<void> {
    return this.makeRequest<void>(`/api/user/notifications/${userId}/initialize-defaults`, {
      method: 'POST',
    })
  }

  // Health check endpoints
  async healthCheck(): Promise<{ status: string }> {
    return this.makeRequest<{ status: string }>('/api/user/settings/health')
  }

  async emergencyContactsHealthCheck(): Promise<{ status: string }> {
    return this.makeRequest<{ status: string }>('/api/user/emergency-contacts/health')
  }

  async medicalInfoHealthCheck(): Promise<{ status: string }> {
    return this.makeRequest<{ status: string }>('/api/user/medical-info/health')
  }

  async notificationsHealthCheck(): Promise<{ status: string }> {
    return this.makeRequest<{ status: string }>('/api/user/notifications/health')
  }
}

export const settingsApi = new SettingsApiService()
export default settingsApi