// Settings types for WanderFiz user settings system

export interface UserSettings {
  id: string
  userId: string
  category: string
  subcategory?: string
  settingKey: string
  settingValue: Record<string, any>
  dataType: string
  isEncrypted: boolean
  createdAt: string
  updatedAt: string
}

export interface EmergencyContact {
  id: string
  userId: string
  name: string
  relationship: string
  phoneNumber: string
  email?: string
  isPrimary: boolean
  createdAt: string
  updatedAt: string
}

export interface UserMedicalInfo {
  id: string
  userId: string
  allergies: string[]
  medications: Record<string, any>
  medicalConditions: string[]
  bloodType?: string
  insuranceInfo?: Record<string, any>
  createdAt: string
  updatedAt: string
}

export interface NotificationPreference {
  id: string
  userId: string
  notificationType: string
  emailEnabled: boolean
  pushEnabled: boolean
  smsEnabled: boolean
  frequency: string
  createdAt: string
  updatedAt: string
}

// Settings categories matching backend implementation
export type SettingsCategory = 
  | 'profile'
  | 'travel_preferences'
  | 'ai_assistant'
  | 'group_travel'
  | 'safety_emergency'
  | 'memory_documentation'
  | 'notifications'
  | 'privacy_data'
  | 'sustainability_wellness'
  | 'offline_sync'
  | 'advanced'

export interface SettingsCategoryInfo {
  key: SettingsCategory
  name: string
  description: string
  icon: string
  sortOrder: number
}

// Form data interfaces for each category
export interface ProfileSettings {
  personalInfo: {
    name: string
    email: string
    bio?: string
    avatar?: string
  }
  contactDetails: {
    phone?: string
  }
  accountPreferences: {
    username?: string
    displayName?: string
  }
}

export interface TravelPreferencesSettings {
  tripPlanning: {
    preferredDuration: string
    budgetRange: string
    planningStyle: string
  }
  transportation: {
    flightPreferences: Record<string, any>
    seatPreferences: string
    loyaltyPrograms: string[]
  }
  accommodation: {
    hotelPreferences: Record<string, any>
    roomTypes: string[]
    amenitiesPriorities: string[]
  }
  dining: {
    dietaryRestrictions: string[]
    cuisinePreferences: string[]
    mealTiming: string
  }
  activities: {
    adventureLevel: string
    culturalInterests: string[]
    accessibilityNeeds: string[]
  }
  budget: {
    defaultCurrency: string
    spendingCategories: Record<string, number>
    budgetAlerts: boolean
  }
}

export interface AIAssistantSettings {
  personalization: {
    aiLearningPermissions: boolean
    recommendationStyle: string
  }
  naturalLanguage: {
    communicationStyle: string
    languageSettings: string
  }
  tripGeneration: {
    defaultParameters: Record<string, any>
  }
  optimization: {
    routeOptimization: string
    efficiencyPriorities: string[]
  }
  suggestions: {
    frequency: string
    types: string[]
  }
  dataUsage: {
    trainingDataConsent: boolean
    privacyControls: Record<string, boolean>
  }
}

export interface GroupTravelSettings {
  defaultRoles: {
    preferredRole: string
  }
  expenseSplitting: {
    defaultMethods: string[]
    paymentPreferences: Record<string, any>
  }
  communication: {
    groupChatPreferences: Record<string, boolean>
    notificationTypes: string[]
  }
  sharing: {
    defaultPermissions: Record<string, boolean>
  }
  coordination: {
    votingPreferences: string
    decisionMakingStyle: string
  }
}

export interface SafetyEmergencySettings {
  emergencyContacts: EmergencyContact[]
  medicalInfo: UserMedicalInfo
  insurance: {
    travelInsurance: Record<string, any>
    policyNumbers: string[]
  }
  embassyContacts: {
    homeCountry: string
    preferences: Record<string, any>
  }
  safetyAlerts: {
    riskTolerance: string
    alertFrequency: string
  }
  locationSharing: {
    emergencySharing: boolean
    preferences: Record<string, boolean>
  }
  sosSettings: {
    oneTouchConfig: Record<string, any>
  }
}

export interface MemoryDocumentationSettings {
  photoManagement: {
    autoBackup: boolean
    organizationPreferences: Record<string, any>
  }
  storyGeneration: {
    aiStoryStyle: string
    privacySettings: Record<string, boolean>
  }
  socialSharing: {
    defaultPlatforms: string[]
    sharingPermissions: Record<string, boolean>
  }
  memoryCategories: {
    tagPreferences: string[]
    organizationStyle: string
  }
  exportOptions: {
    preferredFormats: string[]
  }
  creatorEconomy: {
    monetizationPreferences: Record<string, any>
    affiliateSettings: Record<string, any>
  }
}

export interface NotificationSettings {
  tripPlanning: NotificationPreference[]
  duringTravel: NotificationPreference[]
  groupTravel: NotificationPreference[]
  safety: NotificationPreference[]
  memories: NotificationPreference[]
  marketing: NotificationPreference[]
  deliveryMethods: {
    email: boolean
    push: boolean
    sms: boolean
  }
}

export interface PrivacyDataSettings {
  profileVisibility: {
    visibility: 'public' | 'friends' | 'private'
  }
  locationSharing: {
    realtimeLocation: boolean
    tripSharing: boolean
    historicalData: boolean
  }
  dataCollection: {
    analyticsConsent: boolean
    usageTracking: boolean
    personalizationData: boolean
  }
  thirdPartySharing: {
    partnerIntegrations: Record<string, boolean>
    affiliatePrograms: boolean
  }
  aiTraining: {
    modelTrainingConsent: boolean
  }
  marketing: {
    communicationPreferences: Record<string, boolean>
    dataUsageForAds: boolean
  }
}

export interface SustainabilityWellnessSettings {
  environmental: {
    carbonOffsetPreferences: Record<string, any>
    ecoFriendlyPrioritization: boolean
  }
  health: {
    jetLagOptimization: boolean
    medicationReminders: boolean
    fitnessTracking: boolean
  }
  wellness: {
    mentalHealthCheckins: boolean
    anxietyTools: boolean
    wellnessGoals: string[]
  }
  sustainableTravel: {
    transportPreferences: string[]
    localBusinessSupport: boolean
  }
  carbonTracking: {
    footprintMonitoring: boolean
    offsetAutomation: boolean
  }
}

export interface OfflineSyncSettings {
  offlineMode: {
    dataDownloadPreferences: Record<string, any>
    syncFrequency: string
  }
  deviceSync: {
    crossPlatformSync: boolean
    syncSettings: Record<string, any>
  }
  storageManagement: {
    localStorageLimits: number
    cleanupPreferences: Record<string, any>
  }
  backup: {
    cloudBackupSettings: Record<string, any>
    restorationPreferences: Record<string, any>
  }
  connectivity: {
    dataUsageLimits: number
    wifiOnlyModes: boolean
  }
}

export interface AdvancedSettings {
  apiAccess: {
    personalApiKeys: string[]
    integrationPermissions: Record<string, boolean>
  }
  betaFeatures: {
    earlyAccessOptIn: boolean
    experimentalFeatures: string[]
  }
  performance: {
    appPerformanceSettings: Record<string, any>
    cachingPreferences: Record<string, any>
  }
  debug: {
    loggingLevels: string
    diagnosticDataSharing: boolean
  }
  export: {
    dataExportFormats: string[]
    apiAccessLogs: boolean
  }
}

// API request/response interfaces
export interface CreateUserSettingsRequest {
  category: string
  subcategory?: string
  settingKey: string
  settingValue: Record<string, any>
  dataType?: string
  isEncrypted?: boolean
}

export interface UpdateUserSettingsRequest extends CreateUserSettingsRequest {
  id: string
}

export interface CreateEmergencyContactRequest {
  name: string
  relationship: string
  phoneNumber: string
  email?: string
  isPrimary?: boolean
}

export interface UpdateEmergencyContactRequest extends CreateEmergencyContactRequest {
  id: string
}

export interface CreateMedicalInfoRequest {
  allergies?: string[]
  medications?: Record<string, any>
  medicalConditions?: string[]
  bloodType?: string
  insuranceInfo?: Record<string, any>
}

export interface UpdateMedicalInfoRequest extends CreateMedicalInfoRequest {}

export interface CreateNotificationPreferenceRequest {
  notificationType: string
  emailEnabled?: boolean
  pushEnabled?: boolean
  smsEnabled?: boolean
  frequency?: string
}

export interface UpdateNotificationPreferenceRequest extends CreateNotificationPreferenceRequest {
  id: string
}