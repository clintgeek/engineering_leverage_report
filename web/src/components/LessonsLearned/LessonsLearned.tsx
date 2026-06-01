import React from 'react';
import type { LessonLearned } from '../../types/LessonLearned';

interface LessonsLearnedProps {
  lessons: LessonLearned[];
}

export const LessonsLearned: React.FC<LessonsLearnedProps> = ({ lessons }) => {
  return (
    <section className="section-container" id="lessons">
      <h2 className="section-title">Lessons Learned</h2>
      <p className="section-subtitle">
        Operational takeaways from integrating AI and structured loops into daily production engineering.
      </p>

      <div className="lessons-grid">
        {lessons.map((lesson, idx) => (
          <div key={idx} className="glass-card lesson-card">
            <span className="lesson-number">0{idx + 1}</span>
            <h3 className="lesson-title">{lesson.title}</h3>
            <p className="lesson-desc">{lesson.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
