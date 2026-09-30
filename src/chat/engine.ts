// src/chat/engine.ts
// Penggabung 3 lapis: topik resmi (intent tertutup) -> alur pemesanan semua layanan -> penjaga luar scope.
// Deterministik 100%, tanpa AI, tanpa network request.

import type { SuggestedAction } from '../types/chat';
import {
  JAWABAN_BELUM_PAHAM,
  JAWABAN_SALAM,
  JAWABAN_TERIMA_KASIH,
  JAWABAN_TIDAK_DIKETAHUI,
  TOPIK_MENU,
  jawabanDiLuarScope,
  type ChatIntent,
} from './knowledge';
import {
  cocokIntent,
  isIsianKosong,
  isLanjutPesanan,
  isOffTopic,
  isOrderTrigger,
  isPertanyaan,
  isSapaan,
  isTerimaKasih,
  isUlang,
  labelOffTopic,
  tokenisasi,
} from './intent';
import {
  ORDER_AWAL,
  adaSlotTerisi,
  applyMessage,
  isOrderComplete,
  langkahOrder,
  type OrderState,
} from './orderFlow';

export interface ChatReply {
  text: string;
  suggestedActions: SuggestedAction[];
  intentId: string;
  orderState: OrderState;
}

const AKSI_WA: SuggestedAction = { label: '💬 Chat Admin WhatsApp', action: 'whatsapp' };

/** Chip untuk kembali melanjutkan pengisian pesanan setelah menyela dengan pertanyaan. */
const AKSI_LANJUT_PESANAN: SuggestedAction = {
  label: '➡️ Lanjut Isi Pesanan',
  action: 'prompt',
  value: 'lanjut pesanan',
};

function jawabIntent(intent: ChatIntent, orderState: OrderState): ChatReply {
  return {
    text: intent.jawaban,
    suggestedActions: intent.actions,
    intentId: intent.id,
    orderState,
  };
}

function tawarkanMenu(teks: string, orderState: OrderState, intentId = 'tidak-dikenal'): ChatReply {
  return { text: teks, suggestedActions: TOPIK_MENU, intentId, orderState };
}

/**
 * Intent dengan kata kunci yang relatif umum. Kalau pesan sekaligus terdeteksi
 * di luar topik, lebih aman dijawab dengan penolakan daripada memaksa intent ini.
 */
const INTENT_LEMBUT = new Set(['tim', 'profil', 'operasional', 'testimoni']);

/**
 * Satu-satunya pintu masuk jawaban chatbot.
 * @param pesan pesan terbaru dari user
 * @param state data pesanan yang sedang diisi (dibawa dari widget)
 */
export function resolveReply(pesan: string, state: OrderState = ORDER_AWAL): ChatReply {
  const teks = (pesan ?? '').trim();
  const token = tokenisasi(teks);

  if (token.length === 0) {
    return tawarkanMenu(JAWABAN_BELUM_PAHAM, state, 'kosong');
  }

  if (isUlang(teks)) {
    return {
      text: `Siap Kak, kita ulangi dari awal ya 🔄

Kalau mau pesan, sebutkan dulu **kebutuhan Kakak** — misalnya butuh berapa responden, atau mau dibantu tugas, olah data, laporan, skripsi, atau desain. Nanti Ina tanyakan sisanya satu per satu 😊`,
      suggestedActions: TOPIK_MENU,
      intentId: 'ulang',
      orderState: { ...ORDER_AWAL },
    };
  }

  if (isSapaan(teks) && token.length <= 4 && !state.aktif) {
    return tawarkanMenu(JAWABAN_SALAM, state, 'salam');
  }

  if (isTerimaKasih(teks) && token.length <= 5) {
    return {
      text: JAWABAN_TERIMA_KASIH,
      suggestedActions: [AKSI_WA, ...TOPIK_MENU.slice(0, 3)],
      intentId: 'terima-kasih',
      orderState: state,
    };
  }

  const intent = cocokIntent(teks);
  const pemicuOrder = isOrderTrigger(teks);
  const dalamAlurOrder = pemicuOrder || state.aktif;

  // LAPIS 1 & 3: di luar alur pemesanan
  if (!dalamAlurOrder) {
    const diLuarScope = isOffTopic(teks);
    if (intent && !(diLuarScope && INTENT_LEMBUT.has(intent.id))) return jawabIntent(intent, state);
    if (diLuarScope) return tawarkanMenu(jawabanDiLuarScope(labelOffTopic(teks)), state, 'luar-scope');
    if (token.length <= 2) return tawarkanMenu(JAWABAN_BELUM_PAHAM, state);
    return tawarkanMenu(JAWABAN_TIDAK_DIKETAHUI, state);
  }

  // LAPIS 2: alur pemesanan (responden, tugas, olah data, laporan, skripsi, canva)
  if (isOffTopic(teks)) {
    return tawarkanMenu(jawabanDiLuarScope(labelOffTopic(teks)), { ...state, aktif: true }, 'luar-scope');
  }

  const pertanyaan = isPertanyaan(teks) && !isLanjutPesanan(teks);
  const menyela = pertanyaan && intent !== null && !pemicuOrder;

  // User menyela dengan pertanyaan (harga, garansi, pembayaran, dll): jawab pertanyaannya,
  // data pesanan yang sudah diisi tetap aman, dan tetap ada tombol untuk melanjutkan.
  if (menyela) {
    const adaData = adaSlotTerisi(state) && !isOrderComplete(state);
    return {
      text: intent.jawaban,
      suggestedActions: adaData ? [...intent.actions, AKSI_LANJUT_PESANAN] : intent.actions,
      intentId: intent.id,
      orderState: { ...state, aktif: true },
    };
  }

  // Isian bebas (detail, kebutuhan, kriteria) hanya boleh berasal dari jawaban
  // atau perintah order. Pertanyaan yang tidak dikenali intent-nya tetap boleh
  // mengisi data terstruktur, tapi tidak boleh dianggap sebagai isi slot.
  const bolehIsianBebas = !pertanyaan || pemicuOrder;
  const orderState = applyMessage(state, teks, bolehIsianBebas);
  const aktif = { ...orderState, aktif: true };

  // Isian kosong (sapaan, "iya", atau perintah bot sendiri) tidak mengubah apa pun,
  // jadi bot mengulang pertanyaan yang sedang berjalan.
  if (isIsianKosong(teks)) {
    return { ...langkahOrder(aktif, true), intentId: 'order-flow', orderState: aktif };
  }

  return { ...langkahOrder(aktif), intentId: 'order-flow', orderState: aktif };
}
