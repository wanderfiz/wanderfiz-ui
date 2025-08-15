import React from 'react';
import GlassCard from '../ui/GlassCard';

interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
  keyPoints: string[];
  gradient: string;
}

const features: Feature[] = [
  {
    id: 'smart-planning',
    icon: '🗺️',
    title: 'AI-Powered Planning',
    description: 'Describe your dream trip in plain language and get a complete itinerary. Our AI understands your preferences and creates personalized plans.',
    keyPoints: ['Natural language input', 'Visual designer', 'Real-time sync'],
    gradient: 'from-[#FF561D] to-[#0ea5e9]'
  },
  {
    id: 'travel-assistant',
    icon: '📱',
    title: 'Your Pocket Guide',
    description: 'Navigate seamlessly with our real-time assistant. Works offline, provides instant translations, and handles emergencies.',
    keyPoints: ['Offline mode', 'Emergency SOS', 'Live navigation'],
    gradient: 'from-[#0ea5e9] to-[#a855f7]'
  },
  {
    id: 'memory-capture',
    icon: '📷',
    title: 'Turn Moments into Stories',
    description: 'Automatically organize photos by time and location. AI generates beautiful travel stories from your memories.',
    keyPoints: ['Auto photo timeline', 'AI story generator', 'Social sharing'],
    gradient: 'from-[#a855f7] to-[#84cc16]'
  },
  {
    id: 'group-travel',
    icon: '💳',
    title: 'Group Coordination Made Simple',
    description: 'Split expenses instantly, coordinate activities, and keep everyone on the same page. No more payment confusion.',
    keyPoints: ['Smart expense splitting', 'Group chat', 'Real-time settlement'],
    gradient: 'from-[#84cc16] to-[#fbbf24]'
  },
  {
    id: 'safety-emergency',
    icon: '🚨',
    title: 'Travel with Confidence',
    description: 'One-tap emergency assistance with automatic location sharing. Access embassy contacts and get real-time safety alerts.',
    keyPoints: ['SOS button', 'Embassy contacts', 'Medical translation'],
    gradient: 'from-[#fbbf24] to-[#FF561D]'
  },
  {
    id: 'sustainability',
    icon: '🌍',
    title: 'Responsible Travel',
    description: 'Track your carbon footprint, find eco-friendly options, and maintain wellness routines while traveling.',
    keyPoints: ['Carbon tracking', 'Eco suggestions', 'Health monitoring'],
    gradient: 'from-[#10b981] to-[#0ea5e9]'
  }
];

const FeaturesOverview: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Everything You Need for{' '}
            <span className="bg-gradient-to-r from-[#FF561D] to-[#0ea5e9] bg-clip-text text-transparent">
              Perfect Trips
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From AI-powered planning to real-time assistance, WanderFiz provides all the tools you need for seamless travel experiences.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.id} className="group">
              <GlassCard className="p-8 h-full transition-all duration-500 hover:scale-105">
                <div className="space-y-6">
                  {/* Icon */}
                  <div className="relative">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} p-4 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <span className="text-2xl">{feature.icon}</span>
                    </div>
                    <div className={`absolute -inset-1 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-20 blur-md group-hover:opacity-40 transition-opacity duration-300`}></div>
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors">
                      {feature.title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>

                    {/* Key Points */}
                    <div className="space-y-2">
                      {feature.keyPoints.map((point, pointIndex) => (
                        <div key={pointIndex} className="flex items-center gap-2 text-sm text-gray-600">
                          <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${feature.gradient}`}></div>
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Learn More Link */}
                  <div className="pt-4 border-t border-white/20">
                    <button className={`text-sm font-medium bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent hover:opacity-80 transition-opacity group-hover:translate-x-1 transition-transform duration-300`}>
                      Learn more →
                    </button>
                  </div>
                </div>
              </GlassCard>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <GlassCard className="inline-block p-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900">
                Ready to experience the future of travel?
              </h3>
              <p className="text-gray-600">
                Join thousands of travelers who've already transformed their journeys with WanderFiz.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                <button className="px-8 py-3 bg-gradient-to-r from-[#FF561D] to-[#0ea5e9] text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300">
                  Start Free Trial
                </button>
                <button className="px-8 py-3 bg-white/40 backdrop-blur-md text-gray-800 font-semibold rounded-lg border border-white/30 hover:bg-white/50 hover:scale-105 transition-all duration-300">
                  View All Features
                </button>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
};

export default FeaturesOverview;
