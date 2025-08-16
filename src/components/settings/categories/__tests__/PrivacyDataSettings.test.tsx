import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import PrivacyDataSettings from '../PrivacyDataSettings'
import { AuthProvider } from '../../../../contexts/AuthContext'
import settingsApi from '../../../../services/settingsApi'
import { vi } from 'vitest'

// Mock the settings API
vi.mock('../../../../services/settingsApi', () => ({
  default: {
    getSettingsByCategory: vi.fn(),
    createSetting: vi.fn(),
    updateSetting: vi.fn(),
    deleteSetting: vi.fn(),
  }
}))

// Mock the auth hook
vi.mock('../../../../hooks/useAuth', () => ({
  useAuth: () => ({
    user: {
      id: 'test-user-123',
      name: 'Test User',
      email: 'test@example.com'
    },
    isAuthenticated: true
  })
}))

const renderPrivacyDataSettings = () => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <PrivacyDataSettings />
      </AuthProvider>
    </BrowserRouter>
  )
}

describe('PrivacyDataSettings', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(settingsApi.getSettingsByCategory).mockResolvedValue([])
  })

  it('renders all privacy and data setting sections', () => {
    renderPrivacyDataSettings()
    
    expect(screen.getByText('Profile Visibility')).toBeInTheDocument()
    expect(screen.getByText('Location Sharing')).toBeInTheDocument()
    expect(screen.getByText('Data Collection Preferences')).toBeInTheDocument()
    expect(screen.getByText('Third-Party Sharing')).toBeInTheDocument()
    expect(screen.getByText('AI Training Consent')).toBeInTheDocument()
    expect(screen.getByText('Marketing Communications')).toBeInTheDocument()
  })

  it('loads privacy settings on mount', async () => {
    const mockSettings = [
      {
        id: '1',
        userId: 'test-user-123',
        category: 'privacy_data',
        subcategory: 'profile_visibility',
        settingKey: 'visibility_level',
        settingValue: { level: 'friends' },
        dataType: 'json',
        isEncrypted: false,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01'
      }
    ]
    
    vi.mocked(settingsApi.getSettingsByCategory).mockResolvedValue(mockSettings)
    
    renderPrivacyDataSettings()
    
    await waitFor(() => {
      expect(settingsApi.getSettingsByCategory).toHaveBeenCalledWith('test-user-123', 'privacy_data')
    })
  })

  it('displays profile visibility options', () => {
    renderPrivacyDataSettings()
    
    expect(screen.getByText('Who can see your profile')).toBeInTheDocument()
    expect(screen.getByText('Public')).toBeInTheDocument()
    expect(screen.getByText('Friends Only')).toBeInTheDocument()
    expect(screen.getByText('Private')).toBeInTheDocument()
  })

  it('displays location sharing preferences', () => {
    renderPrivacyDataSettings()
    
    expect(screen.getByText('Real-time Location Sharing')).toBeInTheDocument()
    expect(screen.getByText('Trip Location Sharing')).toBeInTheDocument()
    expect(screen.getByText('Historical Location Data')).toBeInTheDocument()
    expect(screen.getByText('Location-based Recommendations')).toBeInTheDocument()
  })

  it('displays data collection consent options', () => {
    renderPrivacyDataSettings()
    
    expect(screen.getByText('Analytics Data Collection')).toBeInTheDocument()
    expect(screen.getByText('Usage Tracking')).toBeInTheDocument()
    expect(screen.getByText('Crash Reporting')).toBeInTheDocument()
    expect(screen.getByText('Performance Analytics')).toBeInTheDocument()
  })

  it('displays third-party sharing controls', () => {
    renderPrivacyDataSettings()
    
    expect(screen.getByText('Partner Integrations')).toBeInTheDocument()
    expect(screen.getByText('Affiliate Programs')).toBeInTheDocument()
    expect(screen.getByText('Social Media Sharing')).toBeInTheDocument()
    expect(screen.getByText('Travel Service Providers')).toBeInTheDocument()
  })

  it('displays AI training consent options', () => {
    renderPrivacyDataSettings()
    
    expect(screen.getByText('Use my data for AI training')).toBeInTheDocument()
    expect(screen.getByText('Anonymous model improvement')).toBeInTheDocument()
    expect(screen.getByText('Personalization data usage')).toBeInTheDocument()
  })

  it('updates profile visibility and triggers auto-save', async () => {
    vi.mocked(settingsApi.createSetting).mockResolvedValue({})
    
    renderPrivacyDataSettings()
    
    const friendsOnlyOption = screen.getByText('Friends Only')
    fireEvent.click(friendsOnlyOption)
    
    await waitFor(() => {
      expect(settingsApi.createSetting).toHaveBeenCalledWith('test-user-123', expect.objectContaining({
        category: 'privacy_data',
        subcategory: 'profile_visibility',
        settingKey: 'visibility_level',
        dataType: 'json'
      }))
    }, { timeout: 2000 })
  })

  it('toggles location sharing and triggers auto-save', async () => {
    vi.mocked(settingsApi.createSetting).mockResolvedValue({})
    
    renderPrivacyDataSettings()
    
    const locationToggle = screen.getByText('Real-time Location Sharing').closest('div')?.querySelector('input[type="checkbox"]')
    if (locationToggle) {
      fireEvent.click(locationToggle)
      
      await waitFor(() => {
        expect(settingsApi.createSetting).toHaveBeenCalledWith('test-user-123', expect.objectContaining({
          category: 'privacy_data',
          subcategory: 'location_sharing',
          settingKey: 'realtime_sharing',
          dataType: 'json'
        }))
      }, { timeout: 2000 })
    }
  })

  it('displays data retention preferences', () => {
    renderPrivacyDataSettings()
    
    expect(screen.getByText('Data Retention Period')).toBeInTheDocument()
    expect(screen.getByText('1 year')).toBeInTheDocument()
    expect(screen.getByText('3 years')).toBeInTheDocument()
    expect(screen.getByText('5 years')).toBeInTheDocument()
    expect(screen.getByText('Until deleted')).toBeInTheDocument()
  })

  it('displays data export and deletion options', () => {
    renderPrivacyDataSettings()
    
    expect(screen.getByText('Data Management')).toBeInTheDocument()
    expect(screen.getByText('Export My Data')).toBeInTheDocument()
    expect(screen.getByText('Delete My Account')).toBeInTheDocument()
    expect(screen.getByText('Download Privacy Report')).toBeInTheDocument()
  })

  it('displays marketing communication preferences', () => {
    renderPrivacyDataSettings()
    
    expect(screen.getByText('Newsletter Subscription')).toBeInTheDocument()
    expect(screen.getByText('Promotional Offers')).toBeInTheDocument()
    expect(screen.getByText('Product Updates')).toBeInTheDocument()
    expect(screen.getByText('Personalized Recommendations')).toBeInTheDocument()
  })

  it('displays loading state while fetching settings', async () => {
    let resolvePromise: (value: any) => void
    const promise = new Promise((resolve) => {
      resolvePromise = resolve
    })
    
    vi.mocked(settingsApi.getSettingsByCategory).mockReturnValue(promise as any)
    
    renderPrivacyDataSettings()
    
    expect(screen.getByText('Loading privacy settings...')).toBeInTheDocument()
    
    resolvePromise!([])
    
    await waitFor(() => {
      expect(screen.queryByText('Loading privacy settings...')).not.toBeInTheDocument()
    })
  })

  it('displays error message when settings fail to load', async () => {
    vi.mocked(settingsApi.getSettingsByCategory).mockRejectedValue(new Error('Failed to load'))
    
    renderPrivacyDataSettings()
    
    await waitFor(() => {
      expect(screen.getByText('Failed to load settings. Please try again.')).toBeInTheDocument()
    })
  })

  it('populates form with loaded settings', async () => {
    const mockSettings = [
      {
        id: '1',
        userId: 'test-user-123',
        category: 'privacy_data',
        subcategory: 'profile_visibility',
        settingKey: 'visibility_level',
        settingValue: { level: 'private' },
        dataType: 'json',
        isEncrypted: false,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01'
      },
      {
        id: '2',
        userId: 'test-user-123',
        category: 'privacy_data',
        subcategory: 'location_sharing',
        settingKey: 'realtime_sharing',
        settingValue: { enabled: false },
        dataType: 'json',
        isEncrypted: false,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01'
      }
    ]
    
    vi.mocked(settingsApi.getSettingsByCategory).mockResolvedValue(mockSettings)
    
    renderPrivacyDataSettings()
    
    await waitFor(() => {
      // Check if loaded preferences are reflected in the UI
      const privateOption = screen.getByText('Private')
      expect(privateOption.closest('label')).toHaveClass('selected') // Assuming this styling exists
    })
  })

  it('handles API errors gracefully during save', async () => {
    vi.mocked(settingsApi.createSetting).mockRejectedValue(new Error('Save failed'))
    
    renderPrivacyDataSettings()
    
    const publicOption = screen.getByText('Public')
    fireEvent.click(publicOption)
    
    await waitFor(() => {
      expect(screen.getByText('Failed to save changes. Please try again.')).toBeInTheDocument()
    }, { timeout: 2000 })
  })

  it('displays cookie and tracking preferences', () => {
    renderPrivacyDataSettings()
    
    expect(screen.getByText('Cookie Preferences')).toBeInTheDocument()
    expect(screen.getByText('Essential Cookies Only')).toBeInTheDocument()
    expect(screen.getByText('Performance Cookies')).toBeInTheDocument()
    expect(screen.getByText('Marketing Cookies')).toBeInTheDocument()
  })

  it('toggles data collection preferences', async () => {
    vi.mocked(settingsApi.createSetting).mockResolvedValue({})
    
    renderPrivacyDataSettings()
    
    const analyticsToggle = screen.getByText('Analytics Data Collection').closest('div')?.querySelector('input[type="checkbox"]')
    if (analyticsToggle) {
      fireEvent.click(analyticsToggle)
      
      await waitFor(() => {
        expect(settingsApi.createSetting).toHaveBeenCalledWith('test-user-123', expect.objectContaining({
          category: 'privacy_data',
          subcategory: 'data_collection',
          settingKey: 'analytics_consent',
          dataType: 'json'
        }))
      }, { timeout: 2000 })
    }
  })

  it('displays GDPR compliance options for EU users', () => {
    renderPrivacyDataSettings()
    
    expect(screen.getByText('GDPR Rights')).toBeInTheDocument()
    expect(screen.getByText('Right to Access')).toBeInTheDocument()
    expect(screen.getByText('Right to Rectification')).toBeInTheDocument()
    expect(screen.getByText('Right to Erasure')).toBeInTheDocument()
    expect(screen.getByText('Right to Portability')).toBeInTheDocument()
  })

  it('allows granular third-party sharing controls', async () => {
    vi.mocked(settingsApi.createSetting).mockResolvedValue({})
    
    renderPrivacyDataSettings()
    
    const partnerToggle = screen.getByText('Partner Integrations').closest('div')?.querySelector('input[type="checkbox"]')
    if (partnerToggle) {
      fireEvent.click(partnerToggle)
      
      await waitFor(() => {
        expect(settingsApi.createSetting).toHaveBeenCalledWith('test-user-123', expect.objectContaining({
          category: 'privacy_data',
          subcategory: 'third_party_sharing',
          settingKey: 'partner_integrations',
          dataType: 'json'
        }))
      }, { timeout: 2000 })
    }
  })
})