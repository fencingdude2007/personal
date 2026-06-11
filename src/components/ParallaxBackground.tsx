import './ParallaxBackground.css';

interface ParallaxBackgroundProps {
  progress: number;
}

export function ParallaxBackground({ progress }: ParallaxBackgroundProps) {
  return (
    <div className="parallax-bg" aria-hidden="true">
      <div
        className="parallax-bg__deep"
        style={{ transform: `translateY(${progress * -120}px)` }}
      >
        <span className="parallax-bg__name">AIDAN LEE</span>
      </div>

      <div
        className="parallax-bg__grid"
        style={{ transform: `translateY(${progress * -60}px)` }}
      />

      <div
        className="parallax-bg__particles"
        style={{ transform: `translateY(${progress * -30}px)` }}
      >
        {Array.from({ length: 20 }).map((_, i) => (
          <span
            key={i}
            className="parallax-bg__particle"
            style={{
              left: `${(i * 17 + 5) % 95}%`,
              top: `${(i * 23 + 10) % 90}%`,
              opacity: 0.15 + (i % 5) * 0.05,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
