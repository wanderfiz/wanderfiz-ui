import React, { useState, useEffect, useRef } from 'react';
import GlassCard from '../ui/GlassCard';

interface Stat {
  id: string;
  value: number;
  suffix: string;
  label: string;
  description: string;
  icon: string;
  gradient: string;
}

const stats: Stat[] = [
  {
    id: 'travelers',
    value: 50000,
    suffix: '+',
    label: 'Happy Travelers',
    description: 'Active users worldwide',
    icon: '👥',
    gradient: 'from-[#FF561D] to-[#0ea5e9]'
  },
  {
    id: 'trips',
    value: 200000,
    suffix: '+',
    label: 'Trips Planned',
    description: 'Successful journeys',
    icon: '✈️',
    gradient: 'from-[#0ea5e9] to-[#a855f7]'
  },
  {
    id: 'countries',
    value: 195,
    suffix: '',
    label: 'Countries Covered',
    description: 'Global destinations',
    icon: '🌍',
    gradient: 'from-[#a855f7] to-[#84cc16]'
  },
  {
    id: 'savings',
    value: 2500000,
    suffix: '+',
    label: 'Money Saved',
    description: 'In USD through optimization',
    icon: '💰',
    gradient: 'from-[#84cc16] to-[#fbbf24]'
  }
];

const StatsSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedValues, setAnimatedValues] = useState<Record<string, number>>(
    stats.reduce((acc, stat) => ({ ...acc, [stat.id]: 0 }), {})
  );
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          animateCounters();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  const animateCounters = () => {
    stats.forEach((stat) => {
      const duration = 2000; // 2 seconds
      const steps = 60;
      const stepValue = stat.value / steps;
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        const currentValue = Math.min(stepValue * currentStep, stat.value);
        
        setAnimatedValues(prev => ({
          ...prev,
          [stat.id]: Math.floor(currentValue)
        }));

        if (currentStep >= steps) {
          clearInterval(timer);
        }
      }, duration / steps);
    });
  };

  const formatNumber = (value: number): string => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}K`;
    }
    return value.toString();
  };

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-white to-gray-50/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Trusted by{' '}
            <span className="bg-gradient-to-r from-[#FF561D] to-[#0ea5e9] bg-clip-text text-transparent">
              Thousands
            </span>{' '}
            of Travelers
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our numbers speak for themselves - join a growing community of smart travelers
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              className="group"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <GlassCard className="p-8 text-center h-full hover:scale-105 transition-all duration-500">
                <div className="space-y-4">
                  {/* Icon */}
                  <div className="relative mx-auto w-fit">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.gradient} p-4 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <span className="text-2xl">{stat.icon}</span>
                    </div>
                    <div className={`absolute -inset-1 rounded-2xl bg-gradient-to-br ${stat.gradient} opacity-20 blur-md group-hover:opacity-40 transition-opacity duration-300`}></div>
                  </div>

                  {/* Value */}
                  <div className="space-y-2">
                    <div className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                      {stat.id === 'savings' ? '$' : ''}{formatNumber(animatedValues[stat.id])}{stat.suffix}
                    </div>
                    <div className="text-lg font-semibold text-gray-900">
                      {stat.label}
                    </div>
                    <div className="text-sm text-gray-600">
                      {stat.description}
                    </div>
                  </div>

                  {/* Progress Bar Animation */}
                  <div className="w-full bg-gray-200/50 rounded-full h-1 overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${stat.gradient} transition-all duration-2000 ease-out rounded-full`}
                      style={{ 
                        width: isVisible ? '100%' : '0%',
                        transitionDelay: `${index * 200}ms`
                      }}
                    ></div>
                  </div>
                </div>
              </GlassCard>
            </div>
          ))}
        </div>

        {/* Bottom Achievement Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <GlassCard className="p-6 text-center">
            <div className="space-y-3">
              <div className="w-12 h-12 bg-gradient-to-r from-[#FF561D] to-[#0ea5e9] rounded-full flex items-center justify-center mx-auto">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <div className="text-lg font-bold text-gray-900">4.9★ Rating</div>
              <div className="text-sm text-gray-600">Average app store rating</div>
            </div>
          </GlassCard>

          <GlassCard className="p-6 text-center">
            <div className="space-y-3">
              <div className="w-12 h-12 bg-gradient-to-r from-[#0ea5e9] to-[#a855f7] rounded-full flex items-center justify-center mx-auto">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="text-lg font-bold text-gray-900">99.9% Uptime</div>
              <div className="text-sm text-gray-600">Reliable service guarantee</div>
            </div>
          </GlassCard>

          <GlassCard className="p-6 text-center md:col-span-2 lg:col-span-1">
            <div className="space-y-3">
              <div className="w-12 h-12 bg-gradient-to-r from-[#a855f7] to-[#84cc16] rounded-full flex items-center justify-center mx-auto">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="text-lg font-bold text-gray-900">24/7 Support</div>
              <div className="text-sm text-gray-600">Always here to help</div>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
