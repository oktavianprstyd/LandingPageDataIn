// api/knowledgeBase.ts

export interface KnowledgeChunk {
  id: string;
  category: 'layanan' | 'faq' | 'keunggulan' | 'prosedur' | 'kebijakan';
  title: string;
  keywords: string[];
  content: string;
}

export const DATAIN_KNOWLEDGE_BASE: KnowledgeChunk[] = [
  {
    id: 'kb-olah-data',
    category: 'layanan',
    title: 'Layanan Olah Data Statistik (SPSS, SmartPLS, AMOS, R Studio, EViews)',
    keywords: ['olah data', 'spss', 'pls', 'smartpls', 'amos', 'r studio', 'eviews', 'statistik', 'regresi', 'bab 4', 'uji asumsi', 'validitas', 'reliabilitas', 'hipotesis'],
    content: `
Layanan Olah Data Statistik DataIn:
- Software yang didukung: SPSS, SmartPLS, AMOS, EViews, R Studio, dan Excel Statistik.
- Lingkup pekerjaan: Uji instrumen (validitas & reliabilitas), uji asumsi klasik (normalitas, multikolinearitas, heteroskedastisitas, autokorelasi), analisis regresi, analisis jalur (path analysis), SEM (Structural Equation Modeling), dan uji hipotesis (t-test, F-test, p-value).
- Output lengkap: File output software (.spv, .spls, dll) + Interpretasi narasi hasil Bab 4 lengkap dan siap dimasukkan ke skripsi/tesis.
- Fasilitas utama: Bimbingan & penjelasan cara baca hasil hingga klien paham untuk sidang, serta garansi revisi gratis sampai disetujui (ACC) dosen pembimbing.
`.trim(),
  },
  {
    id: 'kb-tugas-kuliah',
    category: 'layanan',
    title: 'Layanan Bantuan Tugas Kuliah, Makalah, Essay & Presentasi',
    keywords: ['tugas', 'joki', 'makalah', 'essay', 'esai', 'resume', 'review jurnal', 'ppt', 'presentasi', 'kuliah', 'sekolah', 'tugas kuliah'],
    content: `
Layanan Asistensi Tugas DataIn:
- Jenis tugas: Makalah ilmiah, essay/esai argumentatif, resume/rangkuman materi kuliah, review artikel jurnal nasional & internasional, tugas presentasi PowerPoint (PPT interaktif).
- Kualitas: Dikerjakan langsung oleh tim expert lulusan S1 hingga S3 dari kampus ternama se-Indonesia sesuai rumpun ilmu tugas terkait.
- Keamanan: Jaminan 100% bebas plagiasi (Turnitin aman), format rapi sesuai panduan kampus, dan garansi revisi gratis hingga selesai.
`.trim(),
  },
  {
    id: 'kb-responden',
    category: 'layanan',
    title: 'Layanan Penyedia Responden Kuesioner & Survei Penelitian',
    keywords: ['responden', 'kuesioner', 'angket', 'survei', 'survey', 'isi kuesioner', 'target responden', 'sampel'],
    content: `
Layanan Responden Kuesioner DataIn:
- Responden 100% Manusia Asli (Real Human): Bukan akun palsu, bot, atau manipulasi data otomatis. Terverifikasi nyata.
- Penyesuaian Kriteria Demografi: Dapat disesuaikan dengan kebutuhan penelitian (usia, jenis kelamin, pekerjaan, domisili/kota tertentu, penghasilan, dsb).
- Kecepatan & Kerapian: Pengisian cepat sesuai target deadline dan data hasil kuesioner rapi serta siap diolah.
`.trim(),
  },
  {
    id: 'kb-format-order-responden',
    category: 'prosedur',
    title: 'Format Pemesanan Resmi Joki Responden Kuesioner',
    keywords: [
      'format order', 'format pemesanan', 'template order', 'minta format', 'form pemesanan', 'format joki', 'template kuesioner'
    ],
    content: `
Format Resmi Pemesanan Jasa Joki Responden DataIn:
PANDUAN PENTING UNTUK ASISTEN AI (INA):
- JANGAN langsung memberikan format template kosong ini jika pengguna baru pertama kali bertanya, ingin pesan, atau bertanya cara order.
- Layani secara interaktif dan ramah terlebih dahulu: tanyakan jumlah responden, lalu tanyakan kriteria, lalu tanyakan link dan deadline.
- Gunakan struktur format ini HANYA untuk mengisi parameter link WhatsApp secara otomatis setelah data obrolan lengkap, ATAU jika pengguna secara spesifik meminta template formulir kosong ("minta format order").

Struktur Format Order Responden:

FORMAT ORDER JOKI RESPONDEN

Asal kampus:
Keperluan: (Skripsi/Tugas/Penelitian)
Jumlah responden:
Kriteria responden:
Tipe soal: (Pilihan Ganda/Essay/Pilgan + Essay)
Link kuesioner:
Deadline:
Catatan tambahan:

Ketentuan & Catatan Penting:
⚠️ Wajib diisi dengan detail dan jelaskan seluruh request agar tidak terjadi miskomunikasi.
📌 Revisi 1×24 jam hanya untuk hasil yang tidak sesuai request/format awal. Revisi di luar format atau perubahan request akan dikenakan biaya tambahan.
Setelah data dikirim ke WhatsApp Admin (0822-2744-5735), tim DataIn akan cek kebutuhan responden dan memberikan estimasi harga + waktu pengerjaan. 🙏🏽😇
`.trim(),
  },
  {
    id: 'kb-skripsi-tesis',
    category: 'layanan',
    title: 'Layanan Bimbingan & Konsultasi Skripsi / Tesis / Karya Ilmiah',
    keywords: ['skripsi', 'tesis', 'bimbingan', 'konsultasi', 'konsul', 'judul', 'proposal', 'bab 1', 'bab 2', 'bab 3', 'bab 5', 'sidang', 'sempro'],
    content: `
Layanan Konsultasi Akademik DataIn:
- Konsultasi 1-on-1: Pendampingan intensif dari perumusan judul, latar belakang Bab 1, kajian pustaka Bab 2, metodologi Bab 3, hingga pembahasan Bab 5.
- Persiapan Sidang: Pendampingan simulasi sidang seminar proposal (sempro) dan sidang akhir (skripsi/tesis).
- Waktu fleksibel: Diskusi via WhatsApp chat maupun meeting online, tersedia 7 hari seminggu.
`.trim(),
  },
  {
    id: 'kb-laporan',
    category: 'layanan',
    title: 'Layanan Pembuatan & Perapian Laporan (PKL, KKN, Praktikum, Magang)',
    keywords: ['laporan', 'pkl', 'kkn', 'praktikum', 'magang', 'observasi', 'penelitian', 'format kampus'],
    content: `
Layanan Pembuatan Laporan DataIn:
- Bantu menyusun dan merapikan laporan PKL (Praktik Kerja Lapangan), KKN (Kuliah Kerja Nyata), Magang, Praktikum, dan Observasi.
- Format disesuaikan dengan pedoman resmi kampus/program studi, struktur sistematis, rapi, dan siap cetak/kumpul.
`.trim(),
  },
  {
    id: 'kb-canva',
    category: 'layanan',
    title: 'Layanan Desain Canva (Presentasi, Poster, Infografis)',
    keywords: ['canva', 'desain', 'design', 'poster', 'infografis', 'banner', 'slide'],
    content: `
Layanan Desain Canva DataIn:
- Pembuatan desain kreatif untuk tugas kuliah, organisasi kampus, atau wirausaha.
- Meliputi slide presentasi modern, infografis data, poster ilmiah/kegiatan, dan materi promosi.
- Cukup berikan bahan materi/konsep, tim kami ubah menjadi visual yang estetik dan siap pakai.
`.trim(),
  },
  {
    id: 'kb-harga-biaya',
    category: 'kebijakan',
    title: 'Kebijakan Biaya, Estimasi Harga, & Promo DataIn',
    keywords: ['harga', 'biaya', 'tarif', 'berapa', 'diskon', 'promo', 'mahal', 'murah', 'pembayaran'],
    content: `
Kebijakan Harga DataIn:
- Harga sangat bersahabat dan terjangkau untuk kantong mahasiswa & pelajar.
- Biaya bersifat kustom, ditentukan berdasarkan: jenis layanan, tingkat kesulitan/kompleksitas, dan deadline waktu pengerjaan.
- Konsultasi & pengecekan estimasi harga adalah 100% GRATIS tanpa ada komitmen pemesanan awal.
- Nominal pasti dan klaim promo mahasiswa HANYA diberikan melalui Admin WhatsApp resmi DataIn di 0822-2744-5735.
- Jangan pernah mengarang nominal harga tetap sendiri. Selalu arahkan ke WhatsApp admin.
`.trim(),
  },
  {
    id: 'kb-keamanan-garansi',
    category: 'kebijakan',
    title: 'Jaminan Kerahasiaan 100% & Garansi Revisi Gratis',
    keywords: ['aman', 'rahasia', 'privasi', 'garansi', 'revisi', 'bocor', 'identitas', 'terpercaya', 'legal'],
    content: `
Jaminan & Garansi DataIn:
- Kerahasiaan 100% Dijamin: Identitas klien, nama kampus, materi tugas, dan data penelitian dilindungi secara ketat, terenkripsi, dan TIDAK AKAN PERNAH dipublikasikan atau dibagikan ke pihak ketiga.
- Garansi Revisi Gratis: Klien berhak atas revisi gratis sampai tugas atau olah data sesuai brief instruksi awal dan disetujui (ACC) oleh dosen/guru pengampu.
- Waktu Fleksibel: Tersedia layanan express/kilat (< 24 jam) untuk kebutuhan mendesak dan layanan reguler (2-5 hari).
`.trim(),
  },
  {
    id: 'kb-kontak-order',
    category: 'prosedur',
    title: 'Prosedur Pemesanan & Kontak Resmi DataIn',
    keywords: ['cara pesan', 'cara order', 'kontak', 'whatsapp', 'admin', 'nomor wa', 'hubungi', 'pesan'],
    content: `
Cara Memesan Layanan di DataIn:
1. Hubungi Admin WhatsApp DataIn di nomor: +62 822-2744-5735 (0822-2744-5735).
2. Kirimkan file instruksi tugas, judul penelitian, kriteria responden, atau data statistik yang ingin dikerjakan beserta deadline.
3. Tim Admin akan memberikan estimasi biaya dan waktu pengerjaan terbaik (gratis).
4. Setelah sepakat, pekerjaan langsung diproses oleh expert terkait dengan jaminan kerahasiaan & garansi revisi.
- Waktu respon admin WhatsApp: Cepat (< 15 menit).
- Akun TikTok resmi: @datainaja_
`.trim(),
  },
];

