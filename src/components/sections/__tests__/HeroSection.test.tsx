import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import HeroSection from '../HeroSection'

// Mock useNavigate hook
const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}))

// Mock useScrollAnimation hook
jest.mock('../../../hooks/useScrollAnimation', () => ({
  useScrollAnimation: () => ({
    ref: jest.fn(),
    isVisible: true
  })
}))

const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <BrowserRouter>
    {children}
  </BrowserRouter>
)

describe('HeroSection Component', () => {
  beforeEach(() => {
    mockNavigate.mockClear()
  })

  it('renders main heading with gradient text', () => {
    render(
      <TestWrapper>
        <HeroSection />
      </TestWrapper>
    )
    
    expect(screen.getByText('Transform Every')).toBeInTheDocument()
    expect(screen.getByText('Journey')).toBeInTheDocument()
    expect(screen.getByText('from Dream to')).toBeInTheDocument()
    expect(screen.getByText('Memory')).toBeInTheDocument()
  })

  it('renders company description from constants', () => {
    render(
      <TestWrapper>
        <HeroSection />
      </TestWrapper>
    )
    
    expect(screen.getByText(/AI-powered trip planning, real-time assistance/)).toBeInTheDocument()
  })

  it('renders CTA buttons', () => {
    render(
      <TestWrapper>
        <HeroSection />
      </TestWrapper>
    )
    
    expect(screen.getByRole('button', { name: /start your journey/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /explore features/i })).toBeInTheDocument()
  })

  it('navigates to signup when Start Your Journey is clicked', () => {
    render(
      <TestWrapper>
        <HeroSection />
      </TestWrapper>
    )
    
    const startButton = screen.getByRole('button', { name: /start your journey/i })
    fireEvent.click(startButton)
    
    expect(mockNavigate).toHaveBeenCalledWith('/signup')
  })

  it('navigates to features when Explore Features is clicked', () => {
    render(
      <TestWrapper>
        <HeroSection />
      </TestWrapper>
    )
    
    const exploreButton = screen.getByRole('button', { name: /explore features/i })
    fireEvent.click(exploreButton)
    
    expect(mockNavigate).toHaveBeenCalledWith('/features')
  })

  it('renders feature highlights cards', () => {
    render(
      <TestWrapper>
        <HeroSection />
      </TestWrapper>
    )
    
    expect(screen.getByText('AI-Powered Planning')).toBeInTheDocument()
    expect(screen.getByText('Real-Time Assistant')).toBeInTheDocument()
    expect(screen.getByText('Memory Capture')).toBeInTheDocument()
    
    expect(screen.getByText(/Generate perfect itineraries in seconds/)).toBeInTheDocument()
    expect(screen.getByText(/Navigate with confidence using live updates/)).toBeInTheDocument()
    expect(screen.getByText(/Automatically organize photos and create beautiful/)).toBeInTheDocument()
  })

  it('renders feature icons', () => {
    render(
      <TestWrapper>
        <HeroSection />
      </TestWrapper>
    )
    
    expect(screen.getByText('🗺️')).toBeInTheDocument()
    expect(screen.getByText('📱')).toBeInTheDocument()
    expect(screen.getByText('📸')).toBeInTheDocument()
  })

  it('renders trust indicators with statistics', () => {
    render(
      <TestWrapper>
        <HeroSection />
      </TestWrapper>
    )
    
    expect(screen.getByText('Trusted by travelers worldwide')).toBeInTheDocument()
    expect(screen.getByText('50K+')).toBeInTheDocument()
    expect(screen.getByText('Happy Travelers')).toBeInTheDocument()
    expect(screen.getByText('250K+')).toBeInTheDocument()
    expect(screen.getByText('Trips Planned')).toBeInTheDocument()
    expect(screen.getByText('195')).toBeInTheDocument()
    expect(screen.getByText('Countries')).toBeInTheDocument()
    expect(screen.getByText('98%')).toBeInTheDocument()
    expect(screen.getByText('Satisfaction')).toBeInTheDocument()
  })

  it('renders scroll indicator', () => {
    render(
      <TestWrapper>
        <HeroSection />
      </TestWrapper>
    )
    
    const scrollIndicator = document.querySelector('.animate-bounce')
    expect(scrollIndicator).toBeInTheDocument()
    
    const scrollDot = document.querySelector('.animate-pulse')
    expect(scrollDot).toBeInTheDocument()
  })

  it('has proper semantic structure', () => {
    render(
      <TestWrapper>
        <HeroSection />
      </TestWrapper>
    )
    
    const section = document.querySelector('section')
    expect(section).toBeInTheDocument()
    expect(section).toHaveClass('relative', 'min-h-screen', 'flex', 'items-center', 'justify-center', 'overflow-hidden')
  })

  it('renders animated background shapes', () => {
    render(
      <TestWrapper>
        <HeroSection />
      </TestWrapper>
    )
    
    const backgroundShapes = document.querySelectorAll('.animate-blob')
    expect(backgroundShapes).toHaveLength(3)
    
    backgroundShapes.forEach(shape => {
      expect(shape).toHaveClass('rounded-full', 'mix-blend-multiply', 'filter', 'blur-xl')
    })
  })

  it('renders background gradient', () => {
    render(
      <TestWrapper>
        <HeroSection />
      </TestWrapper>
    )
    
    const backgroundGradient = document.querySelector('.bg-hero-gradient')
    expect(backgroundGradient).toBeInTheDocument()
    expect(backgroundGradient).toHaveClass('absolute', 'inset-0')
  })

  it('has responsive layout classes', () => {
    render(
      <TestWrapper>
        <HeroSection />
      </TestWrapper>
    )
    
    // Check main container
    const container = document.querySelector('.max-w-7xl.mx-auto.px-4.sm\\:px-6.lg\\:px-8')
    expect(container).toBeInTheDocument()
    
    // Check responsive heading
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveClass('text-5xl', 'md:text-7xl')
    
    // Check responsive grid
    const grid = document.querySelector('.grid.grid-cols-1.md\\:grid-cols-3')
    expect(grid).toBeInTheDocument()
    
    // Check responsive button layout
    const buttonContainer = document.querySelector('.flex.flex-col.sm\\:flex-row')
    expect(buttonContainer).toBeInTheDocument()
  })

  it('main heading has proper styling', () => {
    render(
      <TestWrapper>
        <HeroSection />
      </TestWrapper>
    )
    
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveClass('text-5xl', 'md:text-7xl', 'font-bold', 'text-gray-900', 'mb-6', 'leading-tight')
  })

  it('subtitle has proper styling', () => {
    render(
      <TestWrapper>
        <HeroSection />
      </TestWrapper>
    )
    
    const subtitle = screen.getByText(/AI-powered trip planning, real-time assistance/)
    expect(subtitle).toHaveClass('text-xl', 'md:text-2xl', 'text-gray-600', 'mb-12', 'max-w-4xl', 'mx-auto', 'leading-relaxed')
  })

  it('CTA buttons have proper styling', () => {
    render(
      <TestWrapper>
        <HeroSection />
      </TestWrapper>
    )
    
    const startButton = screen.getByRole('button', { name: /start your journey/i })
    expect(startButton).toHaveClass('text-lg', 'px-8', 'py-4')
    
    const exploreButton = screen.getByRole('button', { name: /explore features/i })
    expect(exploreButton).toHaveClass('text-lg', 'px-8', 'py-4', 'bg-glass-light', 'backdrop-blur-md', 'border', 'border-white/20')
  })

  it('feature cards have hover effects', () => {
    render(
      <TestWrapper>
        <HeroSection />
      </TestWrapper>
    )
    
    // Feature cards should have hover classes
    const featureCards = document.querySelectorAll('.group.hover\\:scale-105')
    expect(featureCards).toHaveLength(3)
    
    // Feature icons should have hover classes
    const featureIcons = document.querySelectorAll('.group-hover\\:scale-110')
    expect(featureIcons).toHaveLength(3)
  })

  it('statistics have proper color styling', () => {
    render(
      <TestWrapper>
        <HeroSection />
      </TestWrapper>
    )
    
    const stat50k = screen.getByText('50K+')
    expect(stat50k).toHaveClass('text-2xl', 'font-bold', 'text-primary-600')
    
    const stat250k = screen.getByText('250K+')
    expect(stat250k).toHaveClass('text-2xl', 'font-bold', 'text-secondary-600')
    
    const stat195 = screen.getByText('195')
    expect(stat195).toHaveClass('text-2xl', 'font-bold', 'text-accent-600')
    
    const stat98 = screen.getByText('98%')
    expect(stat98).toHaveClass('text-2xl', 'font-bold', 'text-primary-600')
  })

  it('has proper spacing and layout structure', () => {
    render(
      <TestWrapper>
        <HeroSection />
      </TestWrapper>
    )
    
    const textCenter = document.querySelector('.text-center')
    expect(textCenter).toBeInTheDocument()
    
    const trustSection = document.querySelector('.mt-16.pt-8.border-t.border-white\\/20')
    expect(trustSection).toBeInTheDocument()
    
    const statsContainer = document.querySelector('.flex.justify-center.items-center.space-x-8')
    expect(statsContainer).toBeInTheDocument()
  })
})