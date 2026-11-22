import React, { useState } from 'react';
import {
  Settings,
  User,
  Building,
  Mail,
  Lock,
  Bell,
  CheckCircle2,
  Save,
  Shield
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function SettingsPage() {
  const { user, updateUser } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || 'educator',
    institution: user?.institution || '',
    emailAlerts: true,
    digestAlerts: false
  });

  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    updateUser({
      name: formData.name,
      role: formData.role,
      institution: formData.institution
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div style={{ maxWidth: '780px' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>Account & Workspace Settings</h2>
        <p style={{ color: '#64748B', fontSize: '0.92rem' }}>
          Manage your personal academic identity, institution preferences, and security protocols.
        </p>
      </div>

      {saved && (
        <div className="auth-alert-success" style={{ marginBottom: '1.5rem' }}>
          <CheckCircle2 size={18} />
          <span>Your workspace settings have been successfully updated.</span>
        </div>
      )}

      <form onSubmit={handleSave}>
        {/* Profile Details */}
        <div className="card-white" style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.25rem' }}>
            Academic Profile
          </h3>

          <div className="form-group">
            <label className="form-label">Full Name</label>
            <div className="form-input-wrapper">
              <User size={18} className="form-input-icon" />
              <input
                type="text"
                required
                className="form-input"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Email (Managed by System)</label>
            <div className="form-input-wrapper">
              <Mail size={18} className="form-input-icon" />
              <input
                type="email"
                disabled
                className="form-input"
                style={{ background: '#F1F5F9', color: '#64748B' }}
                value={formData.email}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Institution / College Name</label>
            <div className="form-input-wrapper">
              <Building size={18} className="form-input-icon" />
              <input
                type="text"
                className="form-input"
                value={formData.institution}
                onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Campus Role</label>
            <select
              className="form-input form-input-no-icon"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            >
              <option value="student">Student</option>
              <option value="educator">Educator / Faculty</option>
              <option value="admin">Institutional Administrator</option>
            </select>
          </div>
        </div>

        {/* Notifications */}
        <div className="card-white" style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.25rem' }}>
            Communication Channels
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <label className="form-checkbox-label">
              <input
                type="checkbox"
                checked={formData.emailAlerts}
                onChange={(e) => setFormData({ ...formData, emailAlerts: e.target.checked })}
              />
              <div>
                <strong>Instant Workflow Alerts</strong>
                <p style={{ fontSize: '0.82rem', color: '#64748B' }}>Notify immediately when an automated notice or reminder is triggered.</p>
              </div>
            </label>

            <label className="form-checkbox-label">
              <input
                type="checkbox"
                checked={formData.digestAlerts}
                onChange={(e) => setFormData({ ...formData, digestAlerts: e.target.checked })}
              />
              <div>
                <strong>Daily Activity Summary</strong>
                <p style={{ fontSize: '0.82rem', color: '#64748B' }}>Receive a consolidated status report every morning.</p>
              </div>
            </label>
          </div>
        </div>

        <button type="submit" className="btn btn-primary btn-lg">
          <Save size={18} /> Save Settings
        </button>
      </form>
    </div>
  );
}
