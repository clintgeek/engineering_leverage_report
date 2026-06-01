import React from 'react';
import type { Project } from '../../types/Project';

interface ProjectsProps {
  projects: Project[];
}

export const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  return (
    <section className="section-container" id="projects">
      <h2 className="section-title">Open Source & Personal Projects</h2>
      <p className="section-subtitle">
        Software projects built or optimized using AI pair-programming and modular automation tools.
      </p>

      <div className="projects-list">
        {projects.map((project) => (
          <div key={project.id} className="glass-card project-card">
            <h3 className="project-title">{project.name}</h3>
            <p className="project-description">{project.description}</p>
            
            <div className="project-tech-tags">
              {project.technologies.map((tech) => (
                <span key={tech} className="tech-badge">{tech}</span>
              ))}
            </div>
            
            <div className="project-links">
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                  GitHub Repository
                </a>
              )}
              {project.websiteUrl && (
                <a href={project.websiteUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  Live Platform
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
