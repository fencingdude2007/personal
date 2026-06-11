import { projects } from '../../data/resume';
import { ContentSection } from '../ContentSection';
import { GlassSection } from '../GlassSection';
import './ProjectsSection.css';

export function ProjectsSection() {
  return (
    <ContentSection id="projects" className="projects-section">
      <p className="section-label">Selected Work</p>
      <h2 className="section-title">Projects</h2>
      <div className="projects-section__list">
        {projects.map((project, i) => (
          <GlassSection key={project.id} className="project-card">
            <div className="project-card__header">
              <span className="project-card__index">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="project-card__name">{project.name}</h3>
                <p className="project-card__date">{project.date}</p>
              </div>
            </div>
            {project.award && (
              <p className="project-card__award">{project.award}</p>
            )}
            <ul className="project-card__bullets">
              {project.bullets.map((bullet, j) => (
                <li key={j}>{bullet}</li>
              ))}
            </ul>
            <div className="project-card__tags">
              {project.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </GlassSection>
        ))}
      </div>
    </ContentSection>
  );
}