/**
 * Lightweight BM25 / Keyword Semantic Relevance Matcher for RAG
 */
export function retrieveContext(query: string, topK: number = 3): { chunks: KnowledgeChunk[]; contextText: string } {
  const queryLower = query.toLowerCase();
  // Tokenize into words
  const queryTokens = queryLower
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter((t) => t.length > 2);

  const scoredChunks = DATAIN_KNOWLEDGE_BASE.map((chunk) => {
    let score = 0;

    // Check keyword exact matches
    for (const kw of chunk.keywords) {
      if (queryLower.includes(kw)) {
        score += 8;
      }
      for (const token of queryTokens) {
        if (kw.includes(token)) {
          score += 3;
        }
      }
    }

    // Check title match
    const titleLower = chunk.title.toLowerCase();
    for (const token of queryTokens) {
      if (titleLower.includes(token)) {
        score += 4;
      }
    }

    // Check content token frequency
    const contentLower = chunk.content.toLowerCase();
    for (const token of queryTokens) {
      if (contentLower.includes(token)) {
        score += 1;
      }
    }

    return { chunk, score };
  });

  // Sort by score descending
  scoredChunks.sort((a, b) => b.score - a.score);

  // Take top K matching chunks (if score > 0), otherwise take the most general ones
  let selected = scoredChunks.filter((item) => item.score > 0).slice(0, topK).map((i) => i.chunk);

  if (selected.length === 0) {
    // If no strong match, provide general services, pricing, and contact
    selected = DATAIN_KNOWLEDGE_BASE.filter(
      (c) => c.id === 'kb-tugas-kuliah' || c.id === 'kb-olah-data' || c.id === 'kb-kontak-order'
    );
  }

  const contextText = selected
    .map((chunk, index) => `[DOKUMEN ${index + 1}: ${chunk.title}]\n${chunk.content}`)
    .join('\n\n');

  return { chunks: selected, contextText };
}

