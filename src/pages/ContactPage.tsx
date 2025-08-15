import React, { useState } from 'react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import { useScrollAnimation, useStaggeredScrollAnimation } from '../hooks/useScrollAnimation'

interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
  category: string
}

interface ContactMethod {
  id: string
  title: string
  description: string
  icon: string
  value: string
  action: string
}

const CONTACT_METHODS: ContactMethod[] = [
  {
    id: 'email',
    title: 'Email Support',
    description: 'Get help from our support team',
    icon: '📧',
    value: 'support@wanderfiz.com',
    action: 'Send Email'
  },
  {
    id: 'chat',
    title: 'Live Chat',
    description: 'Chat with us in real-time',
    icon: '💬',
    value: 'Available 24/7',
    action: 'Start Chat'
  },
  {
    id: 'phone',
    title: 'Phone Support',
    description: 'Speak with our team directly',
    icon: '📞',
    value: '+1 (555) 123-4567',
    action: 'Call Now'
  },
  {
    id: 'community',
    title: 'Community Forum',
    description: 'Connect with other travelers',
    icon: '🌐',
    value: 'forum.wanderfiz.com',
    action: 'Visit Forum'
  }
]

const FAQ_ITEMS = [
  {
    question: 'How do I get started with WanderFiz?',
    answer: 'Simply sign up for a free account and start planning your first trip using our AI-powered trip planner.'
  },
  {
    question: 'Is there a mobile app available?',
    answer: 'Yes! Our mobile apps are available for both iOS and Android, with full offline capabilities for your travels.'
  },
  {
    question: 'How much does WanderFiz cost?',
    answer: 'We offer a free plan with basic features, and paid plans starting at $9.99/month for advanced features.'
  },
  {
    question: 'Can I use WanderFiz offline?',
    answer: 'Yes! Our Explorer, Pro, and Enterprise plans include advanced offline maps and core functionality.'
  }
]

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'general'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.3 })
  const { containerRef: methodsRef, isVisible: methodsVisible, visibleItems: methodItems } = useStaggeredScrollAnimation(
    CONTACT_METHODS.length,
    { threshold: 0.2, staggerDelay: 150 }
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      setIsSubmitted(true)
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div ref={headerRef as React.RefObject<HTMLDivElement>} className={`text-center mb-16 transition-all duration-1000 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Contact
            <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              {' '}Us
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Have questions? We&apos;d love to hear from you. Our team is here to help you 
            make the most of your travel planning experience with WanderFiz.
          </p>
        </div>

        {/* Contact Methods */}
        <div ref={methodsRef as React.RefObject<HTMLDivElement>} className="mb-16">
          <div className={`text-center mb-12 transition-all duration-1000 ${methodsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Choose How You&apos;d Like to Connect
            </h2>
            <p className="text-gray-600">
              We&apos;re available through multiple channels to provide you with the best support
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {CONTACT_METHODS.map((method, index) => (
              <div
                key={method.id}
                className={`transition-all duration-700 ${
                  methodItems.has(index) 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <Card variant="glass" hover padding="large" className="text-center h-full">
                  <div className="text-3xl mb-4">{method.icon}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {method.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {method.description}
                  </p>
                  <p className="text-sm font-medium text-gray-900 mb-4">
                    {method.value}
                  </p>
                  <Button
                    variant="ghost"
                    size="small"
                    className="w-full bg-glass-light backdrop-blur-md border border-white/20"
                  >
                    {method.action}
                  </Button>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form and Info */}
        <div className={`grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16 transition-all duration-1000 delay-500 ${methodsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card variant="glass" padding="large">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
              
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="text-5xl mb-4">✅</div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h4>
                  <p className="text-gray-600 mb-6">
                    Thank you for contacting us. We&apos;ll get back to you within 24 hours.
                  </p>
                  <Button onClick={() => {
                    setIsSubmitted(false)
                    setFormData({ name: '', email: '', subject: '', message: '', category: 'general' })
                  }}>
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-glass-light backdrop-blur-md border border-white/20 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Your full name"
                        disabled={isSubmitting}
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-glass-light backdrop-blur-md border border-white/20 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="your@email.com"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                      </label>
                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-glass-light backdrop-blur-md border border-white/20 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        disabled={isSubmitting}
                      >
                        <option value="general">General Inquiry</option>
                        <option value="support">Technical Support</option>
                        <option value="sales">Sales Question</option>
                        <option value="partnership">Partnership</option>
                        <option value="feedback">Feedback</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-glass-light backdrop-blur-md border border-white/20 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Brief subject line"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-glass-light backdrop-blur-md border border-white/20 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                      placeholder="Tell us how we can help you..."
                      disabled={isSubmitting}
                    />
                  </div>

                  <Button
                    type="submit"
                    size="large"
                    disabled={isSubmitting}
                    className="w-full"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <LoadingSpinner size="small" />
                        <span className="ml-2">Sending Message...</span>
                      </div>
                    ) : (
                      'Send Message'
                    )}
                  </Button>
                </form>
              )}
            </Card>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <Card variant="glass" padding="large">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Office Information</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Headquarters</h4>
                  <p className="text-sm text-gray-600">
                    123 Innovation Drive<br />
                    San Francisco, CA 94105<br />
                    United States
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Business Hours</h4>
                  <p className="text-sm text-gray-600">
                    Monday - Friday: 9:00 AM - 6:00 PM PST<br />
                    Saturday: 10:00 AM - 4:00 PM PST<br />
                    Sunday: Closed
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Support</h4>
                  <p className="text-sm text-gray-600">
                    24/7 chat and email support<br />
                    Response time: &lt; 2 hours
                  </p>
                </div>
              </div>
            </Card>

            <Card variant="glass" padding="large">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick FAQ</h3>
              <div className="space-y-3">
                {FAQ_ITEMS.map((faq, index) => (
                  <details key={index} className="group">
                    <summary className="cursor-pointer font-medium text-gray-900 text-sm group-open:text-primary-600">
                      {faq.question}
                    </summary>
                    <p className="mt-2 text-xs text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
              <Button
                variant="ghost"
                size="small"
                className="w-full mt-4 bg-glass-light backdrop-blur-md border border-white/20"
              >
                Visit Help Center
              </Button>
            </Card>
          </div>
        </div>

        {/* Enterprise Contact */}
        <div className={`transition-all duration-1000 delay-700 ${methodsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Card variant="glass" className="max-w-4xl mx-auto" padding="large">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Enterprise Solutions
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Need a custom solution for your organization? Our enterprise team 
                can help you implement WanderFiz at scale with dedicated support and custom features.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="large">
                  Contact Enterprise Sales
                </Button>
                <Button
                  variant="ghost"
                  size="large"
                  className="bg-glass-light backdrop-blur-md border border-white/20"
                >
                  Schedule a Demo
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default ContactPage