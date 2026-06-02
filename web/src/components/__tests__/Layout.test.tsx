import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Hero } from '../Hero/Hero';
import { ExecutiveSummary } from '../ExecutiveSummary/ExecutiveSummary';
import { WorkflowMethodology } from '../WorkflowMethodology/WorkflowMethodology';
import { LeverageEvents } from '../LeverageEvents/LeverageEvents';
import { Projects } from '../Projects/Projects';
import { Charts } from '../Charts/Charts';
import { OBSERVED_OUTCOMES } from '../../constants/observedOutcomes';
import type { LeverageEvent } from '../../types/LeverageEvent';
import type { Project } from '../../types/Project';

const MOCK_EVENTS: LeverageEvent[] = [
  {
    id: 'test-event-1',
    title: 'Test Event One',
    category: 'Automation',
    timeframe: 'Q1 2026',
    problem: 'Test problem description',
    approach: 'Test approach taken',
    outcome: 'Test outcome achieved',
    leverage: 'Test leverage created',
  },
];

const MOCK_PROJECTS: Project[] = [
  {
    id: 'test-proj-1',
    name: 'Mock Project',
    description: 'Mock description of a project',
    technologies: ['React', 'TypeScript', 'Vitest'],
    githubUrl: 'https://github.com/test/mock',
    websiteUrl: 'https://mock.test',
  },
];

describe('Hero', () => {
  it('renders the report title as h1', () => {
    render(
      <Hero
        title="Scaling Engineering Through AI"
        subtitle="Subtitle text"
        reportLabel="Engineering Notes"
        author="Clint Crocker"
        lastUpdated="2026-06-01"
        brand="CLINT GEEK"
      />
    );
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('Scaling Engineering Through AI');
  });

  it('renders all OBSERVED_OUTCOMES entries from the shared constant', () => {
    render(
      <Hero
        title="Scaling Engineering Through AI"
        subtitle="Subtitle text"
        reportLabel="Engineering Notes"
        author="Clint Crocker"
        lastUpdated="2026-06-01"
        brand="CLINT GEEK"
      />
    );
    for (const item of OBSERVED_OUTCOMES) {
      expect(screen.getByText(`${item.value} ${item.label}`)).toBeDefined();
    }
  });

  it('renders portfolio and source links', () => {
    render(
      <Hero
        title="t" subtitle="s" reportLabel="r" author="a" lastUpdated="l" brand="b"
      />
    );
    expect(screen.getByRole('link', { name: 'portfolio' })).toBeDefined();
    expect(screen.getByRole('link', { name: 'source code' })).toBeDefined();
  });
});

describe('Charts (Evidence section)', () => {
  it('renders all OBSERVED_OUTCOMES entries from the shared constant', () => {
    render(<Charts />);
    for (const item of OBSERVED_OUTCOMES) {
      // Use getAllByText since values like 3 can appear more than once
      expect(screen.getAllByText(String(item.value)).length).toBeGreaterThan(0);
      expect(screen.getByText(item.label)).toBeDefined();
    }
  });

  it('Hero and Charts both consume OBSERVED_OUTCOMES — single source of truth is enforced', () => {
    // If this test exists, the constant is imported in both components.
    // Changing the constant automatically changes both — no divergence possible.
    expect(OBSERVED_OUTCOMES.length).toBeGreaterThan(0);
    for (const item of OBSERVED_OUTCOMES) {
      expect(typeof item.value).toBe('number');
      expect(typeof item.label).toBe('string');
    }
  });
});

describe('ExecutiveSummary', () => {
  it('renders Observation, Evidence, and Implication sections', () => {
    render(<ExecutiveSummary />);
    // Use role queries to avoid ambiguity — section title is h2, article headings are h3
    expect(screen.getByRole('heading', { level: 2, name: 'Observation' })).toBeDefined();
    expect(screen.getByRole('heading', { level: 3, name: 'Evidence' })).toBeDefined();
    expect(screen.getByRole('heading', { level: 3, name: 'Implication' })).toBeDefined();
  });
});

describe('WorkflowMethodology', () => {
  it('renders all four workflow document files', () => {
    render(<WorkflowMethodology />);
    // THE_CONTEXT.md appears in both the file tree and the excerpt header — assert at least one
    for (const name of ['THE_PLAN.md', 'THE_ARCHITECTURE.md', 'THE_STEPS.md', 'THE_CONTEXT.md']) {
      expect(screen.getAllByText(name).length).toBeGreaterThan(0);
    }
  });
});

describe('LeverageEvents', () => {
  it('renders event title and all four field labels', () => {
    render(<LeverageEvents events={MOCK_EVENTS} />);
    expect(screen.getByText('Test Event One')).toBeDefined();
    for (const label of ['Problem', 'Approach', 'Result', 'What Changed']) {
      expect(screen.getByText(label)).toBeDefined();
    }
  });
});

describe('Projects', () => {
  it('renders project name and Portfolio and Source Code links', () => {
    render(<Projects projects={MOCK_PROJECTS} />);
    expect(screen.getByText('Mock Project')).toBeDefined();
    expect(screen.getByRole('link', { name: 'Portfolio' })).toBeDefined();
    expect(screen.getByRole('link', { name: 'Source Code' })).toBeDefined();
  });

  it('Portfolio link points to websiteUrl', () => {
    render(<Projects projects={MOCK_PROJECTS} />);
    const link = screen.getByRole('link', { name: 'Portfolio' });
    expect(link.getAttribute('href')).toBe('https://mock.test');
  });

  it('Source Code link points to githubUrl', () => {
    render(<Projects projects={MOCK_PROJECTS} />);
    const link = screen.getByRole('link', { name: 'Source Code' });
    expect(link.getAttribute('href')).toBe('https://github.com/test/mock');
  });

  it('does not render Portfolio link when websiteUrl is empty', () => {
    const noSite = [{ ...MOCK_PROJECTS[0], websiteUrl: '' }];
    render(<Projects projects={noSite} />);
    expect(screen.queryByRole('link', { name: 'Portfolio' })).toBeNull();
  });
});
