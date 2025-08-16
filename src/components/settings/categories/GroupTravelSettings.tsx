import React from 'react'
import SettingItem, { SelectInput } from '../SettingItem'

const GroupTravelSettings: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Default Roles</h3>
        <div className="space-y-4">
          <SettingItem
            label="Preferred Role in Group Trips"
            description="Your typical role when traveling with others"
          >
            <SelectInput
              value=""
              onChange={() => {}}
              options={[
                { value: 'organizer', label: 'Organizer' },
                { value: 'participant', label: 'Participant' },
                { value: 'flexible', label: 'Flexible' }
              ]}
            />
          </SettingItem>
        </div>
      </div>

      <div className="text-center py-8 text-gray-500">
        <p>Full group travel settings implementation coming soon...</p>
      </div>
    </div>
  )
}

export default GroupTravelSettings