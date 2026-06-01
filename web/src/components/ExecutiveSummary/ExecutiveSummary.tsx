import React from 'react';

export const ExecutiveSummary: React.FC = () => {
  return (
    <section className="section-container" id="observation">
      <h2 className="section-title">Observation</h2>
      <p className="section-subtitle">
        Engineered notes from a year of treating AI as an execution system instead of a coding assistant.
      </p>

      <div className="summary-notes">
        <article>
          <h3>Observation</h3>
          <p>
            The largest gain did not come from generating code. It came from shortening the cycle between planning,
            implementation, review, and correction.
          </p>
        </article>

        <article>
          <h3>Evidence</h3>
          <p>
            The workflow consistently improved output across team enablement, solo delivery, learning speed, and
            automation. Reusable context and smaller task boundaries made the process durable across sessions.
          </p>
        </article>

        <article>
          <h3>Implication</h3>
          <p>
            Project memory scales better than model memory. When the process is documented well, the system becomes
            repeatable, resumable, and easier to trust.
          </p>
        </article>
      </div>
    </section>
  );
};
