import React from 'react';

interface GlassInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const GlassInput: React.FC<GlassInputProps> = ({ 
  label,
  error,
  icon,
  className = '',
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            {icon}
          </div>
        )}
        <input
          className={`
            w-full
            ${icon ? 'pl-10' : 'px-4'}
            pr-4
            py-3
            bg-white/30
            backdrop-blur-md
            border
            ${error ? 'border-red-300/50' : 'border-white/30'}
            rounded-lg
            text-gray-800
            placeholder-gray-500
            focus:outline-none
            focus:ring-2
            focus:ring-[#FF561D]/30
            focus:border-[#FF561D]/50
            focus:bg-white/40
            transition-all
            duration-300
            ${className}
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default GlassInput;