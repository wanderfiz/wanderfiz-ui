import React from 'react'
import { logger } from '../utils/logger'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  logger.debug('Layout component rendered')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - structure only */}
      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                Wanderfiz
              </h1>
            </div>
            {/* Navigation will be added here */}
          </div>
        </nav>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {children}
        </div>
      </main>

      {/* Footer - structure only */}
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            © 2024 Wanderfiz. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Layout
