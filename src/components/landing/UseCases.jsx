import React from 'react';
import {
  GraduationCap,
  BookOpen,
  Building2,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function UseCases() {
  const useCases = [
    {
      roleClass: 'educators',
      badge: 'Faculty & Instructors',
      icon: <GraduationCap size={28} />,
      title: 'For Educators',
      desc: 'Free up teaching time and eliminate administrative friction with intelligent assistant workflows designed for classrooms.',
      points: [
        'Automate examination notices & seating plans',
        'Auto-schedule assignment deadline alerts',
        'Generate attendance shortage warnings & reports',
        'Broadcast class cancellations and venue updates',
        'Extract grading rubrics from syllabi in 1 click'
      ]
    },
    {
      roleClass: 'students',
      badge: 'Scholars & Clubs',
      icon: <BookOpen size={28} />,
      title: 'For Students',
      desc: 'Stay ahead of deadlines, aggregate scattered academic updates, and keep institutional commitments completely on track.',
      points: [
        'Consolidated reminders for project submissions',
        'Instant notifications on fee & scholarship deadlines',
        'Autonomous timetable sync to mobile calendars',
        'Direct inquiry task routing to department heads',
        'Campus event and hackathon alert automation'
      ]
    },
    {
      roleClass: 'admins',
      badge: 'Chairs & Registrars',
      icon: <Building2 size={28} />,
      title: 'For Administrators',
      desc: 'Orchestrate campus-wide governance, regulatory circulars, and departmental compliance with infallible speed.',
      points: [
        'Autonomous official circular generation & publishing',
        'Multistep institutional approval routing workflows',
        'Mass document parsing & archival extraction',
        'Semester transition & admission cycle reminders',
        'Comprehensive audit logs for university compliance'
      ]
    }
  ];

  return (
    <section className="section use-cases-section" id="use-cases">
      <div className="container">
        {/* Section Header */}
        <div className="section-header animate-on-scroll">
          <div className="section-badge section-badge-indigo">
            <span>Tailored Solutions</span>
          </div>
          <h2 className="section-title">
            One Platform. Multiple Possibilities.
          </h2>
          <p className="section-subtitle">
            Whether leading a department, delivering a lecture, or pursuing a degree,
            CampusFlow AI adapts to the unique workflows of every academic stakeholder.
          </p>
        </div>

        {/* 3 User Category Cards */}
        <div className="use-cases-grid">
          {useCases.map((uc, idx) => (
            <div className={`use-case-card ${uc.roleClass} animate-on-scroll`} key={idx}>
              <div className="use-case-badge">{uc.badge}</div>
              <div className="use-case-icon-box">{uc.icon}</div>
              <h3>{uc.title}</h3>
              <p className="use-case-desc">{uc.desc}</p>

              <ul className="use-case-bullets">
                {uc.points.map((pt, pIdx) => (
                  <li key={pIdx}>
                    <CheckCircle2 size={16} />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>

              <Link to="/register" className="btn btn-outline-dark btn-sm" style={{ marginTop: 'auto' }}>
                Get Started for {uc.title.replace('For ', '')} <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
