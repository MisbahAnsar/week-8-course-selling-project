import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/Hero';
import Footer from '../components/Footer';
const LandingPage: React.FC = () => {
  return (
    <div className="font-sans bg-white">
      <Header />
      <HeroSection />
      <Footer />
    </div>
  );
};

export default LandingPage;