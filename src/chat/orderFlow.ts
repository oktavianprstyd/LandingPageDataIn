// src/chat/orderFlow.ts
// Alur pemesanan untuk SEMUA layanan DataIn, bukan hanya joki responden.
// Tiap layanan punya urutan slot sendiri, lalu dirangkum jadi pesan WhatsApp
// yang sudah terisi otomatis. State dibawa lewat percakapan supaya bot tidak
// pernah mengulang pertanyaan yang sudah terjawab.

import type { SuggestedAction } from '../types/chat';
import {
  frasaAda,
  hasKataKriteria,
  isIsianKosong,
  isKoreksiLayanan,
  isOrderTrigger,
  isPertanyaan,
  KATA_KRITERIA,
} from './intent';
import { WA_NUMBER } from './knowledge';

export type LayananId = 'responden' | 'tugas' | 'olah-data' | 'laporan' | 'skripsi' | 'canva';

export interface OrderState {
  aktif: boolean;
  /** Layanan yang sedang dipesan. Menentukan urutan pertanyaan berikutnya. */
  layanan: LayananId | null;
  // --- khusus joki responden ---
  jumlah: string | null;
  kriteria: string | null;
  link: string | null;
  // --- semua layanan ---
  /** Judul, instruksi, topik, atau detail utama kebutuhan. */
  detail: string | null;
  /** Kebutuhan khusus: format, software, bab, jenis desain, dan sejenisnya. */
  kebutuhan: string | null;
  deadline: string | null;
  asalKampus: string | null;
  keperluan: string | null;
}

export type Slot = 'jumlah' | 'kriteria' | 'link' | 'detail' | 'kebutuhan' | 'deadline';

export const URUTAN_SLOT: Slot[] = ['jumlah', 'kriteria', 'link', 'deadline'];

const URUTAN_RESPONDEN: Slot[] = ['jumlah', 'kriteria', 'link', 'deadline'];
const URUTAN_UMUM: Slot[] = ['detail', 'kebutuhan', 'deadline'];

export const NAMA_LAYANAN: Record<LayananId, string> = {
  responden: 'Jasa Responden Kuesioner',
  tugas: 'Bantuan Tugas Sekolah dan Kuliah',
  'olah-data': 'Olah Data Statistik',
  laporan: 'Pembuatan Laporan',
  skripsi: 'Bimbingan Skripsi',
  canva: 'Desain Canva',
};

/** Kata penanda layanan, dipakai untuk menentukan alur mana yang dibuka. */
const PETA_LAYANAN: Array<{ id: LayananId; kata: string[] }> = [
  {
    id: 'responden',
    kata: [
      'responden',
      'responder',
      'kuesioner',
      'kuosioner',
      'angket',
      'survei',
      'survey',
      'sampel',
      'sample',
      'participant',
      'partisipan',
    ],
  },
  {
    id: 'tugas',
    kata: [
      'tugas',
      'tgs',
      'makalah',
      'essay',
      'esai',
      'resume',
      'rangkuman',
      'jurnal',
      'artikel',
      'ppt',
      'presentasi',
      'slide',
      'uts',
      'uas',
      'naskah',
    ],
  },
  {
    id: 'olah-data',
    kata: [
      'olah data',
      'statistik',
      'statistika',
      'spss',
      'smartpls',
      'amos',
      'eviews',
      'r studio',
      'rstudio',
      'regresi',
      'anova',
      'path analysis',
      'structural equation',
      'interpretasi',
      'excel statistik',
    ],
  },
  {
    id: 'laporan',
    kata: ['laporan', 'pkl', 'kkn', 'magang', 'praktikum', 'observasi'],
  },
  {
    id: 'skripsi',
    kata: [
      'skripsi',
      'tesis',
      'karya ilmiah',
      'bimbingan',
      'konsultasi',
      'proposal',
      'sidang',
      'sempro',
      'bab',
    ],
  },
  {
    id: 'canva',
    kata: [
      'canva',
      'desain',
      'poster',
      'infografis',
      'banner',
      'logo',
      'thumbnail',
      'konten',
    ],
  },
];

