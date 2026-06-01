import React from 'react';

const ROLES = [
  ['Large models', 'Plan strategy.'],
  ['Small models', 'Execute bounded tasks.'],
  ['Context documents', 'Preserve project memory.'],
  ['Human', 'Review decisions.'],
];

const CONTEXT_EXCERPT = `# THE_CONTEXT.md

Goal:
Preserve project memory between sessions.

What matters:
- Keep tasks bounded.
- Keep planning separate from implementation.
- Keep a current source of truth.
- Use smaller models for repeatable execution.

Notes:
The workflow should survive model swaps, context resets,
and long gaps between sessions.`;

export const WorkflowMethodology: React.FC = () => {
  return (
    <section className="section-container workflow-section" id="workflow">
      <h2 className="section-title">Workflow</h2>
      <p className="section-subtitle">
        The workflow is the system. It keeps strategy, architecture, execution, review, and memory separated enough to
        stay reliable across sessions.
      </p>

      <div className="workflow-roles">
        {ROLES.map(([role, responsibility]) => (
          <div key={role} className="workflow-role">
            <span>{role}</span>
            <strong>{responsibility}</strong>
          </div>
        ))}
      </div>

      <div className="vscode-explorer" aria-label="Project file tree">
        <div className="vscode-explorer-title">EXPLORER</div>
        <div className="vscode-explorer-root">
          <span className="vscode-chevron">▾</span>
          <span className="vscode-folder-icon">📁</span>
          <span className="vscode-folder-name">project</span>
        </div>
        <div className="vscode-explorer-files">
          {[
            { name: 'THE_PLAN.md',         note: 'strategy + scope' },
            { name: 'THE_ARCHITECTURE.md', note: 'structure decisions' },
            { name: 'THE_STEPS.md',        note: 'current task list' },
            { name: 'THE_CONTEXT.md',      note: 'session memory', active: true },
          ].map(({ name, note, active }) => (
            <div key={name} className={`vscode-file${active ? ' vscode-file--active' : ''}`}>
              <span className="vscode-file-icon">📄</span>
              <span className="vscode-file-name">{name}</span>
              <span className="vscode-file-note">{note}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="workflow-context">
        <div className="workflow-context-head">
          <p className="note-meta">THE_CONTEXT.md</p>
          <span>excerpt</span>
        </div>
        <pre className="workflow-context-snippet">{CONTEXT_EXCERPT}</pre>
      </div>
    </section>
  );
};
