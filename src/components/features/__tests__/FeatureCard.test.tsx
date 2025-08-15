import React from 'react'
import { render, screen } from '@testing-library/react'
import FeatureCard from '../FeatureCard'

// Mock the Card component
jest.mock('../../ui/Card', () => ({
  __esModule: true,
  default: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={`card ${className || ''}`} data-testid="card">
      {children}
    </div>
  )
}))

describe('FeatureCard', () => {
  const mockFeature = {
    id: 'test-feature',
    name: 'Test Feature',
    description: 'This is a test feature description',
    icon: '🚀',
    category: {
      id: 'test-category',
      name: 'Test Category',
      description: 'Test category description',
      icon: '📁'
    },
    benefits: ['Benefit 1', 'Benefit 2', 'Benefit 3'],
    availability: ['free', 'premium']
  }

  it('renders with required props', () => {
    render(<FeatureCard feature={mockFeature} />)
    
    expect(screen.getByText('Test Feature')).toBeInTheDocument()
    expect(screen.getByText('This is a test feature description')).toBeInTheDocument()
    expect(screen.getByText('🚀')).toBeInTheDocument()
  })

  it('displays the name correctly', () => {
    const customFeature = { ...mockFeature, name: 'Custom Feature Name' }
    render(<FeatureCard feature={customFeature} />)
    
    expect(screen.getByText('Custom Feature Name')).toBeInTheDocument()
  })

  it('displays the description correctly', () => {
    const customFeature = { ...mockFeature, description: 'Custom description for testing purposes' }
    render(<FeatureCard feature={customFeature} />)
    
    expect(screen.getByText('Custom description for testing purposes')).toBeInTheDocument()
  })

  it('displays the icon correctly', () => {
    const customFeature = { ...mockFeature, icon: '⭐' }
    render(<FeatureCard feature={customFeature} />)
    
    expect(screen.getByText('⭐')).toBeInTheDocument()
  })

  it('renders benefits when provided', () => {
    render(<FeatureCard feature={mockFeature} />)
    
    expect(screen.getByText('Benefit 1')).toBeInTheDocument()
    expect(screen.getByText('Benefit 2')).toBeInTheDocument()
    expect(screen.getByText('Benefit 3')).toBeInTheDocument()
  })

  it('renders availability tags', () => {
    render(<FeatureCard feature={mockFeature} />)
    
    expect(screen.getByText('free')).toBeInTheDocument()
    expect(screen.getByText('premium')).toBeInTheDocument()
  })

  it('renders compact variant correctly', () => {
    render(<FeatureCard feature={mockFeature} variant="compact" />)
    
    expect(screen.getByText('Test Feature')).toBeInTheDocument()
    expect(screen.getByText('This is a test feature description')).toBeInTheDocument()
    expect(screen.getByText('🚀')).toBeInTheDocument()
  })

  it('renders detailed variant correctly', () => {
    render(<FeatureCard feature={mockFeature} variant="detailed" />)
    
    expect(screen.getByText('Test Feature')).toBeInTheDocument()
    expect(screen.getByText('This is a test feature description')).toBeInTheDocument()
    expect(screen.getByText('🚀')).toBeInTheDocument()
    expect(screen.getByText('Key Benefits:')).toBeInTheDocument()
  })

  it('renders default variant correctly', () => {
    render(<FeatureCard feature={mockFeature} variant="default" />)
    
    expect(screen.getByText('Test Feature')).toBeInTheDocument()
    expect(screen.getByText('This is a test feature description')).toBeInTheDocument()
    expect(screen.getByText('🚀')).toBeInTheDocument()
  })

  it('uses semantic HTML structure', () => {
    render(<FeatureCard feature={mockFeature} />)
    
    const heading = screen.getByRole('heading', { level: 3 })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent('Test Feature')
  })

  it('applies custom className', () => {
    const customClass = 'custom-feature-card'
    const { container } = render(<FeatureCard feature={mockFeature} className={customClass} />)
    
    const card = container.querySelector('.card')
    expect(card).toHaveClass(customClass)
  })

  it('handles feature without benefits', () => {
    const featureWithoutBenefits = { ...mockFeature, benefits: [] }
    render(<FeatureCard feature={featureWithoutBenefits} />)
    
    expect(screen.getByText('Test Feature')).toBeInTheDocument()
    expect(screen.queryByText('Key Benefits:')).not.toBeInTheDocument()
  })

  it('handles long feature names correctly', () => {
    const longNameFeature = { ...mockFeature, name: 'This is a very long feature name that should wrap properly' }
    render(<FeatureCard feature={longNameFeature} />)
    
    expect(screen.getByText('This is a very long feature name that should wrap properly')).toBeInTheDocument()
  })

  it('handles long descriptions correctly', () => {
    const longDescFeature = { 
      ...mockFeature, 
      description: 'This is a very long description that contains multiple sentences and should wrap properly within the card container. It should maintain proper line spacing and readability throughout the entire text block.'
    }
    render(<FeatureCard feature={longDescFeature} />)
    
    expect(screen.getByText(longDescFeature.description)).toBeInTheDocument()
  })

  it('handles special characters in name', () => {
    const specialNameFeature = { ...mockFeature, name: 'Feature with "quotes" & symbols!' }
    render(<FeatureCard feature={specialNameFeature} />)
    
    expect(screen.getByText('Feature with "quotes" & symbols!')).toBeInTheDocument()
  })

  it('handles emoji icons correctly', () => {
    const emojiFeature = { ...mockFeature, icon: '🎯🚀⭐' }
    render(<FeatureCard feature={emojiFeature} />)
    
    expect(screen.getByText('🎯🚀⭐')).toBeInTheDocument()
  })

  it('renders checkmarks for benefits', () => {
    render(<FeatureCard feature={mockFeature} />)
    
    const checkmarks = screen.getAllByText('✓')
    expect(checkmarks.length).toBeGreaterThan(0)
  })

  it('limits benefits shown in default variant', () => {
    const manyBenefitsFeature = {
      ...mockFeature,
      benefits: ['Benefit 1', 'Benefit 2', 'Benefit 3', 'Benefit 4', 'Benefit 5']
    }
    render(<FeatureCard feature={manyBenefitsFeature} variant="default" />)
    
    // Default variant should only show first 3 benefits
    expect(screen.getByText('Benefit 1')).toBeInTheDocument()
    expect(screen.getByText('Benefit 2')).toBeInTheDocument()
    expect(screen.getByText('Benefit 3')).toBeInTheDocument()
    expect(screen.queryByText('Benefit 4')).not.toBeInTheDocument()
  })

  it('shows all benefits in detailed variant', () => {
    const manyBenefitsFeature = {
      ...mockFeature,
      benefits: ['Benefit 1', 'Benefit 2', 'Benefit 3', 'Benefit 4', 'Benefit 5']
    }
    render(<FeatureCard feature={manyBenefitsFeature} variant="detailed" />)
    
    // Detailed variant should show all benefits
    expect(screen.getByText('Benefit 1')).toBeInTheDocument()
    expect(screen.getByText('Benefit 2')).toBeInTheDocument()
    expect(screen.getByText('Benefit 3')).toBeInTheDocument()
    expect(screen.getByText('Benefit 4')).toBeInTheDocument()
    expect(screen.getByText('Benefit 5')).toBeInTheDocument()
  })

  it('maintains accessibility', () => {
    render(<FeatureCard feature={mockFeature} />)
    
    const heading = screen.getByRole('heading', { level: 3 })
    expect(heading).toHaveAccessibleName('Test Feature')
  })
})