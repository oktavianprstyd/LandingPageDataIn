// src/hooks/useContactForm.test.ts

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useContactForm } from './useContactForm';

// ---------------------------------------------------------------------------
// Mock EmailJS so network calls never fire in tests
// ---------------------------------------------------------------------------
vi.mock('@emailjs/browser', () => ({
  default: {
    send: vi.fn(),
  },
}));

import emailjs from '@emailjs/browser';

const mockedEmailjsSend = vi.mocked(emailjs.send);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const validFields = {
  nama: 'Budi Santoso',
  email: 'budi@example.com',
  subjek: 'Test Subjek',
  pesan: 'Ini adalah pesan pengujian.',
};

function fillAllFields(handleChange: ReturnType<typeof useContactForm>['handleChange']) {
  act(() => {
    handleChange('nama', validFields.nama);
    handleChange('email', validFields.email);
    handleChange('subjek', validFields.subjek);
    handleChange('pesan', validFields.pesan);
  });
}

// Minimal FormEvent stub
const fakeEvent = { preventDefault: vi.fn() } as unknown as React.FormEvent;

// ---------------------------------------------------------------------------
// Initial state
// ---------------------------------------------------------------------------
describe('useContactForm — initial state', () => {
  it('starts with empty fields', () => {
    const { result } = renderHook(() => useContactForm());
    expect(result.current.fields).toEqual({
      nama: '',
      email: '',
      subjek: '',
      pesan: '',
    });
  });

  it('starts with no errors', () => {
    const { result } = renderHook(() => useContactForm());
    expect(result.current.errors).toEqual({});
  });

  it('starts with idle status', () => {
    const { result } = renderHook(() => useContactForm());
    expect(result.current.status).toBe('idle');
  });
});

// ---------------------------------------------------------------------------
// handleChange
// ---------------------------------------------------------------------------
describe('useContactForm — handleChange', () => {
  it('updates the targeted field', () => {
    const { result } = renderHook(() => useContactForm());
    act(() => {
      result.current.handleChange('nama', 'Sari');
    });
    expect(result.current.fields.nama).toBe('Sari');
  });

  it('does not run eager validation before first failed submit', () => {
    const { result } = renderHook(() => useContactForm());
    act(() => {
      result.current.handleChange('nama', 'X');
    });
    // errors should remain empty — no submit attempted yet
    expect(result.current.errors).toEqual({});
  });
});

// ---------------------------------------------------------------------------
// handleSubmit — validation failure
// ---------------------------------------------------------------------------
describe('useContactForm — validation on submit', () => {
  it('sets errors and keeps status idle when fields are invalid', async () => {
    const { result } = renderHook(() => useContactForm());
    await act(async () => {
      await result.current.handleSubmit(fakeEvent, 'svc', 'tpl', 'key');
    });
    expect(Object.keys(result.current.errors).length).toBeGreaterThan(0);
    expect(result.current.status).toBe('idle');
  });

  it('enables eager re-validation after first failed submit', async () => {
    const { result } = renderHook(() => useContactForm());

    // First submit with empty fields
    await act(async () => {
      await result.current.handleSubmit(fakeEvent, 'svc', 'tpl', 'key');
    });

    // Now typing in a field should update errors immediately
    act(() => {
      result.current.handleChange('nama', 'Budi');
    });
    // nama error should be cleared now
    expect(result.current.errors.nama).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// handleSubmit — success path
// ---------------------------------------------------------------------------
describe('useContactForm — successful submission', () => {
  beforeEach(() => {
    mockedEmailjsSend.mockResolvedValue({ status: 200, text: 'OK' });
    vi.useFakeTimers();
  });

  it('sets status to success after emailjs resolves', async () => {
    const { result } = renderHook(() => useContactForm());
    fillAllFields(result.current.handleChange);

    await act(async () => {
      await result.current.handleSubmit(fakeEvent, 'svc', 'tpl', 'key');
    });

    expect(result.current.status).toBe('success');
  });

  it('resets form back to idle after 3-second delay', async () => {
    const { result } = renderHook(() => useContactForm());
    fillAllFields(result.current.handleChange);

    await act(async () => {
      await result.current.handleSubmit(fakeEvent, 'svc', 'tpl', 'key');
    });

    // Fast-forward the 3 s reset timer
    await act(async () => {
      vi.advanceTimersByTime(3000);
    });

    expect(result.current.status).toBe('idle');
    expect(result.current.fields.nama).toBe('');
  });

  it('clears errors before sending', async () => {
    const { result } = renderHook(() => useContactForm());

    // Trigger validation errors first
    await act(async () => {
      await result.current.handleSubmit(fakeEvent, 'svc', 'tpl', 'key');
    });

    // Then fill and resubmit
    fillAllFields(result.current.handleChange);
    await act(async () => {
      await result.current.handleSubmit(fakeEvent, 'svc', 'tpl', 'key');
    });

    expect(result.current.errors).toEqual({});
  });
});

// ---------------------------------------------------------------------------
// handleSubmit — error path
// ---------------------------------------------------------------------------
describe('useContactForm — failed submission', () => {
  beforeEach(() => {
    mockedEmailjsSend.mockRejectedValue(new Error('Network error'));
  });

  it('sets status to error when emailjs rejects', async () => {
    const { result } = renderHook(() => useContactForm());
    fillAllFields(result.current.handleChange);

    await act(async () => {
      await result.current.handleSubmit(fakeEvent, 'svc', 'tpl', 'key');
    });

    expect(result.current.status).toBe('error');
  });

  it('preserves field values on network error so user can retry', async () => {
    const { result } = renderHook(() => useContactForm());
    fillAllFields(result.current.handleChange);

    await act(async () => {
      await result.current.handleSubmit(fakeEvent, 'svc', 'tpl', 'key');
    });

    expect(result.current.fields.nama).toBe(validFields.nama);
    expect(result.current.fields.email).toBe(validFields.email);
  });
});

// ---------------------------------------------------------------------------
// resetForm
// ---------------------------------------------------------------------------
describe('useContactForm — resetForm', () => {
  it('clears all fields, errors, and status back to idle', async () => {
    mockedEmailjsSend.mockRejectedValue(new Error('err'));
    const { result } = renderHook(() => useContactForm());

    fillAllFields(result.current.handleChange);
    await act(async () => {
      await result.current.handleSubmit(fakeEvent, 'svc', 'tpl', 'key');
    });

    act(() => {
      result.current.resetForm();
    });

    expect(result.current.fields).toEqual({ nama: '', email: '', subjek: '', pesan: '' });
    expect(result.current.errors).toEqual({});
    expect(result.current.status).toBe('idle');
  });
});
