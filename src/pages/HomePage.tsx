import React from 'react';
import HeroSection from '../components/sections/HeroSection';
import FeaturesOverview from '../components/sections/FeaturesOverview';
import StatsSection from '../components/sections/StatsSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import CTASection from '../components/sections/CTASection';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesOverview />
      <StatsSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}

export default HomePage
