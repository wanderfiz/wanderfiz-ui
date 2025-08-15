import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  blur?: 'light' | 'medium' | 'heavy';
  border?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = '',
  hover = true,
  blur = 'medium',
  border = true
}) => {
  const blurClasses = {
    light: 'backdrop-blur-sm',
    medium: 'backdrop-blur-md',
    heavy: 'backdrop-blur-lg'
  };

  const baseClasses = `
    relative
    bg-white/25
    ${blurClasses[blur]}
    backdrop-saturate-[180%]
    rounded-xl
    ${border ? 'border border-white/20' : ''}
    shadow-[0_8px_32px_0_rgba(31,38,135,0.15)]
    ${hover ? 'transition-all duration-300 hover:bg-white/30 hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.25)] hover:scale-[1.02]' : ''}
  `;

  return (
    <div className={`${baseClasses} ${className}`}>
      {children}
    </div>
  );
};

export default GlassCard;