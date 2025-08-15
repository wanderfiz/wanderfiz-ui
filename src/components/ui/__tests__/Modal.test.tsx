import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Modal from '../Modal'

// Mock DOM methods that are used in the Modal component
const originalBodyStyle = document.body.style

beforeEach(() => {
  document.body.style.overflow = ''
})

afterEach(() => {
  document.body.style.overflow = originalBodyStyle.overflow
})

describe('Modal Component', () => {
  it('does not render when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={jest.fn()}>
        <div>Modal content</div>
      </Modal>
    )
    expect(screen.queryByText('Modal content')).not.toBeInTheDocument()
  })

  it('renders when isOpen is true', () => {
    render(
      <Modal isOpen={true} onClose={jest.fn()}>
        <div>Modal content</div>
      </Modal>
    )
    expect(screen.getByText('Modal content')).toBeInTheDocument()
  })

  it('renders with title when provided', () => {
    render(
      <Modal isOpen={true} onClose={jest.fn()} title="Test Modal">
        <div>Modal content</div>
      </Modal>
    )
    expect(screen.getByText('Test Modal')).toBeInTheDocument()
    expect(screen.getByText('Modal content')).toBeInTheDocument()
  })

  it('does not render title when not provided', () => {
    render(
      <Modal isOpen={true} onClose={jest.fn()}>
        <div>Modal content</div>
      </Modal>
    )
    // Should not find any h3 element with title
    expect(screen.queryByRole('heading', { level: 3 })).not.toBeInTheDocument()
  })

  it('applies correct size classes', () => {
    const { rerender } = render(
      <Modal isOpen={true} onClose={jest.fn()} size="small">
        <div>Modal content</div>
      </Modal>
    )
    
    const backdrop = screen.getByText('Modal content').closest('[role="dialog"]')?.parentElement
    expect(backdrop?.querySelector('.max-w-md')).toBeInTheDocument()

    rerender(
      <Modal isOpen={true} onClose={jest.fn()} size="medium">
        <div>Modal content</div>
      </Modal>
    )
    expect(backdrop?.querySelector('.max-w-lg')).toBeInTheDocument()

    rerender(
      <Modal isOpen={true} onClose={jest.fn()} size="large">
        <div>Modal content</div>
      </Modal>
    )
    expect(backdrop?.querySelector('.max-w-2xl')).toBeInTheDocument()

    rerender(
      <Modal isOpen={true} onClose={jest.fn()} size="fullscreen">
        <div>Modal content</div>
      </Modal>
    )
    expect(backdrop?.querySelector('.max-w-7xl')).toBeInTheDocument()
  })

  it('calls onClose when clicking the backdrop', () => {
    const handleClose = jest.fn()
    render(
      <Modal isOpen={true} onClose={handleClose}>
        <div>Modal content</div>
      </Modal>
    )
    
    // Click the backdrop (the element with bg-black/50)
    const backdrop = document.querySelector('.fixed.inset-0.z-50')
    expect(backdrop).toBeInTheDocument()
    fireEvent.click(backdrop!)
    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  it('calls onClose when clicking the close button (when title is provided)', () => {
    const handleClose = jest.fn()
    render(
      <Modal isOpen={true} onClose={handleClose} title="Test Modal">
        <div>Modal content</div>
      </Modal>
    )
    const closeButton = screen.getByRole('button', { name: /close modal/i })
    fireEvent.click(closeButton)
    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  it('calls onClose when pressing Escape key', () => {
    const handleClose = jest.fn()
    render(
      <Modal isOpen={true} onClose={handleClose}>
        <div>Modal content</div>
      </Modal>
    )
    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' })
    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  it('does not call onClose when pressing other keys', () => {
    const handleClose = jest.fn()
    render(
      <Modal isOpen={true} onClose={handleClose}>
        <div>Modal content</div>
      </Modal>
    )
    fireEvent.keyDown(document, { key: 'Enter', code: 'Enter' })
    expect(handleClose).not.toHaveBeenCalled()
  })

  it('does not call onClose when clicking inside modal content', () => {
    const handleClose = jest.fn()
    render(
      <Modal isOpen={true} onClose={handleClose}>
        <div>Modal content</div>
      </Modal>
    )
    const modalContent = screen.getByText('Modal content')
    fireEvent.click(modalContent)
    expect(handleClose).not.toHaveBeenCalled()
  })

  it('sets body overflow to hidden when modal is open', () => {
    render(
      <Modal isOpen={true} onClose={jest.fn()}>
        <div>Modal content</div>
      </Modal>
    )
    expect(document.body.style.overflow).toBe('hidden')
  })

  it('restores body overflow when modal is closed', () => {
    const { rerender } = render(
      <Modal isOpen={true} onClose={jest.fn()}>
        <div>Modal content</div>
      </Modal>
    )
    expect(document.body.style.overflow).toBe('hidden')

    rerender(
      <Modal isOpen={false} onClose={jest.fn()}>
        <div>Modal content</div>
      </Modal>
    )
    expect(document.body.style.overflow).toBe('unset')
  })

  it('renders children correctly', () => {
    render(
      <Modal isOpen={true} onClose={jest.fn()}>
        <h1>Modal Title</h1>
        <p>Modal description</p>
      </Modal>
    )
    expect(screen.getByText('Modal Title')).toBeInTheDocument()
    expect(screen.getByText('Modal description')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(
      <Modal isOpen={true} onClose={jest.fn()} className="custom-modal-class">
        <div>Modal content</div>
      </Modal>
    )
    
    const modalContainer = document.querySelector('.custom-modal-class')
    expect(modalContainer).toBeInTheDocument()
  })

  it('has proper backdrop classes', () => {
    render(
      <Modal isOpen={true} onClose={jest.fn()}>
        <div>Modal content</div>
      </Modal>
    )
    
    const backdrop = document.querySelector('.fixed.inset-0.z-50')
    expect(backdrop).toHaveClass('flex', 'items-center', 'justify-center', 'p-4', 'bg-black/50', 'backdrop-blur-sm')
  })

  it('has proper modal content classes', () => {
    render(
      <Modal isOpen={true} onClose={jest.fn()}>
        <div>Modal content</div>
      </Modal>
    )
    
    const modalContent = screen.getByText('Modal content').closest('div[class*="bg-glass-light"]')
    expect(modalContent).toHaveClass('bg-glass-light', 'backdrop-blur-xl', 'border', 'border-white/20', 'rounded-xl', 'shadow-glass-lg')
  })

  it('cleanup removes event listeners on unmount', () => {
    const handleClose = jest.fn()
    const { unmount } = render(
      <Modal isOpen={true} onClose={handleClose}>
        <div>Modal content</div>
      </Modal>
    )
    
    // Unmount and then try to trigger escape
    unmount()
    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' })
    
    // Should not call onClose after unmount
    expect(handleClose).not.toHaveBeenCalled()
  })

  it('combines all props correctly', () => {
    const handleClose = jest.fn()
    render(
      <Modal 
        isOpen={true} 
        onClose={handleClose} 
        title="Complex Modal"
        size="large"
        className="custom-class"
      >
        <div>Complex modal content</div>
      </Modal>
    )
    
    expect(screen.getByText('Complex Modal')).toBeInTheDocument()
    expect(screen.getByText('Complex modal content')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /close modal/i })).toBeInTheDocument()
    
    const backdrop = document.querySelector('.fixed.inset-0.z-50')
    expect(backdrop?.querySelector('.max-w-2xl')).toBeInTheDocument()
    expect(document.querySelector('.custom-class')).toBeInTheDocument()
  })
})