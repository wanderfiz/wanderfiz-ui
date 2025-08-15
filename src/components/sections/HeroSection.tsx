import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../ui/Button'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'

const HeroSection: React.FC = () => {
  const navigate = useNavigate()
  const { ref: heroRef, isVisible } = useScrollAnimation({ threshold: 0.3 })

  return (
    <section ref={heroRef} className="relative min-h-screen bg-hero-gradient">
      {/* Hero Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen">
          
          {/* Left Content */}
          <div className="space-y-8">
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 leading-tight">
                Plan your perfect trip with
                <span className="text-primary-500"> AI assistance</span>
              </h1>
            </div>

            <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <p className="text-xl text-neutral-600 leading-relaxed max-w-lg">
                From inspiration to itinerary in minutes. Discover destinations, 
                plan activities, and create unforgettable memories with intelligent travel planning.
              </p>
            </div>

            {/* Search Box */}
            <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-neutral-100">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-neutral-700 mb-2 block">Where to?</label>
                      <input 
                        type="text" 
                        placeholder="Search destinations" 
                        className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-neutral-700 mb-2 block">When?</label>
                      <input 
                        type="date" 
                        className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                      />
                    </div>
                  </div>
                  <Button 
                    className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3 text-lg font-medium"
                    onClick={() => navigate('/signup')}
                  >
                    Start planning →
                  </Button>
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className={`transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="flex items-center space-x-8 text-sm text-neutral-500">
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 bg-primary-500 rounded-full border-2 border-white"></div>
                    <div className="w-8 h-8 bg-secondary-500 rounded-full border-2 border-white"></div>
                    <div className="w-8 h-8 bg-accent-sage rounded-full border-2 border-white"></div>
                  </div>
                  <span>50K+ travelers</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-amber-400">★★★★★</span>
                  <span>4.9 rating</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="relative">
              {/* Main Hero Image Placeholder */}
              <div className="bg-gradient-to-br from-primary-100 to-secondary-100 rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl">
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50">
                  <div className="text-center space-y-4 p-8">
                    <div className="text-6xl">🗺️</div>
                    <div className="text-neutral-600 font-medium">Beautiful destination imagery</div>
                    <div className="text-sm text-neutral-500">Inspiring travel photos would go here</div>
                  </div>
                </div>
              </div>

              {/* Floating Stats Cards */}
              <div className="absolute -top-4 -left-4 bg-white rounded-xl shadow-lg p-4 border border-neutral-100">
                <div className="text-sm text-neutral-600">Popular destination</div>
                <div className="font-bold text-neutral-900">Paris, France</div>
                <div className="text-xs text-primary-500">✈️ 2h 15m</div>
              </div>

              <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-lg p-4 border border-neutral-100">
                <div className="text-sm text-neutral-600">Saved on average</div>
                <div className="font-bold text-accent-sage">$248</div>
                <div className="text-xs text-neutral-500">per trip</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Benefits Strip */}
      <div className="border-t border-neutral-100 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="font-semibold text-neutral-900 mb-2">5-minute planning</h3>
              <p className="text-neutral-600 text-sm">AI creates your perfect itinerary in minutes</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌍</span>
              </div>
              <h3 className="font-semibold text-neutral-900 mb-2">Global coverage</h3>
              <p className="text-neutral-600 text-sm">195+ countries with local insights</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-accent-sage/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="font-semibold text-neutral-900 mb-2">Save money</h3>
              <p className="text-neutral-600 text-sm">Find the best deals and hidden gems</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection