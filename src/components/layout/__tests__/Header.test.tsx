import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Header from '../Header'

const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <BrowserRouter>
    {children}
  </BrowserRouter>
)

describe('Header Component', () => {
  it('renders WanderFiz logo/brand', () => {
    render(
      <TestWrapper>
        <Header />
      </TestWrapper>
    )
    expect(screen.getByText('WanderFiz')).toBeInTheDocument()
  })

  it('renders with fixed header classes', () => {
    render(
      <TestWrapper>
        <Header />
      </TestWrapper>
    )
    const header = screen.getByRole('banner')
    expect(header).toHaveClass('fixed', 'top-0', 'left-0', 'right-0', 'z-50', 'bg-glass-light', 'backdrop-blur-lg')
  })

  it('renders desktop navigation links', () => {
    render(
      <TestWrapper>
        <Header />
      </TestWrapper>
    )
    
    // Get desktop nav links (hidden on mobile)
    const desktopNav = screen.getByRole('navigation').querySelector('.hidden.md\\:block')
    expect(desktopNav).toBeInTheDocument()
    
    // Check all navigation links exist
    expect(screen.getByRole('link', { name: 'Features' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'How It Works' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Pricing' })).toBeInTheDocument()
  })

  it('renders desktop auth buttons', () => {
    render(
      <TestWrapper>
        <Header />
      </TestWrapper>
    )
    
    // Check auth buttons exist
    expect(screen.getByRole('link', { name: 'Login' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Sign Up' })).toBeInTheDocument()
  })

  it('renders mobile menu button', () => {
    render(
      <TestWrapper>
        <Header />
      </TestWrapper>
    )
    const menuButton = screen.getByRole('button', { name: /open main menu/i })
    expect(menuButton).toBeInTheDocument()
    expect(menuButton).toHaveClass('md:hidden')
  })

  it('toggles mobile menu when hamburger is clicked', () => {
    render(
      <TestWrapper>
        <Header />
      </TestWrapper>
    )
    
    const menuButton = screen.getByRole('button', { name: /open main menu/i })
    
    // Initially mobile menu should not be visible
    expect(screen.queryByText('Features')).toBeInTheDocument() // Desktop version
    
    // Click to open mobile menu
    fireEvent.click(menuButton)
    
    // Now mobile menu should be visible with additional links
    const featuresLinks = screen.getAllByText('Features')
    expect(featuresLinks.length).toBe(2) // Desktop + mobile versions
    
    // Click to close mobile menu
    fireEvent.click(menuButton)
    
    // Mobile menu should be hidden again
    const featuresLinksAfterClose = screen.getAllByText('Features')
    expect(featuresLinksAfterClose.length).toBe(1) // Only desktop version
  })

  it('hamburger icon changes when menu is toggled', () => {
    render(
      <TestWrapper>
        <Header />
      </TestWrapper>
    )
    
    const menuButton = screen.getByRole('button', { name: /open main menu/i })
    const svg = menuButton.querySelector('svg')
    const path = svg?.querySelector('path')
    
    // Initial state (hamburger)
    expect(path).toHaveAttribute('d', 'M4 6h16M4 12h16M4 18h16')
    
    // Click to open menu (should show X)
    fireEvent.click(menuButton)
    expect(path).toHaveAttribute('d', 'M6 18L18 6M6 6l12 12')
    
    // Click to close menu (should show hamburger again)
    fireEvent.click(menuButton)
    expect(path).toHaveAttribute('d', 'M4 6h16M4 12h16M4 18h16')
  })

  it('mobile menu closes when navigation link is clicked', () => {
    render(
      <TestWrapper>
        <Header />
      </TestWrapper>
    )
    
    const menuButton = screen.getByRole('button', { name: /open main menu/i })
    
    // Open mobile menu
    fireEvent.click(menuButton)
    
    // Mobile menu should be visible
    let featuresLinks = screen.getAllByText('Features')
    expect(featuresLinks.length).toBe(2)
    
    // Click on a mobile nav link
    const mobileFeatureLink = featuresLinks[1] // Second one should be mobile
    fireEvent.click(mobileFeatureLink)
    
    // Mobile menu should close
    featuresLinks = screen.getAllByText('Features')
    expect(featuresLinks.length).toBe(1) // Only desktop version remains
  })

  it('mobile menu closes when auth link is clicked', () => {
    render(
      <TestWrapper>
        <Header />
      </TestWrapper>
    )
    
    const menuButton = screen.getByRole('button', { name: /open main menu/i })
    
    // Open mobile menu
    fireEvent.click(menuButton)
    
    // Mobile menu should be visible
    let loginLinks = screen.getAllByText('Login')
    expect(loginLinks.length).toBe(2) // Desktop + mobile
    
    // Click on mobile login link
    const mobileLoginLink = loginLinks[1] // Second one should be mobile
    fireEvent.click(mobileLoginLink)
    
    // Mobile menu should close
    loginLinks = screen.getAllByText('Login')
    expect(loginLinks.length).toBe(1) // Only desktop version remains
  })

  it('has proper navigation structure', () => {
    render(
      <TestWrapper>
        <Header />
      </TestWrapper>
    )
    const nav = screen.getByRole('navigation')
    expect(nav).toBeInTheDocument()
    expect(nav).toHaveClass('max-w-7xl', 'mx-auto', 'px-4')
  })

  it('brand link navigates to home', () => {
    render(
      <TestWrapper>
        <Header />
      </TestWrapper>
    )
    const brandLink = screen.getByRole('link', { name: /wanderfiz/i })
    expect(brandLink).toHaveAttribute('href', '/')
  })

  it('navigation links have correct hrefs', () => {
    render(
      <TestWrapper>
        <Header />
      </TestWrapper>
    )
    
    // Check desktop nav links
    const featuresLink = screen.getByRole('link', { name: 'Features' })
    const howItWorksLink = screen.getByRole('link', { name: 'How It Works' })
    const pricingLink = screen.getByRole('link', { name: 'Pricing' })
    const loginLink = screen.getByRole('link', { name: 'Login' })
    const signUpLink = screen.getByRole('link', { name: 'Sign Up' })
    
    expect(featuresLink).toHaveAttribute('href', '/features')
    expect(howItWorksLink).toHaveAttribute('href', '/how-it-works')
    expect(pricingLink).toHaveAttribute('href', '/pricing')
    expect(loginLink).toHaveAttribute('href', '/login')
    expect(signUpLink).toHaveAttribute('href', '/signup')
  })

  it('has proper styling classes', () => {
    render(
      <TestWrapper>
        <Header />
      </TestWrapper>
    )
    
    const brandElement = screen.getByText('WanderFiz')
    expect(brandElement).toHaveClass('text-2xl', 'font-bold', 'bg-gradient-to-r', 'from-primary-600', 'to-secondary-600', 'bg-clip-text', 'text-transparent')
    
    const signUpButton = screen.getByRole('link', { name: 'Sign Up' })
    expect(signUpButton).toHaveClass('bg-glass-gradient', 'backdrop-blur-md', 'border', 'border-white/20')
  })

  it('has proper accessibility attributes', () => {
    render(
      <TestWrapper>
        <Header />
      </TestWrapper>
    )
    
    const menuButton = screen.getByRole('button', { name: /open main menu/i })
    expect(menuButton).toHaveAttribute('aria-expanded', 'false')
    
    const srText = screen.getByText('Open main menu')
    expect(srText).toHaveClass('sr-only')
    
    const svg = menuButton.querySelector('svg')
    expect(svg).toHaveAttribute('aria-hidden', 'true')
  })

  it('mobile menu has proper styling when open', () => {
    render(
      <TestWrapper>
        <Header />
      </TestWrapper>
    )
    
    const menuButton = screen.getByRole('button', { name: /open main menu/i })
    fireEvent.click(menuButton)
    
    // Check mobile menu container styling
    const mobileMenu = document.querySelector('.md\\:hidden > div')
    expect(mobileMenu).toHaveClass('px-2', 'pt-2', 'pb-3', 'space-y-1', 'bg-glass-light', 'backdrop-blur-md', 'border', 'border-white/20', 'rounded-lg', 'mt-2', 'shadow-glass')
  })
})