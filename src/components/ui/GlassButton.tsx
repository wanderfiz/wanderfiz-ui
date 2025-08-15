import React from 'react';

interface GlassButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const GlassButton: React.FC<GlassButtonProps> = ({ 
  children, 
  onClick,
  variant = 'primary',
  size = 'medium',
  className = '',
  disabled = false,
  type = 'button'
}) => {
  const sizeClasses = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg'
  };

  const variantClasses = {
    primary: `
      bg-gradient-to-r from-[#FF561D] to-[#0ea5e9]
      text-white
      hover:shadow-lg
      hover:scale-105
      active:scale-100
    `,
    secondary: `
      bg-white/30
      backdrop-blur-md
      text-gray-800
      border border-white/30
      hover:bg-white/40
      hover:shadow-md
      hover:scale-105
      active:scale-100
    `,
    outline: `
      bg-transparent
      backdrop-blur-sm
      text-gray-700
      border border-gray-300/50
      hover:bg-white/20
      hover:border-gray-400/50
      hover:scale-105
      active:scale-100
    `,
    ghost: `
      bg-transparent
      text-gray-700
      hover:bg-white/20
      hover:backdrop-blur-sm
      active:scale-95
    `
  };

  const baseClasses = `
    inline-flex
    items-center
    justify-center
    font-semibold
    rounded-lg
    transition-all
    duration-300
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
  `;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
    </button>
  );
};

export default GlassButton;