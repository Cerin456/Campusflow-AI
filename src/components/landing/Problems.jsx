import React from 'react';
import {
  FileText,
  Mail,
  Clock,
  FileSpreadsheet,
  UserCheck,
  Zap,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { smoothScrollTo } from '../../utils/animations';

export default function Problems() {
  const problems = [
    {
      icon: <FileText size={22} />,
      title: 'Manual Notice Creation',
      desc: 'Hours wasted drafting, formatting, reviewing, and manually distributing repetitive circulars across faculty and students.'
    },
    {
      icon: <Mail size={22} />,
      title: 'Repeated Email Notifications',
      desc: 'Copy-pasting identical reminders for exams, fees, events, and submission dates over cluttered mailing lists.'
    },
    {
      icon: <Clock size={22} />,
      title: 'Missed Deadlines & Schedules',
      desc: 'Critical administrative milestones and assignment cutoffs lost across scattered chat groups and notice boards.'
    },
    {
      icon: <FileSpreadsheet size={22} />,
      title: 'Time-Consuming Document Processing',
      desc: 'Manually extracting dates, student details, and actionable items from unstructured PDF memos and scanned forms.'
    },
    {
      icon: <UserCheck size={22} />,
      title: 'Manual Attendance Follow-ups',
      desc: 'Tedious tracking of attendance deficits, calculating percentages, and chasing students for compliance letters.'
    }
  ];

  return (
    <section className="section problems-section" id="problems">
      <div className="container">
        {/* Section Header */}
        <div className="section-header animate-on-scroll">
          <div className="section-badge section-badge-indigo">
            <span>The Challenge</span>
          </div>
          <h2 className="section-title">
            Repetitive Work Shouldn't Slow You Down.
          </h2>
          <p className="section-subtitle">
            Institutions lose hundreds of valuable academic and administrative hours
            each semester wrestling with fragmented, manual routines.
          </p>
        </div>

        {/* Problems Grid */}
        <div className="problems-grid">
          {problems.map((prob, idx) => (
            <div className="problem-card animate-on-scroll" key={idx}>
              <div className="problem-icon-wrap">
                {prob.icon}
              </div>
              <h3>{prob.title}</h3>
              <p>{prob.desc}</p>
            </div>
          ))}
        </div>

        {/* CampusFlow AI Solution Callout */}
        <div className="solution-callout animate-on-scroll">
          <div className="solution-content">
            <div className="solution-badge">
              <Sparkles size={14} /> The Intelligent Solution
            </div>
            <h3>CampusFlow AI Replaces Busywork with Autonomous Flow</h3>
            <p>
              By combining specialized campus LLMs with deterministic workflow orchestration,
              CampusFlow AI transforms raw guidelines and emails into instant notices, proactive alerts,
              and coordinated actions—error-free.
            </p>
          </div>
          <div className="solution-action">
            <button
              onClick={() => smoothScrollTo('how-it-works')}
              className="btn btn-white btn-lg"
            >
              See How It Works <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
