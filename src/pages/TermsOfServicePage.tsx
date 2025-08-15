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
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Terms
            <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              {' '}of Service
            </span>
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            Last updated: December 15, 2024
          </p>
          <p className="text-gray-600">
            Please read these terms carefully before using WanderFiz services.
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
                    Welcome to WanderFiz! These Terms of Service ("Terms") govern your use of the WanderFiz 
                    platform, website, mobile applications, and related services (collectively, the "Service") 
                    operated by WanderFiz Inc. ("we," "our," or "us").
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    By accessing or using our Service, you agree to be bound by these Terms. If you disagree 
                    with any part of these terms, then you may not access the Service.
                  </p>
                </section>

                {/* Acceptance of Terms */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Acceptance of Terms</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    By creating an account or using WanderFiz, you confirm that:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>You are at least 18 years old or have parental consent</li>
                    <li>You have the legal capacity to enter into these Terms</li>
                    <li>You will comply with all applicable laws and regulations</li>
                    <li>All information you provide is accurate and truthful</li>
                  </ul>
                </section>

                {/* Description of Service */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Description of Service</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    WanderFiz provides:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                    <li>AI-powered trip planning and recommendations</li>
                    <li>Real-time travel assistance and support</li>
                    <li>Automatic memory capture and organization</li>
                    <li>Group collaboration tools for travel planning</li>
                    <li>Integration with travel booking platforms</li>
                    <li>Offline access to trip information and maps</li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed">
                    We reserve the right to modify, suspend, or discontinue any part of the Service 
                    at any time with reasonable notice.
                  </p>
                </section>

                {/* User Accounts */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">User Accounts and Responsibilities</h2>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Account Creation</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    To access certain features, you must create an account. You are responsible for:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                    <li>Maintaining the confidentiality of your account credentials</li>
                    <li>All activities that occur under your account</li>
                    <li>Notifying us immediately of any unauthorized use</li>
                    <li>Keeping your account information accurate and up-to-date</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Prohibited Uses</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    You agree not to use the Service to:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Violate any laws or regulations</li>
                    <li>Infringe on intellectual property rights</li>
                    <li>Transmit harmful, offensive, or illegal content</li>
                    <li>Interfere with or disrupt the Service</li>
                    <li>Attempt to gain unauthorized access to our systems</li>
                    <li>Use the Service for commercial purposes without permission</li>
                  </ul>
                </section>

                {/* Content and Intellectual Property */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Content and Intellectual Property</h2>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Your Content</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    You retain ownership of content you submit to WanderFiz (photos, reviews, itineraries). 
                    By submitting content, you grant us a worldwide, non-exclusive license to use, 
                    reproduce, and display your content in connection with the Service.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Our Content</h3>
                  <p className="text-gray-700 leading-relaxed">
                    The Service and its content, features, and functionality are owned by WanderFiz 
                    and are protected by international copyright, trademark, and other intellectual 
                    property laws. You may not reproduce, distribute, or create derivative works 
                    without our written permission.
                  </p>
                </section>

                {/* Privacy and Data */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Privacy and Data Protection</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Your privacy is important to us. Our collection and use of personal information 
                    is governed by our Privacy Policy, which is incorporated into these Terms by reference. 
                    By using the Service, you consent to our data practices as described in the Privacy Policy.
                  </p>
                </section>

                {/* Payment Terms */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Payment Terms</h2>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Subscription Plans</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    We offer various subscription plans with different features and pricing. 
                    Subscription fees are billed in advance and are non-refundable except as 
                    required by law or as specified in our refund policy.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Cancellation</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    You may cancel your subscription at any time from your account settings. 
                    Cancellation will be effective at the end of your current billing period.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Price Changes</h3>
                  <p className="text-gray-700 leading-relaxed">
                    We reserve the right to modify our pricing with 30 days' advance notice. 
                    Continued use of the Service after the price change constitutes acceptance 
                    of the new pricing.
                  </p>
                </section>

                {/* Third-Party Services */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Services</h2>
                  <p className="text-gray-700 leading-relaxed">
                    WanderFiz may integrate with third-party services (booking platforms, map providers, 
                    payment processors). Your use of these services is subject to their respective 
                    terms and conditions. We are not responsible for the availability, accuracy, 
                    or performance of third-party services.
                  </p>
                </section>

                {/* Disclaimers and Limitation of Liability */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Disclaimers and Limitation of Liability</h2>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Service Availability</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    We strive to maintain Service availability but cannot guarantee uninterrupted access. 
                    The Service is provided "as is" without warranties of any kind, express or implied.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Travel Information</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Travel recommendations and information are for planning purposes only. We are not 
                    responsible for changes in travel conditions, weather, availability, or pricing. 
                    Always verify travel information with official sources.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Limitation of Liability</h3>
                  <p className="text-gray-700 leading-relaxed">
                    To the maximum extent permitted by law, WanderFiz shall not be liable for any 
                    indirect, incidental, special, or consequential damages arising from your use 
                    of the Service.
                  </p>
                </section>

                {/* Indemnification */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Indemnification</h2>
                  <p className="text-gray-700 leading-relaxed">
                    You agree to indemnify and hold WanderFiz harmless from any claims, damages, 
                    or expenses arising from your use of the Service, violation of these Terms, 
                    or infringement of any rights of another party.
                  </p>
                </section>

                {/* Termination */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Termination</h2>
                  <p className="text-gray-700 leading-relaxed">
                    We may terminate or suspend your account and access to the Service immediately, 
                    without prior notice, for conduct that we believe violates these Terms or is 
                    harmful to other users, us, or third parties, or for any other reason in our 
                    sole discretion.
                  </p>
                </section>

                {/* Governing Law */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Governing Law and Dispute Resolution</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    These Terms are governed by the laws of the State of California, without regard 
                    to conflict of law principles. Any disputes shall be resolved through binding 
                    arbitration in San Francisco, California.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Before initiating arbitration, parties must attempt to resolve disputes through 
                    good faith negotiations for at least 30 days.
                  </p>
                </section>

                {/* Changes to Terms */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to These Terms</h2>
                  <p className="text-gray-700 leading-relaxed">
                    We reserve the right to modify these Terms at any time. We will notify users 
                    of significant changes via email or through the Service. Continued use of the 
                    Service after changes become effective constitutes acceptance of the new Terms.
                  </p>
                </section>

                {/* Contact Information */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    If you have any questions about these Terms of Service, please contact us:
                  </p>
                  <div className="bg-glass-light backdrop-blur-md border border-white/20 rounded-lg p-6">
                    <p className="text-gray-700"><strong>Email:</strong> legal@wanderfiz.com</p>
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

export default TermsOfServicePage