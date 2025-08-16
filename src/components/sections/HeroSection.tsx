import React from 'react';
import { Link } from 'react-router-dom';
import GlassButton from '../ui/GlassButton';
import GlassCard from '../ui/GlassCard';

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-hero">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-[#FF561D]/20 to-[#0ea5e9]/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-[#0ea5e9]/20 to-[#a855f7]/20 rounded-full blur-lg animate-float-delay-1"></div>
        <div className="absolute bottom-32 left-20 w-40 h-40 bg-gradient-to-br from-[#a855f7]/20 to-[#FF561D]/20 rounded-full blur-2xl animate-float-delay-2"></div>
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-gradient-to-br from-[#84cc16]/20 to-[#fbbf24]/20 rounded-full blur-lg animate-float-slow"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Transform Every{' '}
                <span className="bg-gradient-to-r from-[#FF561D] to-[#0ea5e9] bg-clip-text text-transparent">
                  Journey
                </span>{' '}
                from Dream to{' '}
                <span className="bg-gradient-to-r from-[#0ea5e9] to-[#a855f7] bg-clip-text text-transparent">
                  Memory
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-2xl">
                WanderFiz is your intelligent travel companion that stays with you throughout your entire journey - from initial inspiration to cherished memories
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/signup">
                <GlassButton variant="primary" size="large" className="w-full sm:w-auto">
                  Start Your Journey - It's Free
                </GlassButton>
              </Link>
              <Link to="/how-it-works">
                <GlassButton variant="secondary" size="large" className="w-full sm:w-auto">
                  See How It Works
                </GlassButton>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Free forever plan</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Works offline</span>
              </div>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="relative">
            <GlassCard className="p-8 max-w-md mx-auto">
              <div className="space-y-6">
                {/* Mock App Interface */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <div className="flex-1 text-center">
                    <span className="text-sm font-medium text-gray-600">WanderFiz</span>
                  </div>
                </div>

                {/* Trip Planning Preview */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-white/40 rounded-lg">
                    <div className="w-8 h-8 bg-gradient-to-r from-[#FF561D] to-[#0ea5e9] rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">🗺️</span>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-800">Paris Adventure</div>
                      <div className="text-xs text-gray-600">3 days • AI Generated</div>
                    </div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-white/40 rounded-lg">
                    <div className="w-8 h-8 bg-gradient-to-r from-[#0ea5e9] to-[#a855f7] rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">📱</span>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-800">Live Navigation</div>
                      <div className="text-xs text-gray-600">Currently active</div>
                    </div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-white/40 rounded-lg">
                    <div className="w-8 h-8 bg-gradient-to-r from-[#a855f7] to-[#FF561D] rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">📸</span>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-800">Memory Capture</div>
                      <div className="text-xs text-gray-600">24 photos saved</div>
                    </div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/20">
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-800">12</div>
                    <div className="text-xs text-gray-600">Trips</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-800">847</div>
                    <div className="text-xs text-gray-600">Photos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-800">23</div>
                    <div className="text-xs text-gray-600">Countries</div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
