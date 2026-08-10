// src/hooks/useActiveSection.test.ts

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useActiveSection } from './useActiveSection';

// ---------------------------------------------------------------------------
// IntersectionObserver mock
// ---------------------------------------------------------------------------
// jsdom doesn't implement IntersectionObserver, so we provide a controllable
// stub that lets us manually trigger intersection callbacks in tests.

type IOCallback = (entries: IntersectionObserverEntry[]) => void;

let capturedCallbacks: IOCallback[] = [];
let observedElements: Map<Element, string> = new Map();

class MockIntersectionObserver {
  constructor(callback: IOCallback) {
    capturedCallbacks.push(callback);
  }

  observe(el: Element) {
    observedElements.set(el, el.id);
  }

  unobserve(el: Element) {
    observedElements.delete(el);
  }

  disconnect() {
    observedElements.clear();
  }
}

// Helper to fire an intersection event from outside
function triggerIntersection(el: Element, ratio: number) {
  const entry = {
    target: el,
    intersectionRatio: ratio,
    isIntersecting: ratio > 0,
  } as unknown as IntersectionObserverEntry;

  capturedCallbacks.forEach((cb) => cb([entry]));
}

// ---------------------------------------------------------------------------
// Setup / teardown
// ---------------------------------------------------------------------------
beforeEach(() => {
  capturedCallbacks = [];
  observedElements = new Map();
  vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
});

afterEach(() => {
  vi.unstubAllGlobals();
  document.body.innerHTML = '';
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function createSection(id: string): HTMLElement {
  const el = document.createElement('section');
  el.id = id;
  document.body.appendChild(el);
  return el;
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------
describe('useActiveSection', () => {
  it('returns the first section id as initial active section', () => {
    createSection('beranda');
    createSection('layanan');

    const { result } = renderHook(() => useActiveSection(['beranda', 'layanan']));
    expect(result.current).toBe('beranda');
  });

  it('returns empty string when sectionIds array is empty', () => {
    const { result } = renderHook(() => useActiveSection([]));
    expect(result.current).toBe('');
  });

  it('updates active section when a section enters the viewport', () => {
    const beranda = createSection('beranda');
    const layanan = createSection('layanan');

    const { result } = renderHook(() => useActiveSection(['beranda', 'layanan']));

    act(() => {
      triggerIntersection(layanan, 0.8);
      triggerIntersection(beranda, 0.1);
    });

    expect(result.current).toBe('layanan');
  });

  it('picks the section with the highest intersection ratio', () => {
    const s1 = createSection('s1');
    const s2 = createSection('s2');
    const s3 = createSection('s3');

    const { result } = renderHook(() => useActiveSection(['s1', 's2', 's3']));

    act(() => {
      triggerIntersection(s1, 0.3);
      triggerIntersection(s2, 0.9);
      triggerIntersection(s3, 0.5);
    });

    expect(result.current).toBe('s2');
  });

  it('remains on the first section when no intersection events fire', () => {
    createSection('home');
    createSection('about');

    const { result } = renderHook(() => useActiveSection(['home', 'about']));
    expect(result.current).toBe('home');
  });

  it('gracefully ignores section IDs that have no DOM element', () => {
    // Only 'beranda' exists in the DOM; 'missing' does not
    createSection('beranda');

    const { result } = renderHook(() => useActiveSection(['beranda', 'missing']));
    // Should still return something (beranda is the fallback)
    expect(result.current).toBe('beranda');
  });
});
