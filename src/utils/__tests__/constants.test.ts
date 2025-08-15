import {
  COMPANY_INFO,
  SOCIAL_LINKS,
  MAIN_NAVIGATION,
  FOOTER_NAVIGATION,
  STATS,
  TESTIMONIALS,
  KEY_BENEFITS,
  JOURNEY_STAGES,
  API_ENDPOINTS,
  APP_CONFIG,
  BREAKPOINTS,
  ANIMATION_DURATION,
  ERROR_MESSAGES
} from '../constants'

describe('Constants', () => {
  describe('COMPANY_INFO', () => {
    it('contains all required company information', () => {
      expect(COMPANY_INFO).toHaveProperty('name', 'WanderFiz')
      expect(COMPANY_INFO).toHaveProperty('tagline', 'Transform Every Journey from Dream to Memory')
      expect(COMPANY_INFO).toHaveProperty('description')
      expect(COMPANY_INFO).toHaveProperty('founded', '2024')
      expect(COMPANY_INFO).toHaveProperty('email', 'hello@wanderfiz.com')
      expect(COMPANY_INFO).toHaveProperty('phone', '+1 (555) 123-4567')
      expect(COMPANY_INFO).toHaveProperty('address')
    })

    it('has valid address information', () => {
      expect(COMPANY_INFO.address).toHaveProperty('street', '123 Innovation Drive')
      expect(COMPANY_INFO.address).toHaveProperty('city', 'San Francisco')
      expect(COMPANY_INFO.address).toHaveProperty('state', 'CA')
      expect(COMPANY_INFO.address).toHaveProperty('zip', '94105')
      expect(COMPANY_INFO.address).toHaveProperty('country', 'United States')
    })

    it('has meaningful description', () => {
      expect(COMPANY_INFO.description).toContain('AI-powered')
      expect(COMPANY_INFO.description).toContain('trip planning')
      expect(COMPANY_INFO.description).toContain('real-time assistance')
    })
  })

  describe('SOCIAL_LINKS', () => {
    it('contains all major social media platforms', () => {
      expect(SOCIAL_LINKS).toHaveProperty('twitter')
      expect(SOCIAL_LINKS).toHaveProperty('instagram')
      expect(SOCIAL_LINKS).toHaveProperty('facebook')
      expect(SOCIAL_LINKS).toHaveProperty('linkedin')
      expect(SOCIAL_LINKS).toHaveProperty('youtube')
    })

    it('has valid URL formats', () => {
      Object.values(SOCIAL_LINKS).forEach(url => {
        expect(url).toMatch(/^https:\/\//)
        expect(url).toContain('wanderfiz')
      })
    })
  })

  describe('MAIN_NAVIGATION', () => {
    it('contains expected navigation items', () => {
      expect(MAIN_NAVIGATION).toHaveLength(3)
      
      const expectedItems = [
        { name: 'Features', path: '/features' },
        { name: 'How It Works', path: '/how-it-works' },
        { name: 'Pricing', path: '/pricing' }
      ]

      expectedItems.forEach(item => {
        expect(MAIN_NAVIGATION).toContainEqual(item)
      })
    })

    it('all items have name and path properties', () => {
      MAIN_NAVIGATION.forEach(item => {
        expect(item).toHaveProperty('name')
        expect(item).toHaveProperty('path')
        expect(typeof item.name).toBe('string')
        expect(typeof item.path).toBe('string')
        expect(item.path).toMatch(/^\//)
      })
    })
  })

  describe('FOOTER_NAVIGATION', () => {
    it('has company and legal sections', () => {
      expect(FOOTER_NAVIGATION).toHaveProperty('company')
      expect(FOOTER_NAVIGATION).toHaveProperty('legal')
    })

    it('company section has expected items', () => {
      expect(FOOTER_NAVIGATION.company).toHaveLength(3)
      
      const expectedCompanyItems = [
        { name: 'About Us', path: '/about' },
        { name: 'Contact', path: '/contact' },
        { name: 'Help Center', path: '/help-center' }
      ]

      expectedCompanyItems.forEach(item => {
        expect(FOOTER_NAVIGATION.company).toContainEqual(item)
      })
    })

    it('legal section has expected items', () => {
      expect(FOOTER_NAVIGATION.legal).toHaveLength(2)
      
      const expectedLegalItems = [
        { name: 'Privacy Policy', path: '/privacy-policy' },
        { name: 'Terms of Service', path: '/terms-of-service' }
      ]

      expectedLegalItems.forEach(item => {
        expect(FOOTER_NAVIGATION.legal).toContainEqual(item)
      })
    })
  })

  describe('STATS', () => {
    it('contains all expected statistics', () => {
      expect(STATS).toHaveProperty('users', '50,000+')
      expect(STATS).toHaveProperty('trips', '250,000+')
      expect(STATS).toHaveProperty('countries', '195')
      expect(STATS).toHaveProperty('satisfaction', '98%')
    })

    it('all stats are strings', () => {
      Object.values(STATS).forEach(stat => {
        expect(typeof stat).toBe('string')
      })
    })
  })

  describe('TESTIMONIALS', () => {
    it('contains 4 testimonials', () => {
      expect(TESTIMONIALS).toHaveLength(4)
    })

    it('each testimonial has required properties', () => {
      TESTIMONIALS.forEach(testimonial => {
        expect(testimonial).toHaveProperty('id')
        expect(testimonial).toHaveProperty('name')
        expect(testimonial).toHaveProperty('role')
        expect(testimonial).toHaveProperty('avatar')
        expect(testimonial).toHaveProperty('rating')
        expect(testimonial).toHaveProperty('content')
        expect(testimonial).toHaveProperty('location')
        
        expect(typeof testimonial.id).toBe('string')
        expect(typeof testimonial.name).toBe('string')
        expect(typeof testimonial.role).toBe('string')
        expect(typeof testimonial.avatar).toBe('string')
        expect(typeof testimonial.rating).toBe('number')
        expect(typeof testimonial.content).toBe('string')
        expect(typeof testimonial.location).toBe('string')
      })
    })

    it('all testimonials have 5-star ratings', () => {
      TESTIMONIALS.forEach(testimonial => {
        expect(testimonial.rating).toBe(5)
      })
    })

    it('has diverse user roles and locations', () => {
      const roles = TESTIMONIALS.map(t => t.role)
      const locations = TESTIMONIALS.map(t => t.location)
      
      expect(roles).toContain('Travel Blogger')
      expect(roles).toContain('Adventure Photographer')
      expect(roles).toContain('Digital Nomad')
      expect(roles).toContain('Family Traveler')
      
      expect(locations.length).toBe(new Set(locations).size) // All unique locations
    })
  })

  describe('KEY_BENEFITS', () => {
    it('contains 4 key benefits', () => {
      expect(KEY_BENEFITS).toHaveLength(4)
    })

    it('each benefit has required properties', () => {
      KEY_BENEFITS.forEach(benefit => {
        expect(benefit).toHaveProperty('icon')
        expect(benefit).toHaveProperty('title')
        expect(benefit).toHaveProperty('description')
        
        expect(typeof benefit.icon).toBe('string')
        expect(typeof benefit.title).toBe('string')
        expect(typeof benefit.description).toBe('string')
      })
    })

    it('has meaningful titles', () => {
      const titles = KEY_BENEFITS.map(b => b.title)
      expect(titles).toContain('Save Time')
      expect(titles).toContain('Personalized')
      expect(titles).toContain('Global Coverage')
      expect(titles).toContain('All-in-One')
    })
  })

  describe('JOURNEY_STAGES', () => {
    it('contains 3 journey stages', () => {
      expect(JOURNEY_STAGES).toHaveLength(3)
    })

    it('each stage has required properties', () => {
      JOURNEY_STAGES.forEach(stage => {
        expect(stage).toHaveProperty('id')
        expect(stage).toHaveProperty('title')
        expect(stage).toHaveProperty('description')
        expect(stage).toHaveProperty('steps')
        expect(stage).toHaveProperty('icon')
        expect(stage).toHaveProperty('color')
        
        expect(typeof stage.id).toBe('string')
        expect(typeof stage.title).toBe('string')
        expect(typeof stage.description).toBe('string')
        expect(Array.isArray(stage.steps)).toBe(true)
        expect(typeof stage.icon).toBe('string')
        expect(typeof stage.color).toBe('string')
      })
    })

    it('has expected stage IDs', () => {
      const ids = JOURNEY_STAGES.map(s => s.id)
      expect(ids).toContain('pre-trip')
      expect(ids).toContain('during-trip')
      expect(ids).toContain('post-trip')
    })

    it('each stage has multiple steps', () => {
      JOURNEY_STAGES.forEach(stage => {
        expect(stage.steps.length).toBeGreaterThan(0)
        stage.steps.forEach(step => {
          expect(typeof step).toBe('string')
        })
      })
    })
  })

  describe('API_ENDPOINTS', () => {
    it('has auth, user, and trips sections', () => {
      expect(API_ENDPOINTS).toHaveProperty('auth')
      expect(API_ENDPOINTS).toHaveProperty('user')
      expect(API_ENDPOINTS).toHaveProperty('trips')
    })

    it('auth endpoints are properly formatted', () => {
      expect(API_ENDPOINTS.auth.login).toBe('/api/auth/login')
      expect(API_ENDPOINTS.auth.register).toBe('/api/auth/register')
      expect(API_ENDPOINTS.auth.logout).toBe('/api/auth/logout')
      expect(API_ENDPOINTS.auth.refresh).toBe('/api/auth/refresh')
    })

    it('all endpoints start with /api', () => {
      const allEndpoints = [
        ...Object.values(API_ENDPOINTS.auth),
        ...Object.values(API_ENDPOINTS.user),
        ...Object.values(API_ENDPOINTS.trips)
      ]

      allEndpoints.forEach(endpoint => {
        expect(endpoint).toMatch(/^\/api\//)
      })
    })
  })

  describe('APP_CONFIG', () => {
    it('contains all expected configuration', () => {
      expect(APP_CONFIG).toHaveProperty('name', 'WanderFiz')
      expect(APP_CONFIG).toHaveProperty('version', '1.0.0')
      expect(APP_CONFIG).toHaveProperty('defaultTheme', 'light')
      expect(APP_CONFIG).toHaveProperty('supportedLanguages')
      expect(APP_CONFIG).toHaveProperty('maxFileSize', 10 * 1024 * 1024)
      expect(APP_CONFIG).toHaveProperty('allowedImageTypes')
      expect(APP_CONFIG).toHaveProperty('defaultPageSize', 20)
    })

    it('has valid supported languages', () => {
      expect(Array.isArray(APP_CONFIG.supportedLanguages)).toBe(true)
      expect(APP_CONFIG.supportedLanguages).toContain('en')
      expect(APP_CONFIG.supportedLanguages.length).toBeGreaterThan(1)
    })

    it('has valid image types', () => {
      expect(Array.isArray(APP_CONFIG.allowedImageTypes)).toBe(true)
      APP_CONFIG.allowedImageTypes.forEach(type => {
        expect(type).toMatch(/^image\//)
      })
    })
  })

  describe('BREAKPOINTS', () => {
    it('contains all Tailwind breakpoints', () => {
      expect(BREAKPOINTS).toHaveProperty('sm', 640)
      expect(BREAKPOINTS).toHaveProperty('md', 768)
      expect(BREAKPOINTS).toHaveProperty('lg', 1024)
      expect(BREAKPOINTS).toHaveProperty('xl', 1280)
      expect(BREAKPOINTS).toHaveProperty('2xl', 1536)
    })

    it('breakpoints are in ascending order', () => {
      const values = Object.values(BREAKPOINTS)
      const sortedValues = [...values].sort((a, b) => a - b)
      expect(values).toEqual(sortedValues)
    })
  })

  describe('ANIMATION_DURATION', () => {
    it('contains all expected durations', () => {
      expect(ANIMATION_DURATION).toHaveProperty('fast', 150)
      expect(ANIMATION_DURATION).toHaveProperty('normal', 300)
      expect(ANIMATION_DURATION).toHaveProperty('slow', 500)
    })

    it('durations are in ascending order', () => {
      expect(ANIMATION_DURATION.fast).toBeLessThan(ANIMATION_DURATION.normal)
      expect(ANIMATION_DURATION.normal).toBeLessThan(ANIMATION_DURATION.slow)
    })
  })

  describe('ERROR_MESSAGES', () => {
    it('contains all expected error types', () => {
      expect(ERROR_MESSAGES).toHaveProperty('generic')
      expect(ERROR_MESSAGES).toHaveProperty('network')
      expect(ERROR_MESSAGES).toHaveProperty('auth')
      expect(ERROR_MESSAGES).toHaveProperty('forbidden')
      expect(ERROR_MESSAGES).toHaveProperty('notFound')
      expect(ERROR_MESSAGES).toHaveProperty('validation')
    })

    it('all error messages are strings', () => {
      Object.values(ERROR_MESSAGES).forEach(message => {
        expect(typeof message).toBe('string')
        expect(message.length).toBeGreaterThan(0)
      })
    })

    it('messages are user-friendly', () => {
      expect(ERROR_MESSAGES.generic).toContain('try again')
      expect(ERROR_MESSAGES.network).toContain('connection')
      expect(ERROR_MESSAGES.auth).toContain('log in')
      expect(ERROR_MESSAGES.forbidden).toContain('permission')
      expect(ERROR_MESSAGES.notFound).toContain('not found')
      expect(ERROR_MESSAGES.validation).toContain('input')
    })
  })
})