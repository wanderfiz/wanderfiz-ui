import axios from 'axios'
import { logger } from '../utils/logger'
import type { ApiResponse } from '../types'

// API configuration from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'
const API_TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT || '10000')

// Create axios instance with configurable base URL
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor for authentication
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    logger.debug(`API Request: ${config.method?.toUpperCase()} ${config.url}`)
    return config
  },
  (error) => {
    logger.error('API Request Error:', error)
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    logger.debug(`API Response: ${response.status} ${response.config.url}`)
    return response
  },
  (error) => {
    const message = error.response?.data?.message || error.message
    logger.error(`API Error: ${error.response?.status} ${message}`)
    
    // Handle authentication errors
    if (error.response?.status === 401) {
      localStorage.removeItem('accessToken')
      // Redirect to login would happen here
    }
    
    return Promise.reject(error)
  }
)

// Generic API functions (structure only - no actual implementation)
export const api = {
  // Auth endpoints
  auth: {
    login: async (credentials: { email: string; password: string }) => {
      // Structure only - no actual implementation
      logger.info('Login API call structure ready')
      throw new Error('Not implemented - structure only')
    },
    register: async (userData: { name: string; email: string; password: string }) => {
      logger.info('Register API call structure ready')
      throw new Error('Not implemented - structure only')
    },
    logout: async () => {
      logger.info('Logout API call structure ready')
      throw new Error('Not implemented - structure only')
    },
  },
  
  // User endpoints
  users: {
    getProfile: async () => {
      logger.info('Get profile API call structure ready')
      throw new Error('Not implemented - structure only')
    },
    updateProfile: async (userData: any) => {
      logger.info('Update profile API call structure ready')
      throw new Error('Not implemented - structure only')
    },
  },
  
  // Trip endpoints
  trips: {
    getAll: async () => {
      logger.info('Get trips API call structure ready')
      throw new Error('Not implemented - structure only')
    },
    getById: async (id: string) => {
      logger.info('Get trip by ID API call structure ready')
      throw new Error('Not implemented - structure only')
    },
    create: async (tripData: any) => {
      logger.info('Create trip API call structure ready')
      throw new Error('Not implemented - structure only')
    },
    update: async (id: string, tripData: any) => {
      logger.info('Update trip API call structure ready')
      throw new Error('Not implemented - structure only')
    },
    delete: async (id: string) => {
      logger.info('Delete trip API call structure ready')
      throw new Error('Not implemented - structure only')
    },
  },
  
  // AI endpoints
  ai: {
    getRecommendations: async (tripId: string) => {
      logger.info('Get AI recommendations API call structure ready')
      throw new Error('Not implemented - structure only')
    },
  },
}

export default api
