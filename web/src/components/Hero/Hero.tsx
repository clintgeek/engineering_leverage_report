import React from 'react';
import { OBSERVED_OUTCOMES } from '../../constants/observedOutcomes';

interface HeroProps {
  title: string;
  subtitle: string;
  reportLabel: string;
  author: string;
  lastUpdated: string;
  brand: string;
}

export const Hero: React.FC<HeroProps> = ({ title, subtitle, reportLabel, author, lastUpdated, brand }) => {
  return (
    <header className="hero-section" id="hero">
      <div className="hero-brand">
        <span>{brand}</span>
        <span className="hero-brand-links">
          <a href="https://portfolio.clintgeek.com" target="_blank" rel="noopener noreferrer">portfolio</a>
          <span className="meta-separator">/</span>
          <a href="https://github.com/clintgeek/engineering_leverage_report" target="_blank" rel="noopener noreferrer">source code</a>
        </span>
      </div>

      <p className="hero-report-label">{reportLabel} // May 2025 – May 2026</p>

      <h1 className="hero-title">{title}</h1>

      <p className="hero-subtitle">{subtitle}</p>

      <div className="hero-highlights" aria-label="Observed outcomes">
        <h2>Observed Outcomes</h2>
        <ul>
          {OBSERVED_OUTCOMES.map((item) => (
            <li key={item.detail}>{item.value} {item.label}</li>
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
