// API service structure - UI only, no functional implementation
// This file defines the interface structure for future API integration

export interface ApiCredentials {
  email: string;
  password: string;
}

export interface ApiUserData {
  name: string;
  email: string;
  password: string;
}

// API service placeholder - structure only
export const api = {
  // Auth endpoints structure
  auth: {
    login: async (_credentials: ApiCredentials): Promise<void> => {
      throw new Error('API service not implemented - UI structure only')
    },
    register: async (_userData: ApiUserData): Promise<void> => {
      throw new Error('API service not implemented - UI structure only')
    },
    logout: async (): Promise<void> => {
      throw new Error('API service not implemented - UI structure only')
    },
  },
  
  // User endpoints structure
  users: {
    getProfile: async (): Promise<void> => {
      throw new Error('API service not implemented - UI structure only')
    },
    updateProfile: async (_userData: unknown): Promise<void> => {
      throw new Error('API service not implemented - UI structure only')
    },
  },
  
  // Trip endpoints structure
  trips: {
    getAll: async (): Promise<void> => {
      throw new Error('API service not implemented - UI structure only')
    },
    getById: async (_id: string): Promise<void> => {
      throw new Error('API service not implemented - UI structure only')
    },
    create: async (_tripData: unknown): Promise<void> => {
      throw new Error('API service not implemented - UI structure only')
    },
    update: async (_id: string, _tripData: unknown): Promise<void> => {
      throw new Error('API service not implemented - UI structure only')
    },
    delete: async (_id: string): Promise<void> => {
      throw new Error('API service not implemented - UI structure only')
    },
  },
  
  // AI endpoints structure
  ai: {
    getRecommendations: async (_tripId: string): Promise<void> => {
      throw new Error('API service not implemented - UI structure only')
    },
  },
}

export default api
