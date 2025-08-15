import React, { useState, useEffect } from 'react';
import GlassCard from '../ui/GlassCard';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
  location: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'Digital Nomad',
    content: 'WanderFiz transformed how I plan my trips. The AI suggestions are spot-on, and the offline mode is a lifesaver when exploring remote destinations!',
    rating: 5,
    avatar: 'SC',
    location: 'Bali, Indonesia'
  },
  {
    id: '2',
    name: 'Mark Rodriguez',
    role: 'Adventure Traveler',
    content: 'Finally, an app that handles group expenses without the drama. Our Bali trip with 8 friends was perfectly organized, and everyone knew exactly what they owed.',
    rating: 5,
    avatar: 'MR',
    location: 'Barcelona, Spain'
  },
  {
    id: '3',
    name: 'Emma Thompson',
    role: 'Family Traveler',
    content: 'The safety features give me peace of mind when traveling with kids. The photo memories feature is absolutely magical - it creates beautiful stories from our trips!',
    rating: 5,
    avatar: 'ET',
    location: 'London, UK'
  },
  {
    id: '4',
    name: 'James Park',
    role: 'Business Traveler',
    content: 'I travel for work constantly, and WanderFiz keeps me organized. The real-time assistant has saved me countless times with flight changes and local recommendations.',
    rating: 5,
    avatar: 'JP',
    location: 'Seoul, South Korea'
  },
  {
    id: '5',
    name: 'Maria Silva',
    role: 'Solo Explorer',
    content: 'As a solo female traveler, the safety features are incredible. The emergency SOS and embassy contacts give me confidence to explore anywhere in the world.',
    rating: 5,
    avatar: 'MS',
    location: 'São Paulo, Brazil'
  },
  {
    id: '6',
    name: 'Alex Kumar',
    role: 'Eco Traveler',
    content: 'Love the sustainability features! Tracking my carbon footprint and finding eco-friendly options makes me feel good about my travel choices.',
    rating: 5,
    avatar: 'AK',
    location: 'Mumbai, India'
  }
];

const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-rotate testimonials
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isPaused]);

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50/50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Loved by{' '}
            <span className="bg-gradient-to-r from-[#FF561D] to-[#0ea5e9] bg-clip-text text-transparent">
              Travelers
            </span>{' '}
            Worldwide
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of happy travelers who've transformed their journeys with WanderFiz
          </p>
        </div>

        {/* Desktop View - Grid */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8 mb-12">
          {testimonials.slice(0, 3).map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        {/* Tablet View - 2 Column Grid */}
        <div className="hidden md:grid lg:hidden md:grid-cols-2 gap-8 mb-12">
          {testimonials.slice(0, 2).map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        {/* Mobile View - Carousel */}
        <div 
          className="md:hidden relative mb-12"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-gradient-to-r from-[#FF561D] to-[#0ea5e9] w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="text-center">
          <GlassCard className="inline-block p-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="space-y-2">
                <div className="text-3xl font-bold bg-gradient-to-r from-[#FF561D] to-[#0ea5e9] bg-clip-text text-transparent">
                  50K+
                </div>
                <div className="text-sm text-gray-600 font-medium">Happy Travelers</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold bg-gradient-to-r from-[#0ea5e9] to-[#a855f7] bg-clip-text text-transparent">
                  200K+
                </div>
                <div className="text-sm text-gray-600 font-medium">Trips Planned</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold bg-gradient-to-r from-[#a855f7] to-[#84cc16] bg-clip-text text-transparent">
                  150+
                </div>
                <div className="text-sm text-gray-600 font-medium">Countries</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold bg-gradient-to-r from-[#84cc16] to-[#fbbf24] bg-clip-text text-transparent">
                  4.9★
                </div>
                <div className="text-sm text-gray-600 font-medium">App Rating</div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
};

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => {
  return (
    <GlassCard className="p-6 h-full">
      <div className="flex flex-col h-full">
        {/* Quote Icon */}
        <div className="mb-4">
          <svg className="w-8 h-8 text-gray-400 opacity-50" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 10c0-1.105.895-2 2-2h10c1.105 0 2 .895 2 2v6c0 1.105-.895 2-2 2H5c-1.105 0-2-.895-2-2v-6zM7.5 6a.5.5 0 01.5.5V8a.5.5 0 01-1 0V6.5a.5.5 0 01.5-.5zM12.5 6a.5.5 0 01.5.5V8a.5.5 0 01-1 0V6.5a.5.5 0 01.5-.5z" clipRule="evenodd" />
          </svg>
        </div>

        {/* Content */}
        <blockquote className="flex-1 mb-6">
          <p className="text-gray-700 leading-relaxed italic">
            "{testimonial.content}"
          </p>
        </blockquote>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-4">
          {Array.from({ length: 5 }, (_, i) => (
            <svg
              key={i}
              className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>

        {/* Author Info */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-[#FF561D] to-[#0ea5e9] rounded-full flex items-center justify-center text-white font-bold">
            {testimonial.avatar}
          </div>
          <div>
            <div className="font-semibold text-gray-900">{testimonial.name}</div>
            <div className="text-sm text-gray-600">{testimonial.role}</div>
            <div className="text-xs text-gray-500">{testimonial.location}</div>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};

export default TestimonialsSection;
