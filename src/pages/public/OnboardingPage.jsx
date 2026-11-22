import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  GraduationCap,
  BookOpen,
  Building2,
  Building,
  Sparkles,
  Check,
  ArrowRight,
  ArrowLeft,
  Mail,
  Bell,
  Workflow,
  FileText,
  Calendar,
  Layers,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function OnboardingPage() {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();

  const [currentStep, setCurrentStep] = useState(1); // 1 = Role, 2 = Institution, 3 = Purpose, 4 = Notifications, 5 = Welcome Screen

  const [onboardingData, setOnboardingData] = useState({
    role: user?.role || 'educator',
    institution: user?.institution || '',
    institutionType: 'University',
    purposes: ['notices', 'reminders'],
    notificationEmail: true,
    notificationInApp: true,
    notificationDigest: false,
    frequency: 'realtime'
  });

  const togglePurpose = (id) => {
    setOnboardingData((prev) => {
      const exists = prev.purposes.includes(id);
      return {
        ...prev,
        purposes: exists ? prev.purposes.filter((p) => p !== id) : [...prev.purposes, id]
      };
    });
  };

  const handleFinishOnboarding = () => {
    updateUser({
      role: onboardingData.role,
      institution: onboardingData.institution,
      onboardingDetails: onboardingData,
      onboarded: true
    });
    navigate('/app/dashboard');
  };

  const handleSkip = () => {
    setCurrentStep(5);
  };

  return (
    <div className="onboarding-screen">
      {/* Top Bar */}
      <div className="onboarding-navbar">
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div className="nav-brand">
            <div className="brand-icon">
              <Zap size={20} color="#FFFFFF" />
            </div>
            <span className="brand-text" style={{ color: '#0F172A' }}>
              Campus<span style={{ color: '#4F46E5' }}>Flow</span> <span className="brand-badge" style={{ color: '#4F46E5', borderColor: '#C7D2FE', background: '#EEF2FF' }}>AI</span>
            </span>
          </div>

          {currentStep < 5 && (
            <button
              onClick={handleSkip}
              className="btn btn-outline-dark btn-sm"
              style={{ fontSize: '0.85rem' }}
            >
              Skip Setup &rarr;
            </button>
          )}
        </div>
      </div>

      <div className="onboarding-container">
        {/* Step Progress Pill Indicator (Steps 1 to 4) */}
        {currentStep <= 4 && (
          <div className="onboarding-progress">
            {[1, 2, 3, 4].map((stepNum) => (
              <div
                key={stepNum}
                className={`progress-step-pill ${
                  currentStep === stepNum ? 'active' : currentStep > stepNum ? 'completed' : ''
                }`}
              >
                {currentStep > stepNum ? <Check size={14} /> : stepNum}
              </div>
            ))}
          </div>
        )}

        {/* Card Body */}
        <div className="onboarding-card">
          {/* STEP 1: Role Confirmation */}
          {currentStep === 1 && (
            <div>
              <div className="onboarding-header">
                <h2>Welcome, {user?.name || 'Academic Leader'}!</h2>
                <p>Which role best describes your daily campus engagement?</p>
              </div>

              <div className="role-cards-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
                <div
                  className={`role-card-option ${onboardingData.role === 'student' ? 'selected' : ''}`}
                  style={{ padding: '1.5rem 1rem' }}
                  onClick={() => setOnboardingData({ ...onboardingData, role: 'student' })}
                >
                  <BookOpen size={28} className="role-card-icon" />
                  <div className="role-card-name" style={{ fontSize: '1rem', marginTop: '0.5rem' }}>Student</div>
                  <p style={{ fontSize: '0.78rem', color: '#64748B', marginTop: '0.25rem' }}>
                    Track deadlines, notices & academic circulars
                  </p>
                </div>

                <div
                  className={`role-card-option ${onboardingData.role === 'educator' ? 'selected' : ''}`}
                  style={{ padding: '1.5rem 1rem' }}
                  onClick={() => setOnboardingData({ ...onboardingData, role: 'educator' })}
                >
                  <GraduationCap size={28} className="role-card-icon" />
                  <div className="role-card-name" style={{ fontSize: '1rem', marginTop: '0.5rem' }}>Educator</div>
                  <p style={{ fontSize: '0.78rem', color: '#64748B', marginTop: '0.25rem' }}>
                    Publish notices, lab alerts & syllabus workflows
                  </p>
                </div>

                <div
                  className={`role-card-option ${onboardingData.role === 'admin' ? 'selected' : ''}`}
                  style={{ padding: '1.5rem 1rem' }}
                  onClick={() => setOnboardingData({ ...onboardingData, role: 'admin' })}
                >
                  <Building2 size={28} className="role-card-icon" />
                  <div className="role-card-name" style={{ fontSize: '1rem', marginTop: '0.5rem' }}>Administrator</div>
                  <p style={{ fontSize: '0.78rem', color: '#64748B', marginTop: '0.25rem' }}>
                    Institutional policy, circulars & governance
                  </p>
                </div>
              </div>

              <div className="onboarding-footer-nav" style={{ justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="btn btn-primary"
                >
                  Continue <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Institution Details */}
          {currentStep === 2 && (
            <div>
              <div className="onboarding-header">
                <h2>Tell Us About Your Institution</h2>
                <p>CampusFlow customizes naming conventions and templates to your organization.</p>
              </div>

              <div className="form-group">
                <label className="form-label">Institution / University Name</label>
                <div className="form-input-wrapper">
                  <Building size={18} className="form-input-icon" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Berkeley College of Engineering"
                    className="form-input"
                    value={onboardingData.institution}
                    onChange={(e) => setOnboardingData({ ...onboardingData, institution: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Institution Type</label>
                <select
                  className="form-input form-input-no-icon"
                  value={onboardingData.institutionType}
                  onChange={(e) => setOnboardingData({ ...onboardingData, institutionType: e.target.value })}
                >
                  <option value="University">University</option>
                  <option value="College">College / Institute of Tech</option>
                  <option value="Academy">Preparatory School / Academy</option>
                  <option value="ResearchCenter">Autonomous Research Center</option>
                </select>
              </div>

              <div className="onboarding-footer-nav">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="btn btn-outline-dark"
                >
                  <ArrowLeft size={16} /> Back
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="btn btn-primary"
                >
                  Continue <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Primary Purpose */}
          {currentStep === 3 && (
            <div>
              <div className="onboarding-header">
                <h2>What is Your Primary Purpose?</h2>
                <p>Select all workflows you wish to activate on your dashboard.</p>
              </div>

              <div className="purpose-options-grid">
                {[
                  { id: 'notices', title: 'Smart Notice Generation', desc: 'Auto-compose circulars from prompts or syllabus PDFs', icon: <FileText size={20} /> },
                  { id: 'reminders', title: 'Intelligent Reminder Scheduling', desc: 'Auto-dispatch alerts for exams, assignments & deadlines', icon: <Calendar size={20} /> },
                  { id: 'attendance', title: 'Attendance Automation', desc: 'Monitor shortage thresholds and trigger notices', icon: <Workflow size={20} /> },
                  { id: 'documents', title: 'AI Document Intelligence', desc: 'Extract key tasks and dates from uploaded PDF circulars', icon: <Layers size={20} /> }
                ].map((item) => (
                  <div
                    key={item.id}
                    className={`purpose-choice-card ${onboardingData.purposes.includes(item.id) ? 'selected' : ''}`}
                    onClick={() => togglePurpose(item.id)}
                  >
                    <div className="purpose-choice-icon">
                      {item.icon}
                    </div>
                    <div className="purpose-choice-info" style={{ flex: 1 }}>
                      <h4>{item.title}</h4>
                      <p>{item.desc}</p>
                    </div>
                    <div style={{
                      width: 22,
                      height: 22,
                      borderRadius: 6,
                      border: '2px solid',
                      borderColor: onboardingData.purposes.includes(item.id) ? '#4F46E5' : '#CBD5E1',
                      background: onboardingData.purposes.includes(item.id) ? '#4F46E5' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FFF'
                    }}>
                      {onboardingData.purposes.includes(item.id) && <Check size={14} />}
                    </div>
                  </div>
                ))}
              </div>

              <div className="onboarding-footer-nav">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="btn btn-outline-dark"
                >
                  <ArrowLeft size={16} /> Back
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(4)}
                  className="btn btn-primary"
                >
                  Continue <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Notification Preferences */}
          {currentStep === 4 && (
            <div>
              <div className="onboarding-header">
                <h2>Notification Preferences</h2>
                <p>Choose how CampusFlow AI notifies you about automation events.</p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
                <label className="form-checkbox-label" style={{ padding: '0.75rem', background: '#F8FAFC', borderRadius: '10px' }}>
                  <input
                    type="checkbox"
                    checked={onboardingData.notificationEmail}
                    onChange={(e) => setOnboardingData({ ...onboardingData, notificationEmail: e.target.checked })}
                  />
                  <div>
                    <strong style={{ display: 'block', color: '#1E293B', fontSize: '0.95rem' }}>Email Notifications</strong>
                    <span style={{ fontSize: '0.8rem', color: '#64748B' }}>Receive urgent notices and workflow completion digests</span>
                  </div>
                </label>

                <label className="form-checkbox-label" style={{ padding: '0.75rem', background: '#F8FAFC', borderRadius: '10px' }}>
                  <input
                    type="checkbox"
                    checked={onboardingData.notificationInApp}
                    onChange={(e) => setOnboardingData({ ...onboardingData, notificationInApp: e.target.checked })}
                  />
                  <div>
                    <strong style={{ display: 'block', color: '#1E293B', fontSize: '0.95rem' }}>In-App Alerts</strong>
                    <span style={{ fontSize: '0.8rem', color: '#64748B' }}>Real-time telemetry and badge updates inside your workspace</span>
                  </div>
                </label>

                <label className="form-checkbox-label" style={{ padding: '0.75rem', background: '#F8FAFC', borderRadius: '10px' }}>
                  <input
                    type="checkbox"
                    checked={onboardingData.notificationDigest}
                    onChange={(e) => setOnboardingData({ ...onboardingData, notificationDigest: e.target.checked })}
                  />
                  <div>
                    <strong style={{ display: 'block', color: '#1E293B', fontSize: '0.95rem' }}>Daily Morning Digest</strong>
                    <span style={{ fontSize: '0.8rem', color: '#64748B' }}>Summary of upcoming triggers and pending approvals at 8:00 AM</span>
                  </div>
                </label>
              </div>

              <div className="onboarding-footer-nav">
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="btn btn-outline-dark"
                >
                  <ArrowLeft size={16} /> Back
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(5)}
                  className="btn btn-primary"
                >
                  Complete Setup <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: Welcome Screen & Quick Action Launchpad */}
          {currentStep === 5 && (
            <div className="welcome-celebration">
              <div className="welcome-sparkle-icon">
                <Sparkles size={36} />
              </div>

              <h2 style={{ fontSize: '2.1rem', fontWeight: 800, marginBottom: '0.5rem', color: '#0F172A' }}>
                Welcome to CampusFlow AI, {user?.name || 'Educator'}!
              </h2>

              <p style={{ color: '#64748B', fontSize: '1.05rem', maxWidth: 520, margin: '0 auto' }}>
                Your workspace is configured for <strong>{onboardingData.institution || 'Your Campus'}</strong>.
                Explore guided actions to jumpstart your automated workflows:
              </p>

              {/* 4 Guided Quickstart Cards */}
              <div className="quickstart-cards-grid">
                <div className="quickstart-card">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#4F46E5', marginBottom: '0.35rem' }}>
                    <Workflow size={18} />
                    <h4>1. Create Your First Workflow</h4>
                  </div>
                  <p>Design a multi-action flow linking input triggers to automated notifications.</p>
                </div>

                <div className="quickstart-card">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#06B6D4', marginBottom: '0.35rem' }}>
                    <Layers size={18} />
                    <h4>2. Upload Academic Documents</h4>
                  </div>
                  <p>Parse exam schedules or course catalogs to automatically generate calendars.</p>
                </div>

                <div className="quickstart-card">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10B981', marginBottom: '0.35rem' }}>
                    <FileText size={18} />
                    <h4>3. Generate Smart Notices</h4>
                  </div>
                  <p>Draft official institutional circulars using standardized AI templates.</p>
                </div>

                <div className="quickstart-card">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#F59E0B', marginBottom: '0.35rem' }}>
                    <Calendar size={18} />
                    <h4>4. Schedule Reminders</h4>
                  </div>
                  <p>Configure autonomous multi-channel alerts for critical submission cutoffs.</p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleFinishOnboarding}
                className="btn btn-primary btn-lg"
                style={{ width: '100%', marginTop: '1rem' }}
              >
                Go to Dashboard <ArrowRight size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
