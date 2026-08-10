// src/utils/smoothScroll.ts
import Lenis from 'lenis';

let lenisInstance: Lenis | null = null;

/**
 * Initializes global Lenis smooth scrolling engine.
 */
export function initSmoothScroll(): Lenis {
  if (lenisInstance) return lenisInstance;

  lenisInstance = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Silky smooth exponential curve
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1.15,
    touchMultiplier: 1.6,
  });

  function raf(time: number) {
    lenisInstance?.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
  return lenisInstance;
}

/**
 * Programmatically scroll to a target element by ID with Lenis smooth animation.
 */
export function smoothScrollTo(targetId: string, offset: number = 85): void {
  const element = document.getElementById(targetId);
  if (!element) return;

  if (lenisInstance) {
    lenisInstance.scrollTo(element, {
      offset: -offset,
      duration: 1.3,
    });
  } else {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}
