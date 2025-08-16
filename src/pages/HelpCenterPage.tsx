import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import { useScrollAnimation, useStaggeredScrollAnimation } from '../hooks/useScrollAnimation'

interface FAQItem {
  id: string
  question: string
  answer: string
  category: string
  helpful?: number
}

interface HelpCategory {
  id: string
  title: string
  description: string
  icon: string
  articleCount: number
}

const HELP_CATEGORIES: HelpCategory[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    description: 'Your first steps with WanderFiz travel planning',
    icon: '🚀',
    articleCount: 15
  },
  {
    id: 'trip-planning',
    title: 'AI Trip Planning',
    description: 'Master AI-powered travel planning and itinerary creation',
    icon: '🤖',
    articleCount: 25
  },
  {
    id: 'destinations',
    title: 'Destinations & Guides',
    description: 'Explore destinations and local travel insights',
    icon: '🌍',
    articleCount: 150
  },
  {
    id: 'features',
    title: 'Features & Tools',
    description: 'Complete guide to all WanderFiz features',
    icon: '⚙️',
    articleCount: 30
  },
  {
    id: 'account',
    title: 'Account & Billing',
    description: 'Manage your account, subscriptions, and payments',
    icon: '👤',
    articleCount: 18
  },
  {
    id: 'mobile',
    title: 'Mobile Travel App',
    description: 'Travel with WanderFiz mobile app features',
    icon: '📱',
    articleCount: 12
  },
  {
    id: 'group-travel',
    title: 'Group Travel',
    description: 'Plan and manage trips with friends and family',
    icon: '👥',
    articleCount: 20
  },
  {
    id: 'troubleshooting',
    title: 'Troubleshooting',
    description: 'Solve common issues and technical problems',
    icon: '🔧',
    articleCount: 10
  }
]

const FAQ_ITEMS: FAQItem[] = [
  {
    id: '1',
    question: 'How do I create my first trip with WanderFiz AI?',
    answer: 'Creating your first AI-powered trip is simple! After signing up, click "Plan New Trip" on your dashboard. Tell our AI about your destination, travel dates, budget, interests, and travel style. Our intelligent system will generate a personalized itinerary with activities, restaurants, accommodations, and transportation. You can then customize every detail using our visual editor and add personal touches.',
    category: 'getting-started',
    helpful: 98
  },
  {
    id: '2',
    question: 'What makes WanderFiz different from other travel planning platforms?',
    answer: 'WanderFiz is the ultimate travel planner that combines advanced AI planning, real-time travel assistance, and automatic memory capture. Our platform learns your preferences to provide hyper-personalized recommendations, works seamlessly offline during travel, integrates with local services and booking platforms, and automatically organizes your photos and experiences into beautiful travel stories and memories.',
    category: 'features',
    helpful: 95
  },
  {
    id: '3',
    question: 'Can I use WanderFiz without internet while traveling?',
    answer: 'Absolutely! Our Explorer, Pro, and Enterprise plans include comprehensive offline functionality. Download your complete itineraries, offline maps, restaurant details, emergency contacts, and translation tools before traveling. The mobile app works seamlessly without internet connection, syncing your updates when you reconnect.',
    category: 'mobile',
    helpful: 97
  },
  {
    id: '4',
    question: 'How intelligent is the AI trip planning system?',
    answer: 'Our AI is incredibly sophisticated, analyzing hundreds of factors including your travel history, preferences, budget constraints, weather patterns, local events, seasonal considerations, crowd levels, opening hours, and travel times. It learns from millions of traveler experiences and continuously improves recommendations. The more you use WanderFiz, the better it understands your unique travel style and creates perfect itineraries tailored specifically for you.',
    category: 'trip-planning',
    helpful: 94
  },
  {
    id: '5',
    question: 'What destinations does WanderFiz cover?',
    answer: 'WanderFiz covers virtually every destination worldwide! We have detailed information for over 10,000 cities across all continents, including popular tourist destinations, hidden gems, off-the-beaten-path locations, and emerging travel hotspots. Our database includes local insights, cultural tips, seasonal recommendations, and up-to-date travel information for each destination.',
    category: 'destinations',
    helpful: 92
  },
  {
    id: '6',
    question: 'How does group travel planning work?',
    answer: 'Group travel is made easy with WanderFiz! Create a group trip and invite friends/family via email or link. Everyone can contribute ideas, vote on activities, share expenses, view real-time itinerary updates, and receive notifications. Our consensus algorithm helps resolve conflicting preferences, and the group chat feature keeps everyone connected throughout the planning process and during travel.',
    category: 'group-travel',
    helpful: 96
  },
  {
    id: '7',
    question: 'Is my personal travel data secure and private?',
    answer: 'Your privacy and security are our absolute top priority. We use enterprise-grade encryption (AES-256), secure cloud infrastructure, and never sell your personal data to third parties. You maintain full control over your information, can export your data anytime, and can delete your account permanently if desired. All payment processing is handled by secure, PCI-compliant systems.',
    category: 'account',
    helpful: 99
  },
  {
    id: '8',
    question: 'Can WanderFiz help with booking flights, hotels, and activities?',
    answer: 'Yes! WanderFiz integrates with trusted booking partners to help you reserve flights, accommodations, activities, and transportation directly through our platform. We compare prices across multiple providers to ensure you get the best deals. You can also import existing bookings or manage everything in one place for a seamless travel experience.',
    category: 'features',
    helpful: 91
  },
  {
    id: '9',
    question: 'What are the different subscription plans available?',
    answer: 'We offer flexible plans for every traveler: Free (basic trip planning for 1 trip), Explorer ($9.99/month for unlimited trips and offline features), Pro ($19.99/month adds group planning and premium AI), and Enterprise (custom pricing for organizations with advanced features, priority support, and team management tools).',
    category: 'account',
    helpful: 89
  },
  {
    id: '10',
    question: 'How do I cancel or modify my subscription?',
    answer: 'You have complete control over your subscription. Cancel anytime from your account settings with no cancellation fees. Your access continues until the end of your billing period, and you can reactivate anytime without losing your saved trips or preferences. Upgrade or downgrade plans instantly to match your travel needs.',
    category: 'account',
    helpful: 93
  },
  {
    id: '11',
    question: 'Does WanderFiz work for business travel planning?',
    answer: 'Absolutely! Our Enterprise plan is specifically designed for business travelers and organizations. Features include expense tracking, corporate booking integration, team trip management, travel policy compliance, detailed reporting, priority support, and administrative controls for travel managers.',
    category: 'features',
    helpful: 88
  },
  {
    id: '12',
    question: 'How do I get travel recommendations for specific interests?',
    answer: 'WanderFiz excels at personalized recommendations! During setup, specify your interests like adventure sports, cultural experiences, culinary exploration, photography, nightlife, family activities, or luxury travel. Our AI will curate activities, restaurants, and experiences that match your preferences, and you can always refine these in your profile settings.',
    category: 'trip-planning',
    helpful: 95
  }
]

