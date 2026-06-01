import React from 'react';
import type { TimelineEvent } from '../../types/TimelineEvent';

interface EventTimelineProps {
  timeline: TimelineEvent[];
}

export const EventTimeline: React.FC<EventTimelineProps> = ({ timeline }) => {
  return (
    <section className="section-container" id="timeline">
      <h2 className="section-title">Milestone Timeline</h2>
      <p className="section-subtitle">
        A chronological overview of leverage milestones and operational events.
      </p>

      <div className="timeline-wrapper">
        <div className="timeline-line"></div>
        
        <div className="timeline-items">
          {timeline.map((event, idx) => (
            <div key={event.id} className={`timeline-item ${idx % 2 === 0 ? 'left' : 'right'}`}>
              <div className="timeline-dot"></div>
              
              <div className="glass-card timeline-card">
                <span className="timeline-date">{event.date}</span>
                <h3 className="timeline-title">{event.title}</h3>
                {event.category && <span className="timeline-badge">{event.category}</span>}
                <p className="timeline-description">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
