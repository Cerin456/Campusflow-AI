import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  User,
  Mail,
  Lock,
  Building,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  GraduationCap,
  BookOpen,
  Building2,
  Zap
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { validateEmail, validatePassword, validateName } from '../../utils/validators';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const roleParam = searchParams.get('role');

  const defaultRole = roleParam === 'educator' ? 'educator' : roleParam === 'admin' ? 'admin' : 'student';

  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: defaultRole,
    institution: '',
    agreeTerms: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Password strength calculation
  const getPasswordStrength = (pass) => {
    if (!pass) return { strength: 'none', label: '' };
    const { isValid, errors } = validatePassword(pass);
    if (errors.length <= 1 && pass.length >= 8) return { strength: 'strong', label: 'Strong password' };
    if (pass.length >= 6) return { strength: 'medium', label: 'Moderate password' };
    return { strength: 'weak', label: 'Weak (add numbers & symbols)' };
  };

  const passStrength = getPasswordStrength(formData.password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!validateName(formData.name)) {
      setError('Please provide a valid full name (at least 2 characters).');
      return;
    }

    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    const passValidation = validatePassword(formData.password);
    if (!passValidation.isValid) {
      setError(passValidation.errors[0] || 'Password does not meet requirements.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match. Please verify your entries.');
      return;
    }

    if (!formData.agreeTerms) {
      setError('You must agree to the Terms of Service and Privacy Policy to register.');
      return;
    }

    setLoading(true);
    try {
      const result = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        institution: formData.institution
      });

      if (result.success) {
        navigate('/onboarding');
      } else {
        setError(result.error || 'Failed to create account.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
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
            <span>Join 120+ Academic Centers</span>
          </div>
          <h2>Transform Everyday Campus Routines into Automated Flow.</h2>
          <p>
            Experience seamless notice generation, intelligent reminder scheduling,
            and automated communication designed expressly for higher education.
          </p>
        </div>

        <div className="auth-testimonial">
          <p>
            "CampusFlow AI reduced our department's circular dispatch and exam coordination
            time by over 75% in our first semester."
          </p>
          <div className="testimonial-author">
            <div className="testimonial-avatar">DR</div>
            <div className="testimonial-info">
              <h5>Dr. Arthur Vance</h5>
              <span>Dean of Academic Affairs</span>
            </div>
          </div>
        </div>
      </div>

      {/* Form Side */}
      <div className="auth-form-side">
        <div className="auth-form-card">
          <div className="auth-form-header">
            <h2>Create Your Account</h2>
            <p>
              Already registered? <Link to="/login">Sign in here</Link>
            </p>
          </div>

          {error && (
            <div className="auth-alert-error">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <div className="form-input-wrapper">
                <User size={18} className="form-input-icon" />
                <input
                  type="text"
                  required
                  placeholder="Prof. or Student Name"
                  className="form-input"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
            </div>

            {/* Email */}
            <div className="form-group">
              <label className="form-label">Institutional / Primary Email</label>
              <div className="form-input-wrapper">
                <Mail size={18} className="form-input-icon" />
                <input
                  type="email"
                  required
                  placeholder="your.name@institution.edu"
                  className="form-input"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            {/* Role Selector Cards */}
            <div className="form-group">
              <label className="form-label">Select Your Primary Role</label>
              <div className="role-cards-grid">
                <div
                  className={`role-card-option ${formData.role === 'student' ? 'selected' : ''}`}
                  onClick={() => setFormData({ ...formData, role: 'student' })}
                >
                  <BookOpen size={20} className="role-card-icon" />
                  <div className="role-card-name">Student</div>
                </div>

                <div
                  className={`role-card-option ${formData.role === 'educator' ? 'selected' : ''}`}
                  onClick={() => setFormData({ ...formData, role: 'educator' })}
                >
                  <GraduationCap size={20} className="role-card-icon" />
                  <div className="role-card-name">Educator</div>
                </div>

                <div
                  className={`role-card-option ${formData.role === 'admin' ? 'selected' : ''}`}
                  onClick={() => setFormData({ ...formData, role: 'admin' })}
                >
                  <Building2 size={20} className="role-card-icon" />
                  <div className="role-card-name">Administrator</div>
                </div>
              </div>
            </div>

            {/* Institution (Optional) */}
            <div className="form-group">
              <label className="form-label">Institution / College Name (Optional)</label>
              <div className="form-input-wrapper">
                <Building size={18} className="form-input-icon" />
                <input
                  type="text"
                  placeholder="e.g. Stanford University or MIT"
                  className="form-input"
                  value={formData.institution}
                  onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="form-input-wrapper">
                <Lock size={18} className="form-input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="At least 8 characters"
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

              {formData.password && (
                <>
                  <div className="password-strength-bar">
                    <div className={`password-strength-fill strength-${passStrength.strength}`} />
                  </div>
                  <span style={{ fontSize: '0.75rem', color: '#64748B', marginTop: 4, display: 'block' }}>
                    {passStrength.label}
                  </span>
                </>
              )}
            </div>

            {/* Confirm Password */}
            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <div className="form-input-wrapper">
                <Lock size={18} className="form-input-icon" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  placeholder="Re-enter your password"
                  className="form-input"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="form-group">
              <label className="form-checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.agreeTerms}
                  onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                />
                <span style={{ fontSize: '0.85rem' }}>
                  I agree to the <Link to="/terms" style={{ color: '#4F46E5', fontWeight: 600 }}>Terms of Service</Link> and <Link to="/privacy" style={{ color: '#4F46E5', fontWeight: 600 }}>Privacy Policy</Link>
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.85rem' }}
            >
              {loading ? 'Creating Account...' : 'Create Account'} <ArrowRight size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
