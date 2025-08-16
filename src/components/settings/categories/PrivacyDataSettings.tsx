import React from 'react'
import SettingItem, { ToggleSwitch, SelectInput } from '../SettingItem'

const PrivacyDataSettings: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Visibility</h3>
        <div className="space-y-4">
          <SettingItem
            label="Profile Visibility"
            description="Who can see your profile and travel information"
          >
            <SelectInput
              value=""
              onChange={() => {}}
              options={[
                { value: 'public', label: 'Public' },
                { value: 'friends', label: 'Friends Only' },
                { value: 'private', label: 'Private' }
              ]}
            />
          </SettingItem>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Collection</h3>
        <div className="space-y-4">
          <SettingItem
            label="Analytics Consent"
            description="Allow collection of usage data to improve the service"
          >
            <ToggleSwitch checked={true} onChange={() => {}} />
          </SettingItem>
        </div>
      </div>

      <div className="text-center py-8 text-gray-500">
        <p>Full privacy & data settings implementation coming soon...</p>
      </div>
    </div>
  )
}

export default PrivacyDataSettings