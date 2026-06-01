import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LeverageCharts } from '../Charts/LeverageCharts';
import { EventTimeline } from '../Charts/EventTimeline';
import type { Metric } from '../../types/Metric';
import type { TimelineEvent } from '../../types/TimelineEvent';

interface MockResponsiveBarProps {
  data: Array<Record<string, string | number>>;
  keys: string[];
  indexBy: string;
  ariaLabel?: string;
  role?: string;
}

// Mock @nivo/bar to avoid ResizeObserver/JSDOM rendering limitations
vi.mock('@nivo/bar', () => ({
  ResponsiveBar: ({ data, keys, indexBy, ariaLabel, role }: MockResponsiveBarProps) => (
    <div data-testid="mock-responsive-bar" aria-label={ariaLabel} role={role}>
      {data.map((item) => (
        <span key={String(item[indexBy])} data-testid="bar-item" data-item-value={String(item[keys[0]])}>
          {String(item[indexBy])}
        </span>
      ))}
    </div>
  ),
}));

const MOCK_METRICS: Metric = {
  summary: {
    total_leverage_events: 10,
    total_projects: 5,
    unique_categories_count: 2,
    unique_technologies_count: 3
  },
  categories: {
    "Automation": 4,
    "Software Engineering": 6
  },
  technologies: {
    "React": 3,
    "TypeScript": 2,
    "Python": 1
  }
};

const MOCK_TIMELINE: TimelineEvent[] = [
  {
    id: "milestone-1",
    title: "Copilot Rollout",
    date: "July 2025",
    description: "Rolled out Copilot to a 24-person engineering org.",
    category: "Enablement"
  },
  {
    id: "milestone-2",
    title: "Python Acceleration",
    date: "October 2025",
    description: "Accelerated learning curves via generative pair programming.",
    category: "Learning"
  }
];

describe('Visualizations & Timeline Components', () => {
  it('should render Nivo chart wrappers with expected transform structures', () => {
    render(<LeverageCharts metrics={MOCK_METRICS} />);
    
    // We expect two mock-responsive-bar components
    const charts = screen.getAllByTestId('mock-responsive-bar');
    expect(charts.length).toBe(2);

    // Verify first chart (Impact Area / Category Distribution) has elements
    expect(screen.getByLabelText('Impact Area Distribution Chart')).toBeDefined();
    expect(screen.getByText('Automation')).toBeDefined();
    expect(screen.getByText('Software Engineering')).toBeDefined();

    // Verify second chart (Technology Stack Frequencies) has elements
    expect(screen.getByLabelText('Technology Stack Frequencies Chart')).toBeDefined();
    expect(screen.getByText('React')).toBeDefined();
    expect(screen.getByText('TypeScript')).toBeDefined();
    expect(screen.getByText('Python')).toBeDefined();
  });

  it('should render EventTimeline correctly with given milestones', () => {
    render(<EventTimeline timeline={MOCK_TIMELINE} />);
    
    expect(screen.getByText('Milestone Timeline')).toBeDefined();
    
    // Validate first event
    expect(screen.getByText('Copilot Rollout')).toBeDefined();
    expect(screen.getByText('July 2025')).toBeDefined();
    expect(screen.getByText('Enablement')).toBeDefined();
    expect(screen.getByText('Rolled out Copilot to a 24-person engineering org.')).toBeDefined();

    // Validate second event
    expect(screen.getByText('Python Acceleration')).toBeDefined();
    expect(screen.getByText('October 2025')).toBeDefined();
    expect(screen.getByText('Learning')).toBeDefined();
    expect(screen.getByText('Accelerated learning curves via generative pair programming.')).toBeDefined();
  });
});
