import React from 'react';

const MILESTONES = [
  { year: '2025', items: ['Copilot rollout completed', 'GeekSuite launched'] },
  { year: '2026', items: ['Python workflow automation created', 'geekPR developed', 'AI workflow formalized'] },
];

export const KeyMilestones: React.FC = () => {
  return (
    <section className="section-container" id="milestones">
      <h2 className="section-title">Key Milestones</h2>
      <p className="section-subtitle">Release-note version of the year.</p>
      <div className="milestones-list">
        {MILESTONES.map((group) => (
          <section key={group.year} className="milestone-group">
            <h3>{group.year}</h3>
            <ul>
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </section>
  );
};
