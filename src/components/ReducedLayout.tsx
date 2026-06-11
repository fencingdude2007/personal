import {
  activities,
  awards,
  contact,
  education,
  experience,
  projects,
  skills,
  tagline,
} from '../data/resume';
import { HeroCanvas } from './HeroCanvas';
import { GlassSection } from './GlassSection';
import './ReducedLayout.css';

export function ReducedLayout() {
  return (
    <div className="reduced-layout">
      <header className="reduced-hero">
        <HeroCanvas frameIndex={197} />
        <div className="reduced-hero__content">
          <h1>{contact.name}</h1>
          <p>{tagline}</p>
        </div>
      </header>

      <section className="section-block">
        <h2>Projects</h2>
        {projects.map((p) => (
          <GlassSection key={p.id} className="reduced-card">
            <h3>{p.name}</h3>
            <p className="reduced-meta">{p.date}</p>
            {p.award && <p className="reduced-award">{p.award}</p>}
            <ul>
              {p.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </GlassSection>
        ))}
      </section>

      <section className="section-block">
        <h2>Experience</h2>
        {experience.map((e) => (
          <GlassSection key={e.id} className="reduced-card">
            <h3>{e.role}</h3>
            <p className="reduced-meta">
              {e.org} · {e.date}
            </p>
            <ul>
              {e.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </GlassSection>
        ))}
      </section>

      <section className="section-block">
        <h2>Education</h2>
        {education.map((e) => (
          <GlassSection key={e.id} className="reduced-card">
            <h3>{e.school}</h3>
            <p className="reduced-meta">{e.degree}</p>
          </GlassSection>
        ))}
        <GlassSection className="reduced-card">
          <h3>Activities & Awards</h3>
          <ul>
            {[...activities, ...awards].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </GlassSection>
        <GlassSection className="reduced-card">
          <h3>Skills</h3>
          <p>
            {[...skills.languages, ...skills.frameworks, ...skills.tools, ...skills.ml].join(
              ' · ',
            )}
          </p>
        </GlassSection>
      </section>

      <section className="section-block">
        <h2>Contact</h2>
        <GlassSection className="reduced-card">
          <p>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </p>
          <p>
            <a href={contact.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>{' '}
            ·{' '}
            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </p>
        </GlassSection>
      </section>
    </div>
  );
}
