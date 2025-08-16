import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import SettingsPage from '../SettingsPage'
import { AuthProvider } from '../../contexts/AuthContext'
import { vi } from 'vitest'

// Mock the settings API
vi.mock('../../services/settingsApi', () => ({
  default: {
    getSettingsByCategory: vi.fn().mockResolvedValue([]),
    createSetting: vi.fn().mockResolvedValue({}),
    updateSetting: vi.fn().mockResolvedValue({}),
    deleteSetting: vi.fn().mockResolvedValue({}),
  }
}))

// Mock the auth hook
vi.mock('../../hooks/useAuth', () => ({
  useAuth: () => ({
    user: {
      id: 'test-user-123',
      name: 'Test User',
      email: 'test@example.com'
    },
    isAuthenticated: true
  })
}))

const renderSettingsPage = () => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <SettingsPage />
      </AuthProvider>
    </BrowserRouter>
  )
}

describe('SettingsPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders settings page with header and tabs', () => {
    renderSettingsPage()
    
    expect(screen.getByText('Settings')).toBeInTheDocument()
    expect(screen.getByText('Manage your account settings and preferences')).toBeInTheDocument()
    
    // Check all tabs are present
    expect(screen.getByText('Account')).toBeInTheDocument()
    expect(screen.getByText('Preferences')).toBeInTheDocument()
    expect(screen.getByText('Notifications')).toBeInTheDocument()
    expect(screen.getByText('Privacy & Data')).toBeInTheDocument()
    expect(screen.getByText('Advanced')).toBeInTheDocument()
  })

  it('displays Account tab content by default', () => {
    renderSettingsPage()
    
    // Account tab should be active by default
    const accountTab = screen.getByText('Account')
    expect(accountTab.parentElement).toHaveClass('border-[#FF561D]')
    
    // Should show ProfileSettings and SafetyEmergencySettings
    expect(screen.getByText('Personal Information')).toBeInTheDocument()
  })

  it('switches tabs when clicked', async () => {
    renderSettingsPage()
    
    // Click on Preferences tab
    const preferencesTab = screen.getByText('Preferences')
    fireEvent.click(preferencesTab)
    
    await waitFor(() => {
      expect(preferencesTab.parentElement).toHaveClass('border-[#FF561D]')
    })
    
    // Click on Notifications tab
    const notificationsTab = screen.getByText('Notifications')
    fireEvent.click(notificationsTab)
    
    await waitFor(() => {
      expect(notificationsTab.parentElement).toHaveClass('border-[#FF561D]')
    })
  })

  it('displays tab descriptions', () => {
    renderSettingsPage()
    
    expect(screen.getByText('Profile, safety & emergency contacts')).toBeInTheDocument()
    expect(screen.getByText('Travel, AI assistant & group settings')).toBeInTheDocument()
    expect(screen.getByText('Email, push & SMS preferences')).toBeInTheDocument()
    expect(screen.getByText('Privacy, sync & sustainability')).toBeInTheDocument()
    expect(screen.getByText('Developer & experimental features')).toBeInTheDocument()
  })

  it('renders content in a container with proper styling', () => {
    renderSettingsPage()
    
    const contentContainer = screen.getByText('Settings').closest('.flex-1')
    expect(contentContainer).toHaveClass('bg-gray-50', 'min-h-screen')
  })

  it('displays Privacy & Data tab with multiple sections', async () => {
    renderSettingsPage()
    
    const privacyTab = screen.getByText('Privacy & Data')
    fireEvent.click(privacyTab)
    
    await waitFor(() => {
      expect(privacyTab.parentElement).toHaveClass('border-[#FF561D]')
    })
    
    // Should show multiple sections with dividers
    const contentArea = screen.getByText('Settings').closest('.flex-1')
    const dividers = contentArea?.querySelectorAll('.border-t')
    expect(dividers?.length).toBeGreaterThan(0)
  })

  it('displays Advanced tab content when clicked', async () => {
    renderSettingsPage()
    
    const advancedTab = screen.getByText('Advanced')
    fireEvent.click(advancedTab)
    
    await waitFor(() => {
      expect(advancedTab.parentElement).toHaveClass('border-[#FF561D]')
    })
  })

  it('maintains tab state when switching between tabs', async () => {
    renderSettingsPage()
    
    // Switch to Notifications
    const notificationsTab = screen.getByText('Notifications')
    fireEvent.click(notificationsTab)
    
    await waitFor(() => {
      expect(notificationsTab.parentElement).toHaveClass('border-[#FF561D]')
    })
    
    // Switch back to Account
    const accountTab = screen.getByText('Account')
    fireEvent.click(accountTab)
    
    await waitFor(() => {
      expect(accountTab.parentElement).toHaveClass('border-[#FF561D]')
      expect(notificationsTab.parentElement).not.toHaveClass('border-[#FF561D]')
    })
  })

  it('applies hover styles to inactive tabs', () => {
    renderSettingsPage()
    
    const preferencesTab = screen.getByText('Preferences').parentElement
    expect(preferencesTab).toHaveClass('hover:text-gray-700', 'hover:border-gray-300')
  })

  it('renders content inside a max-width container', () => {
    renderSettingsPage()
    
    const contentWrapper = document.querySelector('.max-w-4xl')
    expect(contentWrapper).toBeInTheDocument()
    expect(contentWrapper).toHaveClass('mx-auto', 'bg-white', 'rounded-lg')
  })
})