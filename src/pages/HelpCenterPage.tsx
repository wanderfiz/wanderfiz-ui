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
    description: 'Learn the basics of using WanderFiz',
    icon: '🚀',
    articleCount: 12
  },
  {
    id: 'trip-planning',
    title: 'Trip Planning',
    description: 'Plan amazing trips with AI assistance',
    icon: '🗺️',
    articleCount: 18
  },
  {
    id: 'features',
    title: 'Features & Tools',
    description: 'Explore all WanderFiz features',
    icon: '⚙️',
    articleCount: 24
  },
  {
    id: 'account',
    title: 'Account & Billing',
    description: 'Manage your account and subscriptions',
    icon: '👤',
    articleCount: 15
  },
  {
    id: 'mobile',
    title: 'Mobile App',
    description: 'Get help with mobile features',
    icon: '📱',
    articleCount: 10
  },
  {
    id: 'troubleshooting',
    title: 'Troubleshooting',
    description: 'Solve common issues',
    icon: '🔧',
    articleCount: 8
  }
]

const FAQ_ITEMS: FAQItem[] = [
  {
    id: '1',
    question: 'How do I create my first trip with WanderFiz?',
    answer: 'Creating your first trip is easy! Sign up for an account, click "Plan New Trip" on your dashboard, tell our AI about your preferences, destination, and budget, and let WanderFiz generate a personalized itinerary for you. You can then customize it using our visual editor.',
    category: 'getting-started',
    helpful: 95
  },
  {
    id: '2',
    question: 'What makes WanderFiz different from other trip planning tools?',
    answer: 'WanderFiz combines AI-powered planning with real-time travel assistance and automatic memory capture. Our platform learns your preferences to provide personalized recommendations, works offline during travel, and automatically organizes your photos and experiences into beautiful travel stories.',
    category: 'features',
    helpful: 88
  },
  {
    id: '3',
    question: 'Can I use WanderFiz without an internet connection?',
    answer: 'Yes! Our Explorer, Pro, and Enterprise plans include advanced offline functionality. You can access your itineraries, maps, and core features even without internet connection. Just make sure to sync your trips before traveling.',
    category: 'mobile',
    helpful: 92
  },
  {
    id: '4',
    question: 'How does the AI trip planning work?',
    answer: 'Our AI analyzes your travel preferences, budget, interests, and travel style to create personalized itineraries. It considers factors like weather, local events, opening hours, and travel times to optimize your schedule. The more you use WanderFiz, the better it understands your preferences.',
    category: 'trip-planning',
    helpful: 90
  },
  {
    id: '5',
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, and Google Pay. Enterprise customers can also pay via bank transfer and receive invoicing.',
    category: 'account',
    helpful: 85
  },
  {
    id: '6',
    question: 'Can I collaborate with friends on trip planning?',
    answer: 'Absolutely! WanderFiz offers group trip features where you can invite friends to collaborate on itineraries, share expenses, vote on activities, and keep everyone updated with real-time notifications.',
    category: 'features',
    helpful: 93
  },
  {
    id: '7',
    question: 'Is my travel data secure and private?',
    answer: 'Yes, your privacy is our top priority. We use enterprise-grade encryption, never sell your data to third parties, and give you full control over your information. You can export or delete your data at any time.',
    category: 'account',
    helpful: 96
  },
  {
    id: '8',
    question: 'How do I cancel my subscription?',
    answer: 'You can cancel your subscription anytime from your account settings. Your access will continue until the end of your billing period, and you can reactivate anytime without losing your data.',
    category: 'account',
    helpful: 89
  }
]

