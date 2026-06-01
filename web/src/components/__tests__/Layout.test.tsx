import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Hero } from '../Hero/Hero';
import { ExecutiveSummary } from '../ExecutiveSummary/ExecutiveSummary';
import { WorkflowMethodology } from '../WorkflowMethodology/WorkflowMethodology';
import { LeverageEvents } from '../LeverageEvents/LeverageEvents';
import { Projects } from '../Projects/Projects';
import { Charts } from '../Charts/Charts';
import { LessonsLearned } from '../LessonsLearned/LessonsLearned';
import type { LeverageEvent } from '../../types/LeverageEvent';
import type { Project } from '../../types/Project';
import type { Metric } from '../../types/Metric';
import type { LessonLearned } from '../../types/LessonLearned';

interface MockResponsiveBarProps {
  data: Array<Record<string, string | number>>;
  indexBy: string;
  ariaLabel?: string;
  role?: string;
}

// Mock @nivo/bar to avoid ResizeObserver/JSDOM rendering limitations
vi.mock('@nivo/bar', () => ({
  ResponsiveBar: ({ data, indexBy, ariaLabel, role }: MockResponsiveBarProps) => (
    <div data-testid="mock-responsive-bar" aria-label={ariaLabel} role={role}>
      {data.map((item) => (
        <span key={String(item[indexBy])} data-testid="bar-item">
          {String(item[indexBy])}
        </span>
      ))}
    </div>
  ),
}));

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

const MOCK_LESSONS: LessonLearned[] = [
  {
    title: "Context Management is King",
    description: "Unstructured chat buffers lead to model regressions. Maintaining a physical context boundary (durable files in the repository) ensures long-term development continuity."
  },
  {
    "title": "Design for Validation",
    "description": "When AI handles the boilerplate coding tasks, the engineer's primary duty shifts to validation. Robust testing suites and validation schemas must be built alongside the application code."
  }
];

describe('Component Layouts', () => {
  it('should render the Hero component with expected title and metadata', () => {
    render(
      <Hero 
        title="Engineering Leverage Report" 
        author="Clint Crocker" 
        lastUpdated="2026-06-01" 
        brand="CLINT GEEK"
      />
    );
    expect(screen.getByText('Engineering Leverage Report')).toBeDefined();
    expect(screen.getByText(/Clint Crocker/)).toBeDefined();
    expect(screen.getByText(/2026-06-01/)).toBeDefined();
    expect(screen.getByText('CLINT GEEK')).toBeDefined();
  });

  it('should render the ExecutiveSummary component correctly', () => {
    render(<ExecutiveSummary />);
    expect(screen.getByText('Executive Summary')).toBeDefined();
    expect(screen.getByText(/leverage it as a multiplier/i)).toBeDefined();
    expect(screen.getByText(/Context-Plan-Steps/i)).toBeDefined();
  });

  it('should render the WorkflowMethodology component nodes', () => {
    render(<WorkflowMethodology />);
    expect(screen.getByText('AI Workflow Methodology')).toBeDefined();
    expect(screen.getByText('THE_CONTEXT.md')).toBeDefined();
    expect(screen.getByText('THE_PLAN.md')).toBeDefined();
    expect(screen.getByText('THE_STEPS.md')).toBeDefined();
    expect(screen.getByText('Execution Loop')).toBeDefined();
  });

  it('should render the LeverageEvents component with loaded mock events', () => {
    render(<LeverageEvents events={MOCK_EVENTS} />);
    expect(screen.getByText('Major Leverage Events')).toBeDefined();
    expect(screen.getByText('Test Event One')).toBeDefined();
    expect(screen.getByText('Automation')).toBeDefined();
    expect(screen.getByText('Test problem description')).toBeDefined();
    expect(screen.getByText('Test leverage created')).toBeDefined();
  });

  it('should render the Projects component with loaded mock list and links', () => {
    render(<Projects projects={MOCK_PROJECTS} />);
    expect(screen.getByText('Open Source & Personal Projects')).toBeDefined();
    expect(screen.getByText('Mock Project')).toBeDefined();
    expect(screen.getByText('Mock description of a project')).toBeDefined();
    expect(screen.getByText('React')).toBeDefined();
    expect(screen.getByText('TypeScript')).toBeDefined();
    
    // Check links render and have correct hrefs
    const githubLink = screen.getByRole('link', { name: /github repository/i });
    expect(githubLink).toBeDefined();
    expect(githubLink.getAttribute('href')).toBe('https://github.com/test/mock');
  });

  it('should render the Charts summary widgets with mock metrics', () => {
    render(<Charts metrics={MOCK_METRICS} />);
    expect(screen.getByText('Derived Leverage Metrics')).toBeDefined();
    expect(screen.getByText('10')).toBeDefined(); // total_leverage_events
    expect(screen.getByText('5')).toBeDefined();  // total_projects
    expect(screen.getByText('3')).toBeDefined();  // unique_categories_count
    expect(screen.getByText('8')).toBeDefined();  // unique_technologies_count
    expect(screen.getByText('Impact Area Distribution')).toBeDefined();
    expect(screen.getByText('Technology Stack Frequencies')).toBeDefined();
  });

  it('should render the LessonsLearned component', () => {
    render(<LessonsLearned lessons={MOCK_LESSONS} />);
    expect(screen.getByText('Lessons Learned')).toBeDefined();
    expect(screen.getByText('Context Management is King')).toBeDefined();
    expect(screen.getByText('Design for Validation')).toBeDefined();
  });
});
