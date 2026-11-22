import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  FileText,
  Bell,
  Mail,
  Zap,
  Activity,
  Layers
} from 'lucide-react';
import { smoothScrollTo } from '../../utils/animations';

export default function Hero() {
  return (
    <section className="hero" id="hero">
      {/* Background Glowing Ambient Orbs */}
      <div className="hero-glow-1" />
      <div className="hero-glow-2" />
      <div className="hero-grid-pattern" />

      <div className="container hero-inner">
        {/* Left Column: Copy & Actions */}
        <div className="hero-content">
          <div className="hero-pill">
            <span className="pill-dot" />
            <Sparkles size={15} color="#818CF8" />
            <span>Next-Gen Campus Intelligence</span>
          </div>

          <h1 className="hero-title">
            Stop Managing Tasks.{' '}
            <span className="text-gradient">Start Automating Workflows.</span>
          </h1>

          <p className="hero-description">
            Meet CampusFlow AI – your intelligent campus automation assistant.
            Transform everyday instructions, documents and repetitive tasks into
            seamless automated workflows.
          </p>

          <div className="hero-buttons">
            <Link to="/register" className="btn btn-primary btn-lg">
              Start Automating <ArrowRight size={18} />
            </Link>
            <button
              onClick={() => smoothScrollTo('features')}
              className="btn btn-outline btn-lg"
            >
              Explore Features
            </button>
          </div>

          <div className="hero-trust">
            <CheckCircle2 size={18} />
            <span>Built to simplify the everyday work of students, educators and administrators.</span>
          </div>
        </div>

        {/* Right Column: Live-looking Dashboard Preview with Floating Cards */}
        <div className="hero-visual">
          {/* Floating Card 1: Notice Generated */}
          <div className="floating-card card-notice">
            <div className="floating-card-icon icon-emerald">
              <FileText size={18} />
            </div>
            <div className="floating-card-text">
              <h4>Notice Generated</h4>
              <p>End Semester Exam Schedule</p>
            </div>
          </div>

          {/* Floating Card 2: Reminder Scheduled */}
          <div className="floating-card card-reminder">
            <div className="floating-card-icon icon-amber">
              <Bell size={18} />
            </div>
            <div className="floating-card-text">
              <h4>Reminder Scheduled</h4>
              <p>Assignment Deadline in 24h</p>
            </div>
          </div>

          {/* Floating Card 3: Email Prepared */}
          <div className="floating-card card-email">
            <div className="floating-card-icon icon-indigo">
              <Mail size={18} />
            </div>
            <div className="floating-card-text">
              <h4>Email Prepared</h4>
              <p>Attendance Shortage Alert</p>
            </div>
          </div>

          {/* Realistic Dashboard Window Frame */}
          <div className="hero-preview-frame">
            <div className="preview-window-header">
              <div className="window-dots">
                <div className="window-dot red" />
                <div className="window-dot yellow" />
                <div className="window-dot green" />
              </div>
              <div className="window-title">campusflow-engine // v2.4</div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <Activity size={14} color="#10B981" />
                <span style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: 600 }}>Active</span>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="preview-stats-row">
              <div className="preview-stat-card">
                <div className="preview-stat-label">Active Workflows</div>
                <div className="preview-stat-val">24</div>
              </div>
              <div className="preview-stat-card">
                <div className="preview-stat-label">Tasks Queued</div>
                <div className="preview-stat-val">12</div>
              </div>
              <div className="preview-stat-card">
                <div className="preview-stat-label">Accuracy Rate</div>
                <div className="preview-stat-val" style={{ color: '#10B981' }}>99.2%</div>
              </div>
            </div>

            {/* Simulated Live Chart Area */}
            <div className="preview-chart-box">
              <div className="chart-header">
                <span>Execution Volume</span>
                <span style={{ color: '#818CF8' }}>+34% vs last week</span>
              </div>
              <div className="preview-bars">
                {[
                  { day: 'M', h: '45%' },
                  { day: 'T', h: '70%' },
                  { day: 'W', h: '60%' },
                  { day: 'T', h: '90%' },
                  { day: 'F', h: '82%' },
                  { day: 'S', h: '35%' },
                  { day: 'S', h: '25%' }
                ].map((item, idx) => (
                  <div className="bar-col" key={idx}>
                    <div className="bar-fill" style={{ height: item.h }} />
                    <span className="bar-label">{item.day}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Real-time Activity Log Row */}
            <div style={{
              background: 'rgba(0,0,0,0.25)',
              borderRadius: '8px',
              padding: '0.75rem 1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.8rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <Zap size={14} color="#F59E0B" />
                <span style={{ color: '#E2E8F0' }}>Auto-extracting syllabus PDF...</span>
              </div>
              <span style={{ color: '#64748B', fontFamily: 'var(--font-mono)', fontSize: '0.72rem' }}>
                Just now
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
