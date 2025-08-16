import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import NotificationSettings from '../NotificationSettings'
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

const renderNotificationSettings = () => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <NotificationSettings />
      </AuthProvider>
    </BrowserRouter>
  )
}

describe('NotificationSettings', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(settingsApi.getSettingsByCategory).mockResolvedValue([])
  })

  it('renders all notification preference sections', () => {
    renderNotificationSettings()
    
    expect(screen.getByText('Trip Planning Notifications')).toBeInTheDocument()
    expect(screen.getByText('During Travel Notifications')).toBeInTheDocument()
    expect(screen.getByText('Group Travel Notifications')).toBeInTheDocument()
    expect(screen.getByText('Safety & Emergency Notifications')).toBeInTheDocument()
    expect(screen.getByText('Memories & Documentation')).toBeInTheDocument()
    expect(screen.getByText('Marketing & Updates')).toBeInTheDocument()
    expect(screen.getByText('Delivery Methods')).toBeInTheDocument()
  })

  it('displays all notification toggle switches', () => {
    renderNotificationSettings()
    
    // Should have multiple toggle switches for different notification types
    const toggles = screen.getAllByRole('checkbox')
    expect(toggles.length).toBeGreaterThan(10)
  })

  it('loads notification settings on mount', async () => {
    const mockSettings = [
      {
        id: '1',
        userId: 'test-user-123',
        category: 'notifications',
        subcategory: 'trip_planning',
        settingKey: 'booking_reminders',
        settingValue: { enabled: true },
        dataType: 'json',
        isEncrypted: false,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01'
      }
    ]
    
    vi.mocked(settingsApi.getSettingsByCategory).mockResolvedValue(mockSettings)
    
    renderNotificationSettings()
    
    await waitFor(() => {
      expect(settingsApi.getSettingsByCategory).toHaveBeenCalledWith('test-user-123', 'notifications')
    })
  })

  it('toggles notification preference and triggers auto-save', async () => {
    vi.mocked(settingsApi.createSetting).mockResolvedValue({})
    
    renderNotificationSettings()
    
    // Find and click the first toggle switch
    const toggles = screen.getAllByRole('checkbox')
    fireEvent.click(toggles[0])
    
    await waitFor(() => {
      expect(settingsApi.createSetting).toHaveBeenCalledWith('test-user-123', expect.objectContaining({
        category: 'notifications',
        dataType: 'json'
      }))
    }, { timeout: 2000 })
  })

  it('displays loading state while fetching settings', async () => {
    let resolvePromise: (value: any) => void
    const promise = new Promise((resolve) => {
      resolvePromise = resolve
    })
    
    vi.mocked(settingsApi.getSettingsByCategory).mockReturnValue(promise as any)
    
    renderNotificationSettings()
    
    expect(screen.getByText('Loading notification settings...')).toBeInTheDocument()
    
    resolvePromise!([])
    
    await waitFor(() => {
      expect(screen.queryByText('Loading notification settings...')).not.toBeInTheDocument()
    })
  })

  it('displays error message when settings fail to load', async () => {
    vi.mocked(settingsApi.getSettingsByCategory).mockRejectedValue(new Error('Failed to load'))
    
    renderNotificationSettings()
    
    await waitFor(() => {
      expect(screen.getByText('Failed to load settings. Please try again.')).toBeInTheDocument()
    })
  })

  it('populates toggles with loaded settings', async () => {
    const mockSettings = [
      {
        id: '1',
        userId: 'test-user-123',
        category: 'notifications',
        subcategory: 'trip_planning',
        settingKey: 'booking_reminders',
        settingValue: { enabled: true },
        dataType: 'json',
        isEncrypted: false,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01'
      }
    ]
    
    vi.mocked(settingsApi.getSettingsByCategory).mockResolvedValue(mockSettings)
    
    renderNotificationSettings()
    
    await waitFor(() => {
      // At least one toggle should be checked based on loaded settings
      const checkedToggles = screen.getAllByRole('checkbox').filter(
        (toggle: HTMLInputElement) => toggle.checked
      )
      expect(checkedToggles.length).toBeGreaterThan(0)
    })
  })

  it('handles API errors gracefully during save', async () => {
    vi.mocked(settingsApi.createSetting).mockRejectedValue(new Error('Save failed'))
    
    renderNotificationSettings()
    
    const toggles = screen.getAllByRole('checkbox')
    fireEvent.click(toggles[0])
    
    await waitFor(() => {
      expect(screen.getByText('Failed to save changes. Please try again.')).toBeInTheDocument()
    }, { timeout: 2000 })
  })

  it('renders all delivery method preferences', () => {
    renderNotificationSettings()
    
    expect(screen.getByText('Email Notifications')).toBeInTheDocument()
    expect(screen.getByText('Push Notifications')).toBeInTheDocument()
    expect(screen.getByText('SMS Notifications')).toBeInTheDocument()
  })

  it('allows customization of notification frequency', () => {
    renderNotificationSettings()
    
    // Should have frequency selection options
    expect(screen.getByText('Immediate')).toBeInTheDocument()
    expect(screen.getByText('Daily Summary')).toBeInTheDocument()
    expect(screen.getByText('Weekly Summary')).toBeInTheDocument()
  })
})