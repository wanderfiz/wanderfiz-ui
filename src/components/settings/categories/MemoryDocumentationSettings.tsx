import React from 'react'
import SettingItem, { ToggleSwitch } from '../SettingItem'

const MemoryDocumentationSettings: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Photo Management</h3>
        <div className="space-y-4">
          <SettingItem
            label="Auto-backup Photos"
            description="Automatically backup photos from your trips"
          >
            <ToggleSwitch checked={true} onChange={() => {}} />
          </SettingItem>
        </div>
      </div>

      <div className="text-center py-8 text-gray-500">
        <p>Full memory & documentation settings implementation coming soon...</p>
      </div>
    </div>
  )
}

export default MemoryDocumentationSettings