import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import GlassCard from '../components/ui/GlassCard';
import GlassButton from '../components/ui/GlassButton';

interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: {
    monthly: number;
    yearly: number;
  };
  popular: boolean;
  features: string[];
  limitations?: string[];
  gradient: string;
}

const pricingPlans: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free Explorer',
    description: 'Perfect for occasional travelers and first-time users',
    price: {
      monthly: 0,
      yearly: 0,
    },
    popular: false,
    features: [
      '3 trips per month',
      'Basic trip planning',
      'Photo timeline organization',
      'Community support',
      'Basic offline maps',
      'Essential safety features'
    ],
    limitations: [
      'Limited AI suggestions',
      'Basic templates only',
      'No group collaboration'
    ],
    gradient: 'from-[#84cc16] to-[#65a30d]'
  },
  {
    id: 'explorer',
    name: 'Explorer',
    description: 'Ideal for regular travelers who want smart planning',
    price: {
      monthly: 9.99,
      yearly: 95.99,
    },
    popular: true,
    features: [
      'Unlimited trips',
      'AI-powered planning',
      'Advanced offline maps',
      'Real-time navigation',
      'Photo timeline & stories',
      'Priority support',
      'Weather integration',
      'Basic expense tracking'
    ],
    gradient: 'from-[#0ea5e9] to-[#0284c7]'
  },
  {
    id: 'pro',
    name: 'Pro Traveler',
    description: 'Advanced features for travel enthusiasts and groups',
    price: {
      monthly: 19.99,
      yearly: 191.99,
    },
    popular: false,
    features: [
      'Everything in Explorer',
      'Group travel coordination',
      'Smart expense splitting',
      'Advanced analytics',
      'Premium templates',
      'Expert local guides',
      'Custom itinerary sharing',
      'Priority customer support'
    ],
    gradient: 'from-[#a855f7] to-[#9333ea]'
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Custom solutions for teams and organizations',
    price: {
      monthly: 299,
      yearly: 2999,
    },
    popular: false,
    features: [
      'Everything in Pro',
      'Team management dashboard',
      'Custom branding',
      'API access',
      'Advanced security',
      'Dedicated support',
      'Custom integrations',
      'SLA guarantees'
    ],
    gradient: 'from-[#FF561D] to-[#dc2626]'
  }
];

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    id: 'free-plan',
    question: 'Is the free plan really free forever?',
    answer: 'Yes! Our Free Explorer plan is completely free forever with no hidden costs. You can plan up to 3 trips per month with basic features. Perfect for trying out WanderFiz and occasional travelers.'
  },
  {
    id: 'upgrade-anytime',
    question: 'Can I upgrade or downgrade my plan anytime?',
    answer: 'Absolutely! You can upgrade or downgrade your plan at any time. When you upgrade, you\'ll be charged the prorated amount for the remainder of your billing cycle. Downgrades take effect at the start of your next billing cycle.'
  },
  {
    id: 'yearly-savings',
    question: 'How much do I save with yearly billing?',
    answer: 'You save 20% with yearly billing on all paid plans. For example, the Explorer plan costs $9.99/month or $95.99/year (equivalent to $7.99/month). Plus, you get 2 months free!'
  },
  {
    id: 'offline-features',
    question: 'Do offline features work on all plans?',
    answer: 'Basic offline maps are available on the Free plan, but advanced offline features like detailed navigation, offline AI suggestions, and comprehensive area downloads are available on Explorer and higher plans.'
  },
  {
    id: 'data-security',
    question: 'How secure is my travel data?',
    answer: 'We take security very seriously. All data is encrypted in transit and at rest using industry-standard AES-256 encryption. We\'re GDPR compliant and never share your personal travel data with third parties.'
  },
  {
    id: 'group-features',
    question: 'How do group travel features work?',
    answer: 'Group features are available on Pro and Enterprise plans. You can invite friends to collaborate on trip planning, automatically split expenses, coordinate activities, and keep everyone updated with real-time notifications.'
  },
  {
    id: 'money-back',
    question: 'Do you offer refunds?',
    answer: 'Yes! We offer a 30-day money-back guarantee on all paid plans. If you\'re not completely satisfied within the first 30 days, contact our support team for a full refund.'
  },
  {
    id: 'enterprise-custom',
    question: 'What\'s included in Enterprise custom solutions?',
    answer: 'Enterprise plans include custom branding, API access, dedicated support, custom integrations, advanced security features, team management tools, and SLA guarantees. Contact our sales team to discuss your specific needs.'
  }
];

