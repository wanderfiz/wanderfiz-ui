import { useState, useEffect } from 'react'
import { BREAKPOINTS } from '../utils/constants'

type Breakpoint = keyof typeof BREAKPOINTS

interface UseResponsiveReturn {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  isLargeDesktop: boolean
  currentBreakpoint: Breakpoint
  screenWidth: number
  screenHeight: number
}

export const useResponsive = (): UseResponsiveReturn => {
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  })

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    // Set initial size
    handleResize()

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const getCurrentBreakpoint = (): Breakpoint => {
    const { width } = screenSize
    
    if (width >= BREAKPOINTS['2xl']) return '2xl'
    if (width >= BREAKPOINTS.xl) return 'xl'
    if (width >= BREAKPOINTS.lg) return 'lg'
    if (width >= BREAKPOINTS.md) return 'md'
    return 'sm'
  }

  const isMobile = screenSize.width < BREAKPOINTS.md
  const isTablet = screenSize.width >= BREAKPOINTS.md && screenSize.width < BREAKPOINTS.lg
  const isDesktop = screenSize.width >= BREAKPOINTS.lg && screenSize.width < BREAKPOINTS['2xl']
  const isLargeDesktop = screenSize.width >= BREAKPOINTS['2xl']

  return {
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop,
    currentBreakpoint: getCurrentBreakpoint(),
    screenWidth: screenSize.width,
    screenHeight: screenSize.height
  }
}

// Hook for media query matching
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia(query)
    setMatches(mediaQuery.matches)

    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [query])

  return matches
}

// Hook for breakpoint-specific values
export const useBreakpointValue = <T>(values: Partial<Record<Breakpoint, T>>): T | undefined => {
  const { currentBreakpoint } = useResponsive()
  
  // Find the appropriate value based on current breakpoint
  // Falls back to smaller breakpoints if current breakpoint value is not defined
  const breakpointOrder: Breakpoint[] = ['sm', 'md', 'lg', 'xl', '2xl']
  const currentIndex = breakpointOrder.indexOf(currentBreakpoint)
  
  for (let i = currentIndex; i >= 0; i--) {
    const breakpoint = breakpointOrder[i]
    if (values[breakpoint] !== undefined) {
      return values[breakpoint]
    }
  }
  
  return undefined
}

// Hook for orientation detection
export const useOrientation = () => {
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait')

  useEffect(() => {
    const handleOrientationChange = () => {
      setOrientation(window.innerHeight > window.innerWidth ? 'portrait' : 'landscape')
    }

    handleOrientationChange()
    window.addEventListener('resize', handleOrientationChange)
    
    return () => window.removeEventListener('resize', handleOrientationChange)
  }, [])

  return orientation
}

// Hook for detecting touch devices
export const useTouch = (): boolean => {
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    const checkTouch = () => {
      setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0)
    }

    checkTouch()
  }, [])

  return isTouch
}

export default useResponsive