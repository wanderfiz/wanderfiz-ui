import React from 'react'
import Card from '../ui/Card'
import { useCounterAnimation, useStaggeredScrollAnimation } from '../../hooks/useScrollAnimation'
import { STATS } from '../../utils/constants'

interface StatItemProps {
  value: string
  label: string
  description: string
  icon: string
}

const StatItem: React.FC<StatItemProps> = ({ value, label, description, icon }) => {
  const isNumeric = /^\d+/.test(value)
  const numericValue = isNumeric ? parseInt(value.replace(/[^\d]/g, '')) : 0
  const suffix = isNumeric ? value.replace(/^\d+/, '') : ''
  
  const { ref, currentValue } = useCounterAnimation(numericValue, {
    duration: 2000,
    startOnVisible: true
  })

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>}>
      <Card 
        variant="glass" 
        hover
        className="text-center group transition-all duration-700"
      >
      <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
        {isNumeric ? `${currentValue.toLocaleString()}${suffix}` : value}
      </div>
      <div className="text-lg font-semibold text-gray-700 mb-1">
        {label}
      </div>
      <div className="text-sm text-gray-600">
        {description}
      </div>
      </Card>
    </div>
  )
}

const StatsSection: React.FC = () => {
  const statsData = [
    {
      value: STATS.users,
      label: 'Happy Travelers',
      description: 'Users trust WanderFiz',
      icon: '👥'
    },
    {
      value: STATS.trips,
      label: 'Trips Planned',
      description: 'Successful journeys created',
      icon: '🗺️'
    },
    {
      value: STATS.countries,
      label: 'Countries',
      description: 'Global coverage',
      icon: '🌍'
    },
    {
      value: STATS.satisfaction,
      label: 'Satisfaction',
      description: 'Customer happiness rate',
      icon: '⭐'
    }
  ]

  const { containerRef, isVisible, visibleItems } = useStaggeredScrollAnimation(
    statsData.length,
    { threshold: 0.3, staggerDelay: 200 }
  )

  return (
    <section ref={containerRef} className="py-20 bg-section-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            The Numbers Speak for
            <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              {' '}Themselves
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join a growing community of travelers who have discovered the power of intelligent trip planning.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {statsData.map((stat, index) => (
            <div
              key={index}
              className={`transition-all duration-700 ${
                visibleItems.has(index) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <StatItem
                value={stat.value}
                label={stat.label}
                description={stat.description}
                icon={stat.icon}
              />
            </div>
          ))}
        </div>

        {/* Additional Stats */}
        <div className={`transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Card variant="glass" className="max-w-4xl mx-auto" padding="large">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Impact on Travel Experience
              </h3>
              <p className="text-gray-600">
                See how WanderFiz improves every aspect of your journey
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">90%</div>
                <div className="text-sm font-medium text-gray-900 mb-1">Time Saved</div>
                <div className="text-xs text-gray-600">On trip planning</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary-600 mb-2">4.9</div>
                <div className="text-sm font-medium text-gray-900 mb-1">Average Rating</div>
                <div className="text-xs text-gray-600">App store reviews</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-600 mb-2">24/7</div>
                <div className="text-sm font-medium text-gray-900 mb-1">Support</div>
                <div className="text-xs text-gray-600">Always available</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Growth Metrics */}
        <div className={`mt-16 transition-all duration-1000 delay-1200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-glass-light backdrop-blur-md border border-white/20 rounded-lg p-6 text-center">
              <div className="text-green-600 text-2xl font-bold mb-1">↗ 150%</div>
              <div className="text-sm font-medium text-gray-900 mb-1">Year over Year Growth</div>
              <div className="text-xs text-gray-600">User base expansion</div>
            </div>
            
            <div className="bg-glass-light backdrop-blur-md border border-white/20 rounded-lg p-6 text-center">
              <div className="text-blue-600 text-2xl font-bold mb-1">&lt; 2 min</div>
              <div className="text-sm font-medium text-gray-900 mb-1">Average Setup Time</div>
              <div className="text-xs text-gray-600">From signup to first trip</div>
            </div>
            
            <div className="bg-glass-light backdrop-blur-md border border-white/20 rounded-lg p-6 text-center">
              <div className="text-purple-600 text-2xl font-bold mb-1">99.9%</div>
              <div className="text-sm font-medium text-gray-900 mb-1">Uptime</div>
              <div className="text-xs text-gray-600">Reliable service</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default StatsSection