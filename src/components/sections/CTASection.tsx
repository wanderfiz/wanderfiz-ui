import React from 'react';
import { Link } from 'react-router-dom';
import GlassButton from '../ui/GlassButton';
import GlassCard from '../ui/GlassCard';

const CTASection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-[#FF561D]/5 via-[#0ea5e9]/5 to-[#a855f7]/5 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-[#FF561D]/20 to-[#0ea5e9]/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-20 right-20 w-16 h-16 bg-gradient-to-br from-[#0ea5e9]/20 to-[#a855f7]/20 rounded-full blur-lg animate-float-delay-1"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-br from-[#a855f7]/20 to-[#84cc16]/20 rounded-full blur-xl animate-float-delay-2"></div>
        <div className="absolute bottom-10 right-10 w-18 h-18 bg-gradient-to-br from-[#84cc16]/20 to-[#fbbf24]/20 rounded-full blur-lg animate-float-slow"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <GlassCard className="p-12 text-center">
            <div className="space-y-8">
              {/* Main Heading */}
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
                  Start Your Next{' '}
                  <span className="bg-gradient-to-r from-[#FF561D] to-[#0ea5e9] bg-clip-text text-transparent">
                    Adventure
                  </span>{' '}
                  Today
                </h2>
                <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                  Join thousands of travelers who've transformed their journeys with WanderFiz
                </p>
              </div>

              {/* Feature Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
                <div className="flex items-center gap-3 justify-center md:justify-start">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#FF561D] to-[#0ea5e9] rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">AI-Powered Planning</span>
                </div>
                <div className="flex items-center gap-3 justify-center md:justify-start">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#0ea5e9] to-[#a855f7] rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">Real-Time Assistant</span>
                </div>
                <div className="flex items-center gap-3 justify-center md:justify-start">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#a855f7] to-[#84cc16] rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">Memory Capture</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/signup">
                    <GlassButton variant="primary" size="large" className="w-full sm:w-auto">
                      Get Started Free
                    </GlassButton>
                  </Link>
                  <Link to="/pricing">
                    <GlassButton variant="secondary" size="large" className="w-full sm:w-auto">
                      View Pricing
                    </GlassButton>
                  </Link>
                </div>

                {/* Trust Indicators */}
                <div className="text-sm text-gray-500 space-y-2">
                  <div>No credit card required • Free forever plan available</div>
                  <div className="flex items-center justify-center gap-6 flex-wrap">
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span>4.9/5 rating</span>
                    </div>
                    <div>•</div>
                    <div>50K+ happy travelers</div>
                    <div>•</div>
                    <div>200K+ trips planned</div>
                  </div>
                </div>
              </div>

              {/* Security Badges */}
              <div className="pt-8 border-t border-white/20">
                <div className="flex items-center justify-center gap-8 opacity-60">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">SSL Encrypted</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">GDPR Compliant</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">Privacy First</span>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
