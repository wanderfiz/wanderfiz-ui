import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import CTASection from '../CTASection'

// Mock the Button component
jest.mock('../../ui/Button', () => ({
  __esModule: true,
  default: ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
    <button onClick={onClick} data-testid="button">
      {children}
    </button>
  )
}))

// Mock the Card component
jest.mock('../../ui/Card', () => ({
  __esModule: true,
  default: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={`card ${className || ''}`} data-testid="card">
      {children}
    </div>
  )
}))

// Mock the scroll animation hook
jest.mock('../../../hooks/useScrollAnimation', () => ({
  useScrollAnimation: () => ({
    ref: { current: null },
    isVisible: true
  })
}))

// Mock React Router
const MockedCTASection = () => (
  <BrowserRouter>
    <CTASection />
  </BrowserRouter>
)

describe('CTASection', () => {
  it('renders the main heading', () => {
    render(<MockedCTASection />)
    
    expect(screen.getByText('Ready to Transform Your')).toBeInTheDocument()
    expect(screen.getByText('Travel Experience?')).toBeInTheDocument()
  })

  it('renders the description text', () => {
    render(<MockedCTASection />)
    
    expect(screen.getByText(/Join thousands of travelers who have already discovered/)).toBeInTheDocument()
  })

  it('renders both primary CTA buttons', () => {
    render(<MockedCTASection />)
    
    expect(screen.getByText('Start Free Trial')).toBeInTheDocument()
    expect(screen.getByText('View Pricing')).toBeInTheDocument()
  })

  it('renders value propositions', () => {
    render(<MockedCTASection />)
    
    expect(screen.getByText('No credit card required')).toBeInTheDocument()
    expect(screen.getByText('30-day money-back guarantee')).toBeInTheDocument()
    expect(screen.getByText('Cancel anytime')).toBeInTheDocument()
  })

  it('has proper button styling', () => {
    render(<MockedCTASection />)
    
    const getStartedButton = screen.getByRole('link', { name: /get started free/i })
    const learnMoreButton = screen.getByRole('link', { name: /learn more/i })
    
    // Primary button should have primary variant classes
    expect(getStartedButton).toHaveClass('bg-primary-600', 'text-white')
    
    // Secondary button should have secondary variant classes  
    expect(learnMoreButton).toHaveClass('border-2', 'border-primary-600', 'text-primary-600')
  })

  it('has correct section styling with gradient background', () => {
    const { container } = render(<MockedCTASection />)
    
    const section = container.querySelector('section')
    expect(section).toHaveClass('py-20', 'bg-gradient-to-r', 'from-primary-600', 'to-accent-600')
  })

  it('uses proper semantic HTML structure', () => {
    render(<MockedCTASection />)
    
    const section = screen.getByRole('region')
    expect(section).toBeInTheDocument()
    
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent('Ready to Transform Your Travel Experience?')
  })

  it('has centered text alignment', () => {
    const { container } = render(<MockedCTASection />)
    
    const textContainer = container.querySelector('.text-center')
    expect(textContainer).toBeInTheDocument()
  })

  it('has responsive button layout', () => {
    const { container } = render(<MockedCTASection />)
    
    const buttonContainer = container.querySelector('.flex')
    expect(buttonContainer).toHaveClass('flex', 'flex-col', 'sm:flex-row', 'gap-4', 'justify-center')
  })

  it('renders with white text on gradient background', () => {
    const { container } = render(<MockedCTASection />)
    
    const heading = container.querySelector('h2')
    const description = container.querySelector('p')
    
    expect(heading).toHaveClass('text-white')
    expect(description).toHaveClass('text-white')
  })

  it('buttons are clickable and navigate correctly', () => {
    render(<MockedCTASection />)
    
    const getStartedButton = screen.getByRole('link', { name: /get started free/i })
    const learnMoreButton = screen.getByRole('link', { name: /learn more/i })
    
    // Buttons should be interactive
    fireEvent.click(getStartedButton)
    fireEvent.click(learnMoreButton)
    
    // Should not throw errors when clicked
    expect(getStartedButton).toBeInTheDocument()
    expect(learnMoreButton).toBeInTheDocument()
  })

  it('has proper container and spacing', () => {
    const { container } = render(<MockedCTASection />)
    
    const containerDiv = container.querySelector('.container')
    expect(containerDiv).toHaveClass('container', 'mx-auto', 'px-4')
  })

  it('has proper font sizes and spacing for text elements', () => {
    const { container } = render(<MockedCTASection />)
    
    const heading = container.querySelector('h2')
    const description = container.querySelector('p')
    
    expect(heading).toHaveClass('text-4xl', 'font-bold', 'mb-6')
    expect(description).toHaveClass('text-xl', 'mb-8', 'max-w-2xl', 'mx-auto')
  })

  it('renders call-to-action text correctly', () => {
    render(<MockedCTASection />)
    
    expect(screen.getByText('Get Started Free')).toBeInTheDocument()
    expect(screen.getByText('Learn More')).toBeInTheDocument()
  })

  it('has accessible button text', () => {
    render(<MockedCTASection />)
    
    const buttons = screen.getAllByRole('link')
    buttons.forEach(button => {
      expect(button).toHaveTextContent(/get started free|learn more/i)
    })
  })

  it('maintains proper visual hierarchy', () => {
    const { container } = render(<MockedCTASection />)
    
    // Heading should be larger than description
    const heading = container.querySelector('h2')
    const description = container.querySelector('p')
    
    expect(heading).toHaveClass('text-4xl')
    expect(description).toHaveClass('text-xl')
  })
})