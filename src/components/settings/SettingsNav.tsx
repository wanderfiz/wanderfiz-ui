import React from 'react'
import { SettingsCategory } from '../../types/settings'
import { SETTINGS_CATEGORIES } from '../../config/settingsCategories'

interface SettingsNavProps {
  activeCategory: SettingsCategory
  onCategoryChange: (category: SettingsCategory) => void
}

const SettingsNav: React.FC<SettingsNavProps> = ({
  activeCategory,
  onCategoryChange
}) => {
  return (
    <nav className="w-64 bg-white/50 backdrop-blur-sm border-r border-white/20 h-full overflow-y-auto">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Settings</h2>
        <div className="space-y-1">
          {SETTINGS_CATEGORIES.map((category) => (
            <button
              key={category.key}
              onClick={() => onCategoryChange(category.key)}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium 
                transition-all duration-200 text-left
                ${activeCategory === category.key
                  ? 'bg-[#FF561D]/10 text-[#FF561D] border border-[#FF561D]/20 shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100/50 hover:text-gray-900'
                }
              `}
              title={category.description}
            >
              <span className="text-lg">{category.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">{category.name}</div>
                <div className="text-xs text-gray-500 truncate mt-0.5">
                  {category.description}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default SettingsNav