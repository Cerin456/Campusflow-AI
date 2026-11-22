import React, { useState } from 'react';
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Clock,
  Layers,
  FileCheck
} from 'lucide-react';

export default function DocumentsPage() {
  const [documents, setDocuments] = useState([
    { id: 1, name: 'Faculty_Council_Minutes_Nov2024.pdf', size: '2.4 MB', parsedDate: 'Today', extractedTasks: 4, status: 'Processed' },
    { id: 2, name: 'CS_Autumn_Exam_Timetable_Draft.pdf', size: '1.1 MB', parsedDate: 'Yesterday', extractedTasks: 18, status: 'Processed' },
    { id: 3, name: 'Hostel_Maintenance_Protocol_Memo.pdf', size: '890 KB', parsedDate: 'Nov 14, 2024', extractedTasks: 2, status: 'Processed' }
  ]);

  const [uploading, setUploading] = useState(false);
  const [justUploaded, setJustUploaded] = useState(null);

  const simulateUpload = (e) => {
    e.preventDefault();
    setUploading(true);
    setTimeout(() => {
      const newDoc = {
        id: Date.now(),
        name: 'Curriculum_Revision_Guidelines_2025.pdf',
        size: '3.6 MB',
        parsedDate: 'Just now',
        extractedTasks: 7,
        status: 'Processed'
      };
      setDocuments([newDoc, ...documents]);
      setJustUploaded(newDoc);
      setUploading(false);
    }, 1200);
  };

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>AI Document Intelligence</h2>
        <p style={{ color: '#64748B', fontSize: '0.92rem' }}>
          Upload administrative memos, exam schedules, or syllabi. AI extracts dates, actions, and auto-generates notices.
        </p>
      </div>

      {/* Styled Drag & Drop Zone */}
      <div
        className="card-white"
        style={{
          border: '2px dashed #CBD5E1',
          textAlign: 'center',
          padding: '3.5rem 2rem',
          marginBottom: '2rem',
          background: '#F8FAFC',
          cursor: 'pointer'
        }}
        onClick={simulateUpload}
      >
        <div style={{
          width: 64,
          height: 64,
          borderRadius: '50%',
          background: '#EEF2FF',
          color: '#4F46E5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.25rem auto'
        }}>
          <UploadCloud size={32} />
        </div>

        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', color: '#1E293B' }}>
          {uploading ? 'Analyzing Document with AI...' : 'Click to Upload Academic Document (PDF / DOCX)'}
        </h3>
        <p style={{ color: '#64748B', fontSize: '0.9rem', maxWidth: '480px', margin: '0 auto 1.5rem auto' }}>
          Our neural parser will extract key dates, agenda items, and automatically prepare downstream reminder queues.
        </p>

        <button className="btn btn-primary btn-sm" disabled={uploading}>
          <Sparkles size={16} /> {uploading ? 'Extracting Entities...' : 'Choose File or Drop Sample'}
        </button>
      </div>

      {/* Extraction Notification */}
      {justUploaded && (
        <div className="auth-alert-success" style={{ marginBottom: '1.5rem' }}>
          <CheckCircle2 size={18} />
          <span>
            Successfully ingested <strong>{justUploaded.name}</strong>. Extracted {justUploaded.extractedTasks} action items ready for workflow automation!
          </span>
        </div>
      )}

      {/* Ingested Documents History */}
      <div className="card-white">
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.25rem' }}>
          Processed Document Library
        </h3>

        <div className="table-responsive">
          <table className="cf-table">
            <thead>
              <tr>
                <th>Document Name</th>
                <th>File Size</th>
                <th>Parsed Time</th>
                <th>Tasks Identified</th>
                <th>AI Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc) => (
                <tr key={doc.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <FileText size={18} color="#4F46E5" />
                      <strong>{doc.name}</strong>
                    </div>
                  </td>
                  <td style={{ color: '#64748B' }}>{doc.size}</td>
                  <td style={{ color: '#64748B' }}>{doc.parsedDate}</td>
                  <td>
                    <span style={{
                      fontWeight: 700,
                      color: '#4F46E5',
                      background: '#EEF2FF',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '6px',
                      fontSize: '0.8rem'
                    }}>
                      {doc.extractedTasks} actions
                    </span>
                  </td>
                  <td>
                    <span className="badge-status completed">{doc.status}</span>
                  </td>
                  <td>
                    <button className="btn btn-outline-dark btn-sm" style={{ padding: '0.2rem 0.6rem' }}>
                      Inspect Tasks
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
