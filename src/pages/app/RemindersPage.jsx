import React, { useState } from 'react';
import {
  Bell,
  Plus,
  Clock,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  Send,
  Trash2
} from 'lucide-react';
import { upcomingReminders } from '../../utils/sampleData';

export default function RemindersPage() {
  const [reminders, setReminders] = useState([
    ...upcomingReminders,
    { id: 101, title: 'Final Project Submission Cutoff', date: 'Dec 02, 11:59 PM', priority: 'high' },
    { id: 102, title: 'Senate Curriculum Meeting', date: 'Dec 05, 10:00 AM', priority: 'medium' }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newPriority, setNewPriority] = useState('medium');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newTitle) return;

    setReminders([
      {
        id: Date.now(),
        title: newTitle,
        date: newDate || 'Dec 10, 5:00 PM',
        priority: newPriority
      },
      ...reminders
    ]);

    setNewTitle('');
    setNewDate('');
    setShowAddModal(false);
  };

  const handleDelete = (id) => {
    setReminders(reminders.filter((r) => r.id !== id));
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>Intelligent Reminders</h2>
          <p style={{ color: '#64748B', fontSize: '0.92rem' }}>
            Autonomous academic alerts, deadline tracking, and notification schedules.
          </p>
        </div>

        <button onClick={() => setShowAddModal(true)} className="btn btn-primary">
          <Plus size={18} /> Schedule New Reminder
        </button>
      </div>

      {/* Reminders List */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
        {reminders.map((rem) => (
          <div key={rem.id} className="card-white" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <div style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: rem.priority === 'high' ? '#FEE2E2' : '#EFF6FF',
                  color: rem.priority === 'high' ? '#DC2626' : '#2563EB',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Bell size={18} />
                </div>

                <span style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '4px',
                  background: rem.priority === 'high' ? '#FEE2E2' : '#F1F5F9',
                  color: rem.priority === 'high' ? '#DC2626' : '#64748B'
                }}>
                  {rem.priority} Priority
                </span>
              </div>

              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#1E293B', marginBottom: '0.5rem' }}>
                {rem.title}
              </h4>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#64748B', fontSize: '0.85rem' }}>
                <Clock size={14} />
                <span>Trigger Scheduled: {rem.date}</span>
              </div>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '1.5rem',
              paddingTop: '1rem',
              borderTop: '1px solid #E2E8F0'
            }}>
              <span style={{ fontSize: '0.78rem', color: '#10B981', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <CheckCircle2 size={14} /> Queued
              </span>

              <button
                onClick={() => handleDelete(rem.id)}
                className="btn btn-outline-dark btn-sm"
                style={{ color: '#EF4444', padding: '0.3rem 0.5rem' }}
                title="Delete reminder"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Reminder Modal */}
      {showAddModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1.5rem'
        }}>
          <div className="card-white" style={{ maxWidth: '480px', width: '100%', padding: '2rem' }}>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              Schedule Reminder
            </h3>
            <p style={{ color: '#64748B', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
              Define the reminder title, execution date, and urgency level.
            </p>

            <form onSubmit={handleAdd}>
              <div className="form-group">
                <label className="form-label">Reminder Title / Milestone</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lab Report Submission Due"
                  className="form-input form-input-no-icon"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Due Date & Time</label>
                <input
                  type="text"
                  placeholder="e.g. Tomorrow, 11:59 PM"
                  className="form-input form-input-no-icon"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Priority</label>
                <select
                  className="form-input form-input-no-icon"
                  value={newPriority}
                  onChange={(e) => setNewPriority(e.target.value)}
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority (Urgent)</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="btn btn-outline-dark"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
