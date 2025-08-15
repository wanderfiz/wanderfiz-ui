import React from 'react'
import { Link } from 'react-router-dom'
import GlassButton from '../ui/GlassButton'

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#fef2f2] via-[#fafbff] to-[#e0f2fe]">
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[#FF561D]/20 to-[#0ea5e9]/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-[#0ea5e9]/20 to-[#84cc16]/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-[#fbbf24]/10 to-[#a855f7]/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/30 backdrop-blur-md rounded-lg transform rotate-12 animate-float"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-white/30 backdrop-blur-md rounded-lg transform -rotate-12 animate-float-delay-1"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-white/30 backdrop-blur-md rounded-lg transform rotate-45 animate-float-delay-2"></div>
        <div className="absolute bottom-40 right-1/3 w-12 h-12 bg-white/30 backdrop-blur-md rounded-lg transform -rotate-45 animate-float"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/30 backdrop-blur-md border border-white/20 text-sm text-gray-700 mb-6">
              <span className="flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-[#FF561D] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF561D]"></span>
              </span>
              The Complete Travel Companion Platform
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Transform Every Journey from{' '}
              <span className="bg-gradient-to-r from-[#FF561D] to-[#0ea5e9] bg-clip-text text-transparent">
                Dream to Memory
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
              WanderFiz is your intelligent travel companion that stays with you throughout your entire journey - from initial inspiration to cherished memories.
            </p>
            
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
            
            <div className="mt-8 flex items-center justify-center lg:justify-start gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Free forever plan</span>
              </div>
            </div>
          </div>
          
          {/* Right Content - Hero Image/Illustration */}
          <div className="relative">
            <div className="relative bg-white/20 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/30">
              <div className="aspect-video bg-gradient-to-br from-[#FF561D]/10 to-[#0ea5e9]/10 rounded-lg flex items-center justify-center">
                {/* Placeholder for hero image or animation */}
                <div className="text-center">
                  <svg className="w-32 h-32 mx-auto text-[#FF561D]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="mt-4 text-gray-500">Interactive Trip Planner Preview</p>
                </div>
              </div>
              
              {/* Feature badges */}
              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-white/30 backdrop-blur-md rounded-lg">
                  <div className="text-2xl font-bold text-[#FF561D]">50K+</div>
                  <div className="text-xs text-gray-600">Active Travelers</div>
                </div>
                <div className="text-center p-3 bg-white/30 backdrop-blur-md rounded-lg">
                  <div className="text-2xl font-bold text-[#0ea5e9]">150+</div>
                  <div className="text-xs text-gray-600">Countries</div>
                </div>
                <div className="text-center p-3 bg-white/30 backdrop-blur-md rounded-lg">
                  <div className="text-2xl font-bold text-[#84cc16]">4.9★</div>
                  <div className="text-xs text-gray-600">User Rating</div>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-[#FF561D]/20 to-transparent rounded-full blur-2xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-tr from-[#0ea5e9]/20 to-transparent rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}

export default HeroSection