const PricingPage: React.FC = () => {
  const [isYearly, setIsYearly] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const toggleFaq = (faqId: string) => {
    setExpandedFaq(expandedFaq === faqId ? null : faqId);
  };

  const getPrice = (plan: PricingPlan) => {
    if (plan.price.monthly === 0) return { display: 'Free', period: '', savings: 0 };
    
    const price = isYearly ? plan.price.yearly : plan.price.monthly;
    const period = isYearly ? '/year' : '/month';
    const savings = isYearly ? Math.round((plan.price.monthly * 12 - plan.price.yearly) / (plan.price.monthly * 12) * 100) : 0;
    
    return { display: `$${price}`, period, savings };
  };

  return (
    <div className="min-h-screen pt-20 pb-16 bg-hero">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Simple,{' '}
              <span className="bg-gradient-to-r from-[#FF561D] to-[#0ea5e9] bg-clip-text text-transparent">
                Transparent
              </span>{' '}
              Pricing
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Choose the perfect plan for your travel needs. Start free and upgrade as your wanderlust grows.
            </p>
          </div>

          {/* Billing Toggle */}
          <div className="flex justify-center mb-12">
            <div className="bg-white/40 backdrop-blur-md border border-white/30 rounded-full p-1 inline-flex">
              <button
                onClick={() => setIsYearly(false)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  !isYearly 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsYearly(true)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  isYearly 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Yearly
                <span className="ml-2 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-bold">
                  Save 20%
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pricingPlans.map((plan) => {
              const priceInfo = getPrice(plan);
              
              return (
                <div key={plan.id} className="group">
                  <GlassCard className={`p-8 h-full relative hover:scale-[1.02] transition-all duration-500 ${plan.popular ? 'ring-2 ring-blue-500/50' : ''}`}>
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <span className="bg-gradient-to-r from-[#0ea5e9] to-[#a855f7] text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                          Most Popular
                        </span>
                      </div>
                    )}

                    <div className="text-center mb-8">
                      {/* Plan Icon */}
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${plan.gradient} mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <span className="text-white text-2xl font-bold">{plan.name.charAt(0)}</span>
                      </div>

                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {plan.name}
                      </h3>
                      <p className="text-gray-600 mb-6">
                        {plan.description}
                      </p>

                      {/* Price */}
                      <div className="mb-6">
                        <div className="text-4xl font-bold text-gray-900">
                          {priceInfo.display}
                          {priceInfo.period && (
                            <span className="text-lg font-normal text-gray-600">
                              {priceInfo.period}
                            </span>
                          )}
                        </div>
                        {priceInfo.savings > 0 && (
                          <div className="text-sm text-green-600 font-medium mt-1">
                            Save {priceInfo.savings}% yearly
                          </div>
                        )}
                      </div>

                      {/* CTA Button */}
                      <Link to={plan.id === 'enterprise' ? '/contact' : '/signup'}>
                        <GlassButton 
                          variant={plan.popular ? 'primary' : 'secondary'} 
                          size="large" 
                          className="w-full mb-6"
                        >
                          {plan.id === 'free' ? 'Get Started Free' : 
                           plan.id === 'enterprise' ? 'Contact Sales' : 
                           'Start Free Trial'}
                        </GlassButton>
                      </Link>
                    </div>

                    {/* Features */}
                    <div className="space-y-4">
                      <div className="text-sm font-semibold text-gray-900">
                        What's included:
                      </div>
                      <ul className="space-y-3">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs mt-0.5 flex-shrink-0">
                              ✓
                            </div>
                            <span className="text-sm text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      
                      {plan.limitations && plan.limitations.length > 0 && (
                        <div className="pt-4 border-t border-white/20">
                          <div className="text-sm font-semibold text-gray-900 mb-3">
                            Limitations:
                          </div>
                          <ul className="space-y-2">
                            {plan.limitations.map((limitation, index) => (
                              <li key={index} className="flex items-start gap-3">
                                <div className="w-5 h-5 bg-gray-400 rounded-full flex items-center justify-center text-white text-xs mt-0.5 flex-shrink-0">
                                  −
                                </div>
                                <span className="text-sm text-gray-600">{limitation}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </GlassCard>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Got questions? We've got answers. Can't find what you're looking for? Contact our support team.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq) => (
              <div key={faq.id} onClick={() => toggleFaq(faq.id)}>
                <GlassCard className="p-6 cursor-pointer hover:scale-[1.01] transition-all duration-300">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-gray-900 text-left flex-1 pr-4">
                    {faq.question}
                  </h3>
                  <div className={`transition-transform duration-300 flex-shrink-0 ${
                    expandedFaq === faq.id ? 'rotate-45' : ''
                  }`}>
                    <span className="text-gray-500 text-2xl font-light">+</span>
                  </div>
                </div>
                
                {expandedFaq === faq.id && (
                  <div className="mt-4 pt-4 border-t border-white/20">
                    <p className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
                </GlassCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <GlassCard className="inline-block p-12 max-w-4xl">
              <div className="space-y-8">
                <div>
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Ready to Start Your Journey?
                  </h3>
                  <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Join thousands of travelers who trust WanderFiz. Start free and upgrade when you're ready.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/signup">
                    <GlassButton variant="primary" size="large">
                      Start Free Today
                    </GlassButton>
                  </Link>
                  <Link to="/contact">
                    <GlassButton variant="secondary" size="large">
                      Contact Sales
                    </GlassButton>
                  </Link>
                </div>

                {/* Trust Indicators */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-white/20">
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">30-Day Guarantee</div>
                    <div className="text-sm text-gray-600">Full money-back guarantee</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">No Setup Fees</div>
                    <div className="text-sm text-gray-600">Start using immediately</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">Cancel Anytime</div>
                    <div className="text-sm text-gray-600">No long-term commitment</div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage