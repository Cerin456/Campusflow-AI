import React from 'react';
import { Link } from 'react-router-dom';
import {
  Workflow,
  Zap,
  Clock,
  CheckCircle2,
  Bell,
  ArrowUpRight,
  Plus,
  FileText,
  UploadCloud,
  Calendar,
  AlertCircle,
  MoreVertical
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import {
  dashboardStats,
  recentAutomations,
  upcomingReminders,
  workflowChartData
} from '../../utils/sampleData';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div>
      {/* Welcome & Quick Action Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.25rem' }}>
            Welcome back, {user?.name || 'Faculty Member'} 👋
          </h2>
          <p style={{ color: '#64748B', fontSize: '0.95rem' }}>
            Here is your live automation summary for <strong>{user?.institution || 'Campus Operations'}</strong>.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Link to="/app/automations" className="btn btn-primary btn-sm">
            <Plus size={16} /> New Automation
          </Link>
          <Link to="/app/notices" className="btn btn-outline-dark btn-sm">
            <FileText size={16} /> Generate Notice
          </Link>
          <Link to="/app/documents" className="btn btn-outline-dark btn-sm">
            <UploadCloud size={16} /> Upload Document
          </Link>
        </div>
      </div>

      {/* 4 Primary Stats Cards */}
      <div className="metrics-row-4">
        <div className="dashboard-metric-box">
          <div className="metric-box-content">
            <p>Total Workflows</p>
            <h3>{dashboardStats.totalWorkflows}</h3>
            <div className="metric-box-trend trend-up">
              <ArrowUpRight size={14} /> +12% from last term
            </div>
          </div>
          <div className="metric-box-icon-wrap" style={{ background: '#EEF2FF', color: '#4F46E5' }}>
            <Workflow size={24} />
          </div>
        </div>

        <div className="dashboard-metric-box">
          <div className="metric-box-content">
            <p>Active Automations</p>
            <h3>{dashboardStats.activeAutomations}</h3>
            <div className="metric-box-trend" style={{ color: '#2563EB' }}>
              <Zap size={14} /> Running in background
            </div>
          </div>
          <div className="metric-box-icon-wrap" style={{ background: '#EFF6FF', color: '#2563EB' }}>
            <Zap size={24} />
          </div>
        </div>

        <div className="dashboard-metric-box">
          <div className="metric-box-content">
            <p>Pending Tasks</p>
            <h3>{dashboardStats.pendingTasks}</h3>
            <div className="metric-box-trend" style={{ color: '#D97706' }}>
              <Clock size={14} /> Awaiting approval: 2
            </div>
          </div>
          <div className="metric-box-icon-wrap" style={{ background: '#FEF3C7', color: '#D97706' }}>
            <Clock size={24} />
          </div>
        </div>

        <div className="dashboard-metric-box">
          <div className="metric-box-content">
            <p>Execution Accuracy</p>
            <h3>{dashboardStats.completionRate}%</h3>
            <div className="metric-box-trend trend-up">
              <CheckCircle2 size={14} /> 99.8% SLA delivery
            </div>
          </div>
          <div className="metric-box-icon-wrap" style={{ background: '#ECFDF5', color: '#059669' }}>
            <CheckCircle2 size={24} />
          </div>
        </div>
      </div>

      {/* Two Columns: Throughput Chart & Recent Automations */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 0.9fr', gap: '1.5rem', marginBottom: '2rem' }}>
        {/* Weekly Chart */}
        <div className="card-white">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Workflow Execution Throughput</h3>
              <p style={{ fontSize: '0.82rem', color: '#64748B' }}>Daily successful automated actions vs exceptions</p>
            </div>
            <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', fontWeight: 600 }}>
              <span style={{ color: '#4F46E5', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, background: '#4F46E5' }} /> Completed
              </span>
              <span style={{ color: '#EF4444', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, background: '#EF4444' }} /> Retried
              </span>
            </div>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            height: '210px',
            paddingTop: '2rem',
            borderBottom: '1px solid #E2E8F0',
            paddingBottom: '0.5rem'
          }}>
            {workflowChartData.map((item, idx) => {
              const maxVal = 25;
              const total = item.completed + item.failed;
              const heightPercent = Math.min(100, (total / maxVal) * 100);
              return (
                <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                  <div style={{
                    width: '36px',
                    height: `${heightPercent}%`,
                    background: '#F1F5F9',
                    borderRadius: '6px 6px 0 0',
                    display: 'flex',
                    flexDirection: 'column-reverse',
                    overflow: 'hidden'
                  }}>
                    <div
                      style={{
                        height: `${(item.completed / total) * 100}%`,
                        background: 'linear-gradient(180deg, #6366F1 0%, #4F46E5 100%)',
                        width: '100%'
                      }}
                      title={`${item.completed} completed`}
                    />
                  </div>
                  <span style={{ fontSize: '0.78rem', color: '#64748B', marginTop: '0.5rem', fontWeight: 600 }}>
                    {item.day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Reminders Widget */}
        <div className="card-white">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Upcoming Reminders</h3>
            <Link to="/app/reminders" style={{ fontSize: '0.8rem', color: '#4F46E5', fontWeight: 600 }}>
              View Schedule &rarr;
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {upcomingReminders.map((rem) => (
              <div
                key={rem.id}
                style={{
                  padding: '0.85rem 1rem',
                  border: '1px solid #E2E8F0',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    width: 34,
                    height: 34,
                    borderRadius: 8,
                    background: rem.priority === 'high' ? '#FEE2E2' : '#FEF3C7',
                    color: rem.priority === 'high' ? '#DC2626' : '#D97706',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Bell size={16} />
                  </div>
                  <div>
                    <h5 style={{ fontSize: '0.88rem', fontWeight: 700, color: '#1E293B', marginBottom: 2 }}>
                      {rem.title}
                    </h5>
                    <span style={{ fontSize: '0.75rem', color: '#64748B' }}>
                      {rem.date}
                    </span>
                  </div>
                </div>

                <span style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  padding: '0.2rem 0.5rem',
                  borderRadius: '4px',
                  background: rem.priority === 'high' ? '#FEE2E2' : '#F1F5F9',
                  color: rem.priority === 'high' ? '#DC2626' : '#64748B'
                }}>
                  {rem.priority}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Automations Table */}
      <div className="card-white">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Recent Automation Triggers</h3>
            <p style={{ fontSize: '0.82rem', color: '#64748B' }}>Audit trail of dispatched circulars and scheduled syncs</p>
          </div>
          <Link to="/app/history" className="btn btn-outline-dark btn-sm">
            Full Audit History
          </Link>
        </div>

        <div className="table-responsive">
          <table className="cf-table">
            <thead>
              <tr>
                <th>Workflow Name</th>
                <th>Type</th>
                <th>Execution Time</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {recentAutomations.map((item) => (
                <tr key={item.id}>
                  <td>
                    <strong>{item.name}</strong>
                  </td>
                  <td>
                    <span style={{
                      textTransform: 'capitalize',
                      fontSize: '0.8rem',
                      background: '#F1F5F9',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '6px'
                    }}>
                      {item.type}
                    </span>
                  </td>
                  <td style={{ color: '#64748B' }}>{item.time}</td>
                  <td>
                    <span className={`badge-status ${item.status}`}>
                      {item.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-outline-dark btn-sm" style={{ padding: '0.25rem 0.65rem' }}>
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
