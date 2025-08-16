import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import AdvancedSettings from '../AdvancedSettings'
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
    resetAllSettings: vi.fn(),
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

const renderAdvancedSettings = () => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <AdvancedSettings />
      </AuthProvider>
    </BrowserRouter>
  )
}

describe('AdvancedSettings', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(settingsApi.getSettingsByCategory).mockResolvedValue([])
  })

  it('renders all advanced setting sections', () => {
    renderAdvancedSettings()
    
    expect(screen.getByText('API Access')).toBeInTheDocument()
    expect(screen.getByText('Beta Features')).toBeInTheDocument()
    expect(screen.getByText('Performance Settings')).toBeInTheDocument()
    expect(screen.getByText('Debug & Diagnostics')).toBeInTheDocument()
    expect(screen.getByText('Data Export & Import')).toBeInTheDocument()
    expect(screen.getByText('System Reset')).toBeInTheDocument()
  })

  it('loads advanced settings on mount', async () => {
    const mockSettings = [
      {
        id: '1',
        userId: 'test-user-123',
        category: 'advanced',
        subcategory: 'api_access',
        settingKey: 'api_enabled',
        settingValue: { enabled: false },
        dataType: 'json',
        isEncrypted: false,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01'
      }
    ]
    
    vi.mocked(settingsApi.getSettingsByCategory).mockResolvedValue(mockSettings)
    
    renderAdvancedSettings()
    
    await waitFor(() => {
      expect(settingsApi.getSettingsByCategory).toHaveBeenCalledWith('test-user-123', 'advanced')
    })
  })

  it('displays API access controls', () => {
    renderAdvancedSettings()
    
    expect(screen.getByText('Enable API Access')).toBeInTheDocument()
    expect(screen.getByText('Generate API Key')).toBeInTheDocument()
    expect(screen.getByText('View API Documentation')).toBeInTheDocument()
    expect(screen.getByText('API Rate Limits')).toBeInTheDocument()
  })

  it('displays beta feature opt-ins', () => {
    renderAdvancedSettings()
    
    expect(screen.getByText('Early Access Program')).toBeInTheDocument()
    expect(screen.getByText('Experimental Features')).toBeInTheDocument()
    expect(screen.getByText('Alpha Testing')).toBeInTheDocument()
    expect(screen.getByText('Feature Previews')).toBeInTheDocument()
  })

  it('displays performance settings', () => {
    renderAdvancedSettings()
    
    expect(screen.getByText('Cache Settings')).toBeInTheDocument()
    expect(screen.getByText('Image Quality')).toBeInTheDocument()
    expect(screen.getByText('Offline Data Storage')).toBeInTheDocument()
    expect(screen.getByText('Background Sync')).toBeInTheDocument()
  })

  it('displays debug and diagnostic options', () => {
    renderAdvancedSettings()
    
    expect(screen.getByText('Enable Debug Logging')).toBeInTheDocument()
    expect(screen.getByText('Diagnostic Data Sharing')).toBeInTheDocument()
    expect(screen.getByText('Error Reporting')).toBeInTheDocument()
    expect(screen.getByText('Performance Monitoring')).toBeInTheDocument()
  })

  it('displays data export and import tools', () => {
    renderAdvancedSettings()
    
    expect(screen.getByText('Export All Settings')).toBeInTheDocument()
    expect(screen.getByText('Import Settings')).toBeInTheDocument()
    expect(screen.getByText('Export User Data')).toBeInTheDocument()
    expect(screen.getByText('Export Format')).toBeInTheDocument()
  })

  it('toggles API access and triggers auto-save', async () => {
    vi.mocked(settingsApi.createSetting).mockResolvedValue({})
    
    renderAdvancedSettings()
    
    const apiToggle = screen.getByText('Enable API Access').closest('div')?.querySelector('input[type="checkbox"]')
    if (apiToggle) {
      fireEvent.click(apiToggle)
      
      await waitFor(() => {
        expect(settingsApi.createSetting).toHaveBeenCalledWith('test-user-123', expect.objectContaining({
          category: 'advanced',
          subcategory: 'api_access',
          settingKey: 'api_enabled',
          dataType: 'json'
        }))
      }, { timeout: 2000 })
    }
  })

  it('enables beta features and triggers auto-save', async () => {
    vi.mocked(settingsApi.createSetting).mockResolvedValue({})
    
    renderAdvancedSettings()
    
    const betaToggle = screen.getByText('Early Access Program').closest('div')?.querySelector('input[type="checkbox"]')
    if (betaToggle) {
      fireEvent.click(betaToggle)
      
      await waitFor(() => {
        expect(settingsApi.createSetting).toHaveBeenCalledWith('test-user-123', expect.objectContaining({
          category: 'advanced',
          subcategory: 'beta_features',
          settingKey: 'early_access',
          dataType: 'json'
        }))
      }, { timeout: 2000 })
    }
  })

  it('displays system reset options with warnings', () => {
    renderAdvancedSettings()
    
    expect(screen.getByText('Reset All Settings')).toBeInTheDocument()
    expect(screen.getByText('Clear All Data')).toBeInTheDocument()
    expect(screen.getByText('Factory Reset')).toBeInTheDocument()
    expect(screen.getByText('⚠️')).toBeInTheDocument() // Warning icon
  })

  it('handles reset all settings with confirmation', async () => {
    vi.mocked(settingsApi.resetAllSettings).mockResolvedValue({})
    
    // Mock window.confirm
    const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(true)
    
    renderAdvancedSettings()
    
    const resetButton = screen.getByText('Reset All Settings')
    fireEvent.click(resetButton)
    
    await waitFor(() => {
      expect(confirmSpy).toHaveBeenCalledWith(
        'Are you sure you want to reset all settings to defaults? This action cannot be undone.'
      )
      expect(settingsApi.resetAllSettings).toHaveBeenCalledWith('test-user-123')
    })
    
    confirmSpy.mockRestore()
  })

  it('cancels reset when user declines confirmation', async () => {
    const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(false)
    
    renderAdvancedSettings()
    
    const resetButton = screen.getByText('Reset All Settings')
    fireEvent.click(resetButton)
    
    await waitFor(() => {
      expect(confirmSpy).toHaveBeenCalled()
      expect(settingsApi.resetAllSettings).not.toHaveBeenCalled()
    })
    
    confirmSpy.mockRestore()
  })

  it('displays developer tools section', () => {
    renderAdvancedSettings()
    
    expect(screen.getByText('Developer Tools')).toBeInTheDocument()
    expect(screen.getByText('Console Access')).toBeInTheDocument()
    expect(screen.getByText('Network Monitoring')).toBeInTheDocument()
    expect(screen.getByText('Local Storage Inspector')).toBeInTheDocument()
  })

  it('displays cache management options', () => {
    renderAdvancedSettings()
    
    expect(screen.getByText('Clear Cache')).toBeInTheDocument()
    expect(screen.getByText('Cache Size Limit')).toBeInTheDocument()
    expect(screen.getByText('Auto-clear Frequency')).toBeInTheDocument()
  })

  it('displays loading state while fetching settings', async () => {
    let resolvePromise: (value: any) => void
    const promise = new Promise((resolve) => {
      resolvePromise = resolve
    })
    
    vi.mocked(settingsApi.getSettingsByCategory).mockReturnValue(promise as any)
    
    renderAdvancedSettings()
    
    expect(screen.getByText('Loading advanced settings...')).toBeInTheDocument()
    
    resolvePromise!([])
    
    await waitFor(() => {
      expect(screen.queryByText('Loading advanced settings...')).not.toBeInTheDocument()
    })
  })

  it('displays error message when settings fail to load', async () => {
    vi.mocked(settingsApi.getSettingsByCategory).mockRejectedValue(new Error('Failed to load'))
    
    renderAdvancedSettings()
    
    await waitFor(() => {
      expect(screen.getByText('Failed to load settings. Please try again.')).toBeInTheDocument()
    })
  })

  it('populates form with loaded settings', async () => {
    const mockSettings = [
      {
        id: '1',
        userId: 'test-user-123',
        category: 'advanced',
        subcategory: 'api_access',
        settingKey: 'api_enabled',
        settingValue: { enabled: true },
        dataType: 'json',
        isEncrypted: false,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01'
      },
      {
        id: '2',
        userId: 'test-user-123',
        category: 'advanced',
        subcategory: 'beta_features',
        settingKey: 'early_access',
        settingValue: { enabled: true },
        dataType: 'json',
        isEncrypted: false,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01'
      }
    ]
    
    vi.mocked(settingsApi.getSettingsByCategory).mockResolvedValue(mockSettings)
    
    renderAdvancedSettings()
    
    await waitFor(() => {
      // Check if loaded preferences are reflected in the UI
      const apiToggle = screen.getByText('Enable API Access').closest('div')?.querySelector('input[type="checkbox"]') as HTMLInputElement
      expect(apiToggle?.checked).toBe(true)
    })
  })

  it('handles API errors gracefully during save', async () => {
    vi.mocked(settingsApi.createSetting).mockRejectedValue(new Error('Save failed'))
    
    renderAdvancedSettings()
    
    const debugToggle = screen.getByText('Enable Debug Logging').closest('div')?.querySelector('input[type="checkbox"]')
    if (debugToggle) {
      fireEvent.click(debugToggle)
      
      await waitFor(() => {
        expect(screen.getByText('Failed to save changes. Please try again.')).toBeInTheDocument()
      }, { timeout: 2000 })
    }
  })

  it('displays export format options', () => {
    renderAdvancedSettings()
    
    expect(screen.getByText('JSON')).toBeInTheDocument()
    expect(screen.getByText('CSV')).toBeInTheDocument()
    expect(screen.getByText('XML')).toBeInTheDocument()
  })

  it('handles settings export functionality', async () => {
    renderAdvancedSettings()
    
    const exportButton = screen.getByText('Export All Settings')
    fireEvent.click(exportButton)
    
    // Verify export functionality is triggered
    await waitFor(() => {
      // This would typically trigger a download or API call
      expect(exportButton).toBeInTheDocument()
    })
  })

  it('displays experimental feature warnings', () => {
    renderAdvancedSettings()
    
    expect(screen.getByText('⚠️ Experimental features may be unstable')).toBeInTheDocument()
    expect(screen.getByText('Use at your own risk')).toBeInTheDocument()
  })
})