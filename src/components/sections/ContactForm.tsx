// src/components/sections/ContactForm.tsx
import { Loader2, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { useContactForm } from '../../hooks/useContactForm';

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID ?? '';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? '';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? '';

const INPUT_BASE =
  'w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 ' +
  'placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 ' +
  'focus:ring-blue-100 transition-all text-sm font-medium';

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
          className="flex items-start gap-3 rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-3.5 text-emerald-800 mb-6"
        >
          <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0 text-emerald-600" aria-hidden="true" />
          <p className="text-sm leading-relaxed">
            Pesan berhasil terkirim! Tim DataIn akan segera menghubungi Anda.
          </p>
        </div>
      )}

      {/* Error Notification */}
      {isError && (
        <div
          role="alert"
          aria-live="assertive"
          className="flex items-start gap-3 rounded-xl border border-red-300 bg-red-50 px-4 py-3.5 text-red-800 mb-6"
        >
          <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0 text-red-600" aria-hidden="true" />
          <p className="text-sm leading-relaxed">
            Pengiriman gagal. Silakan periksa koneksi internet Anda dan coba lagi.
          </p>
        </div>
      )}

      <div className="flex flex-col gap-5">
        {/* Nama */}
        <div>
          <label htmlFor="contact-nama" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Nama Lengkap <span className="text-blue-600" aria-hidden="true">*</span>
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
            <p id="error-nama" role="alert" className="text-xs text-red-600 mt-1">
              {errors.nama}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="contact-email" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Email Kontak <span className="text-blue-600" aria-hidden="true">*</span>
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
            <p id="error-email" role="alert" className="text-xs text-red-600 mt-1">
              {errors.email}
            </p>
          )}
        </div>

        {/* Subjek */}
        <div>
          <label htmlFor="contact-subjek" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Topik / Subjek <span className="text-blue-600" aria-hidden="true">*</span>
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
            <p id="error-subjek" role="alert" className="text-xs text-red-600 mt-1">
              {errors.subjek}
            </p>
          )}
        </div>

        {/* Pesan */}
        <div>
          <label htmlFor="contact-pesan" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Pesan / Detail Kebutuhan <span className="text-blue-600" aria-hidden="true">*</span>
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
              <p id="error-pesan" role="alert" className="text-xs text-red-600">
                {errors.pesan}
              </p>
            ) : (
              <span />
            )}
            <span
              className={`text-xs tabular-nums ${
                fields.pesan.length > 900 ? 'text-amber-600' : 'text-slate-500'
              }`}
            >
              {fields.pesan.length}/1000
            </span>
          </div>
        </div>

        {/* Solid Royal Blue Submit Button */}
        <button
          type="submit"
          disabled={isLoading || isSuccess}
          className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/25 active:scale-98 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2"
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
