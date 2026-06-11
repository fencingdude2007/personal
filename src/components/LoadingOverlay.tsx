import { useFrameSequence } from '../context/FrameSequenceContext';
import './LoadingOverlay.css';

export function LoadingOverlay() {
  const { isReady, loadProgress } = useFrameSequence();

  if (isReady) return null;

  return (
    <div className="loading-overlay" aria-live="polite" aria-busy="true">
      <div className="loading-overlay__content">
        <div className="loading-overlay__bar">
          <div
            className="loading-overlay__fill"
            style={{ width: `${Math.round(loadProgress * 100)}%` }}
          />
        </div>
        <p className="loading-overlay__text">Loading experience…</p>
      </div>
    </div>
  );
}
