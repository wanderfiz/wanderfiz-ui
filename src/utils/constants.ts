// Company Information
export const COMPANY_INFO = {
  name: 'WanderFiz',
  tagline: 'Transform Every Journey from Dream to Memory',
  description: 'AI-powered trip planning, real-time assistance, and seamless memory capture for the modern traveler.',
  founded: '2024',
  email: 'hello@wanderfiz.com',
  phone: '+1 (555) 123-4567',
  address: {
    street: '123 Innovation Drive',
    city: 'San Francisco',
    state: 'CA',
    zip: '94105',
    country: 'United States'
  }
}

// Social Media Links
export const SOCIAL_LINKS = {
  twitter: 'https://twitter.com/wanderfiz',
  instagram: 'https://instagram.com/wanderfiz',
  facebook: 'https://facebook.com/wanderfiz',
  linkedin: 'https://linkedin.com/company/wanderfiz',
  youtube: 'https://youtube.com/@wanderfiz'
}

// Navigation Items
export const MAIN_NAVIGATION = [
  { name: 'Features', path: '/features' },
  { name: 'How It Works', path: '/how-it-works' },
  { name: 'Pricing', path: '/pricing' }
]

export const FOOTER_NAVIGATION = {
  company: [
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Help Center', path: '/help-center' }
  ],
  legal: [
    { name: 'Privacy Policy', path: '/privacy-policy' },
    { name: 'Terms of Service', path: '/terms-of-service' }
  ]
}

// Feature Statistics
export const STATS = {
  users: '50,000+',
  trips: '250,000+',
  countries: '195',
  satisfaction: '98%'
}

// Testimonials
export const TESTIMONIALS = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Travel Blogger',
    avatar: '/avatars/sarah.jpg',
    rating: 5,
    content: 'WanderFiz transformed how I plan my trips. The AI suggestions are incredibly accurate and save me hours of research.',
    location: 'New York, USA'
  },
  {
    id: '2',
    name: 'Marco Rodriguez',
    role: 'Adventure Photographer',
    avatar: '/avatars/marco.jpg',
    rating: 5,
    content: 'The real-time navigation feature is a game-changer. Never got lost even in the most remote locations.',
    location: 'Barcelona, Spain'
  },
  {
    id: '3',
    name: 'Emily Chen',
    role: 'Digital Nomad',
    avatar: '/avatars/emily.jpg',
    rating: 5,
    content: 'Love how it automatically organizes my travel photos and creates beautiful stories. My memories are perfectly preserved.',
    location: 'Tokyo, Japan'
  },
  {
    id: '4',
    name: 'David Thompson',
    role: 'Family Traveler',
    avatar: '/avatars/david.jpg',
    rating: 5,
    content: 'Group trip planning with expense splitting made our family reunion seamless. Everyone knew exactly what to expect.',
    location: 'London, UK'
  }
]

// Benefits/Value Propositions
export const KEY_BENEFITS = [
  {
    icon: '⚡',
    title: 'Save Time',
    description: 'AI-powered planning reduces trip preparation time by 90%'
  },
  {
    icon: '🎯',
    title: 'Personalized',
    description: 'Recommendations tailored to your preferences and travel style'
  },
  {
    icon: '🌍',
    title: 'Global Coverage',
    description: 'Works in 195+ countries with offline capabilities'
  },
  {
    icon: '📱',
    title: 'All-in-One',
    description: 'Planning, navigation, and memories in a single app'
  }
]

// Journey Stages
export const JOURNEY_STAGES = [
  {
    id: 'pre-trip',
    title: 'Pre-Trip Planning',
    description: 'Dream, plan, and prepare for your adventure',
    steps: [
      'AI trip generation based on preferences',
      'Collaborative planning with travel companions',
      'Booking integration and confirmation',
      'Budget planning and expense setup'
    ],
    icon: '🗺️',
    color: 'primary'
  },
  {
    id: 'during-trip',
    title: 'During Trip',
    description: 'Navigate, explore, and capture memories',
    steps: [
      'Real-time GPS navigation and directions',
      'Activity tracking and check-ins',
      'Smart expense logging and splitting',
      'Automatic photo organization by location'
    ],
    icon: '📱',
    color: 'secondary'
  },
  {
    id: 'post-trip',
    title: 'Post-Trip',
    description: 'Preserve, share, and relive your experiences',
    steps: [
      'Automated travel story generation',
      'Photo timeline and album creation',
      'Social sharing and trip highlights',
      'Expense reports and settlements'
    ],
    icon: '📸',
    color: 'accent'
  }
]

// API Endpoints (for future use)
export const API_ENDPOINTS = {
  auth: {
    login: '/api/auth/login',
    register: '/api/auth/register',
    logout: '/api/auth/logout',
    refresh: '/api/auth/refresh'
  },
  user: {
    profile: '/api/user/profile',
    preferences: '/api/user/preferences',
    subscription: '/api/user/subscription'
  },
  trips: {
    list: '/api/trips',
    create: '/api/trips',
    detail: '/api/trips/:id',
    update: '/api/trips/:id',
    delete: '/api/trips/:id'
  }
}

// App Configuration
export const APP_CONFIG = {
  name: 'WanderFiz',
  version: '1.0.0',
  defaultTheme: 'light',
  supportedLanguages: ['en', 'es', 'fr', 'de', 'it', 'pt', 'ja', 'ko'],
  maxFileSize: 10 * 1024 * 1024, // 10MB
  allowedImageTypes: ['image/jpeg', 'image/png', 'image/webp'],
  defaultPageSize: 20
}

// Breakpoints (matching Tailwind)
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
}

// Animation Durations
export const ANIMATION_DURATION = {
  fast: 150,
  normal: 300,
  slow: 500
}

// Error Messages
export const ERROR_MESSAGES = {
  generic: 'Something went wrong. Please try again.',
  network: 'Network error. Please check your connection.',
  auth: 'Authentication required. Please log in.',
  forbidden: 'You do not have permission to perform this action.',
  notFound: 'The requested resource was not found.',
  validation: 'Please check your input and try again.'
}