import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../ui/Button'
import Card from '../ui/Card'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'

const CTASection: React.FC = () => {
  const navigate = useNavigate()
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.3 })

  return (
    <section ref={ref} className="py-20 bg-hero-gradient relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 right-10 w-64 h-64 bg-primary-200/20 rounded-full mix-blend-multiply filter blur-xl animate-blob" />
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-secondary-200/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent-200/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card 
          variant="glass" 
          className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          padding="large"
        >
          {/* Main CTA Content */}
          <div className="mb-8">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Ready to Transform Your
              <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent">
                {' '}Travel Experience?
              </span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Join thousands of travelers who have already discovered the power of AI-powered trip planning. 
              Start your free trial today and see the difference for yourself.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className={`mb-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="large"
                className="text-lg px-8 py-4 shadow-glass-lg"
                onClick={() => navigate('/signup')}
              >
                Start Free Trial
              </Button>
              <Button
                variant="ghost"
                size="large"
                className="text-lg px-8 py-4 bg-glass-light backdrop-blur-md border border-white/20"
                onClick={() => navigate('/pricing')}
              >
                View Pricing
              </Button>
            </div>
          </div>

          {/* Value Propositions */}
          <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center justify-center space-x-2 text-gray-600">
                <span className="text-green-500">✓</span>
                <span className="text-sm">No credit card required</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-gray-600">
                <span className="text-green-500">✓</span>
                <span className="text-sm">30-day money-back guarantee</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-gray-600">
                <span className="text-green-500">✓</span>
                <span className="text-sm">Cancel anytime</span>
              </div>
            </div>
          </div>

          {/* Social Proof */}
          <div className={`border-t border-white/20 pt-8 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="flex -space-x-2">
                  {/* Avatar placeholders */}
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-semibold"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div className="text-left">
                  <div className="text-sm font-semibold text-gray-900">
                    Join 50,000+ travelers
                  </div>
                  <div className="text-xs text-gray-600">
                    Already planning with WanderFiz
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-500">4.9</div>
                  <div className="flex text-yellow-400 text-sm">
                    {'★'.repeat(5)}
                  </div>
                  <div className="text-xs text-gray-600">App Store</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-500">4.8</div>
                  <div className="flex text-yellow-400 text-sm">
                    {'★'.repeat(5)}
                  </div>
                  <div className="text-xs text-gray-600">Google Play</div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Secondary CTA */}
        <div className={`mt-12 text-center transition-all duration-1000 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-gray-600 mb-4">
            Have questions? Our team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="ghost"
              onClick={() => navigate('/contact')}
              className="bg-glass-light backdrop-blur-md border border-white/20"
            >
              Contact Sales
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate('/help-center')}
              className="bg-glass-light backdrop-blur-md border border-white/20"
            >
              View FAQ
            </Button>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className={`mt-16 transition-all duration-1000 delay-1100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-6">
            <p className="text-gray-500 text-sm">Trusted by teams at</p>
          </div>
          <div className="flex justify-center items-center space-x-8 opacity-60">
            <div className="bg-glass-light backdrop-blur-md border border-white/20 rounded-lg px-4 py-2">
              <div className="text-sm font-semibold text-gray-700">Airbnb</div>
            </div>
            <div className="bg-glass-light backdrop-blur-md border border-white/20 rounded-lg px-4 py-2">
              <div className="text-sm font-semibold text-gray-700">Booking.com</div>
            </div>
            <div className="bg-glass-light backdrop-blur-md border border-white/20 rounded-lg px-4 py-2">
              <div className="text-sm font-semibold text-gray-700">Expedia</div>
            </div>
            <div className="bg-glass-light backdrop-blur-md border border-white/20 rounded-lg px-4 py-2">
              <div className="text-sm font-semibold text-gray-700">TripAdvisor</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTASection