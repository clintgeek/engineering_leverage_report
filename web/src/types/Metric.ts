export interface MetricSummary {
  total_leverage_events: number;
  total_projects: number;
  unique_categories_count: number;
  unique_technologies_count: number;
}

export interface Metric {
  summary: MetricSummary;
  categories: Record<string, number>;
  technologies: Record<string, number>;
}
