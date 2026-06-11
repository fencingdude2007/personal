import './CinematicLighting.css';

interface CinematicLightingProps {
  progress: number;
}

export function CinematicLighting({ progress }: CinematicLightingProps) {
  const keyLightX = 30 + progress * 40;
  const keyLightY = 20 + progress * 15;
  const rimIntensity = 0.08 + Math.sin(progress * Math.PI) * 0.12;
  const accentOpacity = progress > 0.75 ? (progress - 0.75) * 4 : 0;

  return (
    <div className="cinematic-lighting" aria-hidden="true">
      <div
        className="cinematic-lighting__key"
        style={{
          background: `radial-gradient(ellipse 60% 50% at ${keyLightX}% ${keyLightY}%, rgba(168, 200, 255, ${0.06 + progress * 0.04}) 0%, transparent 70%)`,
        }}
      />
      <div
        className="cinematic-lighting__rim"
        style={{
          opacity: rimIntensity,
        }}
      />
      <div
        className="cinematic-lighting__accent"
        style={{
          opacity: accentOpacity,
          transform: `translateX(${progress * 20}%)`,
        }}
      />
      <div className="cinematic-lighting__vignette" />
    </div>
  );
}
