import { useEffect, useRef } from 'react';
import { useFrameSequence } from '../context/FrameSequenceContext';
import './HeroCanvas.css';

interface HeroCanvasProps {
  frameIndex: number;
  /** Horizontal center of the fencer, as a fraction of viewport width */
  xCenter?: number;
  opacity?: number;
  glow?: boolean;
}

function drawFrame(
  canvas: HTMLCanvasElement,
  frame: HTMLCanvasElement,
  xCenter: number,
) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  if (rect.width === 0 || rect.height === 0) return;

  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  ctx.clearRect(0, 0, rect.width, rect.height);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  const imgAspect = frame.width / frame.height;
  const canvasAspect = rect.width / rect.height;

  let drawWidth: number;
  let drawHeight: number;

  if (imgAspect > canvasAspect) {
    drawHeight = rect.height * 0.85;
    drawWidth = drawHeight * imgAspect;
  } else {
    drawWidth = rect.width * 0.55;
    drawHeight = drawWidth / imgAspect;
  }

  const x = rect.width * xCenter - drawWidth / 2;
  const y = rect.height * 0.54 - drawHeight / 2;

  ctx.drawImage(frame, x, y, drawWidth, drawHeight);
}

export function HeroCanvas({
  frameIndex,
  xCenter = 0.72,
  opacity = 0.95,
  glow = false,
}: HeroCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { getFrame, isReady } = useFrameSequence();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const frame = getFrame(frameIndex);
    if (!frame) return;
    drawFrame(canvas, frame, xCenter);
  }, [frameIndex, xCenter, getFrame, isReady]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const observer = new ResizeObserver(() => {
      const frame = getFrame(frameIndex);
      if (frame) drawFrame(canvas, frame, xCenter);
    });
    observer.observe(canvas);
    return () => observer.disconnect();
  }, [frameIndex, xCenter, getFrame]);

  return (
    <canvas
      ref={canvasRef}
      className={`hero-canvas ${glow ? 'hero-canvas--glow' : ''}`}
      aria-hidden="true"
      style={{
        opacity,
        visibility: isReady ? 'visible' : 'hidden',
      }}
    />
  );
}
