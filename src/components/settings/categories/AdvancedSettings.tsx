import React from 'react'
import SettingItem, { ToggleSwitch, SelectInput } from '../SettingItem'

const AdvancedSettings: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Beta Features</h3>
        <div className="space-y-4">
          <SettingItem
            label="Early Access Opt-in"
            description="Get access to experimental features before they're released"
          >
            <ToggleSwitch checked={false} onChange={() => {}} />
          </SettingItem>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Debug Settings</h3>
        <div className="space-y-4">
          <SettingItem
            label="Logging Level"
            description="Control the amount of diagnostic information collected"
          >
            <SelectInput
              value=""
              onChange={() => {}}
              options={[
                { value: 'error', label: 'Errors Only' },
                { value: 'warn', label: 'Warnings' },
                { value: 'info', label: 'Information' },
                { value: 'debug', label: 'Debug' }
              ]}
            />
          </SettingItem>
        </div>
      </div>

      <div className="text-center py-8 text-gray-500">
        <p>Full advanced settings implementation coming soon...</p>
      </div>
    </div>
  )
}

export default AdvancedSettings