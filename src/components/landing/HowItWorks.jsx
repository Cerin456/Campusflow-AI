import React from 'react';
import {
  UploadCloud,
  BrainCircuit,
  Workflow,
  SendHorizontal
} from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      stage: 'Step 1',
      title: 'Input',
      icon: <UploadCloud size={30} color="#818CF8" />,
      tagline: 'Upload a document or enter an instruction.',
      desc: 'Provide an academic schedule, meeting minutes, PDF syllabus, or simply type a conversational prompt like "Schedule mid-term exams".'
    },
    {
      stage: 'Step 2',
      title: 'Understand',
      icon: <BrainCircuit size={30} color="#06B6D4" />,
      tagline: 'AI extracts important information and identifies tasks.',
      desc: 'Our academic neural engine extracts key dates, cohorts, subjects, prerequisites, and priority levels with high structural precision.'
    },
    {
      stage: 'Step 3',
      title: 'Automate',
      icon: <Workflow size={30} color="#C084FC" />,
      tagline: 'The workflow engine connects triggers and conditions.',
      desc: 'CampusFlow maps out the optimal pipeline—linking verification rules, approval hierarchies, and downstream conditional actions.'
    },
    {
      stage: 'Step 4',
      title: 'Deliver',
      icon: <SendHorizontal size={30} color="#34D399" />,
      tagline: 'Notices, emails, reminders and reports are executed.',
      desc: 'Official notices are published, personalized calendar reminders are dispatched, and attendance alerts reach parent portals seamlessly.'
    }
  ];

  return (
    <section className="section how-it-works-section" id="how-it-works">
      <div className="container">
        {/* Section Header */}
        <div className="section-header animate-on-scroll">
          <div className="section-badge section-badge-cyan">
            <span>Seamless Orchestration</span>
          </div>
          <h2 className="section-title">
            From One Input to Multiple Automated Actions.
          </h2>
          <p className="section-subtitle">
            Experience the harmony between generative intelligence and deterministic execution.
            Complex administrative chains executed in four effortless steps.
          </p>
        </div>

        {/* 4-Step Connected Timeline */}
        <div className="steps-timeline">
          {steps.map((step, idx) => (
            <div className="step-card animate-on-scroll" key={idx}>
              <div className="step-indicator">
                {step.icon}
                <div className="step-number">{idx + 1}</div>
              </div>

              <div className="step-content">
                <div className="step-stage-name">{step.stage} • {step.title}</div>
                <h3 className="step-title">{step.tagline}</h3>
                <p className="step-desc">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
