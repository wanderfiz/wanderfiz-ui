import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import FeaturesOverview from '../FeaturesOverview'

// Mock the FeatureCard component
jest.mock('../../features/FeatureCard', () => ({
  __esModule: true,
  default: ({ feature }: { feature: { icon: string; name: string; description: string } }) => (
    <div data-testid="feature-card">
      <div data-testid="feature-icon">{feature.icon}</div>
      <h3>{feature.name}</h3>
      <p>{feature.description}</p>
    </div>
  )
}))

// Mock the Button component
jest.mock('../../ui/Button', () => ({
  __esModule: true,
  default: ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
    <button onClick={onClick} data-testid="button">
      {children}
    </button>
  )
}))

// Mock the scroll animation hook
jest.mock('../../../hooks/useScrollAnimation', () => ({
  useStaggeredScrollAnimation: () => ({
    containerRef: { current: null },
    isVisible: true,
    visibleItems: new Set([0, 1, 2, 3, 4])
  })
}))

// Mock the features types
jest.mock('../../../types/features', () => ({
  FEATURES: [
    {
      id: 'planning',
      name: 'AI Planning',
      description: 'Smart trip planning',
      icon: '🤖',
      category: { id: 'planning', name: 'Planning' }
    },
    {
      id: 'navigation',
      name: 'Navigation',
      description: 'Real-time navigation',
      icon: '🧭',
      category: { id: 'navigation', name: 'Navigation' }
    },
    {
      id: 'memory',
      name: 'Memory Capture',
      description: 'Capture memories',
      icon: '📸',
      category: { id: 'memory', name: 'Memory' }
    }
  ],
  FEATURE_CATEGORIES: [
    { id: 'planning', name: 'Planning', description: 'Trip planning tools', icon: '🗺️' },
    { id: 'navigation', name: 'Navigation', description: 'Navigation assistance', icon: '🧭' },
    { id: 'memory', name: 'Memory', description: 'Memory capture', icon: '📸' }
  ]
}))

const MockedFeaturesOverview = () => (
  <BrowserRouter>
    <FeaturesOverview />
  </BrowserRouter>
)

describe('FeaturesOverview', () => {
  it('renders the main section heading', () => {
    render(<MockedFeaturesOverview />)
    
    expect(screen.getByText('Everything You Need for')).toBeInTheDocument()
    expect(screen.getByText('Perfect Trips')).toBeInTheDocument()
  })

  it('renders the section description', () => {
    render(<MockedFeaturesOverview />)
    
    expect(screen.getByText(/From AI-powered planning to real-time navigation/)).toBeInTheDocument()
  })

  it('renders feature cards', () => {
    render(<MockedFeaturesOverview />)
    
    const featureCards = screen.getAllByTestId('feature-card')
    expect(featureCards.length).toBeGreaterThan(0)
  })

  it('displays feature names correctly', () => {
    render(<MockedFeaturesOverview />)
    
    expect(screen.getByText('AI Planning')).toBeInTheDocument()
    expect(screen.getByText('Navigation')).toBeInTheDocument()
    expect(screen.getByText('Memory Capture')).toBeInTheDocument()
  })

  it('displays feature descriptions', () => {
    render(<MockedFeaturesOverview />)
    
    expect(screen.getByText('Smart trip planning')).toBeInTheDocument()
    expect(screen.getByText('Real-time navigation')).toBeInTheDocument()
    expect(screen.getByText('Capture memories')).toBeInTheDocument()
  })

  it('displays feature icons', () => {
    render(<MockedFeaturesOverview />)
    
    const icons = screen.getAllByTestId('feature-icon')
    expect(icons.length).toBeGreaterThan(0)
  })

  it('renders explore by category section', () => {
    render(<MockedFeaturesOverview />)
    
    expect(screen.getByText('Explore by Category')).toBeInTheDocument()
  })

  it('renders why choose section', () => {
    render(<MockedFeaturesOverview />)
    
    expect(screen.getByText('Why Choose WanderFiz?')).toBeInTheDocument()
  })

  it('displays quick benefits', () => {
    render(<MockedFeaturesOverview />)
    
    expect(screen.getByText('90% Faster')).toBeInTheDocument()
    expect(screen.getByText('Personalized')).toBeInTheDocument()
    expect(screen.getByText('195+ Countries')).toBeInTheDocument()
    expect(screen.getByText('Offline Ready')).toBeInTheDocument()
  })

  it('renders CTA buttons', () => {
    render(<MockedFeaturesOverview />)
    
    const buttons = screen.getAllByTestId('button')
    expect(buttons.length).toBeGreaterThan(0)
  })

  it('has correct section styling', () => {
    const { container } = render(<MockedFeaturesOverview />)
    
    const section = container.querySelector('section')
    expect(section).toHaveClass('py-20', 'bg-section-gradient')
  })

  it('uses proper semantic HTML structure', () => {
    render(<MockedFeaturesOverview />)
    
    const section = screen.getByRole('region')
    expect(section).toBeInTheDocument()
    
    const mainHeading = screen.getByRole('heading', { level: 2 })
    expect(mainHeading).toBeInTheDocument()
  })

  it('has responsive grid layout classes', () => {
    const { container } = render(<MockedFeaturesOverview />)
    
    const grids = container.querySelectorAll('.grid')
    expect(grids.length).toBeGreaterThan(0)
  })

  it('renders with proper max-width container', () => {
    const { container } = render(<MockedFeaturesOverview />)
    
    const containerDiv = container.querySelector('.max-w-7xl')
    expect(containerDiv).toHaveClass('max-w-7xl', 'mx-auto', 'px-4')
  })

  it('displays benefit icons correctly', () => {
    render(<MockedFeaturesOverview />)
    
    expect(screen.getByText('⚡')).toBeInTheDocument()
    expect(screen.getByText('🎯')).toBeInTheDocument()
    expect(screen.getByText('🌍')).toBeInTheDocument()
    expect(screen.getByText('📱')).toBeInTheDocument()
  })

  it('renders CTA section', () => {
    render(<MockedFeaturesOverview />)
    
    expect(screen.getByText('Ready to experience the future of travel?')).toBeInTheDocument()
    expect(screen.getByText(/Join thousands of travelers who have already transformed/)).toBeInTheDocument()
  })
})