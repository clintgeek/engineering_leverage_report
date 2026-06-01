import React from 'react';
import { Hero } from '../components/Hero/Hero';
import { ExecutiveSummary } from '../components/ExecutiveSummary/ExecutiveSummary';
import { LeverageEvents } from '../components/LeverageEvents/LeverageEvents';
import { WorkflowMethodology } from '../components/WorkflowMethodology/WorkflowMethodology';
import { Projects } from '../components/Projects/Projects';
import { LessonsLearned } from '../components/LessonsLearned/LessonsLearned';
import { Charts } from '../components/Charts/Charts';

// DataLoader unified call
import { getReportData } from '../services/dataLoader';

export const ReportPage: React.FC = () => {
  // Single architectural call to fetch all data boundaries
  const { events, projects, metrics, metadata } = getReportData();

  return (
    <div className="report-page-layout">
      {/* Hero section */}
      <Hero 
        title={metadata.title} 
        author={metadata.author} 
        lastUpdated={metadata.lastUpdated} 
        brand={metadata.brand}
      />

      {/* Main content body */}
      <main className="report-content-body">
        <ExecutiveSummary />
        
        <Charts metrics={metrics} />
        
        <LeverageEvents events={events} />
        
        <WorkflowMethodology />
        
        <Projects projects={projects} />
        
        <LessonsLearned />
      </main>

      {/* Footer */}
      <footer className="report-footer">
        <p>Copyright © {new Date().getFullYear()} {metadata.copyrightOwner}. All rights reserved.</p>
        <p className="footer-notice">
          The source for this site is publicly visible for educational and reference purposes.
        </p>
      </footer>
    </div>
  );
};
