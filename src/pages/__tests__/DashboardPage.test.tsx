import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import DashboardPage from '../DashboardPage'

// Mock components
jest.mock('../../components/ui/Card', () => ({
  __esModule: true,
  default: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={`card ${className || ''}`} data-testid="card">
      {children}
    </div>
  )
}))

jest.mock('../../components/ui/Button', () => ({
  __esModule: true,
  default: ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
    <button onClick={onClick} data-testid="button">
      {children}
    </button>
  )
}))

jest.mock('../../hooks/useAuth', () => ({
  useAuth: () => ({
    user: { id: '1', name: 'Test User', email: 'test@example.com' },
    isAuthenticated: true,
    login: jest.fn(),
    logout: jest.fn(),
    register: jest.fn()
  })
}))

const MockedDashboardPage = () => (
  <BrowserRouter>
    <DashboardPage />
  </BrowserRouter>
)

describe('DashboardPage', () => {
  it('renders dashboard welcome message', () => {
    render(<MockedDashboardPage />)
    
    expect(screen.getByText(/Welcome/i)).toBeInTheDocument()
  })

  it('displays user dashboard sections', () => {
    render(<MockedDashboardPage />)
    
    // Should have multiple dashboard sections
    const cards = screen.getAllByTestId('card')
    expect(cards.length).toBeGreaterThan(1)
  })

  it('shows trips or travel-related content', () => {
    render(<MockedDashboardPage />)
    
    const main = screen.getByRole('main')
    const textContent = main.textContent || ''
    
    expect(textContent).toMatch(/trip|travel|journey|plan/i)
  })

  it('has navigation or action buttons', () => {
    render(<MockedDashboardPage />)
    
    const buttons = screen.getAllByTestId('button')
    expect(buttons.length).toBeGreaterThan(0)
  })

  it('uses proper semantic HTML structure', () => {
    render(<MockedDashboardPage />)
    
    const main = screen.getByRole('main')
    expect(main).toBeInTheDocument()
    
    const headings = screen.getAllByRole('heading')
    expect(headings.length).toBeGreaterThan(0)
  })

  it('displays user-specific content', () => {
    render(<MockedDashboardPage />)
    
    // Should show personalized content for the user
    expect(screen.getByText(/Test User|Your|My/i)).toBeInTheDocument()
  })

  it('has sidebar or navigation elements', () => {
    const { container } = render(<MockedDashboardPage />)
    
    // Dashboard typically has sidebar or nav elements
    const sidebar = container.querySelector('.sidebar') || 
                   container.querySelector('[class*="sidebar"]') ||
                   container.querySelector('.grid')
    
    expect(sidebar).toBeInTheDocument()
  })

  it('shows recent activity or quick stats', () => {
    render(<MockedDashboardPage />)
    
    const main = screen.getByRole('main')
    const textContent = main.textContent || ''
    
    // Should contain some activity or stats
    expect(textContent.length).toBeGreaterThan(100)
  })

  it('has responsive grid layout', () => {
    const { container } = render(<MockedDashboardPage />)
    
    const grids = container.querySelectorAll('.grid')
    expect(grids.length).toBeGreaterThan(0)
  })

  it('displays dashboard widgets or components', () => {
    render(<MockedDashboardPage />)
    
    // Dashboard should have multiple sections/widgets
    const headings = screen.getAllByRole('heading')
    expect(headings.length).toBeGreaterThan(1)
  })

  it('shows create or manage options', () => {
    render(<MockedDashboardPage />)
    
    const buttons = screen.getAllByTestId('button')
    const main = screen.getByRole('main')
    const textContent = main.textContent || ''
    
    expect(
      buttons.length > 0 || 
      textContent.includes('Create') || 
      textContent.includes('Manage')
    ).toBe(true)
  })

  it('has proper dashboard layout structure', () => {
    const { container } = render(<MockedDashboardPage />)
    
    // Should have some kind of layout structure
    const layoutElements = container.querySelectorAll('.flex, .grid, .container')
    expect(layoutElements.length).toBeGreaterThan(0)
  })
})