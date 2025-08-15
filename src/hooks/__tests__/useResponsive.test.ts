/**
 * @jest-environment jsdom
 */
import { renderHook, act } from '@testing-library/react'
import { useResponsive, useMediaQuery, useBreakpointValue, useOrientation, useTouch } from '../useResponsive'

// Mock window object for tests
const originalInnerWidth = Object.getOwnPropertyDescriptor(window, 'innerWidth')
const originalInnerHeight = Object.getOwnPropertyDescriptor(window, 'innerHeight')

beforeAll(() => {
  // Mock window.matchMedia
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  })
})

afterAll(() => {
  // Restore original descriptors
  if (originalInnerWidth) {
    Object.defineProperty(window, 'innerWidth', originalInnerWidth)
  }
  if (originalInnerHeight) {
    Object.defineProperty(window, 'innerHeight', originalInnerHeight)
  }
})

describe('useResponsive Hook', () => {
  beforeEach(() => {
    // Mock window dimensions
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    })
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 768,
    })
    
    // Mock navigator.maxTouchPoints
    Object.defineProperty(navigator, 'maxTouchPoints', {
      writable: true,
      configurable: true,
      value: 0,
    })
  })

  describe('useResponsive', () => {
    it('returns correct initial values for desktop screen', () => {
      const { result } = renderHook(() => useResponsive())

      expect(result.current.screenWidth).toBe(1024)
      expect(result.current.screenHeight).toBe(768)
      expect(result.current.isMobile).toBe(false)
      expect(result.current.isTablet).toBe(false)
      expect(result.current.isDesktop).toBe(true)
    })

    it('correctly identifies mobile screen', () => {
      Object.defineProperty(window, 'innerWidth', { writable: true, value: 375 })
      Object.defineProperty(window, 'innerHeight', { writable: true, value: 667 })

      const { result } = renderHook(() => useResponsive())

      expect(result.current.isMobile).toBe(true)
      expect(result.current.isTablet).toBe(false)
      expect(result.current.isDesktop).toBe(false)
    })

    it('correctly identifies tablet screen', () => {
      Object.defineProperty(window, 'innerWidth', { writable: true, value: 768 })
      Object.defineProperty(window, 'innerHeight', { writable: true, value: 1024 })

      const { result } = renderHook(() => useResponsive())

      expect(result.current.isMobile).toBe(false)
      expect(result.current.isTablet).toBe(true)
      expect(result.current.isDesktop).toBe(false)
    })
  })

  describe('useMediaQuery', () => {
    it('returns false by default', () => {
      const { result } = renderHook(() => useMediaQuery('(max-width: 768px)'))
      expect(result.current).toBe(false)
    })
  })

  describe('useBreakpointValue', () => {
    it('returns correct value for current breakpoint', () => {
      const values = { sm: 'small', md: 'medium', lg: 'large' }
      const { result } = renderHook(() => useBreakpointValue(values))
      
      // For 1024px width, should return 'lg' value
      expect(result.current).toBe('large')
    })
  })

  describe('useOrientation', () => {
    it('returns landscape for wider screens', () => {
      Object.defineProperty(window, 'innerWidth', { writable: true, value: 1024 })
      Object.defineProperty(window, 'innerHeight', { writable: true, value: 768 })

      const { result } = renderHook(() => useOrientation())
      expect(result.current).toBe('landscape')
    })

    it('returns portrait for taller screens', () => {
      Object.defineProperty(window, 'innerWidth', { writable: true, value: 375 })
      Object.defineProperty(window, 'innerHeight', { writable: true, value: 667 })

      const { result } = renderHook(() => useOrientation())
      expect(result.current).toBe('portrait')
    })
  })

  describe('useTouch', () => {
    it('returns false for non-touch devices', () => {
      Object.defineProperty(navigator, 'maxTouchPoints', { writable: true, value: 0 })
      delete (window as any).ontouchstart

      const { result } = renderHook(() => useTouch())
      expect(result.current).toBe(false)
    })

    it('returns true for touch devices with maxTouchPoints', () => {
      Object.defineProperty(navigator, 'maxTouchPoints', { writable: true, value: 1 })

      const { result } = renderHook(() => useTouch())
      expect(result.current).toBe(true)
    })
  })
})