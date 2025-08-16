import React from 'react'

export interface SettingItemProps {
  label: string
  description?: string
  children: React.ReactNode
  className?: string
}

const SettingItem: React.FC<SettingItemProps> = ({
  label,
  description,
  children,
  className = ''
}) => {
  return (
    <div className={`bg-white/50 rounded-lg p-4 ${className}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <label className="block text-sm font-medium text-gray-900 mb-1">
            {label}
          </label>
          {description && (
            <p className="text-xs text-gray-600 mb-3">
              {description}
            </p>
          )}
        </div>
        <div className="flex-shrink-0">
          {children}
        </div>
      </div>
    </div>
  )
}

// Toggle Switch Component
interface ToggleSwitchProps {
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
  size?: 'small' | 'medium'
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  checked,
  onChange,
  disabled = false,
  size = 'medium'
}) => {
  const sizeClasses = {
    small: 'w-8 h-4',
    medium: 'w-10 h-5'
  }

  const thumbClasses = {
    small: 'w-3 h-3',
    medium: 'w-4 h-4'
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`
        relative inline-flex ${sizeClasses[size]} items-center rounded-full 
        transition-colors duration-200 focus:outline-none focus:ring-2 
        focus:ring-[#FF561D] focus:ring-offset-2
        ${checked ? 'bg-[#FF561D]' : 'bg-gray-300'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      <span
        className={`
          ${thumbClasses[size]} bg-white rounded-full shadow transform transition-transform duration-200
          ${checked ? 'translate-x-5' : 'translate-x-0.5'}
          ${size === 'small' && checked ? 'translate-x-4' : ''}
        `}
      />
    </button>
  )
}

// Select Input Component
interface SelectInputProps {
  value: string
  onChange: (value: string) => void
  options: { value: string; label: string }[]
  placeholder?: string
  disabled?: boolean
}

export const SelectInput: React.FC<SelectInputProps> = ({
  value,
  onChange,
  options,
  placeholder = 'Select an option',
  disabled = false
}) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className="
        w-full px-3 py-2 text-sm border border-gray-300 rounded-lg 
        bg-white focus:outline-none focus:ring-2 focus:ring-[#FF561D] 
        focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed
      "
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}

// Text Input Component
interface TextInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
  type?: 'text' | 'email' | 'tel' | 'url'
}

export const TextInput: React.FC<TextInputProps> = ({
  value,
  onChange,
  placeholder,
  disabled = false,
  type = 'text'
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      className="
        w-full px-3 py-2 text-sm border border-gray-300 rounded-lg 
        bg-white focus:outline-none focus:ring-2 focus:ring-[#FF561D] 
        focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed
      "
    />
  )
}

// Number Input Component
interface NumberInputProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  disabled?: boolean
}

export const NumberInput: React.FC<NumberInputProps> = ({
  value,
  onChange,
  min,
  max,
  step = 1,
  disabled = false
}) => {
  return (
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      min={min}
      max={max}
      step={step}
      disabled={disabled}
      className="
        w-full px-3 py-2 text-sm border border-gray-300 rounded-lg 
        bg-white focus:outline-none focus:ring-2 focus:ring-[#FF561D] 
        focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed
      "
    />
  )
}

// Textarea Component
interface TextareaProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
  rows?: number
}

export const Textarea: React.FC<TextareaProps> = ({
  value,
  onChange,
  placeholder,
  disabled = false,
  rows = 3
}) => {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      rows={rows}
      className="
        w-full px-3 py-2 text-sm border border-gray-300 rounded-lg 
        bg-white focus:outline-none focus:ring-2 focus:ring-[#FF561D] 
        focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed
        resize-vertical
      "
    />
  )
}

// Multi-Select Component
interface MultiSelectProps {
  value: string[]
  onChange: (value: string[]) => void
  options: { value: string; label: string }[]
  placeholder?: string
  disabled?: boolean
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  value,
  onChange,
  options,
  placeholder = 'Select options',
  disabled = false
}) => {
  const toggleOption = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter(v => v !== optionValue))
    } else {
      onChange([...value, optionValue])
    }
  }

  return (
    <div className="w-full">
      <div className="text-xs text-gray-500 mb-2">
        {value.length > 0 ? `${value.length} selected` : placeholder}
      </div>
      <div className="max-h-32 overflow-y-auto border border-gray-300 rounded-lg bg-white">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={value.includes(option.value)}
              onChange={() => toggleOption(option.value)}
              disabled={disabled}
              className="mr-2 h-4 w-4 text-[#FF561D] focus:ring-[#FF561D] border-gray-300 rounded"
            />
            <span className="text-sm text-gray-900">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  )
}

export default SettingItem