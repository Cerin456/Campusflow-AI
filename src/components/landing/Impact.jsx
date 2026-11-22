import React from 'react';
import { sampleMetrics } from '../../utils/sampleData';

export default function Impact() {
  const metricsData = [
    {
      value: sampleMetrics.workflowsExecuted.toLocaleString() + '+',
      label: 'Workflows Executed',
      note: 'Based on platform benchmark simulations'
    },
    {
      value: sampleMetrics.notificationsDelivered.toLocaleString() + '+',
      label: 'Notifications Delivered',
      note: 'Across multi-channel student & faculty hubs'
    },
    {
      value: sampleMetrics.tasksAutomated.toLocaleString() + '+',
      label: 'Tasks Automated',
      note: 'Autonomous document extraction & reminders'
    },
    {
      value: sampleMetrics.estimatedTimeSaved,
      label: 'Estimated Time Saved',
      note: 'Calculated from manual process offsets'
    }
  ];

  return (
    <section className="section impact-section" id="impact">
      <div className="container">
        {/* Section Header */}
        <div className="section-header animate-on-scroll">
          <div className="section-badge section-badge-cyan">
            <span>Measurable Impact</span>
          </div>
          <h2 className="section-title">
            Less Manual Work. More Meaningful Productivity.
          </h2>
          <p className="section-subtitle">
            See how autonomous academic workflows compress hours of manual clerical steps
            into seamless real-time execution.
          </p>
        </div>

        {/* 4 Metric Cards */}
        <div className="impact-grid">
          {metricsData.map((item, idx) => (
            <div className="impact-metric-card animate-on-scroll" key={idx}>
              <div className="impact-val">{item.value}</div>
              <div className="impact-label">{item.label}</div>
              <div className="impact-note">{item.note}</div>
            </div>
          ))}
        </div>

        {/* Mandatory Transparency Disclaimer */}
        <p className="impact-disclaimer animate-on-scroll">
          * Note: Values displayed above represent benchmark sample metrics curated to demonstrate platform capacity.
        </p>
      </div>
    </section>
  );
}