const POPULAR_ARTICLES = [
  { title: 'Complete Beginner\'s Guide to AI Travel Planning', reads: '25.8K', category: 'Getting Started' },
  { title: 'How to Create Perfect Itineraries with WanderFiz AI', reads: '18.2K', category: 'AI Trip Planning' },
  { title: 'Ultimate Guide to Offline Travel Features', reads: '14.6K', category: 'Mobile Travel App' },
  { title: 'Group Travel Planning: Tips and Best Practices', reads: '12.4K', category: 'Group Travel' },
  { title: 'Hidden Gems: Finding Off-the-Beaten-Path Destinations', reads: '11.1K', category: 'Destinations' },
  { title: 'Budget Travel: Maximizing Value with WanderFiz', reads: '9.8K', category: 'AI Trip Planning' },
  { title: 'Travel Photography: Capturing Perfect Moments', reads: '8.5K', category: 'Features & Tools' },
  { title: 'Solo Travel Safety and Planning Guide', reads: '7.2K', category: 'Destinations' }
]

const TRAVEL_TIPS = [
  'Book flights on Tuesday-Wednesday for better deals',
  'Download offline maps before international travel',
  'Set up travel alerts for flight and weather updates',
  'Use local currency conversion for accurate budgeting',
  'Share your itinerary with emergency contacts',
  'Pack essentials in carry-on for delayed luggage'
]

const HelpCenterPage: React.FC = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null)

  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.3 })
  const { containerRef: categoriesRef, isVisible: categoriesVisible, visibleItems: categoryItems } = useStaggeredScrollAnimation(
    HELP_CATEGORIES.length,
    { threshold: 0.2, staggerDelay: 100 }
  )

  const filteredFAQs = selectedCategory
    ? FAQ_ITEMS.filter(faq => faq.category === selectedCategory)
    : FAQ_ITEMS.filter(faq => 
        searchQuery === '' || 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )

  const toggleFAQ = (faqId: string) => {
    setExpandedFAQ(expandedFAQ === faqId ? null : faqId)
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div ref={headerRef as React.RefObject<HTMLDivElement>} className={`text-center mb-16 transition-all duration-1000 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            WanderFiz
            <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              {' '}Help Center
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
            Your comprehensive guide to mastering WanderFiz - the ultimate travel planner and assistant. 
            Find answers, tutorials, and expert tips to make your travel planning effortless and enjoyable.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search travel tips, features, destinations, or ask any question..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 bg-glass-light backdrop-blur-md border border-white/20 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <span className="text-gray-400 text-xl">🔍</span>
              </div>
            </div>
          </div>
        </div>

        {/* Help Categories */}
        <div ref={categoriesRef as React.RefObject<HTMLDivElement>} className="mb-16">
          <div className={`text-center mb-12 transition-all duration-1000 ${categoriesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Explore Help Topics
            </h2>
            <p className="text-gray-600 text-lg">
              Choose a category to find detailed guides, tutorials, and expert travel advice
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {HELP_CATEGORIES.map((category, index) => (
              <div
                key={category.id}
                className={`transition-all duration-700 ${
                  categoryItems.has(index) 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <Card
                  variant="glass"
                  hover
                  padding="large"
                  className={`cursor-pointer h-full transform hover:scale-105 transition-all duration-300 ${
                    selectedCategory === category.id 
                      ? 'ring-2 ring-primary-500 ring-opacity-50 scale-105' 
                      : ''
                  }`}
                  onClick={() => setSelectedCategory(
                    selectedCategory === category.id ? null : category.id
                  )}
                >
                  <div className="text-center">
                    <div className="text-4xl mb-4">{category.icon}</div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {category.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {category.description}
                    </p>
                    <div className="text-xs text-primary-600 font-medium bg-primary-50 px-3 py-1 rounded-full inline-block">
                      {category.articleCount} articles
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>

          {selectedCategory && (
            <div className="text-center">
              <Button
                variant="ghost"
                onClick={() => setSelectedCategory(null)}
                className="bg-glass-light backdrop-blur-md border border-white/20"
              >
                ← Show All Categories
              </Button>
            </div>
          )}
        </div>

        {/* FAQ Section */}
        <div className={`mb-16 transition-all duration-1000 delay-500 ${categoriesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* FAQ List */}
            <div className="lg:col-span-2">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {selectedCategory 
                    ? `${HELP_CATEGORIES.find(cat => cat.id === selectedCategory)?.title} FAQ`
                    : searchQuery 
                      ? `Search Results`
                      : 'Frequently Asked Questions'
                  }
                </h2>
                <p className="text-gray-600">
                  {filteredFAQs.length} question{filteredFAQs.length !== 1 ? 's' : ''} 
                  {searchQuery && ` matching "${searchQuery}"`}
                </p>
              </div>

              <div className="space-y-4">
                {filteredFAQs.map((faq, index) => (
                  <Card
                    key={faq.id}
                    variant="glass"
                    hover
                    className="cursor-pointer transition-all duration-300"
                    onClick={() => toggleFAQ(faq.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2 text-lg">
                          {faq.question}
                        </h3>
                        {expandedFAQ === faq.id && (
                          <div className="mt-4 pt-4 border-t border-white/20 animate-in slide-in-from-top duration-300">
                            <p className="text-gray-700 leading-relaxed mb-6 text-base">
                              {faq.answer}
                            </p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <span className="bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-700 px-3 py-1 rounded-full text-xs font-medium">
                                  {HELP_CATEGORIES.find(cat => cat.id === faq.category)?.title}
                                </span>
                                <span className="flex items-center">
                                  <span className="text-green-500 mr-1">✓</span>
                                  {faq.helpful}% found this helpful
                                </span>
                              </div>
                              <div className="flex items-center space-x-3">
                                <button className="text-green-600 hover:text-green-700 text-sm font-medium hover:bg-green-50 px-2 py-1 rounded transition-colors">
                                  👍 Helpful
                                </button>
                                <button className="text-gray-500 hover:text-red-600 text-sm font-medium hover:bg-red-50 px-2 py-1 rounded transition-colors">
                                  👎 Not helpful
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className={`ml-4 transition-transform duration-300 ${
                        expandedFAQ === faq.id ? 'rotate-45' : ''
                      }`}>
                        <span className="text-primary-500 text-2xl font-light">+</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {filteredFAQs.length === 0 && (
                <Card variant="glass" padding="large">
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🤔</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      No results found
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Try adjusting your search terms or browse our help categories above
                    </p>
                    <Button
                      onClick={() => {
                        setSearchQuery('')
                        setSelectedCategory(null)
                      }}
                      className="bg-gradient-to-r from-primary-600 to-secondary-600"
                    >
                      Clear Search & Show All
                    </Button>
                  </div>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card variant="glass" padding="large">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="mr-2">📈</span>
                  Popular Articles
                </h3>
                <div className="space-y-4">
                  {POPULAR_ARTICLES.map((article, index) => (
                    <div key={index} className="border-b border-white/20 pb-4 last:border-b-0 last:pb-0">
                      <h4 className="font-medium text-gray-900 text-sm mb-2 cursor-pointer hover:text-primary-600 transition-colors leading-snug">
                        {article.title}
                      </h4>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-primary-600 bg-primary-50 px-2 py-1 rounded-full">{article.category}</span>
                        <span className="text-xs text-gray-500 font-medium">{article.reads} reads</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card variant="glass" padding="large">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="mr-2">💡</span>
                  Quick Travel Tips
                </h3>
                <div className="space-y-3">
                  {TRAVEL_TIPS.map((tip, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <span className="text-primary-500 text-xs mt-1">⭐</span>
                      <span className="text-sm text-gray-700 leading-relaxed">{tip}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card variant="glass" padding="large">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="mr-2">🚀</span>
                  Need More Help?
                </h3>
                <div className="space-y-3">
                  <Button
                    variant="ghost"
                    onClick={() => navigate('/contact')}
                    className="w-full justify-start bg-glass-light backdrop-blur-md border border-white/20 hover:bg-primary-50"
                  >
                    <span className="mr-3">📧</span>
                    Contact Support Team
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start bg-glass-light backdrop-blur-md border border-white/20 hover:bg-primary-50"
                  >
                    <span className="mr-3">💬</span>
                    Live Chat Support
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start bg-glass-light backdrop-blur-md border border-white/20 hover:bg-primary-50"
                  >
                    <span className="mr-3">🌐</span>
                    Community Forum
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start bg-glass-light backdrop-blur-md border border-white/20 hover:bg-primary-50"
                  >
                    <span className="mr-3">📱</span>
                    Download Mobile App
                  </Button>
                </div>
              </Card>

              <Card variant="glass" padding="large">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="mr-2">🔗</span>
                  Quick Links
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() => navigate('/features')}
                    className="block w-full text-left text-sm text-gray-600 hover:text-primary-600 py-2 px-3 hover:bg-primary-50 rounded transition-colors"
                  >
                    → Feature Overview
                  </button>
                  <button
                    onClick={() => navigate('/how-it-works')}
                    className="block w-full text-left text-sm text-gray-600 hover:text-primary-600 py-2 px-3 hover:bg-primary-50 rounded transition-colors"
                  >
                    → How WanderFiz Works
                  </button>
                  <button
                    onClick={() => navigate('/pricing')}
                    className="block w-full text-left text-sm text-gray-600 hover:text-primary-600 py-2 px-3 hover:bg-primary-50 rounded transition-colors"
                  >
                    → Pricing & Plans
                  </button>
                  <button
                    onClick={() => navigate('/about')}
                    className="block w-full text-left text-sm text-gray-600 hover:text-primary-600 py-2 px-3 hover:bg-primary-50 rounded transition-colors"
                  >
                    → About WanderFiz
                  </button>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className={`transition-all duration-1000 delay-700 ${categoriesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Card variant="glass" className="max-w-5xl mx-auto" padding="large">
            <div className="text-center">
              <div className="text-5xl mb-4">🌟</div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Ready to Start Your Perfect Trip?
              </h3>
              <p className="text-gray-600 mb-8 max-w-3xl mx-auto text-lg leading-relaxed">
                Join thousands of happy travelers who use WanderFiz to plan unforgettable journeys. 
                Our AI-powered platform makes travel planning effortless, personalized, and exciting.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="large"
                  onClick={() => navigate('/signup')}
                  className="bg-gradient-to-r from-primary-600 to-secondary-600 px-8 py-4 text-lg"
                >
                  Start Planning Free
                </Button>
                <Button
                  variant="ghost"
                  size="large"
                  onClick={() => navigate('/contact')}
                  className="bg-glass-light backdrop-blur-md border border-white/20 px-8 py-4 text-lg"
                >
                  Contact Our Team
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default HelpCenterPage