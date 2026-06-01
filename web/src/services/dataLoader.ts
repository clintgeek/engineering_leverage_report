import type { LeverageEvent } from '../types/LeverageEvent';
import type { Project } from '../types/Project';
import type { Metric } from '../types/Metric';
import type { TimelineEvent } from '../types/TimelineEvent';

// Vite handles importing JSON files directly
import leverageEventsData from '../../../data/leverage-events.json';
import projectsData from '../../../data/projects.json';
import timelineData from '../../../data/timeline.json';
import metricsData from '../../../generated/metrics-derived.json';

export const getLeverageEvents = (): LeverageEvent[] => {
  return leverageEventsData as LeverageEvent[];
};

export const getProjects = (): Project[] => {
  return projectsData as Project[];
};

export const getTimelineEvents = (): TimelineEvent[] => {
  return timelineData as TimelineEvent[];
};

export const getDerivedMetrics = (): Metric => {
  return metricsData as Metric;
};
