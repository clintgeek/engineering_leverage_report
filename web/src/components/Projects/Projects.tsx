import React from 'react';
import type { Project } from '../../types/Project';

interface ProjectsProps {
  projects: Project[];
}

export const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  return (
    <section className="section-container" id="projects">
      <h2 className="section-title">Projects</h2>
      <p className="section-subtitle">
        Supporting evidence. The projects are proof that the workflow works beyond one conversation.
      </p>

      <div className="projects-list">
        {projects.map((project) => (
          <article key={project.id} className="project-entry">
            <div className="project-header">
              <p className="note-meta">Project</p>
              <h3 className="project-title">{project.name}</h3>
            </div>

            <p className="project-description">{project.description}</p>

            <div className="project-links" aria-label={`${project.name} links`}>
              {project.websiteUrl && (
                <a href={project.websiteUrl} target="_blank" rel="noopener noreferrer">Portfolio</a>
              )}
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">Source Code</a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
