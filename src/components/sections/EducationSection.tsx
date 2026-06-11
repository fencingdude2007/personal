import {
  activities,
  awards,
  education,
  skills,
} from '../../data/resume';
import { ContentSection } from '../ContentSection';
import { GlassSection } from '../GlassSection';
import './EducationSection.css';

export function EducationSection() {
  return (
    <ContentSection id="education" className="education-section">
      <p className="section-label">Background</p>
      <h2 className="section-title">Education</h2>

      <div className="education-section__grid">
        {education.map((edu) => (
          <GlassSection key={edu.id} className="education-card">
            <p className="education-card__date">{edu.date}</p>
            <h3 className="education-card__school">{edu.school}</h3>
            <p className="education-card__degree">{edu.degree}</p>
            <p className="education-card__location">{edu.location}</p>
          </GlassSection>
        ))}

        <GlassSection className="education-card education-card--compact">
          <h3 className="education-card__subtitle">Activities</h3>
          <ul className="education-card__list">
            {activities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </GlassSection>

        <GlassSection className="education-card education-card--compact">
          <h3 className="education-card__subtitle">Awards</h3>
          <ul className="education-card__list">
            {awards.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </GlassSection>

        <GlassSection className="education-card education-card--skills">
          <h3 className="education-card__subtitle">Skills</h3>
          <div className="education-section__skills">
            {[...skills.languages, ...skills.frameworks, ...skills.tools, ...skills.ml].map(
              (skill) => (
                <span key={skill} className="skill-pill">
                  {skill}
                </span>
              ),
            )}
          </div>
        </GlassSection>
      </div>
    </ContentSection>
  );
}