/** Apakah pesan ini menyebut layanan tertentu? */
export function sebutLayanan(pesan: string, id: LayananId): boolean {
  const kata = PETA_LAYANAN.find((p) => p.id === id)?.kata ?? [];
  return kata.some((k) => frasaAda(pesan, k));
}

/** Deteksi layanan dari isi pesan, nullptr kalau tidak ada kata layanan yang cocok. */
export function deteksiLayanan(pesan: string): LayananId | null {
  for (const { id, kata } of PETA_LAYANAN) {
    if (kata.some((k) => frasaAda(pesan, k))) return id;
  }
  return null;
}

export const ORDER_AWAL: OrderState = {
  aktif: false,
  layanan: null,
  jumlah: null,
  kriteria: null,
  link: null,
  detail: null,
  kebutuhan: null,
  deadline: null,
  asalKampus: null,
  keperluan: null,
};

export function orderKosong(): OrderState {
  return { ...ORDER_AWAL };
}

export function urutanSlot(layanan: LayananId | null): Slot[] {
  return layanan === 'responden' ? URUTAN_RESPONDEN : URUTAN_UMUM;
}

/** Slot berikutnya yang masih kosong, atau null bila pesanan sudah lengkap. */
export function slotBerikut(state: OrderState): Slot | null {
  for (const slot of urutanSlot(state.layanan)) {
    if (!state[slot]) return slot;
  }
  return null;
}

export function isOrderComplete(state: OrderState): boolean {
  return slotBerikut(state) === null;
}

function bersihkan(teks: string, maks: number = 60): string {
  return teks
    .replace(/\s+/g, ' ')
    .replace(/^(dan|atau|tapi|tetapi|namun|yaitu|yang|untuk|pengen|sekali)\s+/i, '')
    .replace(/\s+(ya|kak|kakak|dong|sih|nih|please|thanks|terima kasih)$/i, '')
    .replace(/^[\s\-–—.,:]+/, '')
    .replace(/[\s,.;:]+$/, '')
    .trim()
    .slice(0, maks);
}

function bersihkanLink(url: string): string {
  return url.replace(/[)\].,;:!?'"]+$/, '');
}

function ekstrakLink(pesan: string): string | null {
  const langsung = pesan.match(/https?:\/\/[^\s]+/i);
  if (langsung) return bersihkanLink(langsung[0]);

  const form = pesan.match(
    /\b(forms\.gle|docs\.google\.com\/forms|typeform\.com|surveymonkey\.com|forms\.office\.com|bitly\.io|jotform)[^\s]*/i
  );
  if (form) return bersihkanLink(form[0]);

  const belumPunya = /(belum|gak|nggak|tidak)\s*\S*\s*(punya|ada|kebikin|bikin|buat|siap|jadi)?/.test(
    pesan
  );
  if (belumPunya && /(kuesioner|soal|survei|angket|questionnaire|form)/i.test(pesan)) {
    return 'Belum ada (mohon dibantu siapkan soal)';
  }
  return null;
}

function ekstrakDeadline(pesan: string): string | null {
  const pola = [
    /\b(deadline|tenggat)\b\s*(?:nya)?\s*(?:adalah|di|adalah|:)?\s*([\w\s,\/.-]{2,30}?)(?:\s+(?:ya|kak|kakak|tolong|dong|sih|please|kah)\b|[.,!?]|$)/i,
    /\b(lusa|esok|besok|hari ini|minggu ini|minggu depan|pekan depan|bulan depan)\b/i,
    /\b(\d+\s*(?:-\s*\d+\s*)?(?:jam|hari|minggu|pekan|bulan)\s*(?:lagi|kemudian)?)\b/i,
    /\b(\d{1,2}\s*\/\s*\d{1,2}(?:\s*\/\s*\d{2,4})?)\b/,
  ];

  for (const p of pola) {
    const cocok = pesan.match(p);
    if (cocok) {
      const isi = cocok[2] ?? cocok[1];
      const nilai = bersihkan(isi, 30);
      if (nilai) return nilai;
    }
  }
  return null;
}

