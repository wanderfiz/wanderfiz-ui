import React from 'react'
import { Link } from 'react-router-dom'

const FeaturesSection: React.FC = () => {
  const tripStages = [
    {
      id: 'dream',
      phase: 'Before Your Trip',
      title: "Dream & Plan",
      description: "Tell us your travel dreams and watch as AI creates the perfect itinerary",
      icon: "💭",
      steps: [
        "Describe your ideal trip in plain language",
        "Get personalized recommendations based on preferences",
        "AI optimizes your route and budget automatically"
      ],
      visual: (
        <div className="relative h-full bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6">
          <div className="space-y-3">
            <div className="h-3 bg-gray-300 rounded w-3/4 animate-pulse"></div>
            <div className="h-3 bg-gray-300 rounded w-full animate-pulse delay-100"></div>
            <div className="h-3 bg-gray-300 rounded w-2/3 animate-pulse delay-200"></div>
          </div>
          <div className="absolute bottom-4 right-4 text-4xl">✨</div>
        </div>
      )
    },
    {
      id: 'prepare',
      phase: 'Before Your Trip',
      title: "Book & Prepare",
      description: "Everything organized in one place with smart reminders",
      icon: "📋",
      steps: [
        "Centralized booking management",
        "Automatic visa and document reminders",
        "Packing lists based on weather and activities"
      ],
      visual: (
        <div className="relative h-full bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6">
          <div className="grid grid-cols-2 gap-2">
            <div className="h-12 bg-gray-300 rounded animate-pulse"></div>
            <div className="h-12 bg-gray-300 rounded animate-pulse delay-100"></div>
            <div className="h-12 bg-gray-300 rounded animate-pulse delay-200"></div>
            <div className="h-12 bg-gray-300 rounded animate-pulse delay-300"></div>
          </div>
          <div className="absolute bottom-4 right-4 text-4xl">✅</div>
        </div>
      )
    },
    {
      id: 'navigate',
      phase: 'During Your Trip',
      title: "Navigate & Explore",
      description: "Your AI assistant guides you through every moment",
      icon: "🧭",
      steps: [
        "Offline maps and real-time navigation",
        "Instant language translation",
        "Local recommendations based on location"
      ],
      visual: (
        <div className="relative h-full bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 w-24 h-24 border-4 border-gray-300 rounded-full animate-ping"></div>
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-3xl">📍</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'capture',
      phase: 'During Your Trip',
      title: "Capture Moments",
      description: "Automatically organize memories as you create them",
      icon: "📸",
      steps: [
        "Auto-organize photos by location and time",
        "Create instant travel stories",
        "Share live updates with loved ones"
      ],
      visual: (
        <div className="relative h-full bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6">
          <div className="grid grid-cols-3 gap-1">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="aspect-square bg-gray-300 rounded animate-fade-in" style={{animationDelay: `${i * 50}ms`}}></div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 'remember',
      phase: 'After Your Trip',
      title: "Relive & Share",
      description: "Transform your journey into lasting memories",
      icon: "📖",
      steps: [
        "AI-generated travel stories",
        "Beautiful photo albums and videos",
        "Easy sharing with friends and family"
      ],
      visual: (
        <div className="relative h-full bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6">
          <div className="space-y-2">
            <div className="h-16 bg-gray-300 rounded"></div>
            <div className="grid grid-cols-2 gap-2">
              <div className="h-20 bg-gray-300 rounded"></div>
              <div className="h-20 bg-gray-300 rounded"></div>
            </div>
          </div>
          <div className="absolute bottom-4 right-4 text-4xl">💝</div>
        </div>
      )
    }
  ]

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How WanderFiz Works Throughout Your
            <span className="text-[#FF561D]"> Journey</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From planning to memories, we're with you every step of the way
          </p>
        </div>

        {/* Trip Journey Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gray-200 hidden lg:block"></div>
          
          <div className="space-y-16">
            {tripStages.map((stage, index) => (
              <div key={stage.id} className="relative">
                {/* Phase Label */}
                {(index === 0 || tripStages[index - 1].phase !== stage.phase) && (
                  <div className="text-center mb-8">
                    <span className="inline-block px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
                      {stage.phase}
                    </span>
                  </div>
                )}
                
                <div className={`flex flex-col lg:flex-row items-center gap-8 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                  {/* Content */}
                  <div className="flex-1 lg:pr-8">
                    <div className={`bg-white rounded-2xl p-8 shadow-sm border border-gray-100 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                      <div className={`flex items-center gap-3 mb-4 ${index % 2 === 0 ? 'lg:justify-end' : ''}`}>
                        <span className="text-4xl">{stage.icon}</span>
                        <h3 className="text-2xl font-bold text-gray-900">{stage.title}</h3>
                      </div>
                      <p className="text-gray-600 mb-6">{stage.description}</p>
                      <ul className={`space-y-2 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                        {stage.steps.map((step, stepIndex) => (
                          <li key={stepIndex} className={`flex items-center gap-2 text-sm text-gray-700 ${index % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}>
                            <span className="text-green-500">✓</span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  {/* Timeline Node */}
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-white border-4 border-[#FF561D] rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-[#FF561D] font-bold text-xl">{index + 1}</span>
                    </div>
                  </div>
                  
                  {/* Visual */}
                  <div className="flex-1 lg:pl-8">
                    <div className="h-48 w-full max-w-sm mx-auto">
                      {stage.visual}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Simple CTA Section */}
        <div className="mt-20">
          <div className="bg-gray-50 rounded-3xl p-12 text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Start Your Journey?
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of travelers who use WanderFiz for seamless trip planning
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/signup"
                className="px-8 py-3 bg-[#FF561D] text-white font-semibold rounded-full hover:bg-[#FF561D]/90 transition-colors"
              >
                Start Free Trial
              </Link>
              <Link 
                to="/features"
                className="px-8 py-3 bg-white border border-gray-300 text-gray-700 font-semibold rounded-full hover:bg-gray-50 transition-colors"
              >
                Learn More
              </Link>
            </div>
            
            {/* Simple Stats */}
            <div className="mt-12 flex justify-center gap-12">
              <div>
                <div className="text-2xl font-bold text-gray-900">50K+</div>
                <div className="text-sm text-gray-600">Active Users</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">150+</div>
                <div className="text-sm text-gray-600">Countries</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">4.9★</div>
                <div className="text-sm text-gray-600">App Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection