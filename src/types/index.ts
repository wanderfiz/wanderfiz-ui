// User types
export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  createdAt: string
  updatedAt: string
}

// Trip types
export interface Trip {
  id: string
  title: string
  description: string
  destination: string
  startDate: string
  endDate: string
  userId: string
  createdAt: string
  updatedAt: string
}

// AI Recommendation types
export interface AiRecommendation {
  id: string
  type: 'restaurant' | 'activity' | 'accommodation' | 'transport'
  title: string
  description: string
  location: string
  rating?: number
  price?: string
  confidence: number
}

// API Response types
export interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Form types
export interface LoginForm {
  email: string
  password: string
}

export interface RegisterForm {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export interface TripForm {
  title: string
  description: string
  destination: string
  startDate: string
  endDate: string
}

// Re-export settings types
export * from './settings'
