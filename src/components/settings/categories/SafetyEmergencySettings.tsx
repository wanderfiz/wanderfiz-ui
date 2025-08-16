import React from 'react'
import SettingItem, { TextInput, ToggleSwitch } from '../SettingItem'

const SafetyEmergencySettings: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Emergency Contacts</h3>
        <div className="space-y-4">
          <SettingItem
            label="Primary Emergency Contact"
            description="Main person to contact in case of emergency"
          >
            <div className="space-y-2">
              <TextInput value="" onChange={() => {}} placeholder="Contact name" />
              <TextInput value="" onChange={() => {}} placeholder="Phone number" type="tel" />
            </div>
          </SettingItem>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Safety Alerts</h3>
        <div className="space-y-4">
          <SettingItem
            label="Location Sharing"
            description="Allow emergency location sharing with contacts"
          >
            <ToggleSwitch checked={false} onChange={() => {}} />
          </SettingItem>
        </div>
      </div>

      <div className="text-center py-8 text-gray-500">
        <p>Full safety & emergency settings implementation coming soon...</p>
      </div>
    </div>
  )
}

export default SafetyEmergencySettings