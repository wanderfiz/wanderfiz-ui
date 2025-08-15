import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Card from '../Card'

describe('Card Component', () => {
  it('renders with default props', () => {
    render(<Card>Card content</Card>)
    const card = screen.getByText('Card content')
    expect(card.parentElement).toHaveClass('bg-white', 'border', 'border-gray-200', 'shadow-sm', 'rounded-lg', 'p-6')
  })

  it('renders with glass variant', () => {
    render(<Card variant="glass">Glass card</Card>)
    const card = screen.getByText('Glass card')
    expect(card.parentElement).toHaveClass('bg-glass-light', 'backdrop-blur-lg', 'border', 'border-white/20', 'shadow-glass')
  })

  it('renders with feature variant', () => {
    render(<Card variant="feature">Feature card</Card>)
    const card = screen.getByText('Feature card')
    expect(card.parentElement).toHaveClass('bg-glass-gradient', 'backdrop-blur-md', 'border', 'border-white/20', 'shadow-glass-sm')
  })

  it('renders with pricing variant', () => {
    render(<Card variant="pricing">Pricing card</Card>)
    const card = screen.getByText('Pricing card')
    expect(card.parentElement).toHaveClass('bg-glass-light', 'backdrop-blur-lg', 'border', 'border-white/20', 'shadow-glass-lg')
  })

  it('applies hover effect when hover prop is true', () => {
    render(<Card hover>Hover card</Card>)
    const card = screen.getByText('Hover card')
    expect(card.parentElement).toHaveClass('hover:scale-105', 'hover:shadow-glass-lg', 'cursor-pointer')
  })

  it('does not apply hover effect when hover prop is false', () => {
    render(<Card hover={false}>No hover card</Card>)
    const card = screen.getByText('No hover card')
    expect(card.parentElement).not.toHaveClass('hover:scale-105', 'hover:shadow-glass-lg', 'cursor-pointer')
  })

  it('applies small padding', () => {
    render(<Card padding="small">Small padding</Card>)
    const card = screen.getByText('Small padding')
    expect(card.parentElement).toHaveClass('p-4')
  })

  it('applies medium padding (default)', () => {
    render(<Card padding="medium">Medium padding</Card>)
    const card = screen.getByText('Medium padding')
    expect(card.parentElement).toHaveClass('p-6')
  })

  it('applies large padding', () => {
    render(<Card padding="large">Large padding</Card>)
    const card = screen.getByText('Large padding')
    expect(card.parentElement).toHaveClass('p-8')
  })

  it('applies no padding', () => {
    render(<Card padding="none">No padding</Card>)
    const card = screen.getByText('No padding')
    expect(card.parentElement).not.toHaveClass('p-4', 'p-6', 'p-8')
  })

  it('handles click events when onClick is provided', () => {
    const handleClick = jest.fn()
    render(<Card onClick={handleClick}>Clickable card</Card>)
    const card = screen.getByText('Clickable card').parentElement
    fireEvent.click(card!)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('does not handle click events when onClick is not provided', () => {
    render(<Card>Non-clickable card</Card>)
    const card = screen.getByText('Non-clickable card').parentElement
    // Should not throw error when clicked
    fireEvent.click(card!)
  })

  it('applies custom className', () => {
    render(<Card className="custom-class">Custom card</Card>)
    const card = screen.getByText('Custom card')
    expect(card.parentElement).toHaveClass('custom-class')
  })

  it('renders children correctly', () => {
    render(
      <Card>
        <div>Child 1</div>
        <div>Child 2</div>
      </Card>
    )
    expect(screen.getByText('Child 1')).toBeInTheDocument()
    expect(screen.getByText('Child 2')).toBeInTheDocument()
  })

  it('combines all props correctly', () => {
    const handleClick = jest.fn()
    render(
      <Card 
        variant="glass" 
        hover 
        padding="large" 
        className="custom-class" 
        onClick={handleClick}
      >
        Complex card
      </Card>
    )
    const card = screen.getByText('Complex card').parentElement
    expect(card).toHaveClass(
      'bg-glass-light', 
      'backdrop-blur-lg', 
      'hover:scale-105', 
      'p-8', 
      'custom-class'
    )
    
    fireEvent.click(card!)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('has proper transition classes', () => {
    render(<Card>Transition card</Card>)
    const card = screen.getByText('Transition card')
    expect(card.parentElement).toHaveClass('transition-all', 'duration-200')
  })
})