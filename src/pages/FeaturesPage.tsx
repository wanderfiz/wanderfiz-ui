import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import GlassCard from '../components/ui/GlassCard';
import GlassButton from '../components/ui/GlassButton';

interface DetailedFeature {
  id: string;
  icon: string;
  title: string;
  description: string;
  longDescription: string;
  keyBenefits: string[];
  useCases: string[];
  availability: string[];
  gradient: string;
  category: string;
}

const detailedFeatures: DetailedFeature[] = [
  {
    id: 'ai-trip-generator',
    icon: '🤖',
    title: 'Intelligent Trip Generator',
    description: 'Generate complete itineraries using AI based on your preferences',
    longDescription: 'Our advanced AI understands natural language and creates personalized travel itineraries in minutes. Simply describe your dream trip, and watch as WanderFiz crafts the perfect plan tailored to your interests, budget, and travel style.',
    keyBenefits: [
      'Natural language input - just describe your trip',
      'Personalized recommendations based on your preferences',
      'Optimized routes and schedules to maximize your time',
      'Real-time price monitoring and suggestions',
      'Integration with booking platforms'
    ],
    useCases: [
      'First-time visitors to a destination',
      'Travelers with specific interests or themes',
      'Business travelers with tight schedules',
      'Group trips requiring coordination'
    ],
    availability: ['Explorer', 'Pro', 'Enterprise'],
    gradient: 'from-[#FF561D] to-[#0ea5e9]',
    category: 'Smart Trip Planning'
  },
  {
    id: 'visual-designer',
    icon: '🎨',
    title: 'Visual Itinerary Designer',
    description: 'Drag-and-drop interface for creating and editing itineraries',
    longDescription: 'Create beautiful, visual itineraries with our intuitive drag-and-drop interface. See your entire trip timeline at a glance and make adjustments with ease.',
    keyBenefits: [
      'Intuitive visual planning interface',
      'Easy schedule adjustments with drag-and-drop',
      'Timeline view of all activities',
      'Collaborative editing for group trips',
      'Export to multiple formats'
    ],
    useCases: [
      'Visual learners who prefer graphical planning',
      'Complex multi-day itineraries',
      'Group trip coordination',
      'Professional travel planning'
    ],
    availability: ['Free', 'Explorer', 'Pro', 'Enterprise'],
    gradient: 'from-[#0ea5e9] to-[#a855f7]',
    category: 'Smart Trip Planning'
  },
  {
    id: 'live-navigation',
    icon: '🧭',
    title: 'Instant Navigation',
    description: 'Real-time GPS navigation with offline maps',
    longDescription: 'Never get lost again with our advanced navigation system. Works completely offline with detailed maps and real-time guidance.',
    keyBenefits: [
      'Offline map access for 200+ countries',
      'Real-time traffic updates and route optimization',
      'Voice-guided navigation in 50+ languages',
      'Integration with public transportation',
      'Landmark-based directions for easier navigation'
    ],
    useCases: [
      'Solo travelers in unfamiliar destinations',
      'Areas with poor internet connectivity',
      'Walking tours and city exploration',
      'Emergency navigation situations'
    ],
    availability: ['Explorer', 'Pro', 'Enterprise'],
    gradient: 'from-[#a855f7] to-[#84cc16]',
    category: 'Real-Time Assistant'
  },
  {
    id: 'photo-timeline',
    icon: '📷',
    title: 'Smart Photo Timeline',
    description: 'Automatically organize photos by location and time',
    longDescription: 'Your travel memories, perfectly organized. Our AI automatically sorts and tags your photos, creating beautiful timelines of your adventures.',
    keyBenefits: [
      'Automatic photo organization by location and time',
      'AI-powered tagging and categorization',
      'Beautiful timeline views of your travels',
      'Easy sharing with friends and family',
      'Backup and sync across all devices'
    ],
    useCases: [
      'Photography enthusiasts',
      'Family vacation documentation',
      'Social media content creation',
      'Travel bloggers and influencers'
    ],
    availability: ['Free', 'Explorer', 'Pro', 'Enterprise'],
    gradient: 'from-[#84cc16] to-[#fbbf24]',
    category: 'Memory Capture'
  },
  {
    id: 'expense-splitting',
    icon: '💰',
    title: 'Smart Expense Splitting',
    description: 'Automatically calculate and split shared expenses',
    longDescription: 'End the awkwardness of splitting bills. Our intelligent system tracks expenses and calculates fair splits automatically.',
    keyBenefits: [
      'Automatic expense categorization',
      'Fair splitting algorithms for complex scenarios',
      'Real-time settlement tracking',
      'Multiple currency support with live rates',
      'Integration with payment platforms'
    ],
    useCases: [
      'Group trips with friends',
      'Family vacations with multiple participants',
      'Business travel expense management',
      'Shared accommodation costs'
    ],
    availability: ['Pro', 'Enterprise'],
    gradient: 'from-[#fbbf24] to-[#FF561D]',
    category: 'Group Travel'
  },
  {
    id: 'emergency-sos',
    icon: '🚨',
    title: 'Emergency SOS System',
    description: 'One-tap emergency assistance with location sharing',
    longDescription: 'Travel with confidence knowing help is just one tap away. Our emergency system connects you with local authorities and shares your location with trusted contacts.',
    keyBenefits: [
      'One-tap SOS activation',
      'Automatic location sharing with emergency contacts',
      'Direct connection to local emergency services',
      'Embassy and consulate contact information',
      'Medical information and allergy alerts'
    ],
    useCases: [
      'Solo travelers in remote areas',
      'Travelers with medical conditions',
      'Adventure and outdoor activities',
      'Business travel safety compliance'
    ],
    availability: ['Explorer', 'Pro', 'Enterprise'],
    gradient: 'from-[#ef4444] to-[#dc2626]',
    category: 'Safety & Emergency'
  }
];

