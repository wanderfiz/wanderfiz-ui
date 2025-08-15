import { renderHook } from '@testing-library/react'
import { useScrollAnimation, useStaggeredScrollAnimation, useCounterAnimation, useParallax } from '../useScrollAnimation'

// Mock IntersectionObserver
const mockIntersectionObserver = jest.fn()
mockIntersectionObserver.mockReturnValue({
  observe: jest.fn(),
  disconnect: jest.fn(),
  unobserve: jest.fn(),
})
window.IntersectionObserver = mockIntersectionObserver

// Mock requestAnimationFrame
global.requestAnimationFrame = jest.fn((cb) => {
  cb(0)
  return 0
})

describe('useScrollAnimation', () => {
  beforeEach(() => {
    mockIntersectionObserver.mockClear()
  })

  it('initializes with correct default values', () => {
    const { result } = renderHook(() => useScrollAnimation())
    
    expect(result.current.ref.current).toBeNull()
    expect(result.current.isVisible).toBe(false)
    expect(result.current.hasBeenVisible).toBe(false)
  })

  it('sets up IntersectionObserver with correct options', () => {
    const options = { threshold: 0.5, rootMargin: '10px' }
    renderHook(() => useScrollAnimation(options))
    
    expect(mockIntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      expect.objectContaining({
        threshold: 0.5,
        rootMargin: '10px'
      })
    )
  })

  it('uses default options when none provided', () => {
    renderHook(() => useScrollAnimation())
    
    expect(mockIntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      expect.objectContaining({
        threshold: 0.1,
        rootMargin: '0px'
      })
    )
  })
})

describe('useStaggeredScrollAnimation', () => {
  beforeEach(() => {
    jest.clearAllTimers()
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('initializes with correct default values', () => {
    const { result } = renderHook(() => useStaggeredScrollAnimation(3))
    
    expect(result.current.containerRef.current).toBeNull()
    expect(result.current.isVisible).toBe(false)
    expect(result.current.visibleItems.size).toBe(0)
  })

  it('staggers item visibility when visible', () => {
    const { result, rerender } = renderHook(() => useStaggeredScrollAnimation(3, { staggerDelay: 100 }))
    
    // Mock the visibility state
    Object.defineProperty(result.current, 'isVisible', { value: true, writable: true })
    rerender()
    
    // Initially no items should be visible
    expect(result.current.visibleItems.size).toBe(0)
    
    // After first delay, first item should be visible
    jest.advanceTimersByTime(100)
    expect(result.current.visibleItems.has(0)).toBe(true)
    
    // After second delay, second item should be visible
    jest.advanceTimersByTime(100)
    expect(result.current.visibleItems.has(1)).toBe(true)
  })
})

describe('useCounterAnimation', () => {
  beforeEach(() => {
    jest.clearAllTimers()
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('initializes with zero value', () => {
    const { result } = renderHook(() => useCounterAnimation(100))
    
    expect(result.current.currentValue).toBe(0)
    expect(result.current.ref.current).toBeNull()
    expect(result.current.isVisible).toBe(false)
  })

  it('animates to end value when visible', () => {
    const { result } = renderHook(() => useCounterAnimation(100, { duration: 1000 }))
    
    // Mock visibility
    Object.defineProperty(result.current, 'isVisible', { value: true, writable: true })
    
    // Trigger animation by advancing time
    jest.advanceTimersByTime(500) // Half duration
    
    expect(result.current.currentValue).toBeGreaterThan(0)
    expect(result.current.currentValue).toBeLessThan(100)
  })
})

describe('useParallax', () => {
  beforeEach(() => {
    // Mock window.pageYOffset
    Object.defineProperty(window, 'pageYOffset', {
      writable: true,
      value: 0,
    })
    
    // Mock addEventListener and removeEventListener
    window.addEventListener = jest.fn()
    window.removeEventListener = jest.fn()
  })

  it('initializes with zero offset', () => {
    const { result } = renderHook(() => useParallax())
    
    expect(result.current.offset).toBe(0)
    expect(result.current.ref.current).toBeNull()
    expect(result.current.style.transform).toBe('translateY(0px)')
  })

  it('sets up scroll event listener', () => {
    renderHook(() => useParallax())
    
    expect(window.addEventListener).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function),
      { passive: true }
    )
  })

  it('calculates offset based on speed', () => {
    const { result } = renderHook(() => useParallax(0.5))
    
    // Simulate scroll
    Object.defineProperty(window, 'pageYOffset', { value: 100 })
    
    // Get the scroll handler and call it
    const scrollHandler = (window.addEventListener as jest.Mock).mock.calls.find(
      call => call[0] === 'scroll'
    )?.[1]
    
    if (scrollHandler) {
      scrollHandler()
      expect(result.current.offset).toBe(50) // 100 * 0.5
      expect(result.current.style.transform).toBe('translateY(50px)')
    }
  })

  it('cleans up event listener on unmount', () => {
    const { unmount } = renderHook(() => useParallax())
    
    unmount()
    
    expect(window.removeEventListener).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function)
    )
  })
})