import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function CTA() {
  return (
    <section className="section cta-section" id="cta">
      <div className="container">
        <div className="cta-banner animate-on-scroll">
          {/* Decorative Glowing Shapes */}
          <div className="cta-banner-bg-circle cta-banner-bg-circle-1" />
          <div className="cta-banner-bg-circle cta-banner-bg-circle-2" />

          <div className="cta-content">
            <div className="hero-pill" style={{ background: 'rgba(255,255,255,0.15)', borderColor: 'rgba(255,255,255,0.3)' }}>
              <Sparkles size={14} color="#FFF" />
              <span>Get Started in Under 2 Minutes</span>
            </div>

            <h2 className="cta-title">
              Ready to Make Your Work Smarter?
            </h2>

            <p className="cta-desc">
              Start transforming repetitive tasks into intelligent automated workflows today.
              Join educators, administrators, and students who have modernized their campus.
            </p>

            <div className="cta-btn-group">
              <Link to="/register" className="btn btn-white btn-lg">
                Get Started Free <ArrowRight size={18} />
              </Link>
              <Link to="/features" className="btn btn-outline btn-lg">
                Explore Platform
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
