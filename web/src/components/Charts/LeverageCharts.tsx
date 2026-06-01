import React from 'react';

const DELIVERY_COMPRESSION = [
  {
    label: 'Traditional solo development',
    value: '12-18 months',
    width: '100%',
  },
  {
    label: 'AI-assisted development',
    value: 'A few months',
    width: '28%',
  },
];

export const LeverageCharts: React.FC = () => {
  return (
    <div className="compression-chart" role="figure" aria-label="Delivery compression chart">
      <h3>Delivery Compression</h3>
      <p>
        The useful metric was not generated code. It was reduced time between intent, implementation, review, and correction.
      </p>
      <div className="compression-bars">
        {DELIVERY_COMPRESSION.map((item) => (
          <div key={item.label} className="compression-row">
            <div className="compression-row-header">
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </div>
            <div className="compression-track">
              <span className="compression-bar" style={{ width: item.width }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
