import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Hero } from '../Hero/Hero';
import { ExecutiveSummary } from '../ExecutiveSummary/ExecutiveSummary';
import { WorkflowMethodology } from '../WorkflowMethodology/WorkflowMethodology';
import { LeverageEvents } from '../LeverageEvents/LeverageEvents';
import { Projects } from '../Projects/Projects';
import { Charts } from '../Charts/Charts';
import type { LeverageEvent } from '../../types/LeverageEvent';
import type { Project } from '../../types/Project';
import type { Metric } from '../../types/Metric';

// Mock datasets for testing
const MOCK_EVENTS: LeverageEvent[] = [
  {
    id: "test-event-1",
    title: "Test Event One",
    category: "Automation",
    timeframe: "Q1 2026",
    problem: "Test problem description",
    approach: "Test approach taken",
    outcome: "Test outcome achieved",
    leverage: "Test leverage created"
  }
];

const MOCK_PROJECTS: Project[] = [
  {
    id: "test-proj-1",
    name: "Mock Project",
    description: "Mock description of a project",
    technologies: ["React", "TypeScript", "Vitest"],
    githubUrl: "https://github.com/test/mock",
    websiteUrl: "https://mock.test"
  }
];

const MOCK_METRICS: Metric = {
  summary: {
    total_leverage_events: 10,
    total_projects: 5,
    unique_categories_count: 3,
    unique_technologies_count: 8
  },
  categories: { "Automation": 10 },
  technologies: { "React": 8 }
};

describe('Component Layouts', () => {
  it('should render the Hero component with expected title and metadata', () => {
    render(
      <Hero 
        title="Scaling Engineering Through AI"
        subtitle="Over the last 12 months I focused on increasing engineering leverage rather than increasing hours."
        reportLabel="Engineering Notes"
        author="Clint Crocker" 
        lastUpdated="2026-06-01" 
        brand="CLINT GEEK"
      />
    );
    expect(screen.getByText('Scaling Engineering Through AI')).toBeDefined();
    expect(screen.getByText(/Engineering Notes: Scaling Myself With AI/)).toBeDefined();
    expect(screen.getByText('Highlights')).toBeDefined();
    expect(screen.getByText('24 engineers onboarded to Copilot')).toBeDefined();
    expect(screen.getByText(/Clint Crocker/)).toBeDefined();
    expect(screen.getByText(/2026-06-01/)).toBeDefined();
    expect(screen.getByText('CLINT GEEK')).toBeDefined();
  });

  it('should render the ExecutiveSummary component correctly', () => {
    render(<ExecutiveSummary />);
    expect(screen.getByText('Executive Summary')).toBeDefined();
    expect(screen.getByText('What Changed')).toBeDefined();
    expect(screen.getByText('Why It Mattered')).toBeDefined();
    expect(screen.getByText('Evidence')).toBeDefined();
    expect(screen.getByText(/execution system/i)).toBeDefined();
  });

  it('should render the WorkflowMethodology component nodes', () => {
    render(<WorkflowMethodology />);
    expect(screen.getByText('AI Workflow System')).toBeDefined();
    expect(screen.getByText('Large models')).toBeDefined();
    expect(screen.getByText('Small models')).toBeDefined();
    expect(screen.getByText('THE_PLAN.md')).toBeDefined();
    expect(screen.getByText(/THE_ARCHITECTURE.md/)).toBeDefined();
    expect(screen.getByText('THE_STEPS.md')).toBeDefined();
    expect(screen.getByText('Implementation')).toBeDefined();
    expect(screen.getByText('THE_CONTEXT.md')).toBeDefined();
  });

  it('should render the LeverageEvents component with loaded mock events', () => {
    render(<LeverageEvents events={MOCK_EVENTS} />);
    expect(screen.getByText('Major Leverage Events')).toBeDefined();
    expect(screen.getByText('Test Event One')).toBeDefined();
    expect(screen.getByText('Problem')).toBeDefined();
    expect(screen.getByText('Approach')).toBeDefined();
    expect(screen.getByText('Result')).toBeDefined();
    expect(screen.getByText('Leverage')).toBeDefined();
    expect(screen.getByText('Test problem description')).toBeDefined();
    expect(screen.getByText('Test leverage created')).toBeDefined();
  });

  it('should render the Projects component with loaded mock list and links', () => {
    render(<Projects projects={MOCK_PROJECTS} />);
    expect(screen.getByText('Selected Projects')).toBeDefined();
    expect(screen.getByText('Mock Project')).toBeDefined();
    expect(screen.getByText('Mock description of a project')).toBeDefined();
    
    // Check links render and have correct hrefs
    const githubLink = screen.getByRole('link', { name: /github/i });
    expect(githubLink).toBeDefined();
    expect(githubLink.getAttribute('href')).toBe('https://github.com/test/mock');
  });

  it('should render the Charts summary widgets with mock metrics', () => {
    render(<Charts metrics={MOCK_METRICS} />);
    expect(screen.getByText('Leverage at a Glance')).toBeDefined();
    expect(screen.getByText('projects')).toBeDefined();
    expect(screen.getByText('AI-assisted delivery')).toBeDefined();
    expect(screen.getByText('Accelerated learning')).toBeDefined();
    expect(screen.getByText('Engineering workflow automation')).toBeDefined();
    expect(screen.getByText('Delivery Compression')).toBeDefined();
  });
});
