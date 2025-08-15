export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  avatar?: string
  preferences: UserPreferences
  subscription: UserSubscription
  createdAt: string
  updatedAt: string
}

export interface UserPreferences {
  travelStyle: TravelStyle
  budgetRange: BudgetRange
  interests: string[]
  notifications: NotificationSettings
  privacy: PrivacySettings
}

export type TravelStyle = 'luxury' | 'mid-range' | 'budget' | 'backpacker' | 'family' | 'business' | 'adventure'

export type BudgetRange = 'budget' | 'moderate' | 'premium' | 'luxury'

export interface NotificationSettings {
  email: boolean
  push: boolean
  sms: boolean
  tripReminders: boolean
  marketingEmails: boolean
}

export interface PrivacySettings {
  profileVisibility: 'public' | 'friends' | 'private'
  shareTrips: boolean
  sharePhotos: boolean
  allowRecommendations: boolean
}

export interface UserSubscription {
  plan: 'free' | 'explorer' | 'pro' | 'enterprise'
  status: 'active' | 'canceled' | 'past_due' | 'trialing'
  currentPeriodEnd: string
  cancelAtPeriodEnd: boolean
}

export interface AuthUser {
  id: string
  email: string
  name: string
  avatar?: string
  isAuthenticated: boolean
}

export interface LoginCredentials {
  email: string
  password: string
  rememberMe?: boolean
}

export interface RegisterCredentials {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  acceptTerms: boolean
}

export interface UserProfile {
  id: string
  firstName: string
  lastName: string
  email: string
  avatar?: string
  bio?: string
  location?: string
  website?: string
  travelCount: number
  memberSince: string
}

export interface UserStats {
  totalTrips: number
  countriesVisited: number
  citiesExplored: number
  photosShared: number
  friendsConnected: number
  milesLogged: number
}