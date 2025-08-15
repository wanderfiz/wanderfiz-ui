import React from 'react'

export interface CardProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'glass' | 'feature' | 'pricing'
  hover?: boolean
  padding?: 'none' | 'small' | 'medium' | 'large'
  onClick?: () => void
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'default',
  hover = false,
  padding = 'medium',
  onClick
}) => {
  const baseClasses = 'rounded-lg transition-all duration-200'
  
  const variantClasses = {
    default: 'bg-white border border-gray-200 shadow-sm',
    glass: 'bg-glass-light backdrop-blur-lg border border-white/20 shadow-glass',
    feature: 'bg-glass-gradient backdrop-blur-md border border-white/20 shadow-glass-sm',
    pricing: 'bg-glass-light backdrop-blur-lg border border-white/20 shadow-glass-lg'
  }
  
  const hoverClasses = hover 
    ? 'hover:scale-105 hover:shadow-glass-lg cursor-pointer' 
    : ''
  
  const paddingClasses = {
    none: '',
    small: 'p-4',
    medium: 'p-6',
    large: 'p-8'
  }
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${hoverClasses} ${paddingClasses[padding]} ${className}`
  
  return (
    <div className={classes} onClick={onClick}>
      {children}
    </div>
  )
}

export default Card