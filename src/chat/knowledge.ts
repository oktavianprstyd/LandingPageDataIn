// src/chat/knowledge.ts
// Basis pengetahuan resmi DataIn. Setiap intent memiliki jawaban TERTULIS (bukan hasil AI),
// sehingga jawaban chatbot selalu konsisten dan tidak pernah mengarang fakta atau harga.

import type { SuggestedAction } from '../types/chat';
import { WA_NUMBER, WA_DISPLAY, TIKTOK_HANDLE } from '../data/contact';

// Kontak resmi disatukan di src/data/contact.ts agar tidak ada nomor yang berbeda antar fitur.
export { WA_NUMBER };
export const WA_ADMIN = WA_DISPLAY;
export const TIKTOK = TIKTOK_HANDLE;

export type IntentId =
  | 'layanan'
  | 'responden'
  | 'olah-data'
  | 'tugas'
  | 'skripsi'
  | 'laporan'
  | 'canva'
  | 'harga'
  | 'pembayaran'
  | 'garansi'
  | 'keamanan'
  | 'ketentuan'
  | 'waktu'
  | 'kontak'
  | 'tim'
  | 'profil'
  | 'operasional'
  | 'testimoni'
  | 'file'
  | 'cara-pesan'
  | 'format-order';

export interface ChatIntent {
  id: IntentId;
  /** Frasa kunci. Dicocokkan ke token pesan (bukan substring kasar) agar "wa" tidak cocok "waktu". */
  keywords: string[];
  /** Jawaban lengkap yang selalu sama setiap kali intent ini terbaca. */
  jawaban: string;
  actions: SuggestedAction[];
}

const WA_ACTION: SuggestedAction = { label: '💬 Chat Admin WhatsApp', action: 'whatsapp' };

function prompt(label: string, value: string): SuggestedAction {
  return { label, action: 'prompt', value };
}

