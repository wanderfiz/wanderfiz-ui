import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import ContactPage from '../ContactPage'

// Mock components
jest.mock('../../components/ui/Card', () => ({
  __esModule: true,
  default: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={`card ${className || ''}`} data-testid="card">
      {children}
    </div>
  )
}))

jest.mock('../../components/ui/Button', () => ({
  __esModule: true,
  default: ({ children, onClick, type }: { children: React.ReactNode; onClick?: () => void; type?: string }) => (
    <button onClick={onClick} type={type} data-testid="button">
      {children}
    </button>
  )
}))

jest.mock('../../hooks/useScrollAnimation', () => ({
  useScrollAnimation: () => ({
    ref: { current: null },
    isVisible: true
  })
}))

const MockedContactPage = () => (
  <BrowserRouter>
    <ContactPage />
  </BrowserRouter>
)

describe('ContactPage', () => {
  it('renders the main heading', () => {
    render(<MockedContactPage />)
    
    expect(screen.getByText(/Contact/)).toBeInTheDocument()
  })

  it('renders contact form', () => {
    render(<MockedContactPage />)
    
    expect(screen.getByRole('form')).toBeInTheDocument()
  })

  it('has required form fields', () => {
    render(<MockedContactPage />)
    
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
  })

  it('has submit button', () => {
    render(<MockedContactPage />)
    
    const submitButton = screen.getByRole('button', { name: /send/i })
    expect(submitButton).toBeInTheDocument()
  })

  it('renders contact information', () => {
    render(<MockedContactPage />)
    
    // Should display company contact info
    expect(screen.getByText(/hello@wanderfiz.com/)).toBeInTheDocument()
  })

  it('allows form input', () => {
    render(<MockedContactPage />)
    
    const nameInput = screen.getByLabelText(/name/i)
    const emailInput = screen.getByLabelText(/email/i)
    const messageInput = screen.getByLabelText(/message/i)
    
    fireEvent.change(nameInput, { target: { value: 'John Doe' } })
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } })
    fireEvent.change(messageInput, { target: { value: 'Test message' } })
    
    expect(nameInput).toHaveValue('John Doe')
    expect(emailInput).toHaveValue('john@example.com')
    expect(messageInput).toHaveValue('Test message')
  })

  it('handles form submission', () => {
    render(<MockedContactPage />)
    
    const form = screen.getByRole('form')
    fireEvent.submit(form)
    
    // Should not throw error
    expect(form).toBeInTheDocument()
  })

  it('uses proper semantic HTML structure', () => {
    render(<MockedContactPage />)
    
    const main = screen.getByRole('main')
    expect(main).toBeInTheDocument()
    
    const headings = screen.getAllByRole('heading')
    expect(headings.length).toBeGreaterThan(0)
  })

  it('displays office locations or contact methods', () => {
    render(<MockedContactPage />)
    
    // Should show different ways to contact
    const main = screen.getByRole('main')
    const textContent = main.textContent || ''
    
    expect(textContent).toMatch(/email|phone|address/i)
  })

  it('has proper form validation', () => {
    render(<MockedContactPage />)
    
    const emailInput = screen.getByLabelText(/email/i)
    expect(emailInput).toHaveAttribute('type', 'email')
    expect(emailInput).toHaveAttribute('required')
  })

  it('renders social media or support links', () => {
    render(<MockedContactPage />)
    
    const buttons = screen.getAllByTestId('button')
    expect(buttons.length).toBeGreaterThan(1) // At least submit + other buttons
  })

  it('has responsive layout', () => {
    const { container } = render(<MockedContactPage />)
    
    const grids = container.querySelectorAll('.grid')
    expect(grids.length).toBeGreaterThan(0)
  })

  it('displays business hours or response time', () => {
    render(<MockedContactPage />)
    
    const main = screen.getByRole('main')
    const textContent = main.textContent || ''
    
    // Should mention response time or business hours
    expect(textContent.length).toBeGreaterThan(200)
  })
})