function ekstrakJumlah(pesan: string, sudahAdaDeadline: boolean): string | null {
  const eksplisit = pesan.match(
    /(\d+)\s*(?:responden|responder|orang|org|peserta|participant|sampel|sample|user)/i
  );
  if (eksplisit) return `${eksplisit[1]} responden`;

  if (sudahAdaDeadline) return null;
  if (hasKataKriteria(pesan)) return null;

  const polos = pesan.match(/\b(\d{2,5})\b/);
  if (polos && Number(polos[1]) >= 5) return `${polos[1]} responden`;

  return null;
}

/** Ambil teks mulai dari kata kriteria paling awal, agar "butuh 100 responden mahasiswa" jadi "mahasiswa". */
function potongDariKataKriteria(teks: string): string {
  let indeksAwal = -1;
  const lower = teks.toLowerCase();

  for (const kata of KATA_KRITERIA) {
    const idx = lower.indexOf(kata);
    if (idx !== -1 && (indeksAwal === -1 || idx < indeksAwal)) {
      indeksAwal = idx;
    }
  }

  return indeksAwal > 0 ? teks.slice(indeksAwal) : teks;
}

function ekstrakKriteria(pesan: string): string | null {
  if (!hasKataKriteria(pesan)) return null;

  const tanpaLink = pesan
    .replace(/https?:\/\/\S+/gi, '')
    .replace(/\b(forms\.gle|docs\.google\.com\/forms|typeform\.com|surveymonkey\.com|bitly\.io|jotform)\S*/gi, '')
    .split(/\b(tapi|namun|btw|link|linknya|deadline|tenggat)\b/i)[0]
    .replace(/^kriteria\s*(responden\s*)?(nya)?\s*(adalah|yaitu|yg|=|:)?/i, '')
    .replace(/^(responden|responnya|respondennya)\s*/i, '');

  const bersih = bersihkan(potongDariKataKriteria(tanpaLink), 60);
  return bersih || null;
}