export const CHAT_INTENTS: ChatIntent[] = [
  {
    id: 'responden',
    keywords: [
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
      'isi kuesioner',
      'data responden',
    ],
    jawaban: `👥 **Jasa Isi Kuesioner & Penyedia Responden DataIn**

Kami menyediakan responden **100% manusia asli**, bukan akun palsu, bot, atau manipulasi data otomatis.

Yang bisa Kakak dapat:
• **Kriteria disesuaikan** dengan penelitian Kakak: usia, jenis kelamin, domisili atau kota, pekerjaan, sampai mahasiswa aktif di jurusan tertentu.
• **Pengisian cepat** dan rapi, hasil kuesioner langsung siap diolah.
• **Data aman & rahasia**, tidak pernah dibagikan ke pihak lain.

Ina bisa bantu ngumpulin datanya satu per satu:
1️⃣ Berapa responden yang dibutuhkan?
2️⃣ Kriteria responnya seperti apa?
3️⃣ Link kuesioner-nya sudah ada?
4️⃣ Berapa deadline pengisiannya?

Kalau sudah lengkap, Kakak tinggal klik tombol WhatsApp yang pesannya sudah otomatis terisi 😊`,
    actions: [
      prompt('🚀 Mulai Pesan Responden', 'Saya mau pesan joki responden'),
      prompt('100 Responden', 'Saya butuh 100 responden'),
      prompt('❓ Contoh Kriteria', 'Kriteria responden itu seperti apa saja?'),
    ],
  },
  {
    id: 'olah-data',
    keywords: [
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
      'path analysis',
      'structural equation',
      'uji asumsi',
      'validitas',
      'reliabilitas',
      'hipotesis',
      'normalitas',
      'multikolinearitas',
      'anova',
      'bab 4',
      'interpretasi hasil',
      'excel statistik',
    ],
    jawaban: `📊 **Layanan Olah Data Statistik DataIn**

Kami mengolah dan menganalisis data penelitian dengan software **SPSS, SmartPLS, AMOS, EViews, R Studio, dan Excel Statistik**.

Rincian pekerjaan kami:
• Uji instrumen: validitas dan reliabilitas
• Uji asumsi klasik: normalitas, multikolinearitas, heteroskedastisitas, autokorelasi
• Analisis regresi, analisis jalur, dan Structural Equation Modeling
• Uji hipotesis: t-test, F-test, nilai p-value

**Output yang Kakak terima:**
• File output asli dari software (.spv, .spls, dan sejenisnya)
• **Interpretasi narasi Bab 4** lengkap, tinggal disalin ke skripsi atau tesis
• **Konsultasi baca hasil** sampai Kakak paham, bukan cuma dapat angka
• **Garansi revisi gratis** sampai disetujui dosen pembimbing

Konsultasi dan pengecekan estimasi biayanya **100% gratis**, tanpa kewajiban pesan dulu.`,
    actions: [
      prompt('💰 Tanya Biaya Olah Data', 'Berapa biaya olah data SPSS?'),
      prompt('⏱️ Berapa Lama Pengerjaannya', 'Berapa lama waktu pengerjaan olah data?'),
      WA_ACTION,
    ],
  },
  {
    id: 'tugas',
    keywords: [
      'tugas',
      'tgs',
      'joki tugas',
      'makalah',
      'essay',
      'esai',
      'resume',
      'rangkuman',
      'review jurnal',
      'artikel ilmiah',
      'ppt',
      'presentasi',
      'slide',
      'tugas kuliah',
      'tugas sekolah',
      'asistensi tugas',
      'uts',
      'uas',
      'bahasa inggris',
      'dalam bahasa',
      'terjemah',
      'translate',
      'translation',
      'naskah',
      'tulisan',
      'paraf',
      'bikin esai',
      'tugas kelompok',
    ],
    jawaban: `📚 **Bantuan Tugas Sekolah & Kuliah DataIn**

Jenis tugas yang bisa kami bantu:
• **Makalah** ilmiah dan **essay** atau esai argumentatif
• **Resume** atau rangkuman materi kuliah
• **Review artikel jurnal** nasional dan internasional
• **Tugas presentasi** PPT atau slide interaktif
• Tugas individu maupun kelompok

Cara kami kerjakan:
• Dikerjakan **lulusan S1 sampai S3 dari kampus ternama**, sesuai bidang studi tugasnya
• **100% bebas plagiasi** dan aman Turnitin, format rapi sesuai panduan kampus
• **Garansi revisi gratis** sampai tugasnya disetujui guru atau dosen
• Dikirim **tepat sebelum deadline** yang disepakati

Konsultasi dan pengecekan instruksi tugasnya **gratis** dulu, Kakak tinggal kirim detailnya ke admin.`,
    actions: [
      prompt('💰 Tanya Biaya Tugas', 'Berapa biaya bantuan tugas kuliah?'),
      prompt('🔒 Apakah Data Saya Aman', 'Apakah kerahasiaan identitas saya aman?'),
      WA_ACTION,
    ],
  },
  {
    id: 'skripsi',
    keywords: [
      'skripsi',
      'tesis',
      'karya ilmiah',
      'bimbingan',
      'konsultasi',
      'konsul',
      'proposal',
      'sidang',
      'sempro',
      'bab 1',
      'bab 2',
      'bab 3',
      'bab 5',
      'tulisan ilmiah',
      'menentukan judul',
      'perumusan masalah',
      'dosen pembimbing',
    ],
    jawaban: `🎓 **Bimbingan & Konsultasi Skripsi / Tesis DataIn**

Kakak bisa berdiskusi **satu lawan satu** dengan tim expert kami, mulai dari:
• **Menentukan judul** dan perumusan masalah yang layak
• **Bab 1** latar belakang, **Bab 2** kajian pustaka, **Bab 3** metodologi, **Bab 4** analisis, sampai **Bab 5** pembahasan
• **Persiapan sidang**: simulasi seminar proposal sampai latihan sidang akhir
• Pendampingan revisi kalau masukan reviewer atau dosen

Fleksibel lewat **WhatsApp chat** atau **meeting online**, tersedia **7 hari seminggu** ✅

Cocok juga kalau Kakak butuh tempat konsultasi untuk penelitian skripsi maupun tesisnya.`,
    actions: [
      prompt('📅 Cara Konsultasi Skripsi', 'Bagaimana cara konsultasi skripsi?'),
      prompt('💰 Tanya Biaya Bimbingan', 'Berapa biaya bimbingan skripsi?'),
      WA_ACTION,
    ],
  },
  {
    id: 'laporan',
    keywords: [
      'laporan',
      'pkl',
      'kkn',
      'magang',
      'praktikum',
      'observasi',
      'laporan pkl',
      'laporan kkn',
      'laporan magang',
    ],
    jawaban: `📑 **Pembuatan & Perapian Laporan DataIn**

Kami bantu menyusun sekaligus merapikan:
• **PKL** atau Praktik Kerja Lapangan
• **KKN** atau Kuliah Kerja Nyata
• **Magang**, **Praktikum**, dan **Observasi**

Hasil yang Kakak terima:
• Struktur penulisan **sistematis** dan rapi, mengikuti **pedoman resmi kampus atau program studi**
• Sudah termasuk isi naratif dan lampiran pendukung
• **Siap cetak dan dikumpulkan**, bisa juga file softcopy untuk pengecekan plagiasi

Formatnya kami sesuaikan dengan pedoman kampus Kakak, jadi tidak perlu menyusun ulang sendiri.`,
    actions: [
      prompt('💰 Tanya Biaya Laporan', 'Berapa biaya pembuatan laporan?'),
      prompt('⏱️ Berapa Lama Selesai', 'Berapa lama waktu pengerjaan laporan?'),
      WA_ACTION,
    ],
  },
  {
    id: 'canva',
    keywords: [
      'canva',
      'desain',
      'poster',
      'infografis',
      'banner',
      'thumbnail',
      'desain sosmed',
      'konten',
      'slide design',
    ],
    jawaban: `🎨 **Jasa Desain Canva DataIn**

Punya ide tapi belum jadi visual? Kami ubah idemu jadi desain yang **siap pakai**:
• **Slide presentasi** modern dan rapi
• **Infografis data** dan poster ilmiah atau kegiatan
• **Banner promosi** untuk organisasi dan wirausaha
• **Konten media sosial** beserta thumbnail-nya

Cara kerjanya gampang: **tinggal kirim bahan, materi, atau konsep** yang Kakak punya, tim kami yang meraciknya jadi visual yang estetik dan profesional ✨

Tidak perlu mulai dari nol.`,
    actions: [
      prompt('💰 Tanya Biaya Desain', 'Berapa biaya desain canva?'),
      prompt('⏱️ Berapa Lama Pengerjaannya', 'Berapa lama desain canva selesai?'),
      WA_ACTION,
    ],
  },
  {
    id: 'harga',
    keywords: [
      'harga',
      'biaya',
      'biayanya',
      'tarif',
      'harganya',
      'biaya layanan',
      'berapa harga',
      'harga berapa',
      'berapa biaya',
      'berapa tarif',
      'berapa duit',
      'berapa rupiah',
      'cicilan',
      'diskon',
      'promo',
      'murah',
      'mahal',
      'budget',
      'patokan harga',
      'nego',
      'negosi',
      'discus',
      'potongan harga',
      'bisa nego',
      'biaya admin',
      'biaya tambahan',
      'ongkir',
    ],
    jawaban: `💰 **Kebijakan Biaya DataIn**

Tidak ada harga mati di sini ya Kak 🙏 — biayanya memang **kustom**, ditentukan oleh tiga hal:
1. **Jenis layanan**: olah data, tugas, responden, laporan, desain, atau bimbingan
2. **Tingkat kesulitan dan kompleksitas** materinya
3. **Deadline** pengerjaan, reguler atau kilat

Yang bisa Ina jamin:
• Harga **sangat bersahabat** dan ramah untuk mahasiswa atau pelajar
• **Konsultasi, pengecekan instruksi, dan estimasi harga 100% GRATIS**, tanpa kewajiban pesan
• **Tanpa biaya tersembunyi** — semua sudah disepakati dulu sebelum pengerjaan dimulai

Nominalpastinya diberikan admin WhatsApp resmi DataIn di **${WA_ADMIN}** setelah instruksi Kakak dicek, supaya harganya benar-benar pas dengan kebutuhan dan bukan asal tebak. Admin merespon < 15 menit ✅`,
    actions: [
      { label: '💬 Minta Estimasi Gratis di WA', action: 'whatsapp' },
      prompt('⏱️ Berapa Lama Pengerjaannya', 'Berapa lama waktu pengerjaan?'),
    ],
  },
  {
    id: 'garansi',
    keywords: [
      'garansi',
      'revisi',
      'revisi gratis',
      'tidak sesuai',
      'gak sesuai',
      'kurang sesuai',
      'diacc',
      'refund',
      'uang kembali',
      'kualitas',
      'salah',
    ],
    jawaban: `🛡️ **Garansi Revisi Gratis DataIn**

Aturan mainnya jelas dan bisa Kakak pegang:
• **Revisi gratis** sampai hasilnya **sesuai brief atau instruksi awal** dan **disetujui** oleh dosen atau guru pembimbing
• **Revisi 1x24 jam** gratis untuk hasil yang tidak sesuai request atau format awal
• Revisi di luar format awal atau permintaan baru dikenakan **biaya tambahan**, dan ini selalu dikomunikasikan di awal, bukan diam-diam

Jadi kalau hasil pertama belum sesuai, Kakak **tidak perlu sungkan** untuk minta revisi.`,
    actions: [
      prompt('🔒 Apakah Data Saya Aman', 'Apakah kerahasiaan identitas saya aman?'),
      WA_ACTION,
    ],
  },
  {
    id: 'keamanan',
    keywords: [
      'aman',
      'keamanan',
      'rahasia',
      'rahasiaan',
      'privasi',
      'kerahasiaan',
      'bocor',
      'identitas',
      'plagiat',
      'plagiasi',
      'turnitin',
      'dipublikasikan',
      'plagiaris',
      'anti plagiat',
      'original',
      'karya orisinal',
    ],
    jawaban: `🔒 **Jaminan Kerahasiaan 100% DataIn**

Privasi Kakak adalah prioritas utama kami:
• **Identitas, nama kampus, materi tugas, dan data penelitian** dilindungi ketat serta **tidak pernah** dipublikasikan atau dibagikan ke pihak ketiga
• Pengerjaan **100% bebas plagiasi** dan aman Turnitin, dengan file asli untuk pengecekan
• **Data responden penelitian** tidak disalahgunakan untuk keperluan apa pun

Ditambah lagi:
• **Garansi revisi gratis** sampai sesuai instruksi awal
• Admin kami merespon cepat, rata-rata **kurang dari 15 menit** ✅`,
    actions: [
      prompt('📋 Lihat Semua Layanan', 'Apa saja layanan lengkap DataIn?'),
      WA_ACTION,
    ],
  },
  {
    id: 'waktu',
    keywords: [
      'berapa lama',
      'lama pengerjaan',
      'waktu pengerjaan',
      'durasi',
      'berapa lama selesai',
      'kilat',
      'express',
      'cepat selesai',
      'sampai kapan',
      'kapan selesai',
      'deadline',
      'kapan bisa mulai',
      'kapan mulai',
      'mulai kapan',
      'berapa lama lagi',
      'tenggat waktu',
      'hari ini',
      'besok',
      'lusa',
      'malam ini',
      'segera',
      'urgent',
      'mendadak',
      'buru',
      'buruan',
      'ngebut',
      'asap',
      'pengerjaan cepat',
      'kapan selesai',
    ],
    jawaban: `⏱️ **Estimasi Waktu Pengerjaan DataIn**

Kami sangat fleksibel mengikuti deadline Kakak:
• **Layanan Kilat (express):** selesai dalam hitungan jam, **maksimal di bawah 24 jam** untuk kebutuhan mendesak
• **Layanan reguler:** **2 sampai 5 hari kerja**, menyesuaikan tingkat kesulitan

Yang kami jamin:
• Hasil dikirim **tepat sebelum batas waktu** yang disepakati
• Kalau selesai lebih cepat dari estimasi, Kakak **tidak perlu menambah revisi** 😌
• Ada **garansi revisi gratis** kalau hasil pertama belum sesuai

Kalau butuh versi kilat, sebutkan saja di awal agar admin bisa cek kapasitas hari itu.`,
    actions: [
      prompt('💰 Tanya Biaya', 'Berapa biaya layanan DataIn?'),
      { label: '💬 Tanya Layanan Kilat di WA', action: 'whatsapp' },
    ],
  },
  {
    id: 'layanan',
    keywords: [
      'apa saja layanan',
      'layanan lengkap',
      'daftar layanan',
      'jenis layanan',
      'jenis jasa',
      'menu layanan',
      'informasi layanan',
      'info layanan',
      'buka umum',
      'layanan apa aja',
      'layanan apa saja',
      'apa saja jasa',
      'ada layanan apa',
      'jasa apa aja',
      'jasa apa saja',
      'apa aja yang tersedia',
      'apa saja yang tersedia',
      'apa yang bisa dibantu',
      'apa saja yang bisa dibantu',
      'apa saja yang bisa',
      'apa aja layanan',
      'apa saja layanan',
      'daftar jasa',
      'semua layanan',
      'fasilitas',
      'jasa yang ada',
      'layanan yang ada',
    ],
    jawaban: `📋 **Layanan Lengkap DataIn**

| Layanan | Isi |
|---|---|
| 👥 **Isi Kuesioner dan Responden** | Responden manusia asli, sesuai kriteria penelitian |
| 📊 **Olah Data Statistik** | SPSS, SmartPLS, AMOS, EViews, R Studio, plus interpretasi Bab 4 |
| 📚 **Tugas Sekolah dan Kuliah** | Makalah, essay, resume, review jurnal, PPT |
| 🎓 **Konsultasi Akademik** | Bimbingan skripsi, tesis, proposal, persiapan sidang |
| 📑 **Pembuatan Laporan** | PKL, KKN, Praktikum, Magang, Observasi |
| 🎨 **Desain Canva** | Slide presentasi, poster, infografis, banner promosi |

**Keunggulan semua layanan:**
✅ Kerahasiaan 100% dijamin dan bebas plagiasi
✅ Garansi revisi gratis hingga disetujui dosen
✅ Tepat sebelum deadline
✅ Dikerjakan lulusan S1 sampai S3 sesuai bidangnya
✅ Admin merespon kurang dari 15 menit

Mau mulai dari yang mana Kak? Pilih salah satu topik di bawah ya 😊`,
    actions: [
      prompt('👥 Pesan Responden', 'Saya mau pesan joki responden'),
      prompt('📊 Olah Data', 'Jelaskan layanan olah data statistik'),
      prompt('📚 Bantuan Tugas', 'Jelaskan layanan bantuan tugas kuliah'),
      prompt('🎓 Bimbingan Skripsi', 'Jelaskan layanan bimbingan skripsi'),
    ],
  },
  {
    id: 'cara-pesan',
    keywords: [
      'cara pesan',
      'cara order',
      'cara memesan',
      'gimana memesan',
      'gimana order',
      'langkah pemesanan',
      'alur pemesanan',
      'prosedur pemesanan',
      'mulai dari mana',
    ],
    jawaban: `📝 **Cara Pesan di DataIn — Cuma 3 Langkah**

**1️⃣ Chat di sini, atau langsung ke admin WhatsApp**
Sebutkan kebutuhan Kakak: layanan apa yang dibutuhkan, jumlahnya berapa, dan kapan deadline-nya.

**2️⃣ Kirim instruksi ke admin WhatsApp**
Kirim file, judul penelitian, instruksi tugas, link kuesioner, atau data yang mau diolah. Semua datanya sudah Ina rangkum otomatis, jadi Kakak tidak perlu mengetik ulang.

**3️⃣ Sepakat biaya, lalu mulai dikerjakan**
Admin memberi estimasi **biaya dan waktu pengerjaan** secara gratis, tanpa kewajiban pesan. Kalau setuju, pengerjaan langsung dimulai dengan jaminan kerahasiaan dan garansi revisi.

📌 **Catatan penting:** revisi **1x24 jam** gratis untuk hasil yang tidak sesuai request atau format awal. Perubahan request di luar format awal dikenakan biaya tambahan, dan selalu dibahas lebih dulu.

Kontak WhatsApp admin resmi DataIn: **${WA_ADMIN}** (TikTok: **${TIKTOK}**) ✅`,
    actions: [
      prompt('👥 Mau Pesan Responden', 'Saya mau pesan joki responden'),
      prompt('💰 Cek Estimasi Biaya', 'Berapa biaya layanan DataIn?'),
      { label: '💬 Langsung Chat Admin WA', action: 'whatsapp' },
    ],
  },
  {
    id: 'format-order',
    keywords: [
      'format order',
      'format pemesanan',
      'format pesan',
      'template order',
      'template pemesanan',
      'minta format',
      'minta template',
      'form pemesanan',
      'form order',
      'format joki',
      'formatnya',
      'contoh format',
    ],
    jawaban: `📄 **Format Order Resmi Joki Responden DataIn**

\`\`\`
FORMAT ORDER JOKI RESPONDEN

Asal kampus:
Keeperluan: (Skripsi / Tugas / Penelitian)
Jumlah responden:
Kriteria responden:
Tipe soal: (Pilihan Ganda / Essay / Campuran)
Link kuesioner:
Deadline:
Catatan tambahan:
\`\`\`

**Ketentuan:**
⚠️ Wajib diisi dengan detail dan jelaskan seluruh request agar tidak terjadi miskomunikasi.
📌 Revisi **1x24 jam** hanya untuk hasil yang tidak sesuai request atau format awal. Revisi di luar format atau perubahan request dikenakan biaya tambahan.
🙏 Setelah data dikirim, kami cek kebutuhan responden dan berikan estimasi harga serta waktu pengerjaan.

💡 **Saran Ina:** daripada mengetik manual, pakai tombol di bawah. Ina akan menanyakan **jumlah, kriteria, link, lalu deadline** satu per satu, lalu menyiapkan link WhatsApp yang pesannya sudah terisi otomatis 😎`,
    actions: [
      prompt('🚀 Mulai Pesan (Isi Otomatis)', 'Saya mau pesan joki responden'),
      { label: '💬 Kirim Format Manual ke WA', action: 'whatsapp' },
    ],
  },
  {
    id: 'pembayaran',
    keywords: [
      'cara bayar',
      'cara pembayaran',
      'cara pay',
      'bayar',
      'bayar dulu',
      'bayar di awal',
      'bayar di akhir',
      'pembayaran',
      'pembayaran di',
      'kapan bayar',
      'dp',
      'uang muka',
      'termin',
      'angsuran',
      'cicil',
      'cicilan',
      'transfer',
      'cod',
      'qris',
      'e wallet',
      'ovo',
      'dana',
      'gopay',
      'shopeepay',
      'rekening',
      'nama rekening',
      'nomor rekening',
      'bisa cod',
      'harus bayar',
      'bisa bayar',
      'cara bayar bagaimana',
      'metode pembayaran',
      'bayar pakai apa',
      'pembayaran seperti apa',
      'transfer bank',
      'pembayaran fleksibel',
    ],
    jawaban: `💳 **Cara Pembayaran DataIn**

Alurnya gampang, Kakak tidak perlu menebak:

1. **Konsultasi gratis dulu** — kirim kebutuhan, admin cek instruksinya.
2. **Dapat estimasi biaya dan waktu**, tanpa kewajiban pesan.
3. **Kalau setuju, baru ada tahap pembayaran.** Nominal, metode, dan apakah perlu DP atau termin **dibahas dan disepakati dulu**, jadi Kakak tahu persis yang harus dibayar.
4. **Pengerjaan baru mulai** setelah kesepakatan itu, dengan revisi 1x24 jam gratis untuk hasil yang tidak sesuai format awal.

Jadi **tidak ada biaya yang muncul diam-diam** di tengah jalan 🙏

Metode pembayaran yang tersedia dan skema DP atau termin yang paling pas, langsung tanya admin di WhatsApp ya — semuanya disesuaikan dengan kebutuhan Kakak.

⚠️ Kalau ada yang menghubungi lewat nomor atau rekening **di luar admin resmi DataIn**, abaikan saja. Semua transaksi hanya lewat **${WA_ADMIN}** ✅`,
    actions: [
      { label: '💬 Tanya Pembayaran ke Admin', action: 'whatsapp' },
      prompt('💰 Tanya Biaya Layanan', 'Berapa biaya layanan DataIn?'),
      prompt('🛡️ Garansi Revisi', 'Bagaimana kalau hasilnya tidak sesuai?'),
    ],
  },
  {
    id: 'tim',
    keywords: [
      'siapa yang',
      'siapa saja',
      'mengerjakan',
      'dikerjakan oleh',
      'dikerjakan siapa',
      'ahli',
      'ahlinya',
      'expert',
      'pakar',
      'pengalaman',
      'berpengalaman',
      'pengalaman kami',
      'sudah berapa lama',
      'tim',
      'tim kami',
      'nama',
      'nama siapa',
      'nama admin',
      'pengajar',
      'dosen',
      'penulis',
      'peneliti',
      'riset',
      'editor',
      'pembimbing',
      'rekomendasi tim',
      'tim profesional',
      'tim yang mengerjakan',
      'yang mengerjakan',
      'ngerjain',
      'mengerjakan pesanan',
      'adminnya siapa',
      'pembimbingnya siapa',
    ],
    jawaban: `👨‍🏫 **Siapa yang Mengerjakan di DataIn**

Setiap pekerjaan **diserahkan ke orang yang bidangnya memang sesuai**:

• **Arief Budiman** — Founder & Lead Consultant
• **Nadia Kusuma** — Academic Writer
• **Hendro Wijaya** — Data & Research Specialist

Ditambah tim expert terverifikasi **lulusan S1, S2, sampai S3 dari kampus ternama**, yang ditugaskan **sesuai bidang studi atau keahlian akademis** masing-masing.

Jadi kalau soal regresi dan SmartPLS, yang menangani adalah orang yang memang ahli di bidang itu, bukan orang yang baru belajar ✅

Kalau Kakak mau tahu siapa yang akan menangani kasusnya secara spesifik, sebutkan saja kebutuhannya — admin akan menginformasikan tim yang mengurus ✅`,
    actions: [
      { label: '💬 Minta Info Tim untuk Kasus Kakak', action: 'whatsapp' },
      prompt('🎓 Bimbingan Skripsi', 'Jelaskan layanan bimbingan skripsi'),
      prompt('📚 Bantuan Tugas', 'Jelaskan layanan bantuan tugas kuliah'),
    ],
  },
  {
    id: 'profil',
    keywords: [
      'profil',
      'profilnya',
      'profil datain',
      'tentang',
      'tentang datain',
      'tentang kami',
      'apa itu datain',
      'dataIn itu',
      'dataIn apa',
      'perusahaan',
      'sejarah',
      'didirikan',
      'berdiri',
      'visi',
      'misi',
      'visi misi',
      'company',
      'pengenalan',
      'sejak',
      'sejak tahun',
      'lisensi',
      'izin usaha',
      'legalitas',
      'sejak kapan',
      'sejak kapan buka',
      'kapan buka',
      'bekerja sejak',
      'buka sejak',
      'terdaftar',
    ],
    jawaban: `🏢 **Profil DataIn Indonesia**

DataIn berdiri atas pemahaman mendalam terhadap tantangan akademik mahasiswa dan peneliti modern. Berawal dari **sekelompok akademisi dan praktisi data** yang ingin memberi bantuan nyata, DataIn berkembang menjadi **platform pendampingan pendidikan** yang bisa diandalkan.

**Layanan resmi kami:** isi kuesioner dan penyedia responden, olah data statistik, tugas sekolah dan kuliah, konsultasi akademik, pembuatan laporan, dan desain Canva.

**Nilai yang kami pegang:**
• **Integritas** — jujur dan tanggung jawab penuh
• **Kualitas** — setiap hasil direview ketat sebelum diserahkan
• **Ketepatan waktu** — deadline adalah komitmen
• **Kerahasiaan** — data klien tidak pernah disebarluaskan
• **Inovasi** — terus belajar mengikuti perkembangan akademik

Semua yang kami bantu berawal dari keluhan yang sama: kerumitan olah data SPSS/SmartPLS, tenggat tugas yang padat, dan sulitnya mengumpulkan responden ✅`,
    actions: [
      prompt('📋 Semua Layanan DataIn', 'Apa saja layanan lengkap DataIn?'),
      prompt('🕐 Lokasi dan Jam Layanan', 'Alamat dan jam buka DataIn?'),
      { label: '💬 Ngobrol dengan Admin', action: 'whatsapp' },
    ],
  },
  {
    id: 'operasional',
    keywords: [
      'alamat',
      'alamatnya',
      'lokasi',
      'lokasinya',
      'dimana',
      'di mana',
      'kantor',
      'area',
      'area layanan',
      'wilayah',
      'jakarta',
      'buka jam',
      'buka',
      'tutup',
      'jam operasional',
      'jam kerja',
      'jam berapa',
      'sabtu',
      'minggu',
      'hari kerja',
      'hari libur',
      'offline',
      'online',
      'datang',
      'ketemu',
      'bertemu',
      'meeting',
      'zoom',
      'video call',
      'vidio call',
      'onsite',
      'nambah peserta',
      'tambah peserta',
      'jumlah peserta',
      'offsite',
    ],
    jawaban: `🕐 **Lokasi dan Jam Operasional DataIn**

Semua layanan berjalan **online lewat WhatsApp**, jadi Kakak **nggak perlu datang ke tempat**. Instruksi, file, dan pembayaran cukup lewat chat saja ✅

**Ketersediaannya:**
• **Tersedia 7 hari seminggu** — termasuk Sabtu, Minggu, dan hari libur
• **Respon admin rata-rata di bawah 15 menit**, termasuk pesan di luar jam balas
• Konsultasi skripsi bisa lewat **WhatsApp chat atau meeting online**, sesuai jadwal yang disepakati

Karena operasionalnya sepenuhnya online, **tidak ada alamat kantor yang perlu dikunjungi** — cukup chat admin di **${WA_ADMIN}**, urusan Kakak selesai dari rumah 🙂

Kalau butuh jadwal meeting yang pasti di hari tertentu, sebutkan saja ke admin supaya dijadwalkan.`,
    actions: [
      { label: '💬 Chat Admin WhatsApp', action: 'whatsapp' },
      prompt('🎓 Cara Konsultasi Skripsi', 'Bagaimana cara konsultasi skripsi?'),
      prompt('📋 Semua Layanan DataIn', 'Apa saja layanan lengkap DataIn?'),
    ],
  },
  {
    id: 'testimoni',
    keywords: [
      'testimoni',
      'testimoninya',
      'review',
      'reviewnya',
      'ulasan',
      'rating',
      'bintang',
      'reputasi',
      'klien',
      'client',
      'pelanggan',
      'sudah berapa',
      'berapa banyak',
      'track record',
      'bukti',
      'terbukti',
      'banyak yang',
      'nama klien',
    ],
    jawaban: `⭐ **Kata Mereka yang Pernah Pakai DataIn**

Beberapa ulasan langsung dari testimoni di situs DataIn:

• **Rina Maharani** — "DataIn benar-benar menyelamatkan saya! Tugas statistik saya selesai tepat waktu dan nilainya A. Pelayanannya ramah dan responsif."
• **Budi Santoso** — "Dalam 2 hari sudah terkumpul 100 responden valid. Prosesnya mudah dan hasilnya memuaskan."
• **Dewi Anggraini** — "Mereka sabar menjelaskan dan memberi masukan yang konstruktif. Revisi bab 3 saya jadi lebih terarah."
• **Fajar Nugroho** — "Laporan KKN saya selesai dalam 3 hari tanpa drama. Format sesuai panduan kampus."
• **Sari Wulandari** — "Sudah pakai DataIn untuk 3 mata kuliah berbeda, hasilnya selalu konsisten bagus."
• **Rizky Pratama** — "Tim DataIn profesional banget. Dosen pun puas dengan hasilnya."

Intinya bukan cuma cepat selesai, tapi hasilnya **memang dipakai dan dinilai bagus** ✅

Mau lihat portofolio atau contoh hasil yang relevan dengan kebutuhan Kakak? Minta saja ke admin.`,
    actions: [
      { label: '💬 Minta Portofolio dan Contoh Hasil', action: 'whatsapp' },
      prompt('👥 Pesan Responden Kuesioner', 'Saya mau pesan joki responden'),
      prompt('📚 Bantuan Tugas', 'Jelaskan layanan bantuan tugas kuliah'),
    ],
  },
  {
    id: 'file',
    keywords: [
      'file',
      'file apa',
      'format file',
      'format berkas',
      'berkas',
      'dokumen',
      'docx',
      'doc',
      'word',
      'pdf',
      'excel',
      'xlsx',
      'csv',
      'spv',
      'spls',
      'sav',
      'upload',
      'unggah',
      'kirim file',
      'kirim berkas',
      'kirimin file',
      'softcopy',
      'soft file',
      'hardcopy',
      'cetak',
      'keluaran',
      'output',
      'hasil akhir',
      'file hasil',
      'lampiran',
      'filenya apa',
      'format apa',
      'format seperti apa',
      'hasil akhir file',
      'ppt-nya',
      'kirim softcopy',
      'terima file',
    ],
    jawaban: `📎 **Format File dan Hasil yang Kakak Terima**

**Untuk mengirim kebutuhan (file masuk):**
Kirim lewat WhatsApp admin dalam format apa pun yang paling gampang — **PDF, Word, Excel, atau foto** pun biasanya sudah cukup. Kalau ada pedoman kampus, modul, atau contoh format dari dosen, **kirimkan juga** supaya hasilnya persis mengikuti.

Kalau formatnya perlu disesuaikan, admin akan kabari lebih dulu, jadi Kakak tidak perlu menebak ✅

**Untuk hasil akhir (file keluar):**
• **File asli dari software** — misalnya \`.spv\` untuk SPSS dan \`.spls\` untuk SmartPLS
• **Interpretasi narasi Bab 4** yang tinggal disalin ke skripsi atau tesis
• **File softcopy** untuk pengecekan plagiasi
• Bisa juga **dicetak** kalau diperlukan untuk pengumpulan

Tinggal bilang aja maunya yang mana, nanti Ina catat di pesanan Kakak 📝`,
    actions: [
      { label: '💬 Kirim File ke Admin', action: 'whatsapp' },
      prompt('📊 Layanan Olah Data', 'Jelaskan layanan olah data statistik'),
      prompt('📑 Pembuatan Laporan', 'Jelaskan layanan pembuatan laporan'),
    ],
  },
  {
    id: 'ketentuan',
    keywords: [
      'minimum',
      'minimal',
      'min order',
      'minimum order',
      'minimal order',
      'minimal pemesanan',
      'minimal pembelian',
      'kuota',
      'kuota minimum',
      'bisa 1 aja',
      'paling sedikit',
      'batalkan',
      'pembatalan',
      'cancel',
      'refund',
      'uang kembali',
      'dikembalikan',
      'komplain',
      'protes',
      'kecewa',
      'ganti',
      'tukar',
      'ubah pesanan',
      'ubah request',
      'perubahan request',
      'tambah request',
      'ada garansi',
      'jaminan',
      'gimana kalau revisi',
      'bagaimana kalau revisi',
      'kalau revisi',
      'revisi gagal',
      'revisi terus',
      'revisi unlimited',
      'berapa kali revisi',
      'garansi berapa lama',
    ],
    jawaban: `📜 **Ketentuan Pemesanan DataIn**

**Soal revisi dan hasil (sudah jadi ketetapan kami):**
• **Revisi 1x24 jam gratis** untuk hasil yang **tidak sesuai request atau format awal**
• Revisi di luar format awal atau permintaan tambahan dikenakan **biaya tambahan**, dan **selalu dibahas lebih dulu**
• Hasil dikirim **tepat sebelum deadline** yang disepakati

**Soal ketentuan yang customized (Ina tidak mau asal jamin):**
• **Minimum order atau kuota** disesuaikan dengan kebutuhan dan kapasitas saat itu — tanya admin biar tidak ada salah paham
• **Pembatalan, refund, atau pengembalian dana** juga dibicarakan langsung dengan admin **sebelum** ada pembayaran
• Permintaan baru di tengah jalan diperlakukan sebagai revisi di luar format awal, jadi biayanya **dibahas dulu** ya 🙏

Prinsipnya: **semua hal yang tidak pasti dibicarakan dulu sebelum ada uang yang berpindah**, jadi Kakak tidak perlu menebak ✅`,
    actions: [
      { label: '💬 Tanya Ketentuan ke Admin', action: 'whatsapp' },
      prompt('🛡️ Cara Kerja Garansi Revisi', 'Bagaimana kalau hasilnya tidak sesuai?'),
      prompt('💰 Info Biaya', 'Berapa biaya layanan DataIn?'),
    ],
  },
  {
    id: 'kontak',
    keywords: [
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
      'deliver ke mana',
      'dikirim ke mana',
      'antar ke mana',
      'dikirim bagaimana',
      'cara terima',
      'no hp',
    ],
    jawaban: `📞 **Kontak Resmi DataIn**

Kakak bisa menghubungi kami lewat:
• **WhatsApp Admin:** **${WA_ADMIN}** (format internasional: ${WA_NUMBER})
• **TikTok resmi:** **${TIKTOK}**

⏱️ **Waktu respon: kurang dari 15 menit** ✅
🕐 **Tersedia 7 hari seminggu**

Kirim saja kebutuhan Kakak, baik tugas, olah data, responden, laporan, desain, atau bimbingan. Admin akan bantu mengecek sampai ketemu yang paling pas buat Kakak 😊`,
    actions: [
      { label: '💬 Buka WhatsApp Admin', action: 'whatsapp' },
      prompt('👥 Mau Pesan Responden', 'Saya mau pesan joki responden'),
    ],
  },
];

