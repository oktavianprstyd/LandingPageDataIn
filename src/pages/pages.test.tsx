// src/pages/pages.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import LandingPage from './LandingPage';
import ProfilePage from './ProfilePage';

// Mock IntersectionObserver for useActiveSection hook
beforeEach(() => {
  window.IntersectionObserver = class IntersectionObserver {
    readonly root: Element | null = null;
    readonly rootMargin: string = '';
    readonly thresholds: ReadonlyArray<number> = [];
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  };
});

describe('LandingPage', () => {
  it('renders all key sections and elements', () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <LandingPage />
        </MemoryRouter>
      </HelmetProvider>
    );

    // Hero Section Heading
    expect(screen.getByRole('heading', { level: 1, name: /Selesaikan Urusan Kampus/i })).toBeInTheDocument();

    // Service Section
    expect(screen.getByRole('heading', { name: /Kenapa Kamu Perlu Layanan DataIn/i })).toBeInTheDocument();

    // Advantage Section
    expect(screen.getByRole('heading', { name: /Keunggulan/i })).toBeInTheDocument();

    // Testimonial Section
    expect(screen.getByRole('heading', { name: /Kata Mereka/i })).toBeInTheDocument();

    // FAQ Section
    expect(screen.getByRole('heading', { name: /Sering Ditanyakan/i })).toBeInTheDocument();
  });
});

describe('ProfilePage', () => {
  it('renders profile heading, vision/mission, team, and core values', () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <ProfilePage />
        </MemoryRouter>
      </HelmetProvider>
    );

    // Profile Heading (Requirement 8.1)
    expect(screen.getByRole('heading', { level: 1, name: /Tentang DataIn/i })).toBeInTheDocument();

    // Vision and Mission (Requirement 8.2)
    expect(screen.getByRole('heading', { name: /Visi Kami/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Misi Kami/i })).toBeInTheDocument();

    // Team Section (Requirement 8.3)
    expect(screen.getByRole('heading', { name: /Tim Kami/i })).toBeInTheDocument();

    // Core Values Section (Requirement 8.5)
    expect(screen.getByRole('heading', { name: /Nilai-Nilai Utama/i })).toBeInTheDocument();

    // Back to Landing Page Link (Requirement 8.6)
    const backLinks = screen.getAllByRole('link', { name: /Kembali ke Beranda/i });
    expect(backLinks[0]).toBeInTheDocument();
    expect(backLinks[0]).toHaveAttribute('href', '/');
  });
});
