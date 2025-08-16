import React, { useState, useEffect } from 'react'
import Modal from '../ui/Modal'
import SettingsNav from './SettingsNav'
import { SettingsCategory } from '../../types/settings'
import { getCategoryInfo } from '../../config/settingsCategories'

// Category components - import as they're created
import ProfileSettings from './categories/ProfileSettings'
import TravelPreferencesSettings from './categories/TravelPreferencesSettings'
import AIAssistantSettings from './categories/AIAssistantSettings'
import GroupTravelSettings from './categories/GroupTravelSettings'
import SafetyEmergencySettings from './categories/SafetyEmergencySettings'
import MemoryDocumentationSettings from './categories/MemoryDocumentationSettings'
import NotificationSettings from './categories/NotificationSettings'
import PrivacyDataSettings from './categories/PrivacyDataSettings'
import SustainabilityWellnessSettings from './categories/SustainabilityWellnessSettings'
import OfflineSyncSettings from './categories/OfflineSyncSettings'
import AdvancedSettings from './categories/AdvancedSettings'

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
  initialCategory?: SettingsCategory
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  initialCategory = 'profile'
}) => {
  const [activeCategory, setActiveCategory] = useState<SettingsCategory>(initialCategory)

  useEffect(() => {
    if (isOpen && initialCategory) {
      setActiveCategory(initialCategory)
    }
  }, [isOpen, initialCategory])

  const renderCategoryContent = () => {
    switch (activeCategory) {
      case 'profile':
        return <ProfileSettings />
      case 'travel_preferences':
        return <TravelPreferencesSettings />
      case 'ai_assistant':
        return <AIAssistantSettings />
      case 'group_travel':
        return <GroupTravelSettings />
      case 'safety_emergency':
        return <SafetyEmergencySettings />
      case 'memory_documentation':
        return <MemoryDocumentationSettings />
      case 'notifications':
        return <NotificationSettings />
      case 'privacy_data':
        return <PrivacyDataSettings />
      case 'sustainability_wellness':
        return <SustainabilityWellnessSettings />
      case 'offline_sync':
        return <OfflineSyncSettings />
      case 'advanced':
        return <AdvancedSettings />
      default:
        return (
          <div className="text-center py-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Settings category not implemented
            </h3>
            <p className="text-gray-600">
              This settings category is coming soon.
            </p>
          </div>
        )
    }
  }

  const currentCategory = getCategoryInfo(activeCategory)

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="fullscreen"
      className="h-[90vh] max-h-[900px]"
    >
      <div className="flex h-full">
        {/* Settings Navigation */}
        <SettingsNav
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* Settings Content */}
        <div className="flex-1 flex flex-col h-full">
          {/* Category Header */}
          <div className="px-6 py-4 border-b border-white/20">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{currentCategory?.icon}</span>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  {currentCategory?.name}
                </h1>
                <p className="text-sm text-gray-600">
                  {currentCategory?.description}
                </p>
              </div>
            </div>
          </div>

          {/* Category Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6">
              {renderCategoryContent()}
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-white/20 bg-white/30">
            <div className="flex justify-between items-center">
              <div className="text-xs text-gray-500">
                Changes are saved automatically
              </div>
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white/50 hover:bg-white/70 border border-gray-300 rounded-lg transition-colors duration-200"
              >
                Close Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default SettingsModal