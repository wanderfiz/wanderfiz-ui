import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import { useScrollAnimation, useStaggeredScrollAnimation } from '../hooks/useScrollAnimation'

interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  avatar: string
  expertise: string[]
}

interface CompanyValue {
  id: string
  title: string
  description: string
  icon: string
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'sarah-chen',
    name: 'Sarah Chen',
    role: 'CEO & Co-Founder',
    bio: 'Former travel industry veteran with 15+ years at Airbnb and Expedia. Passionate about making travel accessible to everyone.',
    avatar: 'SC',
    expertise: ['Product Strategy', 'Travel Industry', 'Leadership']
  },
  {
    id: 'marcus-rodriguez',
    name: 'Marcus Rodriguez',
    role: 'CTO & Co-Founder',
    bio: 'AI/ML expert from Google and Microsoft. Believes technology should enhance human experiences, not replace them.',
    avatar: 'MR',
    expertise: ['AI/ML', 'System Architecture', 'Mobile Development']
  },
  {
    id: 'elena-volkov',
    name: 'Elena Volkov',
    role: 'Head of Design',
    bio: 'Award-winning UX designer who has crafted experiences for millions of users at Uber and Spotify.',
    avatar: 'EV',
    expertise: ['UX Design', 'Mobile Design', 'Design Systems']
  },
  {
    id: 'james-kim',
    name: 'James Kim',
    role: 'Head of Engineering',
    bio: 'Full-stack engineer with expertise in scalable systems. Previously led engineering teams at Pinterest and Slack.',
    avatar: 'JK',
    expertise: ['Backend Systems', 'DevOps', 'Team Leadership']
  }
]

const COMPANY_VALUES: CompanyValue[] = [
  {
    id: 'human-centered',
    title: 'Human-Centered Technology',
    description: 'We believe technology should amplify human creativity and connection, not replace it. Our AI enhances your travel decisions while preserving the joy of discovery.',
    icon: '🤝'
  },
  {
    id: 'accessible-travel',
    title: 'Travel for Everyone',
    description: 'Great travel experiences shouldn\'t be limited by budget, expertise, or language barriers. We\'re democratizing access to world-class trip planning.',
    icon: '🌍'
  },
  {
    id: 'privacy-first',
    title: 'Privacy & Trust',
    description: 'Your travel data and personal information are sacred to us. We build with privacy by design and complete transparency about how your data is used.',
    icon: '🔒'
  },
  {
    id: 'sustainable-travel',
    title: 'Sustainable Tourism',
    description: 'We promote responsible travel that benefits local communities and protects the environment for future generations of travelers.',
    icon: '🌱'
  }
]

const COMPANY_STATS = [
  { label: 'Founded', value: '2023', description: 'Born from passion for travel' },
  { label: 'Team Members', value: '24', description: 'Across 8 countries' },
  { label: 'Countries Covered', value: '195+', description: 'Worldwide travel support' },
  { label: 'Funding Raised', value: '$12M', description: 'Series A funding' }
]

