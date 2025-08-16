import React from 'react'
import SettingItem, { ToggleSwitch } from '../SettingItem'

const SustainabilityWellnessSettings: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Environmental</h3>
        <div className="space-y-4">
          <SettingItem
            label="Carbon Offset Preferences"
            description="Automatically calculate and offer carbon offset options"
          >
            <ToggleSwitch checked={false} onChange={() => {}} />
          </SettingItem>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Health & Wellness</h3>
        <div className="space-y-4">
          <SettingItem
            label="Jet Lag Optimization"
            description="Get suggestions to minimize jet lag effects"
          >
            <ToggleSwitch checked={true} onChange={() => {}} />
          </SettingItem>
        </div>
      </div>

      <div className="text-center py-8 text-gray-500">
        <p>Full sustainability & wellness settings implementation coming soon...</p>
      </div>
    </div>
  )
}

export default SustainabilityWellnessSettings