import React, { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import ProfileSettings from '../components/settings/categories/ProfileSettings'
import TravelPreferencesSettings from '../components/settings/categories/TravelPreferencesSettings'
import AIAssistantSettings from '../components/settings/categories/AIAssistantSettings'
import GroupTravelSettings from '../components/settings/categories/GroupTravelSettings'
import NotificationSettings from '../components/settings/categories/NotificationSettings'
import PrivacyDataSettings from '../components/settings/categories/PrivacyDataSettings'
import SafetyEmergencySettings from '../components/settings/categories/SafetyEmergencySettings'
import SustainabilityWellnessSettings from '../components/settings/categories/SustainabilityWellnessSettings'
import OfflineSyncSettings from '../components/settings/categories/OfflineSyncSettings'
import AdvancedSettings from '../components/settings/categories/AdvancedSettings'

type SettingsTab = 'account' | 'preferences' | 'notifications' | 'privacy' | 'advanced'

interface TabConfig {
  id: SettingsTab
  label: string
  description: string
}

const tabs: TabConfig[] = [
  { id: 'account', label: 'Account', description: 'Profile, safety & emergency contacts' },
  { id: 'preferences', label: 'Preferences', description: 'Travel, AI assistant & group settings' },
  { id: 'notifications', label: 'Notifications', description: 'Email, push & SMS preferences' },
  { id: 'privacy', label: 'Privacy & Data', description: 'Privacy, sync & sustainability' },
  { id: 'advanced', label: 'Advanced', description: 'Developer & experimental features' }
]

const SettingsPage: React.FC = () => {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState<SettingsTab>('account')

  const renderTabContent = () => {
    switch (activeTab) {
      case 'account':
        return (
          <div className="space-y-8">
            <ProfileSettings />
            <div className="border-t border-gray-200 pt-8">
              <SafetyEmergencySettings />
            </div>
          </div>
        )
      case 'preferences':
        return (
          <div className="space-y-8">
            <TravelPreferencesSettings />
            <div className="border-t border-gray-200 pt-8">
              <AIAssistantSettings />
            </div>
            <div className="border-t border-gray-200 pt-8">
              <GroupTravelSettings />
            </div>
          </div>
        )
      case 'notifications':
        return <NotificationSettings />
      case 'privacy':
        return (
          <div className="space-y-8">
            <PrivacyDataSettings />
            <div className="border-t border-gray-200 pt-8">
              <SustainabilityWellnessSettings />
            </div>
            <div className="border-t border-gray-200 pt-8">
              <OfflineSyncSettings />
            </div>
          </div>
        )
      case 'advanced':
        return <AdvancedSettings />
      default:
        return null
    }
  }

  return (
    <div className="flex-1 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-8 py-6">
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="px-8">
          <nav className="flex space-x-8" aria-label="Settings tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  py-4 px-1 border-b-2 font-medium text-sm transition-colors
                  ${activeTab === tab.id
                    ? 'border-[#FF561D] text-[#FF561D]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
                aria-current={activeTab === tab.id ? 'page' : undefined}
              >
                <span className="block">{tab.label}</span>
                <span className="block mt-1 text-xs font-normal text-gray-400">
                  {tab.description}
                </span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content Area */}
      <div className="px-8 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-8">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage