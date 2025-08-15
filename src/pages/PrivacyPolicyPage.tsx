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
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Privacy
            <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              {' '}Policy
            </span>
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            Last updated: December 15, 2024
          </p>
          <p className="text-gray-600">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
        </div>

        {/* Content */}
        <div className={`transition-all duration-1000 delay-300 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Card variant="glass" padding="large">
            <div className="prose prose-lg max-w-none">
              <div className="space-y-8">
                {/* Introduction */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
                  <p className="text-gray-700 leading-relaxed">
                    WanderFiz ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy 
                    explains how we collect, use, disclose, and safeguard your information when you use our travel 
                    planning platform, mobile applications, and related services (collectively, the "Service").
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    By using our Service, you agree to the collection and use of information in accordance with 
                    this Privacy Policy. If you do not agree with our policies and practices, do not use our Service.
                  </p>
                </section>

                {/* Information We Collect */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Personal Information</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    We collect personal information that you provide directly to us, including:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                    <li>Account information (name, email address, password)</li>
                    <li>Profile information (preferences, travel interests, dietary restrictions)</li>
                    <li>Travel information (destinations, dates, itineraries, bookings)</li>
                    <li>Payment information (billing address, payment method details)</li>
                    <li>Communication data (messages, reviews, feedback)</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Automatically Collected Information</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    When you use our Service, we automatically collect certain information:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                    <li>Device information (IP address, browser type, operating system)</li>
                    <li>Usage data (pages visited, features used, time spent)</li>
                    <li>Location data (with your permission, for travel recommendations)</li>
                    <li>Cookies and similar tracking technologies</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Third-Party Information</h3>
                  <p className="text-gray-700 leading-relaxed">
                    We may receive information about you from third parties, such as social media platforms 
                    when you connect your accounts, travel partners, and public databases to enhance our services.
                  </p>
                </section>

                {/* How We Use Information */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    We use the information we collect for various purposes:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Provide, maintain, and improve our Service</li>
                    <li>Process transactions and send related information</li>
                    <li>Create personalized travel recommendations</li>
                    <li>Send you technical notices, updates, and administrative messages</li>
                    <li>Respond to your comments, questions, and customer service requests</li>
                    <li>Monitor and analyze trends, usage, and activities</li>
                    <li>Detect, investigate, and prevent fraudulent activities</li>
                    <li>Comply with legal obligations</li>
                  </ul>
                </section>

                {/* Information Sharing */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Share Your Information</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    We do not sell, trade, or rent your personal information to third parties. We may share 
                    information in the following circumstances:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li><strong>Service Providers:</strong> With trusted third-party vendors who assist in operating our Service</li>
                    <li><strong>Travel Partners:</strong> With hotels, airlines, and other travel providers to fulfill bookings</li>
                    <li><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety</li>
                    <li><strong>Business Transfers:</strong> In connection with mergers, acquisitions, or asset sales</li>
                    <li><strong>With Consent:</strong> When you explicitly agree to share information</li>
                  </ul>
                </section>

                {/* Data Security */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    We implement appropriate technical and organizational security measures to protect your 
                    personal information:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Encryption of data in transit and at rest</li>
                    <li>Regular security assessments and penetration testing</li>
                    <li>Access controls and employee security training</li>
                    <li>Secure development practices and code reviews</li>
                    <li>Incident response and breach notification procedures</li>
                  </ul>
                </section>

                {/* Your Rights */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights and Choices</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    You have the following rights regarding your personal information:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                    <li><strong>Access:</strong> Request access to your personal information</li>
                    <li><strong>Correction:</strong> Request correction of inaccurate information</li>
                    <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                    <li><strong>Portability:</strong> Request a copy of your data in a portable format</li>
                    <li><strong>Objection:</strong> Object to processing of your personal information</li>
                    <li><strong>Restriction:</strong> Request restriction of processing</li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed">
                    To exercise these rights, please contact us at privacy@wanderfiz.com. We will respond 
                    to your request within 30 days.
                  </p>
                </section>

                {/* Cookies */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies and Tracking</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    We use cookies and similar tracking technologies to enhance your experience:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                    <li><strong>Essential Cookies:</strong> Required for basic functionality</li>
                    <li><strong>Analytics Cookies:</strong> Help us understand how you use our Service</li>
                    <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                    <li><strong>Marketing Cookies:</strong> Deliver relevant advertisements (with consent)</li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed">
                    You can control cookies through your browser settings or our cookie preference center.
                  </p>
                </section>

                {/* International Transfers */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">International Data Transfers</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Your information may be transferred to and processed in countries other than your country 
                    of residence. We ensure appropriate safeguards are in place, including standard contractual 
                    clauses and adequacy decisions recognized by relevant authorities.
                  </p>
                </section>

                {/* Children&apos;s Privacy */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Children&apos;s Privacy</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Our Service is not intended for children under 13 years of age. We do not knowingly 
                    collect personal information from children under 13. If you believe we have collected 
                    such information, please contact us immediately.
                  </p>
                </section>

                {/* Changes to Policy */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Privacy Policy</h2>
                  <p className="text-gray-700 leading-relaxed">
                    We may update this Privacy Policy from time to time. We will notify you of any changes 
                    by posting the new Privacy Policy on this page and updating the "Last updated" date. 
                    We encourage you to review this Privacy Policy periodically.
                  </p>
                </section>

                {/* Contact Information */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    If you have any questions about this Privacy Policy, please contact us:
                  </p>
                  <div className="bg-glass-light backdrop-blur-md border border-white/20 rounded-lg p-6">
                    <p className="text-gray-700"><strong>Email:</strong> privacy@wanderfiz.com</p>
                    <p className="text-gray-700"><strong>Address:</strong> 123 Innovation Drive, San Francisco, CA 94105</p>
                    <p className="text-gray-700"><strong>Phone:</strong> +1 (555) 123-4567</p>
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