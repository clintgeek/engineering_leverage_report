import React from 'react';
import { LeverageCharts } from './LeverageCharts';
import type { Metric } from '../../types/Metric';

interface ChartsProps {
  metrics: Metric;
}

const buildObservedOutcomes = (metrics: Metric) => [
  {
    value: metrics.summary.total_leverage_events,
    label: 'engineers onboarded',
    detail: 'Copilot rollout',
  },
  {
    value: metrics.summary.total_projects,
    label: 'projects shipped',
    detail: 'AI-assisted delivery',
  },
  {
    value: metrics.summary.unique_technologies_count,
    label: 'learning domains accelerated',
    detail: 'Cross-stack practice',
  },
  {
    value: metrics.summary.unique_categories_count,
    label: 'automations created',
    detail: 'Workflow automation',
  },
];

export const Charts: React.FC<ChartsProps> = ({ metrics }) => {
  const observedOutcomes = buildObservedOutcomes(metrics);

  return (
    <section className="section-container" id="evidence">
      <h2 className="section-title">Evidence</h2>
      <p className="section-subtitle">
        Approximate outcomes based on prior projects and the work captured in this notebook. These are observations, not
        KPI tracking.
      </p>

      <div className="metrics-list" aria-label="Observed outcomes">
        {observedOutcomes.map((item) => (
          <div key={item.detail} className="metric-line">
            <span className="metric-value">{item.value}</span>
            <span className="metric-label">{item.label}</span>
            <span className="metric-detail">{item.detail}</span>
          </div>
        ))}
      </div>

      <LeverageCharts />
    </section>
  );
};
