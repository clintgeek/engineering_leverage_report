import type { LeverageEvent } from './LeverageEvent';
import type { Project } from './Project';
import type { Metric } from './Metric';
import type { Metadata } from './Metadata';
import type { TimelineEvent } from './TimelineEvent';

export interface ReportData {
  events: LeverageEvent[];
  projects: Project[];
  metrics: Metric;
  metadata: Metadata;
  timeline: TimelineEvent[];
}
