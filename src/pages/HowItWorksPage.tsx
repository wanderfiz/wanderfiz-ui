import React from 'react';
import { Link } from 'react-router-dom';
import GlassCard from '../components/ui/GlassCard';
import GlassButton from '../components/ui/GlassButton';

interface JourneyStage {
  id: string;
  step: number;
  title: string;
  subtitle: string;
  description: string;
  detailedDescription: string;
  icon: string;
  gradient: string;
  features: string[];
  duration: string;
  userActions: string[];
  outcomes: string[];
}

const journeyStages: JourneyStage[] = [
  {
    id: 'planning',
    step: 1,
    title: 'Dream & Plan',
    subtitle: 'AI-Powered Trip Planning',
    description: 'Transform your travel dreams into detailed itineraries with the power of AI',
    detailedDescription: 'Start by sharing your travel vision with WanderFiz. Our advanced AI understands natural language and creates personalized itineraries that match your interests, budget, and travel style. Whether you\'re planning a romantic getaway, family vacation, or solo adventure, we\'ll craft the perfect journey for you.',
    icon: '🗺️',
    gradient: 'from-[#FF561D] to-[#0ea5e9]',
    features: [
      'Natural language trip description',
      'AI-powered itinerary generation',
      'Visual drag-and-drop editor',
      'Budget optimization suggestions',
      'Local insights and hidden gems',
      'Weather-aware recommendations',
      'Collaborative planning for groups'
    ],
    duration: '5-10 minutes',
    userActions: [
      'Describe your ideal trip in plain English',
      'Set your budget and travel dates',
      'Choose your interests and preferences',
      'Review AI-generated itinerary',
      'Customize with visual editor'
    ],
    outcomes: [
      'Complete day-by-day itinerary',
      'Optimized routes and timing',
      'Budget breakdown and estimates',
      'Personalized recommendations',
      'Booking links and reservations'
    ]
  },
  {
    id: 'traveling',
    step: 2,
    title: 'Travel & Explore',
    subtitle: 'Real-Time Travel Assistant',
    description: 'Your intelligent companion guides you through every moment of your journey',
    detailedDescription: 'Once you\'re on the road, WanderFiz becomes your personal travel assistant. Get real-time navigation, local recommendations, weather updates, and smart reminders. Our offline-first approach ensures you\'re never stranded without guidance, even in remote locations.',
    icon: '📱',
    gradient: 'from-[#0ea5e9] to-[#a855f7]',
    features: [
      'GPS navigation with offline maps',
      'Real-time local recommendations',
      'Smart notifications and reminders',
      'Live weather and traffic updates',
      'Emergency assistance features',
      'Translation and communication help',
      'Expense tracking and splitting'
    ],
    duration: 'Throughout your trip',
    userActions: [
      'Follow GPS navigation to destinations',
      'Receive smart notifications and reminders',
      'Get real-time recommendations',
      'Track expenses and photos automatically',
      'Use emergency features if needed'
    ],
    outcomes: [
      'Stress-free navigation',
      'Discover hidden local spots',
      'Stay on budget and schedule',
      'Capture memories effortlessly',
      'Feel safe and supported'
    ]
  },
  {
    id: 'remembering',
    step: 3,
    title: 'Capture & Remember',
    subtitle: 'Memory Preservation & Storytelling',
    description: 'Transform your travel experiences into beautiful, lasting memories',
    detailedDescription: 'After your trip, WanderFiz helps you preserve and share your memories. Our AI automatically organizes your photos by location and time, creates beautiful travel stories, and helps you share your adventures with friends and family. Your memories are safely stored and easily accessible forever.',
    icon: '📸',
    gradient: 'from-[#a855f7] to-[#84cc16]',
    features: [
      'Automatic photo organization by location',
      'AI-generated travel stories and narratives',
      'Beautiful timeline views of your journey',
      'Easy sharing with friends and family',
      'Cloud backup and synchronization',
      'Expense reports and summaries',
      'Trip analytics and insights'
    ],
    duration: 'Forever',
    userActions: [
      'Photos automatically organized',
      'Review AI-generated travel story',
      'Share highlights with friends',
      'Export memories in various formats',
      'Plan your next adventure'
    ],
    outcomes: [
      'Beautifully organized photo timeline',
      'Compelling travel narratives',
      'Easy sharing capabilities',
      'Permanent memory preservation',
      'Inspiration for future trips'
    ]
  }
];

const HowItWorksPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-20 pb-16 bg-hero">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              How{' '}
              <span className="bg-gradient-to-r from-[#FF561D] to-[#0ea5e9] bg-clip-text text-transparent">
                WanderFiz
              </span>{' '}
              Works
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              From dream to memory in three simple stages. See how WanderFiz transforms your entire travel experience.
            </p>
          </div>

          {/* Process Overview */}
          <div className="flex justify-center mb-16">
            <GlassCard className="inline-flex p-6">
              <div className="flex items-center gap-8">
                {journeyStages.map((stage, index) => (
                  <div key={stage.id} className="flex items-center">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${stage.gradient} flex items-center justify-center text-white font-bold`}>
                        {stage.step}
                      </div>
                      <div className="hidden sm:block">
                        <div className="text-sm font-medium text-gray-900">{stage.title}</div>
                        <div className="text-xs text-gray-600">{stage.duration}</div>
                      </div>
                    </div>
                    {index < journeyStages.length - 1 && (
                      <div className="hidden md:block w-16 h-0.5 bg-gradient-to-r from-gray-300 to-gray-200 mx-6"></div>
                    )}
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Detailed Steps */}
      <section className="pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {journeyStages.map((stage, index) => (
              <div key={stage.id} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                {/* Content */}
                <div className={`space-y-8 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stage.gradient} p-4 flex items-center justify-center shadow-lg`}>
                        <span className="text-2xl">{stage.icon}</span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-600">Step {stage.step}</div>
                        <h2 className="text-3xl font-bold text-gray-900">{stage.title}</h2>
                      </div>
                    </div>
                    
                    <h3 className={`text-xl font-semibold bg-gradient-to-r ${stage.gradient} bg-clip-text text-transparent`}>
                      {stage.subtitle}
                    </h3>
                    
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {stage.detailedDescription}
                    </p>
                  </div>

                  {/* Features Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">What You Do:</h4>
                      <ul className="space-y-2">
                        {stage.userActions.map((action, actionIndex) => (
                          <li key={actionIndex} className="flex items-start gap-2 text-sm text-gray-600">
                            <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${stage.gradient} mt-2 flex-shrink-0`}></div>
                            <span>{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">What You Get:</h4>
                      <ul className="space-y-2">
                        {stage.outcomes.map((outcome, outcomeIndex) => (
                          <li key={outcomeIndex} className="flex items-start gap-2 text-sm text-gray-600">
                            <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${stage.gradient} mt-2 flex-shrink-0`}></div>
                            <span>{outcome}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Duration Badge */}
                  <div className="inline-block">
                    <span className={`px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r ${stage.gradient} text-white`}>
                      Duration: {stage.duration}
                    </span>
                  </div>
                </div>

                {/* Visual */}
                <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <GlassCard className="p-8">
                    <div className={`h-80 bg-gradient-to-br ${stage.gradient.replace('from-', 'from-').replace('to-', 'to-')}/10 rounded-xl flex items-center justify-center relative overflow-hidden`}>
                      {/* Stage-specific illustrations */}
                      {stage.id === 'planning' && (
                        <div className="relative w-full h-full">
                          <div className="absolute top-8 left-8 space-y-3">
                            <div className="w-40 h-6 bg-white/50 rounded-lg animate-pulse"></div>
                            <div className="w-32 h-4 bg-white/30 rounded animate-pulse delay-100"></div>
                            <div className="w-36 h-4 bg-white/30 rounded animate-pulse delay-200"></div>
                          </div>
                          <div className="absolute bottom-8 right-8 w-20 h-20 bg-gradient-to-br from-[#FF561D] to-[#0ea5e9] rounded-full animate-bounce flex items-center justify-center text-white text-2xl">
                            ✈️
                          </div>
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <div className="w-24 h-24 border-4 border-white/30 rounded-full animate-spin-slow"></div>
                          </div>
                        </div>
                      )}
                      
                      {stage.id === 'traveling' && (
                        <div className="relative w-full h-full flex items-center justify-center">
                          <div className="absolute inset-0 w-full h-full border-4 border-[#0ea5e9]/20 rounded-full animate-ping"></div>
                          <div className="absolute inset-8 w-full h-full border-4 border-[#0ea5e9]/30 rounded-full animate-ping animation-delay-200"></div>
                          <div className="w-32 h-32 bg-white/30 rounded-full flex items-center justify-center">
                            <span className="text-6xl">📍</span>
                          </div>
                        </div>
                      )}
                      
                      {stage.id === 'remembering' && (
                        <div className="grid grid-cols-4 gap-2 p-4 w-full h-full">
                          {[...Array(16)].map((_, i) => (
                            <div key={i} className="aspect-square bg-white/30 rounded-lg animate-fade-in flex items-center justify-center text-lg" style={{animationDelay: `${i * 50}ms`}}>
                              {i % 4 === 0 ? '🏔️' : i % 4 === 1 ? '🏖️' : i % 4 === 2 ? '🌃' : '🎭'}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </GlassCard>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center mt-20">
            <GlassCard className="inline-block p-8">
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-gray-900">
                  Ready to Start Your Journey?
                </h3>
                <p className="text-gray-600 max-w-2xl">
                  Experience the future of travel planning. From AI-powered itineraries to lasting memories, WanderFiz is with you every step of the way.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/signup">
                    <GlassButton variant="primary" size="large">
                      Start Free Trial
                    </GlassButton>
                  </Link>
                  <Link to="/features">
                    <GlassButton variant="secondary" size="large">
                      Explore Features
                    </GlassButton>
                  </Link>
                </div>
                <p className="text-sm text-gray-500">
                  No credit card required • See results in minutes
                </p>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorksPage