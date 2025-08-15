import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { useAuth } from '../hooks/useAuth'
import type { AuthError } from '../services/cognito'

interface FormErrors {
  code?: string
  general?: string
}

const VerifyEmailPage: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { confirmSignUp, resendConfirmationCode } = useAuth()
  const [verificationCode, setVerificationCode] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})
  const [isLoading, setIsLoading] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [resendCooldown, setResendCooldown] = useState(0)
  const [verificationSuccess, setVerificationSuccess] = useState(false)
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.3 })

  // Get email from location state
  const email = location.state?.email
  
  // Redirect if no email provided
  useEffect(() => {
    if (!email) {
      navigate('/signup', { replace: true })
    }
  }, [email, navigate])

  // Countdown timer for resend cooldown
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => {
        setResendCooldown(resendCooldown - 1)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [resendCooldown])

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {}

    if (!verificationCode.trim()) {
      newErrors.code = 'Verification code is required'
    } else if (!/^\d{6}$/.test(verificationCode.trim())) {
      newErrors.code = 'Verification code must be 6 digits'
    }

    return newErrors
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6) // Only numbers, max 6 digits
    setVerificationCode(value)

    // Clear error when user starts typing
    if (errors.code) {
      setErrors({ ...errors, code: undefined })
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
      await confirmSignUp(email, verificationCode.trim())
      
      setVerificationSuccess(true)
      
      // Show success message then redirect to login
      setTimeout(() => {
        navigate('/login', { 
          state: { 
            message: 'Email verified successfully! Please sign in to continue.',
            email: email 
          },
          replace: true 
        })
      }, 2000)
    } catch (error) {
      const authError = error as AuthError
      setErrors({ 
        general: authError.message || 'Verification failed. Please try again.' 
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendCode = async () => {
    if (resendCooldown > 0) return

    setIsResending(true)
    setErrors({})

    try {
      await resendConfirmationCode(email)
      setResendCooldown(60) // 60 second cooldown
      setErrors({ general: undefined })
    } catch (error) {
      const authError = error as AuthError
      setErrors({ 
        general: authError.message || 'Failed to resend verification code. Please try again.' 
      })
    } finally {
      setIsResending(false)
    }
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
              Verify your email
            </h2>
            <p className="mt-2 text-gray-600">
              We've sent a 6-digit verification code to{' '}
              <span className="font-medium text-primary-600">{email}</span>
            </p>
          </div>

          <Card variant="glass" className="mt-8" padding="large">
            {verificationSuccess && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="text-sm text-green-800">
                  <div className="font-medium mb-1">Email verified successfully! ✅</div>
                  <div>Redirecting you to sign in...</div>
                </div>
              </div>
            )}

            {errors.general && !verificationSuccess && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="text-sm text-red-800">{errors.general}</div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700 mb-2">
                  Verification Code
                </label>
                <input
                  id="verificationCode"
                  name="verificationCode"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={verificationCode}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full px-4 py-3 bg-glass-light backdrop-blur-md border rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-center text-2xl tracking-widest ${
                    errors.code ? 'border-red-300' : 'border-white/20'
                  }`}
                  placeholder="000000"
                  maxLength={6}
                  disabled={isLoading || verificationSuccess}
                />
                {errors.code && (
                  <p className="mt-1 text-sm text-red-600">{errors.code}</p>
                )}
                <p className="mt-2 text-xs text-gray-500">
                  Enter the 6-digit code sent to your email
                </p>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                size="large"
                disabled={isLoading || verificationSuccess}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <LoadingSpinner size="small" />
                    <span className="ml-2">Verifying...</span>
                  </div>
                ) : verificationSuccess ? (
                  'Verified! Redirecting...'
                ) : (
                  'Verify Email'
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Didn't receive the code?{' '}
                <button
                  onClick={handleResendCode}
                  disabled={resendCooldown > 0 || isResending || verificationSuccess}
                  className="font-medium text-primary-600 hover:text-primary-500 transition-colors duration-200 disabled:text-gray-400 disabled:cursor-not-allowed"
                >
                  {isResending ? (
                    <span className="inline-flex items-center">
                      <LoadingSpinner size="small" />
                      <span className="ml-1">Resending...</span>
                    </span>
                  ) : resendCooldown > 0 ? (
                    `Resend in ${resendCooldown}s`
                  ) : (
                    'Resend code'
                  )}
                </button>
              </p>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Need to use a different email?{' '}
                <button
                  onClick={() => navigate('/signup')}
                  className="font-medium text-primary-600 hover:text-primary-500 transition-colors duration-200"
                  disabled={isLoading || verificationSuccess}
                >
                  Sign up again
                </button>
              </p>
            </div>
          </Card>

          {/* Additional Help */}
          <div className="text-center">
            <p className="text-sm text-gray-500">
              Need help?{' '}
              <button
                onClick={() => navigate('/help-center')}
                className="text-primary-600 hover:text-primary-500 transition-colors duration-200"
              >
                Visit our Help Center
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VerifyEmailPage