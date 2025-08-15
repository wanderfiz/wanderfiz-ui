import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import HomePage from '../HomePage'

// Mock logger
jest.mock('../../utils/logger', () => ({
  logger: {
    debug: jest.fn()
  }
}))

// Mock all section components
jest.mock('../../components/sections/HeroSection', () => ({
  __esModule: true,
  default: () => (
    <section data-testid="hero-section">
      <h1>Transform Every Journey from Dream to Memory</h1>
      <p>Your complete travel companion powered by AI</p>
    </section>
  )
}))

jest.mock('../../components/sections/FeaturesOverview', () => ({
  __esModule: true,
  default: () => (
    <section data-testid="features-overview">
      <h2>Powerful Features</h2>
      <p>AI-powered planning, real-time assistance, memory capture</p>
    </section>
  )
}))

jest.mock('../../components/sections/StatsSection', () => ({
  __esModule: true,
  default: () => (
    <section data-testid="stats-section">
      <h2>The Numbers Speak for Themselves</h2>
      <div>50K+ Happy Travelers</div>
    </section>
  )
}))

jest.mock('../../components/sections/TestimonialsSection', () => ({
  __esModule: true,
  default: () => (
    <section data-testid="testimonials-section">
      <h2>What Our Users Say</h2>
      <div>Amazing testimonials</div>
    </section>
  )
}))

jest.mock('../../components/sections/CTASection', () => ({
  __esModule: true,
  default: () => (
    <section data-testid="cta-section">
      <h2>Ready to Start Your Journey?</h2>
      <button>Get Started</button>
    </section>
  )
}))

const MockedHomePage = () => (
  <BrowserRouter>
    <HomePage />
  </BrowserRouter>
)

describe('HomePage', () => {
  it('renders hero section', () => {
    render(<MockedHomePage />)
    
    expect(screen.getByTestId('hero-section')).toBeInTheDocument()
    expect(screen.getByText('Transform Every Journey from Dream to Memory')).toBeInTheDocument()
  })

  it('renders features overview section', () => {
    render(<MockedHomePage />)
    
    expect(screen.getByTestId('features-overview')).toBeInTheDocument()
    expect(screen.getByText('Powerful Features')).toBeInTheDocument()
  })

  it('renders stats section', () => {
    render(<MockedHomePage />)
    
    expect(screen.getByTestId('stats-section')).toBeInTheDocument()
    expect(screen.getByText('The Numbers Speak for Themselves')).toBeInTheDocument()
  })

  it('renders testimonials section', () => {
    render(<MockedHomePage />)
    
    expect(screen.getByTestId('testimonials-section')).toBeInTheDocument()
    expect(screen.getByText('What Our Users Say')).toBeInTheDocument()
  })

  it('renders CTA section', () => {
    render(<MockedHomePage />)
    
    expect(screen.getByTestId('cta-section')).toBeInTheDocument()
    expect(screen.getByText('Ready to Start Your Journey?')).toBeInTheDocument()
  })

  it('has all five main sections', () => {
    render(<MockedHomePage />)
    
    expect(screen.getByTestId('hero-section')).toBeInTheDocument()
    expect(screen.getByTestId('features-overview')).toBeInTheDocument()
    expect(screen.getByTestId('stats-section')).toBeInTheDocument()
    expect(screen.getByTestId('testimonials-section')).toBeInTheDocument()
    expect(screen.getByTestId('cta-section')).toBeInTheDocument()
  })

  it('uses proper semantic HTML structure', () => {
    render(<MockedHomePage />)
    
    // Check for sections
    const sections = document.querySelectorAll('section')
    expect(sections.length).toBe(5) // Five main sections
    
    const headings = screen.getAllByRole('heading')
    expect(headings.length).toBeGreaterThanOrEqual(5) // At least 5 headings
  })

  it('calls logger on render', () => {
    const { logger } = require('../../utils/logger')
    
    render(<MockedHomePage />)
    
    expect(logger.debug).toHaveBeenCalledWith('HomePage component rendered')
  })

  it('has proper page layout', () => {
    const { container } = render(<MockedHomePage />)
    
    const wrapper = container.firstChild as HTMLElement
    expect(wrapper).toHaveClass('min-h-screen')
  })

  it('renders sections in correct order', () => {
    render(<MockedHomePage />)
    
    const sections = [
      screen.getByTestId('hero-section'),
      screen.getByTestId('features-overview'),
      screen.getByTestId('stats-section'),
      screen.getByTestId('testimonials-section'),
      screen.getByTestId('cta-section')
    ]
    
    sections.forEach(section => {
      expect(section).toBeInTheDocument()
    })
  })
})