/**
 * Checks if the user's query is clearly off-topic from DataIn's domain.
 */
export function checkDomainRelevance(query: string): { isOffTopic: boolean; category?: string } {
  const q = query.toLowerCase().trim();

  // Obvious non-academic and unrelated triggers
  const offTopicPatterns = [
    /\b(resep|masak|bumbu|goreng|panggang|kue|makanan)\b/i,
    /\b(sepak\s*bola|pertandingan|liga|skor|pemain\s*bola)\b/i,
    /\b(ramalan|zodiak|horoskop|shio|jodoh)\b/i,
    /\b(politik|pemilu|partai|presiden|pilkada|menteri)\b/i,
    /\b(game|mlbb|mobile\s*legends|valorant|pubg|genshin|gacha)\b/i,
    /\b(film|sinopsis|nonton|drama\s*korea|anime)\b/i,
    /\b(coding\s*game|bikin\s*website\s*sendiri|hack|bobol|cheat)\b/i,
    /\b(jual\s*beli\s*mobil|motor|properti|rumah)\b/i,
  ];

  // Academic or DataIn keywords that whitelist the query
  const academicWhitelist = [
    'datain', 'tugas', 'skripsi', 'tesis', 'makalah', 'jurnal', 'kuesioner', 'responden',
    'olah data', 'spss', 'pls', 'smartpls', 'amos', 'r studio', 'eviews', 'laporan', 'pkl',
    'kkn', 'canva', 'ppt', 'presentasi', 'revisi', 'dosen', 'kuliah', 'kampus', 'mahasiswa',
    'biaya', 'harga', 'admin', 'whatsapp', 'wa', 'order', 'pesan', 'bimbingan', 'konsul'
  ];

  const hasWhitelist = academicWhitelist.some((term) => q.includes(term));
  if (hasWhitelist) {
    return { isOffTopic: false };
  }

  for (const pattern of offTopicPatterns) {
    if (pattern.test(q)) {
      return { isOffTopic: true, category: 'unrelated' };
    }
  }

  return { isOffTopic: false };
}
