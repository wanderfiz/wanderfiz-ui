import React from 'react'
import { render, screen } from '@testing-library/react'
import LoadingSpinner from '../LoadingSpinner'

describe('LoadingSpinner Component', () => {
  it('renders with default props', () => {
    render(<LoadingSpinner />)
    const container = screen.getByRole('status')
    expect(container).toBeInTheDocument()
    expect(container).toHaveClass('flex', 'flex-col', 'items-center', 'justify-center', 'space-y-2')
    
    const svg = container.querySelector('svg')
    expect(svg).toHaveClass('animate-spin', 'w-8', 'h-8', 'text-primary-600')
  })

  it('renders with small size', () => {
    render(<LoadingSpinner size="small" />)
    const container = screen.getByRole('status')
    const svg = container.querySelector('svg')
    expect(svg).toHaveClass('w-4', 'h-4')
  })

  it('renders with medium size (default)', () => {
    render(<LoadingSpinner size="medium" />)
    const container = screen.getByRole('status')
    const svg = container.querySelector('svg')
    expect(svg).toHaveClass('w-8', 'h-8')
  })

  it('renders with large size', () => {
    render(<LoadingSpinner size="large" />)
    const container = screen.getByRole('status')
    const svg = container.querySelector('svg')
    expect(svg).toHaveClass('w-12', 'h-12')
  })

  it('renders with primary color (default)', () => {
    render(<LoadingSpinner color="primary" />)
    const container = screen.getByRole('status')
    const svg = container.querySelector('svg')
    expect(svg).toHaveClass('text-primary-600')
  })

  it('renders with secondary color', () => {
    render(<LoadingSpinner color="secondary" />)
    const container = screen.getByRole('status')
    const svg = container.querySelector('svg')
    expect(svg).toHaveClass('text-secondary-600')
  })

  it('renders with white color', () => {
    render(<LoadingSpinner color="white" />)
    const container = screen.getByRole('status')
    const svg = container.querySelector('svg')
    expect(svg).toHaveClass('text-white')
  })

  it('renders with gray color', () => {
    render(<LoadingSpinner color="gray" />)
    const container = screen.getByRole('status')
    const svg = container.querySelector('svg')
    expect(svg).toHaveClass('text-gray-600')
  })

  it('renders with text when provided', () => {
    render(<LoadingSpinner text="Loading data..." />)
    expect(screen.getByText('Loading data...')).toBeInTheDocument()
  })

  it('does not render text when not provided', () => {
    render(<LoadingSpinner />)
    const container = screen.getByRole('status')
    const text = container.querySelector('p')
    expect(text).not.toBeInTheDocument()
  })

  it('applies correct text size classes based on spinner size', () => {
    render(<LoadingSpinner size="small" text="Small loading" />)
    const text = screen.getByText('Small loading')
    expect(text).toHaveClass('text-sm')

    render(<LoadingSpinner size="medium" text="Medium loading" />)
    const mediumText = screen.getByText('Medium loading')
    expect(mediumText).toHaveClass('text-base')

    render(<LoadingSpinner size="large" text="Large loading" />)
    const largeText = screen.getByText('Large loading')
    expect(largeText).toHaveClass('text-lg')
  })

  it('applies text color matching spinner color', () => {
    render(<LoadingSpinner color="secondary" text="Colored text" />)
    const text = screen.getByText('Colored text')
    expect(text).toHaveClass('text-secondary-600')
  })

  it('applies custom className to container', () => {
    render(<LoadingSpinner className="custom-class" />)
    const container = screen.getByRole('status')
    expect(container).toHaveClass('custom-class')
  })

  it('has proper SVG structure', () => {
    render(<LoadingSpinner />)
    const container = screen.getByRole('status')
    const svg = container.querySelector('svg')
    const circle = svg?.querySelector('circle')
    const path = svg?.querySelector('path')
    
    expect(svg).toHaveAttribute('xmlns', 'http://www.w3.org/2000/svg')
    expect(svg).toHaveAttribute('fill', 'none')
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24')
    
    expect(circle).toHaveClass('opacity-25')
    expect(circle).toHaveAttribute('cx', '12')
    expect(circle).toHaveAttribute('cy', '12')
    expect(circle).toHaveAttribute('r', '10')
    expect(circle).toHaveAttribute('stroke', 'currentColor')
    expect(circle).toHaveAttribute('strokeWidth', '4')
    
    expect(path).toHaveClass('opacity-75')
    expect(path).toHaveAttribute('fill', 'currentColor')
  })

  it('combines all props correctly', () => {
    render(
      <LoadingSpinner 
        size="large" 
        color="white" 
        text="Loading content..." 
        className="custom-class" 
      />
    )
    const container = screen.getByRole('status')
    const svg = container.querySelector('svg')
    const text = screen.getByText('Loading content...')
    
    expect(container).toHaveClass('custom-class')
    expect(svg).toHaveClass('w-12', 'h-12', 'text-white')
    expect(text).toHaveClass('text-lg', 'text-white', 'font-medium')
  })
})