import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Mail,
  Lock,
  KeyRound,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Zap
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { validateEmail, validatePassword } from '../../utils/validators';

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const { forgotPassword, resetPassword } = useAuth();

  const [step, setStep] = useState(1); // 1 = Request, 2 = Verify Code, 3 = New Password, 4 = Success
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // Step 1: Send Code
  const handleRequestCode = async (e) => {
    e.preventDefault();
    setError('');
    if (!validateEmail(email)) {
      setError('Please provide a valid email address.');
      return;
    }

    setLoading(true);
    try {
      const result = await forgotPassword(email);
      if (result.success) {
        setSuccessMsg(`Recovery code sent! For this demo, use: ${result.code || '123456'}`);
        setStep(2);
      } else {
        setError(result.error || 'Failed to dispatch recovery code.');
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify Code
  const handleVerifyCode = (e) => {
    e.preventDefault();
    setError('');
    if (!code || code.trim().length < 4) {
      setError('Please enter a valid recovery code.');
      return;
    }
    // Proceed to Step 3 (password reset)
    setStep(3);
    setSuccessMsg('Code verified! Please specify your new password.');
  };

  // Step 3: Set New Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');

    const validation = validatePassword(newPassword);
    if (!validation.isValid) {
      setError(validation.errors[0] || 'Password does not meet complexity rules.');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const result = await resetPassword(email, code, newPassword);
      if (result.success) {
        setStep(4);
      } else {
        setError(result.error || 'Failed to update password.');
      }
    } catch {
      setError('An error occurred during password update.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      {/* Brand Side */}
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
            <span>Account Security</span>
          </div>
          <h2>Reset Your Password Swiftly & Securely.</h2>
          <p>
            Enter your registered institutional email to receive a secure single-use recovery code.
          </p>
        </div>

        <div style={{ color: '#94A3B8', fontSize: '0.85rem' }}>
          Questions? Contact <a href="mailto:support@campusflow.ai" style={{ color: '#818CF8' }}>support@campusflow.ai</a>
        </div>
      </div>

      {/* Form Side */}
      <div className="auth-form-side">
        <div className="auth-form-card">
          <div className="auth-form-header">
            <h2>Account Recovery</h2>
            <p>
              Remembered your credentials? <Link to="/login">Sign in</Link>
            </p>
          </div>

          {error && (
            <div className="auth-alert-error">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          {successMsg && step !== 4 && (
            <div className="auth-alert-success">
              <CheckCircle2 size={18} />
              <span>{successMsg}</span>
            </div>
          )}

          {/* STEP 1: Enter Email */}
          {step === 1 && (
            <form onSubmit={handleRequestCode}>
              <div className="form-group">
                <label className="form-label">Registered Institutional Email</label>
                <div className="form-input-wrapper">
                  <Mail size={18} className="form-input-icon" />
                  <input
                    type="email"
                    required
                    placeholder="name@university.edu"
                    className="form-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
                style={{ width: '100%', padding: '0.85rem' }}
              >
                {loading ? 'Sending Code...' : 'Send Recovery Code'} <ArrowRight size={18} />
              </button>
            </form>
          )}

          {/* STEP 2: Enter Verification Code */}
          {step === 2 && (
            <form onSubmit={handleVerifyCode}>
              <div className="form-group">
                <label className="form-label">Enter 6-Digit Verification Code</label>
                <div className="form-input-wrapper">
                  <KeyRound size={18} className="form-input-icon" />
                  <input
                    type="text"
                    required
                    maxLength={8}
                    placeholder="e.g. 123456"
                    className="form-input"
                    style={{ letterSpacing: '0.2em', fontWeight: 700 }}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', padding: '0.85rem', marginBottom: '0.75rem' }}
              >
                Verify Code <ArrowRight size={18} />
              </button>

              <button
                type="button"
                onClick={() => setStep(1)}
                className="btn btn-outline-dark"
                style={{ width: '100%' }}
              >
                <ArrowLeft size={16} /> Re-enter Email
              </button>
            </form>
          )}

          {/* STEP 3: Enter New Password */}
          {step === 3 && (
            <form onSubmit={handleResetPassword}>
              <div className="form-group">
                <label className="form-label">New Password</label>
                <div className="form-input-wrapper">
                  <Lock size={18} className="form-input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="At least 8 characters"
                    className="form-input"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="password-toggle-btn"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Confirm New Password</label>
                <div className="form-input-wrapper">
                  <Lock size={18} className="form-input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Re-enter new password"
                    className="form-input"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
                style={{ width: '100%', padding: '0.85rem' }}
              >
                {loading ? 'Updating Password...' : 'Save New Password'} <ArrowRight size={18} />
              </button>
            </form>
          )}

          {/* STEP 4: Success Message */}
          {step === 4 && (
            <div style={{ textAlign: 'center', padding: '1rem 0' }}>
              <div style={{
                width: 60,
                height: 60,
                background: '#D1FAE5',
                color: '#059669',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem auto'
              }}>
                <CheckCircle2 size={32} />
              </div>

              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                Password Updated!
              </h3>
              <p style={{ color: '#64748B', fontSize: '0.92rem', marginBottom: '2rem' }}>
                Your password has been successfully reset. You can now log into your CampusFlow AI account.
              </p>

              <Link to="/login" className="btn btn-primary" style={{ width: '100%' }}>
                Proceed to Login <ArrowRight size={16} />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
