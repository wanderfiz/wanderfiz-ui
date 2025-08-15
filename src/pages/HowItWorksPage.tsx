import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import GlassCard from '../components/ui/GlassCard'
import GlassButton from '../components/ui/GlassButton'

interface JourneyStage {
  id: string
  title: string
  subtitle: string
  description: string
  icon: string
  color: string
  features: string[]
  duration: string
  illustration: JSX.Element
}

const HowItWorksPage: React.FC = () => {
  const navigate = useNavigate()
  const [activeStage, setActiveStage] = useState<string>('plan')
  const [isVisible, setIsVisible] = useState(true)

  const JOURNEY_STAGES: JourneyStage[] = [
    {
      id: 'plan',
      title: 'Plan & Dream',
      subtitle: 'AI-Powered Trip Planning',
      description: 'Start with your travel dreams and let our AI create the perfect itinerary tailored to your preferences, budget, and travel style.',
      icon: '🗺️',
      color: 'from-[#FF561D] to-[#FF8A4C]',
      features: [
        'Tell us your travel preferences',
        'AI generates personalized itinerary',
        'Visual drag-and-drop editor',
        'Budget optimization',
        'Local insights and recommendations'
      ],
      duration: '5-10 minutes',
      illustration: (
        <div className="relative h-64 w-full bg-gradient-to-br from-[#FF561D]/10 to-[#0ea5e9]/10 rounded-xl overflow-hidden">
          <div className="absolute top-8 left-8">
            <div className="w-40 h-10 bg-white/50 rounded-lg animate-pulse"></div>
            <div className="w-32 h-4 bg-white/30 rounded mt-4 animate-pulse delay-100"></div>
            <div className="w-36 h-4 bg-white/30 rounded mt-2 animate-pulse delay-200"></div>
          </div>
          <div className="absolute bottom-8 right-8 w-24 h-24 bg-gradient-to-br from-[#FF561D] to-[#0ea5e9] rounded-full animate-bounce">
            <div className="flex items-center justify-center h-full text-white text-3xl">✈️</div>
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <svg className="w-32 h-32 text-[#FF561D]/20 animate-spin-slow" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
        </div>
      )
    },
    {
      id: 'travel',
      title: 'Travel & Explore',
      subtitle: 'Real-Time Travel Assistant',
      description: 'Your personal travel companion guides you through every moment of your journey with real-time assistance and smart recommendations.',
      icon: '📱',
      color: 'from-[#0ea5e9] to-[#38bdf8]',
      features: [
        'GPS navigation with offline maps',
        'Real-time local recommendations',
        'Smart notifications and reminders',
        'Live weather and traffic updates',
        'Emergency assistance features'
      ],
      duration: 'Throughout your trip',
      illustration: (
        <div className="relative h-64 w-full bg-gradient-to-br from-[#0ea5e9]/10 to-[#38bdf8]/10 rounded-xl overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 w-48 h-48 border-4 border-[#0ea5e9]/30 rounded-full animate-ping"></div>
              <div className="absolute inset-4 w-40 h-40 border-4 border-[#0ea5e9]/40 rounded-full animate-ping animation-delay-200"></div>
              <div className="absolute inset-8 w-32 h-32 border-4 border-[#0ea5e9]/50 rounded-full animate-ping animation-delay-400"></div>
              <div className="w-48 h-48 bg-white/30 rounded-full flex items-center justify-center">
                <div className="text-6xl">📍</div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'remember',
      title: 'Capture & Remember',
      subtitle: 'Memory Preservation',
      description: 'Automatically organize your travel memories and create beautiful stories that you can cherish and share for years to come.',
      icon: '📸',
      color: 'from-[#a855f7] to-[#ec4899]',
      features: [
        'Automatic photo organization',
        'Location-based memory timeline',
        'AI-generated travel stories',
        'Easy sharing with friends',
        'Beautiful photo albums'
      ],
      duration: 'Forever',
      illustration: (
        <div className="relative h-64 w-full bg-gradient-to-br from-[#a855f7]/10 to-[#ec4899]/10 rounded-xl overflow-hidden">
          <div className="grid grid-cols-4 gap-2 p-8">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="aspect-square bg-white/30 rounded-lg animate-fade-in" style={{animationDelay: `${i * 100}ms`}}>
                <div className="w-full h-full flex items-center justify-center text-2xl opacity-50">
                  {i % 3 === 0 ? '🏔️' : i % 3 === 1 ? '🏖️' : '🌃'}
                </div>
              </div>
            ))}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent"></div>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <div className="bg-white/80 rounded-lg px-4 py-2 text-sm font-semibold text-gray-700">
              Your Travel Memories
            </div>
          </div>
        </div>
      )
    }
  ]

  const PROCESS_STEPS = [
    { 
      step: 1, 
      title: 'Sign Up', 
      description: 'Create your free account in seconds',
      icon: '👤',
      image: (
        <div className="w-full h-48 bg-gradient-to-br from-[#FF561D]/10 to-[#0ea5e9]/10 rounded-lg flex items-center justify-center">
          <div className="bg-white/50 rounded-lg p-6 shadow-lg">
            <div className="w-32 h-4 bg-gray-300 rounded mb-3"></div>
            <div className="w-28 h-4 bg-gray-300 rounded mb-3"></div>
            <div className="w-24 h-8 bg-gradient-to-r from-[#FF561D] to-[#0ea5e9] rounded"></div>
          </div>
        </div>
      )
    },
    { 
      step: 2, 
      title: 'Share Your Dreams', 
      description: 'Tell us where you want to go and what you love',
      icon: '💭',
      image: (
        <div className="w-full h-48 bg-gradient-to-br from-[#0ea5e9]/10 to-[#38bdf8]/10 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-2">🗺️</div>
            <div className="w-32 h-2 bg-white/50 rounded mx-auto mb-2"></div>
            <div className="w-24 h-2 bg-white/40 rounded mx-auto"></div>
          </div>
        </div>
      )
    },
    { 
      step: 3, 
      title: 'AI Creates Magic', 
      description: 'Our AI crafts a personalized itinerary just for you',
      icon: '✨',
      image: (
        <div className="w-full h-48 bg-gradient-to-br from-[#a855f7]/10 to-[#ec4899]/10 rounded-lg flex items-center justify-center">
          <div className="relative">
            <div className="absolute inset-0 w-32 h-32 bg-gradient-to-r from-[#a855f7] to-[#ec4899] rounded-full blur-xl opacity-30 animate-pulse"></div>
            <div className="relative text-6xl animate-spin-slow">🤖</div>
          </div>
        </div>
      )
    },
    { 
      step: 4, 
      title: 'Customize & Perfect', 
      description: 'Adjust your plan with our visual editor',
      icon: '🎨',
      image: (
        <div className="w-full h-48 bg-gradient-to-br from-[#84cc16]/10 to-[#22c55e]/10 rounded-lg p-4">
          <div className="grid grid-cols-3 gap-2 h-full">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white/40 rounded animate-pulse" style={{animationDelay: `${i * 100}ms`}}></div>
            ))}
          </div>
        </div>
      )
    },
    { 
      step: 5, 
      title: 'Travel & Enjoy', 
      description: 'Your AI assistant guides you every step',
      icon: '🎒',
      image: (
        <div className="w-full h-48 bg-gradient-to-br from-[#fbbf24]/10 to-[#f59e0b]/10 rounded-lg flex items-center justify-center">
          <div className="relative">
            <div className="text-6xl animate-bounce">✈️</div>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-black/10 rounded-full blur-sm"></div>
          </div>
        </div>
      )
    }
  ]

  const currentStage = JOURNEY_STAGES.find(stage => stage.id === activeStage) || JOURNEY_STAGES[0]

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fafbff] to-white pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            How WanderFiz
            <span className="bg-gradient-to-r from-[#FF561D] to-[#0ea5e9] bg-clip-text text-transparent">
              {' '}Works
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            From dream to memory in three simple stages. Discover how WanderFiz 
            guides you through every step of your travel journey with intelligent automation 
            and personalized assistance.
          </p>
        </div>

        {/* Visual Process Flow */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Your Journey in 5 Simple Steps
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {PROCESS_STEPS.map((step, index) => (
              <div key={step.step} className={`transition-all duration-700 delay-${index * 100} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <GlassCard className="h-full">
                  <div className="p-4">
                    {step.image}
                    <div className="mt-4 text-center">
                      <div className="flex justify-center mb-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-[#FF561D] to-[#0ea5e9] rounded-full flex items-center justify-center text-white font-bold">
                          {step.step}
                        </div>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </div>
            ))}
          </div>
        </div>

        {/* Journey Stages with Illustrations */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Three Stages of Your Journey
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Each stage is designed to enhance your travel experience from start to finish
            </p>
          </div>

          {/* Stage Selector */}
          <div className="flex justify-center mb-12">
            <div className="bg-white/50 backdrop-blur-md border border-gray-200 rounded-full p-2 flex space-x-2">
              {JOURNEY_STAGES.map((stage) => (
                <button
                  key={stage.id}
                  onClick={() => setActiveStage(stage.id)}
                  className={`px-6 py-3 rounded-full transition-all duration-300 font-medium ${
                    activeStage === stage.id
                      ? `bg-gradient-to-r ${stage.color} text-white shadow-lg`
                      : 'text-gray-700 hover:text-gray-900 hover:bg-white/50'
                  }`}
                >
                  <span className="mr-2 text-xl">{stage.icon}</span>
                  {stage.title}
                </button>
              ))}
            </div>
          </div>

          {/* Active Stage Details with Illustration */}
          <div className="max-w-6xl mx-auto">
            <GlassCard className="overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
                <div className="order-2 lg:order-1">
                  <div className={`w-16 h-16 bg-gradient-to-r ${currentStage.color} rounded-full flex items-center justify-center text-2xl mb-6`}>
                    {currentStage.icon}
                  </div>
                  
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">
                    {currentStage.title}
                  </h3>
                  <h4 className="text-xl text-gray-600 mb-4">
                    {currentStage.subtitle}
                  </h4>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    {currentStage.description}
                  </p>
                  
                  <div className="mb-6">
                    <h5 className="font-semibold text-gray-900 mb-3">Features Included:</h5>
                    <ul className="space-y-2">
                      {currentStage.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600 mb-6">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">Duration:</span>
                    <span className="ml-2">{currentStage.duration}</span>
                  </div>

                  <GlassButton
                    variant="primary"
                    size="large"
                    onClick={() => navigate('/signup')}
                  >
                    Get Started Today
                  </GlassButton>
                </div>

                <div className="order-1 lg:order-2">
                  {currentStage.illustration}
                </div>
              </div>
            </GlassCard>
          </div>
        </div>

        {/* Technology Behind It */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Powered by Advanced Technology
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The intelligence behind every great journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: '🤖',
                title: 'AI Planning',
                description: 'Machine learning creates personalized itineraries',
                graphic: (
                  <div className="h-32 bg-gradient-to-br from-[#FF561D]/10 to-[#0ea5e9]/10 rounded-lg flex items-center justify-center">
                    <div className="text-5xl animate-pulse">🧠</div>
                  </div>
                )
              },
              {
                icon: '🌐',
                title: 'Real-Time Data',
                description: 'Live updates from global travel networks',
                graphic: (
                  <div className="h-32 bg-gradient-to-br from-[#0ea5e9]/10 to-[#38bdf8]/10 rounded-lg flex items-center justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 w-16 h-16 border-2 border-[#0ea5e9] rounded-full animate-ping"></div>
                      <div className="text-5xl">🌍</div>
                    </div>
                  </div>
                )
              },
              {
                icon: '📱',
                title: 'Mobile First',
                description: 'Seamless experience across all devices',
                graphic: (
                  <div className="h-32 bg-gradient-to-br from-[#a855f7]/10 to-[#ec4899]/10 rounded-lg flex items-center justify-center">
                    <div className="text-5xl animate-float">📲</div>
                  </div>
                )
              },
              {
                icon: '🔐',
                title: 'Secure & Private',
                description: 'Your data is protected with enterprise security',
                graphic: (
                  <div className="h-32 bg-gradient-to-br from-[#84cc16]/10 to-[#22c55e]/10 rounded-lg flex items-center justify-center">
                    <div className="text-5xl">🛡️</div>
                  </div>
                )
              }
            ].map((tech, index) => (
              <div key={index} className={`transition-all duration-700 delay-${index * 100} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <GlassCard className="h-full">
                  <div className="p-6">
                    {tech.graphic}
                    <div className="text-center mt-4">
                      <h4 className="font-semibold text-gray-900 mb-2">{tech.title}</h4>
                      <p className="text-sm text-gray-600">
                        {tech.description}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <GlassCard className="max-w-4xl mx-auto p-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Start Your Journey?
            </h3>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of travelers who have transformed their travel experience 
              with WanderFiz's intelligent planning and real-time assistance.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <GlassButton
                variant="primary"
                size="large"
                onClick={() => navigate('/signup')}
              >
                Start Free Trial
              </GlassButton>
              <GlassButton
                variant="secondary"
                size="large"
                onClick={() => navigate('/features')}
              >
                Explore Features
              </GlassButton>
            </div>

            <div className="flex justify-center items-center space-x-8 pt-6 border-t border-gray-200">
              <div className="text-center">
                <div className="text-sm font-semibold text-gray-900">No Setup Required</div>
                <div className="text-xs text-gray-600">Start planning immediately</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-semibold text-gray-900">Works Offline</div>
                <div className="text-xs text-gray-600">Travel without connectivity</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-semibold text-gray-900">Free Trial</div>
                <div className="text-xs text-gray-600">No credit card needed</div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}

export default HowItWorksPage