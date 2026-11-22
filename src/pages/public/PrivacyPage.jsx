import React, { useEffect } from 'react';
import Navbar from '../../components/landing/Navbar';
import Footer from '../../components/landing/Footer';
import { ShieldCheck } from 'lucide-react';

export default function PrivacyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Navbar />
      <div className="static-page-hero">
        <div className="container">
          <div className="section-badge section-badge-indigo">Data Governance</div>
          <h1>Privacy Policy</h1>
          <p>Last updated: November 2024 • Institutional Data Privacy Standards</p>
        </div>
      </div>

      <div className="container section">
        <div className="legal-content-card">
          <div className="legal-section">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <ShieldCheck size={22} color="#10B981" />
              <h3 style={{ margin: 0 }}>1. Commitment to Academic Data Confidentiality</h3>
            </div>
            <p>
              CampusFlow AI recognizes that educational institutions handle sensitive administrative communications, student records, and examination schedules. We are committed to maintaining the highest privacy safeguards across all automated pipelines.
            </p>
          </div>

          <div className="legal-section">
            <h3>2. Information We Process</h3>
            <p>
              When using CampusFlow AI, the system processes institutional inputs provided directly by authorized users, including:
            </p>
            <ul style={{ paddingLeft: '1.5rem', color: '#64748B', lineHeight: '1.7' }}>
              <li>User registration details (Name, institutional email, designated role, university affiliation).</li>
              <li>Operational files (Syllabi, notice drafts, circular text, attendance summaries).</li>
              <li>Workflow configuration telemetry (Schedule triggers, destination recipient categories).</li>
            </ul>
          </div>

          <div className="legal-section">
            <h3>3. Usage & Artificial Intelligence Processing</h3>
            <p>
              Your academic documents and circular drafts are processed strictly to extract relevant tasks, dates, and actions as directed by your automation recipes. We do not use proprietary university documents to train public commercial AI models.
            </p>
          </div>

          <div className="legal-section">
            <h3>4. Data Retention & Control</h3>
            <p>
              Institutions maintain full ownership of their data. Account administrators can purge history, delete cached documents, and revoke user sessions at any time through the administration console.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