function ekstrakKampus(pesan: string): string | null {
  const cocok = pesan.match(
    /\b(kampus|universitas|univ|poltek|akademi|smk|sma|ma|kuliah)\s*(?:di|pada|nya)?\s*([a-z0-9][\w\s.'-]{1,30})/i
  );
  if (!cocok) return null;
  const nilai = bersihkan(cocok[2], 30);
  return nilai || null;
}

function ekstrakKeperluan(pesan: string): string | null {
  if (/\btesis\b/i.test(pesan)) return 'Tesis';
  if (/\b(magang|pkl|praktikum)\b/i.test(pesan)) return 'Praktikum / Magang';
  if (/\bkkn\b/i.test(pesan)) return 'KKN';
  if (/\bskripsi\b/i.test(pesan)) return 'Skripsi';
  if (/\b(tugas|essay|esai|makalah)\b/i.test(pesan)) return 'Tugas Kuliah';
  return null;
}

/** Kata yang menandai batas akhir bagian deadline di dalam kalimat. */
const PEMBATAS_DEADLINE = /\b(deadline|tenggat|pengumpulan|barangkali)\b/i;

/** Buang noise supaya jawaban slot "detail" dan "kebutuhan" tetap enak dibaca. */
function bersihkanJawab(pesan: string, maks: number): string | null {
  const bersih = bersihkan(
    pesan
      .split(PEMBATAS_DEADLINE)[0]
      .replace(/https?:\/\/\S+/gi, '')
      .replace(/^https?/i, '')
      .replace(/\b(saya|kak|kakak|tolong|bisa|boleh|ingin|mau|butuh|pengen|bantu| dong| ya)\b/gi, ' ')
      .replace(/\s+/g, ' '),
    maks
  );
  return bersih && bersih.length > 2 ? bersih : null;
}

/** Kata sungkan dan kata perintah yang bukan bagian dari detail pesanan. */
const KATA_ISIAN_BUANG = [
  'saya',
  'aku',
  'kak',
  'kakak',
  'bang',
  'bro',
  'tolong',
  'tolongin',
  'tolongnya',
  'bisa',
  'boleh',
  'mau',
  'butuh',
  'butuhin',
  'butuhkah',
  'ingin',
  'pengen',
  'pengin',
  'bantu',
  'bantuan',
  'bantuanin',
  'bantuin',
  'bikin',
  'bikinin',
  'order',
  'pesan',
  'pesen',
  'sewa',
  'minta',
  'kerjakan',
  'membantu',
  'membikin',
  'juga',
  'sih',
  'dong',
  'nih',
  'ya',
  'silakan',
  'sudah',
];

/**
 * Buang kata perintah dan kata nama layanan dari pesan pemicu, lalu ambil sisa
 * kata yang benar-benar menjelaskan kebutuhan. Kalau sisanya terlalu tipis,
 * biarkan kosong supaya user ditanyakan sendiri.
 */function sisaDetail(pesan: string): string {
  // Potong di bagian deadline supaya "deadline besok" tidak ikut jadi detail.
  let sisa = pesan.split(PEMBATAS_DEADLINE)[0];
  for (const { kata } of PETA_LAYANAN) {
    for (const k of kata) {
      sisa = sisa.replace(new RegExp('\\b' + k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'gi'), ' ');
    }
  }

  const kata = sisa.split(/\s+/).filter((w) => {
    const bersih = w.toLowerCase().replace(/[^a-z0-9]/gi, '');
    return bersih !== '' && !KATA_ISIAN_BUANG.includes(bersih);
  });

  if (kata.length < 2) return '';
  return bersihkan(kata.join(' '), 90);
}

export function applyMessage(
  state: OrderState,
  pesan: string,
  izinkanTeksBebas: boolean = true
): OrderState {
  let baru: OrderState = { ...state, aktif: true };

  // Ganti layanan kalau user benar-benar meminta layanan lain: pesannya membuka
  // order baru (atau menyatakan berubah pikiran) dan tidak ikut menyebut layanan
  // yang sedang dibahas. Tanpa ini, "saya butuh olah data dari 150 responden"
  // ikut berganti ke joki responden.
  const terdeteksi = deteksiLayanan(pesan);
  const koreksi = isKoreksiLayanan(pesan);
  const gantiLayanan =
    terdeteksi !== null &&
    terdeteksi !== baru.layanan &&
    (koreksi || (isOrderTrigger(pesan) && !sebutLayanan(pesan, baru.layanan!))) &&
    (!adaSlotTerisi(state) || koreksi);
  if (gantiLayanan) {
    baru = kosongkanSlotLayanan(baru, terdeteksi);
    baru.layanan = terdeteksi;
  }

  // Isian yang isinya cuma sapaan, persetujuan, atau perintah bot tidak boleh
  // dianggap sebagai data pesanan.
  const adaIsian = izinkanTeksBebas && !isIsianKosong(pesan);
  const layananBaru = terdeteksi !== null && baru.layanan === terdeteksi && terdeteksi !== state.layanan;
  const urutan = urutanSlot(baru.layanan);
  const slotSekarang = slotBerikut(state);

  const link = ekstrakLink(pesan);
  if (link && urutan.includes('link')) baru.link = link;

  // Deadline hanya diambil kalau memang slotnya yang sedang ditanyakan, pesan
  // pembuka order, atau user menyebut kata "deadline" secara eksplisit. Kalau
  // tidak, jawaban "3 halaman" tidak akan tertukar jadi deadline.
  const bolehAmbilDeadline =
    slotSekarang === 'deadline' || layananBaru || /\b(deadline|tenggat|due date)\b/i.test(pesan);
  const deadline = bolehAmbilDeadline ? ekstrakDeadline(pesan) : null;
  if (deadline) baru.deadline = deadline;

  // Jumlah hanya relevan untuk alur joki responden.
  const jumlah = urutan.includes('jumlah') ? ekstrakJumlah(pesan, Boolean(deadline)) : null;
  if (jumlah) baru.jumlah = jumlah;

  // Kriteria hanya relevan untuk joki responden, dan hanya diambil kalau
  // pesannya memang menyebut kata kriteria, supaya link tidak ikut tersimpan.
  // Isian bebas hanya dipakai kalau user memang sudah ada di alur responden dan
  // jumlahnya belum diketahui, jadi pesan pembuka order tidak ikut terisi.
  const diAlurResponden = state.layanan === 'responden' && !state.jumlah;
  if (baru.layanan === 'responden' && !baru.kriteria) {
    if (hasKataKriteria(pesan)) {
      baru.kriteria = ekstrakKriteria(pesan);
    } else if (diAlurResponden && adaIsian && !link && !deadline && !jumlah && !isPertanyaan(pesan)) {
      const bebas = bersihkan(pesan, 60);
      if (bebas && bebas.length > 2) baru.kriteria = bebas;
    }
  }

  // Detail dan kebutuhan berlaku untuk semua layanan selain responden, dan hanya
  // diisi dari jawaban atas slot yang sedang ditanyakan.
  if (urutan.includes('detail') && !baru.detail) {
    const sumber = layananBaru ? sisaDetail(pesan) : pesan;
    const bebas = bersihkanJawab(sumber, 90);
    if (adaIsian && bebas && slotSekarang === 'detail' && !link) baru.detail = bebas;
  } else if (urutan.includes('kebutuhan') && !baru.kebutuhan) {
    if (slotSekarang === 'kebutuhan' && !link) {
      const kosong = jawabanKosong(pesan);
      if (kosong) {
        baru.kebutuhan = kosong;
      } else if (adaIsian && !isPertanyaan(pesan)) {
        const bebas = bersihkanJawab(pesan, 90);
        if (bebas) baru.kebutuhan = bebas;
      }
    }
  }

  const kampus = ekstrakKampus(pesan);
  if (kampus) baru.asalKampus = kampus;

  const keperluan = ekstrakKeperluan(pesan);
  if (keperluan) baru.keperluan = keperluan;

  return baru;
}

/** Baris ringkasan pesanan, menyesuaikan layanan. */
function ringkasan(state: OrderState): string[] {
  if (state.layanan === 'responden') {
    return [
      `• **Jumlah responden:** ${state.jumlah ?? '-'}`,
      `• **Kriteria:** ${state.kriteria ?? '-'}`,
      `• **Link kuesioner:** ${state.link ?? '-'}`,
      `• **Deadline:** ${state.deadline ?? '-'}`,
    ];
  }

  return [
    `• **Layanan:** ${NAMA_LAYANAN[state.layanan ?? 'tugas']}`,
    `• **Detail kebutuhan:** ${state.detail ?? '-'}`,
    `• **Kebutuhan khusus:** ${state.kebutuhan ?? '-'}`,
    `• **Deadline:** ${state.deadline ?? '-'}`,
  ];
}

/** Template WhatsApp per layanan, supaya admin langsung tahu yang dibutuhkan. */
function templatePesan(state: OrderState): string[] {
  const layanan = state.layanan ?? 'tugas';
  const kepala = 'Halo Admin DataIn! Saya ingin memesan dari hasil konsultasi chat bot:';
  const kaki = [
    '',
    'Setiap pertanyaan wajib diisi dengan detail, dan jelaskan seluruh request agar tidak terjadi miskomunikasi.',
    'Revisi 1x24 jam hanya untuk hasil yang tidak sesuai request atau format awal. Revisi di luar format atau perubahan request akan dikenakan biaya tambahan.',
    '',
    'Setelah data dikirim, kami akan cek kebutuhan dan memberikan estimasi harga serta waktu pengerjaan.',
  ];

  switch (layanan) {
    case 'responden':
      return [
        kepala,
        '',
        'FORMAT ORDER JOKI RESPONDEN',
        '',
        `Asal kampus: ${state.asalKampus ?? '-'}`,
        `Keperluan: ${state.keperluan ?? 'Skripsi / Penelitian'}`,
        `Jumlah responden: ${state.jumlah ?? '-'}`,
        `Kriteria responden: ${state.kriteria ?? '-'}`,
        'Tipe soal: -',
        `Link kuesioner: ${state.link ?? '-'}`,
        `Deadline: ${state.deadline ?? '-'}`,
        'Catatan tambahan: -',
        ...kaki,
      ];
    case 'tugas':
      return [
        kepala,
        '',
        'FORMAT ORDER BANTUAN TUGAS',
        '',
        'Layanan: Bantuan Tugas Sekolah dan Kuliah',
        `Judul atau instruksi tugas: ${state.detail ?? '-'}`,
        `Kebutuhan khusus: ${state.kebutuhan ?? '-'}`,
        `Deadline: ${state.deadline ?? '-'}`,
        'Lampiran (modul, panduan, contoh): -',
        ...kaki,
      ];
    case 'olah-data':
      return [
        kepala,
        '',
        'FORMAT ORDER OLAH DATA STATISTIK',
        '',
        'Analisis yang dibutuhkan:',
        `Detail data dan kebutuhan: ${state.detail ?? '-'}`,
        `Kebutuhan khusus: ${state.kebutuhan ?? '-'}`,
        'Software (SPSS / SmartPLS / AMOS / EViews / R): -',
        `Deadline: ${state.deadline ?? '-'}`,
        ...kaki,
      ];
    case 'laporan':
      return [
        kepala,
        '',
        'FORMAT ORDER PEMBUATAN LAPORAN',
        '',
        `Jenis laporan dan topik: ${state.detail ?? '-'}`,
        `Kebutuhan khusus: ${state.kebutuhan ?? '-'}`,
        `Nama instansi: ${state.asalKampus ?? '-'}`,
        'Pedoman atau format kampus: -',
        `Deadline: ${state.deadline ?? '-'}`,
        ...kaki,
      ];
    case 'skripsi':
      return [
        kepala,
        '',
        'FORMAT ORDER BIMBINGAN SKRIPSI',
        '',
        `Topik atau judul: ${state.detail ?? '-'}`,
        `Tahap yang dibutuh: ${state.kebutuhan ?? '-'}`,
        `Deadline: ${state.deadline ?? '-'}`,
        ...kaki,
      ];
    case 'canva':
    default:
      return [
        kepala,
        '',
        'FORMAT ORDER DESAIN CANVA',
        '',
        `Jenis desain: ${state.detail ?? '-'}`,
        `Ukuran, platform, dan bahan: ${state.kebutuhan ?? '-'}`,
        `Deadline: ${state.deadline ?? '-'}`,
        ...kaki,
      ];
  }
}

/** Susun pesan WhatsApp resmi lengkap dengan data hasil obrolan. */
export function buildPesanWhatsApp(state: OrderState): string {
  return templatePesan(state).join('\n');
}

/** Link WhatsApp dengan pesan order yang sudah terisi otomatis. */
export function buildPrefilledWhatsAppUrl(state: OrderState): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(buildPesanWhatsApp(state))}`;
}

const AKSI_WA: SuggestedAction = { label: '💬 Chat Admin WhatsApp', action: 'whatsapp' };

function prompt(label: string, value: string): SuggestedAction {
  return { label, action: 'prompt', value };
}

export interface LangkahOrder {
  text: string;
  suggestedActions: SuggestedAction[];
}

const TAHAP_RESPONDEN: Record<Slot, LangkahOrder> = {
  jumlah: {
    text: `Siap Kak! 🙌 Ina bantu cek satu per satu ya.

Pertama: **butuh berapa responden?** Tulis angkanya saja, nanti Ina lanjut ke pertanyaan berikutnya 😊`,
    suggestedActions: [
      prompt('30 Responden', '30 responden'),
      prompt('50 Responden', '50 responden'),
      prompt('100 Responden', '100 responden'),
      prompt('200 Responden', '200 responden'),
      AKSI_WA,
    ],
  },
  kriteria: {
    text: `Ohh oke siap Kak! 👌

Sekarang **kriterianya** mau yang bagaimana ya? Misalnya mahasiswa aktif semester berapa, usia berapa, domisili kota mana, atau responden umum. Tulis saja ya, nanti Ina rangkum 📝`,
    suggestedActions: [
      prompt('Mahasiswa Aktif', 'mahasiswa aktif'),
      prompt('Umum Semua Kalangan', 'umum semua kalangan'),
      prompt('Domisili Jabodetabek', 'domisili Jabodetabek'),
      prompt('Usia 20 sampai 30 Tahun', 'usia 20 sampai 30 tahun'),
      AKSI_WA,
    ],
  },
  link: {
    text: `Wah mantap, kriterianya udah jelas ya 👌

Boleh minta **link kuesioner**-nya Kak? Nanti respondennya langsung kami sesuaikan dengan isi soalnya. Kalau soalnya belum jadi, bilang saja ya.`,
    suggestedActions: [
      prompt('Belum Punya Kuesioner', 'saya belum punya kuesioner'),
      prompt('Link Sudah Saya Siapkan', 'linknya sudah saya kirim'),
      AKSI_WA,
    ],
  },
  detail: { text: '', suggestedActions: [] },
  kebutuhan: { text: '', suggestedActions: [] },
  deadline: {
    text: `Siap, terakhir dulu ya Kak 🙏

**Deadline pengerjaannya** kapan? Tulis saja tanggalnya atau kapan batas waktunya, biar kami sesuaikan target waktunya 🔥`,
    suggestedActions: [
      prompt('Besok', 'deadline besok'),
      prompt('2 sampai 3 Hari Lagi', 'deadline 2 sampai 3 hari lagi'),
      prompt('1 Minggu Lagi', 'deadline 1 minggu lagi'),
      prompt('Belum Tentukan', 'deadline belum ditentukan'),
      AKSI_WA,
    ],
  },
};

/** Petunjuk isian per layanan supaya user tahu persis apa yang ditanyakan. */
const PETUNJUK_DETAIL: Record<LayananId, string> = {
  responden: 'Kebutuhannya apa dan untuk keperluan apa? Sebutkan juga kalau ada jumlah responden atau kriteria tertentu.',
  tugas: 'Apa judul atau instruksi tugasnya? Sebutkan juga jenjang dan bidang studinya.',
  'olah-data': 'Data apa yang mau diolah, dan analisis apa yang dibutuhkan?',
  laporan: 'Laporan jenis apa yang dibuat, untuk instansi mana, dan topiknya apa?',
  skripsi: 'Topik atau judul skripsinya apa, dan sedang ada di bab berapa?',
  canva: 'Desain apa yang mau dibuat, untuk keperluan apa, dan formatnya?',
};

const PETUNJUK_KEBUTUHAN: Record<LayananId, string> = {
  'responden': 'Ada kebutuhan khusus tidak? Misalnya jumlah halaman, warna, atau format file tertentu.',
  tugas: 'Ada kebutuhan khusus tidak? Misalnya jumlah halaman, format, level bahasa, atau referensi wajib.',
  'olah-data': 'Ada kebutuhan khusus tidak? Misalnya software tertentu, uji asumsi wajib, atau interpretasi Bab 4.',
  laporan: 'Ada kebutuhan khusus tidak? Misalnya pedoman kampus, jumlah bab, atau lampiran wajib.',
  skripsi: 'Ada kebutuhan khusus tidak? Misalnya bab yang dibimbing, jumlah pertemuan, atau materi referensi khusus.',
  canva: 'Ada kebutuhan khusus tidak? Misalnya ukuran, warna, jumlah slide, atau referensi desain.',
};

const CHIP_DEADLINE: SuggestedAction[] = [
  prompt('Besok', 'deadline besok'),
  prompt('3 Hari Lagi', 'deadline 3 hari lagi'),
  prompt('1 Minggu Lagi', 'deadline 1 minggu lagi'),
  prompt('Belum Tentukan', 'deadline belum ditentukan'),
  AKSI_WA,
];

function tahapUmum(slot: Slot, layanan: LayananId): LangkahOrder {
  if (slot === 'detail') {
    return {
      text: `Siap Kak, Ina bantu rangkum ya 🙌

Pertama, **${NAMA_LAYANAN[layanan]}** ini butuh apa persisnya? ${PETUNJUK_DETAIL[layanan]}

Kalau kurang jelas, tulis saja seadanya — nanti Ina rangkum ulang untuk Kakak ✅`,
      suggestedActions: [AKSI_WA, prompt('💰 Tanya Biaya Dulu', 'Berapa biaya layanan DataIn?')],
    };
  }

  return {
    text: `Siap Kak, lanjut ya 👌

Terus, **ada kebutuhan khusus tidak**? ${PETUNJUK_KEBUTUHAN[layanan]}

Kalau tidak ada kebutuhan khusus, tulis saja "nggak ada" ya — biar nggak menghambat 🙏`,
    suggestedActions: [prompt('Nggak Ada Kebutuhan Khusus', 'nggak ada kebutuhan khusus'), AKSI_WA],
  };
}

const CATATAN_AKHIR = `📌 Revisi 1x24 jam hanya untuk hasil yang tidak sesuai request atau format awal. Revisi di luar format atau perubahan request akan dikenakan biaya tambahan.`;

const NUDGE_ULANG =
  'Sepertinya belum ada yang masuk ya Kak 😊 Ayo isi dulu, biar tidak ada yang kelewatan.';

export function langkahOrder(state: OrderState, ulang: boolean = false): LangkahOrder {
  const slot = slotBerikut(state);
  const layanan = state.layanan ?? 'tugas';

  if (slot) {
    let tahap: LangkahOrder;
    if (layanan === 'responden') tahap = TAHAP_RESPONDEN[slot];
    else if (slot === 'deadline') tahap = { text: TAHAP_RESPONDEN.deadline.text, suggestedActions: CHIP_DEADLINE };
    else tahap = tahapUmum(slot, layanan);

    return ulang ? { ...tahap, text: `${NUDGE_ULANG}\n\n${tahap.text}` } : tahap;
  }

  const url = buildPrefilledWhatsAppUrl(state);

  return {
    text: `Siap Kak! Semua datanya sudah lengkap dan Ina rangkum ya 🎉

**Rincian pesanan Kakak:**
${ringkasan(state).join('\n')}

Klik tombol di bawah ya — pesanannya sudah otomatis terisi di WhatsApp admin DataIn, jadi Kakak **tinggal tekan kirim** 🙏

[👉 Lanjut Pesan via WhatsApp Admin](${url})

Setelah dikirim, tim admin akan langsung mengecek kebutuhan Kakak dan memberikan estimasi harga serta waktu pengerjaan.

${CATATAN_AKHIR}`,
    suggestedActions: [
      { label: '📲 Lanjut ke WA (Data Sudah Terisi)', action: 'whatsapp', url },
      AKSI_WA,
      prompt('📋 Layanan Lain', 'apa saja layanan lengkap DataIn?'),
    ],
  };
}

export function adaSlotTerisi(state: OrderState): boolean {
  return urutanSlot(state.layanan).some((slot) => Boolean(state[slot]));
}

/** Buang slot yang tidak relevan untuk layanan baru, deadline tetap disimpan. */
function kosongkanSlotLayanan(state: OrderState, layanan: LayananId): OrderState {
  return layanan === 'responden'
    ? { ...state, jumlah: null, kriteria: null, link: null, detail: null, kebutuhan: null }
    : { ...state, jumlah: null, kriteria: null, link: null };
}

/** Isi tetap untuk jawaban "nggak ada kebutuhan khusus", bukan dianggap kosong. */
function jawabanKosong(pesan: string): string | null {
  const pola =
    /\b(nggak|gak|tidak|ga|tanpa)\s*(ada|perlu|kebutuhan|permintaan|syarat)\b|\b(bebas|terserah|semua aja|standar|default|gitu aja|nanti dulu|nanti aja)\b/i;
  return pola.test(pesan) ? 'Tidak ada kebutuhan khusus' : null;
}
