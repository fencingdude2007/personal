import { contact } from '../../data/resume';
import { ContentSection } from '../ContentSection';
import { GlassSection } from '../GlassSection';
import './ContactSection.css';

export function ContactSection() {
  return (
    <ContentSection id="contact" className="contact-section">
      <p className="section-label">Get in Touch</p>
      <h2 className="section-title">Contact</h2>

      <GlassSection className="contact-card">
        <p className="contact-card__message">
          Open to research collaborations, internships, and interesting projects.
        </p>

        <div className="contact-card__links">
          <a href={`mailto:${contact.email}`} className="contact-link">
            <span className="contact-link__icon">✉</span>
            <span>{contact.email}</span>
          </a>

          <a
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
          >
            <span className="contact-link__icon">⌘</span>
            <span>GitHub</span>
          </a>

          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
          >
            <span className="contact-link__icon">in</span>
            <span>LinkedIn</span>
          </a>
        </div>

        <p className="contact-card__location">
          {contact.location} · {contact.phone}
        </p>
      </GlassSection>
    </ContentSection>
  );
}