const AboutPage: React.FC = () => {
  const navigate = useNavigate()
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.3 })
  const { containerRef: teamRef, isVisible: teamVisible, visibleItems: teamItems } = useStaggeredScrollAnimation(
    TEAM_MEMBERS.length,
    { threshold: 0.2, staggerDelay: 200 }
  )
  const { containerRef: valuesRef, isVisible: valuesVisible, visibleItems: valueItems } = useStaggeredScrollAnimation(
    COMPANY_VALUES.length,
    { threshold: 0.2, staggerDelay: 150 }
  )

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div ref={headerRef as React.RefObject<HTMLDivElement>} className={`text-center mb-16 transition-all duration-1000 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About
            <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              {' '}WanderFiz
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            We&apos;re on a mission to transform how people experience travel, making every journey 
            from dream to memory seamless, meaningful, and accessible to everyone, everywhere.
          </p>
        </div>

        {/* Company Story */}
        <div className={`mb-20 transition-all duration-1000 delay-300 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Card variant="glass" className="max-w-6xl mx-auto" padding="large">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Our Story
                </h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    WanderFiz was born from a simple frustration: planning amazing trips shouldn&apos;t be 
                    so overwhelming. Our founders, after countless hours spent researching destinations, 
                    comparing options, and coordinating with travel companions, realized there had to be a better way.
                  </p>
                  <p>
                    What started as a weekend project in 2023 has evolved into a comprehensive platform 
                    that combines the power of artificial intelligence with human creativity. We believe 
                    that everyone deserves to experience the world, and technology should make that dream 
                    more accessible, not more complicated.
                  </p>
                  <p>
                    Today, we&apos;re proud to help thousands of travelers transform their wanderlust into 
                    unforgettable journeys, one intelligent recommendation at a time.
                  </p>
                </div>
              </div>
              <div className="bg-glass-light backdrop-blur-md border border-white/20 rounded-lg p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Company Milestones</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-3 h-3 bg-primary-500 rounded-full mt-2"></div>
                    <div>
                      <div className="font-semibold text-gray-900">2023</div>
                      <div className="text-sm text-gray-600">Founded by travel and tech veterans</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-3 h-3 bg-secondary-500 rounded-full mt-2"></div>
                    <div>
                      <div className="font-semibold text-gray-900">Q2 2023</div>
                      <div className="text-sm text-gray-600">$12M Series A funding raised</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-3 h-3 bg-accent-500 rounded-full mt-2"></div>
                    <div>
                      <div className="font-semibold text-gray-900">Q4 2023</div>
                      <div className="text-sm text-gray-600">50,000+ users across 195 countries</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-3 h-3 bg-primary-600 rounded-full mt-2"></div>
                    <div>
                      <div className="font-semibold text-gray-900">2024</div>
                      <div className="text-sm text-gray-600">AI-powered features launched</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Mission & Vision */}
        <div className={`mb-20 transition-all duration-1000 delay-500 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card variant="glass" padding="large">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-2xl mb-6 mx-auto">
                  🎯
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                <p className="text-gray-700 leading-relaxed">
                  To democratize extraordinary travel experiences by combining artificial intelligence 
                  with human creativity, making world-class trip planning accessible to everyone, 
                  regardless of experience or budget.
                </p>
              </div>
            </Card>

            <Card variant="glass" padding="large">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-full flex items-center justify-center text-2xl mb-6 mx-auto">
                  🔮
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                <p className="text-gray-700 leading-relaxed">
                  A world where travel planning is effortless, travel experiences are personalized 
                  and meaningful, and every journey creates lasting memories while fostering 
                  cross-cultural understanding and sustainable tourism.
                </p>
              </div>
            </Card>
          </div>
        </div>

        {/* Company Stats */}
        <div className={`mb-20 transition-all duration-1000 delay-700 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Card variant="glass" className="max-w-5xl mx-auto" padding="large">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
              WanderFiz by the Numbers
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {COMPANY_STATS.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-primary-600 mb-2">
                    {stat.value}
                  </div>
                  <div className="font-semibold text-gray-900 mb-1">
                    {stat.label}
                  </div>
                  <div className="text-sm text-gray-600">
                    {stat.description}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Company Values */}
        <div ref={valuesRef as React.RefObject<HTMLDivElement>} className="mb-20">
          <div className={`text-center mb-12 transition-all duration-1000 ${valuesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These principles guide every decision we make and every feature we build
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {COMPANY_VALUES.map((value, index) => (
              <div
                key={value.id}
                className={`transition-all duration-700 ${
                  valueItems.has(index) 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <Card variant="glass" hover padding="large" className="h-full">
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl">{value.icon}</div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {value.title}
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div ref={teamRef as React.RefObject<HTMLDivElement>} className="mb-20">
          <div className={`text-center mb-12 transition-all duration-1000 ${teamVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Passionate travelers and technology experts from around the world, 
              united by our mission to transform travel experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {TEAM_MEMBERS.map((member, index) => (
              <div
                key={member.id}
                className={`transition-all duration-700 ${
                  teamItems.has(index) 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <Card variant="glass" hover padding="large" className="text-center h-full">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-bold text-lg mb-4 mx-auto">
                    {member.avatar}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <h4 className="text-primary-600 font-medium mb-3">
                    {member.role}
                  </h4>
                  <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                    {member.bio}
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {member.expertise.map((skill, skillIndex) => (
                      <span 
                        key={skillIndex}
                        className="bg-glass-light backdrop-blur-md border border-white/20 text-xs px-2 py-1 rounded-full text-gray-700"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Careers Section */}
        <div className={`mb-20 transition-all duration-1000 delay-900 ${teamVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Card variant="glass" className="max-w-4xl mx-auto" padding="large">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Join Our Journey
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                We&apos;re always looking for passionate individuals who share our vision of making 
                travel more accessible and meaningful. Come help us build the future of travel technology.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="large"
                  onClick={() => navigate('/contact')}
                  className="px-8"
                >
                  View Open Positions
                </Button>
                <Button
                  variant="ghost"
                  size="large"
                  onClick={() => navigate('/contact')}
                  className="px-8 bg-glass-light backdrop-blur-md border border-white/20"
                >
                  Get in Touch
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* CTA Section */}
        <div className={`text-center transition-all duration-1000 delay-1100 ${teamVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Card variant="glass" className="max-w-4xl mx-auto" padding="large">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Experience the Difference?
            </h3>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of travelers who have already discovered how WanderFiz transforms 
              the way they plan, experience, and remember their journeys.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="large"
                onClick={() => navigate('/signup')}
                className="px-8 shadow-glass-lg"
              >
                Start Your Journey
              </Button>
              <Button
                variant="ghost"
                size="large"
                onClick={() => navigate('/how-it-works')}
                className="px-8 bg-glass-light backdrop-blur-md border border-white/20"
              >
                Learn How It Works
              </Button>
            </div>

            <div className="flex justify-center items-center space-x-8 mt-8 pt-6 border-t border-white/20">
              <div className="text-center">
                <div className="text-sm font-semibold text-gray-900">Free to Start</div>
                <div className="text-xs text-gray-600">No credit card required</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-semibold text-gray-900">Global Support</div>
                <div className="text-xs text-gray-600">195+ countries covered</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-semibold text-gray-900">Expert Team</div>
                <div className="text-xs text-gray-600">Travel & tech veterans</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default AboutPage