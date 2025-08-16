import { SettingsCategoryInfo } from '../types/settings'

export const SETTINGS_CATEGORIES: SettingsCategoryInfo[] = [
  {
    key: 'profile',
    name: 'Profile & Account',
    description: 'Personal information and account settings',
    icon: '👤',
    sortOrder: 1
  },
  {
    key: 'travel_preferences',
    name: 'Travel Preferences',
    description: 'Trip planning and travel preferences',
    icon: '✈️',
    sortOrder: 2
  },
  {
    key: 'ai_assistant',
    name: 'AI Assistant Settings',
    description: 'AI personalization and assistant preferences',
    icon: '🤖',
    sortOrder: 3
  },
  {
    key: 'group_travel',
    name: 'Group Travel Settings',
    description: 'Group coordination and collaboration settings',
    icon: '👥',
    sortOrder: 4
  },
  {
    key: 'safety_emergency',
    name: 'Safety & Emergency',
    description: 'Emergency contacts and safety settings',
    icon: '🚨',
    sortOrder: 5
  },
  {
    key: 'memory_documentation',
    name: 'Memory & Documentation',
    description: 'Photo management and story settings',
    icon: '📸',
    sortOrder: 6
  },
  {
    key: 'notifications',
    name: 'Notification Preferences',
    description: 'Communication and alert preferences',
    icon: '🔔',
    sortOrder: 7
  },
  {
    key: 'privacy_data',
    name: 'Privacy & Data Settings',
    description: 'Data sharing and privacy controls',
    icon: '🔒',
    sortOrder: 8
  },
  {
    key: 'sustainability_wellness',
    name: 'Sustainability & Wellness',
    description: 'Environmental and health settings',
    icon: '🌱',
    sortOrder: 9
  },
  {
    key: 'offline_sync',
    name: 'Offline & Sync Settings',
    description: 'Data synchronization preferences',
    icon: '📱',
    sortOrder: 10
  },
  {
    key: 'advanced',
    name: 'Advanced Settings',
    description: 'Developer and advanced configuration',
    icon: '⚙️',
    sortOrder: 11
  }
]

export const getCategoryInfo = (categoryKey: string): SettingsCategoryInfo | undefined => {
  return SETTINGS_CATEGORIES.find(cat => cat.key === categoryKey)
}

export const getCategoryByIndex = (index: number): SettingsCategoryInfo | undefined => {
  return SETTINGS_CATEGORIES[index]
}