const POPULAR_ARTICLES = [
  { title: 'Complete Beginner\'s Guide to WanderFiz', reads: '12.5K', category: 'Getting Started' },
  { title: 'How to Use AI Trip Planning Effectively', reads: '8.2K', category: 'Trip Planning' },
  { title: 'Offline Travel: Everything You Need to Know', reads: '6.8K', category: 'Mobile App' },
  { title: 'Group Trip Planning Made Easy', reads: '5.4K', category: 'Features' },
  { title: 'Troubleshooting Common Login Issues', reads: '4.1K', category: 'Troubleshooting' }
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
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Help
            <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              {' '}Center
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
            Find answers to frequently asked questions and get help with using WanderFiz. 
            Our comprehensive guides will help you make the most of your travel planning experience.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for help articles, features, or questions..."
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Browse by Category
            </h2>
            <p className="text-gray-600">
              Choose a category to find specific help articles and guides
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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
                  className={`cursor-pointer h-full ${
                    selectedCategory === category.id 
                      ? 'ring-2 ring-primary-500 ring-opacity-50' 
                      : ''
                  }`}
                  onClick={() => setSelectedCategory(
                    selectedCategory === category.id ? null : category.id
                  )}
                >
                  <div className="text-center">
                    <div className="text-3xl mb-4">{category.icon}</div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {category.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {category.description}
                    </p>
                    <div className="text-xs text-primary-600 font-medium">
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
                Show All Categories
              </Button>
            </div>
          )}
        </div>

        {/* FAQ Section */}
        <div className={`mb-16 transition-all duration-1000 delay-500 ${categoriesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* FAQ List */}
            <div className="lg:col-span-3">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {selectedCategory 
                    ? `${HELP_CATEGORIES.find(cat => cat.id === selectedCategory)?.title} FAQ`
                    : searchQuery 
                      ? `Search Results for "${searchQuery}"`
                      : 'Frequently Asked Questions'
                  }
                </h2>
                <p className="text-gray-600">
                  {filteredFAQs.length} question{filteredFAQs.length !== 1 ? 's' : ''} found
                </p>
              </div>

              <div className="space-y-4">
                {filteredFAQs.map((faq) => (
                  <Card
                    key={faq.id}
                    variant="glass"
                    hover
                    className="cursor-pointer"
                    onClick={() => toggleFAQ(faq.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2">
                          {faq.question}
                        </h3>
                        {expandedFAQ === faq.id && (
                          <div className="mt-4 pt-4 border-t border-white/20">
                            <p className="text-gray-700 leading-relaxed mb-4">
                              {faq.answer}
                            </p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-xs">
                                  {HELP_CATEGORIES.find(cat => cat.id === faq.category)?.title}
                                </span>
                                <span>{faq.helpful}% found this helpful</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <button className="text-green-600 hover:text-green-700 text-sm">
                                  👍 Helpful
                                </button>
                                <button className="text-red-600 hover:text-red-700 text-sm">
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
                        <span className="text-gray-500 text-xl">+</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {filteredFAQs.length === 0 && (
                <Card variant="glass" padding="large">
                  <div className="text-center py-8">
                    <div className="text-4xl mb-4">🔍</div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No results found
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Try adjusting your search or browse our categories
                    </p>
                    <Button
                      onClick={() => {
                        setSearchQuery('')
                        setSelectedCategory(null)
                      }}
                    >
                      Clear Search
                    </Button>
                  </div>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card variant="glass" padding="large">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Popular Articles</h3>
                <div className="space-y-3">
                  {POPULAR_ARTICLES.map((article, index) => (
                    <div key={index} className="border-b border-white/20 pb-3 last:border-b-0 last:pb-0">
                      <h4 className="font-medium text-gray-900 text-sm mb-1 cursor-pointer hover:text-primary-600">
                        {article.title}
                      </h4>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">{article.category}</span>
                        <span className="text-xs text-gray-500">{article.reads} reads</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card variant="glass" padding="large">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Need More Help?</h3>
                <div className="space-y-3">
                  <Button
                    variant="ghost"
                    onClick={() => navigate('/contact')}
                    className="w-full justify-start bg-glass-light backdrop-blur-md border border-white/20"
                  >
                    <span className="mr-3">📧</span>
                    Contact Support
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start bg-glass-light backdrop-blur-md border border-white/20"
                  >
                    <span className="mr-3">💬</span>
                    Live Chat
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start bg-glass-light backdrop-blur-md border border-white/20"
                  >
                    <span className="mr-3">🌐</span>
                    Community Forum
                  </Button>
                </div>
              </Card>

              <Card variant="glass" padding="large">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Links</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => navigate('/features')}
                    className="block w-full text-left text-sm text-gray-600 hover:text-primary-600 py-1"
                  >
                    Feature Overview
                  </button>
                  <button
                    onClick={() => navigate('/how-it-works')}
                    className="block w-full text-left text-sm text-gray-600 hover:text-primary-600 py-1"
                  >
                    How It Works
                  </button>
                  <button
                    onClick={() => navigate('/pricing')}
                    className="block w-full text-left text-sm text-gray-600 hover:text-primary-600 py-1"
                  >
                    Pricing Plans
                  </button>
                  <button
                    onClick={() => navigate('/about')}
                    className="block w-full text-left text-sm text-gray-600 hover:text-primary-600 py-1"
                  >
                    About WanderFiz
                  </button>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className={`transition-all duration-1000 delay-700 ${categoriesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Card variant="glass" className="max-w-4xl mx-auto" padding="large">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Still Need Help?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Can&apos;t find what you&apos;re looking for? Our support team is here to help you 
                with any questions about WanderFiz features, account issues, or trip planning.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="large"
                  onClick={() => navigate('/contact')}
                >
                  Contact Support Team
                </Button>
                <Button
                  variant="ghost"
                  size="large"
                  className="bg-glass-light backdrop-blur-md border border-white/20"
                >
                  Schedule a Call
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