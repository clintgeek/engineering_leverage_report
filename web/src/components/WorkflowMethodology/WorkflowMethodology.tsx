import React from 'react';

export const WorkflowMethodology: React.FC = () => {
  return (
    <section className="section-container" id="methodology">
      <h2 className="section-title">AI Workflow Methodology</h2>
      <p className="section-subtitle">
        How I structure AI context and plan project execution loops to ensure continuity, consistency, and low-cost development.
      </p>

      <div className="workflow-container">
        {/* Diagram Flow */}
        <div className="workflow-diagram">
          <div className="diagram-node node-context">
            <span className="node-title">THE_CONTEXT.md</span>
            <span className="node-desc">Durable Memory</span>
          </div>
          <div className="diagram-arrow">↓</div>
          <div className="diagram-node node-plan">
            <span className="node-title">THE_PLAN.md</span>
            <span className="node-desc">Strategic Design</span>
          </div>
          <div className="diagram-arrow">↓</div>
          <div className="diagram-node node-steps">
            <span className="node-title">THE_STEPS.md</span>
            <span className="node-desc">Execution Roadmap</span>
          </div>
          <div className="diagram-arrow">↓</div>
          <div className="diagram-node node-execution">
            <span className="node-title">Execution Loop</span>
            <span className="node-desc">Targeted Task Builds</span>
          </div>
          <div className="diagram-arrow feedback-arrow">🔄 Feedback Loop back to Context</div>
        </div>

        {/* Text Cards */}
        <div className="workflow-explanations">
          <div className="glass-card explanation-card">
            <h4>1. THE_CONTEXT.md</h4>
            <p>
              Acts as the durable repository memory. It documents structural constraints, environment configuration, API ports, lessons learned, and the current operational state, ensuring work can be resumed across models or agents instantly without context rebuilding.
            </p>
          </div>
          
          <div className="glass-card explanation-card">
            <h4>2. THE_PLAN.md</h4>
            <p>
              Establishes strategic goals, architecture designs, non-requirements, and success parameters. It is drafted using high-reasoning models to align outcomes before code is written.
            </p>
          </div>
          
          <div className="glass-card explanation-card">
            <h4>3. THE_STEPS.md</h4>
            <p>
              Translates plans into a granular checklist. Each task is defined with clear, isolated criteria so that smaller, faster models (the Squad) can execute them independently and cheaply.
            </p>
          </div>
          
          <div className="glass-card explanation-card">
            <h4>4. Execution Loop</h4>
            <p>
              Code changes are built task-by-task. Once a step compiles and passes unit tests, we update `THE_CONTEXT.md` to persist the state. This hierarchical pipeline maximizes quality while containing token costs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
