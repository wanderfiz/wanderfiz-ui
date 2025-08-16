import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import { useAuth } from '../hooks/useAuth'

interface NavItem {
  id: string
  label: string
  icon: string
  badge?: string
  active?: boolean
}

interface StatCard {
  id: string
  title: string
  value: string
  subtitle: string
  icon: string
  color: string
  trend?: {
    value: string
    isPositive: boolean
  }
}

interface UpcomingTrip {
  id: string
  destination: string
  dates: string
  image: string
  status: 'upcoming' | 'in-progress' | 'completed'
  daysLeft?: number
}

const NAVIGATION_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊', active: true },
  { id: 'trips', label: 'My Trips', icon: '🗺️', badge: '3' },
  { id: 'planning', label: 'Trip Planning', icon: '📝' },
  { id: 'memories', label: 'Memories', icon: '📸', badge: '24' },
  { id: 'assistant', label: 'AI Assistant', icon: '🤖' },
  { id: 'settings', label: 'Settings', icon: '⚙️' }
]

const STAT_CARDS: StatCard[] = [
  {
    id: 'trips',
    title: 'Total Trips',
    value: '12',
    subtitle: 'Completed adventures',
    icon: '✈️',
    color: 'from-[#FF561D] to-[#FF8A4C]',
    trend: { value: '+2 this month', isPositive: true }
  },
  {
    id: 'countries',
    title: 'Countries Visited',
    value: '8',
    subtitle: 'Around the world',
    icon: '🌍',
    color: 'from-[#0ea5e9] to-[#38bdf8]',
    trend: { value: '+1 this year', isPositive: true }
  },
  {
    id: 'memories',
    title: 'Memories Captured',
    value: '247',
    subtitle: 'Photos & stories',
    icon: '📸',
    color: 'from-[#a855f7] to-[#ec4899]',
    trend: { value: '+45 recently', isPositive: true }
  },
  {
    id: 'savings',
    title: 'Money Saved',
    value: '$1,240',
    subtitle: 'Through smart planning',
    icon: '💰',
    color: 'from-green-500 to-green-600',
    trend: { value: '+$340 this year', isPositive: true }
  }
]

const UPCOMING_TRIPS: UpcomingTrip[] = [
  {
    id: '1',
    destination: 'Tokyo, Japan',
    dates: 'Dec 15-22, 2024',
    image: '🏯',
    status: 'upcoming',
    daysLeft: 28
  },
  {
    id: '2',
    destination: 'Paris, France',
    dates: 'Jan 10-17, 2025',
    image: '🗼',
    status: 'upcoming',
    daysLeft: 54
  }
]

const DashboardPage: React.FC = () => {
  const navigate = useNavigate()
  const { user, signOut } = useAuth()
  const [activeNav, setActiveNav] = useState('dashboard')

  const handleNavClick = (navId: string) => {
    setActiveNav(navId)
    if (navId === 'settings') {
      navigate('/dashboard/settings')
    }
  }

  const handleLogout = async () => {
    try {
      await signOut()
      navigate('/', { replace: true })
    } catch {
      // Still navigate to home even if logout fails
      navigate('/', { replace: true })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none">
                <circle cx="24" cy="24" r="20" stroke="#FF561D" strokeWidth="2"/>
                <path d="M24 8 L28 24 L24 40 L20 24 Z" fill="#FF561D" opacity="0.8"/>
                <path d="M8 24 L24 20 L40 24 L24 28 Z" fill="#0ea5e9" opacity="0.6"/>
                <circle cx="24" cy="24" r="4" fill="#FF561D"/>
              </svg>
              <span className="text-xl font-bold text-gray-900">WanderFiz</span>
            </Link>
            
            {/* User Menu */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{user?.name || 'User'}</div>
                  <div className="text-xs text-gray-500">Explorer Plan</div>
                </div>
                <div className="w-10 h-10 bg-gradient-to-r from-[#FF561D] to-[#0ea5e9] rounded-full flex items-center justify-center text-white font-bold">
                  {user?.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U'}
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200">
          <div className="p-6">
            <nav className="space-y-1">
              {NAVIGATION_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    activeNav === item.id
                      ? 'bg-[#FF561D]/10 text-[#FF561D]'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="bg-[#FF561D] text-white text-xs px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-8">
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, {user?.name ? user.name.split(' ')[0] : 'Explorer'}! 👋
              </h1>
              <p className="text-gray-600">
                Ready for your next adventure? Here's what's happening with your travels.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {STAT_CARDS.map((stat) => (
                <Card key={stat.id} variant="glass" padding="large">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center text-xl`}>
                      {stat.icon}
                    </div>
                    {stat.trend && (
                      <span className={`text-xs font-medium ${
                        stat.trend.isPositive ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.trend.value}
                      </span>
                    )}
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium text-gray-700">
                    {stat.title}
                  </div>
                  <div className="text-xs text-gray-500">
                    {stat.subtitle}
                  </div>
                </Card>
              ))}
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Upcoming Trips */}
              <div className="lg:col-span-2">
                <Card variant="glass" padding="large">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Upcoming Trips</h2>
                    <Button
                      variant="ghost"
                      size="small"
                      onClick={() => navigate('/features')}
                    >
                      View All
                    </Button>
                  </div>

                  {UPCOMING_TRIPS.length > 0 ? (
                    <div className="space-y-4">
                      {UPCOMING_TRIPS.map((trip) => (
                        <div
                          key={trip.id}
                          className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer"
                        >
                          <div className="flex items-center gap-4">
                            <div className="text-3xl">{trip.image}</div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900">{trip.destination}</h3>
                              <p className="text-sm text-gray-600">{trip.dates}</p>
                              {trip.daysLeft && (
                                <p className="text-xs text-[#FF561D] font-medium mt-1">
                                  {trip.daysLeft} days to go
                                </p>
                              )}
                            </div>
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                              Upcoming
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="text-4xl mb-4">🗺️</div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No trips planned yet</h3>
                      <p className="text-gray-600 mb-4">Start planning your next adventure!</p>
                      <Button onClick={() => navigate('/features')}>
                        Plan Your First Trip
                      </Button>
                    </div>
                  )}
                </Card>
              </div>

              {/* Quick Actions */}
              <div className="space-y-6">
                <Card variant="glass" padding="large">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <button className="w-full flex items-center gap-3 px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-left">
                      <span>🤖</span>
                      <span className="text-sm font-medium text-gray-700">AI Trip Planner</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-left">
                      <span>📸</span>
                      <span className="text-sm font-medium text-gray-700">Upload Memories</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-left">
                      <span>👥</span>
                      <span className="text-sm font-medium text-gray-700">Invite Friends</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-left">
                      <span>🌟</span>
                      <span className="text-sm font-medium text-gray-700">Discover Places</span>
                    </button>
                  </div>
                </Card>

                <Card variant="glass" padding="large">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm text-gray-900">Trip to Tokyo planned</p>
                        <p className="text-xs text-gray-500">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm text-gray-900">Photos uploaded from Paris</p>
                        <p className="text-xs text-gray-500">1 day ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm text-gray-900">Joined group trip to Iceland</p>
                        <p className="text-xs text-gray-500">3 days ago</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default DashboardPage