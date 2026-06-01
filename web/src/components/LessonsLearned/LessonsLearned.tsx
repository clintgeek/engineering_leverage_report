import React from 'react';

export const LessonsLearned: React.FC = () => {
  const lessons = [
    {
      title: "Context Management is King",
      desc: "Unstructured chat buffers lead to model regressions. Maintaining a physical context boundary (durable files in the repository) ensures long-term development continuity."
    },
    {
      title: "Design for Validation",
      desc: "When AI handles the boilerplate coding tasks, the engineer's primary duty shifts to validation. Robust testing suites and validation schemas must be built alongside the application code."
    },
    {
      title: "Decouple Architecture",
      desc: "Static JSON configurations outlive frameworks, servers, and AI model releases. Designing projects where data is decoupled from presentation makes the system highly maintainable."
    },
    {
      title: "Leverage Multipliers",
      desc: "Real leverage comes from automating repetitive pipelines. Creating local tools like auto-linters and PR feedback review scripts scales output without increasing working hours."
    }
  ];

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
            <p className="lesson-desc">{lesson.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
