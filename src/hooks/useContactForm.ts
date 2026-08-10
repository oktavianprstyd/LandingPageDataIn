// src/hooks/useContactForm.ts

import { useState, useCallback } from 'react';
import emailjs from '@emailjs/browser';
import type { ContactFormFields, ContactFormErrors, ContactFormStatus } from '../types';
import { validateContactForm, hasErrors } from '../utils/validation';

const INITIAL_FIELDS: ContactFormFields = {
  nama: '',
  email: '',
  subjek: '',
  pesan: '',
};

export interface UseContactFormReturn {
  fields: ContactFormFields;
  errors: ContactFormErrors;
  status: ContactFormStatus;
  handleChange: (field: keyof ContactFormFields, value: string) => void;
  handleSubmit: (
    e: React.FormEvent,
    serviceId: string,
    templateId: string,
    publicKey: string,
  ) => Promise<void>;
  resetForm: () => void;
}

/**
 * Manages Contact Form state including fields, validation errors, and submission status.
 *
 * Behaviour:
 * - Validates all fields on submit.
 * - After the first failed submit ("eager mode"), re-validates on every keystroke.
 * - On success: sets status → 'success', then resets after 3 seconds.
 * - On network/server error: sets status → 'error' and preserves field values.
 */
export function useContactForm(): UseContactFormReturn {
  const [fields, setFields] = useState<ContactFormFields>(INITIAL_FIELDS);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<ContactFormStatus>('idle');
  // Tracks whether the user has attempted a submit that failed validation,
  // enabling eager (per-keystroke) re-validation.
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);

  const handleChange = useCallback(
    (field: keyof ContactFormFields, value: string) => {
      setFields((prev) => {
        const next = { ...prev, [field]: value };
        if (hasSubmitted) {
          // Eager validation: update errors on every change after first failed submit.
          setErrors(validateContactForm(next));
        }
        return next;
      });
    },
    [hasSubmitted],
  );

  const resetForm = useCallback(() => {
    setFields(INITIAL_FIELDS);
    setErrors({});
    setStatus('idle');
    setHasSubmitted(false);
  }, []);

  const handleSubmit = useCallback(
    async (
      e: React.FormEvent,
      serviceId: string,
      templateId: string,
      publicKey: string,
    ): Promise<void> => {
      e.preventDefault();

      setStatus('loading');

      const validationErrors = validateContactForm(fields);
      if (hasErrors(validationErrors)) {
        // Validation failed — surface errors and enable eager mode for future changes.
        setErrors(validationErrors);
        setHasSubmitted(true);
        setStatus('idle');
        return;
      }

      // Clear any stale errors before sending.
      setErrors({});

      try {
        await emailjs.send(
          serviceId,
          templateId,
          {
            from_name: fields.nama,
            from_email: fields.email,
            subject: fields.subjek,
            message: fields.pesan,
          },
          publicKey,
        );

        setStatus('success');
        // Reset the form after a brief delay so the success message stays visible.
        setTimeout(() => {
          resetForm();
        }, 3000);
      } catch {
        // Preserve field values so the user can retry without re-typing.
        setStatus('error');
      }
    },
    [fields, resetForm],
  );

  return { fields, errors, status, handleChange, handleSubmit, resetForm };
}
