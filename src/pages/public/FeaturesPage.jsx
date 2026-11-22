import React, { useEffect } from 'react';
import Navbar from '../../components/landing/Navbar';
import Features from '../../components/landing/Features';
import CTA from '../../components/landing/CTA';
import Footer from '../../components/landing/Footer';
import { initScrollAnimations } from '../../utils/animations';

export default function FeaturesPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    const cleanup = initScrollAnimations();
    return () => cleanup && cleanup();
  }, []);

  return (
    <div className="features-page-wrapper">
      <Navbar />
      <div className="static-page-hero">
        <div className="container">
          <div className="section-badge section-badge-indigo">Architecture & Power</div>
          <h1>Platform Capabilities</h1>
          <p>
            Explore our end-to-end intelligent automation ecosystem built expressly for the nuances
            and high-stakes demands of university environments.
          </p>
        </div>
      </div>
      <Features />
      <CTA />
      <Footer />
    </div>
  );
}
