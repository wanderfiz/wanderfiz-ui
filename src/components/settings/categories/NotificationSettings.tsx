import React from 'react'
import SettingItem, { ToggleSwitch } from '../SettingItem'

const NotificationSettings: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery Methods</h3>
        <div className="space-y-4">
          <SettingItem
            label="Email Notifications"
            description="Receive notifications via email"
          >
            <ToggleSwitch checked={true} onChange={() => {}} />
          </SettingItem>
          
          <SettingItem
            label="Push Notifications"
            description="Receive push notifications on your devices"
          >
            <ToggleSwitch checked={true} onChange={() => {}} />
          </SettingItem>
          
          <SettingItem
            label="SMS Notifications"
            description="Receive notifications via text message"
          >
            <ToggleSwitch checked={false} onChange={() => {}} />
          </SettingItem>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Trip Planning</h3>
        <div className="space-y-4">
          <SettingItem
            label="Booking Reminders"
            description="Get reminded about upcoming booking deadlines"
          >
            <ToggleSwitch checked={true} onChange={() => {}} />
          </SettingItem>
        </div>
      </div>

      <div className="text-center py-8 text-gray-500">
        <p>Full notification settings implementation coming soon...</p>
      </div>
    </div>
  )
}

export default NotificationSettings