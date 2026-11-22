import React, { useState, useEffect } from 'react';
import Navbar from '../../components/landing/Navbar';
import Footer from '../../components/landing/Footer';
import { Mail, MapPin, Clock, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { initScrollAnimations } from '../../utils/animations';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const cleanup = initScrollAnimations();
    return () => cleanup && cleanup();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 700);
  };

  return (
    <div>
      <Navbar />
      <div className="static-page-hero">
        <div className="container">
          <div className="section-badge section-badge-indigo">Get In Touch</div>
          <h1>Contact CampusFlow AI</h1>
          <p>
            Have questions about institutional deployment, feature inquiries, or pilot programs?
            Our educational specialists are here to assist.
          </p>
        </div>
      </div>

      <div className="container section">
        <div className="contact-layout-grid animate-on-scroll">
          {/* Left: Contact Info */}
          <div className="contact-info-cards">
            <div className="contact-detail-card">
              <div className="contact-icon-box">
                <Mail size={22} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.25rem' }}>Direct Inquiries</h4>
                <p style={{ color: '#64748B', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                  Institutional Partnerships & Technical Support
                </p>
                <a href="mailto:support@campusflow.ai" style={{ color: '#4F46E5', fontWeight: 600 }}>
                  support@campusflow.ai
                </a>
              </div>
            </div>

            <div className="contact-detail-card">
              <div className="contact-icon-box">
                <MapPin size={22} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.25rem' }}>Headquarters</h4>
                <p style={{ color: '#64748B', fontSize: '0.9rem' }}>
                  CampusFlow Systems Innovation Lab<br />
                  Academic Innovation Hub • Remote-First Team
                </p>
              </div>
            </div>

            <div className="contact-detail-card">
              <div className="contact-icon-box">
                <Clock size={22} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.25rem' }}>Availability Hours</h4>
                <p style={{ color: '#64748B', fontSize: '0.9rem' }}>
                  Monday – Friday: 8:00 AM – 6:00 PM EST<br />
                  Emergency uptime monitoring: 24/7/365
                </p>
              </div>
            </div>

            <div style={{
              background: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: '12px',
              padding: '1rem',
              fontSize: '0.8rem',
              color: '#64748B'
            }}>
              <p>
                <em>* Notice: Contact information provided here is dedicated to platform demonstration and technical preview evaluations.</em>
              </p>
            </div>
          </div>

          {/* Right: Functional Form */}
          <div className="card-white" style={{ padding: '2.5rem' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              Send Us a Message
            </h3>
            <p style={{ color: '#64748B', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Fill out the form below and an academic automation advisor will get back to you.
            </p>

            {submitted && (
              <div className="auth-alert-success" style={{ marginBottom: '1.5rem' }}>
                <CheckCircle2 size={18} />
                <span>Thank you! Your message has been received. Our team will follow up promptly.</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Prof. Jane Doe"
                  className="form-input form-input-no-icon"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Work / Institutional Email</label>
                <input
                  type="email"
                  required
                  placeholder="jane.doe@university.edu"
                  className="form-input form-input-no-icon"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Subject</label>
                <input
                  type="text"
                  required
                  placeholder="Pilot Inquiry / Demo Request"
                  className="form-input form-input-no-icon"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell us about your campus automation requirements..."
                  className="form-input form-input-no-icon"
                  style={{ resize: 'vertical' }}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '0.5rem' }}
              >
                {loading ? 'Transmitting...' : 'Send Message'} <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
