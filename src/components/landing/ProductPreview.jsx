import React, { useState } from 'react';
import {
  Workflow,
  Zap,
  Clock,
  CheckCircle2,
  Bell,
  Search,
  ArrowUpRight,
  FileText,
  Mail,
  ShieldCheck,
  Calendar,
  AlertCircle
} from 'lucide-react';
import {
  dashboardStats,
  recentAutomations,
  upcomingReminders,
  workflowChartData
} from '../../utils/sampleData';

export default function ProductPreview() {
  const [activeTab, setActiveTab] = useState('overview');

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return <span className="badge-status completed">Completed</span>;
      case 'active':
        return <span className="badge-status active">Running</span>;
      case 'processing':
        return <span className="badge-status processing">Processing</span>;
      default:
        return <span className="badge-status">{status}</span>;
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'notice':
        return <FileText size={16} />;
      case 'reminder':
        return <Bell size={16} />;
      case 'email':
        return <Mail size={16} />;
      default:
        return <Workflow size={16} />;
    }
  };

  return (
    <section className="section product-preview-section" id="product-preview">
      <div className="container">
        {/* Section Header */}
        <div className="section-header animate-on-scroll">
          <div className="section-badge section-badge-indigo">
            <span>Realistic Product UI</span>
          </div>
          <h2 className="section-title">
            Built for Real-World Campus Operations.
          </h2>
          <p className="section-subtitle">
            Explore the live interface. Monitor real-time triggers, trace automated actions,
            and inspect scheduled notifications in one consolidated command center.
          </p>
        </div>

        {/* Live Reusable Dashboard Mock */}
        <div className="live-dashboard-preview animate-on-scroll">
          {/* Top Window Bar */}
          <div className="preview-topbar">
            <div className="preview-topbar-left">
              <div className="window-dots">
                <div className="window-dot red" />
                <div className="window-dot yellow" />
                <div className="window-dot green" />
              </div>
              <div className="preview-app-title">
                <Workflow size={18} color="#818CF8" />
                <span>CampusFlow AI Console</span>
              </div>
              <div className="preview-search-mock">
                <Search size={14} />
                <span>Search workflows, documents, templates...</span>
              </div>
            </div>

            <div className="preview-topbar-right">
              <div className="status-indicator-live">
                <span className="pill-dot" style={{ width: 6, height: 6 }} />
                <span>Engine Active</span>
              </div>
              <div style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #4F46E5, #06B6D4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: '#FFF'
              }}>
                AD
              </div>
            </div>
          </div>

          {/* Body Content of Preview */}
          <div className="preview-dashboard-body">
            {/* 4 Statistics Tiles */}
            <div className="preview-stat-cards-grid">
              <div className="dashboard-stat-tile">
                <div className="stat-tile-info">
                  <p>Total Workflows</p>
                  <h3>{dashboardStats.totalWorkflows}</h3>
                  <div className="stat-tile-trend">
                    <ArrowUpRight size={14} /> +12% this month
                  </div>
                </div>
                <div className="stat-tile-icon">
                  <Workflow size={22} />
                </div>
              </div>

              <div className="dashboard-stat-tile">
                <div className="stat-tile-info">
                  <p>Active Automations</p>
                  <h3>{dashboardStats.activeAutomations}</h3>
                  <div className="stat-tile-trend" style={{ color: '#60A5FA' }}>
                    <Zap size={14} /> Live tracking
                  </div>
                </div>
                <div className="stat-tile-icon" style={{ color: '#60A5FA', background: 'rgba(59, 130, 246, 0.15)' }}>
                  <Zap size={22} />
                </div>
              </div>

              <div className="dashboard-stat-tile">
                <div className="stat-tile-info">
                  <p>Pending Tasks</p>
                  <h3>{dashboardStats.pendingTasks}</h3>
                  <div className="stat-tile-trend" style={{ color: '#FBBF24' }}>
                    <Clock size={14} /> Requires review: 2
                  </div>
                </div>
                <div className="stat-tile-icon" style={{ color: '#FBBF24', background: 'rgba(245, 158, 11, 0.15)' }}>
                  <Clock size={22} />
                </div>
              </div>

              <div className="dashboard-stat-tile">
                <div className="stat-tile-info">
                  <p>Success Rate</p>
                  <h3>{dashboardStats.completionRate}%</h3>
                  <div className="stat-tile-trend" style={{ color: '#34D399' }}>
                    <ShieldCheck size={14} /> Zero dropped actions
                  </div>
                </div>
                <div className="stat-tile-icon" style={{ color: '#34D399', background: 'rgba(16, 185, 129, 0.15)' }}>
                  <CheckCircle2 size={22} />
                </div>
              </div>
            </div>

            {/* Split Section: Chart & Recent Automations */}
            <div className="preview-two-columns">
              {/* Chart Panel */}
              <div className="dashboard-card-panel">
                <div className="panel-header">
                  <div>
                    <h4>Weekly Automation Throughput</h4>
                    <span style={{ fontSize: '0.75rem', color: '#64748B' }}>
                      Automated execution volume over the last 7 days
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem' }}>
                    <span style={{ color: '#818CF8', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <span style={{ width: 8, height: 8, borderRadius: 2, background: '#6366F1' }} />
                      Completed
                    </span>
                    <span style={{ color: '#EF4444', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <span style={{ width: 8, height: 8, borderRadius: 2, background: '#EF4444' }} />
                      Issues
                    </span>
                  </div>
                </div>

                {/* Real interactive bar rendering */}
                <div className="chart-bars-interactive">
                  {workflowChartData.map((d, i) => {
                    const total = d.completed + d.failed;
                    const heightPercent = Math.min(100, (total / 25) * 100);
                    return (
                      <div className="chart-bar-group" key={i}>
                        <div className="bar-stack" style={{ height: `${heightPercent}%` }}>
                          <div
                            className="bar-segment-success"
                            style={{ height: `${(d.completed / total) * 100}%` }}
                            title={`${d.completed} completed`}
                          />
                        </div>
                        <span className="chart-day-label">{d.day}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Recent Automations List */}
              <div className="dashboard-card-panel">
                <div className="panel-header">
                  <h4>Recent Automation Events</h4>
                  <span style={{ fontSize: '0.75rem', color: '#818CF8', cursor: 'pointer' }}>
                    View All &rarr;
                  </span>
                </div>

                <div className="recent-automations-list">
                  {recentAutomations.slice(0, 4).map((item) => (
                    <div className="automation-row-item" key={item.id}>
                      <div className="item-left-desc">
                        <div className="item-icon-circle">
                          {getTypeIcon(item.type)}
                        </div>
                        <div className="item-meta">
                          <h5>{item.name}</h5>
                          <span>Triggered {item.time}</span>
                        </div>
                      </div>
                      <div>
                        {getStatusBadge(item.status)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Upcoming Reminders Ribbon inside preview */}
            <div style={{
              marginTop: '1.5rem',
              padding: '1.25rem 1.5rem',
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Calendar size={18} color="#06B6D4" />
                <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#FFF' }}>
                  Next Scheduled Trigger:
                </span>
                <span style={{ fontSize: '0.88rem', color: '#94A3B8' }}>
                  {upcomingReminders[0]?.title} ({upcomingReminders[0]?.date})
                </span>
              </div>
              <div style={{
                fontSize: '0.75rem',
                background: 'rgba(239, 68, 68, 0.15)',
                color: '#F87171',
                padding: '0.2rem 0.65rem',
                borderRadius: '999px',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}>
                <AlertCircle size={12} /> High Priority Action
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
