// src/utils/validation.ts

import type { ContactFormFields, ContactFormErrors } from '../types';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactForm(fields: ContactFormFields): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (!fields.nama.trim()) errors.nama = 'Nama wajib diisi.';
  else if (fields.nama.length > 100) errors.nama = 'Nama maksimal 100 karakter.';

  if (!fields.email.trim()) errors.email = 'Email wajib diisi.';
  else if (!EMAIL_PATTERN.test(fields.email)) errors.email = 'Format email tidak valid.';

  if (!fields.subjek.trim()) errors.subjek = 'Subjek wajib diisi.';
  else if (fields.subjek.length > 100) errors.subjek = 'Subjek maksimal 100 karakter.';

  if (!fields.pesan.trim()) errors.pesan = 'Pesan wajib diisi.';
  else if (fields.pesan.length > 1000) errors.pesan = 'Pesan maksimal 1000 karakter.';

  return errors;
}

export function hasErrors(errors: ContactFormErrors): boolean {
  return Object.keys(errors).length > 0;
}

export function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .map((word) => word[0]?.toUpperCase() ?? '')
    .slice(0, 2)
    .join('');
}
