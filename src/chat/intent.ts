// src/chat/intent.ts
// Pencocok topik berbasis daftar tertutup (keyword/frasa) + penjaga topik di luar scope.
// Tidak ada panggilan AI: kalau tidak ada topik yang cocok, bot TIDAK menebak, tapi
// menolak dengan ramah lalu menawarkan menu topik resmi.

import { CHAT_INTENTS, type ChatIntent } from './knowledge';

/** Akhiran khas bahasa Indonesia yang tidak mengubah makna kata kunci. */
const AKHIRAN = ['nya', 'mu', 'ku', 'lah', 'kah', 'pun'];

/**
 * Buang akhiran posesif/penyerta supaya "respondennya" tetap dikenali sebagai "responden".
 * Syaratnya sisa kata minimal 3 huruf supaya "laku", "buku", "aku" tidak ikut terpotong.
 */
function akar(kata: string): string {
  for (const akhiran of AKHIRAN) {
    if (kata.length > akhiran.length + 2 && kata.endsWith(akhiran)) {
      return kata.slice(0, -akhiran.length);
    }
  }
  return kata;
}

/** Pecah pesan menjadi token lowercase (emoji, tanda baca, dan akhiran dibuang). */
export function tokenisasi(pesan: string): string[] {
  return (pesan ?? '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .map(akar);
}

/** Apakah urutan token `frasa` muncul berurutan di dalam `token`. */
function adaFrasa(token: string[], frasa: string[]): boolean {
  if (frasa.length === 0 || frasa.length > token.length) return false;
  for (let i = 0; i <= token.length - frasa.length; i++) {
    let cocok = true;
    for (let j = 0; j < frasa.length; j++) {
      if (token[i + j] !== frasa[j]) {
        cocok = false;
        break;
      }
    }
    if (cocok) return true;
  }
  return false;
}

type Aturan = { intent: ChatIntent; frasa: string[][] };

const ATURAN: Aturan[] = CHAT_INTENTS.map((intent) => ({
  intent,
  frasa: intent.keywords.map((k) => tokenisasi(k)),
}));

/** Skor per intent = jumlah token dari frasa yang cocok, jadi frasa panjang lebih spesifik. */
export function skorIntent(pesan: string): Array<{ intent: ChatIntent; skor: number }> {
  const token = tokenisasi(pesan);
  return ATURAN.map(({ intent, frasa }) => ({
    intent,
    skor: frasa.reduce((total, f) => total + (adaFrasa(token, f) ? f.length : 0), 0),
  })).filter((r) => r.skor > 0);
}

const FRASA_HARGA = [
  'harga',
  'biaya',
  'tarif',
  'biayanya',
  'harganya',
  'biaya layanan',
  'berapa harga',
  'harga berapa',
  'berapa biaya',
  'berapa tarif',
  'berapa duit',
  'berapa rupiah',
  'diskon',
  'promo',
  'budget',
];

const FRASA_KONTAK = [
  'whatsapp',
  'admin wa',
  'wa admin',
  'nomor wa',
  'nomor whatsapp',
  'admin',
  'hubungi',
  'kontak',
  'telepon',
  'tiktok',
  'akun tiktok',
  'sosial media',
  'customer service',
  'no hp',
];

/**
 * Kalau user menyebut jenis layanan secara spesifik (tugas, olah data, laporan,
 * skripsi, Canva, responden), jawaban(intent spesifik) lebih berguna daripada
 * jawaban "layanan lengkap" yang generik.
 */
const INTENT_LAYANAN_SPESIFIK = new Set(['responden', 'olah-data', 'tugas', 'skripsi', 'laporan', 'canva']);

/**
 * Intent terbaik untuk satu pesan.
 * Aturan harga dan kontak menang duluan, supaya "berapa biaya olah data?"
 * dijawab dengan kebijakan biaya, bukan penjelasan software.
 */
export function cocokIntent(pesan: string): ChatIntent | null {
  const token = tokenisasi(pesan);
  const hasil = skorIntent(pesan);
  if (hasil.length === 0) return null;

  const cari = (id: string) => hasil.find((r) => r.intent.id === id)?.intent ?? null;

  if (FRASA_HARGA.some((f) => adaFrasa(token, tokenisasi(f)))) {
    return cari('harga') ?? hasil[0].intent;
  }
  if (FRASA_KONTAK.some((f) => adaFrasa(token, tokenisasi(f)))) {
    return cari('kontak') ?? hasil[0].intent;
  }

  // Menyebut jenis layanan spesifik lebih tepat daripada jawaban layanan lengkap.
  const terbaik = hasil.reduce((a, b) => (b.skor > a.skor ? b : a)).intent;
  if (terbaik.id === 'layanan') {
    const spesifik = hasil.find((r) => INTENT_LAYANAN_SPESIFIK.has(r.intent.id));
    if (spesifik) return spesifik.intent;
  }

  return terbaik;
}

const FRASA_SALAM = [
  'halo',
  'hai',
  'hi',
  'hello',
  'pagi',
  'siang',
  'sore',
  'malam',
  'permisi',
  'assalamualaikum',
  'selamat pagi',
  'selamat siang',
  'selamat sore',
  'selamat malam',
];

/** Token sapaan, dipakai untuk mengenali pesan yang isinya cuma menyapa. */
const KATA_SALAM = new Set(
  FRASA_SALAM.flatMap((f) => tokenisasi(f))
);

/**
 * Kata yang tidak membawa informasi apa pun untuk pesanan: sapaan, persetujuan,
 * kata sungkan, dan perintah navigasi (termasuk chip "Lanjut Isi Pesanan" milik
 * bot sendiri). Pesan yang seluruh isinya kata-kata ini TIDAK BOLEH disimpan
 * ke slot pesanan, karena akan terkirim ke admin lewat WhatsApp.
 */
const KATA_ISIAN_KOSONG = new Set([
  ...KATA_SALAM,
  // persetujuan
  'ya',
  'iya',
  'yup',
  'yep',
  'ok',
  'oke',
  'sip',
  'siap',
  'betul',
  'benar',
  'boleh',
  'next',
  'done',
  'selesai',
  // navigasi / perintah bot
  'lanjut',
  'lanjutin',
  'lanjutkan',
  'isi',
  'pesan',
  'pesanan',
  'order',
  'lagi',
  // kata sungkan
  'saya',
  'aku',
  'kak',
  'kakak',
  'bang',
  'bro',
  'mau',
  'ingin',
  'pengen',
  'bisa',
  'tolong',
  'silakan',
  'tolongin',
  'hmm',
  // penguat tidak bermakna
  'sama',
  'aja',
  'saja',
  'juga',
  'sih',
  'dong',
  'dah',
  'deh',
  'lho',
  'nih',
  'tuh',
  'kayak',
  'gitu',
  'gini',
  'itu',
  'ini',
  'wah',
  'mantap',
  'keren',
  'selamat',
  // penanda waktu tanpa nilai deadline
  'sudah',
  'udah',
  'belum',
  'nanti',
  'dulu',
  'ada',
  'link',
  'kirim',
  'terkirim',
]);

/**
 * True bila pesan tidak membawa data pesanan apa pun, sehingga bot harus
 * mengulang pertanyaan yang sama alih-alih mengisinya.
 */
export function isIsianKosong(pesan: string): boolean {
  const token = tokenisasi(pesan);
  if (token.length === 0) return true;
  return token.every((t) => KATA_ISIAN_KOSONG.has(t));
}

const FRASA_TERIMA_KASIH = [
  'terima kasih',
  'terimah kasih',
  'makasih',
  'mksh',
  'thanks',
  'thank you',
  'mantap',
  'keren',
  'syukurlah',
];

const FRASA_ULANG = [
  'mulai ulang',
  'ganti data',
  'ubah data',
  'batal',
  'reset',
  'hapus pesanan',
];

/** Penanda user Exposure sebagian membatalkan pilihan layanan sebelumnya. */
const FRASA_KOREKSI = [
  'tidak jadi',
  'ga jadi',
  'gak jadi',
  'ganti saja',
  'mau ganti',
  'bukan itu',
  'bukan yang itu',
  'salah',
  'bukan',
  'oh tunggu',
  'eh tunggu',
];

const FRASA_LANJUT = [
  'lanjut pesanan',
  'lanjut isi pesanan',
  'lanjutkan pesanan',
  'isi pesanan',
  'lanjut',
];

const MARKA_TANYA = [
  'apa',
  'apaan',
  'berapa',
  'apakah',
  'bagaimana',
  'gimana',
  'kenapa',
  'mengapa',
  'boleh',
  'bisa',
  'minta',
  'tolong',
  'bolehkah',
];

/**
 * Penanda pertanyaan yang benar-benar ingin dijawab, beda dari "tolong" atau
 * "bisa" yang justru berarti permintaan. Dipakai supaya "tolong olah data"
 * tetap membuka alur pemesanan, sedangkan "boleh bantu tugas?" tetap
 * diperlakukan sebagai pertanyaan.
 */
const TANYA_BENAR = [
  'apa',
  'apaan',
  'berapa',
  'apakah',
  'bagaimana',
  'gimana',
  'kenapa',
  'mengapa',
  'bolehkah',
  'kapan',
  'dimana',
  'siapa',
];

const KATA_MAU = [
  'butuh',
  'butuhin',
  'butuhkah',
  'ingin',
  'inget',
  'pengin',
  'order',
  'pesan',
  'pesen',
  'sewa',
  'pakai',
  'minta',
  'tolong',
  'tolongin',
  'bantu',
  'bikin',
  'bikinin',
  'kerjakan',
];

/**
 * Kata yang menandai jenis layanan. Dipakai untuk membuka alur pemesanan,
 * jadi BUKAN hanya joki responden: tugas, olah data, laporan, skripsi, dan
 * desain Canva punya alur pemesanan masing-masing.
 */
const KATA_LAYANAN = [
  // responden
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
  // tugas
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
  // olah data
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
  // laporan
  'laporan',
  'pkl',
  'kkn',
  'magang',
  'praktikum',
  'observasi',
  // skripsi
  'skripsi',
  'tesis',
  'karya ilmiah',
  'bimbingan',
  'konsultasi',
  'proposal',
  'sidang',
  'sempro',
  'bab',
  // canva
  'canva',
  'desain',
  'poster',
  'infografis',
  'banner',
  'logo',
  'thumbnail',
];

const KATA_KRITERIA = [
  'mahasiswa',
  'mhs',
  'umum',
  'usia',
  'umur',
  'tahun',
  'thn',
  'semester',
  'smt',
  'domisili',
  'jakarta',
  'jabodetabek',
  'kota',
  'kampus',
  'universitas',
  'kuliah',
  'pekerjaan',
  'profesi',
  'karyawan',
  'wiraswasta',
  'perempuan',
  'remaja',
  'dewasa',
  'lansia',
  'keluarga',
  's1',
  's2',
  's3',
];

export { KATA_KRITERIA };

const POLA_OFF_TOPIC: Array<{ pola: RegExp; label: string }> = [
  {
    pola: /\b(resep|masak|memasak|masakan|bumbu|goreng|panggang|kue|sambal|kerupuk|opor|soto|gulai|rendang|combro|batagor)\b/i,
    label: 'resep atau masakan',
  },
  {
    pola: /\b(sepak bola|liga|skor|gol|pemain|persib|persela|fifa|real madrid|barcelona|timnas|bola)\b/i,
    label: 'hasil pertandingan olahraga',
  },
  {
    pola: /\b(politik|pemilu|pileg|presiden|menteri|gubernur|walikota)\b/i,
    label: 'topik politik',
  },
  {
    pola: /\b(ramalan|zodiak|horoskop|shio|tarot|astrolog|jodoh)\b/i,
    label: 'ramalan atau zodiak',
  },
  {
    pola: /\b(game|mlbb|mobile legends|valorant|pubg|genshin|gacha|cheat|hack|bobol)\b/i,
    label: 'game dan cheat',
  },
  {
    pola: /\b(artis|selebritis|seleb|hottest|idol)\b/i,
    label: 'hiburan dan tokoh terkenal',
  },
  {
    pola: /\b(film|sinopsis|nonton|anime|bioskop|netflix|drakor)\b/i,
    label: 'film dan hiburan',
  },
  {
    pola: /\b(lagu|penyanyi|lyrics|lirik|konser musik)\b/i,
    label: 'lagu dan musik',
  },
  {
    pola: /\b(pacar|sayang|asmara|kencan)\b/i,
    label: 'hubungan asmara',
  },
  {
    pola: /\b(jual beli|mobil|motor|properti|kontrakan)\b/i,
    label: 'jual beli kendaraan dan properti',
  },
  {
    pola: /\b(saham|forex|crypto|bitcoin|investasi)\b/i,
    label: 'saham dan investasi',
  },
];

function cocokSalahSatu(token: string[], frasa: string[]): boolean {
  return frasa.some((f) => adaFrasa(token, tokenisasi(f)));
}

export function isSapaan(pesan: string): boolean {
  return cocokSalahSatu(tokenisasi(pesan), FRASA_SALAM);
}

export function isTerimaKasih(pesan: string): boolean {
  return cocokSalahSatu(tokenisasi(pesan), FRASA_TERIMA_KASIH);
}

export function isUlang(pesan: string): boolean {
  return cocokSalahSatu(tokenisasi(pesan), FRASA_ULANG);
}

/** True bila user menyatakan berubah pikiran tentang layanan yang dipilih. */
export function isKoreksiLayanan(pesan: string): boolean {
  return cocokSalahSatu(tokenisasi(pesan), FRASA_KOREKSI);
}

export function isLanjutPesanan(pesan: string): boolean {
  return cocokSalahSatu(tokenisasi(pesan), FRASA_LANJUT);
}

/** True bila pesan terasa seperti pertanyaan, bukan jawaban slot pemesanan. */
export function isPertanyaan(pesan: string): boolean {
  if (pesan.includes('?')) return true;
  return cocokSalahSatu(tokenisasi(pesan), MARKA_TANYA);
}

/**
 * True bila user membuka sesi pemesanan (layanan apa pun).
 * Pesan yang benar-benar berupa pertanyaan tetap bukan trigger, supaya
 * "boleh bantu tugas?" dijawab sebagai pertanyaan, bukan memulai order.
 */
export function isOrderTrigger(pesan: string): boolean {
  const token = tokenisasi(pesan);
  if (!cocokSalahSatu(token, KATA_MAU)) return false;
  if (pesan.includes('?') || cocokSalahSatu(token, TANYA_BENAR)) return false;
  return cocokSalahSatu(token, KATA_LAYANAN);
}

/** Cek apakah sebuah frasa (bisa beberapa kata) muncul berurutan di pesan. */
export function frasaAda(pesan: string, frasa: string): boolean {
  return adaFrasa(tokenisasi(pesan), tokenisasi(frasa));
}

export function hasKataKriteria(pesan: string): boolean {
  return cocokSalahSatu(tokenisasi(pesan), KATA_KRITERIA);
}

/** Deteksi topik di luar layanan DataIn, untuk pesan penolakan yang lebih spesifik. */
export function isOffTopic(pesan: string): boolean {
  return POLA_OFF_TOPIC.some(({ pola }) => pola.test(pesan));
}

export function labelOffTopic(pesan: string): string | null {
  const cocok = POLA_OFF_TOPIC.find(({ pola }) => pola.test(pesan));
  return cocok ? cocok.label : null;
}
