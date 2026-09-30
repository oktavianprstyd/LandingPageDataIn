// src/data/contact.ts
// Sumber tunggal untuk data kontak resmi DataIn.
// Jangan menulis nomor atau username secara manual di komponen lain.

/** Nomor WhatsApp admin dalam format internasional tanpa tanda plus. */
export const WA_NUMBER = '6282227445735';

/** Nomor WhatsApp admin dalam format tampilan lokal. */
export const WA_DISPLAY = '+62 822-2744-5735';

/** Username TikTok resmi DataIn. */
export const TIKTOK_HANDLE = '@datainaja_';

export const TIKTOK_URL = `https://www.tiktok.com/${TIKTOK_HANDLE}`;

/** Link WhatsApp dengan pesan pembuka yang sudah ter-URL-encode. */
export function waUrl(pesan?: string): string {
  const teks = encodeURIComponent(
    pesan ?? 'Halo Admin DataIn! Saya mau konsultasi mengenai assistensi tugas / olah data.'
  );
  return `https://wa.me/${WA_NUMBER}?text=${teks}`;
}
