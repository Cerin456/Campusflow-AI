import React, { useEffect } from 'react';
import Navbar from '../../components/landing/Navbar';
import Hero from '../../components/landing/Hero';
import Problems from '../../components/landing/Problems';
import Features from '../../components/landing/Features';
import HowItWorks from '../../components/landing/HowItWorks';
import ProductPreview from '../../components/landing/ProductPreview';
import UseCases from '../../components/landing/UseCases';
import Impact from '../../components/landing/Impact';
import CTA from '../../components/landing/CTA';
import Footer from '../../components/landing/Footer';
import { initScrollAnimations } from '../../utils/animations';

export default function LandingPage() {
  useEffect(() => {
    const cleanup = initScrollAnimations();
    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <div className="landing-page-wrapper">
      <Navbar />
      <Hero />
      <Problems />
      <Features />
      <HowItWorks />
      <ProductPreview />
      <UseCases />
      <Impact />
      <CTA />
      <Footer />
    </div>
  );
}
