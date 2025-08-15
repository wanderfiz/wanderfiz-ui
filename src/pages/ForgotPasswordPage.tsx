import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GlassCard from '../components/ui/GlassCard';
import GlassButton from '../components/ui/GlassButton';
import Logo from '../components/ui/Logo';

const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Simulate API call - in real app, this would call your auth service
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsEmailSent(true);
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendEmail = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Show success message or update UI
    } catch (error) {
      setError('Failed to resend email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isEmailSent) {
    return (
      <div className="min-h-screen bg-hero relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-[#FF561D]/20 to-[#0ea5e9]/20 rounded-full blur-xl animate-float"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-[#0ea5e9]/20 to-[#a855f7]/20 rounded-full blur-lg animate-float-delay-1"></div>
          <div className="absolute bottom-32 left-20 w-40 h-40 bg-gradient-to-br from-[#a855f7]/20 to-[#FF561D]/20 rounded-full blur-2xl animate-float-delay-2"></div>
        </div>

        <div className="relative flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div className="text-center">
              <Link to="/">
                <Logo size="large" linkToHome={false} />
              </Link>
              <h2 className="mt-6 text-3xl md:text-4xl font-bold text-gray-900">
                Check your email
              </h2>
              <p className="mt-2 text-lg text-gray-600">
                We've sent password reset instructions to your email
              </p>
            </div>

            <GlassCard className="p-8 text-center">
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-[#FF561D] to-[#0ea5e9] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-gray-700 mb-4">
                  We've sent a password reset link to:
                </p>
                <p className="font-semibold text-gray-900 mb-6">
                  {email}
                </p>
                <p className="text-sm text-gray-600 mb-6">
                  Click the link in the email to reset your password. If you don't see the email, check your spam folder.
                </p>
              </div>

              <div className="space-y-4">
                <GlassButton
                  variant="primary"
                  size="large"
                  className="w-full"
                  onClick={() => navigate('/login')}
                >
                  Back to Login
                </GlassButton>
                
                <button
                  onClick={handleResendEmail}
                  disabled={isLoading}
                  className="w-full text-sm text-[#FF561D] hover:text-[#e04d1a] transition-colors duration-200 disabled:opacity-50"
                >
                  {isLoading ? 'Sending...' : "Didn't receive the email? Resend"}
                </button>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-hero relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-[#FF561D]/20 to-[#0ea5e9]/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-[#0ea5e9]/20 to-[#a855f7]/20 rounded-full blur-lg animate-float-delay-1"></div>
        <div className="absolute bottom-32 left-20 w-40 h-40 bg-gradient-to-br from-[#a855f7]/20 to-[#FF561D]/20 rounded-full blur-2xl animate-float-delay-2"></div>
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-gradient-to-br from-[#84cc16]/20 to-[#fbbf24]/20 rounded-full blur-lg animate-float-slow"></div>
      </div>

      <div className="relative flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Header */}
          <div className="text-center">
            <Link to="/">
              <Logo size="large" linkToHome={false} />
            </Link>
            <h2 className="mt-6 text-3xl md:text-4xl font-bold text-gray-900">
              Forgot password?
            </h2>
            <p className="mt-2 text-lg text-gray-600">
              No worries, we'll send you reset instructions
            </p>
          </div>

          {/* Reset Form */}
          <GlassCard className="p-8">
            {error && (
              <div className="mb-6 p-4 bg-red-50/80 backdrop-blur-sm border border-red-200/50 rounded-lg">
                <div className="text-sm text-red-800">{error}</div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  className={`w-full px-4 py-3 bg-white/40 backdrop-blur-md border rounded-lg text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#FF561D] focus:border-transparent transition-all duration-200 ${
                    error ? 'border-red-300' : 'border-white/30'
                  }`}
                  placeholder="Enter your email address"
                  disabled={isLoading}
                />
                <p className="mt-2 text-sm text-gray-500">
                  We'll send a password reset link to this email
                </p>
              </div>

              <GlassButton 
                type="submit" 
                variant="primary" 
                size="large" 
                className="w-full"
                disabled={isLoading || !email}
              >
                {isLoading ? 'Sending reset link...' : 'Send reset link'}
              </GlassButton>
            </form>

            {/* Back to Login */}
            <div className="mt-8 text-center">
              <Link
                to="/login"
                className="inline-flex items-center text-sm text-[#FF561D] hover:text-[#e04d1a] transition-colors duration-200"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to login
              </Link>
            </div>
          </GlassCard>

          {/* Additional Help */}
          <div className="text-center">
            <p className="text-sm text-gray-500">
              Still having trouble?{' '}
              <Link
                to="/help-center"
                className="text-[#FF561D] hover:text-[#e04d1a] transition-colors duration-200"
              >
                Contact support
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;