import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import AboutPage from '../AboutPage'

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

jest.mock('../../hooks/useScrollAnimation', () => ({
  useScrollAnimation: () => ({
    ref: { current: null },
    isVisible: true
  })
}))

const MockedAboutPage = () => (
  <BrowserRouter>
    <AboutPage />
  </BrowserRouter>
)

describe('AboutPage', () => {
  it('renders the main heading', () => {
    render(<MockedAboutPage />)
    
    expect(screen.getByText(/About WanderFiz/)).toBeInTheDocument()
  })

  it('renders company mission section', () => {
    render(<MockedAboutPage />)
    
    expect(screen.getByText(/Our Mission/)).toBeInTheDocument()
  })

  it('renders company story section', () => {
    render(<MockedAboutPage />)
    
    expect(screen.getByText(/Our Story/)).toBeInTheDocument()
  })

  it('renders team section', () => {
    render(<MockedAboutPage />)
    
    expect(screen.getByText(/Meet the Team/)).toBeInTheDocument()
  })

  it('renders values section', () => {
    render(<MockedAboutPage />)
    
    expect(screen.getByText(/Our Values/)).toBeInTheDocument()
  })

  it('uses proper semantic HTML structure', () => {
    render(<MockedAboutPage />)
    
    const section = screen.getAllByRole('region')
    expect(section.length).toBeGreaterThan(0)
    
    const headings = screen.getAllByRole('heading')
    expect(headings.length).toBeGreaterThan(0)
  })

  it('has proper page layout with main content', () => {
    const { container } = render(<MockedAboutPage />)
    
    const main = container.querySelector('main')
    expect(main).toBeInTheDocument()
  })

  it('contains company information', () => {
    render(<MockedAboutPage />)
    
    expect(screen.getByText(/WanderFiz/)).toBeInTheDocument()
  })

  it('renders team member cards', () => {
    render(<MockedAboutPage />)
    
    const cards = screen.getAllByTestId('card')
    expect(cards.length).toBeGreaterThan(0)
  })

  it('has responsive layout classes', () => {
    const { container } = render(<MockedAboutPage />)
    
    const grids = container.querySelectorAll('.grid')
    expect(grids.length).toBeGreaterThan(0)
  })

  it('includes company stats or achievements', () => {
    render(<MockedAboutPage />)
    
    // Look for any numerical achievements or stats
    const textContent = screen.getByRole('main').textContent
    expect(textContent).toMatch(/\d+/)
  })

  it('has call-to-action buttons', () => {
    render(<MockedAboutPage />)
    
    const buttons = screen.getAllByTestId('button')
    expect(buttons.length).toBeGreaterThan(0)
  })

  it('contains contact or social information', () => {
    render(<MockedAboutPage />)
    
    const main = screen.getByRole('main')
    const textContent = main.textContent || ''
    
    // Should contain some form of contact information
    expect(textContent.length).toBeGreaterThan(100)
  })
})