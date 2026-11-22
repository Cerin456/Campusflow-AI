import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Heart, Shield, Mail, Globe, MapPin } from 'lucide-react';
import { smoothScrollTo } from '../../utils/animations';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Column 1: Brand & Purpose */}
          <div className="footer-brand-col">
            <Link to="/" className="nav-brand" style={{ display: 'inline-flex' }}>
              <div className="brand-icon">
                <Zap size={20} color="#FFFFFF" />
              </div>
              <span className="brand-text">
                Campus<span>Flow</span>
                <span className="brand-badge">AI</span>
              </span>
            </Link>

            <p>
              CampusFlow AI is an intelligent campus automation platform engineered to
              convert routine memos, syllabi, and administrative tasks into autonomous workflows.
            </p>

            <div className="footer-badge-pill">
              <Shield size={14} />
              <span>Institutional Grade Security & Compliance</span>
            </div>
          </div>

          {/* Column 2: Platform Links */}
          <div className="footer-col">
            <h4>Platform</h4>
            <ul className="footer-links">
              <li>
                <Link to="/features">Features Overview</Link>
              </li>
              <li>
                <Link to="/app/automations">Workflow Engine</Link>
              </li>
              <li>
                <Link to="/app/notices">Smart Notices</Link>
              </li>
              <li>
                <Link to="/app/reminders">Reminder System</Link>
              </li>
              <li>
                <Link to="/app/documents">Document AI</Link>
              </li>
              <li>
                <Link to="/app/dashboard">Live Dashboard</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Solutions */}
          <div className="footer-col">
            <h4>Solutions</h4>
            <ul className="footer-links">
              <li>
                <Link to="/register?role=educator">For Educators</Link>
              </li>
              <li>
                <Link to="/register?role=student">For Students</Link>
              </li>
              <li>
                <Link to="/register?role=admin">For Administrators</Link>
              </li>
              <li>
                <Link to="/about">Our Vision & Story</Link>
              </li>
              <li>
                <Link to="/contact">Support & Inquiries</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Support */}
          <div className="footer-col">
            <h4>Connect</h4>
            <ul className="footer-links">
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail size={15} color="#818CF8" />
                <span>support@campusflow.ai</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Globe size={15} color="#818CF8" />
                <span>Global Remote Platform</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={15} color="#818CF8" />
                <span>Academic Tech Center</span>
              </li>
              <li style={{ marginTop: '0.5rem' }}>
                <Link to="/contact" className="btn btn-outline btn-sm" style={{ width: '100%' }}>
                  Submit Inquiry
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="footer-bottom">
          <div>
            &copy; {new Date().getFullYear()} CampusFlow AI Systems. All rights reserved.
          </div>

          <div className="footer-legal-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
