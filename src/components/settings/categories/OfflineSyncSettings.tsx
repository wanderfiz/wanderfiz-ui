import React from 'react'
import SettingItem, { ToggleSwitch, SelectInput } from '../SettingItem'

const OfflineSyncSettings: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Offline Mode</h3>
        <div className="space-y-4">
          <SettingItem
            label="Sync Frequency"
            description="How often to sync data when online"
          >
            <SelectInput
              value=""
              onChange={() => {}}
              options={[
                { value: 'realtime', label: 'Real-time' },
                { value: 'hourly', label: 'Hourly' },
                { value: 'daily', label: 'Daily' },
                { value: 'manual', label: 'Manual only' }
              ]}
            />
          </SettingItem>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Connectivity</h3>
        <div className="space-y-4">
          <SettingItem
            label="WiFi-Only Mode"
            description="Only sync and download data when connected to WiFi"
          >
            <ToggleSwitch checked={false} onChange={() => {}} />
          </SettingItem>
        </div>
      </div>

      <div className="text-center py-8 text-gray-500">
        <p>Full offline & sync settings implementation coming soon...</p>
      </div>
    </div>
  )
}

export default OfflineSyncSettings