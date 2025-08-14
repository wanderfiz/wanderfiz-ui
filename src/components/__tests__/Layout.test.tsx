import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Layout from '../Layout'

// Test wrapper component
const TestWrapper = ({ children }: { children: JSX.Element }) => (
  <BrowserRouter>
    {children}
  </BrowserRouter>
)

describe('Layout Component', () => {
  it('renders header with Wanderfiz title', () => {
    render(
      <TestWrapper>
        <Layout>
          <div>Test content</div>
        </Layout>
      </TestWrapper>
    )
    
    expect(screen.getByText('Wanderfiz')).toBeInTheDocument()
  })
  
  it('renders children content', () => {
    render(
      <TestWrapper>
        <Layout>
          <div>Test content</div>
        </Layout>
      </TestWrapper>
    )
    
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })
  
  it('renders footer with copyright', () => {
    render(
      <TestWrapper>
        <Layout>
          <div>Test content</div>
        </Layout>
      </TestWrapper>
    )
    
    expect(screen.getByText(/© 2024 Wanderfiz/)).toBeInTheDocument()
  })
})
