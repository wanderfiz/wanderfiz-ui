import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  linkToHome?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  linkToHome = true,
  size = 'medium' 
}) => {
  const sizeClasses = {
    small: 'h-8 w-8',
    medium: 'h-10 w-10',
    large: 'h-12 w-12'
  };

  const textSizeClasses = {
    small: 'text-xl',
    medium: 'text-2xl',
    large: 'text-3xl'
  };

  const logoContent = (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={`relative ${sizeClasses[size]} transition-transform hover:scale-110`}>
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Globe with compass design */}
          <circle
            cx="24"
            cy="24"
            r="20"
            stroke="url(#gradient1)"
            strokeWidth="2"
            fill="none"
          />
          
          {/* Compass needle */}
          <path
            d="M24 8 L28 24 L24 40 L20 24 Z"
            fill="url(#gradient2)"
          />
          
          {/* Horizontal compass line */}
          <path
            d="M8 24 L40 24"
            stroke="url(#gradient1)"
            strokeWidth="1.5"
            strokeDasharray="2 2"
          />
          
          {/* Travel path curve */}
          <path
            d="M12 20 Q24 14, 36 20 T36 28"
            stroke="#FF561D"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          
          {/* Location pin */}
          <circle cx="36" cy="28" r="3" fill="#FF561D" />
          
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF561D" />
              <stop offset="100%" stopColor="#0ea5e9" />
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0ea5e9" />
              <stop offset="50%" stopColor="#FF561D" />
              <stop offset="100%" stopColor="#0ea5e9" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      <span className={`font-bold bg-gradient-to-r from-[#FF561D] to-[#0ea5e9] bg-clip-text text-transparent ${textSizeClasses[size]}`}>
        WanderFiz
      </span>
    </div>
  );

  if (linkToHome) {
    return (
      <Link to="/" className="inline-flex hover:opacity-90 transition-opacity">
        {logoContent}
      </Link>
    );
  }

  return logoContent;
};

export default Logo;