// src/hooks/useActiveSection.ts

import { useState, useEffect, useRef } from 'react';

/**
 * Tracks which section is most visible in the viewport using IntersectionObserver.
 * Returns the ID of the section with the highest intersection ratio.
 *
 * @param sectionIds - Array of DOM element IDs to observe
 * @returns The ID of the currently most-visible section
 */
export function useActiveSection(sectionIds: string[]): string {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? '');

  // Keep a mutable map of intersection ratios so we can compare without
  // putting it in state (avoids stale-closure issues inside the callback).
  const ratiosRef = useRef<Record<string, number>>({});

  useEffect(() => {
    if (sectionIds.length === 0) return;

    // Reset ratios when the observed set changes.
    ratiosRef.current = Object.fromEntries(sectionIds.map((id) => [id, 0]));

    const observer = new IntersectionObserver(
      (entries) => {
        // Update stored ratios for every changed entry.
        entries.forEach((entry) => {
          ratiosRef.current[entry.target.id] = entry.intersectionRatio;
        });

        // Pick the section with the highest ratio.
        const best = sectionIds.reduce((prevId, currId) => {
          const prev = ratiosRef.current[prevId] ?? 0;
          const curr = ratiosRef.current[currId] ?? 0;
          return curr > prev ? currId : prevId;
        }, sectionIds[0]);

        setActiveId(best);
      },
      {
        // Multiple thresholds give us finer-grained ratio updates as the user
        // scrolls through each section.
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    // Observe each section element that exists in the current document.
    const observed: Element[] = [];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
        observed.push(el);
      }
    });

    return () => {
      observed.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, [sectionIds]);

  return activeId;
}
