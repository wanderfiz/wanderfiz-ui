import React from 'react'
import SettingItem, { ToggleSwitch, SelectInput } from '../SettingItem'

const AIAssistantSettings: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Personalization</h3>
        <div className="space-y-4">
          <SettingItem
            label="AI Learning Permissions"
            description="Allow AI to learn from your preferences to provide better recommendations"
          >
            <ToggleSwitch checked={true} onChange={() => {}} />
          </SettingItem>
          
          <SettingItem
            label="Recommendation Style"
            description="How you prefer to receive AI suggestions"
          >
            <SelectInput
              value=""
              onChange={() => {}}
              options={[
                { value: 'conservative', label: 'Conservative' },
                { value: 'balanced', label: 'Balanced' },
                { value: 'adventurous', label: 'Adventurous' }
              ]}
            />
          </SettingItem>
        </div>
      </div>

      <div className="text-center py-8 text-gray-500">
        <p>Full AI assistant settings implementation coming soon...</p>
      </div>
    </div>
  )
}

export default AIAssistantSettings