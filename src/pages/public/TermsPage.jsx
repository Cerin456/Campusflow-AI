import React, { useEffect } from 'react';
import Navbar from '../../components/landing/Navbar';
import Footer from '../../components/landing/Footer';
import { FileCheck } from 'lucide-react';

export default function TermsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Navbar />
      <div className="static-page-hero">
        <div className="container">
          <div className="section-badge section-badge-indigo">Service Agreement</div>
          <h1>Terms of Service</h1>
          <p>Effective Date: November 2024 • CampusFlow AI Platform Usage</p>
        </div>
      </div>

      <div className="container section">
        <div className="legal-content-card">
          <div className="legal-section">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <FileCheck size={22} color="#4F46E5" />
              <h3 style={{ margin: 0 }}>1. Acceptance of Terms</h3>
            </div>
            <p>
              By accessing or creating an account on CampusFlow AI, you agree to comply with and be bound by these Terms of Service. If you are registering on behalf of a college, university, or academic department, you confirm you possess the authorization to bind such entity.
            </p>
          </div>

          <div className="legal-section">
            <h3>2. Authorized Usage</h3>
            <p>
              CampusFlow AI is provided solely for lawful academic, administrative, and educational workflow automation. Users agree not to configure workflows designed to generate unsolicited spam, spoof official faculty identities, or breach institutional safety policies.
            </p>
          </div>

          <div className="legal-section">
            <h3>3. Human Verification & Oversight</h3>
            <p>
              While CampusFlow AI utilizes state-of-the-art language models, institutional authors retain ultimate editorial authority over official notices, grades, and statutory announcements before public broadcast.
            </p>
          </div>

          <div className="legal-section">
            <h3>4. Limitation of Liability</h3>
            <p>
              CampusFlow AI provides tools to accelerate administrative efficiency. We are not liable for scheduling disruptions resulting from erroneous third-party upstream data or network provider downtime.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
