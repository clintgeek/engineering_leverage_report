import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LeverageCharts } from '../Charts/LeverageCharts';
import { EventTimeline } from '../Charts/EventTimeline';
import type { TimelineEvent } from '../../types/TimelineEvent';

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
    render(<LeverageCharts />);

    expect(screen.getByLabelText('Delivery compression chart')).toBeDefined();
    expect(screen.getByText('Delivery Compression')).toBeDefined();
    expect(screen.getByText('Traditional solo development')).toBeDefined();
    expect(screen.getByText('12-18 months')).toBeDefined();
    expect(screen.getByText('AI-assisted development')).toBeDefined();
    expect(screen.getByText('A few months')).toBeDefined();
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
