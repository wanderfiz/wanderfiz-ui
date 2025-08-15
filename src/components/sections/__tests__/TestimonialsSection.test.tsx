import React from 'react'
import { render, screen } from '@testing-library/react'
import TestimonialsSection from '../TestimonialsSection'

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

// Mock the constants
jest.mock('../../../utils/constants', () => ({
  TESTIMONIALS: [
    {
      id: '1',
      name: 'Sarah Johnson',
      role: 'Travel Blogger',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b2e9f52a',
      rating: 5,
      content: 'WanderFiz completely transformed how I plan my trips. The AI recommendations were spot-on!',
      location: 'New York, USA'
    },
    {
      id: '2',
      name: 'Miguel Rodriguez',
      role: 'Adventure Photographer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
      rating: 5,
      content: 'As someone who travels for work, WanderFiz helps me discover hidden gems in every city.',
      location: 'Barcelona, Spain'
    },
    {
      id: '3',
      name: 'Emily Chen',
      role: 'Digital Nomad',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
      rating: 5,
      content: 'The real-time assistance feature saved my Tokyo trip when my flights got cancelled.',
      location: 'Singapore'
    }
  ]
}))

describe('TestimonialsSection', () => {
  it('renders the section heading', () => {
    render(<TestimonialsSection />)
    
    expect(screen.getByText('Loved by')).toBeInTheDocument()
    expect(screen.getByText('Travelers Worldwide')).toBeInTheDocument()
  })

  it('renders the section description', () => {
    render(<TestimonialsSection />)
    
    expect(screen.getByText(/Join thousands of satisfied travelers who have transformed/)).toBeInTheDocument()
  })

  it('renders all testimonials', () => {
    render(<TestimonialsSection />)
    
    expect(screen.getByText('Sarah Johnson')).toBeInTheDocument()
    expect(screen.getByText('Miguel Rodriguez')).toBeInTheDocument()
    expect(screen.getByText('Emily Chen')).toBeInTheDocument()
  })

  it('displays testimonial roles', () => {
    render(<TestimonialsSection />)
    
    expect(screen.getByText('Travel Blogger')).toBeInTheDocument()
    expect(screen.getByText('Adventure Photographer')).toBeInTheDocument()
    expect(screen.getByText('Digital Nomad')).toBeInTheDocument()
  })

  it('displays testimonial locations', () => {
    render(<TestimonialsSection />)
    
    expect(screen.getByText('New York, USA')).toBeInTheDocument()
    expect(screen.getByText('Barcelona, Spain')).toBeInTheDocument()
    expect(screen.getByText('Singapore')).toBeInTheDocument()
  })

  it('displays testimonial content', () => {
    render(<TestimonialsSection />)
    
    expect(screen.getByText(/WanderFiz completely transformed how I plan my trips/)).toBeInTheDocument()
    expect(screen.getByText(/As someone who travels for work/)).toBeInTheDocument()
    expect(screen.getByText(/The real-time assistance feature saved my Tokyo trip/)).toBeInTheDocument()
  })

  it('renders star ratings for each testimonial', () => {
    render(<TestimonialsSection />)
    
    // Each testimonial should have 5 stars (★ characters)
    const stars = screen.getAllByText('★')
    expect(stars).toHaveLength(15) // 3 testimonials × 5 stars each
  })

  it('renders avatar images with correct attributes', () => {
    render(<TestimonialsSection />)
    
    const images = screen.getAllByRole('img')
    expect(images).toHaveLength(3)
    
    images.forEach(img => {
      expect(img).toHaveAttribute('src')
      expect(img).toHaveAttribute('alt')
      expect(img).toHaveClass('w-16', 'h-16', 'rounded-full', 'object-cover')
    })
  })

  it('has correct section styling', () => {
    const { container } = render(<TestimonialsSection />)
    
    const section = container.querySelector('section')
    expect(section).toHaveClass('py-20', 'bg-white')
  })

  it('uses proper semantic HTML structure', () => {
    render(<TestimonialsSection />)
    
    const section = screen.getByRole('region')
    expect(section).toBeInTheDocument()
    
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent('What Our Travelers Say')
  })

  it('has responsive grid layout', () => {
    const { container } = render(<TestimonialsSection />)
    
    const grid = container.querySelector('.grid')
    expect(grid).toHaveClass('grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3', 'gap-8')
  })

  it('renders testimonial cards with glass effect', () => {
    const { container } = render(<TestimonialsSection />)
    
    const cards = container.querySelectorAll('[class*="bg-glass-gradient"]')
    expect(cards.length).toBeGreaterThan(0)
  })

  it('displays rating as number and stars', () => {
    render(<TestimonialsSection />)
    
    // Should display both numeric rating (5.0) and star symbols
    const ratingTexts = screen.getAllByText('5.0')
    expect(ratingTexts).toHaveLength(3)
  })

  it('renders testimonials in correct order', () => {
    const { container } = render(<TestimonialsSection />)
    
    const testimonialCards = container.querySelectorAll('.grid > div')
    expect(testimonialCards).toHaveLength(3)
    
    // Check that Sarah Johnson appears first
    expect(testimonialCards[0]).toHaveTextContent('Sarah Johnson')
    expect(testimonialCards[1]).toHaveTextContent('Miguel Rodriguez')
    expect(testimonialCards[2]).toHaveTextContent('Emily Chen')
  })

  it('handles empty testimonials gracefully', () => {
    // Mock empty testimonials
    jest.doMock('../../../utils/constants', () => ({
      TESTIMONIALS: []
    }))
    
    const { container } = render(<TestimonialsSection />)
    
    const grid = container.querySelector('.grid')
    expect(grid?.children).toHaveLength(0)
  })

  it('has proper text styling for names and roles', () => {
    const { container } = render(<TestimonialsSection />)
    
    const names = container.querySelectorAll('h4')
    names.forEach(name => {
      expect(name).toHaveClass('text-lg', 'font-semibold', 'text-gray-900')
    })
  })
})