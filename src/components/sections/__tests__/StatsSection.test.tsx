import React from 'react'
import { render, screen } from '@testing-library/react'
import StatsSection from '../StatsSection'

// Mock the Card component
jest.mock('../../ui/Card', () => ({
  __esModule: true,
  default: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={`card ${className || ''}`} data-testid="card">
      {children}
    </div>
  )
}))

// Mock the scroll animation hooks
jest.mock('../../../hooks/useScrollAnimation', () => ({
  useCounterAnimation: jest.fn((target: number) => ({
    ref: { current: null },
    currentValue: target
  })),
  useStaggeredScrollAnimation: jest.fn(() => ({
    containerRef: { current: null },
    isVisible: true,
    visibleItems: new Set([0, 1, 2, 3])
  }))
}))

// Mock the constants
jest.mock('../../../utils/constants', () => ({
  STATS: {
    users: '50,000+',
    trips: '250,000+',
    countries: '195',
    satisfaction: '98%'
  }
}))

describe('StatsSection', () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks()
  })

  it('renders the section heading', () => {
    render(<StatsSection />)
    
    expect(screen.getByText('The Numbers Speak for')).toBeInTheDocument()
    expect(screen.getByText('Themselves')).toBeInTheDocument()
  })

  it('renders all stat labels', () => {
    render(<StatsSection />)
    
    expect(screen.getByText('Happy Travelers')).toBeInTheDocument()
    expect(screen.getByText('Trips Planned')).toBeInTheDocument()
    expect(screen.getByText('Countries')).toBeInTheDocument()
    expect(screen.getByText('Satisfaction')).toBeInTheDocument()
  })

  it('displays stat values from constants', () => {
    render(<StatsSection />)
    
    expect(screen.getByText('50,000+')).toBeInTheDocument()
    expect(screen.getByText('250,000+')).toBeInTheDocument()
    expect(screen.getByText('195')).toBeInTheDocument()
    expect(screen.getByText('98%')).toBeInTheDocument()
  })

  it('has correct section styling', () => {
    const { container } = render(<StatsSection />)
    
    const section = container.querySelector('section')
    expect(section).toHaveClass('py-16', 'bg-primary-600')
  })

  it('uses white text on primary background', () => {
    const { container } = render(<StatsSection />)
    
    const heading = container.querySelector('h2')
    expect(heading).toHaveClass('text-white')
    
    const statValues = container.querySelectorAll('.text-4xl')
    statValues.forEach(value => {
      expect(value).toHaveClass('text-white')
    })
    
    const statLabels = container.querySelectorAll('.text-primary-100')
    expect(statLabels.length).toBeGreaterThan(0)
  })

  it('uses proper semantic HTML structure', () => {
    render(<StatsSection />)
    
    const section = screen.getByRole('region')
    expect(section).toBeInTheDocument()
    
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent('Trusted by Travelers Worldwide')
  })

  it('has responsive grid layout', () => {
    const { container } = render(<StatsSection />)
    
    const grid = container.querySelector('.grid')
    expect(grid).toHaveClass('grid', 'grid-cols-2', 'lg:grid-cols-4', 'gap-8')
  })

  it('centers content and text', () => {
    const { container } = render(<StatsSection />)
    
    const textCenter = container.querySelector('.text-center')
    expect(textCenter).toBeInTheDocument()
    
    const statItems = container.querySelectorAll('.text-center')
    expect(statItems.length).toBeGreaterThan(1) // Multiple centered elements
  })

  it('has proper container and spacing', () => {
    const { container } = render(<StatsSection />)
    
    const containerDiv = container.querySelector('.container')
    expect(containerDiv).toHaveClass('container', 'mx-auto', 'px-4')
  })

  it('renders stats in correct order', () => {
    const { container } = render(<StatsSection />)
    
    const statItems = container.querySelectorAll('.grid > div')
    expect(statItems).toHaveLength(4)
    
    // Check order based on labels
    expect(statItems[0]).toHaveTextContent('Happy Travelers')
    expect(statItems[1]).toHaveTextContent('Trips Planned')
    expect(statItems[2]).toHaveTextContent('Countries Covered')
    expect(statItems[3]).toHaveTextContent('Satisfaction Rate')
  })

  it('has proper font sizes for stats', () => {
    const { container } = render(<StatsSection />)
    
    const heading = container.querySelector('h2')
    expect(heading).toHaveClass('text-3xl', 'font-bold', 'mb-12')
    
    const statValues = container.querySelectorAll('.text-4xl')
    expect(statValues).toHaveLength(4)
    statValues.forEach(value => {
      expect(value).toHaveClass('text-4xl', 'font-bold', 'mb-2')
    })
  })

  it('uses counter animation for numeric stats', () => {
    const { useCounterAnimation } = require('../../../hooks/useCounterAnimation')
    
    render(<StatsSection />)
    
    // Should call useCounterAnimation for numeric values
    expect(useCounterAnimation).toHaveBeenCalledWith(50000)
    expect(useCounterAnimation).toHaveBeenCalledWith(250000)
    expect(useCounterAnimation).toHaveBeenCalledWith(195)
    expect(useCounterAnimation).toHaveBeenCalledWith(98)
  })

  it('handles stat parsing correctly', () => {
    render(<StatsSection />)
    
    // Should display formatted numbers
    expect(screen.getByText('50,000+')).toBeInTheDocument()
    expect(screen.getByText('250,000+')).toBeInTheDocument()
    expect(screen.getByText('195')).toBeInTheDocument()
    expect(screen.getByText('98%')).toBeInTheDocument()
  })

  it('maintains visual consistency across stat items', () => {
    const { container } = render(<StatsSection />)
    
    const statItems = container.querySelectorAll('.grid > div')
    
    statItems.forEach(item => {
      // Each stat item should have the same structure
      const value = item.querySelector('.text-4xl')
      const label = item.querySelector('.text-primary-100')
      
      expect(value).toBeInTheDocument()
      expect(label).toBeInTheDocument()
    })
  })

  it('displays meaningful stat descriptions', () => {
    render(<StatsSection />)
    
    const labels = [
      'Happy Travelers',
      'Trips Planned', 
      'Countries Covered',
      'Satisfaction Rate'
    ]
    
    labels.forEach(label => {
      expect(screen.getByText(label)).toBeInTheDocument()
    })
  })
})