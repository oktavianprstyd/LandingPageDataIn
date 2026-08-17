import type { ServiceItem } from '../types';

export const services: ServiceItem[] = [
  {
    id: 'joki-tugas',
    icon: 'BookOpen',
    name: 'Tugas Sekolah & Kuliah',
    description: 'Tugas numpuk? Biar prosesnya lebih ringan, kami bantu kebutuhan akademik dari makalah, essay, resume materi, review artikel/jurnal, hingga tugas presentasi.',
    features: [
      'Pengerjaan oleh ahli di bidangnya',
      'Revisi gratis hingga selesai',
      'Tepat sebelum deadline',
    ],
    image: '/images/services/joki_tugas.webp',
  },
  {
    id: 'jasa-responden',
    icon: 'Users',
    name: 'Isi Kuesioner & Penyedia Responden',
    description: 'Penyediaan responden nyata dan pengisian kuesioner terpercaya untuk kebutuhan survei serta penelitian akademik Anda.',
    features: [
      'Responden terverifikasi nyata',
      'Sesuai kriteria penelitian',
      'Pengisian cepat & terpercaya',
    ],
    image: '/images/services/service_jasa_responden.webp',
  },
  {
    id: 'konsultasi-akademik',
    icon: 'MessageCircle',
    name: 'Konsultasi Akademik',
    description: 'Konsultasi langsung dengan tim ahli kami untuk skripsi, tesis, jurnal, dan karya ilmiah lainnya.',
    features: [
      'Konsultasi via WhatsApp & chat',
      'Tim berpengalaman S1–S3',
      'Tersedia 7 hari seminggu',
    ],
    image: '/images/services/service_konsultasi_akademik.webp',
  },
  {
    id: 'pembuatan-laporan',
    icon: 'FileText',
    name: 'Pembuatan Laporan',
    description: 'Bantu menyusun dan merapikan laporan PKL, KKN, Praktikum, Observasi, Penelitian dari struktur hingga formatting agar lebih siap digunakan.',
    features: [
      'Format sesuai standar kampus',
      'Struktur terorganisir & rapi',
      'Siap cetak & kumpul',
    ],
    image: '/images/services/laporan.webp',
  },
  {
    id: 'olah-data',
    icon: 'BarChart3',
    name: 'Olah Data Statistik',
    description: 'Pengolahan dan analisis data penelitian menggunakan software SPSS, SmartPLS, AMOS, dan R dengan penjelasan hasil.',
    features: [
      'Olah data SPSS, PLS, AMOS & R',
      'Interpretasi hasil bab 4 lengkap',
      'Konsultasi gratis hingga paham',
    ],
    image: '/images/services/olah_data.webp',
  },
  {
    id: 'desain-canva',
    icon: 'Palette',
    name: 'Desain Canva',
    description: 'Butuh desain Canva untuk tugas, organisasi atau wirausaha? Kami bantu ubah idemu jadi siap digunakan.',
    features: [
      'Tinggal kirim bahan konsep & materi',
      'Desain rapi, kreatif & profesional',
      'Siap pakai untuk berbagai kebutuhan',
    ],
    image: '/images/services/desain_canva.jpeg',
  },
];
