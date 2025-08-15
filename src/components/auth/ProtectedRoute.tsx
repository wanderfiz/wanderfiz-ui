import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import LoadingSpinner from '../ui/LoadingSpinner'

interface ProtectedRouteProps {
  children: React.ReactNode
  redirectTo?: string
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  redirectTo = '/login' 
}) => {
  const { isAuthenticated, isLoading, isInitialized } = useAuth()
  const location = useLocation()

  // Show loading spinner while checking authentication
  if (!isInitialized || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-hero-gradient">
        <div className="text-center">
          <LoadingSpinner size="large" />
          <p className="mt-4 text-gray-600">Checking authentication...</p>
        </div>
      </div>
    )
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return (
      <Navigate 
        to={redirectTo} 
        state={{ from: location }} 
        replace 
      />
    )
  }

  // Render protected content
  return <>{children}</>
}

export default ProtectedRoute