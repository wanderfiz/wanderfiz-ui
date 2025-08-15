import React from 'react'
import { Link, useLocation } from 'react-router-dom'

interface NavigationProps {
  className?: string
  onLinkClick?: () => void
  variant?: 'desktop' | 'mobile'
}

const Navigation: React.FC<NavigationProps> = ({ 
  className = '', 
  onLinkClick, 
  variant = 'desktop' 
}) => {
  const location = useLocation()

  const navigationItems = [
    { name: 'Features', path: '/features' },
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'Pricing', path: '/pricing' },
  ]

  const isActiveLink = (path: string) => {
    return location.pathname === path
  }

  const getLinkClasses = (path: string) => {
    const baseClasses = variant === 'mobile' 
      ? 'block px-3 py-2 rounded-md text-base font-medium transition-all duration-200'
      : 'px-3 py-2 rounded-md text-sm font-medium transition-all duration-200'
    
    const activeClasses = isActiveLink(path)
      ? 'text-primary-600 bg-white/20'
      : 'text-gray-700 hover:text-primary-600 hover:bg-white/10'
    
    return `${baseClasses} ${activeClasses}`
  }

  if (variant === 'mobile') {
    return (
      <div className={`space-y-1 ${className}`}>
        {navigationItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={getLinkClasses(item.path)}
            onClick={onLinkClick}
          >
            {item.name}
          </Link>
        ))}
      </div>
    )
  }

  return (
    <div className={`flex items-baseline space-x-8 ${className}`}>
      {navigationItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={getLinkClasses(item.path)}
          onClick={onLinkClick}
        >
          {item.name}
        </Link>
      ))}
    </div>
  )
}

export default Navigation