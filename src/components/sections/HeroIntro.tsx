import { contact, tagline } from '../../data/resume';
import './HeroIntro.css';

interface HeroIntroProps {
  opacity: number;
}

export function HeroIntro({ opacity }: HeroIntroProps) {
  const visible = opacity > 0.01;

  return (
    <div
      className="hero-intro"
      style={{ opacity: visible ? opacity : 0 }}
      aria-hidden={!visible}
    >
      <p className="hero-intro__eyebrow">Portfolio</p>
      <h1 className="hero-intro__name">{contact.name}</h1>
      <p className="hero-intro__tagline">{tagline}</p>
      <div className="hero-intro__scroll-hint">
        <span className="hero-intro__scroll-line" />
        <span>Scroll to explore</span>
        <span className="hero-intro__scroll-line hero-intro__scroll-line--flip" />
      </div>
    </div>
  );
}
