import React from 'react';
import {
  FileSearch,
  FileCheck2,
  MailCheck,
  CalendarClock,
  UsersRound,
  GitFork,
  ActivitySquare,
  Cpu
} from 'lucide-react';

export default function Features() {
  const featuresList = [
    {
      icon: <FileSearch size={26} />,
      title: 'AI Document Intelligence',
      desc: 'Instantly ingest syllabi, academic circulars, exam guidelines, and policies. AI understands semantics, dates, and prerequisites automatically.'
    },
    {
      icon: <FileCheck2 size={26} />,
      title: 'Smart Notice Generation',
      desc: 'Convert bulleted memos or raw prompts into structured, formatted official notices with institutional headers and signature blocks in seconds.'
    },
    {
      icon: <MailCheck size={26} />,
      title: 'Automated Email Notifications',
      desc: 'Broadcast personalized, role-specific alerts to students, faculty, or parents based on automated events, milestones, or rules.'
    },
    {
      icon: <CalendarClock size={26} />,
      title: 'Intelligent Reminder Scheduling',
      desc: 'Never miss an exam form deadline, project milestone, or revaluation date. Smart multi-channel reminders trigger autonomously.'
    },
    {
      icon: <UsersRound size={26} />,
      title: 'Attendance Automation',
      desc: 'Scan attendance records, calculate threshold shortages, and automatically draft and deliver parent/student warning notices.'
    },
    {
      icon: <GitFork size={26} />,
      title: 'Visual Workflow Builder',
      desc: 'Design multistep automation pipelines using an intuitive node canvas. Connect triggers, conditional logic, and output actions without code.'
    },
    {
      icon: <ActivitySquare size={26} />,
      title: 'Workflow Monitoring',
      desc: 'Live telemetry, delivery logs, retry handlers, and audit trails ensure every mission-critical campus process executes flawlessly.'
    },
    {
      icon: <Cpu size={26} />,
      title: 'AI-Powered Task Extraction',
      desc: 'Extract granular to-do items, responsible staff, and due dates directly from long meeting minutes or administrative circulars.'
    }
  ];

  return (
    <section className="section features-section" id="features">
      <div className="container">
        {/* Section Header */}
        <div className="section-header animate-on-scroll">
          <div className="section-badge section-badge-indigo">
            <span>Platform Capabilities</span>
          </div>
          <h2 className="section-title">
            Everything You Need. One Intelligent Platform.
          </h2>
          <p className="section-subtitle">
            Engineered specifically for academic institutions. Eliminate fragmented tools
            and bring cohesive, intelligent automation to campus operations.
          </p>
        </div>

        {/* Feature Cards Grid (8 cards) */}
        <div className="features-grid">
          {featuresList.map((item, idx) => (
            <div className="feature-card animate-on-scroll" key={idx}>
              <div className="feature-icon-container">
                {item.icon}
              </div>
              <h3 className="feature-title">{item.title}</h3>
              <p className="feature-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
