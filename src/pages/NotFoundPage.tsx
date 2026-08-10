// src/pages/NotFoundPage.tsx
import { Link } from 'react-router-dom';
import SEOHead from '../components/common/SEOHead';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-gray-50 flex items-center justify-center px-4 py-16 font-sans">
      <SEOHead
        title="404 - Halaman Tidak Ditemukan | DataIn"
        description="Halaman yang Anda cari tidak ditemukan di DataIn. Silakan kembali ke halaman utama kami."
      />
      <div className="text-center max-w-md mx-auto">
        <h1 className="text-7xl font-extrabold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent mb-4">
          404
        </h1>
        <h2 className="text-2xl font-bold text-gray-50 mb-3">Halaman Tidak Ditemukan</h2>
        <p className="text-gray-400 mb-8 text-sm sm:text-base leading-relaxed">
          Maaf, halaman yang Anda tuju tidak ada atau telah dipindahkan.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
