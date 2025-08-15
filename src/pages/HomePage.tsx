import React, { lazy, Suspense } from 'react'
import HeroSection from '../components/landing/HeroSection'

// Lazy load heavy components
const FeaturesSection = lazy(() => import('../components/landing/FeaturesSection'))
const TestimonialsSection = lazy(() => import('../components/landing/TestimonialsSection'))
const CTASection = lazy(() => import('../components/landing/CTASection'))

// Simple loading placeholder
const SectionLoader = () => (
  <div className="h-96 flex items-center justify-center">
    <div className="animate-pulse text-gray-400">Loading...</div>
  </div>
)

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <Suspense fallback={<SectionLoader />}>
        <FeaturesSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <TestimonialsSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <CTASection />
      </Suspense>
    </div>
  )
}

export default HomePage
