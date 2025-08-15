import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import { useScrollAnimation, useStaggeredScrollAnimation } from '../hooks/useScrollAnimation'
import { PRICING_PLANS, PRICING_FEATURES, PRICING_FAQS, type PricingPlan } from '../types/pricing'

interface PlanCardProps {
  plan: PricingPlan
  isYearly: boolean
  onSelect: (_planId: string) => void
}

const PlanCard: React.FC<PlanCardProps> = ({ plan, isYearly, onSelect }) => {
  const price = isYearly ? plan.price.yearly : plan.price.monthly
  const originalPrice = isYearly ? plan.price.monthly * 12 : plan.price.monthly
  const savings = isYearly && plan.price.monthly > 0 ? originalPrice - price : 0


  return (
    <Card 
      variant="glass" 
      className={`relative ${plan.popular ? 'ring-2 ring-secondary-500 ring-opacity-50' : ''}`}
      padding="large"
    >
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-gradient-to-r from-secondary-500 to-secondary-600 text-white px-4 py-1 rounded-full text-sm font-medium">
            Most Popular
          </span>
        </div>
      )}

      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          {plan.name}
        </h3>
        <p className="text-gray-600 mb-6">
          {plan.description}
        </p>

        <div className="mb-6">
          {price === 0 ? (
            <div className="text-4xl font-bold text-gray-900">Free</div>
          ) : (
            <>
              <div className="text-4xl font-bold text-gray-900">
                ${price}
                <span className="text-lg font-normal text-gray-600">
                  /{isYearly ? 'year' : 'month'}
                </span>
              </div>
              {savings > 0 && (
                <div className="text-sm text-green-600 font-medium">
                  Save ${savings} per year
                </div>
              )}
            </>
          )}
        </div>

        <Button
          variant={plan.popular ? 'primary' : 'ghost'}
          size="large"
          className={`w-full mb-6 ${!plan.popular ? 'bg-glass-light backdrop-blur-md border border-white/20' : ''}`}
          onClick={() => onSelect(plan.id)}
        >
          {plan.cta}
        </Button>

        <div className="text-left space-y-3">
          <div className="text-sm font-semibold text-gray-900 mb-3">
            What&apos;s included:
          </div>
          {plan.features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs mt-0.5">
                ✓
              </div>
              <span className="text-sm text-gray-700">{feature}</span>
            </div>
          ))}
          
          {plan.limitations && plan.limitations.length > 0 && (
            <>
              <div className="text-sm font-semibold text-gray-900 mt-4 mb-3">
                Limitations:
              </div>
              {plan.limitations.map((limitation, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-5 h-5 bg-gray-400 rounded-full flex items-center justify-center text-white text-xs mt-0.5">
                    −
                  </div>
                  <span className="text-sm text-gray-600">{limitation}</span>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </Card>
  )
}

const PricingPage: React.FC = () => {
  const navigate = useNavigate()
  const [isYearly, setIsYearly] = useState(false)
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null)
  
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.3 })
  const { containerRef, isVisible, visibleItems } = useStaggeredScrollAnimation(
    PRICING_PLANS.length,
    { threshold: 0.2, staggerDelay: 150 }
  )

  const handlePlanSelect = (planId: string) => {
    if (planId === 'enterprise') {
      navigate('/contact')
    } else {
      navigate('/signup', { state: { selectedPlan: planId } })
    }
  }

  const toggleFaq = (faqId: string) => {
    setExpandedFaq(expandedFaq === faqId ? null : faqId)
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div ref={headerRef as React.RefObject<HTMLDivElement>} className={`text-center mb-16 transition-all duration-1000 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Simple,
            <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              {' '}Transparent Pricing
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Choose the perfect plan for your travel needs. From free adventures 
            to enterprise solutions, we have something for everyone. Start free and 
            upgrade as your wanderlust grows.
          </p>

          {/* Billing Toggle */}
          <div className={`mt-8 transition-all duration-1000 delay-300 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="bg-glass-light backdrop-blur-md border border-white/20 rounded-full p-1 inline-flex">
              <button
                onClick={() => setIsYearly(false)}
                className={`px-6 py-2 rounded-full transition-all duration-300 font-medium ${
                  !isYearly 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsYearly(true)}
                className={`px-6 py-2 rounded-full transition-all duration-300 font-medium ${
                  isYearly 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Yearly
                <span className="ml-2 bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs">
                  Save 20%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Plans */}
        <div ref={containerRef as React.RefObject<HTMLDivElement>} className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PRICING_PLANS.map((plan, index) => (
              <div
                key={plan.id}
                className={`transition-all duration-700 ${
                  visibleItems.has(index) 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <PlanCard 
                  plan={plan} 
                  isYearly={isYearly} 
                  onSelect={handlePlanSelect}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Feature Comparison */}
        <div className={`mb-20 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Card variant="glass" className="max-w-6xl mx-auto overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
                Compare All Features
              </h2>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-4 font-semibold text-gray-900">Feature</th>
                      {PRICING_PLANS.map((plan) => (
                        <th key={plan.id} className="text-center py-4 font-semibold text-gray-900 min-w-24">
                          {plan.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {PRICING_FEATURES.map((feature, index) => (
                      <tr key={feature.id} className={`${index % 2 === 0 ? 'bg-white/5' : ''}`}>
                        <td className="py-4 text-gray-700 font-medium">
                          {feature.name}
                          {feature.description && (
                            <div className="text-sm text-gray-500 mt-1">
                              {feature.description}
                            </div>
                          )}
                        </td>
                        <td className="text-center py-4">
                          {typeof feature.free === 'boolean' ? (
                            feature.free ? (
                              <span className="text-green-600 text-xl">✓</span>
                            ) : (
                              <span className="text-gray-400 text-xl">−</span>
                            )
                          ) : (
                            <span className="text-gray-700">{feature.free}</span>
                          )}
                        </td>
                        <td className="text-center py-4">
                          {typeof feature.explorer === 'boolean' ? (
                            feature.explorer ? (
                              <span className="text-green-600 text-xl">✓</span>
                            ) : (
                              <span className="text-gray-400 text-xl">−</span>
                            )
                          ) : (
                            <span className="text-gray-700">{feature.explorer}</span>
                          )}
                        </td>
                        <td className="text-center py-4">
                          {typeof feature.pro === 'boolean' ? (
                            feature.pro ? (
                              <span className="text-green-600 text-xl">✓</span>
                            ) : (
                              <span className="text-gray-400 text-xl">−</span>
                            )
                          ) : (
                            <span className="text-gray-700">{feature.pro}</span>
                          )}
                        </td>
                        <td className="text-center py-4">
                          {typeof feature.enterprise === 'boolean' ? (
                            feature.enterprise ? (
                              <span className="text-green-600 text-xl">✓</span>
                            ) : (
                              <span className="text-gray-400 text-xl">−</span>
                            )
                          ) : (
                            <span className="text-gray-700">{feature.enterprise}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className={`mb-20 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Got questions? We&apos;ve got answers. If you can&apos;t find what you&apos;re looking for, 
              feel free to contact our support team.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {PRICING_FAQS.map((faq) => (
              <Card 
                key={faq.id} 
                variant="glass" 
                hover
                className="cursor-pointer"
                onClick={() => toggleFaq(faq.id)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-gray-900 flex-1">
                    {faq.question}
                  </h3>
                  <div className={`ml-4 transition-transform duration-300 ${
                    expandedFaq === faq.id ? 'rotate-45' : ''
                  }`}>
                    <span className="text-gray-500 text-xl">+</span>
                  </div>
                </div>
                
                {expandedFaq === faq.id && (
                  <div className="mt-4 pt-4 border-t border-white/20">
                    <p className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className={`text-center transition-all duration-1000 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Card variant="glass" className="max-w-4xl mx-auto" padding="large">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Start Your Journey?
            </h3>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of travelers who trust WanderFiz to make their journeys 
              unforgettable. Start with our free plan and upgrade when you&apos;re ready.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="large"
                onClick={() => navigate('/signup')}
                className="px-8 shadow-glass-lg"
              >
                Start Free Today
              </Button>
              <Button
                variant="ghost"
                size="large"
                onClick={() => navigate('/contact')}
                className="px-8 bg-glass-light backdrop-blur-md border border-white/20"
              >
                Contact Sales
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 pt-8 border-t border-white/20">
              <div className="text-center">
                <div className="text-sm font-semibold text-gray-900">30-Day Guarantee</div>
                <div className="text-xs text-gray-600">Full money-back guarantee</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-semibold text-gray-900">No Setup Fees</div>
                <div className="text-xs text-gray-600">Start using immediately</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-semibold text-gray-900">Cancel Anytime</div>
                <div className="text-xs text-gray-600">No long-term commitment</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default PricingPage