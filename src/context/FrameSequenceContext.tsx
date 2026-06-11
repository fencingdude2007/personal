import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { FRAME_COUNT, getFramePath } from '../data/resume';

interface FrameSequenceContextValue {
  getFrame: (index: number) => HTMLCanvasElement | null;
  loadedCount: number;
  totalFrames: number;
  isReady: boolean;
  loadProgress: number;
}

const FrameSequenceContext = createContext<FrameSequenceContextValue | null>(
  null,
);

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

/**
 * Key out the dark video background (true alpha) and erase the
 * Veo watermark in the bottom-right corner, so only the fencer remains.
 */
function processFrame(img: HTMLImageElement): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext('2d', { willReadFrequently: true })!;
  ctx.drawImage(img, 0, 0);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const px = imageData.data;

  // Soft luminance key: fully transparent below LOW, opaque above HIGH
  const LOW = 34;
  const HIGH = 78;
  for (let i = 0; i < px.length; i += 4) {
    const lum = 0.2126 * px[i] + 0.7152 * px[i + 1] + 0.0722 * px[i + 2];
    if (lum <= LOW) {
      px[i + 3] = 0;
    } else if (lum < HIGH) {
      px[i + 3] = Math.round(((lum - LOW) / (HIGH - LOW)) * 255);
    }
  }
  ctx.putImageData(imageData, 0, 0);

  // Erase the watermark corner
  ctx.clearRect(canvas.width * 0.86, canvas.height * 0.88, canvas.width * 0.14, canvas.height * 0.12);

  return canvas;
}

function getPriorityIndices(): number[] {
  const first = Array.from({ length: 10 }, (_, i) => i);
  const last = Array.from({ length: 9 }, (_, i) => FRAME_COUNT - 9 + i);
  const rest = Array.from({ length: FRAME_COUNT }, (_, i) => i).filter(
    (i) => !first.includes(i) && !last.includes(i),
  );
  return [...first, ...last, ...rest];
}

export function FrameSequenceProvider({ children }: { children: ReactNode }) {
  const framesRef = useRef<(HTMLCanvasElement | null)[]>(
    Array(FRAME_COUNT).fill(null),
  );
  const [loadedCount, setLoadedCount] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const indices = getPriorityIndices();

    async function preload() {
      const batchSize = 12;
      for (let i = 0; i < indices.length; i += batchSize) {
        if (cancelled) return;
        const batch = indices.slice(i, i + batchSize);
        await Promise.all(
          batch.map(async (index) => {
            if (framesRef.current[index]) return;
            try {
              const img = await loadImage(getFramePath(index));
              if (!cancelled) {
                framesRef.current[index] = processFrame(img);
                setLoadedCount((c) => c + 1);
                if (index === 0 || index === FRAME_COUNT - 1) {
                  setIsReady(true);
                }
              }
            } catch {
              // skip failed frames
            }
          }),
        );
      }
      if (!cancelled) setIsReady(true);
    }

    preload();
    return () => {
      cancelled = true;
    };
  }, []);

  const getFrame = useCallback((index: number): HTMLCanvasElement | null => {
    const clamped = Math.max(0, Math.min(FRAME_COUNT - 1, Math.round(index)));
    return framesRef.current[clamped];
  }, []);

  return (
    <FrameSequenceContext.Provider
      value={{
        getFrame,
        loadedCount,
        totalFrames: FRAME_COUNT,
        isReady,
        loadProgress: loadedCount / FRAME_COUNT,
      }}
    >
      {children}
    </FrameSequenceContext.Provider>
  );
}

export function useFrameSequence(): FrameSequenceContextValue {
  const ctx = useContext(FrameSequenceContext);
  if (!ctx) {
    throw new Error('useFrameSequence must be used within FrameSequenceProvider');
  }
  return ctx;
}
