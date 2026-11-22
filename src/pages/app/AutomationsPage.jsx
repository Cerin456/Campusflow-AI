import React, { useState } from 'react';
import {
  Workflow,
  Plus,
  Play,
  Pause,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Filter,
  ArrowRight,
  Zap,
  Clock,
  Layers
} from 'lucide-react';

export default function AutomationsPage() {
  const [filter, setFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [workflows, setWorkflows] = useState([
    {
      id: 1,
      name: 'Mid-Semester Exam Notice Pipeline',
      description: 'Auto-extract exam dates from academic calendar and dispatch notices to students & invigilators.',
      trigger: 'Calendar Event: 14 Days Before Exam',
      status: 'active',
      runs: 48,
      lastRun: 'Yesterday at 4:30 PM',
      type: 'notice'
    },
    {
      id: 2,
      name: 'Assignment Cutoff Warning Sequence',
      description: 'Broadcast reminders at 48h, 24h, and 2h before LMS submission portal closes.',
      trigger: 'Deadline Proximity',
      status: 'active',
      runs: 142,
      lastRun: 'Today at 9:00 AM',
      type: 'reminder'
    },
    {
      id: 3,
      name: 'Attendance Shortage Escalate Protocol',
      description: 'Flags students below 75% attendance at the end of each month and alerts advisors.',
      trigger: 'Monthly Schedule (Last Day)',
      status: 'paused',
      runs: 12,
      lastRun: 'Oct 31, 2024',
      type: 'attendance'
    },
    {
      id: 4,
      name: 'Faculty Circular Review & Broadcast',
      description: 'Routes draft dean circulars to HODs for digital signoff before all-hands publishing.',
      trigger: 'New PDF in Document Inbox',
      status: 'active',
      runs: 29,
      lastRun: '3 hours ago',
      type: 'document'
    }
  ]);

  const [newWorkflow, setNewWorkflow] = useState({
    name: '',
    description: '',
    trigger: 'Manual / On-Demand',
    type: 'notice'
  });

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newWorkflow.name) return;

    setWorkflows([
      {
        id: Date.now(),
        ...newWorkflow,
        status: 'active',
        runs: 0,
        lastRun: 'Never',
      },
      ...workflows
    ]);

    setNewWorkflow({ name: '', description: '', trigger: 'Manual / On-Demand', type: 'notice' });
    setShowCreateModal(false);
  };

  const toggleStatus = (id) => {
    setWorkflows(
      workflows.map((wf) =>
        wf.id === id ? { ...wf, status: wf.status === 'active' ? 'paused' : 'active' } : wf
      )
    );
  };

  const filteredWorkflows = workflows.filter((wf) => {
    if (filter === 'active') return wf.status === 'active';
    if (filter === 'paused') return wf.status === 'paused';
    return true;
  });

  return (
    <div>
      {/* Top Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>Workflow Automations</h2>
          <p style={{ color: '#64748B', fontSize: '0.92rem' }}>
            Configure autonomous trigger-and-action sequences for your academic community.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="btn btn-primary"
        >
          <Plus size={18} /> Create New Automation
        </button>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
        {['all', 'active', 'paused'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`btn btn-sm ${filter === tab ? 'btn-primary' : 'btn-outline-dark'}`}
            style={{ textTransform: 'capitalize' }}
          >
            {tab} Workflows
          </button>
        ))}
      </div>

      {/* Workflow Cards Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {filteredWorkflows.map((wf) => (
          <div key={wf.id} className="card-white" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div style={{ maxWidth: '650px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <span className={`badge-status ${wf.status}`}>
                  {wf.status.toUpperCase()}
                </span>
                <span style={{ fontSize: '0.8rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
                  {wf.type} Flow
                </span>
              </div>

              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.4rem', color: '#0F172A' }}>
                {wf.name}
              </h3>

              <p style={{ fontSize: '0.9rem', color: '#64748B', lineHeight: '1.5', marginBottom: '1rem' }}>
                {wf.description}
              </p>

              <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.8rem', color: '#64748B', flexWrap: 'wrap' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Zap size={14} color="#4F46E5" /> <strong>Trigger:</strong> {wf.trigger}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Clock size={14} /> <strong>Last Executed:</strong> {wf.lastRun}
                </span>
                <span>
                  <strong>Runs:</strong> {wf.runs}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <button
                onClick={() => toggleStatus(wf.id)}
                className={`btn btn-sm ${wf.status === 'active' ? 'btn-outline-dark' : 'btn-primary'}`}
              >
                {wf.status === 'active' ? (
                  <>
                    <Pause size={14} /> Pause
                  </>
                ) : (
                  <>
                    <Play size={14} /> Activate
                  </>
                )}
              </button>

              <button
                onClick={() => setWorkflows(workflows.filter((w) => w.id !== wf.id))}
                className="btn btn-outline-dark btn-sm"
                style={{ color: '#EF4444' }}
                title="Delete workflow"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Modal Dialog */}
      {showCreateModal && (
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
          <div className="card-white" style={{ maxWidth: '520px', width: '100%', padding: '2rem' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              Create New Automation
            </h3>
            <p style={{ color: '#64748B', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
              Define the trigger condition and execution target for this workflow.
            </p>

            <form onSubmit={handleCreate}>
              <div className="form-group">
                <label className="form-label">Workflow Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. End Semester Grade Due Notice"
                  className="form-input form-input-no-icon"
                  value={newWorkflow.name}
                  onChange={(e) => setNewWorkflow({ ...newWorkflow, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Description / Instructions</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Explain what information should be processed and who should receive it..."
                  className="form-input form-input-no-icon"
                  value={newWorkflow.description}
                  onChange={(e) => setNewWorkflow({ ...newWorkflow, description: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Trigger Event</label>
                <select
                  className="form-input form-input-no-icon"
                  value={newWorkflow.trigger}
                  onChange={(e) => setNewWorkflow({ ...newWorkflow, trigger: e.target.value })}
                >
                  <option value="Manual / On-Demand">Manual / On-Demand</option>
                  <option value="Calendar Event Proximity">Calendar Event Proximity</option>
                  <option value="Document Upload">Document Upload (AI Parsed)</option>
                  <option value="Recurring Weekly Schedule">Recurring Weekly Schedule</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="btn btn-outline-dark"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Build Automation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
