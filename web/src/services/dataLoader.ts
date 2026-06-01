import type { LeverageEvent } from '../types/LeverageEvent';
import type { Project } from '../types/Project';
import type { Metric } from '../types/Metric';
import type { TimelineEvent } from '../types/TimelineEvent';
import type { Metadata } from '../types/Metadata';
import type { ReportData } from '../types/ReportData';

// Vite handles importing JSON files directly
import leverageEventsData from '../../../data/leverage-events.json';
import projectsData from '../../../data/projects.json';
import timelineData from '../../../data/timeline.json';
import metricsData from '../../../generated/metrics-derived.json';
import metadataData from '../../../data/metadata.json';

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

export const getMetadata = (): Metadata => {
  return metadataData as Metadata;
};

export const getReportData = (): ReportData => {
  return {
    events: getLeverageEvents(),
    projects: getProjects(),
    timeline: getTimelineEvents(),
    metrics: getDerivedMetrics(),
    metadata: getMetadata()
  };
};
