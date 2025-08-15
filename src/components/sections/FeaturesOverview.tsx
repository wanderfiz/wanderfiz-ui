import React from 'react'
import Button from '../ui/Button'
import { useNavigate } from 'react-router-dom'
import { useStaggeredScrollAnimation } from '../../hooks/useScrollAnimation'

const FeaturesOverview: React.FC = () => {
  const navigate = useNavigate()

  const travelFeatures = [
    {
      id: 'smart-planning',
      icon: '🎯',
      title: 'Smart Trip Planning',
      description: 'Just tell us where you want to go and your preferences. Our AI creates a personalized itinerary with the best attractions, restaurants, and hidden gems.',
      highlight: 'Plan in 5 minutes what used to take hours'
    },
    {
      id: 'live-guide',
      icon: '🧭',
      title: 'Your Personal Travel Guide',
      description: 'Real-time navigation, local insights, weather updates, and instant recommendations. Like having a local friend in every city.',
      highlight: 'Works offline anywhere in the world'
    },
    {
      id: 'memory-keeper',
      icon: '📖',
      title: 'Automatic Memory Capture',
      description: 'Your photos, locations, and experiences are automatically organized into beautiful travel stories you can share with friends and family.',
      highlight: 'Never lose a travel memory again'
    },
    {
      id: 'group-travel',
      icon: '👥',
      title: 'Group Travel Made Easy',
      description: 'Plan with friends, split expenses automatically, vote on activities, and keep everyone on the same page with real-time updates.',
      highlight: 'Perfect for family trips and friend adventures'
    },
    {
      id: 'local-connection',
      icon: '🌎',
      title: 'Connect with Locals',
      description: 'Discover authentic experiences through local recommendations, cultural insights, and hidden spots only locals know about.',
      highlight: 'Experience destinations like a local'
    },
    {
      id: 'budget-smart',
      icon: '💰',
      title: 'Smart Budget Management',
      description: 'Track expenses in real-time, find the best deals, split costs with travel companions, and stay within budget effortlessly.',
      highlight: 'Save up to 30% on travel costs'
    }
  ]

  const { containerRef, isVisible, visibleItems } = useStaggeredScrollAnimation(
    travelFeatures.length,
    { threshold: 0.2, staggerDelay: 200 }
  )

  return (
    <section ref={containerRef} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-6 leading-tight">
            Everything you need to plan
            <span className="text-primary-500"> amazing trips</span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            From inspiration to itinerary, from booking to memories. Your complete travel companion 
            powered by intelligent planning.
          </p>
        </div>

        {/* Travel Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {travelFeatures.map((feature, index) => (
            <div
              key={feature.id}
              className={`bg-neutral-50 rounded-2xl p-8 group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-neutral-100 ${
                visibleItems.has(index) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="w-16 h-16 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 group-hover:shadow-md transition-shadow duration-300">
                <span className="text-3xl">{feature.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-neutral-600 mb-6 leading-relaxed">
                {feature.description}
              </p>
              <div className="inline-flex items-center text-primary-500 font-medium text-sm">
                {feature.highlight}
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* How It Works */}
        <div className={`bg-neutral-50 rounded-3xl p-12 mb-20 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              How it works
            </h3>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Three simple steps to your perfect trip
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">1</div>
              <h4 className="text-xl font-bold text-neutral-900 mb-4">Tell us your preferences</h4>
              <p className="text-neutral-600 leading-relaxed">Share your destination, dates, budget, and interests. Our AI understands what makes the perfect trip for you.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">2</div>
              <h4 className="text-xl font-bold text-neutral-900 mb-4">Get your personalized itinerary</h4>
              <p className="text-neutral-600 leading-relaxed">Receive a detailed day-by-day plan with activities, restaurants, and hidden gems tailored just for you.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-sage rounded-2xl flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">3</div>
              <h4 className="text-xl font-bold text-neutral-900 mb-4">Travel with confidence</h4>
              <p className="text-neutral-600 leading-relaxed">Use our mobile app for navigation, bookings, and capturing memories. Everything you need in one place.</p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className={`text-center transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div>
              <div className="text-4xl font-bold text-primary-500 mb-2">50K+</div>
              <div className="text-neutral-600">Happy travelers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-secondary-500 mb-2">5 min</div>
              <div className="text-neutral-600">Average planning time</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent-sage mb-2">195+</div>
              <div className="text-neutral-600">Countries covered</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent-sand mb-2">4.9★</div>
              <div className="text-neutral-600">User rating</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className={`bg-primary-500 rounded-3xl p-12 text-center transition-all duration-1000 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to plan your next adventure?
          </h3>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of travelers who've discovered the joy of effortless trip planning
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="large"
              onClick={() => navigate('/signup')}
              className="px-8 py-4 bg-white text-primary-500 hover:bg-neutral-50 font-semibold"
            >
              Start planning for free
            </Button>
            <Button
              variant="ghost"
              size="large"
              onClick={() => navigate('/features')}
              className="px-8 py-4 border-2 border-white text-white hover:bg-white/10"
            >
              See all features
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturesOverview