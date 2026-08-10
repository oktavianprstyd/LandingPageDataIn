// src/components/common/SectionWrapper.tsx
import { ReactNode, CSSProperties } from 'react';

interface SectionWrapperProps {
  id?: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

/**
 * Semantic <section> wrapper with consistent vertical padding.
 * Provides HTML landmark for accessibility and SEO. Satisfies Requirements 9.1, 9.8.
 */
export default function SectionWrapper({ id, className = '', style, children }: SectionWrapperProps) {
  return (
    <section id={id} style={style} className={`py-20 lg:py-28 ${className}`.trim()}>
      {children}
    </section>
  );
}
