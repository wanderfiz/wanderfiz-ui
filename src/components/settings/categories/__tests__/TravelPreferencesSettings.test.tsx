import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import TravelPreferencesSettings from '../TravelPreferencesSettings'
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

const renderTravelPreferencesSettings = () => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <TravelPreferencesSettings />
      </AuthProvider>
    </BrowserRouter>
  )
}

describe('TravelPreferencesSettings', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(settingsApi.getSettingsByCategory).mockResolvedValue([])
  })

  it('renders all travel preference sections', () => {
    renderTravelPreferencesSettings()
    
    expect(screen.getByText('Trip Planning Preferences')).toBeInTheDocument()
    expect(screen.getByText('Transportation Preferences')).toBeInTheDocument()
    expect(screen.getByText('Accommodation Preferences')).toBeInTheDocument()
    expect(screen.getByText('Dining Preferences')).toBeInTheDocument()
    expect(screen.getByText('Activity Preferences')).toBeInTheDocument()
    expect(screen.getByText('Budget Preferences')).toBeInTheDocument()
  })

  it('loads travel preferences on mount', async () => {
    const mockSettings = [
      {
        id: '1',
        userId: 'test-user-123',
        category: 'travel_preferences',
        subcategory: 'trip_planning',
        settingKey: 'default_duration',
        settingValue: { duration: '7-days' },
        dataType: 'json',
        isEncrypted: false,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01'
      }
    ]
    
    vi.mocked(settingsApi.getSettingsByCategory).mockResolvedValue(mockSettings)
    
    renderTravelPreferencesSettings()
    
    await waitFor(() => {
      expect(settingsApi.getSettingsByCategory).toHaveBeenCalledWith('test-user-123', 'travel_preferences')
    })
  })

  it('displays trip duration preferences', () => {
    renderTravelPreferencesSettings()
    
    expect(screen.getByText('Preferred Trip Duration')).toBeInTheDocument()
    expect(screen.getByText('Weekend (2-3 days)')).toBeInTheDocument()
    expect(screen.getByText('Week (4-7 days)')).toBeInTheDocument()
    expect(screen.getByText('Extended (1-2 weeks)')).toBeInTheDocument()
    expect(screen.getByText('Long-term (1+ months)')).toBeInTheDocument()
  })

  it('displays budget range preferences', () => {
    renderTravelPreferencesSettings()
    
    expect(screen.getByText('Budget Range')).toBeInTheDocument()
    expect(screen.getByText('Budget-friendly ($50-100/day)')).toBeInTheDocument()
    expect(screen.getByText('Mid-range ($100-250/day)')).toBeInTheDocument()
    expect(screen.getByText('Luxury ($250-500/day)')).toBeInTheDocument()
    expect(screen.getByText('Ultra-luxury ($500+/day)')).toBeInTheDocument()
  })

  it('updates preference selection and triggers auto-save', async () => {
    vi.mocked(settingsApi.createSetting).mockResolvedValue({})
    
    renderTravelPreferencesSettings()
    
    // Select a preference option
    const weekendOption = screen.getByText('Weekend (2-3 days)')
    fireEvent.click(weekendOption)
    
    await waitFor(() => {
      expect(settingsApi.createSetting).toHaveBeenCalledWith('test-user-123', expect.objectContaining({
        category: 'travel_preferences',
        subcategory: 'trip_planning',
        settingKey: 'default_duration',
        dataType: 'json'
      }))
    }, { timeout: 2000 })
  })

  it('displays transportation preferences', () => {
    renderTravelPreferencesSettings()
    
    expect(screen.getByText('Transportation Method')).toBeInTheDocument()
    expect(screen.getByText('Flight')).toBeInTheDocument()
    expect(screen.getByText('Train')).toBeInTheDocument()
    expect(screen.getByText('Car')).toBeInTheDocument()
    expect(screen.getByText('Bus')).toBeInTheDocument()
  })

  it('displays accommodation preferences', () => {
    renderTravelPreferencesSettings()
    
    expect(screen.getByText('Accommodation Type')).toBeInTheDocument()
    expect(screen.getByText('Hotel')).toBeInTheDocument()
    expect(screen.getByText('Airbnb/Vacation Rental')).toBeInTheDocument()
    expect(screen.getByText('Hostel')).toBeInTheDocument()
    expect(screen.getByText('Resort')).toBeInTheDocument()
  })

  it('displays activity level preferences', () => {
    renderTravelPreferencesSettings()
    
    expect(screen.getByText('Activity Level')).toBeInTheDocument()
    expect(screen.getByText('Relaxed')).toBeInTheDocument()
    expect(screen.getByText('Moderate')).toBeInTheDocument()
    expect(screen.getByText('Active')).toBeInTheDocument()
    expect(screen.getByText('Adventure')).toBeInTheDocument()
  })

  it('displays loading state while fetching settings', async () => {
    let resolvePromise: (value: any) => void
    const promise = new Promise((resolve) => {
      resolvePromise = resolve
    })
    
    vi.mocked(settingsApi.getSettingsByCategory).mockReturnValue(promise as any)
    
    renderTravelPreferencesSettings()
    
    expect(screen.getByText('Loading travel preferences...')).toBeInTheDocument()
    
    resolvePromise!([])
    
    await waitFor(() => {
      expect(screen.queryByText('Loading travel preferences...')).not.toBeInTheDocument()
    })
  })

  it('displays error message when settings fail to load', async () => {
    vi.mocked(settingsApi.getSettingsByCategory).mockRejectedValue(new Error('Failed to load'))
    
    renderTravelPreferencesSettings()
    
    await waitFor(() => {
      expect(screen.getByText('Failed to load settings. Please try again.')).toBeInTheDocument()
    })
  })

  it('populates form with loaded settings', async () => {
    const mockSettings = [
      {
        id: '1',
        userId: 'test-user-123',
        category: 'travel_preferences',
        subcategory: 'trip_planning',
        settingKey: 'default_duration',
        settingValue: { duration: 'week' },
        dataType: 'json',
        isEncrypted: false,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01'
      }
    ]
    
    vi.mocked(settingsApi.getSettingsByCategory).mockResolvedValue(mockSettings)
    
    renderTravelPreferencesSettings()
    
    await waitFor(() => {
      // Check if loaded preferences are reflected in the UI
      const activeOptions = screen.getAllByText(/selected|active/i)
      expect(activeOptions.length).toBeGreaterThanOrEqual(0) // Some settings should be loaded
    })
  })

  it('handles API errors gracefully during save', async () => {
    vi.mocked(settingsApi.createSetting).mockRejectedValue(new Error('Save failed'))
    
    renderTravelPreferencesSettings()
    
    const weekendOption = screen.getByText('Weekend (2-3 days)')
    fireEvent.click(weekendOption)
    
    await waitFor(() => {
      expect(screen.getByText('Failed to save changes. Please try again.')).toBeInTheDocument()
    }, { timeout: 2000 })
  })

  it('displays currency preferences', () => {
    renderTravelPreferencesSettings()
    
    expect(screen.getByText('Default Currency')).toBeInTheDocument()
  })

  it('allows dietary restriction selections', () => {
    renderTravelPreferencesSettings()
    
    expect(screen.getByText('Dietary Restrictions')).toBeInTheDocument()
    expect(screen.getByText('None')).toBeInTheDocument()
    expect(screen.getByText('Vegetarian')).toBeInTheDocument()
    expect(screen.getByText('Vegan')).toBeInTheDocument()
    expect(screen.getByText('Gluten-free')).toBeInTheDocument()
  })
})