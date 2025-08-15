export interface PricingPlan {
  id: string
  name: string
  description: string
  price: {
    monthly: number
    yearly: number
  }
  features: string[]
  limitations?: string[]
  popular?: boolean
  cta: string
  color: 'primary' | 'secondary' | 'accent'
}

export interface PricingFeature {
  id: string
  name: string
  description?: string
  free: boolean | string
  explorer: boolean | string
  pro: boolean | string
  enterprise: boolean | string
}

export interface FAQ {
  id: string
  question: string
  answer: string
  category?: string
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free',
    description: 'Perfect for occasional travelers',
    price: {
      monthly: 0,
      yearly: 0
    },
    features: [
      'Basic trip planning',
      'Up to 3 trips per month',
      'Basic memory capture',
      'Community support',
      'Mobile app access'
    ],
    limitations: [
      'Limited AI features',
      'Basic photo organization',
      'Standard templates only'
    ],
    cta: 'Get Started Free',
    color: 'primary'
  },
  {
    id: 'explorer',
    name: 'Explorer',
    description: 'For regular travelers who want more',
    price: {
      monthly: 9.99,
      yearly: 99.99
    },
    features: [
      'Unlimited trips',
      'AI-powered planning',
      'Advanced offline maps',
      'Photo timeline',
      'Priority support',
      'Weather integration',
      'Basic group features'
    ],
    popular: true,
    cta: 'Start Exploring',
    color: 'secondary'
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'Advanced features for travel enthusiasts',
    price: {
      monthly: 19.99,
      yearly: 199.99
    },
    features: [
      'All Explorer features',
      'Advanced group travel tools',
      'Expense splitting & settlement',
      'Custom trip templates',
      'Advanced analytics',
      'Expert local guides',
      'Integration with travel apps',
      'Premium photo features'
    ],
    cta: 'Go Pro',
    color: 'accent'
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Custom solutions for teams',
    price: {
      monthly: 299,
      yearly: 2999
    },
    features: [
      'All Pro features',
      'Team management',
      'Custom branding',
      'API access',
      'Dedicated support',
      'Advanced security',
      'Custom integrations',
      'Training & onboarding'
    ],
    cta: 'Contact Sales',
    color: 'primary'
  }
]

export const PRICING_FEATURES: PricingFeature[] = [
  {
    id: 'trips-per-month',
    name: 'Trips per month',
    free: '3',
    explorer: 'Unlimited',
    pro: 'Unlimited',
    enterprise: 'Unlimited'
  },
  {
    id: 'ai-planning',
    name: 'AI-powered planning',
    free: false,
    explorer: true,
    pro: true,
    enterprise: true
  },
  {
    id: 'offline-maps',
    name: 'Advanced offline maps',
    free: false,
    explorer: true,
    pro: true,
    enterprise: true
  },
  {
    id: 'group-features',
    name: 'Group travel features',
    free: false,
    explorer: 'Basic',
    pro: 'Advanced',
    enterprise: 'Full suite'
  },
  {
    id: 'expense-splitting',
    name: 'Expense splitting',
    free: false,
    explorer: false,
    pro: true,
    enterprise: true
  },
  {
    id: 'custom-templates',
    name: 'Custom templates',
    free: false,
    explorer: false,
    pro: true,
    enterprise: true
  },
  {
    id: 'api-access',
    name: 'API access',
    free: false,
    explorer: false,
    pro: false,
    enterprise: true
  },
  {
    id: 'support',
    name: 'Support',
    free: 'Community',
    explorer: 'Priority',
    pro: 'Priority',
    enterprise: 'Dedicated'
  }
]

export const PRICING_FAQS: FAQ[] = [
  {
    id: 'free-trial',
    question: 'Do you offer a free trial?',
    answer: 'Yes! Our Free plan allows you to try WanderFiz with up to 3 trips per month. You can upgrade anytime to unlock more features.',
    category: 'general'
  },
  {
    id: 'cancel-anytime',
    question: 'Can I cancel my subscription anytime?',
    answer: 'Absolutely. You can cancel your subscription at any time from your account settings. Your access will continue until the end of your billing period.',
    category: 'billing'
  },
  {
    id: 'data-export',
    question: 'Can I export my trip data?',
    answer: 'Yes, all plans include the ability to export your trip data in multiple formats including PDF and JSON.',
    category: 'data'
  },
  {
    id: 'offline-access',
    question: 'Does WanderFiz work offline?',
    answer: 'Yes! Explorer, Pro, and Enterprise plans include advanced offline maps and core functionality that works without internet connection.',
    category: 'features'
  },
  {
    id: 'group-size',
    question: 'How many people can I add to a group trip?',
    answer: 'Free plans support up to 3 people, Explorer up to 10, Pro up to 50, and Enterprise has unlimited group sizes.',
    category: 'features'
  },
  {
    id: 'enterprise-custom',
    question: 'Can Enterprise plans be customized?',
    answer: 'Yes! Enterprise plans can be fully customized to meet your organization\'s specific needs. Contact our sales team to discuss requirements.',
    category: 'enterprise'
  }
]