import React from 'react';
import type { LeverageEvent } from '../../types/LeverageEvent';

interface LeverageEventsProps {
  events: LeverageEvent[];
}

export const LeverageEvents: React.FC<LeverageEventsProps> = ({ events }) => {
  return (
    <section className="section-container" id="events">
      <h2 className="section-title">Major Leverage Events</h2>
      <p className="section-subtitle">
        Key case studies demonstrating high-impact engineering accomplishments, automation, and accelerated learning.
      </p>
      
      <div className="events-grid">
        {events.map((event) => (
          <div key={event.id} className="glass-card event-card">
            <div className="event-card-header">
              <span className="event-category">{event.category}</span>
              <span className="event-timeframe">{event.timeframe}</span>
            </div>
            
            <h3 className="event-title">{event.title}</h3>
            
            <div className="event-body">
              <div className="event-field">
                <span className="field-label">Problem:</span>
                <p>{event.problem}</p>
              </div>
              
              <div className="event-field">
                <span className="field-label">Approach:</span>
                <p>{event.approach}</p>
              </div>
              
              <div className="event-field">
                <span className="field-label">Outcome:</span>
                <p>{event.outcome}</p>
              </div>
            </div>
            
            <div className="event-leverage-highlight">
              <span className="leverage-label">Leverage Created:</span>
              <p>{event.leverage}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
