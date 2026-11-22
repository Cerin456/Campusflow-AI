import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { validateEmail } from '../../utils/validators';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Intended destination after login
  const from = location.state?.from?.pathname || '/app/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(formData.email)) {
      setError('Please provide a valid institutional email address.');
      return;
    }

    if (!formData.password) {
      setError('Please enter your password.');
      return;
    }

    setLoading(true);
    try {
      const result = await login({
        email: formData.email,
        password: formData.password,
        remember: formData.remember
      });

      if (result.success) {
        navigate(from, { replace: true });
      } else {
        setError(result.error || 'Invalid email or password. Please verify your credentials.');
      }
    } catch (err) {
      setError('An error occurred during authentication. Please retry.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      {/* Brand Side Panel */}
      <div className="auth-brand-side">
        <div className="auth-brand-glow" />

        <Link to="/" className="nav-brand">
          <div className="brand-icon">
            <Zap size={20} color="#FFFFFF" />
          </div>
          <span className="brand-text">
            Campus<span>Flow</span>
            <span className="brand-badge">AI</span>
          </span>
        </Link>

        <div className="auth-brand-content">
          <div className="hero-pill" style={{ background: 'rgba(255,255,255,0.1)' }}>
            <span>Secure Academic Portal</span>
          </div>
          <h2>Welcome Back to Your Intelligent Campus Hub.</h2>
          <p>
            Sign in to check pending workflows, inspect automated circular logs,
            and keep campus communications running seamlessly.
          </p>
        </div>

        <div className="auth-testimonial">
          <p>
            "Automating attendance circulars and lab exam reminders saved our faculty
            over 40 hours during finals week alone."
          </p>
          <div className="testimonial-author">
            <div className="testimonial-avatar">EM</div>
            <div className="testimonial-info">
              <h5>Prof. Elena Morales</h5>
              <span>Head of Computer Science</span>
            </div>
          </div>
        </div>
      </div>

      {/* Form Side */}
      <div className="auth-form-side">
        <div className="auth-form-card">
          <div className="auth-form-header">
            <h2>Sign In</h2>
            <p>
              Don't have an account yet? <Link to="/register">Create one free</Link>
            </p>
          </div>

          {error && (
            <div className="auth-alert-error">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div className="form-input-wrapper">
                <Mail size={18} className="form-input-icon" />
                <input
                  type="email"
                  required
                  placeholder="name@university.edu"
                  className="form-input"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="form-input-wrapper">
                <Lock size={18} className="form-input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Enter your password"
                  className="form-input"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="form-row-remember">
              <label className="form-checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.remember}
                  onChange={(e) => setFormData({ ...formData, remember: e.target.checked })}
                />
                <span>Remember me</span>
              </label>

              <Link to="/forgot-password" className="forgot-link">
                Forgot password?
              </Link>
            </div>

            {/* Login Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.85rem' }}
            >
              {loading ? 'Authenticating...' : 'Sign In'} <ArrowRight size={18} />
            </button>
          </form>

          {/* Quick Demo Hint */}
          <div style={{
            marginTop: '2rem',
            padding: '1rem',
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: '10px',
            fontSize: '0.82rem',
            color: '#64748B'
          }}>
            <strong>First time testing?</strong> Click <Link to="/register" style={{ color: '#4F46E5', fontWeight: 600 }}>Get Started</Link> to create an account, or register with any valid email to experience full onboarding and dashboard telemetry!
          </div>
        </div>
      </div>
    </div>
  );
}
