import React, { useState } from 'react';
import {
  UsersRound,
  AlertTriangle,
  Send,
  CheckCircle2,
  Filter,
  Download,
  Mail
} from 'lucide-react';

export default function AttendancePage() {
  const [triggeredAlert, setTriggeredAlert] = useState(false);

  const studentRecords = [
    { id: 1, name: 'Liam Davies', roll: 'CS-2022-041', course: 'Algorithms (CS301)', attendance: '68%', status: 'Deficit', parentContact: 'davies.p@domain.com' },
    { id: 2, name: 'Sophia Chen', roll: 'CS-2022-088', course: 'Computer Networks', attendance: '92%', status: 'Satisfactory', parentContact: 'chen.fam@domain.com' },
    { id: 3, name: 'Aarav Sharma', roll: 'CS-2022-019', course: 'Operating Systems', attendance: '71%', status: 'Deficit', parentContact: 'sharma.a@domain.com' },
    { id: 4, name: 'Chloe Dubois', roll: 'CS-2022-104', course: 'Database Engineering', attendance: '85%', status: 'Satisfactory', parentContact: 'dubois.c@domain.com' },
    { id: 5, name: 'Marcus Johnson', roll: 'CS-2022-067', course: 'Algorithms (CS301)', attendance: '64%', status: 'Critical Deficit', parentContact: 'mjohnson.p@domain.com' },
  ];

  const handleTriggerBulkAlerts = () => {
    setTriggeredAlert(true);
    setTimeout(() => {
      setTriggeredAlert(false);
    }, 4000);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>Attendance Automation</h2>
          <p style={{ color: '#64748B', fontSize: '0.92rem' }}>
            Autonomous threshold scanning, deficit detection, and notification dispatch.
          </p>
        </div>

        <button onClick={handleTriggerBulkAlerts} className="btn btn-primary">
          <Send size={16} /> Auto-Dispatch Shortage Notices
        </button>
      </div>

      {triggeredAlert && (
        <div className="auth-alert-success" style={{ marginBottom: '1.5rem' }}>
          <CheckCircle2 size={18} />
          <span>Success: 3 deficit warning letters generated and emailed to students & parent contacts.</span>
        </div>
      )}

      {/* Cohort Stats */}
      <div className="metrics-row-4" style={{ marginBottom: '1.5rem' }}>
        <div className="dashboard-metric-box">
          <div className="metric-box-content">
            <p>Monitored Students</p>
            <h3>1,240</h3>
          </div>
          <div className="metric-box-icon-wrap" style={{ background: '#EEF2FF', color: '#4F46E5' }}>
            <UsersRound size={22} />
          </div>
        </div>

        <div className="dashboard-metric-box">
          <div className="metric-box-content">
            <p>Below 75% Threshold</p>
            <h3 style={{ color: '#DC2626' }}>48</h3>
          </div>
          <div className="metric-box-icon-wrap" style={{ background: '#FEE2E2', color: '#DC2626' }}>
            <AlertTriangle size={22} />
          </div>
        </div>

        <div className="dashboard-metric-box">
          <div className="metric-box-content">
            <p>Average Cohort Attendance</p>
            <h3>86.4%</h3>
          </div>
          <div className="metric-box-icon-wrap" style={{ background: '#ECFDF5', color: '#059669' }}>
            <CheckCircle2 size={22} />
          </div>
        </div>

        <div className="dashboard-metric-box">
          <div className="metric-box-content">
            <p>Automated Follow-ups Sent</p>
            <h3>184</h3>
          </div>
          <div className="metric-box-icon-wrap" style={{ background: '#FEF3C7', color: '#D97706' }}>
            <Mail size={22} />
          </div>
        </div>
      </div>

      {/* Student List */}
      <div className="card-white">
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.25rem' }}>
          Attendance Audit Roster
        </h3>

        <div className="table-responsive">
          <table className="cf-table">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Roll Number</th>
                <th>Enrolled Course</th>
                <th>Current %</th>
                <th>Status</th>
                <th>Parent Notification Contact</th>
              </tr>
            </thead>
            <tbody>
              {studentRecords.map((st) => (
                <tr key={st.id}>
                  <td><strong>{st.name}</strong></td>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem' }}>{st.roll}</td>
                  <td style={{ color: '#475569' }}>{st.course}</td>
                  <td style={{ fontWeight: 700, color: st.status.includes('Deficit') ? '#DC2626' : '#10B981' }}>
                    {st.attendance}
                  </td>
                  <td>
                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      padding: '0.2rem 0.6rem',
                      borderRadius: '6px',
                      background: st.status.includes('Deficit') ? '#FEE2E2' : '#ECFDF5',
                      color: st.status.includes('Deficit') ? '#DC2626' : '#059669'
                    }}>
                      {st.status}
                    </span>
                  </td>
                  <td style={{ color: '#64748B', fontSize: '0.85rem' }}>{st.parentContact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
