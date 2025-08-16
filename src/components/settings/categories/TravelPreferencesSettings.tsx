import React from 'react'
import SettingItem, { SelectInput, ToggleSwitch, MultiSelect } from '../SettingItem'

const TravelPreferencesSettings: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Trip Planning</h3>
        <div className="space-y-4">
          <SettingItem
            label="Preferred Trip Duration"
            description="Your typical vacation length preference"
          >
            <SelectInput
              value=""
              onChange={() => {}}
              options={[
                { value: 'weekend', label: 'Weekend (1-3 days)' },
                { value: 'short', label: 'Short Trip (4-7 days)' },
                { value: 'medium', label: 'Medium Trip (1-2 weeks)' },
                { value: 'long', label: 'Extended Trip (2+ weeks)' }
              ]}
            />
          </SettingItem>
          
          <SettingItem
            label="Budget Range"
            description="Your typical budget range per trip"
          >
            <SelectInput
              value=""
              onChange={() => {}}
              options={[
                { value: 'budget', label: 'Budget ($500-1500)' },
                { value: 'mid', label: 'Mid-range ($1500-5000)' },
                { value: 'luxury', label: 'Luxury ($5000+)' }
              ]}
            />
          </SettingItem>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Transportation</h3>
        <div className="space-y-4">
          <SettingItem
            label="Preferred Airlines"
            description="Your favorite airlines or loyalty programs"
          >
            <MultiSelect
              value={[]}
              onChange={() => {}}
              options={[
                { value: 'american', label: 'American Airlines' },
                { value: 'delta', label: 'Delta' },
                { value: 'united', label: 'United' },
                { value: 'southwest', label: 'Southwest' }
              ]}
            />
          </SettingItem>
        </div>
      </div>

      <div className="text-center py-8 text-gray-500">
        <p>Full travel preferences implementation coming soon...</p>
      </div>
    </div>
  )
}

export default TravelPreferencesSettings