import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import ProfileSettings from '../ProfileSettings'
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

const renderProfileSettings = () => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <ProfileSettings />
      </AuthProvider>
    </BrowserRouter>
  )
}

describe('ProfileSettings', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Default mock for getSettingsByCategory
    vi.mocked(settingsApi.getSettingsByCategory).mockResolvedValue([])
  })

  it('renders all profile setting sections', () => {
    renderProfileSettings()
    
    expect(screen.getByText('Personal Information')).toBeInTheDocument()
    expect(screen.getByText('Contact Details')).toBeInTheDocument()
    expect(screen.getByText('Account Preferences')).toBeInTheDocument()
    expect(screen.getByText('Account Management')).toBeInTheDocument()
  })

  it('displays form fields with correct labels', () => {
    renderProfileSettings()
    
    expect(screen.getByText('Full Name')).toBeInTheDocument()
    expect(screen.getByText('Email Address')).toBeInTheDocument()
    expect(screen.getByText('Bio')).toBeInTheDocument()
    expect(screen.getByText('Phone Number')).toBeInTheDocument()
    expect(screen.getByText('Username')).toBeInTheDocument()
    expect(screen.getByText('Display Name')).toBeInTheDocument()
  })

  it('loads profile settings on mount', async () => {
    const mockSettings = [
      {
        id: '1',
        userId: 'test-user-123',
        category: 'profile',
        subcategory: 'personal_info',
        settingKey: 'basic_info',
        settingValue: {
          name: 'John Doe',
          email: 'john@example.com',
          bio: 'Travel enthusiast'
        },
        dataType: 'json',
        isEncrypted: false,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01'
      }
    ]
    
    vi.mocked(settingsApi.getSettingsByCategory).mockResolvedValue(mockSettings)
    
    renderProfileSettings()
    
    await waitFor(() => {
      expect(settingsApi.getSettingsByCategory).toHaveBeenCalledWith('test-user-123', 'profile')
    })
  })

  it('updates personal info field and triggers auto-save', async () => {
    vi.mocked(settingsApi.createSetting).mockResolvedValue({})
    
    renderProfileSettings()
    
    const nameInput = screen.getByPlaceholderText('Enter your full name')
    fireEvent.change(nameInput, { target: { value: 'Jane Doe' } })
    
    await waitFor(() => {
      expect(settingsApi.createSetting).toHaveBeenCalledWith('test-user-123', expect.objectContaining({
        category: 'profile',
        subcategory: 'personal_info',
        settingKey: 'basic_info',
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
    
    renderProfileSettings()
    
    expect(screen.getByText('Loading profile settings...')).toBeInTheDocument()
    
    // Resolve the promise
    resolvePromise!([])
    
    await waitFor(() => {
      expect(screen.queryByText('Loading profile settings...')).not.toBeInTheDocument()
    })
  })

  it('displays error message when settings fail to load', async () => {
    vi.mocked(settingsApi.getSettingsByCategory).mockRejectedValue(new Error('Failed to load'))
    
    renderProfileSettings()
    
    await waitFor(() => {
      expect(screen.getByText('Failed to load settings. Please try again.')).toBeInTheDocument()
    })
  })

  it('renders account management buttons', () => {
    renderProfileSettings()
    
    expect(screen.getByText('Request Export')).toBeInTheDocument()
    expect(screen.getByText('Delete Account')).toBeInTheDocument()
  })

  it('updates contact details and triggers auto-save', async () => {
    vi.mocked(settingsApi.createSetting).mockResolvedValue({})
    
    renderProfileSettings()
    
    const phoneInput = screen.getByPlaceholderText('Enter your phone number')
    fireEvent.change(phoneInput, { target: { value: '+1234567890' } })
    
    await waitFor(() => {
      expect(settingsApi.createSetting).toHaveBeenCalledWith('test-user-123', expect.objectContaining({
        category: 'profile',
        subcategory: 'contact_details',
        settingKey: 'phone_number'
      }))
    }, { timeout: 2000 })
  })

  it('updates account preferences and triggers auto-save', async () => {
    vi.mocked(settingsApi.createSetting).mockResolvedValue({})
    
    renderProfileSettings()
    
    const usernameInput = screen.getByPlaceholderText('Choose a username')
    fireEvent.change(usernameInput, { target: { value: 'johndoe123' } })
    
    await waitFor(() => {
      expect(settingsApi.createSetting).toHaveBeenCalledWith('test-user-123', expect.objectContaining({
        category: 'profile',
        subcategory: 'account_preferences',
        settingKey: 'display_settings'
      }))
    }, { timeout: 2000 })
  })

  it('populates form fields with loaded settings', async () => {
    const mockSettings = [
      {
        id: '1',
        userId: 'test-user-123',
        category: 'profile',
        subcategory: 'personal_info',
        settingKey: 'basic_info',
        settingValue: {
          name: 'John Doe',
          email: 'john@example.com',
          bio: 'Travel enthusiast',
          avatar: 'avatar.jpg'
        },
        dataType: 'json',
        isEncrypted: false,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01'
      },
      {
        id: '2',
        userId: 'test-user-123',
        category: 'profile',
        subcategory: 'contact_details',
        settingKey: 'phone_number',
        settingValue: { phone: '+1234567890' },
        dataType: 'json',
        isEncrypted: false,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01'
      }
    ]
    
    vi.mocked(settingsApi.getSettingsByCategory).mockResolvedValue(mockSettings)
    
    renderProfileSettings()
    
    await waitFor(() => {
      const nameInput = screen.getByPlaceholderText('Enter your full name') as HTMLInputElement
      expect(nameInput.value).toBe('John Doe')
      
      const phoneInput = screen.getByPlaceholderText('Enter your phone number') as HTMLInputElement
      expect(phoneInput.value).toBe('+1234567890')
    })
  })

  it('handles API errors gracefully during save', async () => {
    vi.mocked(settingsApi.createSetting).mockRejectedValue(new Error('Save failed'))
    
    renderProfileSettings()
    
    const nameInput = screen.getByPlaceholderText('Enter your full name')
    fireEvent.change(nameInput, { target: { value: 'Jane Doe' } })
    
    await waitFor(() => {
      expect(screen.getByText('Failed to save changes. Please try again.')).toBeInTheDocument()
    }, { timeout: 2000 })
  })
})