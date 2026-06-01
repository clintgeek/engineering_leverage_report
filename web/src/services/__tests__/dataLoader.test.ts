import { describe, it, expect } from 'vitest';
import { getLeverageEvents, getProjects, getDerivedMetrics, getTimelineEvents } from '../dataLoader';

describe('dataLoader', () => {
  it('should successfully load leverage events with expected fields', () => {
    const events = getLeverageEvents();
    expect(Array.isArray(events)).toBe(true);
    expect(events.length).toBeGreaterThan(0);
    
    const firstEvent = events[0];
    expect(firstEvent).toHaveProperty('id');
    expect(firstEvent).toHaveProperty('title');
    expect(firstEvent).toHaveProperty('category');
    expect(firstEvent).toHaveProperty('problem');
    expect(firstEvent).toHaveProperty('approach');
    expect(firstEvent).toHaveProperty('outcome');
    expect(firstEvent).toHaveProperty('leverage');
  });

  it('should load projects list containing GeekSuite and geekPR', () => {
    const projects = getProjects();
    expect(Array.isArray(projects)).toBe(true);
    expect(projects.length).toBeGreaterThan(0);

    const projectNames = projects.map(p => p.name);
    expect(projectNames).toContain('GeekSuite');
    expect(projectNames).toContain('geekPR');
  });

  it('should retrieve correctly computed derived metrics from build output without strict count coupling', () => {
    const metrics = getDerivedMetrics();
    const events = getLeverageEvents();
    const projects = getProjects();

    expect(metrics).toBeDefined();
    expect(metrics.summary).toBeDefined();
    
    // Decoupled from hardcoded content: compare summary metrics to loaded source data counts
    expect(metrics.summary.total_leverage_events).toBe(events.length);
    expect(metrics.summary.total_projects).toBe(projects.length);
    
    expect(Object.keys(metrics.categories).length).toBeGreaterThan(0);
    expect(Object.keys(metrics.technologies).length).toBeGreaterThan(0);
  });

  it('should load timeline events list', () => {
    const timeline = getTimelineEvents();
    expect(Array.isArray(timeline)).toBe(true);
  });

  it('should provide unique leverage event ids', () => {
    const events = getLeverageEvents();
    const ids = events.map(e => e.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('should load all leverage events with required fields populated', () => {
    const events = getLeverageEvents();
    events.forEach(event => {
      expect(event.id).toBeTruthy();
      expect(event.title).toBeTruthy();
      expect(event.problem).toBeTruthy();
      expect(event.approach).toBeTruthy();
      expect(event.outcome).toBeTruthy();
      expect(event.leverage).toBeTruthy();
    });
  });
});
