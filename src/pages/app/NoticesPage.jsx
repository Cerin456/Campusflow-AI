import React, { useState } from 'react';
import {
  FileText,
  Sparkles,
  Send,
  Eye,
  CheckCircle2,
  Copy,
  Download,
  Calendar,
  Building
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function NoticesPage() {
  const { user } = useAuth();
  const [promptInput, setPromptInput] = useState('');
  const [generating, setGenerating] = useState(false);
  const [generatedNotice, setGeneratedNotice] = useState(null);

  const [publishedNotices, setPublishedNotices] = useState([
    {
      id: 1,
      refNo: 'CF/ACAD/2024/089',
      title: 'Final Examination Schedule - Autumn Semester 2024',
      date: 'Nov 20, 2024',
      audience: 'All Undergraduate Students',
      status: 'Published'
    },
    {
      id: 2,
      refNo: 'CF/FAC/2024/044',
      title: 'Mandatory Submission of Mid-Term Continuous Assessment Marks',
      date: 'Nov 18, 2024',
      audience: 'All Teaching Faculty',
      status: 'Published'
    },
    {
      id: 3,
      refNo: 'CF/ADMIN/2024/012',
      title: 'Winter Vacation Campus Access Guidelines',
      date: 'Nov 15, 2024',
      audience: 'Students, Staff & Research Scholars',
      status: 'Archived'
    }
  ]);

  const handleGenerateNotice = (e) => {
    e.preventDefault();
    if (!promptInput.trim()) return;

    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setGeneratedNotice({
        refNo: `CF/${new Date().getFullYear()}/${Math.floor(100 + Math.random() * 900)}`,
        title: promptInput.length > 50 ? promptInput.slice(0, 50) + '...' : promptInput,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        institution: user?.institution || 'CampusFlow Academic Institute',
        body: `This is an official communication regarding: "${promptInput}". All students and faculty members concerned are hereby instructed to review the requirements. Relevant departmental coordinators have been notified to ensure compliance with institutional regulations.`,
        signatory: `${user?.name || 'Academic Registrar'}\nOffice of Academic Affairs`
      });
    }, 1000);
  };

  const handlePublish = () => {
    if (!generatedNotice) return;
    setPublishedNotices([
      {
        id: Date.now(),
        refNo: generatedNotice.refNo,
        title: generatedNotice.title,
        date: generatedNotice.date,
        audience: 'Campus Community',
        status: 'Published'
      },
      ...publishedNotices
    ]);
    setGeneratedNotice(null);
    setPromptInput('');
  };

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>Smart Notice Generation</h2>
        <p style={{ color: '#64748B', fontSize: '0.92rem' }}>
          Convert shorthand prompts, meeting notes, or syllabi into institutional-standard formatted notices in seconds.
        </p>
      </div>

      {/* Generator Prompt Box */}
      <div className="card-white" style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Sparkles size={20} color="#4F46E5" /> AI Notice Generator
        </h3>
        <p style={{ color: '#64748B', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
          Enter instructions (e.g. "Draft circular announcing library extended hours during exam week from Dec 1 to Dec 15 with quiet hours policy"):
        </p>

        <form onSubmit={handleGenerateNotice}>
          <textarea
            rows={3}
            required
            placeholder="Type notice requirements or paste rough bulletin text..."
            className="form-input form-input-no-icon"
            style={{ marginBottom: '1rem', resize: 'vertical' }}
            value={promptInput}
            onChange={(e) => setPromptInput(e.target.value)}
          />

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
            <button
              type="submit"
              disabled={generating}
              className="btn btn-primary"
            >
              {generating ? 'Drafting Notice...' : 'Generate Official Notice'} <Sparkles size={16} />
            </button>
          </div>
        </form>
      </div>

      {/* Generated Notice Live Preview */}
      {generatedNotice && (
        <div className="card-white" style={{
          marginBottom: '2rem',
          border: '2px solid #6366F1',
          background: '#FAFAFE',
          padding: '2.5rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid #E2E8F0', paddingBottom: '1rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#4F46E5', textTransform: 'uppercase' }}>
              Preview Draft • Generated via AI
            </span>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button onClick={handlePublish} className="btn btn-primary btn-sm">
                <Send size={14} /> Publish & Broadcast
              </button>
              <button onClick={() => setGeneratedNotice(null)} className="btn btn-outline-dark btn-sm">
                Discard
              </button>
            </div>
          </div>

          {/* Formatted Official Memo Layout */}
          <div style={{ maxWidth: '680px', margin: '0 auto', background: '#FFFFFF', padding: '2.5rem', borderRadius: '8px', border: '1px solid #CBD5E1', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <div style={{ textAlign: 'center', borderBottom: '2px solid #0F172A', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#0F172A' }}>
                {generatedNotice.institution}
              </h2>
              <div style={{ fontSize: '0.85rem', color: '#64748B', fontWeight: 600 }}>OFFICE OF ACADEMIC AFFAIRS</div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 600, color: '#475569', marginBottom: '1.5rem' }}>
              <span>Ref No: {generatedNotice.refNo}</span>
              <span>Date: {generatedNotice.date}</span>
            </div>

            <h4 style={{ textAlign: 'center', textDecoration: 'underline', fontSize: '1.05rem', fontWeight: 800, marginBottom: '1.5rem', color: '#0F172A' }}>
              CIRCULAR / NOTICE: {generatedNotice.title}
            </h4>

            <p style={{ fontSize: '0.95rem', lineHeight: '1.8', color: '#334155', marginBottom: '2.5rem' }}>
              {generatedNotice.body}
            </p>

            <div style={{ textAlign: 'right', fontSize: '0.88rem', fontWeight: 700, color: '#1E293B', whiteSpace: 'pre-line' }}>
              {generatedNotice.signatory}
            </div>
          </div>
        </div>
      )}

      {/* Published Notices History Table */}
      <div className="card-white">
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.25rem' }}>
          Published Circulars & Notice Archive
        </h3>

        <div className="table-responsive">
          <table className="cf-table">
            <thead>
              <tr>
                <th>Reference No</th>
                <th>Title / Subject</th>
                <th>Date</th>
                <th>Target Audience</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {publishedNotices.map((n) => (
                <tr key={n.id}>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 600 }}>{n.refNo}</td>
                  <td><strong>{n.title}</strong></td>
                  <td style={{ color: '#64748B' }}>{n.date}</td>
                  <td style={{ color: '#475569' }}>{n.audience}</td>
                  <td>
                    <span className="badge-status completed">{n.status}</span>
                  </td>
                  <td>
                    <button className="btn btn-outline-dark btn-sm" style={{ padding: '0.2rem 0.5rem' }}>
                      <Eye size={14} /> View
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
