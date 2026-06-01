import React from 'react';
import type { Metric } from '../../types/Metric';

interface ChartsProps {
  metrics: Metric;
}

export const Charts: React.FC<ChartsProps> = ({ metrics }) => {
  const summary = metrics.summary || {
    total_leverage_events: 0,
    total_projects: 0,
    unique_categories_count: 0,
    unique_technologies_count: 0
  };

  return (
    <section className="section-container" id="metrics">
      <h2 className="section-title">Derived Leverage Metrics</h2>
      <p className="section-subtitle">
        System metrics compiled dynamically from active data layer assets.
      </p>

      {/* Summary Cards */}
      <div className="metrics-grid">
        <div className="glass-card metric-card">
          <span className="metric-value">{summary.total_leverage_events}</span>
          <span className="metric-label">Leverage Events</span>
        </div>
        
        <div className="glass-card metric-card">
          <span className="metric-value">{summary.total_projects}</span>
          <span className="metric-label">Completed Projects</span>
        </div>
        
        <div className="glass-card metric-card">
          <span className="metric-value">{summary.unique_categories_count}</span>
          <span className="metric-label">Impact Areas</span>
        </div>
        
        <div className="glass-card metric-card">
          <span className="metric-value">{summary.unique_technologies_count}</span>
          <span className="metric-label">Tech Stack Tools</span>
        </div>
      </div>

      {/* Charts Placeholder */}
      <div className="glass-card chart-placeholder-card">
        <div className="chart-placeholder-icon">📊</div>
        <h4>Nivo Charts Visualization Layer</h4>
        <p>
          Category distribution and technology stack frequency charts will be compiled dynamically in Phase 6.
        </p>
      </div>
    </section>
  );
};