/** Menu topik yang selalu ditampilkan saat pertanyaan di luar scope atau tidak dikenali. */
export const TOPIK_MENU = [
  prompt('👥 Pesan Responden Kuesioner', 'Saya mau pesan joki responden'),
  prompt('📊 Olah Data SPSS/PLS', 'Jelaskan layanan olah data statistik'),
  prompt('📚 Bantuan Tugas dan Makalah', 'Jelaskan layanan bantuan tugas kuliah'),
  prompt('🎓 Bimbingan Skripsi', 'Jelaskan layanan bimbingan skripsi'),
  prompt('📑 Pembuatan Laporan', 'Jelaskan layanan pembuatan laporan'),
  prompt('🎨 Desain Canva', 'Jelaskan layanan desain canva'),
  prompt('💰 Info Biaya dan Garansi', 'Berapa biaya layanan DataIn?'),
  prompt('🏢 Tentang DataIn', 'DataIn itu apa?'),
  prompt('💳 Cara Pembayaran', 'Bagaimana cara pembayarannya?'),
  WA_ACTION,
];

export const JAWABAN_SALAM = `Halo Kak! 👋 Selamat datang di **DataIn**.

Saya **Ina**, asisten virtual resmi DataIn. Saya bisa bantu jelaskan semua layanan kami, mulai dari joki responden kuesioner, olah data SPSS dan SmartPLS, sampai bantuan tugas serta bimbingan skripsi.

Mau tanya yang mana dulu Kak? 😊`;

