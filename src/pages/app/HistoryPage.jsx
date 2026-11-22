import React, { useState } from 'react';
import {
  History,
  CheckCircle2,
  AlertCircle,
  Clock,
  Filter,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export default function HistoryPage() {
  const [filter, setFilter] = useState('all');

  const historyEvents = [
    { id: 1, action: 'Exam Timetable PDF Parsed', category: 'Document Intelligence', timestamp: 'Today at 10:45 AM', duration: '1.2s', status: 'Success', details: '18 exam schedules mapped to Google Calendar & notices.' },
    { id: 2, action: 'Fee Deadline Reminder Broadcast', category: 'Notifications', timestamp: 'Today at 09:00 AM', duration: '4.8s', status: 'Success', details: 'Delivered to 840 student email inboxes without bounce.' },
    { id: 3, action: 'Attendance Threshold Warning Dispatch', category: 'Attendance', timestamp: 'Yesterday at 04:30 PM', duration: '3.1s', status: 'Success', details: '48 parent letters dispatched with registered tracking.' },
    { id: 4, action: 'Sync LMS Grades to Department Archive', category: 'Integration', timestamp: 'Nov 19, 2024 at 11:15 PM', duration: '8.4s', status: 'Success', details: 'Continuous assessment records archived under SOC-2 policy.' },
    { id: 5, action: 'Library Overdue Book Notice Batch', category: 'Reminders', timestamp: 'Nov 18, 2024 at 02:00 PM', duration: '2.0s', status: 'Success', details: '112 automated SMS and email reminders distributed.' }
  ];

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>Workflow Execution History</h2>
        <p style={{ color: '#64748B', fontSize: '0.92rem' }}>
          Comprehensive immutable audit trail of automated actions and institutional events.
        </p>
      </div>

      <div className="card-white">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10B981', fontWeight: 600, fontSize: '0.9rem' }}>
            <ShieldCheck size={20} />
            <span>Audit Log Integrity Verified • 100% Traceability</span>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="btn btn-outline-dark btn-sm">Export Audit Log (CSV)</button>
          </div>
        </div>

        <div className="table-responsive">
          <table className="cf-table">
            <thead>
              <tr>
                <th>Event Action</th>
                <th>Category</th>
                <th>Timestamp</th>
                <th>Duration</th>
                <th>Outcome</th>
                <th>Audit Details</th>
              </tr>
            </thead>
            <tbody>
              {historyEvents.map((ev) => (
                <tr key={ev.id}>
                  <td><strong>{ev.action}</strong></td>
                  <td>
                    <span style={{ fontSize: '0.8rem', background: '#F1F5F9', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>
                      {ev.category}
                    </span>
                  </td>
                  <td style={{ color: '#64748B', fontSize: '0.85rem' }}>{ev.timestamp}</td>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#64748B' }}>{ev.duration}</td>
                  <td>
                    <span className="badge-status completed">
                      {ev.status}
                    </span>
                  </td>
                  <td style={{ color: '#475569', fontSize: '0.85rem' }}>{ev.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
