import React, { useEffect } from 'react';
import Navbar from '../../components/landing/Navbar';
import CTA from '../../components/landing/CTA';
import Footer from '../../components/landing/Footer';
import { Target, Users, Sparkles, Shield, Award } from 'lucide-react';
import { initScrollAnimations } from '../../utils/animations';

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    const cleanup = initScrollAnimations();
    return () => cleanup && cleanup();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="static-page-hero">
        <div className="container">
          <div className="section-badge section-badge-indigo">Our Story & Mission</div>
          <h1>Empowering Academics with Autonomous Flow</h1>
          <p>
            We are dedicated to freeing educators, administrators, and students from repetitive clerical burdens
            through human-centric AI workflows.
          </p>
        </div>
      </div>

      <div className="container section">
        <div className="legal-content-card animate-on-scroll">
          <div className="legal-section">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <Target size={24} color="#4F46E5" />
              <h3 style={{ margin: 0 }}>The Vision</h3>
            </div>
            <p>
              Educational institutions are vibrant hubs of learning and research, yet their day-to-day operations
              remain weighed down by disjointed circulars, repetitive announcements, manually scheduled reminders,
              and fragmented communication tools.
            </p>
            <p>
              CampusFlow AI was designed with a single conviction: <strong>academic talent should be focused on mentoring and discovery, not endless clerical coordination.</strong> By bridging natural language instructions with robust execution engines, we make automation accessible to every campus stakeholder.
            </p>
          </div>

          <div className="legal-section">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <Shield size={24} color="#06B6D4" />
              <h3 style={{ margin: 0 }}>Core Guiding Principles</h3>
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
              <li style={{ display: 'flex', gap: '0.75rem' }}>
                <Award size={20} color="#10B981" style={{ flexShrink: 0, marginTop: 2 }} />
                <div>
                  <strong>Precision & Verification:</strong> Every AI-generated output is subject to transparent inspection, version tracking, and deterministic controls.
                </div>
              </li>
              <li style={{ display: 'flex', gap: '0.75rem' }}>
                <Award size={20} color="#10B981" style={{ flexShrink: 0, marginTop: 2 }} />
                <div>
                  <strong>Simplicity by Design:</strong> Zero-code setup ensures that anyone can create multi-step notices or reminder trees within minutes.
                </div>
              </li>
              <li style={{ display: 'flex', gap: '0.75rem' }}>
                <Award size={20} color="#10B981" style={{ flexShrink: 0, marginTop: 2 }} />
                <div>
                  <strong>Privacy & Compliance:</strong> Academic documents and student records are safeguarded with strict data segregation and institutional governance.
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <CTA />
      <Footer />
    </div>
  );
}