const categories = [
  'All Features',
  'Smart Trip Planning',
  'Real-Time Assistant',
  'Memory Capture',
  'Group Travel',
  'Safety & Emergency'
];

const FeaturesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Features');
  const [expandedFeature, setExpandedFeature] = useState<string | null>(null);

  const filteredFeatures = selectedCategory === 'All Features' 
    ? detailedFeatures 
    : detailedFeatures.filter(f => f.category === selectedCategory);

  return (
    <div className="min-h-screen pt-20 pb-16 bg-hero">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Features That{' '}
              <span className="bg-gradient-to-r from-[#FF561D] to-[#0ea5e9] bg-clip-text text-transparent">
                Transform
              </span>{' '}
              Travel
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover how WanderFiz revolutionizes every aspect of your travel experience, from planning to memories
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-[#FF561D] to-[#0ea5e9] text-white shadow-lg'
                    : 'bg-white/40 backdrop-blur-md border border-white/30 text-gray-700 hover:bg-white/50 hover:scale-105'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredFeatures.map((feature) => (
              <div key={feature.id} className="group">
                <GlassCard className="p-8 h-full hover:scale-[1.02] transition-all duration-500">
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} p-4 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          <span className="text-2xl">{feature.icon}</span>
                        </div>
                        <div className={`absolute -inset-1 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-20 blur-md group-hover:opacity-40 transition-opacity duration-300`}></div>
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {feature.description}
                        </p>
                        <div className="mt-3">
                          <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${feature.gradient} text-white`}>
                            {feature.category}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 leading-relaxed">
                      {feature.longDescription}
                    </p>

                    {/* Key Benefits */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Key Benefits:</h4>
                      <ul className="space-y-2">
                        {feature.keyBenefits.slice(0, expandedFeature === feature.id ? undefined : 3).map((benefit, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                            <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${feature.gradient} mt-2 flex-shrink-0`}></div>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                      
                      {feature.keyBenefits.length > 3 && (
                        <button
                          onClick={() => setExpandedFeature(expandedFeature === feature.id ? null : feature.id)}
                          className={`mt-2 text-sm font-medium bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent hover:opacity-80 transition-opacity`}
                        >
                          {expandedFeature === feature.id ? 'Show less' : `Show ${feature.keyBenefits.length - 3} more benefits`} →
                        </button>
                      )}
                    </div>

                    {/* Use Cases - Only show when expanded */}
                    {expandedFeature === feature.id && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Perfect for:</h4>
                        <div className="flex flex-wrap gap-2">
                          {feature.useCases.map((useCase, index) => (
                            <span key={index} className="px-3 py-1 bg-white/50 backdrop-blur-sm rounded-full text-sm text-gray-700 border border-white/20">
                              {useCase}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Availability */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/20">
                      <div className="text-sm text-gray-600">
                        Available on: <span className="font-medium text-gray-800">{feature.availability.join(', ')}</span>
                      </div>
                      <button className={`text-sm font-medium bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent hover:opacity-80 transition-opacity`}>
                        Learn more →
                      </button>
                    </div>
                  </div>
                </GlassCard>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <GlassCard className="inline-block p-8">
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-gray-900">
                  Ready to Experience All Features?
                </h3>
                <p className="text-gray-600 max-w-2xl">
                  Start your free trial today and discover how WanderFiz can transform your travel experience.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/signup">
                    <GlassButton variant="primary" size="large">
                      Start Free Trial
                    </GlassButton>
                  </Link>
                  <Link to="/pricing">
                    <GlassButton variant="secondary" size="large">
                      View Pricing Plans
                    </GlassButton>
                  </Link>
                </div>
                <p className="text-sm text-gray-500">
                  No credit card required • Free forever plan available
                </p>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturesPage