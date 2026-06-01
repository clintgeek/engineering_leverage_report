import React from 'react';

interface HeroProps {
  title: string;
  subtitle: string;
  reportLabel: string;
  author: string;
  lastUpdated: string;
  brand: string;
}

const OBSERVED_OUTCOMES = [
  '24 engineers onboarded',
  '2 projects shipped',
  '5 leverage events documented',
  '3 automations created',
];

export const Hero: React.FC<HeroProps> = ({ title, subtitle, reportLabel, author, lastUpdated, brand }) => {
  return (
    <header className="hero-section" id="hero">
      <div className="hero-brand">{brand}</div>

      <p className="hero-report-label">{reportLabel} // May 2025 – May 2026</p>

      <h1 className="hero-title">{title}</h1>

      <p className="hero-subtitle">{subtitle}</p>

      <div className="hero-highlights" aria-label="Observed outcomes">
        <h2>Observed Outcomes</h2>
        <ul>
          {OBSERVED_OUTCOMES.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="hero-meta">
        <span>Author: <strong>{author}</strong></span>
        <span className="meta-separator">•</span>
        <span>Last Updated: <strong>{lastUpdated}</strong></span>
      </div>

      <div className="hero-artifacts" aria-hidden="true">
        <p className="hero-terminal">$ git log --oneline --since="1 year ago" | wc -l<span className="hero-terminal-output">347</span></p>
        <p className="hero-terminal">$ ls projects/ | wc -l<span className="hero-terminal-output">2</span></p>
        <p className="hero-terminal">$ grep -rl "THE_CONTEXT" . | wc -l<span className="hero-terminal-output">14</span></p>
      </div>
    </header>
  );
};
