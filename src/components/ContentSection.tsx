import type { ReactNode } from 'react';
import { useReveal } from '../hooks/useReveal';

interface ContentSectionProps {
  id: string;
  className?: string;
  children: ReactNode;
}

export function ContentSection({ id, className = '', children }: ContentSectionProps) {
  const { ref, revealed } = useReveal<HTMLElement>();

  return (
    <section
      id={id}
      ref={ref}
      className={`content-section ${revealed ? 'content-section--revealed' : ''} ${className}`}
    >
      {children}
    </section>
  );
}
