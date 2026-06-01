import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import type { Metric } from '../../types/Metric';

interface LeverageChartsProps {
  metrics: Metric;
}

// Premium dark-mode theme configuration for Nivo Charts
const chartTheme = {
  background: 'transparent',
  text: {
    fontSize: 11,
    fill: '#95939e',
    fontFamily: 'var(--font-sans)',
  },
  axis: {
    domain: {
      line: {
        stroke: 'rgba(255, 255, 255, 0.08)',
        strokeWidth: 1,
      },
    },
    legend: {
      text: {
        fontSize: 12,
        fill: '#e2e1e6',
        fontWeight: 600,
      },
    },
    ticks: {
      line: {
        stroke: 'rgba(255, 255, 255, 0.08)',
        strokeWidth: 1,
      },
      text: {
        fontSize: 11,
        fill: '#95939e',
      },
    },
  },
  grid: {
    line: {
      stroke: 'rgba(255, 255, 255, 0.04)',
      strokeWidth: 1,
    },
  },
  tooltip: {
    container: {
      background: '#1c1926',
      color: '#e2e1e6',
      fontSize: 12,
      borderRadius: 8,
      border: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
    },
  },
};

export const LeverageCharts: React.FC<LeverageChartsProps> = ({ metrics }) => {
  // Transform category metrics object into array structure for Nivo
  const categoryData = Object.entries(metrics.categories || {}).map(([category, count]) => ({
    category,
    count,
  }));

  // Transform technology metrics object into sorted array for Nivo
  const techData = Object.entries(metrics.technologies || {})
    .map(([tech, count]) => ({
      tech,
      count,
    }))
    .sort((a, b) => b.count - a.count);

  return (
    <div className="charts-visualizations-layout">
      {/* Category distribution */}
      <div className="glass-card chart-card-wrapper">
        <h3 className="chart-card-title">Impact Area Distribution</h3>
        <div style={{ height: '320px' }}>
          <ResponsiveBar
            data={categoryData}
            keys={['count']}
            indexBy="category"
            margin={{ top: 20, right: 20, bottom: 50, left: 50 }}
            padding={0.3}
            valueScale={{ type: 'linear' }}
            colors={{ scheme: 'nivo' }}
            theme={chartTheme}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: -15,
              legend: 'Category',
              legendPosition: 'middle',
              legendOffset: 42,
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Event Count',
              legendPosition: 'middle',
              legendOffset: -40,
              tickValues: 2
            }}
            enableLabel={false}
            role="application"
            ariaLabel="Impact Area Distribution Chart"
          />
        </div>
      </div>

      {/* Tech stack frequencies */}
      <div className="glass-card chart-card-wrapper">
        <h3 className="chart-card-title">Technology Stack Frequencies</h3>
        <div style={{ height: '320px' }}>
          <ResponsiveBar
            data={techData}
            keys={['count']}
            indexBy="tech"
            margin={{ top: 20, right: 20, bottom: 50, left: 80 }}
            padding={0.3}
            layout="horizontal"
            valueScale={{ type: 'linear' }}
            colors={{ scheme: 'pastel2' }}
            theme={chartTheme}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Project Frequency',
              legendPosition: 'middle',
              legendOffset: 40,
              tickValues: 2
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
            }}
            enableLabel={false}
            role="application"
            ariaLabel="Technology Stack Frequencies Chart"
          />
        </div>
      </div>
    </div>
  );
};
