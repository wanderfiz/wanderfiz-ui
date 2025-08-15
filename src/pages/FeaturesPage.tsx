import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FeatureCard from '../components/features/FeatureCard'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import { useScrollAnimation, useStaggeredScrollAnimation } from '../hooks/useScrollAnimation'
import { FEATURES, FEATURE_CATEGORIES } from '../types/features'

const FeaturesPage: React.FC = () => {
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.3 })
  
  // Filter features by selected category
  const filteredFeatures = selectedCategory 
    ? FEATURES.filter(feature => feature.category.id === selectedCategory)
    : FEATURES

  const { containerRef, isVisible, visibleItems } = useStaggeredScrollAnimation(
    filteredFeatures.length,
    { threshold: 0.2, staggerDelay: 150 }
  )

  const handleCategorySelect = (categoryId: string | null) => {
    setSelectedCategory(categoryId)
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div ref={headerRef as React.RefObject<HTMLDivElement>} className={`text-center mb-16 transition-all duration-1000 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Powerful Features for
            <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              {' '}Every Journey
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Discover how WanderFiz transforms your travel experience with AI-powered planning, 
            real-time assistance, and seamless memory capture. Every feature is designed to make 
            your journeys more enjoyable and stress-free.
          </p>
        </div>

        {/* Category Filter */}
        <div className={`mb-12 transition-all duration-1000 delay-300 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Card variant="glass" className="max-w-5xl mx-auto" padding="large">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
              Explore by Category
            </h2>
            
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              <Button
                variant={selectedCategory === null ? 'primary' : 'ghost'}
                size="small"
                onClick={() => handleCategorySelect(null)}
                className={`${selectedCategory === null ? '' : 'bg-glass-light backdrop-blur-md border border-white/20'}`}
              >
                All Features
              </Button>
              {FEATURE_CATEGORIES.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? 'primary' : 'ghost'}
                  size="small"
                  onClick={() => handleCategorySelect(category.id)}
                  className={`${selectedCategory === category.id ? '' : 'bg-glass-light backdrop-blur-md border border-white/20'}`}
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                </Button>
              ))}
            </div>

            {/* Category Description */}
            {selectedCategory && (
              <div className="text-center bg-glass-light backdrop-blur-md border border-white/20 rounded-lg p-4">
                <p className="text-gray-600">
                  {FEATURE_CATEGORIES.find(cat => cat.id === selectedCategory)?.description}
                </p>
              </div>
            )}
          </Card>
        </div>

        {/* Features Grid */}
        <div ref={containerRef as React.RefObject<HTMLDivElement>} className="mb-16">
          <div className={`text-center mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h3 className="text-2xl font-bold text-gray-900">
              {selectedCategory 
                ? `${FEATURE_CATEGORIES.find(cat => cat.id === selectedCategory)?.name} Features` 
                : 'All Features'
              }
            </h3>
            <p className="text-gray-600 mt-2">
              {filteredFeatures.length} feature{filteredFeatures.length !== 1 ? 's' : ''} available
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFeatures.map((feature, index) => (
              <div
                key={feature.id}
                className={`transition-all duration-700 ${
                  visibleItems.has(index) 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <FeatureCard feature={feature} variant="detailed" />
              </div>
            ))}
          </div>
        </div>

        {/* Feature Benefits Overview */}
        <div className={`mb-16 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Card variant="glass" className="max-w-6xl mx-auto" padding="large">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Why WanderFiz Features Make a Difference
              </h3>
              <p className="text-gray-600">
                Each feature is designed with your travel success in mind
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white text-xl mb-4 mx-auto">
                  ⚡
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Faster Planning</h4>
                <p className="text-sm text-gray-600">
                  AI-powered tools reduce planning time by up to 90%
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-full flex items-center justify-center text-white text-xl mb-4 mx-auto">
                  🎯
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Personalized</h4>
                <p className="text-sm text-gray-600">
                  Every recommendation is tailored to your preferences
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-accent-500 to-accent-600 rounded-full flex items-center justify-center text-white text-xl mb-4 mx-auto">
                  🔄
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Real-Time</h4>
                <p className="text-sm text-gray-600">
                  Live updates and assistance throughout your journey
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full flex items-center justify-center text-white text-xl mb-4 mx-auto">
                  🌍
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Global</h4>
                <p className="text-sm text-gray-600">
                  Works anywhere in the world, even offline
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* CTA Section */}
        <div className={`text-center transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Card variant="glass" className="max-w-4xl mx-auto" padding="large">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Experience These Features?
            </h3>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of travelers who are already using WanderFiz to create 
              unforgettable journeys with intelligent planning and real-time assistance.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="large"
                onClick={() => navigate('/signup')}
                className="px-8 shadow-glass-lg"
              >
                Start Free Trial
              </Button>
              <Button
                variant="ghost"
                size="large"
                onClick={() => navigate('/how-it-works')}
                className="px-8 bg-glass-light backdrop-blur-md border border-white/20"
              >
                See How It Works
              </Button>
            </div>

            <div className="flex justify-center items-center space-x-6 mt-8 pt-6 border-t border-white/20">
              <div className="text-center">
                <div className="text-sm font-semibold text-gray-900">Free Trial</div>
                <div className="text-xs text-gray-600">No credit card required</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-semibold text-gray-900">24/7 Support</div>
                <div className="text-xs text-gray-600">Always here to help</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-semibold text-gray-900">Cancel Anytime</div>
                <div className="text-xs text-gray-600">No long-term commitment</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default FeaturesPage