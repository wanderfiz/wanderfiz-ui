import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import AIAssistantSettings from '../AIAssistantSettings'
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

const renderAIAssistantSettings = () => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <AIAssistantSettings />
      </AuthProvider>
    </BrowserRouter>
  )
}

describe('AIAssistantSettings', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(settingsApi.getSettingsByCategory).mockResolvedValue([])
  })

  it('renders all AI assistant setting sections', () => {
    renderAIAssistantSettings()
    
    expect(screen.getByText('Personalization Settings')).toBeInTheDocument()
    expect(screen.getByText('Natural Language Processing')).toBeInTheDocument()
    expect(screen.getByText('Trip Generation Preferences')).toBeInTheDocument()
    expect(screen.getByText('Optimization Settings')).toBeInTheDocument()
    expect(screen.getByText('Suggestion Frequency')).toBeInTheDocument()
    expect(screen.getByText('Data Usage Consent')).toBeInTheDocument()
  })

  it('loads AI assistant settings on mount', async () => {
    const mockSettings = [
      {
        id: '1',
        userId: 'test-user-123',
        category: 'ai_assistant',
        subcategory: 'personalization',
        settingKey: 'learning_enabled',
        settingValue: { enabled: true },
        dataType: 'json',
        isEncrypted: false,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01'
      }
    ]
    
    vi.mocked(settingsApi.getSettingsByCategory).mockResolvedValue(mockSettings)
    
    renderAIAssistantSettings()
    
    await waitFor(() => {
      expect(settingsApi.getSettingsByCategory).toHaveBeenCalledWith('test-user-123', 'ai_assistant')
    })
  })

  it('displays AI learning permission toggle', () => {
    renderAIAssistantSettings()
    
    expect(screen.getByText('Enable AI Learning')).toBeInTheDocument()
    expect(screen.getByText('Allow AI to learn from your preferences')).toBeInTheDocument()
  })

  it('displays recommendation style options', () => {
    renderAIAssistantSettings()
    
    expect(screen.getByText('Recommendation Style')).toBeInTheDocument()
    expect(screen.getByText('Conservative')).toBeInTheDocument()
    expect(screen.getByText('Balanced')).toBeInTheDocument()
    expect(screen.getByText('Adventurous')).toBeInTheDocument()
    expect(screen.getByText('Experimental')).toBeInTheDocument()
  })

  it('displays communication style preferences', () => {
    renderAIAssistantSettings()
    
    expect(screen.getByText('Communication Style')).toBeInTheDocument()
    expect(screen.getByText('Professional')).toBeInTheDocument()
    expect(screen.getByText('Friendly')).toBeInTheDocument()
    expect(screen.getByText('Casual')).toBeInTheDocument()
    expect(screen.getByText('Enthusiastic')).toBeInTheDocument()
  })

  it('displays trip generation default parameters', () => {
    renderAIAssistantSettings()
    
    expect(screen.getByText('Default Trip Duration')).toBeInTheDocument()
    expect(screen.getByText('Default Budget Range')).toBeInTheDocument()
    expect(screen.getByText('Adventure Level Preference')).toBeInTheDocument()
  })

  it('displays optimization preferences', () => {
    renderAIAssistantSettings()
    
    expect(screen.getByText('Route Optimization Priority')).toBeInTheDocument()
    expect(screen.getByText('Cost')).toBeInTheDocument()
    expect(screen.getByText('Time')).toBeInTheDocument()
    expect(screen.getByText('Experience')).toBeInTheDocument()
    expect(screen.getByText('Sustainability')).toBeInTheDocument()
  })

  it('displays suggestion frequency settings', () => {
    renderAIAssistantSettings()
    
    expect(screen.getByText('Suggestion Frequency')).toBeInTheDocument()
    expect(screen.getByText('Real-time')).toBeInTheDocument()
    expect(screen.getByText('Daily')).toBeInTheDocument()
    expect(screen.getByText('Weekly')).toBeInTheDocument()
    expect(screen.getByText('On-demand only')).toBeInTheDocument()
  })

  it('displays data usage consent options', () => {
    renderAIAssistantSettings()
    
    expect(screen.getByText('AI Training Data Consent')).toBeInTheDocument()
    expect(screen.getByText('Anonymous Usage Analytics')).toBeInTheDocument()
    expect(screen.getByText('Personalization Data Collection')).toBeInTheDocument()
  })

  it('toggles AI learning preference and triggers auto-save', async () => {
    vi.mocked(settingsApi.createSetting).mockResolvedValue({})
    
    renderAIAssistantSettings()
    
    const learningToggle = screen.getByText('Enable AI Learning').closest('div')?.querySelector('input[type="checkbox"]')
    if (learningToggle) {
      fireEvent.click(learningToggle)
      
      await waitFor(() => {
        expect(settingsApi.createSetting).toHaveBeenCalledWith('test-user-123', expect.objectContaining({
          category: 'ai_assistant',
          subcategory: 'personalization',
          settingKey: 'learning_enabled',
          dataType: 'json'
        }))
      }, { timeout: 2000 })
    }
  })

  it('updates recommendation style and triggers auto-save', async () => {
    vi.mocked(settingsApi.createSetting).mockResolvedValue({})
    
    renderAIAssistantSettings()
    
    const adventurousOption = screen.getByText('Adventurous')
    fireEvent.click(adventurousOption)
    
    await waitFor(() => {
      expect(settingsApi.createSetting).toHaveBeenCalledWith('test-user-123', expect.objectContaining({
        category: 'ai_assistant',
        subcategory: 'personalization',
        settingKey: 'recommendation_style',
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
    
    renderAIAssistantSettings()
    
    expect(screen.getByText('Loading AI assistant settings...')).toBeInTheDocument()
    
    resolvePromise!([])
    
    await waitFor(() => {
      expect(screen.queryByText('Loading AI assistant settings...')).not.toBeInTheDocument()
    })
  })

  it('displays error message when settings fail to load', async () => {
    vi.mocked(settingsApi.getSettingsByCategory).mockRejectedValue(new Error('Failed to load'))
    
    renderAIAssistantSettings()
    
    await waitFor(() => {
      expect(screen.getByText('Failed to load settings. Please try again.')).toBeInTheDocument()
    })
  })

  it('populates form with loaded settings', async () => {
    const mockSettings = [
      {
        id: '1',
        userId: 'test-user-123',
        category: 'ai_assistant',
        subcategory: 'personalization',
        settingKey: 'learning_enabled',
        settingValue: { enabled: true },
        dataType: 'json',
        isEncrypted: false,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01'
      },
      {
        id: '2',
        userId: 'test-user-123',
        category: 'ai_assistant',
        subcategory: 'personalization',
        settingKey: 'recommendation_style',
        settingValue: { style: 'adventurous' },
        dataType: 'json',
        isEncrypted: false,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01'
      }
    ]
    
    vi.mocked(settingsApi.getSettingsByCategory).mockResolvedValue(mockSettings)
    
    renderAIAssistantSettings()
    
    await waitFor(() => {
      // Check if loaded preferences are reflected in the UI
      const learningToggle = screen.getByText('Enable AI Learning').closest('div')?.querySelector('input[type="checkbox"]') as HTMLInputElement
      expect(learningToggle?.checked).toBe(true)
    })
  })

  it('handles API errors gracefully during save', async () => {
    vi.mocked(settingsApi.createSetting).mockRejectedValue(new Error('Save failed'))
    
    renderAIAssistantSettings()
    
    const learningToggle = screen.getByText('Enable AI Learning').closest('div')?.querySelector('input[type="checkbox"]')
    if (learningToggle) {
      fireEvent.click(learningToggle)
      
      await waitFor(() => {
        expect(screen.getByText('Failed to save changes. Please try again.')).toBeInTheDocument()
      }, { timeout: 2000 })
    }
  })

  it('displays language preferences', () => {
    renderAIAssistantSettings()
    
    expect(screen.getByText('Preferred Language')).toBeInTheDocument()
    expect(screen.getByText('Response Detail Level')).toBeInTheDocument()
  })

  it('allows customization of AI response detail', () => {
    renderAIAssistantSettings()
    
    expect(screen.getByText('Brief')).toBeInTheDocument()
    expect(screen.getByText('Detailed')).toBeInTheDocument()
    expect(screen.getByText('Comprehensive')).toBeInTheDocument()
  })

  it('displays AI model preferences', () => {
    renderAIAssistantSettings()
    
    expect(screen.getByText('AI Model Performance')).toBeInTheDocument()
    expect(screen.getByText('Fast responses')).toBeInTheDocument()
    expect(screen.getByText('Balanced')).toBeInTheDocument()
    expect(screen.getByText('High accuracy')).toBeInTheDocument()
  })
})