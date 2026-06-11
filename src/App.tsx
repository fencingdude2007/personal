import { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { CinematicLighting } from './components/CinematicLighting';
import { LoadingOverlay } from './components/LoadingOverlay';
import { HeroCanvas } from './components/HeroCanvas';
import { Nav } from './components/Nav';
import { ParallaxBackground } from './components/ParallaxBackground';
import { ReducedLayout } from './components/ReducedLayout';
import { ContactSection } from './components/sections/ContactSection';
import { EducationSection } from './components/sections/EducationSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { HeroIntro } from './components/sections/HeroIntro';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { FRAME_COUNT, sections, type SectionId } from './data/resume';
import { useReducedMotion } from './hooks/useReducedMotion';
import './styles/globals.css';

gsap.registerPlugin(ScrollTrigger);

const clamp01 = (t: number) => Math.max(0, Math.min(1, t));
const smoothstep = (t: number) => t * t * (3 - 2 * t);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function App() {
  const reducedMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [contentProgress, setContentProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<SectionId>('hero');
  const scrollJourneyRef = useRef<HTMLDivElement>(null);
  const pinnedStageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  const handleNavigate = useCallback((id: SectionId) => {
    lenisRef.current?.scrollTo(`#${id}`, {
      offset: -90,
      duration: 1.6,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: scrollJourneyRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
        pin: pinnedStageRef.current,
        pinSpacing: false,
        anticipatePin: 1,
        onUpdate: (self) => {
          setProgress(self.progress);
          if (self.isActive) setActiveSection('hero');
        },
      });

      // Drives the fencer's settle + recovery while content scrolls
      ScrollTrigger.create({
        trigger: contentRef.current,
        start: 'top bottom',
        end: 'bottom bottom',
        onUpdate: (self) => setContentProgress(self.progress),
      });
    });

    return () => {
      ctx.revert();
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reducedMotion]);

  // Track active content section for the nav
  useEffect(() => {
    if (reducedMotion) return;

    const elements = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id as SectionId);
          }
        }
      },
      { rootMargin: '-40% 0px -50% 0px' },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      <>
        <div className="grain-overlay" aria-hidden="true" />
        <Nav activeSection="contact" />
        <ReducedLayout />
      </>
    );
  }

  // Hero text visible immediately, fades out over the first ~18% of the intro
  const heroTextOpacity =
    progress < 0.1 ? 1 : progress < 0.18 ? 1 - (progress - 0.1) / 0.08 : 0;

  /**
   * Fencer journey, all scroll-driven:
   * - Intro (progress 0-1): lunge frames 1-198, travels left -> right
   * - Settle (first ~22% of content scroll): holds the lunge, glides from the
   *   right to center while fading to a faint backdrop
   * - Recovery (rest of content scroll): plays the frames in reverse and
   *   drifts back to his initial left-side en-garde position by page bottom
   */
  const FRAME_MAX = FRAME_COUNT - 1;
  const settle = smoothstep(clamp01(contentProgress / 0.22));
  const recovery = smoothstep(clamp01((contentProgress - 0.22) / 0.78));

  const inContent = contentProgress > 0.001;
  const travelX = 0.28 + progress * 0.44;

  const frameIndex = inContent
    ? Math.round((1 - recovery) * FRAME_MAX)
    : Math.round(progress * FRAME_MAX);
  const xCenter = inContent
    ? recovery > 0
      ? lerp(0.5, 0.28, recovery)
      : lerp(0.72, 0.5, settle)
    : travelX;
  const fencerOpacity = inContent ? lerp(0.95, 0.14, settle) : 0.95;
  const glow = !inContent && progress > 0.5;

  return (
    <>
      <LoadingOverlay />
      <div className="grain-overlay" aria-hidden="true" />
      <Nav activeSection={activeSection} onNavigate={handleNavigate} />

      {/* Persistent fencer layer: star of the intro, faint backdrop for content */}
      <div className="fencer-layer" aria-hidden="true">
        <HeroCanvas
          frameIndex={frameIndex}
          xCenter={xCenter}
          opacity={fencerOpacity}
          glow={glow}
        />
      </div>

      {/* Phase 1: cinematic intro overlays */}
      <div ref={scrollJourneyRef} className="scroll-journey">
        <div ref={pinnedStageRef} className="pinned-stage">
          <ParallaxBackground progress={progress} />
          <CinematicLighting progress={progress} />
          <HeroIntro opacity={heroTextOpacity} />
        </div>
      </div>

      {/* Phase 2: resume content */}
      <main ref={contentRef} className="content-main">
        <ProjectsSection />
        <ExperienceSection />
        <EducationSection />
        <ContactSection />
      </main>
    </>
  );
}

export default App;
