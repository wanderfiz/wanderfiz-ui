import React, { useState, useEffect } from 'react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { TESTIMONIALS } from '../../utils/constants'

const TestimonialsSection: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.3 })

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-lg ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}>
        ★
      </span>
    ))
  }

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-travel-sky/20 via-white to-travel-sand/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Loved by Adventurers
            <span className="bg-gradient-to-r from-travel-sunset to-travel-ocean bg-clip-text text-transparent">
              {' '}Around the Globe 🌍
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real stories from real travelers who've discovered the joy of stress-free, perfectly planned adventures.
          </p>
        </div>

        {/* Featured Testimonial */}
        <div className={`mb-16 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-4xl mx-auto text-center bg-white/70 backdrop-blur-md rounded-3xl p-12 border border-warm-200/50 shadow-xl">
            <div className="mb-6">
              {renderStars(TESTIMONIALS[currentTestimonial].rating)}
            </div>
            
            <blockquote className="text-xl md:text-2xl text-gray-700 font-medium mb-8 leading-relaxed italic">
              "{TESTIMONIALS[currentTestimonial].content}"
            </blockquote>
            
            <div className="flex items-center justify-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-travel-sunset to-travel-ocean rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                {TESTIMONIALS[currentTestimonial].name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="text-left">
                <div className="font-bold text-gray-900 text-lg">
                  {TESTIMONIALS[currentTestimonial].name}
                </div>
                <div className="text-travel-ocean font-medium">
                  {TESTIMONIALS[currentTestimonial].role}
                </div>
                <div className="text-gray-600 text-sm flex items-center">
                  📍 {TESTIMONIALS[currentTestimonial].location}
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial Indicators */}
          <div className="flex justify-center space-x-3 mt-8">
            {TESTIMONIALS.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  index === currentTestimonial 
                    ? 'bg-travel-sunset scale-125 shadow-lg' 
                    : 'bg-gray-300 hover:bg-travel-ocean/50'
                }`}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Travel Stories Grid */}
        <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-4">
            Travel Stories That Inspire ✨
          </h3>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Discover how WanderFiz has transformed adventures for travelers just like you
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TESTIMONIALS.slice(0, 6).map((testimonial, index) => (
              <div 
                key={testimonial.id} 
                className={`bg-white/60 backdrop-blur-sm rounded-2xl p-6 group hover:scale-105 hover:shadow-xl transition-all duration-300 border border-warm-200/50 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="mb-4 flex justify-between items-start">
                  <div>{renderStars(testimonial.rating)}</div>
                  <div className="text-2xl">🌟</div>
                </div>
                
                <blockquote className="text-gray-700 mb-6 leading-relaxed italic">
                  "{testimonial.content}"
                </blockquote>
                
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-travel-sunset to-travel-forest rounded-full flex items-center justify-center text-white font-bold shadow-md">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-travel-ocean font-medium text-sm">
                      {testimonial.role}
                    </div>
                    <div className="text-gray-600 text-sm flex items-center">
                      📍 {testimonial.location}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Travel Industry Recognition */}
        <div className={`mt-20 pt-12 border-t border-warm-200/50 transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Recognized by Travel Industry Leaders 🏆
            </h3>
            <p className="text-gray-600">
              Trusted by travel professionals and featured in major publications
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/50 backdrop-blur-sm border border-warm-200/50 rounded-xl px-8 py-6 text-center hover:scale-105 transition-transform duration-300">
              <div className="text-3xl mb-2">🏅</div>
              <div className="text-lg font-bold text-travel-sunset mb-1">Travel + Leisure</div>
              <div className="text-sm text-gray-600">Best Travel Planning App 2024</div>
            </div>
            <div className="bg-white/50 backdrop-blur-sm border border-warm-200/50 rounded-xl px-8 py-6 text-center hover:scale-105 transition-transform duration-300">
              <div className="text-3xl mb-2">⭐</div>
              <div className="text-lg font-bold text-travel-ocean mb-1">Conde Nast Traveler</div>
              <div className="text-sm text-gray-600">Editor's Choice Award</div>
            </div>
            <div className="bg-white/50 backdrop-blur-sm border border-warm-200/50 rounded-xl px-8 py-6 text-center hover:scale-105 transition-transform duration-300">
              <div className="text-3xl mb-2">🚀</div>
              <div className="text-lg font-bold text-travel-forest mb-1">TechCrunch</div>
              <div className="text-sm text-gray-600">Travel Innovation of the Year</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection