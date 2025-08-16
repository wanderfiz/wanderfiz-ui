import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Logo from '../ui/Logo'
import GlassButton from '../ui/GlassButton'
import LoadingSpinner from '../ui/LoadingSpinner'
import { useAuth } from '../../hooks/useAuth'

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, isAuthenticated, signOut, isLoading } = useAuth()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleSignOut = async () => {
    try {
      setIsLoggingOut(true)
      await signOut()
      navigate('/', { replace: true })
    } catch {
      // Ignore sign out errors
    } finally {
      setIsLoggingOut(false)
      setIsMenuOpen(false)
    }
  }

  const isActive = (path: string) => location.pathname === path

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-white/20 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo size="medium" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link
                to="/features"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive('/features') 
                    ? 'text-[#FF561D]' 
                    : 'text-gray-700 hover:text-[#FF561D]'
                }`}
              >
                Features
              </Link>
              <Link
                to="/how-it-works"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive('/how-it-works') 
                    ? 'text-[#FF561D]' 
                    : 'text-gray-700 hover:text-[#FF561D]'
                }`}
              >
                How It Works
              </Link>
              <Link
                to="/pricing"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive('/pricing') 
                    ? 'text-[#FF561D]' 
                    : 'text-gray-700 hover:text-[#FF561D]'
                }`}
              >
                Pricing
              </Link>
            </div>
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoading ? (
              <LoadingSpinner size="small" />
            ) : isAuthenticated && user ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-[#FF561D] px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Dashboard
                </Link>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">
                    {user.name}
                  </span>
                  <button
                    onClick={handleSignOut}
                    disabled={isLoggingOut}
                    className="text-gray-700 hover:text-[#FF561D] px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 disabled:opacity-50"
                  >
                    {isLoggingOut ? (
                      <span className="flex items-center">
                        <LoadingSpinner size="small" />
                        <span className="ml-1">Signing out...</span>
                      </span>
                    ) : (
                      'Sign Out'
                    )}
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-[#FF561D] px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Login
                </Link>
                <Link to="/signup">
                  <GlassButton variant="primary" size="small">
                    Sign Up
                  </GlassButton>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="bg-white/30 backdrop-blur-md border border-white/20 text-gray-700 hover:text-[#FF561D] hover:bg-white/40 p-2 rounded-md transition-all duration-200"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-lg border border-white/20 rounded-lg mt-2 shadow-lg">
              <Link
                to="/features"
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                  isActive('/features')
                    ? 'text-[#FF561D] bg-white/30'
                    : 'text-gray-700 hover:text-[#FF561D] hover:bg-white/20'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                to="/how-it-works"
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                  isActive('/how-it-works')
                    ? 'text-[#FF561D] bg-white/30'
                    : 'text-gray-700 hover:text-[#FF561D] hover:bg-white/20'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                How It Works
              </Link>
              <Link
                to="/pricing"
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                  isActive('/pricing')
                    ? 'text-[#FF561D] bg-white/30'
                    : 'text-gray-700 hover:text-[#FF561D] hover:bg-white/20'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
              <div className="border-t border-white/20 pt-4">
                {isAuthenticated && user ? (
                  <>
                    <Link
                      to="/dashboard"
                      className="text-gray-700 hover:text-[#FF561D] hover:bg-white/20 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <div className="px-3 py-2">
                      <div className="text-sm text-gray-600 mb-2">
                        {user.name}
                      </div>
                      <button
                        onClick={handleSignOut}
                        disabled={isLoggingOut}
                        className="w-full text-left text-gray-700 hover:text-[#FF561D] hover:bg-white/20 px-0 py-2 rounded-md text-base font-medium transition-colors duration-200 disabled:opacity-50"
                      >
                        {isLoggingOut ? (
                          <span className="flex items-center">
                            <LoadingSpinner size="small" />
                            <span className="ml-2">Signing out...</span>
                          </span>
                        ) : (
                          'Sign Out'
                        )}
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="text-gray-700 hover:text-[#FF561D] hover:bg-white/20 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <div className="px-3 py-2">
                      <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                        <GlassButton variant="primary" size="small" className="w-full">
                          Sign Up
                        </GlassButton>
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header