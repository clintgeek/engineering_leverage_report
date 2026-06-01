import React from 'react';

export const ExecutiveSummary: React.FC = () => {
  return (
    <section className="section-container" id="summary">
      <h2 className="section-title">Executive Summary</h2>
      <div className="glass-card summary-card">
        <p>
          Over the past year, my approach to engineering has shifted from optimizing individual coding speed to designing scalable, AI-assisted workflows. Rather than treating artificial intelligence as a replacement for software development, I leverage it as a multiplier. The objective is not to write more code or generate more tokens, but to make higher-quality architectural choices, accelerate learning velocity, and eliminate repetitive tasks.
        </p>
        <p>
          By implementing robust process frameworks—like the Context-Plan-Steps loop—and developing custom automation tooling like <code>geekPR</code>, I have dramatically compressed software development lifecycles. Large, complex platforms that traditionally estimated 12–18 months of development (such as <code>GeekSuite</code>) were built inside of a few months of nights and weekends, while practical working proficiency in new technologies was acquired in under 48 hours, enabling the rapid build of utility tools.
        </p>
        <p>
          This report documents the measurable leverage events, engineering automation platforms, and core operational philosophies that define my development model.
        </p>
      </div>
    </section>
  );
};
