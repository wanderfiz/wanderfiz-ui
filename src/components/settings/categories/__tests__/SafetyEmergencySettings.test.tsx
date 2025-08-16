import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import SafetyEmergencySettings from '../SafetyEmergencySettings'
import { AuthProvider } from '../../../../contexts/AuthContext'
import settingsApi from '../../../../services/settingsApi'
import { vi } from 'vitest'

// Mock the settings API
vi.mock('../../../../services/settingsApi', () => ({
  default: {
    getEmergencyContacts: vi.fn(),
    createEmergencyContact: vi.fn(),
    updateEmergencyContact: vi.fn(),
    deleteEmergencyContact: vi.fn(),
    getMedicalInfo: vi.fn(),
    updateMedicalInfo: vi.fn(),
    getSettingsByCategory: vi.fn(),
    createSetting: vi.fn(),
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

const renderSafetyEmergencySettings = () => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <SafetyEmergencySettings />
      </AuthProvider>
    </BrowserRouter>
  )
}

describe('SafetyEmergencySettings', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(settingsApi.getEmergencyContacts).mockResolvedValue([])
    vi.mocked(settingsApi.getMedicalInfo).mockResolvedValue({})
    vi.mocked(settingsApi.getSettingsByCategory).mockResolvedValue([])
  })

  it('renders all safety and emergency sections', () => {
    renderSafetyEmergencySettings()
    
    expect(screen.getByText('Emergency Contacts')).toBeInTheDocument()
    expect(screen.getByText('Medical Information')).toBeInTheDocument()
    expect(screen.getByText('Insurance Information')).toBeInTheDocument()
    expect(screen.getByText('Safety Preferences')).toBeInTheDocument()
    expect(screen.getByText('Location Sharing')).toBeInTheDocument()
  })

  it('loads emergency contacts on mount', async () => {
    const mockContacts = [
      {
        id: '1',
        userId: 'test-user-123',
        name: 'John Doe',
        relationship: 'Brother',
        phone: '+1234567890',
        email: 'john@example.com',
        isPrimary: true,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01'
      }
    ]
    
    vi.mocked(settingsApi.getEmergencyContacts).mockResolvedValue(mockContacts)
    
    renderSafetyEmergencySettings()
    
    await waitFor(() => {
      expect(settingsApi.getEmergencyContacts).toHaveBeenCalledWith('test-user-123')
    })
  })

  it('displays add emergency contact form', () => {
    renderSafetyEmergencySettings()
    
    expect(screen.getByText('Add Emergency Contact')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Full name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Relationship (e.g., Mother, Friend)')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Phone number')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Email address')).toBeInTheDocument()
  })

  it('adds new emergency contact', async () => {
    vi.mocked(settingsApi.createEmergencyContact).mockResolvedValue({
      id: '2',
      userId: 'test-user-123',
      name: 'Jane Doe',
      relationship: 'Sister',
      phone: '+0987654321',
      email: 'jane@example.com',
      isPrimary: false,
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    })
    
    renderSafetyEmergencySettings()
    
    // Fill out the form
    fireEvent.change(screen.getByPlaceholderText('Full name'), {
      target: { value: 'Jane Doe' }
    })
    fireEvent.change(screen.getByPlaceholderText('Relationship (e.g., Mother, Friend)'), {
      target: { value: 'Sister' }
    })
    fireEvent.change(screen.getByPlaceholderText('Phone number'), {
      target: { value: '+0987654321' }
    })
    fireEvent.change(screen.getByPlaceholderText('Email address'), {
      target: { value: 'jane@example.com' }
    })
    
    // Submit the form
    const addButton = screen.getByText('Add Contact')
    fireEvent.click(addButton)
    
    await waitFor(() => {
      expect(settingsApi.createEmergencyContact).toHaveBeenCalledWith('test-user-123', {
        name: 'Jane Doe',
        relationship: 'Sister',
        phone: '+0987654321',
        email: 'jane@example.com',
        isPrimary: false
      })
    })
  })

  it('displays medical information form', () => {
    renderSafetyEmergencySettings()
    
    expect(screen.getByText('Allergies')).toBeInTheDocument()
    expect(screen.getByText('Medications')).toBeInTheDocument()
    expect(screen.getByText('Medical Conditions')).toBeInTheDocument()
    expect(screen.getByText('Blood Type')).toBeInTheDocument()
  })

  it('updates medical information', async () => {
    vi.mocked(settingsApi.updateMedicalInfo).mockResolvedValue({})
    
    renderSafetyEmergencySettings()
    
    const allergiesInput = screen.getByPlaceholderText('List any allergies (e.g., peanuts, shellfish)')
    fireEvent.change(allergiesInput, {
      target: { value: 'Peanuts, Shellfish' }
    })
    
    await waitFor(() => {
      expect(settingsApi.updateMedicalInfo).toHaveBeenCalledWith('test-user-123', expect.objectContaining({
        allergies: 'Peanuts, Shellfish'
      }))
    }, { timeout: 2000 })
  })

  it('displays insurance information form', () => {
    renderSafetyEmergencySettings()
    
    expect(screen.getByText('Travel Insurance Provider')).toBeInTheDocument()
    expect(screen.getByText('Policy Number')).toBeInTheDocument()
    expect(screen.getByText('Coverage Details')).toBeInTheDocument()
  })

  it('displays safety alert preferences', () => {
    renderSafetyEmergencySettings()
    
    expect(screen.getByText('Safety Alert Level')).toBeInTheDocument()
    expect(screen.getByText('Low (Major alerts only)')).toBeInTheDocument()
    expect(screen.getByText('Medium (Moderate alerts)')).toBeInTheDocument()
    expect(screen.getByText('High (All safety alerts)')).toBeInTheDocument()
  })

  it('displays location sharing preferences', () => {
    renderSafetyEmergencySettings()
    
    expect(screen.getByText('Emergency Location Sharing')).toBeInTheDocument()
    expect(screen.getByText('Real-time Location During Travel')).toBeInTheDocument()
    expect(screen.getByText('Share Itinerary with Emergency Contacts')).toBeInTheDocument()
  })

  it('displays emergency contacts list when loaded', async () => {
    const mockContacts = [
      {
        id: '1',
        userId: 'test-user-123',
        name: 'John Doe',
        relationship: 'Brother',
        phone: '+1234567890',
        email: 'john@example.com',
        isPrimary: true,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01'
      },
      {
        id: '2',
        userId: 'test-user-123',
        name: 'Jane Smith',
        relationship: 'Friend',
        phone: '+0987654321',
        email: 'jane@example.com',
        isPrimary: false,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01'
      }
    ]
    
    vi.mocked(settingsApi.getEmergencyContacts).mockResolvedValue(mockContacts)
    
    renderSafetyEmergencySettings()
    
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument()
      expect(screen.getByText('Jane Smith')).toBeInTheDocument()
      expect(screen.getByText('Brother')).toBeInTheDocument()
      expect(screen.getByText('Friend')).toBeInTheDocument()
    })
  })

  it('marks primary emergency contact', async () => {
    const mockContacts = [
      {
        id: '1',
        userId: 'test-user-123',
        name: 'John Doe',
        relationship: 'Brother',
        phone: '+1234567890',
        email: 'john@example.com',
        isPrimary: true,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01'
      }
    ]
    
    vi.mocked(settingsApi.getEmergencyContacts).mockResolvedValue(mockContacts)
    
    renderSafetyEmergencySettings()
    
    await waitFor(() => {
      expect(screen.getByText('Primary Contact')).toBeInTheDocument()
    })
  })

  it('deletes emergency contact', async () => {
    const mockContacts = [
      {
        id: '1',
        userId: 'test-user-123',
        name: 'John Doe',
        relationship: 'Brother',
        phone: '+1234567890',
        email: 'john@example.com',
        isPrimary: false,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01'
      }
    ]
    
    vi.mocked(settingsApi.getEmergencyContacts).mockResolvedValue(mockContacts)
    vi.mocked(settingsApi.deleteEmergencyContact).mockResolvedValue({})
    
    renderSafetyEmergencySettings()
    
    await waitFor(() => {
      const deleteButton = screen.getByText('Delete')
      fireEvent.click(deleteButton)
    })
    
    await waitFor(() => {
      expect(settingsApi.deleteEmergencyContact).toHaveBeenCalledWith('test-user-123', '1')
    })
  })

  it('displays loading state while fetching data', async () => {
    let resolvePromise: (value: any) => void
    const promise = new Promise((resolve) => {
      resolvePromise = resolve
    })
    
    vi.mocked(settingsApi.getEmergencyContacts).mockReturnValue(promise as any)
    
    renderSafetyEmergencySettings()
    
    expect(screen.getByText('Loading safety settings...')).toBeInTheDocument()
    
    resolvePromise!([])
    
    await waitFor(() => {
      expect(screen.queryByText('Loading safety settings...')).not.toBeInTheDocument()
    })
  })

  it('displays error message when data fails to load', async () => {
    vi.mocked(settingsApi.getEmergencyContacts).mockRejectedValue(new Error('Failed to load'))
    
    renderSafetyEmergencySettings()
    
    await waitFor(() => {
      expect(screen.getByText('Failed to load settings. Please try again.')).toBeInTheDocument()
    })
  })

  it('toggles location sharing preferences', async () => {
    vi.mocked(settingsApi.createSetting).mockResolvedValue({})
    
    renderSafetyEmergencySettings()
    
    const locationToggle = screen.getByText('Emergency Location Sharing').closest('div')?.querySelector('input[type="checkbox"]')
    if (locationToggle) {
      fireEvent.click(locationToggle)
      
      await waitFor(() => {
        expect(settingsApi.createSetting).toHaveBeenCalledWith('test-user-123', expect.objectContaining({
          category: 'safety_emergency',
          subcategory: 'location_sharing'
        }))
      }, { timeout: 2000 })
    }
  })
})