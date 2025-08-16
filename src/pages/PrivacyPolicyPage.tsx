import React from 'react'
import Card from '../components/ui/Card'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const PrivacyPolicyPage: React.FC = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.3 })

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef as React.RefObject<HTMLDivElement>} className={`text-center mb-12 transition-all duration-1000 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            WanderFiz
            <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              {' '}Privacy Policy
            </span>
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            Last updated: January 15, 2025
          </p>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Your privacy and the security of your travel data are fundamental to our mission. 
            This comprehensive policy explains how WanderFiz - your ultimate travel planner and assistant - 
            collects, uses, and protects your personal information.
          </p>
        </div>

        {/* Content */}
        <div className={`transition-all duration-1000 delay-300 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Card variant="glass" padding="large">
            <div className="prose prose-lg max-w-none">
              <div className="space-y-10">
                {/* Introduction */}
                <section>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="mr-3">🛡️</span>
                    Introduction
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    WanderFiz Inc. ("WanderFiz," "we," "our," or "us") is committed to protecting your privacy and 
                    building trust through transparency. This Privacy Policy explains how we collect, use, disclose, 
                    and safeguard your information when you use our AI-powered travel planning platform, mobile 
                    applications, and related services (collectively, the "Service").
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    As your ultimate travel planner and assistant, we understand that you entrust us with sensitive 
                    travel information, personal preferences, and location data. We take this responsibility seriously 
                    and are committed to maintaining the highest standards of data protection.
                  </p>
                  <div className="bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200 rounded-lg p-6">
                    <p className="text-gray-800 font-medium">
                      <strong>Important:</strong> By using our Service, you agree to the collection and use of 
                      information in accordance with this Privacy Policy. If you do not agree with our policies 
                      and practices, please do not use our Service.
                    </p>
                  </div>
                </section>

                {/* Information We Collect */}
                <section>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="mr-3">📋</span>
                    Information We Collect
                  </h2>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="mr-2">👤</span>
                    Personal Information You Provide
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    When you create an account and use WanderFiz, we collect information that you provide directly:
                  </p>
                  <div className="bg-white/50 rounded-lg p-6 mb-6">
                    <ul className="list-none space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-primary-500 mr-3 mt-1">•</span>
                        <span><strong>Account Information:</strong> Name, email address, password, profile photo</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary-500 mr-3 mt-1">•</span>
                        <span><strong>Travel Preferences:</strong> Favorite destinations, travel style, budget preferences, 
                        dietary restrictions, accessibility needs, activity interests</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary-500 mr-3 mt-1">•</span>
                        <span><strong>Trip Information:</strong> Destinations, travel dates, itineraries, bookings, 
                        travel companions, special occasions</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary-500 mr-3 mt-1">•</span>
                        <span><strong>Payment Information:</strong> Billing address, payment method details 
                        (securely processed by our PCI-compliant payment partners)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary-500 mr-3 mt-1">•</span>
                        <span><strong>Communication Data:</strong> Messages, reviews, feedback, customer service interactions</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary-500 mr-3 mt-1">•</span>
                        <span><strong>Travel Documents:</strong> Passport information, visa details, travel insurance 
                        (with explicit consent and encrypted storage)</span>
                      </li>
                    </ul>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="mr-2">🤖</span>
                    Automatically Collected Information
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    To provide personalized AI recommendations and improve our service, we automatically collect:
                  </p>
                  <div className="bg-white/50 rounded-lg p-6 mb-6">
                    <ul className="list-none space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-secondary-500 mr-3 mt-1">•</span>
                        <span><strong>Device Information:</strong> IP address, browser type, device ID, operating system, 
                        app version</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-secondary-500 mr-3 mt-1">•</span>
                        <span><strong>Usage Analytics:</strong> Pages visited, features used, time spent, search queries, 
                        interaction patterns</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-secondary-500 mr-3 mt-1">•</span>
                        <span><strong>Location Data:</strong> GPS coordinates, travel routes, visited locations 
                        (only with your explicit permission)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-secondary-500 mr-3 mt-1">•</span>
                        <span><strong>Travel Behavior:</strong> Booking patterns, preferred travel times, 
                        activity engagement, review interactions</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-secondary-500 mr-3 mt-1">•</span>
                        <span><strong>Technical Data:</strong> Cookies, session tokens, API usage, 
                        error logs, performance metrics</span>
                      </li>
                    </ul>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="mr-2">🔗</span>
                    Third-Party Information
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    We may receive information from trusted partners to enhance your travel experience:
                  </p>
                  <div className="bg-white/50 rounded-lg p-6 mt-4">
                    <ul className="list-none space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-green-500 mr-3 mt-1">•</span>
                        <span><strong>Social Media:</strong> Profile information when you connect social accounts</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-3 mt-1">•</span>
                        <span><strong>Travel Partners:</strong> Booking confirmations, loyalty program data, 
                        travel status updates</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-3 mt-1">•</span>
                        <span><strong>Public Sources:</strong> Destination information, weather data, 
                        local events, travel advisories</span>
                      </li>
                    </ul>
                  </div>
                </section>

                {/* How We Use Information */}
                <section>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="mr-3">⚙️</span>
                    How We Use Your Information
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    We use your information to provide the ultimate travel planning experience through our AI-powered platform:
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg p-6">
                      <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                        <span className="mr-2">🤖</span>AI-Powered Services
                      </h4>
                      <ul className="text-sm text-gray-700 space-y-2">
                        <li>• Generate personalized travel recommendations</li>
                        <li>• Create custom itineraries based on preferences</li>
                        <li>• Provide real-time travel assistance</li>
                        <li>• Learn and adapt to your travel style</li>
                      </ul>
                    </div>
                    
                    <div className="bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-lg p-6">
                      <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                        <span className="mr-2">🛡️</span>Account & Security
                      </h4>
                      <ul className="text-sm text-gray-700 space-y-2">
                        <li>• Provide secure account access</li>
                        <li>• Process payments and transactions</li>
                        <li>• Detect and prevent fraud</li>
                        <li>• Comply with legal obligations</li>
                      </ul>
                    </div>
                    
                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
                      <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                        <span className="mr-2">📱</span>Service Improvement
                      </h4>
                      <ul className="text-sm text-gray-700 space-y-2">
                        <li>• Enhance platform functionality</li>
                        <li>• Analyze usage patterns and trends</li>
                        <li>• Develop new travel features</li>
                        <li>• Optimize performance and reliability</li>
                      </ul>
                    </div>
                    
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6">
                      <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                        <span className="mr-2">💬</span>Communication
                      </h4>
                      <ul className="text-sm text-gray-700 space-y-2">
                        <li>• Send booking confirmations and updates</li>
                        <li>• Provide customer support</li>
                        <li>• Share travel tips and recommendations</li>
                        <li>• Notify about service changes</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Information Sharing */}
                <section>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="mr-3">🤝</span>
                    How We Share Your Information
                  </h2>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                    <p className="text-red-800 font-bold mb-2 flex items-center">
                      <span className="mr-2">🚫</span>We Never Sell Your Data
                    </p>
                    <p className="text-red-700">
                      WanderFiz does not sell, trade, or rent your personal information to third parties for their 
                      marketing purposes. Your travel data stays secure with us.
                    </p>
                  </div>
                  
                  <p className="text-gray-700 leading-relaxed mb-6">
                    We only share information in these specific circumstances:
                  </p>
                  
                  <div className="space-y-4">
                    <div className="border border-white/20 rounded-lg p-6 bg-white/30">
                      <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                        <span className="mr-2">🔧</span>Service Providers
                      </h4>
                      <p className="text-gray-700 text-sm">
                        Trusted third-party vendors who help operate our platform (cloud hosting, payment processing, 
                        analytics) under strict confidentiality agreements.
                      </p>
                    </div>
                    
                    <div className="border border-white/20 rounded-lg p-6 bg-white/30">
                      <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                        <span className="mr-2">✈️</span>Travel Partners
                      </h4>
                      <p className="text-gray-700 text-sm">
                        Hotels, airlines, activity providers, and other travel services only to complete your bookings 
                        and enhance your travel experience.
                      </p>
                    </div>
                    
                    <div className="border border-white/20 rounded-lg p-6 bg-white/30">
                      <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                        <span className="mr-2">⚖️</span>Legal Requirements
                      </h4>
                      <p className="text-gray-700 text-sm">
                        When required by law, court order, or to protect our rights, users' safety, 
                        or prevent fraud and abuse.
                      </p>
                    </div>
                    
                    <div className="border border-white/20 rounded-lg p-6 bg-white/30">
                      <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                        <span className="mr-2">✅</span>With Your Consent
                      </h4>
                      <p className="text-gray-700 text-sm">
                        When you explicitly agree to share information with specific partners or for particular purposes.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Data Security */}
                <section>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="mr-3">🔒</span>
                    Data Security & Protection
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    We implement enterprise-grade security measures to protect your travel data and personal information:
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
                      <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                        <span className="mr-2">🔐</span>Encryption & Storage
                      </h4>
                      <ul className="text-sm text-gray-700 space-y-2">
                        <li>• AES-256 encryption for data at rest</li>
                        <li>• TLS 1.3 encryption for data in transit</li>
                        <li>• Secure cloud infrastructure (AWS/Azure)</li>
                        <li>• Regular security audits and penetration testing</li>
                      </ul>
                    </div>
                    
                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
                      <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                        <span className="mr-2">👥</span>Access Controls
                      </h4>
                      <ul className="text-sm text-gray-700 space-y-2">
                        <li>• Multi-factor authentication (MFA)</li>
                        <li>• Role-based access permissions</li>
                        <li>• Employee background checks</li>
                        <li>• Security awareness training</li>
                      </ul>
                    </div>
                    
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6">
                      <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                        <span className="mr-2">🛡️</span>Monitoring & Response
                      </h4>
                      <ul className="text-sm text-gray-700 space-y-2">
                        <li>• 24/7 security monitoring</li>
                        <li>• Automated threat detection</li>
                        <li>• Incident response procedures</li>
                        <li>• Data breach notification protocols</li>
                      </ul>
                    </div>
                    
                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-6">
                      <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                        <span className="mr-2">📋</span>Compliance
                      </h4>
                      <ul className="text-sm text-gray-700 space-y-2">
                        <li>• GDPR and CCPA compliance</li>
                        <li>• SOC 2 Type II certification</li>
                        <li>• PCI DSS for payment security</li>
                        <li>• Regular compliance assessments</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Your Rights */}
                <section>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="mr-3">⚖️</span>
                    Your Rights and Choices
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    You have comprehensive control over your personal information and travel data:
                  </p>
                  
                  <div className="space-y-4">
                    <div className="bg-white/60 border border-primary-200 rounded-lg p-6">
                      <div className="flex items-start">
                        <span className="text-primary-600 text-2xl mr-4 mt-1">👁️</span>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-2">Access Your Data</h4>
                          <p className="text-gray-700 text-sm">
                            Request a complete copy of all personal information we have about you, 
                            including travel history, preferences, and account details.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white/60 border border-secondary-200 rounded-lg p-6">
                      <div className="flex items-start">
                        <span className="text-secondary-600 text-2xl mr-4 mt-1">✏️</span>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-2">Correct Inaccuracies</h4>
                          <p className="text-gray-700 text-sm">
                            Update or correct any incorrect information in your profile, 
                            travel preferences, or account details.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white/60 border border-red-200 rounded-lg p-6">
                      <div className="flex items-start">
                        <span className="text-red-600 text-2xl mr-4 mt-1">🗑️</span>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-2">Delete Your Account</h4>
                          <p className="text-gray-700 text-sm">
                            Request complete deletion of your account and all associated data. 
                            Note: This action is permanent and cannot be undone.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white/60 border border-green-200 rounded-lg p-6">
                      <div className="flex items-start">
                        <span className="text-green-600 text-2xl mr-4 mt-1">📦</span>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-2">Export Your Data</h4>
                          <p className="text-gray-700 text-sm">
                            Download your travel data in a portable format (JSON, CSV) 
                            to use with other services or for backup.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200 rounded-lg p-6 mt-6">
                    <p className="text-gray-800 font-medium">
                      <strong>Exercise Your Rights:</strong> Contact us at 
                      <a href="mailto:privacy@wanderfiz.com" className="text-primary-600 hover:text-primary-700 ml-1">
                        privacy@wanderfiz.com
                      </a> or through your account settings. We respond to all requests within 30 days.
                    </p>
                  </div>
                </section>

                {/* International Transfers */}
                <section>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="mr-3">🌍</span>
                    International Data Transfers
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    As a global travel platform, your information may be transferred to and processed in countries 
                    other than your country of residence. We ensure appropriate safeguards are in place:
                  </p>
                  <div className="bg-white/50 rounded-lg p-6">
                    <ul className="list-none space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-3 mt-1">•</span>
                        <span><strong>Standard Contractual Clauses:</strong> EU-approved data transfer mechanisms</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-3 mt-1">•</span>
                        <span><strong>Adequacy Decisions:</strong> Transfers to countries with adequate protection</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-3 mt-1">•</span>
                        <span><strong>Binding Corporate Rules:</strong> Internal policies ensuring consistent protection</span>
                      </li>
                    </ul>
                  </div>
                </section>

                {/* Contact Information */}
                <section>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="mr-3">📞</span>
                    Contact Us
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Questions about this Privacy Policy or your data? We're here to help:
                  </p>
                  <div className="bg-gradient-to-br from-primary-50 via-white to-secondary-50 border border-primary-200 rounded-lg p-8">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                          <span className="mr-2">💌</span>Privacy Team
                        </h4>
                        <p className="text-gray-700 mb-2">
                          <strong>Email:</strong> 
                          <a href="mailto:privacy@wanderfiz.com" className="text-primary-600 hover:text-primary-700 ml-1">
                            privacy@wanderfiz.com
                          </a>
                        </p>
                        <p className="text-gray-700 mb-2">
                          <strong>Response Time:</strong> Within 30 days
                        </p>
                        <p className="text-gray-700">
                          <strong>Languages:</strong> English, Spanish, French
                        </p>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                          <span className="mr-2">🏢</span>Legal Address
                        </h4>
                        <p className="text-gray-700 leading-relaxed">
                          WanderFiz Inc.<br />
                          Privacy Department<br />
                          123 Innovation Drive, Suite 100<br />
                          San Francisco, CA 94105<br />
                          United States
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Last Updated */}
                <section className="border-t border-gray-200 pt-8">
                  <div className="bg-gray-50 rounded-lg p-6 text-center">
                    <p className="text-gray-600 text-sm">
                      This Privacy Policy was last updated on <strong>January 15, 2025</strong>. 
                      We may update this policy from time to time. We'll notify you of any significant changes 
                      by email and through our platform.
                    </p>
                    <p className="text-gray-500 text-xs mt-2">
                      Previous version available upon request at privacy@wanderfiz.com
                    </p>
                  </div>
                </section>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicyPage