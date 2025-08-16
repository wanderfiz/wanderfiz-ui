import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import GlassInput from '../components/ui/GlassInput'
import { useAuth } from '../hooks/useAuth'
import type { TravelStyle, BudgetRange } from '../types/user'

interface TabItem {
  id: string
  label: string
  icon: string
}

const TABS: TabItem[] = [
  { id: 'profile', label: 'Profile', icon: '👤' },
  { id: 'travel', label: 'Travel Preferences', icon: '✈️' },
  { id: 'account', label: 'Account', icon: '🔐' },
  { id: 'notifications', label: 'Notifications', icon: '🔔' },
  { id: 'privacy', label: 'Privacy', icon: '🔒' }
]

const TRAVEL_STYLES: { value: TravelStyle; label: string; description: string }[] = [
  { value: 'luxury', label: 'Luxury', description: '5-star hotels, fine dining, premium experiences' },
  { value: 'mid-range', label: 'Mid-Range', description: 'Comfortable hotels, nice restaurants, popular attractions' },
  { value: 'budget', label: 'Budget', description: 'Affordable accommodations, local eateries, free activities' },
  { value: 'backpacker', label: 'Backpacker', description: 'Hostels, street food, off-the-beaten-path adventures' },
  { value: 'family', label: 'Family', description: 'Family-friendly hotels, kid activities, safe destinations' },
  { value: 'business', label: 'Business', description: 'Business hotels, convenient locations, efficient travel' },
  { value: 'adventure', label: 'Adventure', description: 'Outdoor activities, unique experiences, active exploration' }
]

const BUDGET_RANGES: { value: BudgetRange; label: string; range: string }[] = [
  { value: 'budget', label: 'Budget', range: '$0 - $100/day' },
  { value: 'moderate', label: 'Moderate', range: '$100 - $250/day' },
  { value: 'premium', label: 'Premium', range: '$250 - $500/day' },
  { value: 'luxury', label: 'Luxury', range: '$500+/day' }
]

const INTERESTS = [
  'History', 'Culture', 'Food & Wine', 'Nature', 'Adventure Sports',
  'Beach', 'Mountains', 'City Tours', 'Photography', 'Shopping',
  'Nightlife', 'Art & Museums', 'Wildlife', 'Wellness & Spa', 'Architecture'
]

const SettingsPage: React.FC = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('profile')
  const [isSaving, setIsSaving] = useState(false)

  // Form states
  const [profileData, setProfileData] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    bio: '',
    location: '',
    website: ''
  })

  const [travelPreferences, setTravelPreferences] = useState({
    travelStyle: 'mid-range' as TravelStyle,
    budgetRange: 'moderate' as BudgetRange,
    interests: ['Culture', 'Food & Wine', 'Photography']
  })

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    tripReminders: true,
    marketingEmails: false
  })

  const [privacy, setPrivacy] = useState({
    profileVisibility: 'friends' as 'public' | 'friends' | 'private',
    shareTrips: true,
    sharePhotos: true,
    allowRecommendations: true
  })

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSaving(false)
    // Show success message (in production, you'd show a toast notification)
    alert('Settings saved successfully!')
  }

  const renderProfileSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
            <GlassInput
              type="text"
              value={profileData.firstName}
              onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
              placeholder="Enter your first name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
            <GlassInput
              type="text"
              value={profileData.lastName}
              onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
              placeholder="Enter your last name"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
        <GlassInput
          type="email"
          value={profileData.email}
          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
          placeholder="your@email.com"
          disabled
        />
        <p className="text-xs text-gray-500 mt-1">Email cannot be changed directly. Contact support if needed.</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
        <textarea
          className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF561D]/50 transition-all resize-none"
          rows={4}
          value={profileData.bio}
          onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
          placeholder="Tell us about yourself and your travel experiences..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
          <GlassInput
            type="text"
            value={profileData.location}
            onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
            placeholder="City, Country"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
          <GlassInput
            type="url"
            value={profileData.website}
            onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
            placeholder="https://yourwebsite.com"
          />
        </div>
      </div>

      <div className="pt-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Photo</h3>
        <div className="flex items-center gap-4">
          <div className="w-24 h-24 bg-gradient-to-r from-[#FF561D] to-[#0ea5e9] rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {user?.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U'}
          </div>
          <div>
            <Button variant="secondary" size="small">Upload Photo</Button>
            <p className="text-xs text-gray-500 mt-2">JPG, PNG or GIF. Max size 5MB.</p>
          </div>
        </div>
      </div>
    </div>
  )

  const renderTravelPreferences = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Travel Style</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {TRAVEL_STYLES.map((style) => (
            <label
              key={style.value}
              className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                travelPreferences.travelStyle === style.value
                  ? 'border-[#FF561D] bg-[#FF561D]/5'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                name="travelStyle"
                value={style.value}
                checked={travelPreferences.travelStyle === style.value}
                onChange={(e) => setTravelPreferences({ ...travelPreferences, travelStyle: e.target.value as TravelStyle })}
                className="mt-1"
              />
              <div className="flex-1">
                <div className="font-medium text-gray-900">{style.label}</div>
                <div className="text-xs text-gray-600 mt-1">{style.description}</div>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Budget Range</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {BUDGET_RANGES.map((budget) => (
            <label
              key={budget.value}
              className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                travelPreferences.budgetRange === budget.value
                  ? 'border-[#FF561D] bg-[#FF561D]/5'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                name="budgetRange"
                value={budget.value}
                checked={travelPreferences.budgetRange === budget.value}
                onChange={(e) => setTravelPreferences({ ...travelPreferences, budgetRange: e.target.value as BudgetRange })}
              />
              <div className="flex-1">
                <div className="font-medium text-gray-900">{budget.label}</div>
                <div className="text-xs text-gray-600">{budget.range}</div>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Interests</h3>
        <div className="flex flex-wrap gap-2">
          {INTERESTS.map((interest) => (
            <button
              key={interest}
              onClick={() => {
                const interests = travelPreferences.interests.includes(interest)
                  ? travelPreferences.interests.filter(i => i !== interest)
                  : [...travelPreferences.interests, interest]
                setTravelPreferences({ ...travelPreferences, interests })
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                travelPreferences.interests.includes(interest)
                  ? 'bg-[#FF561D] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {interest}
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-2">Select your travel interests to get personalized recommendations</p>
      </div>
    </div>
  )

  const renderAccountSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">User ID</span>
            <span className="text-sm text-gray-900 font-mono">{user?.id || 'N/A'}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">Email</span>
            <span className="text-sm text-gray-900">{user?.email || 'N/A'}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">Account Status</span>
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">Active</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Subscription</h3>
        <div className="bg-gradient-to-r from-[#FF561D]/10 to-[#0ea5e9]/10 rounded-lg p-6 border border-[#FF561D]/20">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-xl font-bold text-gray-900">Explorer Plan</div>
              <div className="text-sm text-gray-600">Perfect for regular travelers</div>
            </div>
            <div className="text-2xl">🎒</div>
          </div>
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <span className="text-green-500">✓</span> Unlimited trip planning
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <span className="text-green-500">✓</span> AI-powered recommendations
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <span className="text-green-500">✓</span> Offline access
            </div>
          </div>
          <Button variant="secondary" size="small" onClick={() => navigate('/pricing')}>
            Upgrade Plan
          </Button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Security</h3>
        <div className="space-y-3">
          <Button variant="secondary" className="w-full">
            Change Password
          </Button>
          <Button variant="secondary" className="w-full">
            Enable Two-Factor Authentication
          </Button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Danger Zone</h3>
        <div className="border-2 border-red-200 rounded-lg p-4">
          <p className="text-sm text-gray-700 mb-3">
            Once you delete your account, there is no going back. Please be certain.
          </p>
          <Button variant="ghost" size="small" className="text-red-600 hover:bg-red-50">
            Delete Account
          </Button>
        </div>
      </div>
    </div>
  )

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Email Notifications</h3>
        <div className="space-y-4">
          <label className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">Email Notifications</div>
              <div className="text-sm text-gray-600">Receive important updates via email</div>
            </div>
            <input
              type="checkbox"
              checked={notifications.email}
              onChange={(e) => setNotifications({ ...notifications, email: e.target.checked })}
              className="w-5 h-5 text-[#FF561D] rounded focus:ring-[#FF561D]"
            />
          </label>
          <label className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">Trip Reminders</div>
              <div className="text-sm text-gray-600">Get reminded about upcoming trips</div>
            </div>
            <input
              type="checkbox"
              checked={notifications.tripReminders}
              onChange={(e) => setNotifications({ ...notifications, tripReminders: e.target.checked })}
              className="w-5 h-5 text-[#FF561D] rounded focus:ring-[#FF561D]"
            />
          </label>
          <label className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">Marketing Emails</div>
              <div className="text-sm text-gray-600">Receive deals and travel inspiration</div>
            </div>
            <input
              type="checkbox"
              checked={notifications.marketingEmails}
              onChange={(e) => setNotifications({ ...notifications, marketingEmails: e.target.checked })}
              className="w-5 h-5 text-[#FF561D] rounded focus:ring-[#FF561D]"
            />
          </label>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Push Notifications</h3>
        <div className="space-y-4">
          <label className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">Push Notifications</div>
              <div className="text-sm text-gray-600">Receive notifications on your device</div>
            </div>
            <input
              type="checkbox"
              checked={notifications.push}
              onChange={(e) => setNotifications({ ...notifications, push: e.target.checked })}
              className="w-5 h-5 text-[#FF561D] rounded focus:ring-[#FF561D]"
            />
          </label>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">SMS Notifications</h3>
        <div className="space-y-4">
          <label className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">SMS Notifications</div>
              <div className="text-sm text-gray-600">Receive text messages for urgent updates</div>
            </div>
            <input
              type="checkbox"
              checked={notifications.sms}
              onChange={(e) => setNotifications({ ...notifications, sms: e.target.checked })}
              className="w-5 h-5 text-[#FF561D] rounded focus:ring-[#FF561D]"
            />
          </label>
        </div>
      </div>
    </div>
  )

  const renderPrivacySettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Visibility</h3>
        <div className="space-y-3">
          <label className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
            privacy.profileVisibility === 'public'
              ? 'border-[#FF561D] bg-[#FF561D]/5'
              : 'border-gray-200 hover:border-gray-300'
          }`}>
            <input
              type="radio"
              name="visibility"
              value="public"
              checked={privacy.profileVisibility === 'public'}
              onChange={(e) => setPrivacy({ ...privacy, profileVisibility: e.target.value as 'public' | 'friends' | 'private' })}
              className="mt-1"
            />
            <div>
              <div className="font-medium text-gray-900">Public</div>
              <div className="text-sm text-gray-600">Anyone can see your profile and trips</div>
            </div>
          </label>
          <label className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
            privacy.profileVisibility === 'friends'
              ? 'border-[#FF561D] bg-[#FF561D]/5'
              : 'border-gray-200 hover:border-gray-300'
          }`}>
            <input
              type="radio"
              name="visibility"
              value="friends"
              checked={privacy.profileVisibility === 'friends'}
              onChange={(e) => setPrivacy({ ...privacy, profileVisibility: e.target.value as 'public' | 'friends' | 'private' })}
              className="mt-1"
            />
            <div>
              <div className="font-medium text-gray-900">Friends Only</div>
              <div className="text-sm text-gray-600">Only your friends can see your profile</div>
            </div>
          </label>
          <label className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
            privacy.profileVisibility === 'private'
              ? 'border-[#FF561D] bg-[#FF561D]/5'
              : 'border-gray-200 hover:border-gray-300'
          }`}>
            <input
              type="radio"
              name="visibility"
              value="private"
              checked={privacy.profileVisibility === 'private'}
              onChange={(e) => setPrivacy({ ...privacy, profileVisibility: e.target.value as 'public' | 'friends' | 'private' })}
              className="mt-1"
            />
            <div>
              <div className="font-medium text-gray-900">Private</div>
              <div className="text-sm text-gray-600">Only you can see your profile</div>
            </div>
          </label>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Sharing Settings</h3>
        <div className="space-y-4">
          <label className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">Share Trips</div>
              <div className="text-sm text-gray-600">Allow others to see your trip plans</div>
            </div>
            <input
              type="checkbox"
              checked={privacy.shareTrips}
              onChange={(e) => setPrivacy({ ...privacy, shareTrips: e.target.checked })}
              className="w-5 h-5 text-[#FF561D] rounded focus:ring-[#FF561D]"
            />
          </label>
          <label className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">Share Photos</div>
              <div className="text-sm text-gray-600">Allow others to see your travel photos</div>
            </div>
            <input
              type="checkbox"
              checked={privacy.sharePhotos}
              onChange={(e) => setPrivacy({ ...privacy, sharePhotos: e.target.checked })}
              className="w-5 h-5 text-[#FF561D] rounded focus:ring-[#FF561D]"
            />
          </label>
          <label className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">Allow Recommendations</div>
              <div className="text-sm text-gray-600">Get personalized travel recommendations</div>
            </div>
            <input
              type="checkbox"
              checked={privacy.allowRecommendations}
              onChange={(e) => setPrivacy({ ...privacy, allowRecommendations: e.target.checked })}
              className="w-5 h-5 text-[#FF561D] rounded focus:ring-[#FF561D]"
            />
          </label>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Data & Privacy</h3>
        <div className="space-y-3">
          <Button variant="secondary" className="w-full">
            Download My Data
          </Button>
          <Button variant="secondary" className="w-full">
            View Privacy Policy
          </Button>
        </div>
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfileSettings()
      case 'travel':
        return renderTravelPreferences()
      case 'account':
        return renderAccountSettings()
      case 'notifications':
        return renderNotificationSettings()
      case 'privacy':
        return renderPrivacySettings()
      default:
        return renderProfileSettings()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <button onClick={() => navigate('/dashboard')} className="hover:text-[#FF561D]">
              Dashboard
            </button>
            <span>/</span>
            <span className="text-gray-900">Settings</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-2">Manage your account settings and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Tabs */}
          <div className="lg:col-span-1">
            <Card variant="glass" padding="none">
              <nav className="p-2">
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                      activeTab === tab.id
                        ? 'bg-[#FF561D]/10 text-[#FF561D] font-medium'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <span className="text-xl">{tab.icon}</span>
                    <span className="text-sm">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </Card>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <Card variant="glass" padding="large">
              {renderContent()}
              
              {/* Save Button */}
              <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end gap-3">
                <Button 
                  variant="ghost" 
                  onClick={() => navigate('/dashboard')}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleSave}
                  disabled={isSaving}
                >
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage