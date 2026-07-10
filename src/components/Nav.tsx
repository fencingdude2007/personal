import { resumeUrl, sections, type SectionId } from '../data/resume';
import './Nav.css';

interface NavProps {
  activeSection: SectionId;
  onNavigate?: (id: SectionId) => void;
}

export function Nav({ activeSection, onNavigate }: NavProps) {
  return (
    <nav className="nav" aria-label="Main navigation">
      <a href="#" className="nav__logo" onClick={(e) => e.preventDefault()}>
        AL
      </a>

      <ul className="nav__links">
        {sections.map((section) => (
          <li key={section.id}>
            <button
              type="button"
              className={`nav__link ${activeSection === section.id ? 'nav__link--active' : ''}`}
              onClick={() => onNavigate?.(section.id)}
              aria-current={activeSection === section.id ? 'true' : undefined}
            >
              {section.label}
            </button>
          </li>
        ))}
      </ul>

      <div className="nav__right">
        <a
          href={resumeUrl}
          download
          className="nav__resume"
          aria-label="Download resume (PDF)"
        >
          Resume
        </a>

        <div className="nav__progress">
          {sections.map((section) => (
            <span
              key={section.id}
              className={`nav__dot ${activeSection === section.id ? 'nav__dot--active' : ''}`}
            />
          ))}
        </div>
      </div>
    </nav>
  );
}
