import type { ServiceItem } from '../types';

export const services: ServiceItem[] = [
  {
    id: 'joki-tugas',
    icon: 'BookOpen',
    name: 'Joki Tugas',
    description: 'Bantu pengerjaan tugas kuliah dan sekolah secara profesional, tepat waktu, dan sesuai instruksi dosen.',
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
    name: 'Jasa Responden',
    description: 'Penyediaan responden nyata untuk kebutuhan survei, kuesioner, dan penelitian akademik Anda.',
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
    description: 'Penyusunan laporan praktikum, PKL, KKN, dan laporan akademik lainnya secara terstruktur dan rapi.',
    features: [
      'Format sesuai standar kampus',
      'Struktur terorganisir',
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
];
