import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import GlassCard from '../components/ui/GlassCard'
import GlassButton from '../components/ui/GlassButton'

const FeaturesPageEnhanced: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const featureCategories = [
    {
      id: 'planning',
      title: "Smart Trip Planning",
      icon: "🗺️",
      color: "from-[#FF561D] to-[#FF8A4C]",
      description: "AI-powered itinerary generation that understands your travel style",
      features: [
        {
          title: "Natural Language Planning",
          description: "Just describe your dream trip and watch the magic happen",
          icon: "✨",
          details: [
            "Understands complex preferences",
            "Learns from your travel history",
            "Suggests hidden gems",
            "Optimizes for your budget"
          ],
          graphic: (
            <div className="relative h-48 bg-gradient-to-br from-[#FF561D]/10 to-[#0ea5e9]/10 rounded-xl p-6 overflow-hidden">
              <div className="absolute top-4 left-4 w-32 h-8 bg-white/50 rounded animate-pulse"></div>
              <div className="absolute top-16 left-8 w-40 h-6 bg-white/30 rounded animate-pulse delay-100"></div>
              <div className="absolute top-28 left-6 w-36 h-6 bg-white/40 rounded animate-pulse delay-200"></div>
              <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-gradient-to-br from-[#FF561D]/30 to-transparent rounded-full blur-xl"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <svg className="w-16 h-16 text-[#FF561D] animate-spin-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
            </div>
          )
        },
        {
          title: "Visual Itinerary Designer",
          description: "Drag, drop, and perfect your journey with an intuitive interface",
          icon: "🎨",
          details: [
            "Interactive map view",
            "Time optimization",
            "Distance calculator",
            "Real-time availability"
          ],
          graphic: (
            <div className="relative h-48 bg-gradient-to-br from-[#0ea5e9]/10 to-[#FF561D]/10 rounded-xl p-6 overflow-hidden">
              <div className="grid grid-cols-3 gap-2">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className={`h-12 bg-white/30 rounded-lg animate-pulse`} style={{animationDelay: `${i * 100}ms`}}></div>
                ))}
              </div>
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-[#0ea5e9]/30 to-transparent rounded-full blur-xl"></div>
            </div>
          )
        },
        {
          title: "Smart Recommendations",
          description: "Get personalized suggestions based on your preferences",
          icon: "🎯",
          details: [
            "Weather-aware planning",
            "Crowd predictions",
            "Price forecasting",
            "Local event integration"
          ],
          graphic: (
            <div className="relative h-48 bg-gradient-to-br from-[#84cc16]/10 to-[#0ea5e9]/10 rounded-xl p-6 overflow-hidden">
              <div className="flex justify-center items-center h-full">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#84cc16] to-[#0ea5e9] rounded-full blur-xl opacity-50 animate-pulse"></div>
                  <div className="relative bg-white/50 rounded-full p-8">
                    <svg className="w-16 h-16 text-[#84cc16]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                      <path fillRule="evenodd" d="M4 5a2 2 0 012-2 1 1 0 000 2H6a2 2 0 100 4h2a2 2 0 100 4h2a1 1 0 100 2 2 2 0 01-2 2H4a2 2 0 01-2-2V7a2 2 0 012-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          )
        }
      ]
    },
    {
      id: 'assistant',
      title: "Real-Time Travel Assistant",
      icon: "📱",
      color: "from-[#0ea5e9] to-[#38bdf8]",
      description: "Your intelligent companion that adapts to every moment of your journey",
      features: [
        {
          title: "Offline Navigation",
          description: "Never get lost, even without internet",
          icon: "🗺️",
          details: [
            "Downloaded maps",
            "Offline translation",
            "Cached recommendations",
            "Emergency contacts"
          ],
          graphic: (
            <div className="relative h-48 bg-gradient-to-br from-[#0ea5e9]/10 to-[#38bdf8]/10 rounded-xl p-6 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-32 h-32">
                  <div className="absolute inset-0 border-4 border-[#0ea5e9]/30 rounded-full animate-ping"></div>
                  <div className="absolute inset-2 border-4 border-[#0ea5e9]/50 rounded-full animate-ping animation-delay-200"></div>
                  <div className="absolute inset-4 border-4 border-[#0ea5e9]/70 rounded-full animate-ping animation-delay-400"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 bg-[#0ea5e9] rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          )
        },
        {
          title: "Smart Reminders",
          description: "Context-aware notifications that keep you on track",
          icon: "⏰",
          details: [
            "Flight check-in alerts",
            "Activity reminders",
            "Weather warnings",
            "Transport updates"
          ],
          graphic: (
            <div className="relative h-48 bg-gradient-to-br from-[#fbbf24]/10 to-[#f59e0b]/10 rounded-xl p-6 overflow-hidden">
              <div className="space-y-3">
                <div className="flex items-center gap-3 bg-white/50 rounded-lg p-3 animate-slide-in">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <div className="flex-1 h-2 bg-gray-300/50 rounded"></div>
                </div>
                <div className="flex items-center gap-3 bg-white/50 rounded-lg p-3 animate-slide-in animation-delay-200">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                  <div className="flex-1 h-2 bg-gray-300/50 rounded"></div>
                </div>
                <div className="flex items-center gap-3 bg-white/50 rounded-lg p-3 animate-slide-in animation-delay-400">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <div className="flex-1 h-2 bg-gray-300/50 rounded"></div>
                </div>
              </div>
            </div>
          )
        },
        {
          title: "Instant Translation",
          description: "Break language barriers with real-time translation",
          icon: "🌐",
          details: [
            "Camera translation",
            "Voice translation",
            "Menu scanner",
            "Sign reader"
          ],
          graphic: (
            <div className="relative h-48 bg-gradient-to-br from-[#a855f7]/10 to-[#9333ea]/10 rounded-xl p-6 overflow-hidden">
              <div className="flex items-center justify-center h-full">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="h-3 bg-[#a855f7]/30 rounded animate-pulse"></div>
                    <div className="h-3 bg-[#a855f7]/40 rounded animate-pulse delay-100"></div>
                    <div className="h-3 bg-[#a855f7]/50 rounded animate-pulse delay-200"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-[#9333ea]/50 rounded animate-pulse delay-300"></div>
                    <div className="h-3 bg-[#9333ea]/40 rounded animate-pulse delay-400"></div>
                    <div className="h-3 bg-[#9333ea]/30 rounded animate-pulse delay-500"></div>
                  </div>
                </div>
              </div>
            </div>
          )
        }
      ]
    },
    {
      id: 'memories',
      title: "Memory Capture",
      icon: "📸",
      color: "from-[#a855f7] to-[#ec4899]",
      description: "Transform your travel moments into beautiful stories",
      features: [
        {
          title: "Auto Photo Timeline",
          description: "Photos organized by time and location automatically",
          icon: "📷",
          details: [
            "Geotagging",
            "Face recognition",
            "Event clustering",
            "Quality enhancement"
          ],
          graphic: (
            <div className="relative h-48 bg-gradient-to-br from-[#ec4899]/10 to-[#a855f7]/10 rounded-xl p-6 overflow-hidden">
              <div className="grid grid-cols-4 gap-2">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="aspect-square bg-white/30 rounded animate-fade-in" style={{animationDelay: `${i * 50}ms`}}></div>
                ))}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-white/50 to-transparent"></div>
            </div>
          )
        },
        {
          title: "AI Story Generator",
          description: "Turn your photos into captivating travel stories",
          icon: "📖",
          details: [
            "Narrative creation",
            "Music matching",
            "Video compilation",
            "Social sharing"
          ],
          graphic: (
            <div className="relative h-48 bg-gradient-to-br from-[#84cc16]/10 to-[#22c55e]/10 rounded-xl p-6 overflow-hidden">
              <div className="space-y-2">
                <div className="h-2 bg-white/50 rounded w-full animate-width-expand"></div>
                <div className="h-2 bg-white/40 rounded w-5/6 animate-width-expand animation-delay-200"></div>
                <div className="h-2 bg-white/30 rounded w-4/5 animate-width-expand animation-delay-400"></div>
                <div className="h-2 bg-white/40 rounded w-full animate-width-expand animation-delay-600"></div>
                <div className="h-2 bg-white/50 rounded w-3/4 animate-width-expand animation-delay-800"></div>
              </div>
            </div>
          )
        },
        {
          title: "Memory Books",
          description: "Create beautiful physical books of your adventures",
          icon: "📚",
          details: [
            "Professional layouts",
            "Custom designs",
            "Print quality",
            "Worldwide shipping"
          ],
          graphic: (
            <div className="relative h-48 bg-gradient-to-br from-[#f97316]/10 to-[#ea580c]/10 rounded-xl p-6 overflow-hidden">
              <div className="flex items-center justify-center h-full">
                <div className="relative">
                  <div className="w-32 h-40 bg-white/50 rounded shadow-lg transform -rotate-6"></div>
                  <div className="absolute inset-0 w-32 h-40 bg-white/60 rounded shadow-lg transform rotate-6"></div>
                  <div className="absolute inset-0 w-32 h-40 bg-white/70 rounded shadow-lg flex items-center justify-center">
                    <span className="text-4xl">📸</span>
                  </div>
                </div>
              </div>
            </div>
          )
        }
      ]
    },
    {
      id: 'group',
      title: "Group Travel",
      icon: "👥",
      color: "from-[#fbbf24] to-[#f59e0b]",
      description: "Coordinate effortlessly with your travel companions",
      features: [
        {
          title: "Expense Splitting",
          description: "Fair and transparent expense management",
          icon: "💰",
          details: [
            "Auto-calculation",
            "Multiple currencies",
            "Receipt scanning",
            "Settlement tracking"
          ],
          graphic: (
            <div className="relative h-48 bg-gradient-to-br from-[#fbbf24]/10 to-[#f59e0b]/10 rounded-xl p-6 overflow-hidden">
              <div className="flex items-center justify-center h-full">
                <div className="relative">
                  <div className="flex gap-2">
                    <div className="w-12 h-20 bg-green-500/30 rounded animate-bounce" style={{animationDelay: '0ms'}}></div>
                    <div className="w-12 h-16 bg-green-500/40 rounded animate-bounce" style={{animationDelay: '100ms'}}></div>
                    <div className="w-12 h-24 bg-green-500/50 rounded animate-bounce" style={{animationDelay: '200ms'}}></div>
                    <div className="w-12 h-18 bg-green-500/40 rounded animate-bounce" style={{animationDelay: '300ms'}}></div>
                  </div>
                </div>
              </div>
            </div>
          )
        },
        {
          title: "Group Chat",
          description: "Stay connected with built-in messaging",
          icon: "💬",
          details: [
            "Real-time messaging",
            "File sharing",
            "Location sharing",
            "Voice notes"
          ],
          graphic: (
            <div className="relative h-48 bg-gradient-to-br from-[#3b82f6]/10 to-[#2563eb]/10 rounded-xl p-6 overflow-hidden">
              <div className="space-y-2">
                <div className="flex gap-2">
                  <div className="w-8 h-8 bg-[#3b82f6]/30 rounded-full"></div>
                  <div className="flex-1 bg-white/30 rounded-lg p-2 h-8"></div>
                </div>
                <div className="flex gap-2 justify-end">
                  <div className="flex-1 bg-white/40 rounded-lg p-2 h-8"></div>
                  <div className="w-8 h-8 bg-[#2563eb]/30 rounded-full"></div>
                </div>
                <div className="flex gap-2">
                  <div className="w-8 h-8 bg-[#3b82f6]/30 rounded-full"></div>
                  <div className="flex-1 bg-white/30 rounded-lg p-2 h-8"></div>
                </div>
              </div>
            </div>
          )
        },
        {
          title: "Activity Voting",
          description: "Democratic decision-making for group activities",
          icon: "🗳️",
          details: [
            "Poll creation",
            "Anonymous voting",
            "Deadline reminders",
            "Result analytics"
          ],
          graphic: (
            <div className="relative h-48 bg-gradient-to-br from-[#10b981]/10 to-[#059669]/10 rounded-xl p-6 overflow-hidden">
              <div className="flex items-center justify-center h-full gap-2">
                <div className="space-y-2">
                  <div className="h-20 w-8 bg-[#10b981]/40 rounded"></div>
                  <div className="text-xs text-center">45%</div>
                </div>
                <div className="space-y-2">
                  <div className="h-16 w-8 bg-[#10b981]/30 rounded"></div>
                  <div className="text-xs text-center">30%</div>
                </div>
                <div className="space-y-2">
                  <div className="h-12 w-8 bg-[#10b981]/20 rounded"></div>
                  <div className="text-xs text-center">25%</div>
                </div>
              </div>
            </div>
          )
        }
      ]
    },
    {
      id: 'safety',
      title: "Safety & Emergency",
      icon: "🛡️",
      color: "from-[#ef4444] to-[#dc2626]",
      description: "Travel with confidence knowing help is always available",
      features: [
        {
          title: "Emergency SOS",
          description: "One-tap emergency assistance with location sharing",
          icon: "🆘",
          details: [
            "Auto location share",
            "Emergency contacts",
            "Local services",
            "Medical info"
          ],
          graphic: (
            <div className="relative h-48 bg-gradient-to-br from-[#ef4444]/10 to-[#dc2626]/10 rounded-xl p-6 overflow-hidden">
              <div className="flex items-center justify-center h-full">
                <div className="relative">
                  <div className="absolute inset-0 bg-red-500/20 rounded-full animate-ping"></div>
                  <button className="relative bg-gradient-to-br from-[#ef4444] to-[#dc2626] text-white font-bold text-xl px-8 py-4 rounded-full shadow-lg">
                    SOS
                  </button>
                </div>
              </div>
            </div>
          )
        },
        {
          title: "Real-Time Alerts",
          description: "Stay informed about safety issues in your area",
          icon: "⚠️",
          details: [
            "Weather warnings",
            "Political updates",
            "Health advisories",
            "Crime alerts"
          ],
          graphic: (
            <div className="relative h-48 bg-gradient-to-br from-[#f59e0b]/10 to-[#d97706]/10 rounded-xl p-6 overflow-hidden">
              <div className="space-y-2">
                <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-2 flex items-center gap-2">
                  <span className="text-red-500">⚠️</span>
                  <div className="h-2 bg-red-500/30 rounded flex-1"></div>
                </div>
                <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-2 flex items-center gap-2">
                  <span className="text-yellow-500">⚠️</span>
                  <div className="h-2 bg-yellow-500/30 rounded flex-1"></div>
                </div>
                <div className="bg-blue-500/20 border border-blue-500/50 rounded-lg p-2 flex items-center gap-2">
                  <span className="text-blue-500">ℹ️</span>
                  <div className="h-2 bg-blue-500/30 rounded flex-1"></div>
                </div>
              </div>
            </div>
          )
        },
        {
          title: "Medical Translation",
          description: "Communicate health issues in any language",
          icon: "🏥",
          details: [
            "Symptom translator",
            "Allergy cards",
            "Prescription help",
            "Hospital finder"
          ],
          graphic: (
            <div className="relative h-48 bg-gradient-to-br from-[#ec4899]/10 to-[#db2777]/10 rounded-xl p-6 overflow-hidden">
              <div className="flex items-center justify-center h-full">
                <div className="relative">
                  <div className="w-24 h-24 bg-white/50 rounded-full flex items-center justify-center">
                    <span className="text-4xl">🏥</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold animate-pulse">
                    !</div>
                </div>
              </div>
            </div>
          )
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fafbff] to-white pt-20 pb-16">
      {/* Hero Section */}
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Features That{' '}
            <span className="bg-gradient-to-r from-[#FF561D] to-[#0ea5e9] bg-clip-text text-transparent">
              Transform Travel
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Every feature is crafted with care to make your journeys smoother, safer, and more memorable.
            Explore our comprehensive suite of travel tools.
          </p>
        </div>
      </div>

      {/* All Feature Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {featureCategories.map((category, categoryIndex) => (
          <div key={category.id} className="mb-20">
            {/* Category Header */}
            <div className={`mb-12 text-center transition-all duration-700 delay-${categoryIndex * 100} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="flex justify-center items-center gap-3 mb-4">
                <span className="text-5xl">{category.icon}</span>
                <h2 className={`text-4xl font-bold bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                  {category.title}
                </h2>
              </div>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {category.description}
              </p>
            </div>

            {/* Feature Cards */}
            <div className="space-y-12">
              {category.features.map((feature, index) => (
                <div
                  key={index}
                  className={`transition-all duration-700 delay-${index * 100} ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
                >
                  <GlassCard className="overflow-hidden">
                    <div className="grid md:grid-cols-2 gap-8 p-8">
                      <div className={index % 2 === 0 ? 'order-1' : 'order-2'}>
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-4xl">{feature.icon}</span>
                          <h3 className="text-2xl font-bold text-gray-900">{feature.title}</h3>
                        </div>
                        <p className="text-gray-600 mb-6">{feature.description}</p>
                        
                        <div className="grid grid-cols-2 gap-4">
                          {feature.details.map((detail, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              <span className="text-sm text-gray-700">{detail}</span>
                            </div>
                          ))}
                        </div>

                        <div className="mt-6">
                          <Link to="/signup">
                            <GlassButton variant="primary" size="medium">
                              Try This Feature
                            </GlassButton>
                          </Link>
                        </div>
                      </div>
                      
                      <div className={index % 2 === 0 ? 'order-2' : 'order-1'}>
                        {feature.graphic}
                      </div>
                    </div>
                  </GlassCard>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Final CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Experience These Features?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of travelers who've upgraded their journey
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <GlassButton variant="primary" size="large">
                Start Free Trial
              </GlassButton>
            </Link>
            <Link to="/pricing">
              <GlassButton variant="secondary" size="large">
                View Pricing
              </GlassButton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeaturesPageEnhanced