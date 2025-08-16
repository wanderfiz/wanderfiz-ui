import React from 'react'
import Card from '../components/ui/Card'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const TermsOfServicePage: React.FC = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.3 })

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef as React.RefObject<HTMLDivElement>} className={`text-center mb-12 transition-all duration-1000 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            WanderFiz
            <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              {' '}Terms of Service
            </span>
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            Last updated: January 15, 2025
          </p>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Welcome to WanderFiz - your ultimate travel planner and assistant. 
            Please read these terms carefully as they govern your use of our AI-powered travel platform.
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
                    <span className="mr-3">📋</span>
                    Introduction & Agreement
                  </h2>
                  <div className="bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200 rounded-lg p-6 mb-6">
                    <p className="text-gray-800 font-medium mb-2">
                      <strong>Welcome to WanderFiz!</strong>
                    </p>
                    <p className="text-gray-700">
                      These Terms of Service ("Terms") constitute a legally binding agreement between you and 
                      WanderFiz Inc. governing your use of our AI-powered travel planning platform, mobile applications, 
                      and all related services.
                    </p>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    WanderFiz Inc. ("WanderFiz," "we," "our," or "us") provides the ultimate travel planning 
                    and assistance platform designed to make your travel experiences extraordinary. Our Service includes:
                  </p>
                  <div className="bg-white/50 rounded-lg p-6 mb-6">
                    <ul className="list-none space-y-2 text-gray-700">
                      <li className="flex items-center">
                        <span className="text-primary-500 mr-3">✈️</span>
                        AI-powered trip planning and personalized recommendations
                      </li>
                      <li className="flex items-center">
                        <span className="text-secondary-500 mr-3">🤖</span>
                        Real-time travel assistance and intelligent support
                      </li>
                      <li className="flex items-center">
                        <span className="text-green-500 mr-3">📱</span>
                        Mobile app with offline capabilities
                      </li>
                      <li className="flex items-center">
                        <span className="text-purple-500 mr-3">👥</span>
                        Group travel planning and collaboration tools
                      </li>
                    </ul>
                  </div>
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                    <p className="text-amber-800 font-medium">
                      <strong>Important:</strong> By accessing, browsing, or using our Service, you acknowledge 
                      that you have read, understood, and agree to be bound by these Terms. If you do not agree 
                      with any part of these Terms, you must not use our Service.
                    </p>
                  </div>
                </section>

                {/* Acceptance of Terms */}
                <section>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="mr-3">✅</span>
                    Acceptance & Eligibility
                  </h2>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="mr-2">🎯</span>
                    Eligibility Requirements
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    To use WanderFiz, you must meet the following requirements:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-white/60 border border-gray-200 rounded-lg p-4">
                      <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                        <span className="mr-2">👤</span>Age & Capacity
                      </h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Be at least 18 years old</li>
                        <li>• Have legal capacity to enter contracts</li>
                        <li>• Not be prohibited from using our Service</li>
                      </ul>
                    </div>
                    <div className="bg-white/60 border border-gray-200 rounded-lg p-4">
                      <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                        <span className="mr-2">🛡️</span>Compliance
                      </h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Comply with all applicable laws</li>
                        <li>• Provide accurate and truthful information</li>
                        <li>• Respect intellectual property rights</li>
                      </ul>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="mr-2">👨‍👩‍👧‍👦</span>
                    Minors and Parental Consent
                  </h3>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <p className="text-blue-800">
                      <strong>For users under 18:</strong> If you are between 13-17 years old, you may use 
                      WanderFiz only with explicit parental or guardian consent and supervision. Parents/guardians 
                      are responsible for monitoring and controlling minors' use of our Service.
                    </p>
                  </div>
                </section>

                {/* Service Description */}
                <section>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="mr-3">🌟</span>
                    WanderFiz Service Features
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    WanderFiz is designed to be your ultimate travel companion, offering comprehensive features 
                    for every aspect of your journey:
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg p-6">
                      <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                        <span className="mr-2">🤖</span>AI Travel Planning
                      </h4>
                      <ul className="text-sm text-gray-700 space-y-2">
                        <li>• Personalized itinerary generation</li>
                        <li>• Smart activity recommendations</li>
                        <li>• Budget optimization and planning</li>
                        <li>• Weather-aware suggestions</li>
                      </ul>
                    </div>
                    
                    <div className="bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-lg p-6">
                      <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                        <span className="mr-2">📱</span>Mobile Experience
                      </h4>
                      <ul className="text-sm text-gray-700 space-y-2">
                        <li>• Offline maps and itineraries</li>
                        <li>• Real-time travel updates</li>
                        <li>• Photo organization and memories</li>
                        <li>• Emergency assistance features</li>
                      </ul>
                    </div>
                    
                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
                      <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                        <span className="mr-2">👥</span>Collaboration Tools
                      </h4>
                      <ul className="text-sm text-gray-700 space-y-2">
                        <li>• Group trip planning</li>
                        <li>• Expense sharing and tracking</li>
                        <li>• Voting on activities and destinations</li>
                        <li>• Real-time chat and updates</li>
                      </ul>
                    </div>
                    
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6">
                      <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                        <span className="mr-2">🔗</span>Booking Integration
                      </h4>
                      <ul className="text-sm text-gray-700 space-y-2">
                        <li>• Flight and hotel booking</li>
                        <li>• Activity and tour reservations</li>
                        <li>• Car rental and transportation</li>
                        <li>• Price comparison and deals</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mt-6">
                    <p className="text-yellow-800">
                      <strong>Service Evolution:</strong> We continuously improve and expand our features. 
                      We reserve the right to modify, enhance, or discontinue any aspect of the Service 
                      with reasonable advance notice to ensure the best possible user experience.
                    </p>
                  </div>
                </section>

                {/* User Accounts */}
                <section>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="mr-3">👤</span>
                    User Accounts & Responsibilities
                  </h2>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="mr-2">🔐</span>
                    Account Security
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    When you create a WanderFiz account, you become responsible for maintaining its security and integrity:
                  </p>
                  <div className="bg-white/50 rounded-lg p-6 mb-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-gray-900 mb-3">🔒 Security Obligations</h4>
                        <ul className="text-sm text-gray-700 space-y-2">
                          <li>• Keep login credentials confidential</li>
                          <li>• Use strong, unique passwords</li>
                          <li>• Enable two-factor authentication</li>
                          <li>• Monitor account activity regularly</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-3">📧 Account Maintenance</h4>
                        <ul className="text-sm text-gray-700 space-y-2">
                          <li>• Keep profile information current</li>
                          <li>• Update contact details promptly</li>
                          <li>• Report suspicious activity immediately</li>
                          <li>• Accept responsibility for all account use</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="mr-2">🚫</span>
                    Prohibited Activities
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    To maintain a safe and positive environment for all travelers, the following activities are strictly prohibited:
                  </p>
                  
                  <div className="space-y-4">
                    <div className="border border-red-200 rounded-lg p-6 bg-red-50">
                      <h4 className="font-bold text-red-900 mb-2 flex items-center">
                        <span className="mr-2">⚖️</span>Legal Violations
                      </h4>
                      <p className="text-red-700 text-sm">
                        Using our Service for any illegal activities, including but not limited to fraud, 
                        money laundering, terrorism financing, or violating international travel regulations.
                      </p>
                    </div>
                    
                    <div className="border border-orange-200 rounded-lg p-6 bg-orange-50">
                      <h4 className="font-bold text-orange-900 mb-2 flex items-center">
                        <span className="mr-2">🔒</span>Security Threats
                      </h4>
                      <p className="text-orange-700 text-sm">
                        Attempting to hack, disrupt, or gain unauthorized access to our systems, other users' accounts, 
                        or any connected third-party services.
                      </p>
                    </div>
                    
                    <div className="border border-purple-200 rounded-lg p-6 bg-purple-50">
                      <h4 className="font-bold text-purple-900 mb-2 flex items-center">
                        <span className="mr-2">📝</span>Content Violations
                      </h4>
                      <p className="text-purple-700 text-sm">
                        Uploading, sharing, or creating content that is illegal, harmful, threatening, abusive, 
                        harassing, defamatory, vulgar, obscene, or invasive of privacy.
                      </p>
                    </div>
                    
                    <div className="border border-blue-200 rounded-lg p-6 bg-blue-50">
                      <h4 className="font-bold text-blue-900 mb-2 flex items-center">
                        <span className="mr-2">💼</span>Commercial Misuse
                      </h4>
                      <p className="text-blue-700 text-sm">
                        Using our Service for unauthorized commercial purposes, spamming, or competing directly 
                        with WanderFiz without explicit written permission.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Intellectual Property */}
                <section>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="mr-3">©️</span>
                    Intellectual Property Rights
                  </h2>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="mr-2">📸</span>
                    Your Content & Travel Memories
                  </h3>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                    <p className="text-green-800 mb-4">
                      <strong>You Own Your Content:</strong> You retain full ownership of all content you create, 
                      upload, or share through WanderFiz, including photos, reviews, itineraries, and travel stories.
                    </p>
                    <p className="text-green-700 text-sm">
                      By sharing content, you grant WanderFiz a limited, worldwide, non-exclusive license to use, 
                      display, and distribute your content solely for providing and improving our Service, 
                      including featuring exceptional travel content in our marketing (with attribution).
                    </p>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="mr-2">🏢</span>
                    WanderFiz Intellectual Property
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    The WanderFiz platform, including our AI algorithms, user interface, features, and all related 
                    content, is protected by intellectual property laws. This includes:
                  </p>
                  <div className="bg-white/50 rounded-lg p-6">
                    <ul className="list-none space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-primary-500 mr-3 mt-1">•</span>
                        <span><strong>AI Technology:</strong> Our proprietary travel planning algorithms and recommendation systems</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-secondary-500 mr-3 mt-1">•</span>
                        <span><strong>Platform Design:</strong> User interface, visual design, and user experience elements</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-3 mt-1">•</span>
                        <span><strong>Content Database:</strong> Curated travel information, destination guides, and recommendations</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-500 mr-3 mt-1">•</span>
                        <span><strong>Trademarks:</strong> WanderFiz name, logo, and all related branding elements</span>
                      </li>
                    </ul>
                  </div>
                </section>

                {/* Payment & Subscriptions */}
                <section>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="mr-3">💳</span>
                    Subscription Plans & Payment Terms
                  </h2>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="mr-2">📊</span>
                    Available Plans
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6 border">
                      <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                        <span className="mr-2">🆓</span>Free Plan
                      </h4>
                      <ul className="text-sm text-gray-700 space-y-2">
                        <li>• Basic trip planning (1 active trip)</li>
                        <li>• Limited AI recommendations</li>
                        <li>• Community features access</li>
                        <li>• Mobile app with basic features</li>
                      </ul>
                    </div>
                    
                    <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg p-6 border border-primary-200">
                      <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                        <span className="mr-2">⭐</span>Premium Plans
                      </h4>
                      <ul className="text-sm text-gray-700 space-y-2">
                        <li>• Explorer ($9.99/month) - Unlimited trips + offline</li>
                        <li>• Pro ($19.99/month) - Group planning + premium AI</li>
                        <li>• Enterprise (custom) - Advanced features + support</li>
                        <li>• All plans include booking integration</li>
                      </ul>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="mr-2">🔄</span>
                    Billing & Cancellation
                  </h3>
                  <div className="bg-white/50 rounded-lg p-6">
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <h4 className="font-bold text-gray-900 mb-2">💰 Billing</h4>
                        <p className="text-sm text-gray-700">
                          Subscriptions are billed monthly or annually in advance. 
                          All fees are non-refundable except as required by law.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-2">❌ Cancellation</h4>
                        <p className="text-sm text-gray-700">
                          Cancel anytime from account settings. 
                          Access continues until end of billing period.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-2">📈 Price Changes</h4>
                        <p className="text-sm text-gray-700">
                          30-day notice for price changes. 
                          Continued use constitutes acceptance.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Travel-Specific Terms */}
                <section>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="mr-3">✈️</span>
                    Travel-Specific Terms & Disclaimers
                  </h2>
                  
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-6">
                    <h3 className="text-lg font-bold text-amber-900 mb-3 flex items-center">
                      <span className="mr-2">⚠️</span>
                      Important Travel Information Disclaimer
                    </h3>
                    <p className="text-amber-800 text-sm leading-relaxed">
                      WanderFiz provides travel planning assistance and recommendations for informational purposes only. 
                      We are not a travel agency, tour operator, or booking agent. Always verify all travel information, 
                      requirements, restrictions, and bookings with official sources and service providers.
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="border border-gray-200 rounded-lg p-6 bg-white/30">
                      <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                        <span className="mr-2">🌡️</span>Weather & Conditions
                      </h4>
                      <p className="text-gray-700 text-sm">
                        Weather forecasts, seasonal information, and travel conditions are provided for planning purposes 
                        and may change. Always check current conditions before traveling.
                      </p>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-6 bg-white/30">
                      <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                        <span className="mr-2">📋</span>Travel Documentation
                      </h4>
                      <p className="text-gray-700 text-sm">
                        You are responsible for ensuring you have all required travel documents, visas, vaccinations, 
                        and meet entry requirements for your destinations.
                      </p>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-6 bg-white/30">
                      <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                        <span className="mr-2">🏨</span>Third-Party Bookings
                      </h4>
                      <p className="text-gray-700 text-sm">
                        Bookings made through our platform are subject to the terms and conditions of the respective 
                        service providers. We are not liable for changes, cancellations, or service quality.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Limitation of Liability */}
                <section>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="mr-3">⚖️</span>
                    Limitation of Liability & Disclaimers
                  </h2>
                  
                  <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                    <h3 className="text-lg font-bold text-red-900 mb-3">
                      Maximum Liability Limitation
                    </h3>
                    <p className="text-red-800 text-sm leading-relaxed">
                      <strong>IMPORTANT:</strong> To the maximum extent permitted by law, WanderFiz's total liability 
                      to you for all claims arising from or related to the Service shall not exceed the amount you 
                      paid us in the 12 months preceding the claim, or $100, whichever is greater.
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white/60 border border-gray-200 rounded-lg p-6">
                      <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                        <span className="mr-2">🛡️</span>Service Availability
                      </h4>
                      <p className="text-gray-700 text-sm">
                        We provide our Service "as is" without warranties. We cannot guarantee uninterrupted access, 
                        error-free operation, or that our Service will meet all your travel planning needs.
                      </p>
                    </div>
                    
                    <div className="bg-white/60 border border-gray-200 rounded-lg p-6">
                      <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                        <span className="mr-2">🌐</span>External Services
                      </h4>
                      <p className="text-gray-700 text-sm">
                        We are not responsible for the availability, accuracy, legality, or quality of third-party 
                        services, websites, or content accessed through our platform.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Governing Law */}
                <section>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="mr-3">🏛️</span>
                    Governing Law & Dispute Resolution
                  </h2>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                    <h3 className="text-lg font-bold text-blue-900 mb-3">Jurisdiction</h3>
                    <p className="text-blue-800 text-sm">
                      These Terms are governed by California state law and U.S. federal law, without regard to 
                      conflict of law principles. Any legal action must be brought in the state or federal courts 
                      located in San Francisco County, California.
                    </p>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="mr-2">🤝</span>
                    Dispute Resolution Process
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start bg-white/50 rounded-lg p-4">
                      <span className="text-primary-500 text-2xl mr-4 mt-1">1️⃣</span>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">Direct Resolution</h4>
                        <p className="text-gray-700 text-sm">
                          Contact our support team first. Most issues are resolved quickly through direct communication.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start bg-white/50 rounded-lg p-4">
                      <span className="text-secondary-500 text-2xl mr-4 mt-1">2️⃣</span>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">Good Faith Negotiation</h4>
                        <p className="text-gray-700 text-sm">
                          If unresolved, we'll engage in 30 days of good faith negotiations to find a solution.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start bg-white/50 rounded-lg p-4">
                      <span className="text-green-500 text-2xl mr-4 mt-1">3️⃣</span>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">Binding Arbitration</h4>
                        <p className="text-gray-700 text-sm">
                          If still unresolved, disputes will be settled through binding arbitration in San Francisco, CA.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Contact Information */}
                <section>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="mr-3">📞</span>
                    Contact & Legal Information
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Questions about these Terms of Service? Our legal team is here to help:
                  </p>
                  <div className="bg-gradient-to-br from-primary-50 via-white to-secondary-50 border border-primary-200 rounded-lg p-8">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                          <span className="mr-2">⚖️</span>Legal Department
                        </h4>
                        <p className="text-gray-700 mb-2">
                          <strong>Email:</strong> 
                          <a href="mailto:legal@wanderfiz.com" className="text-primary-600 hover:text-primary-700 ml-1">
                            legal@wanderfiz.com
                          </a>
                        </p>
                        <p className="text-gray-700 mb-2">
                          <strong>Response Time:</strong> Within 5 business days
                        </p>
                        <p className="text-gray-700">
                          <strong>Business Hours:</strong> Mon-Fri, 9 AM - 6 PM PST
                        </p>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                          <span className="mr-2">🏢</span>Corporate Address
                        </h4>
                        <p className="text-gray-700 leading-relaxed">
                          WanderFiz Inc.<br />
                          Legal Department<br />
                          123 Innovation Drive, Suite 100<br />
                          San Francisco, CA 94105<br />
                          United States<br />
                          <span className="text-sm text-gray-500">Fed Tax ID: 12-3456789</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Last Updated */}
                <section className="border-t border-gray-200 pt-8">
                  <div className="bg-gray-50 rounded-lg p-6 text-center">
                    <p className="text-gray-600 text-sm">
                      These Terms of Service were last updated on <strong>January 15, 2025</strong>. 
                      We will notify you of any material changes via email and through our platform 
                      at least 30 days before they take effect.
                    </p>
                    <p className="text-gray-500 text-xs mt-2">
                      Previous versions available upon request at legal@wanderfiz.com
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

export default TermsOfServicePage