import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { cognitoService, type AuthError } from '../services/cognito'

interface FormErrors {
  confirmationCode?: string
  password?: string
  confirmPassword?: string
  general?: string
}

const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const email = location.state?.email || ''
  
  const [formData, setFormData] = useState({
    confirmationCode: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isLoading, setIsLoading] = useState(false)
  const [isResendingCode, setIsResendingCode] = useState(false)
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.3 })

  // Redirect to forgot password if no email provided
  useEffect(() => {
    if (!email) {
      navigate('/forgot-password', { replace: true })
    }
  }, [email, navigate])

  const validateForm = () => {
    const newErrors: FormErrors = {}

    if (!formData.confirmationCode) {
      newErrors.confirmationCode = 'Verification code is required'
    } else if (!/^\d{6}$/.test(formData.confirmationCode)) {
      newErrors.confirmationCode = 'Verification code must be 6 digits'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    return newErrors
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    
    // For confirmation code, only allow digits and limit to 6 characters
    if (name === 'confirmationCode') {
      const digitsOnly = value.replace(/\D/g, '').slice(0, 6)
      setFormData({ ...formData, [name]: digitsOnly })
    } else {
      setFormData({ ...formData, [name]: value })
    }

    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors({ ...errors, [name]: undefined })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors = validateForm()
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsLoading(true)
    setErrors({})

    try {
      await cognitoService.confirmForgotPassword(
        email,
        formData.confirmationCode,
        formData.password
      )
      
      // Success - redirect to login with success message
      navigate('/login', { 
        state: { 
          message: 'Password reset successful! Please sign in with your new password.',
          email 
        },
        replace: true 
      })
    } catch (error) {
      const authError = error as AuthError
      setErrors({ 
        general: authError.message || 'Failed to reset password. Please try again.' 
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendCode = async () => {
    setIsResendingCode(true)
    setErrors({})

    try {
      await cognitoService.forgotPassword(email)
      setErrors({ 
        general: 'New verification code sent to your email.' 
      })
    } catch (error) {
      const authError = error as AuthError
      setErrors({ 
        general: authError.message || 'Failed to resend code. Please try again.' 
      })
    } finally {
      setIsResendingCode(false)
    }
  }

  const handleBackToForgotPassword = () => {
    navigate('/forgot-password')
  }

  if (!email) {
    return null // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen bg-hero-gradient relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-72 h-72 bg-primary-200/20 rounded-full mix-blend-multiply filter blur-xl animate-blob" />
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-secondary-200/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent-200/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000" />
      </div>

      <div className="relative flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div ref={ref as React.RefObject<HTMLDivElement>} className={`max-w-md w-full space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Reset password
            </h2>
            <p className="mt-2 text-gray-600">
              Enter the code sent to your email and create a new password
            </p>
          </div>

          <Card variant="glass" className="mt-8" padding="large">
            {errors.general && (
              <div className={`mb-6 p-4 border rounded-lg ${
                errors.general.includes('sent') 
                  ? 'bg-green-50 border-green-200 text-green-800' 
                  : 'bg-red-50 border-red-200 text-red-800'
              }`}>
                <div className="text-sm">{errors.general}</div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="confirmationCode" className="block text-sm font-medium text-gray-700 mb-2">
                  Verification code
                </label>
                <input
                  id="confirmationCode"
                  name="confirmationCode"
                  type="text"
                  value={formData.confirmationCode}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full px-4 py-3 bg-glass-light backdrop-blur-md border rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-center text-2xl tracking-widest font-mono ${
                    errors.confirmationCode ? 'border-red-300' : 'border-white/20'
                  }`}
                  placeholder="000000"
                  disabled={isLoading}
                  maxLength={6}
                  autoComplete="one-time-code"
                />
                {errors.confirmationCode && (
                  <p className="mt-1 text-sm text-red-600">{errors.confirmationCode}</p>
                )}
                <p className="mt-1 text-xs text-gray-500">
                  Enter the 6-digit code sent to {email}
                </p>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  New password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full px-4 py-3 bg-glass-light backdrop-blur-md border rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 ${
                    errors.password ? 'border-red-300' : 'border-white/20'
                  }`}
                  placeholder="Enter new password"
                  disabled={isLoading}
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm new password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full px-4 py-3 bg-glass-light backdrop-blur-md border rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 ${
                    errors.confirmPassword ? 'border-red-300' : 'border-white/20'
                  }`}
                  placeholder="Confirm new password"
                  disabled={isLoading}
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                )}
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={handleResendCode}
                  disabled={isLoading || isResendingCode}
                  className="text-sm text-primary-600 hover:text-primary-500 transition-colors duration-200 disabled:opacity-50"
                >
                  {isResendingCode ? (
                    <span className="flex items-center justify-center">
                      <LoadingSpinner size="small" />
                      <span className="ml-1">Resending...</span>
                    </span>
                  ) : (
                    "Didn't receive the code? Resend"
                  )}
                </button>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                size="large"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <LoadingSpinner size="small" />
                    <span className="ml-2">Resetting password...</span>
                  </div>
                ) : (
                  'Reset password'
                )}
              </Button>
            </form>
          </Card>

          <div className="text-center">
            <button
              onClick={handleBackToForgotPassword}
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
              disabled={isLoading}
            >
              ← Back to forgot password
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResetPasswordPage