import React, { useEffect, useRef, useState } from 'react'

interface UseScrollAnimationOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
}

interface UseScrollAnimationReturn {
  ref: React.RefObject<HTMLElement>
  isVisible: boolean
  hasBeenVisible: boolean
}

export const useScrollAnimation = (
  options: UseScrollAnimationOptions = {}
): UseScrollAnimationReturn => {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true
  } = options

  const ref = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [hasBeenVisible, setHasBeenVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isElementVisible = entry.isIntersecting
        
        setIsVisible(isElementVisible)
        
        if (isElementVisible && !hasBeenVisible) {
          setHasBeenVisible(true)
        }
        
        // If triggerOnce is true and element has been visible, disconnect observer
        if (triggerOnce && isElementVisible) {
          observer.disconnect()
        }
      },
      {
        threshold,
        rootMargin
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [threshold, rootMargin, triggerOnce, hasBeenVisible])

  return {
    ref,
    isVisible,
    hasBeenVisible
  }
}

// Hook for multiple scroll animations with staggered delays
export const useStaggeredScrollAnimation = (
  itemCount: number,
  options: UseScrollAnimationOptions & { staggerDelay?: number } = {}
) => {
  const { staggerDelay = 100, ...scrollOptions } = options
  const containerRef = useRef<HTMLElement>(null)
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set())

  const { isVisible } = useScrollAnimation({
    ...scrollOptions,
    threshold: 0.1
  })

  useEffect(() => {
    if (isVisible) {
      // Stagger the animation of child items
      for (let i = 0; i < itemCount; i++) {
        setTimeout(() => {
          setVisibleItems(prev => new Set([...prev, i]))
        }, i * staggerDelay)
      }
    }
  }, [isVisible, itemCount, staggerDelay])

  return {
    containerRef,
    isVisible,
    visibleItems
  }
}

// Hook for scroll-triggered counter animations
export const useCounterAnimation = (
  endValue: number,
  options: { duration?: number; startOnVisible?: boolean } = {}
) => {
  const { duration = 2000, startOnVisible = true } = options
  const [currentValue, setCurrentValue] = useState(0)
  const { ref, isVisible } = useScrollAnimation({ triggerOnce: true })

  useEffect(() => {
    if (!startOnVisible || isVisible) {
      let startTime: number | null = null
      const startValue = 0

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / duration, 1)
        
        // Easing function for smoother animation
        const easedProgress = 1 - Math.pow(1 - progress, 3)
        const value = Math.floor(startValue + (endValue - startValue) * easedProgress)
        
        setCurrentValue(value)

        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }

      requestAnimationFrame(animate)
    }
  }, [endValue, duration, isVisible, startOnVisible])

  return {
    ref,
    currentValue,
    isVisible
  }
}

// Hook for parallax scroll effects
export const useParallax = (speed: number = 0.5) => {
  const ref = useRef<HTMLElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const scrolled = window.pageYOffset
        const parallaxOffset = scrolled * speed
        setOffset(parallaxOffset)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [speed])

  return {
    ref,
    offset,
    style: {
      transform: `translateY(${offset}px)`
    }
  }
}

export default useScrollAnimation