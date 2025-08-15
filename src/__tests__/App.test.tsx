import React from 'react'
import { render, screen } from '@testing-library/react'
import App from '../App'

// Mock IntersectionObserver
const mockIntersectionObserver = jest.fn()
mockIntersectionObserver.mockReturnValue({
  observe: jest.fn(),
  disconnect: jest.fn(),
  unobserve: jest.fn(),
})
window.IntersectionObserver = mockIntersectionObserver

// Mock console.warn for React Router future flags
const originalWarn = console.warn
beforeAll(() => {
  console.warn = jest.fn()
})

afterAll(() => {
  console.warn = originalWarn
})

describe('App Component', () => {
  it('renders without crashing', () => {
    render(<App />)
    expect(document.body).toBeInTheDocument()
  })

  it('renders the layout with header and footer', () => {
    render(<App />)
    
    // Check for header elements
    expect(screen.getByText('WanderFiz')).toBeInTheDocument()
    
    // Check for footer elements
    const currentYear = new Date().getFullYear()
    expect(screen.getByText(`© ${currentYear} WanderFiz. All rights reserved.`)).toBeInTheDocument()
  })

  it('renders the home page by default', () => {
    render(<App />)
    
    // Check for home page content
    expect(screen.getByText(/Your AI-Powered Travel Companion/i)).toBeInTheDocument()
  })

  it('has proper router setup', () => {
    render(<App />)
    
    // Check that router is working by looking for navigation links
    expect(screen.getByRole('link', { name: 'Features' })).toHaveAttribute('href', '/features')
    expect(screen.getByRole('link', { name: 'Pricing' })).toHaveAttribute('href', '/pricing')
  })
})