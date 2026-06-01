import React from 'react';
import type { LeverageEvent } from '../../types/LeverageEvent';

interface LeverageEventsProps {
  events: LeverageEvent[];
}

export const LeverageEvents: React.FC<LeverageEventsProps> = ({ events }) => {
  return (
    <section className="section-container" id="events">
      <h2 className="section-title">Events</h2>
      <p className="section-subtitle">
        Notebook entries from the year where the workflow changed output in visible ways.
      </p>

      <div className="case-study-list">
        {events.map((event) => (
          <article key={event.id} className="case-study">
            <header className="case-study-header">
              <div>
                <p className="note-meta">{event.timeframe}</p>
                <h3>{event.title}</h3>
              </div>
              <span>{event.category}</span>
            </header>

            <div className="case-study-body">
              <section>
                <h4>Problem</h4>
                <p>{event.problem}</p>
              </section>
              <section>
                <h4>Approach</h4>
                <p>{event.approach}</p>
              </section>
              <section>
                <h4>Result</h4>
                <p>{event.outcome}</p>
              </section>
              <section>
                <h4>What Changed</h4>
                <p>{event.leverage}</p>
              </section>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
