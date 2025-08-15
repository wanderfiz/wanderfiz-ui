import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Footer from '../Footer'

const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <BrowserRouter>
    {children}
  </BrowserRouter>
)

describe('Footer Component', () => {
  it('renders WanderFiz brand', () => {
    render(
      <TestWrapper>
        <Footer />
      </TestWrapper>
    )
    expect(screen.getByText('WanderFiz')).toBeInTheDocument()
  })

  it('renders brand description', () => {
    render(
      <TestWrapper>
        <Footer />
      </TestWrapper>
    )
    expect(screen.getByText(/Transform every journey from dream to memory/)).toBeInTheDocument()
  })

  it('renders newsletter signup section', () => {
    render(
      <TestWrapper>
        <Footer />
      </TestWrapper>
    )
    expect(screen.getByText('Stay updated')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /subscribe/i })).toBeInTheDocument()
  })

  it('renders social media links with accessibility labels', () => {
    render(
      <TestWrapper>
        <Footer />
      </TestWrapper>
    )
    
    expect(screen.getByLabelText('Twitter')).toBeInTheDocument()
    expect(screen.getByLabelText('Instagram')).toBeInTheDocument()
    expect(screen.getByLabelText('Facebook')).toBeInTheDocument()
  })

  it('renders company navigation links', () => {
    render(
      <TestWrapper>
        <Footer />
      </TestWrapper>
    )
    
    expect(screen.getByText('Company')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'About Us' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Contact' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Help Center' })).toBeInTheDocument()
  })

  it('renders legal navigation links', () => {
    render(
      <TestWrapper>
        <Footer />
      </TestWrapper>
    )
    
    expect(screen.getByText('Legal')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Privacy Policy' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Terms of Service' })).toBeInTheDocument()
  })

  it('navigation links have correct hrefs', () => {
    render(
      <TestWrapper>
        <Footer />
      </TestWrapper>
    )
    
    expect(screen.getByRole('link', { name: 'About Us' })).toHaveAttribute('href', '/about')
    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '/contact')
    expect(screen.getByRole('link', { name: 'Help Center' })).toHaveAttribute('href', '/help-center')
    expect(screen.getByRole('link', { name: 'Privacy Policy' })).toHaveAttribute('href', '/privacy-policy')
    expect(screen.getByRole('link', { name: 'Terms of Service' })).toHaveAttribute('href', '/terms-of-service')
  })

  it('renders copyright text', () => {
    render(
      <TestWrapper>
        <Footer />
      </TestWrapper>
    )
    expect(screen.getByText('© 2024 WanderFiz. All rights reserved.')).toBeInTheDocument()
  })

  it('renders tagline text', () => {
    render(
      <TestWrapper>
        <Footer />
      </TestWrapper>
    )
    expect(screen.getByText('Made with ❤️ for travelers')).toBeInTheDocument()
  })

  it('has proper semantic structure', () => {
    render(
      <TestWrapper>
        <Footer />
      </TestWrapper>
    )
    const footer = screen.getByRole('contentinfo')
    expect(footer).toBeInTheDocument()
  })

  it('has proper styling classes for footer', () => {
    render(
      <TestWrapper>
        <Footer />
      </TestWrapper>
    )
    const footer = screen.getByRole('contentinfo')
    expect(footer).toHaveClass('bg-glass-light', 'backdrop-blur-lg', 'border-t', 'border-white/20', 'mt-auto')
  })

  it('has proper grid layout structure', () => {
    render(
      <TestWrapper>
        <Footer />
      </TestWrapper>
    )
    
    // Check that grid container exists
    const gridContainer = document.querySelector('.grid.grid-cols-1.md\\:grid-cols-4')
    expect(gridContainer).toBeInTheDocument()
  })

  it('brand section has correct styling', () => {
    render(
      <TestWrapper>
        <Footer />
      </TestWrapper>
    )
    
    const brandElement = screen.getByText('WanderFiz')
    expect(brandElement).toHaveClass('text-2xl', 'font-bold', 'bg-gradient-to-r', 'from-primary-600', 'to-secondary-600', 'bg-clip-text', 'text-transparent')
  })

  it('newsletter input has proper attributes and styling', () => {
    render(
      <TestWrapper>
        <Footer />
      </TestWrapper>
    )
    
    const emailInput = screen.getByPlaceholderText('Enter your email')
    expect(emailInput).toHaveAttribute('type', 'email')
    expect(emailInput).toHaveClass('flex-1', 'px-3', 'py-2', 'bg-glass-light', 'backdrop-blur-md', 'border', 'border-white/20', 'rounded-l-lg')
  })

  it('subscribe button has proper styling', () => {
    render(
      <TestWrapper>
        <Footer />
      </TestWrapper>
    )
    
    const subscribeButton = screen.getByRole('button', { name: /subscribe/i })
    expect(subscribeButton).toHaveClass('px-4', 'py-2', 'bg-glass-gradient', 'backdrop-blur-md', 'border', 'border-white/20', 'border-l-0', 'rounded-r-lg')
  })

  it('social links have proper href attributes', () => {
    render(
      <TestWrapper>
        <Footer />
      </TestWrapper>
    )
    
    const twitterLink = screen.getByLabelText('Twitter')
    const instagramLink = screen.getByLabelText('Instagram')
    const facebookLink = screen.getByLabelText('Facebook')
    
    expect(twitterLink).toHaveAttribute('href', '#')
    expect(instagramLink).toHaveAttribute('href', '#')
    expect(facebookLink).toHaveAttribute('href', '#')
  })

  it('social links have proper hover classes', () => {
    render(
      <TestWrapper>
        <Footer />
      </TestWrapper>
    )
    
    const socialLinks = [
      screen.getByLabelText('Twitter'),
      screen.getByLabelText('Instagram'),
      screen.getByLabelText('Facebook')
    ]
    
    socialLinks.forEach(link => {
      expect(link).toHaveClass('text-gray-400', 'hover:text-primary-600', 'transition-colors', 'duration-200')
    })
  })

  it('newsletter signup can handle form interaction', () => {
    render(
      <TestWrapper>
        <Footer />
      </TestWrapper>
    )
    
    const emailInput = screen.getByPlaceholderText('Enter your email')
    const subscribeButton = screen.getByRole('button', { name: /subscribe/i })
    
    // Test input functionality
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    expect(emailInput).toHaveValue('test@example.com')
    
    // Test button click
    fireEvent.click(subscribeButton)
    // Since there's no actual handler, we just verify it doesn't crash
  })

  it('has responsive layout classes', () => {
    render(
      <TestWrapper>
        <Footer />
      </TestWrapper>
    )
    
    // Check main container responsive classes
    const container = document.querySelector('.max-w-7xl.mx-auto.py-12.px-4.sm\\:px-6.lg\\:px-8')
    expect(container).toBeInTheDocument()
    
    // Check responsive grid
    const grid = document.querySelector('.grid.grid-cols-1.md\\:grid-cols-4')
    expect(grid).toBeInTheDocument()
    
    // Check bottom section responsive classes
    const bottomSection = document.querySelector('.flex.flex-col.md\\:flex-row.justify-between.items-center')
    expect(bottomSection).toBeInTheDocument()
  })

  it('sections have proper semantic headings', () => {
    render(
      <TestWrapper>
        <Footer />
      </TestWrapper>
    )
    
    expect(screen.getByRole('heading', { name: 'Stay updated' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Company' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Legal' })).toBeInTheDocument()
  })
})