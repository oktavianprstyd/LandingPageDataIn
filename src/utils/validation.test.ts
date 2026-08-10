// src/utils/validation.test.ts

import { describe, it, expect } from 'vitest';
import { validateContactForm, hasErrors, getInitials } from './validation';
import type { ContactFormFields } from '../types';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const validFields: ContactFormFields = {
  nama: 'Budi Santoso',
  email: 'budi@example.com',
  subjek: 'Pertanyaan layanan',
  pesan: 'Halo, saya ingin bertanya tentang layanan DataIn.',
};

// ---------------------------------------------------------------------------
// validateContactForm
// ---------------------------------------------------------------------------
describe('validateContactForm', () => {
  // --- nama ---
  it('returns no error when all fields are valid', () => {
    const errors = validateContactForm(validFields);
    expect(errors).toEqual({});
  });

  it('returns nama error when nama is empty', () => {
    const errors = validateContactForm({ ...validFields, nama: '' });
    expect(errors.nama).toBeDefined();
  });

  it('returns nama error when nama is only whitespace', () => {
    const errors = validateContactForm({ ...validFields, nama: '   ' });
    expect(errors.nama).toBeDefined();
  });

  it('returns nama error when nama exceeds 100 characters', () => {
    const errors = validateContactForm({ ...validFields, nama: 'A'.repeat(101) });
    expect(errors.nama).toBeDefined();
  });

  it('accepts nama exactly at 100 characters', () => {
    const errors = validateContactForm({ ...validFields, nama: 'A'.repeat(100) });
    expect(errors.nama).toBeUndefined();
  });

  // --- email ---
  it('returns email error when email is empty', () => {
    const errors = validateContactForm({ ...validFields, email: '' });
    expect(errors.email).toBeDefined();
  });

  it('returns email error when email is missing @', () => {
    const errors = validateContactForm({ ...validFields, email: 'budiexample.com' });
    expect(errors.email).toBeDefined();
  });

  it('returns email error when email is missing domain', () => {
    const errors = validateContactForm({ ...validFields, email: 'budi@' });
    expect(errors.email).toBeDefined();
  });

  it('accepts valid email with subdomain', () => {
    const errors = validateContactForm({ ...validFields, email: 'user@mail.example.com' });
    expect(errors.email).toBeUndefined();
  });

  // --- subjek ---
  it('returns subjek error when subjek is empty', () => {
    const errors = validateContactForm({ ...validFields, subjek: '' });
    expect(errors.subjek).toBeDefined();
  });

  it('returns subjek error when subjek exceeds 100 characters', () => {
    const errors = validateContactForm({ ...validFields, subjek: 'S'.repeat(101) });
    expect(errors.subjek).toBeDefined();
  });

  it('accepts subjek exactly at 100 characters', () => {
    const errors = validateContactForm({ ...validFields, subjek: 'S'.repeat(100) });
    expect(errors.subjek).toBeUndefined();
  });

  // --- pesan ---
  it('returns pesan error when pesan is empty', () => {
    const errors = validateContactForm({ ...validFields, pesan: '' });
    expect(errors.pesan).toBeDefined();
  });

  it('returns pesan error when pesan exceeds 1000 characters', () => {
    const errors = validateContactForm({ ...validFields, pesan: 'P'.repeat(1001) });
    expect(errors.pesan).toBeDefined();
  });

  it('accepts pesan exactly at 1000 characters', () => {
    const errors = validateContactForm({ ...validFields, pesan: 'P'.repeat(1000) });
    expect(errors.pesan).toBeUndefined();
  });

  it('can return multiple errors simultaneously', () => {
    const errors = validateContactForm({ nama: '', email: 'invalid', subjek: '', pesan: '' });
    expect(errors.nama).toBeDefined();
    expect(errors.email).toBeDefined();
    expect(errors.subjek).toBeDefined();
    expect(errors.pesan).toBeDefined();
  });
});

// ---------------------------------------------------------------------------
// hasErrors
// ---------------------------------------------------------------------------
describe('hasErrors', () => {
  it('returns false for empty errors object', () => {
    expect(hasErrors({})).toBe(false);
  });

  it('returns true when there is at least one error', () => {
    expect(hasErrors({ nama: 'Nama wajib diisi.' })).toBe(true);
  });

  it('returns true for multiple errors', () => {
    expect(hasErrors({ nama: 'error', email: 'error' })).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// getInitials
// ---------------------------------------------------------------------------
describe('getInitials', () => {
  it('returns first letter of single word', () => {
    expect(getInitials('Budi')).toBe('B');
  });

  it('returns first letters of first two words', () => {
    expect(getInitials('Budi Santoso')).toBe('BS');
  });

  it('returns at most 2 initials for multi-word names', () => {
    const result = getInitials('Budi Santoso Wijaya');
    expect(result).toBe('BS');
    expect(result.length).toBeLessThanOrEqual(2);
  });

  it('returns uppercase initials', () => {
    const result = getInitials('budi santoso');
    expect(result).toBe('BS');
  });

  it('handles extra whitespace between words', () => {
    const result = getInitials('  Budi   Santoso  ');
    expect(result).toBe('BS');
  });

  it('returns empty string for empty string', () => {
    expect(getInitials('')).toBe('');
  });

  it('handles whitespace-only string', () => {
    expect(getInitials('   ')).toBe('');
  });
});
