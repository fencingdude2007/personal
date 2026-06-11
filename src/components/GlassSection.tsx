import type { CSSProperties, ReactNode } from 'react';

interface GlassSectionProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function GlassSection({
  children,
  className = '',
  style,
}: GlassSectionProps) {
  return (
    <div className={`glass ${className}`} style={style}>
      {children}
    </div>
  );
}
