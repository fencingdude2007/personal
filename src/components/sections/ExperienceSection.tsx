import { experience } from '../../data/resume';
import { ContentSection } from '../ContentSection';
import { GlassSection } from '../GlassSection';
import './ExperienceSection.css';

export function ExperienceSection() {
  return (
    <ContentSection id="experience" className="experience-section">
      <p className="section-label">Career</p>
      <h2 className="section-title">Experience</h2>
      <div className="experience-section__timeline">
        {experience.map((item, i) => (
          <GlassSection key={item.id} className="experience-card">
            <div className="experience-card__marker">
              <span className="experience-card__dot" />
              {i < experience.length - 1 && (
                <span className="experience-card__line" />
              )}
            </div>
            <div className="experience-card__content">
              <div className="experience-card__meta">
                <span className="experience-card__date">{item.date}</span>
              </div>
              <h3 className="experience-card__role">{item.role}</h3>
              <p className="experience-card__org">
                {item.org} · {item.location}
              </p>
              <ul className="experience-card__bullets">
                {item.bullets.map((bullet, j) => (
                  <li key={j}>{bullet}</li>
                ))}
              </ul>
            </div>
          </GlassSection>
        ))}
      </div>
    </ContentSection>
  );
}
