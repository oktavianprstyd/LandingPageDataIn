// src/components/sections/ContactForm.tsx
import { Loader2, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { useContactForm } from '../../hooks/useContactForm';

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID ?? '';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? '';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? '';

const INPUT_BASE =
  'w-full bg-[#FAF6F0] border border-[#D8CFC4] rounded-2xl px-4 py-3 text-[#1E3A5F] ' +
  'placeholder-[#4A709C]/60 focus:outline-none focus:border-[#1E3A5F] focus:ring-2 ' +
  'focus:ring-[#1E3A5F]/15 transition-all text-sm font-semibold';

const INPUT_ERROR = 'border-red-500 focus:border-red-500 focus:ring-red-100';

export default function ContactForm() {
  const { fields, errors, status, handleChange, handleSubmit } = useContactForm();

  const isLoading = status === 'loading';
  const isSuccess = status === 'success';
  const isError = status === 'error';

  return (
    <form
      onSubmit={(e) =>
        handleSubmit(e, EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY)
      }
      noValidate
      aria-label="Formulir kontak"
    >
      {/* Success Notification */}
      {isSuccess && (
        <div
          role="status"
          aria-live="polite"
          className="flex items-start gap-3 rounded-2xl border border-emerald-300 bg-emerald-50 px-4 py-3.5 text-emerald-900 mb-6"
        >
          <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0 text-emerald-600" aria-hidden="true" />
          <p className="text-sm leading-relaxed font-semibold">
            Pesan berhasil terkirim! Tim DataIn akan segera menghubungi Anda.
          </p>
        </div>
      )}

      {/* Error Notification */}
      {isError && (
        <div
          role="alert"
          aria-live="assertive"
          className="flex items-start gap-3 rounded-2xl border border-red-300 bg-red-50 px-4 py-3.5 text-red-900 mb-6"
        >
          <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0 text-red-600" aria-hidden="true" />
          <p className="text-sm leading-relaxed font-semibold">
            Pengiriman gagal. Silakan periksa koneksi internet Anda dan coba lagi.
          </p>
        </div>
      )}

      <div className="flex flex-col gap-5">
        {/* Nama */}
        <div>
          <label htmlFor="contact-nama" className="block text-xs font-extrabold uppercase tracking-wider text-[#1E3A5F] mb-1.5 font-heading">
            Nama Lengkap <span className="text-[#4A709C]" aria-hidden="true">*</span>
          </label>
          <input
            id="contact-nama"
            type="text"
            autoComplete="name"
            maxLength={100}
            value={fields.nama}
            onChange={(e) => handleChange('nama', e.target.value)}
            placeholder="Contoh: Budi Santoso"
            aria-required="true"
            aria-invalid={!!errors.nama}
            aria-describedby={errors.nama ? 'error-nama' : undefined}
            className={`${INPUT_BASE} ${errors.nama ? INPUT_ERROR : ''}`}
          />
          {errors.nama && (
            <p id="error-nama" role="alert" className="text-xs text-red-600 mt-1 font-semibold">
              {errors.nama}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="contact-email" className="block text-xs font-extrabold uppercase tracking-wider text-[#1E3A5F] mb-1.5 font-heading">
            Email Kontak <span className="text-[#4A709C]" aria-hidden="true">*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            value={fields.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="budi@domain.com"
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'error-email' : undefined}
            className={`${INPUT_BASE} ${errors.email ? INPUT_ERROR : ''}`}
          />
          {errors.email && (
            <p id="error-email" role="alert" className="text-xs text-red-600 mt-1 font-semibold">
              {errors.email}
            </p>
          )}
        </div>

        {/* Subjek */}
        <div>
          <label htmlFor="contact-subjek" className="block text-xs font-extrabold uppercase tracking-wider text-[#1E3A5F] mb-1.5 font-heading">
            Topik / Subjek <span className="text-[#4A709C]" aria-hidden="true">*</span>
          </label>
          <input
            id="contact-subjek"
            type="text"
            maxLength={100}
            value={fields.subjek}
            onChange={(e) => handleChange('subjek', e.target.value)}
            placeholder="Contoh: Konsultasi Olah Data SPSS"
            aria-required="true"
            aria-invalid={!!errors.subjek}
            aria-describedby={errors.subjek ? 'error-subjek' : undefined}
            className={`${INPUT_BASE} ${errors.subjek ? INPUT_ERROR : ''}`}
          />
          {errors.subjek && (
            <p id="error-subjek" role="alert" className="text-xs text-red-600 mt-1 font-semibold">
              {errors.subjek}
            </p>
          )}
        </div>

        {/* Pesan */}
        <div>
          <label htmlFor="contact-pesan" className="block text-xs font-extrabold uppercase tracking-wider text-[#1E3A5F] mb-1.5 font-heading">
            Pesan / Detail Kebutuhan <span className="text-[#4A709C]" aria-hidden="true">*</span>
          </label>
          <textarea
            id="contact-pesan"
            rows={4}
            maxLength={1000}
            value={fields.pesan}
            onChange={(e) => handleChange('pesan', e.target.value)}
            placeholder="Tuliskan rincian kebutuhan atau pertanyaan Anda di sini..."
            aria-required="true"
            aria-invalid={!!errors.pesan}
            aria-describedby={errors.pesan ? 'error-pesan' : undefined}
            className={`${INPUT_BASE} resize-none ${errors.pesan ? INPUT_ERROR : ''}`}
          />
          <div className="flex justify-between items-center mt-1">
            {errors.pesan ? (
              <p id="error-pesan" role="alert" className="text-xs text-red-600 font-semibold">
                {errors.pesan}
              </p>
            ) : (
              <span />
            )}
            <span
              className={`text-xs tabular-nums ${
                fields.pesan.length > 900 ? 'text-amber-700 font-bold' : 'text-[#4A709C]'
              }`}
            >
              {fields.pesan.length}/1000
            </span>
          </div>
        </div>

        {/* Submit Button in Deep Blue #1E3A5F */}
        <button
          type="submit"
          disabled={isLoading || isSuccess}
          className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-[#1E3A5F] hover:bg-[#4A709C] text-white font-extrabold text-sm shadow-lg shadow-[#1E3A5F]/20 active:scale-98 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          aria-busy={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin text-white" aria-hidden="true" />
              <span>Memproses Pesan…</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5 text-white" aria-hidden="true" />
              <span>Kirim Pesan Konsultasi</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
