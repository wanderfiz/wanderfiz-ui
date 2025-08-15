import React from 'react'
import Card from '../ui/Card'

interface Feature {
  id: string
  name: string
  description: string
  icon: string
  category: {
    id: string
    name: string
    description: string
    icon: string
  }
  benefits: string[]
  availability: string[]
}

interface FeatureCardProps {
  feature: Feature
  variant?: 'default' | 'compact' | 'detailed'
  className?: string
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  feature, 
  variant = 'default',
  className 
}) => {
  const getBenefitsToShow = () => {
    switch (variant) {
      case 'compact':
        return feature.benefits.slice(0, 2)
      case 'detailed':
        return feature.benefits
      default:
        return feature.benefits.slice(0, 3)
    }
  }

  const benefitsToShow = getBenefitsToShow()

  return (
    <Card className={className}>
      <div className="p-6">
        {/* Icon and title */}
        <div className="flex items-start space-x-4 mb-4">
          <div className="text-3xl flex-shrink-0">
            {feature.icon}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {feature.name}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {feature.description}
            </p>
          </div>
        </div>

        {/* Benefits */}
        {benefitsToShow.length > 0 && (
          <div className="mb-4">
            {variant === 'detailed' && (
              <h4 className="text-sm font-medium text-gray-900 mb-2">
                Key Benefits:
              </h4>
            )}
            <ul className="space-y-1">
              {benefitsToShow.map((benefit, index) => (
                <li key={index} className="flex items-center text-sm text-gray-600">
                  <span className="text-green-500 mr-2">✓</span>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Availability tags */}
        {feature.availability.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {feature.availability.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Card>
  )
}

export default FeatureCard