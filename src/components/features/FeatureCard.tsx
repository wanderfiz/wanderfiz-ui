import React from 'react'
import Card from '../ui/Card'
import { Feature } from '../../types/features'

interface FeatureCardProps {
  feature: Feature
  variant?: 'default' | 'detailed' | 'compact'
  className?: string
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  feature, 
  variant = 'default',
  className = '' 
}) => {
  const getCardVariant = () => {
    switch (variant) {
      case 'detailed':
        return 'glass'
      case 'compact':
        return 'feature'
      default:
        return 'glass'
    }
  }

  if (variant === 'compact') {
    return (
      <Card 
        variant={getCardVariant()} 
        hover 
        className={`text-center group ${className}`}
      >
        <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
          {feature.icon}
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {feature.name}
        </h3>
        <p className="text-gray-600 text-sm">
          {feature.description}
        </p>
      </Card>
    )
  }

  if (variant === 'detailed') {
    return (
      <Card 
        variant={getCardVariant()} 
        hover 
        className={`group ${className}`}
        padding="large"
      >
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-glass-gradient backdrop-blur-md border border-white/20 rounded-lg flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
              {feature.icon}
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {feature.name}
            </h3>
            <p className="text-gray-600 mb-4">
              {feature.description}
            </p>
            
            {feature.benefits && feature.benefits.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Key Benefits:</h4>
                <ul className="space-y-1">
                  {feature.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-600">
                      <span className="text-green-500 mr-2">✓</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1">
                <span className="text-xs text-gray-500">Available in:</span>
                <div className="flex space-x-1">
                  {feature.availability.map((plan) => (
                    <span 
                      key={plan} 
                      className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full capitalize"
                    >
                      {plan}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    )
  }

  // Default variant
  return (
    <Card 
      variant={getCardVariant()} 
      hover 
      className={`text-center group ${className}`}
    >
      <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
        {feature.icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3">
        {feature.name}
      </h3>
      <p className="text-gray-600 mb-4">
        {feature.description}
      </p>
      
      {feature.benefits && feature.benefits.length > 0 && (
        <div className="mb-4">
          <ul className="space-y-2 text-left">
            {feature.benefits.slice(0, 3).map((benefit, index) => (
              <li key={index} className="flex items-start text-sm text-gray-600">
                <span className="text-green-500 mr-2 mt-0.5">✓</span>
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="pt-4 border-t border-white/20">
        <div className="flex justify-center space-x-1">
          {feature.availability.map((plan) => (
            <span 
              key={plan} 
              className="px-2 py-1 bg-glass-light backdrop-blur-md border border-white/20 text-xs text-gray-700 rounded-full capitalize"
            >
              {plan}
            </span>
          ))}
        </div>
      </div>
    </Card>
  )
}

export default FeatureCard