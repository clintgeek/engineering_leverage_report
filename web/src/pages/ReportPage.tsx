import React from 'react';
import { Hero } from '../components/Hero/Hero';
import { ExecutiveSummary } from '../components/ExecutiveSummary/ExecutiveSummary';
import { WorkflowMethodology } from '../components/WorkflowMethodology/WorkflowMethodology';
import { Charts } from '../components/Charts/Charts';
import { LeverageEvents } from '../components/LeverageEvents/LeverageEvents';
import { Projects } from '../components/Projects/Projects';

// DataLoader unified call
import { getReportData } from '../services/dataLoader';

export const ReportPage: React.FC = () => {
  // Single architectural call to fetch all data boundaries
  const { events, projects, metrics, metadata } = getReportData();

  return (
    <div className="report-page-layout">
      <Hero
        title={metadata.title}
        subtitle={metadata.subtitle}
        reportLabel={metadata.reportLabel}
        author={metadata.author}
        lastUpdated={metadata.lastUpdated}
        brand={metadata.brand}
      />

      <main className="report-content-body">
        <ExecutiveSummary />

        <WorkflowMethodology />

        <Charts metrics={metrics} />

        <LeverageEvents events={events} />

        <Projects projects={projects} />
      </main>

      <footer className="report-footer">
        <p className="footer-field-label">Field Notes</p>
        <ul className="footer-field-notes">
          <li>Models changed repeatedly throughout development.</li>
          <li>Workflow remained largely unchanged.</li>
          <li>Project memory proved more durable than model memory.</li>
          <li>Smaller models performed reliably when context was preserved.</li>
          <li>The bottleneck was never the model. It was always the context.</li>
        </ul>
        <p className="footer-byline">
          — {metadata.copyrightOwner}, {new Date().getFullYear()}
          <span className="footer-links">
            <a href="https://portfolio.clintgeek.com" target="_blank" rel="noopener noreferrer">portfolio</a>
            <span className="meta-separator">·</span>
            <a href="https://github.com/clintgeek/engineering_leverage_report" target="_blank" rel="noopener noreferrer">source</a>
          </span>
        </p>
      </footer>
    </div>
  );
};
