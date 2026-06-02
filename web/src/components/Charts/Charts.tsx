import React from 'react';
import { LeverageCharts } from './LeverageCharts';
import { OBSERVED_OUTCOMES } from '../../constants/observedOutcomes';

export const Charts: React.FC = () => {
  return (
    <section className="section-container" id="evidence">
      <h2 className="section-title">Evidence</h2>
      <p className="section-subtitle">
        Approximate outcomes based on prior projects and the work captured in this notebook. These are observations, not
        KPI tracking.
      </p>

      <div className="metrics-list" aria-label="Observed outcomes">
        {OBSERVED_OUTCOMES.map((item) => (
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
