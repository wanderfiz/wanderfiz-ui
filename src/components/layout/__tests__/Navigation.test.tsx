import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Navigation from '../Navigation'

const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <BrowserRouter>
    {children}
  </BrowserRouter>
)

describe('Navigation Component', () => {
  it('renders all navigation links', () => {
    render(
      <TestWrapper>
        <Navigation />
      </TestWrapper>
    )
    expect(screen.getByText('Features')).toBeInTheDocument()
    expect(screen.getByText('How It Works')).toBeInTheDocument()
    expect(screen.getByText('Pricing')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
  })

  it('navigation links have correct hrefs', () => {
    render(
      <TestWrapper>
        <Navigation />
      </TestWrapper>
    )
    expect(screen.getByRole('link', { name: 'Features' })).toHaveAttribute('href', '/features')
    expect(screen.getByRole('link', { name: 'How It Works' })).toHaveAttribute('href', '/how-it-works')
    expect(screen.getByRole('link', { name: 'Pricing' })).toHaveAttribute('href', '/pricing')
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('href', '/about')
  })

  it('has proper navigation structure', () => {
    render(
      <TestWrapper>
        <Navigation />
      </TestWrapper>
    )
    const nav = screen.getByRole('navigation')
    expect(nav).toBeInTheDocument()
  })

  it('applies correct styling', () => {
    render(
      <TestWrapper>
        <Navigation />
      </TestWrapper>
    )
    const nav = screen.getByRole('navigation')
    expect(nav).toHaveClass('flex', 'space-x-8')
  })
})