export const JAWABAN_TERIMA_KASIH = `Sama-sama Kak! 🥰 Senang bisa membantu.

Kalau ada lagi yang mau ditanyain, baik soal layanan, biaya, maupun pengerjaannya, Ina siap bantu kapan aja. Kalau mau langsung berdiskusi, admin kami ada di WhatsApp dan merespon di bawah 15 menit ✅`;

export const JAWABAN_TIDAK_DIKETAHUI = `Maaf Kak, pertanyaan itu belum bisa Ina jawab 🙏

Ina cuma bisa membantu seputar **layanan resmi DataIn**:
• Jasa isi kuesioner dan penyedia responden
• Olah data statistik: SPSS, SmartPLS, AMOS, EViews, R Studio
• Bantuan tugas sekolah dan kuliah
• Bimbingan skripsi, tesis, dan persiapan sidang
• Pembuatan laporan: PKL, KKN, Praktikum, Magang
• Desain Canva untuk tugas dan organisasi

Pilih salah satu topik di bawah ya, nanti Ina jelaskan detailnya 😊`;

export const JAWABAN_BELUM_PAHAM = `Hmm, Ina belum menangkap pertanyaan Kakak 😅

Coba tulis lebih lengkap sedikit ya, atau pilih langsung topik di bawah ini. Ina bisa jelaskan mulai dari cara pesan, biaya, sampai estimasi pengerjaannya 😊`;

export function jawabanDiLuarScope(topik: string | null): string {
  const pembuka = topik
    ? `Maaf ya Kak, soal **${topik}** itu di luar bidang Ina 🙏`
    : 'Maaf Kak, pertanyaan itu di luar bidang Ina 🙏';

  return `${pembuka}

Ina ini asisten resmi DataIn, jadi fokusnya cuma seputar layanan akademik kami:
• Jasa isi kuesioner dan penyedia responden
• Olah data statistik: SPSS, SmartPLS, AMOS, EViews, R Studio
• Bantuan tugas sekolah dan kuliah
• Bimbingan skripsi, tesis, dan persiapan sidang
• Pembuatan laporan: PKL, KKN, Praktikum, Magang
• Desain Canva untuk tugas dan organisasi

Ada yang mau Kakak tanyakan soal itu? Pilih topik di bawah ya 😊`;
}
