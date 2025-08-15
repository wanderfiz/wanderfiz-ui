export interface Feature {
  id: string
  name: string
  description: string
  icon: string
  category: FeatureCategory
  benefits: string[]
  availability: PlanTier[]
}

export interface FeatureCategory {
  id: string
  name: string
  description: string
  icon: string
  color: string
}

export type PlanTier = 'free' | 'explorer' | 'pro' | 'enterprise'

export interface FeatureComparison {
  feature: string
  free: boolean | string
  explorer: boolean | string
  pro: boolean | string
  enterprise: boolean | string
}

export const FEATURE_CATEGORIES: FeatureCategory[] = [
  {
    id: 'planning',
    name: 'Smart Trip Planning',
    description: 'AI-powered itinerary generation and planning tools',
    icon: '🗺️',
    color: 'primary'
  },
  {
    id: 'assistant',
    name: 'Real-Time Travel Assistant',
    description: 'Live navigation, reminders, and travel support',
    icon: '📱',
    color: 'secondary'
  },
  {
    id: 'memory',
    name: 'Memory Capture & Storytelling',
    description: 'Photo organization and automatic story generation',
    icon: '📸',
    color: 'accent'
  },
  {
    id: 'group',
    name: 'Group Travel & Expenses',
    description: 'Collaborative planning and expense management',
    icon: '👥',
    color: 'primary'
  },
  {
    id: 'safety',
    name: 'Safety & Emergency',
    description: 'Emergency features and safety monitoring',
    icon: '🛡️',
    color: 'secondary'
  }
]

export const FEATURES: Feature[] = [
  // Smart Trip Planning
  {
    id: 'ai-trip-generator',
    name: 'Intelligent Trip Generator',
    description: 'Generate complete itineraries using AI based on your preferences',
    icon: '🤖',
    category: FEATURE_CATEGORIES[0],
    benefits: [
      'Save hours of planning time',
      'Personalized recommendations',
      'Optimized routes and schedules'
    ],
    availability: ['explorer', 'pro', 'enterprise']
  },
  {
    id: 'visual-designer',
    name: 'Visual Itinerary Designer',
    description: 'Drag-and-drop interface for creating and editing itineraries',
    icon: '🎨',
    category: FEATURE_CATEGORIES[0],
    benefits: [
      'Intuitive visual planning',
      'Easy schedule adjustments',
      'Timeline view of activities'
    ],
    availability: ['free', 'explorer', 'pro', 'enterprise']
  },
  // Real-Time Assistant
  {
    id: 'live-navigation',
    name: 'Instant Navigation',
    description: 'Real-time GPS navigation with offline maps',
    icon: '🧭',
    category: FEATURE_CATEGORIES[1],
    benefits: [
      'Never get lost',
      'Offline map access',
      'Real-time traffic updates'
    ],
    availability: ['explorer', 'pro', 'enterprise']
  },
  // Memory Capture
  {
    id: 'photo-timeline',
    name: 'Photo Timeline',
    description: 'Automatically organize photos by location and time',
    icon: '📷',
    category: FEATURE_CATEGORIES[2],
    benefits: [
      'Automatic organization',
      'Location-based sorting',
      'Easy sharing options'
    ],
    availability: ['free', 'explorer', 'pro', 'enterprise']
  },
  // Group Travel
  {
    id: 'expense-splitting',
    name: 'Smart Expense Splitting',
    description: 'Automatically calculate and split shared expenses',
    icon: '💰',
    category: FEATURE_CATEGORIES[3],
    benefits: [
      'Fair expense distribution',
      'Real-time settlement',
      'Multiple currency support'
    ],
    availability: ['pro', 'enterprise']
  }
]