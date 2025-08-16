import React, { useState, useEffect } from 'react'
import SettingItem, { TextInput, Textarea } from '../SettingItem'
import { useAuth } from '../../../hooks/useAuth'
import { ProfileSettings as ProfileSettingsType } from '../../../types/settings'
import settingsApi from '../../../services/settingsApi'

const ProfileSettings: React.FC = () => {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [settings, setSettings] = useState<ProfileSettingsType>({
    personalInfo: {
      name: user?.name || '',
      email: user?.email || '',
      bio: '',
      avatar: ''
    },
    contactDetails: {
      phone: ''
    },
    accountPreferences: {
      username: '',
      displayName: user?.name || ''
    }
  })

  useEffect(() => {
    if (user?.id) {
      loadProfileSettings()
    }
  }, [user?.id])

  const loadProfileSettings = async () => {
    if (!user?.id) return

    setLoading(true)
    setError(null)

    try {
      // Load profile category settings
      const profileSettings = await settingsApi.getSettingsByCategory(user.id, 'profile')
      
      // Transform API response to form state
      const transformedSettings = { ...settings }
      
      profileSettings.forEach(setting => {
        const { subcategory, settingKey, settingValue } = setting
        
        if (subcategory === 'personal_info') {
          if (settingKey === 'basic_info') {
            transformedSettings.personalInfo = {
              ...transformedSettings.personalInfo,
              ...settingValue
            }
          }
        } else if (subcategory === 'contact_details') {
          if (settingKey === 'phone_number') {
            transformedSettings.contactDetails.phone = settingValue.phone || ''
          }
        } else if (subcategory === 'account_preferences') {
          if (settingKey === 'display_settings') {
            transformedSettings.accountPreferences = {
              ...transformedSettings.accountPreferences,
              ...settingValue
            }
          }
        }
      })
      
      setSettings(transformedSettings)
    } catch (err) {
      console.error('Failed to load profile settings:', err)
      setError('Failed to load settings. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const updateSetting = async (subcategory: string, settingKey: string, value: any) => {
    if (!user?.id) return

    try {
      await settingsApi.createSetting(user.id, {
        category: 'profile',
        subcategory,
        settingKey,
        settingValue: value,
        dataType: 'json'
      })
    } catch (err) {
      console.error('Failed to update setting:', err)
      setError('Failed to save changes. Please try again.')
    }
  }

  const handlePersonalInfoChange = (field: keyof ProfileSettingsType['personalInfo'], value: string) => {
    const updatedPersonalInfo = {
      ...settings.personalInfo,
      [field]: value
    }
    
    setSettings({
      ...settings,
      personalInfo: updatedPersonalInfo
    })

    // Auto-save after a short delay
    setTimeout(() => {
      updateSetting('personal_info', 'basic_info', updatedPersonalInfo)
    }, 1000)
  }

  const handleContactDetailsChange = (field: keyof ProfileSettingsType['contactDetails'], value: string) => {
    const updatedContactDetails = {
      ...settings.contactDetails,
      [field]: value
    }
    
    setSettings({
      ...settings,
      contactDetails: updatedContactDetails
    })

    // Auto-save after a short delay
    setTimeout(() => {
      updateSetting('contact_details', 'phone_number', { phone: value })
    }, 1000)
  }

  const handleAccountPreferencesChange = (field: keyof ProfileSettingsType['accountPreferences'], value: string) => {
    const updatedAccountPreferences = {
      ...settings.accountPreferences,
      [field]: value
    }
    
    setSettings({
      ...settings,
      accountPreferences: updatedAccountPreferences
    })

    // Auto-save after a short delay
    setTimeout(() => {
      updateSetting('account_preferences', 'display_settings', updatedAccountPreferences)
    }, 1000)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF561D] mx-auto mb-2"></div>
          <p className="text-sm text-gray-600">Loading profile settings...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Personal Information */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
        <div className="space-y-4">
          <SettingItem
            label="Full Name"
            description="Your name as it appears on your profile"
          >
            <TextInput
              value={settings.personalInfo.name}
              onChange={(value) => handlePersonalInfoChange('name', value)}
              placeholder="Enter your full name"
            />
          </SettingItem>

          <SettingItem
            label="Email Address"
            description="Your primary email address for account communications"
          >
            <TextInput
              type="email"
              value={settings.personalInfo.email}
              onChange={(value) => handlePersonalInfoChange('email', value)}
              placeholder="Enter your email address"
            />
          </SettingItem>

          <SettingItem
            label="Bio"
            description="A short description about yourself and your travel interests"
          >
            <Textarea
              value={settings.personalInfo.bio || ''}
              onChange={(value) => handlePersonalInfoChange('bio', value)}
              placeholder="Tell others about your travel style and interests..."
              rows={3}
            />
          </SettingItem>
        </div>
      </div>

      {/* Contact Details */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Details</h3>
        <div className="space-y-4">
          <SettingItem
            label="Phone Number"
            description="Your phone number for emergency contact and verification"
          >
            <TextInput
              type="tel"
              value={settings.contactDetails.phone || ''}
              onChange={(value) => handleContactDetailsChange('phone', value)}
              placeholder="Enter your phone number"
            />
          </SettingItem>
        </div>
      </div>

      {/* Account Preferences */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Preferences</h3>
        <div className="space-y-4">
          <SettingItem
            label="Username"
            description="A unique identifier for your account"
          >
            <TextInput
              value={settings.accountPreferences.username || ''}
              onChange={(value) => handleAccountPreferencesChange('username', value)}
              placeholder="Choose a username"
            />
          </SettingItem>

          <SettingItem
            label="Display Name"
            description="How your name appears to other users"
          >
            <TextInput
              value={settings.accountPreferences.displayName || ''}
              onChange={(value) => handleAccountPreferencesChange('displayName', value)}
              placeholder="Choose a display name"
            />
          </SettingItem>
        </div>
      </div>

      {/* Data Export & Account Management */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Management</h3>
        <div className="space-y-4">
          <SettingItem
            label="Export Personal Data"
            description="Download a copy of all your personal data"
          >
            <button className="px-4 py-2 text-sm font-medium text-[#FF561D] bg-white border border-[#FF561D] rounded-lg hover:bg-[#FF561D]/5 transition-colors">
              Request Export
            </button>
          </SettingItem>

          <SettingItem
            label="Delete Account"
            description="Permanently delete your account and all associated data"
          >
            <button className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors">
              Delete Account
            </button>
          </SettingItem>
        </div>
      </div>
    </div>
  )
}

export default ProfileSettings