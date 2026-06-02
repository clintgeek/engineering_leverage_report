import type { LeverageEvent } from '../types/LeverageEvent';
import type { Project } from '../types/Project';
import type { Metric } from '../types/Metric';
import type { TimelineEvent } from '../types/TimelineEvent';
import type { Metadata } from '../types/Metadata';
import type { ReportData } from '../types/ReportData';

import leverageEventsData from '../../../data/leverage-events.json';
import projectsData from '../../../data/projects.json';
import timelineData from '../../../data/timeline.json';
import metadataData from '../../../data/metadata.json';

export const getLeverageEvents = (): LeverageEvent[] =>
  leverageEventsData as LeverageEvent[];

export const getProjects = (): Project[] =>
  projectsData as Project[];

export const getTimelineEvents = (): TimelineEvent[] =>
  timelineData as TimelineEvent[];

export const getMetadata = (): Metadata =>
  metadataData as Metadata;

export const getDerivedMetrics = (): Metric => {
  const events   = getLeverageEvents();
  const projects = getProjects();

  const categories: Record<string, number> = {};
  for (const event of events) {
    const cat = event.category ?? 'Unknown';
    categories[cat] = (categories[cat] ?? 0) + 1;
  }

  const technologies: Record<string, number> = {};
  for (const project of projects) {
    for (const tech of project.technologies ?? []) {
      technologies[tech] = (technologies[tech] ?? 0) + 1;
    }
  }

  return {
    summary: {
      total_leverage_events:    events.length,
      total_projects:           projects.length,
      unique_categories_count:  Object.keys(categories).length,
      unique_technologies_count: Object.keys(technologies).length,
    },
    categories,
    technologies,
  };
};

export const getReportData = (): ReportData => ({
  events:   getLeverageEvents(),
  projects: getProjects(),
  timeline: getTimelineEvents(),
  metrics:  getDerivedMetrics(),
  metadata: getMetadata(),
});
