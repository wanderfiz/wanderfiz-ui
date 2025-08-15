import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Footer: React.FC = () => {
  const [email, setEmail] = useState('')

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Placeholder for newsletter signup
    console.log('Newsletter signup:', email)
    setEmail('')
  }

  return (
    <footer className="bg-gray-900 mt-auto">
      {/* Newsletter Section */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-8 text-center border border-gray-700">
            <h3 className="text-2xl font-bold text-white mb-2">Get Travel Tips & Updates</h3>
            <p className="text-gray-300 mb-6">Join 50,000+ travelers receiving weekly inspiration</p>
            <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#FF561D] transition-colors"
              />
              <button 
                type="submit" 
                className="px-6 py-2 bg-gradient-to-r from-[#FF561D] to-[#FF8A4C] text-white font-semibold rounded-lg hover:from-[#FF8A4C] hover:to-[#FF561D] transition-all"
              >
                Subscribe
              </button>
            </form>
            <p className="text-xs text-gray-400 mt-3">We respect your privacy. Unsubscribe anytime.</p>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="bg-gray-900 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company & Brand */}
            <div className="lg:col-span-1">
              <Link to="/" className="inline-flex items-center gap-2">
                <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
                  <circle cx="24" cy="24" r="20" stroke="url(#footerGradient1)" strokeWidth="2"/>
                  <path d="M24 8 L28 24 L24 40 L20 24 Z" fill="url(#footerGradient2)"/>
                  <path d="M8 24 L24 20 L40 24 L24 28 Z" fill="url(#footerGradient3)"/>
                  <circle cx="24" cy="24" r="4" fill="#FF561D"/>
                  <defs>
                    <linearGradient id="footerGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FF561D"/>
                      <stop offset="100%" stopColor="#0ea5e9"/>
                    </linearGradient>
                    <linearGradient id="footerGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FF561D" stopOpacity="0.8"/>
                      <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.8"/>
                    </linearGradient>
                    <linearGradient id="footerGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.6"/>
                      <stop offset="100%" stopColor="#FF561D" stopOpacity="0.6"/>
                    </linearGradient>
                  </defs>
                </svg>
                <span className="text-xl font-bold text-white">WanderFiz</span>
              </Link>
              <p className="mt-4 text-sm text-gray-300">
                Transform Every Journey from Dream to Memory
              </p>
              <p className="mt-4 text-xs text-gray-400 leading-relaxed">
                Your complete travel companion platform powered by AI, designed for modern explorers.
              </p>
              
              {/* Social Media Icons */}
              <div className="flex space-x-4 mt-6">
                <a href="#" className="text-gray-500 hover:text-[#FF561D] transition-colors" aria-label="Instagram">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-[#FF561D] transition-colors" aria-label="Twitter">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-[#FF561D] transition-colors" aria-label="Facebook">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-[#FF561D] transition-colors" aria-label="LinkedIn">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-[#FF561D] transition-colors" aria-label="YouTube">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>

              {/* App Store Badges (Placeholder) */}
              <div className="mt-6 space-y-2">
                <div className="bg-gray-800 rounded-lg px-4 py-2 text-center text-xs text-gray-400 border border-gray-700">
                  Coming Soon on App Store
                </div>
                <div className="bg-gray-800 rounded-lg px-4 py-2 text-center text-xs text-gray-400 border border-gray-700">
                  Coming Soon on Google Play
                </div>
              </div>
            </div>

            {/* Product */}
            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Product</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/features" className="text-sm text-gray-400 hover:text-[#FF561D] transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link to="/pricing" className="text-sm text-gray-400 hover:text-[#FF561D] transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link to="/how-it-works" className="text-sm text-gray-400 hover:text-[#FF561D] transition-colors">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-sm text-gray-500 hover:text-[#FF561D] transition-colors">
                    Blog <span className="text-xs text-gray-600">(Soon)</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Support</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/help-center" className="text-sm text-gray-400 hover:text-[#FF561D] transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-sm text-gray-400 hover:text-[#FF561D] transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="/privacy-policy" className="text-sm text-gray-400 hover:text-[#FF561D] transition-colors">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link to="/terms-of-service" className="text-sm text-gray-400 hover:text-[#FF561D] transition-colors">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Company</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/about" className="text-sm text-gray-400 hover:text-[#FF561D] transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-400 hover:text-[#FF561D] transition-colors">
                    Partners
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-400 hover:text-[#FF561D] transition-colors">
                    Press
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-400 hover:text-[#FF561D] transition-colors">
                    Community
                  </a>
                </li>
              </ul>
            </div>
          </div>


          {/* Bottom Bar */}
          <div className="mt-8 pt-8 border-t border-gray-800">
            <div className="text-center">
              <div className="text-sm text-gray-400">
                © 2024 WanderFiz, Inc. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer