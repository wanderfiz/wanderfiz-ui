import React from 'react'
import { Outlet } from 'react-router-dom'
import { logger } from '../utils/logger'
import Header from './layout/Header'
import Footer from './layout/Footer'

const Layout: React.FC = () => {
  logger.debug('Layout component rendered')

  return (
    <div className="min-h-screen flex flex-col bg-hero">
      <Header />
      
      {/* Main content with padding for fixed header */}
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
      
      <Footer />
    </div>
  )
}

export default Layout
