// src/services/chatService.ts
import type { ChatMessage, SuggestedAction } from '../types/chat';

/**
 * Sends chat message to backend proxy (/api/chat) connected to Google Gemini API.
 * Falls back to local rule-based knowledge engine if backend is unreachable or API key is pending.
 */
export async function sendChatMessage(
  userMessage: string,
  history: ChatMessage[] = []
): Promise<{ text: string; suggestedActions?: SuggestedAction[]; source?: string }> {
  try {
    const payload = {
      message: userMessage,
      history: history.map((h) => ({
        sender: h.sender,
        text: h.text,
      })),
    };

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      const data = await res.json();
      if (data && data.text) {
        return {
          text: data.text,
          suggestedActions: data.suggestedActions,
          source: data.source,
        };
      }
    }
  } catch (error) {
    console.warn('[chatService] Backend API call failed, falling back to local handler:', error);
  }

  // Fallback to local rule-based knowledge engine
  return localMockReply(userMessage, history);
}

function localMockReply(userMessage: string, history: ChatMessage[] = []): { text: string; suggestedActions?: SuggestedAction[]; source?: string } {
  const lower = userMessage.toLowerCase().trim();
  const fullContext = [...history.map((h) => h.text), userMessage].join(' ').toLowerCase();

  // 1. Olah Data / Statistik / SPSS / SmartPLS / AMOS / R / EViews
  if (
    lower.includes('olah data') ||
    lower.includes('spss') ||
    lower.includes('pls') ||
    lower.includes('smartpls') ||
    lower.includes('amos') ||
    lower.includes('statistik') ||
    lower.includes('eviews') ||
    lower.includes('r studio')
  ) {
    return {
      text: `📊 **Layanan Olah Data Statistik DataIn:**
Kami melayani pengolahan & analisis data kuantitatif menggunakan software **SPSS, SmartPLS, AMOS, EViews, hingga R Studio**.

✨ **Keuntungan di DataIn:**
• Dilengkapi interpretasi hasil analisis Bab 4 lengkap.
• Garansi revisi gratis sampai dosen pembimbing approve.
• Konsultasi & penjelasan uji hingga Anda benar-benar paham.

Ingin konsultasikan judul atau software penelitianmu sekarang?`,
      suggestedActions: [
        { label: '💬 Tanya Biaya Olah Data via WA', action: 'whatsapp' },
        { label: 'Berapa lama waktu pengerjaannya?', action: 'prompt', value: 'Berapa lama estimasi waktu pengerjaan olah data?' },
      ],
    };
  }

  // 2. Jasa Tugas / Kuliah / Sekolah / Makalah / Essay / PPT
  if (
    lower.includes('tugas') ||
    lower.includes('joki') ||
    lower.includes('makalah') ||
    lower.includes('essay') ||
    lower.includes('esai') ||
    lower.includes('ppt') ||
    lower.includes('presentasi') ||
    lower.includes('resume') ||
    lower.includes('artikel')
  ) {
    return {
      text: `📚 **Bantuan Tugas Kuliah & Sekolah DataIn:**
Kami siap membantu pengerjaan berbagai kebutuhan tugas akademik:
• Makalah, essay, resume materi, & review jurnal.
• Pembuatan slide presentasi PPT interaktif.
• Pengerjaan dilakukan oleh tim lulusan S1-S3 sesuai bidang studi Anda.
• Bebas plagiasi & garansi revisi gratis hingga tuntas!

Kapan deadline tugasmu? Kamu bisa kirimkan detail instruksinya ke admin kami.`,
      suggestedActions: [
        { label: '💬 Kirim Tugas ke Admin WA', action: 'whatsapp' },
        { label: 'Apakah identitas saya aman?', action: 'prompt', value: 'Apakah kerahasiaan identitas saya dijamin aman?' },
      ],
    };
  }

  // 3. Responden Kuesioner / Survei
  if (
    fullContext.includes('responden') ||
    fullContext.includes('kuesioner') ||
    fullContext.includes('angket') ||
    fullContext.includes('survei') ||
    fullContext.includes('survey') ||
    fullContext.includes('format') ||
    fullContext.includes('template')
  ) {
    // If user specifically asked for empty format
    if (lower.includes('format') || lower.includes('template')) {
      return {
        text: `Sip Kak! Ini format resmi pemesanan joki responden di DataIn:

\`\`\`
FORMAT ORDER JOKI RESPONDEN

Asal kampus:
Keperluan: (Skripsi/Tugas/Penelitian)
Jumlah responden:
Kriteria responden:
Tipe soal: (Pilihan Ganda/Essay/Pilgan + Essay)
Link kuesioner:
Deadline:
Catatan tambahan:
\`\`\`

⚠️ **Wajib diisi dengan detail dan jelaskan seluruh request agar tidak terjadi miskomunikasi.**
📌 **Revisi 1×24 jam hanya untuk hasil yang tidak sesuai request/format awal.**
Setelah data dikirim ke WhatsApp Admin (0822-2744-5735), kami akan cek kebutuhan responden dan memberikan estimasi harga + waktu pengerjaan. 🙏🏽😇`,
        suggestedActions: [
          { label: '💬 Kirim Format via WA', action: 'whatsapp' },
        ],
      };
    }

    const hasLink = /(https?:\/\/[^\s]+|forms\.gle|docs\.google|typeform)/i.test(fullContext);
    const hasDeadline = /deadline|lusa|besok|hari|minggu|tgl|tanggal/i.test(fullContext) && (/\d+/.test(lower) || lower.includes('lusa') || lower.includes('besok') || lower.includes('hari') || lower.includes('minggu'));
    const hasCriteria = /mahasiswa|umum|usia|domisili|jakarta|aktif|pelajar|kriteria/i.test(fullContext);

    // Step 3: Link/deadline provided -> Final Handover with prefilled WA link!
    if (hasLink || (hasDeadline && hasCriteria)) {
      const matchQty = fullContext.match(/(\d+)\s*responden/) || fullContext.match(/\b(\d{2,4})\b/);
      const qtyStr = matchQty ? `${matchQty[1]} responden` : '100 responden';
      const linkMatch = fullContext.match(/(https?:\/\/[^\s]+|forms\.gle\/[^\s]+)/i);
      const linkStr = linkMatch ? linkMatch[0] : '-';

      const waText = `Halo Admin DataIn! Saya ingin memesan dari hasil konsultasi chat bot:

FORMAT ORDER JOKI RESPONDEN

Asal kampus: -
Keperluan: Skripsi / Penelitian
Jumlah responden: ${qtyStr}
Kriteria responden: Sesuai hasil konsultasi bot
Tipe soal: -
Link kuesioner: ${linkStr}
Deadline: Segera / Sesuai kesepakatan
Catatan tambahan: -

⚠️ Wajib diisi dengan detail dan jelaskan seluruh request agar tidak terjadi miskomunikasi.
📌 Revisi 1x24 jam hanya untuk hasil yang tidak sesuai request/format awal. Revisi di luar format atau perubahan request akan dikenakan biaya tambahan.

Setelah data dikirim, kami akan cek kebutuhan responden dan memberikan estimasi harga + waktu pengerjaan. 🙏🏽😇`;

      const encodedWaUrl = `https://wa.me/6282227445735?text=${encodeURIComponent(waText)}`;

      return {
        text: `Oke siap Kak! Semua infonya sudah Ina rangkum rapi yaa:
- **Jumlah Responden:** ${qtyStr}
- **Kriteria:** Sudah dicatat
- **Link Kuesioner:** ${linkStr}

Kakak tinggal klik link di bawah ini ya untuk lanjut ke WhatsApp admin DataIn. Format pesan di atas sudah otomatis terisi di chat WhatsApp, jadi Kakak tinggal tekan kirim:

[👉 Lanjut Pesan via WhatsApp Admin](${encodedWaUrl})

Setelah dikirim, tim admin kami akan langsung cek kuesionernya dan memberikan estimasi harga terbaik ya Kak! 🙏🏽😇`,
        suggestedActions: [
          { label: '📲 Lanjut ke WA (Data Sudah Terisi)', action: 'whatsapp', url: encodedWaUrl },
          { label: '💬 Chat Admin WhatsApp', action: 'whatsapp' },
        ],
      };
    }

    // Step 2: Criteria provided, ask for link & deadline!
    if (hasCriteria) {
      return {
        text: `Wah siap Kak! Boleh minta link kuesionernya dan info deadline-nya kapan ya Kak, untuk kita cek terlebih dahulu? 😊`,
        suggestedActions: [
          { label: '⚡ Deadline 1-2 Hari', action: 'prompt', value: 'Deadlinenya 1-2 hari lagi kak' },
          { label: '📅 Deadline 3-5 Hari', action: 'prompt', value: 'Deadlinenya 3-5 hari ke depan' },
          { label: '💬 Chat Admin WhatsApp', action: 'whatsapp' },
        ],
      };
    }

    // Step 1: User asks for respondents or states quantity (e.g. "saya butuh 100 responden")
    return {
      text: `Ohh oke siap Kak! Boleh banget. Kira-kira kriteria respondennya seperti apa ya Kak? (Misal: mahasiswa aktif semester/jurusan tertentu, umum, usia tertentu, domisili daerah tertentu, dll.) 😊`,
      suggestedActions: [
        { label: '🎓 Mahasiswa Aktif', action: 'prompt', value: 'Kriterianya mahasiswa aktif' },
        { label: '👥 Umum (Semua Kalangan)', action: 'prompt', value: 'Kriterianya umum semua kalangan' },
        { label: '📍 Domisili Jabodetabek', action: 'prompt', value: 'Kriterianya domisili Jabodetabek' },
        { label: '💬 Chat Admin WhatsApp', action: 'whatsapp' },
      ],
    };
  }

  // 4. Skripsi / Tesis / Bimbingan / Konsultasi
  if (
    lower.includes('skripsi') ||
    lower.includes('tesis') ||
    lower.includes('bimbingan') ||
    lower.includes('konsul') ||
    lower.includes('karya ilmiah') ||
    lower.includes('proposal')
  ) {
    return {
      text: `🎓 **Bimbingan & Konsultasi Skripsi/Tesis DataIn:**
Kamu bisa berdiskusi 1-on-1 dengan tim expert kami untuk:
• Penentuan judul & perumusan masalah.
• Penyusunan Bab 1 sampai Bab 5 secara terstruktur.
• Bimbingan persiapan sidang seminar proposal maupun sidang akhir.
• Fleksibel via chat WhatsApp & meeting online 7 hari seminggu.`,
      suggestedActions: [
        { label: '💬 Jadwalkan Konsultasi di WA', action: 'whatsapp' },
        { label: 'Apakah bisa bantu dari Bab 1?', action: 'prompt', value: 'Bisa bantu asistensi dari Bab 1 atau proposal?' },
      ],
    };
  }

  // 5. Pembuatan Laporan (PKL, KKN, Praktikum)
  if (
    lower.includes('laporan') ||
    lower.includes('pkl') ||
    lower.includes('kkn') ||
    lower.includes('praktikum') ||
    lower.includes('magang')
  ) {
    return {
      text: `📑 **Pembuatan & Perapian Laporan DataIn:**
Kami membantu menyusun dan merapikan laporan PKL, KKN, Magang, maupun Praktikum:
• Format layout sesuai buku pedoman kampus Anda.
• Struktur penulisan rapi, sistematis, dan siap cetak.
• Termasuk lampiran dan dokumentasi.`,
      suggestedActions: [
        { label: '💬 Konsultasikan Laporan ke WA', action: 'whatsapp' },
        { label: 'Layanan apa lagi yang ada?', action: 'prompt', value: 'Apa saja layanan lengkap DataIn?' },
      ],
    };
  }

  // 6. Desain Canva
  if (
    lower.includes('canva') ||
    lower.includes('desain') ||
    lower.includes('design') ||
    lower.includes('poster') ||
    lower.includes('banner')
  ) {
    return {
      text: `🎨 **Jasa Desain Canva DataIn:**
Butuh desain kreatif untuk tugas kuliah, organisasi kampus, atau wirausaha?
• Desain presentasi, infografis, poster, hingga materi promosi.
• Rapi, modern, profesional, dan siap pakai.
• Cukup kirimkan bahan konsep/materi yang kamu miliki!`,
      suggestedActions: [
        { label: '💬 Order Desain via WA', action: 'whatsapp' },
      ],
    };
  }

  // 7. Harga / Biaya / Tarif / Diskon
  if (
    lower.includes('harga') ||
    lower.includes('biaya') ||
    lower.includes('tarif') ||
    lower.includes('berapa') ||
    lower.includes('diskon') ||
    lower.includes('promo')
  ) {
    return {
      text: `💰 **Estimasi Biaya & Transparansi Harga:**
Biaya di DataIn sangat terjangkau bagi pelajar dan mahasiswa! Tarif ditentukan berdasarkan:
1. Jenis layanan (olah data, tugas, responden, atau bimbingan).
2. Tingkat kesulitan materi & deadline waktu.

💡 *Konsultasi dan tanya estimasi harga 100% gratis tanpa komitmen!* Silakan hubungi Admin WhatsApp dengan melampirkan instruksi tugasmu untuk penawaran harga terbaik.`,
      suggestedActions: [
        { label: '💬 Dapatkan Penawaran Harga di WA', action: 'whatsapp' },
        { label: 'Berapa lama estimasi pengerjaannya?', action: 'prompt', value: 'Berapa lama estimasi waktu pengerjaan tugas?' },
      ],
    };
  }

  // 8. Waktu / Durasi / Deadline / Kilat / Cepat
  if (
    lower.includes('lama') ||
    lower.includes('waktu') ||
    lower.includes('deadline') ||
    lower.includes('kilat') ||
    lower.includes('durasi') ||
    lower.includes('express') ||
    lower.includes('cepat')
  ) {
    return {
      text: `⏱️ **Estimasi Waktu Pengerjaan di DataIn:**
Kami sangat fleksibel mengikuti kebutuhan deadline Anda:
• **Layanan Kilat (Express):** Selesai dalam hitungan beberapa jam hingga < 24 jam.
• **Layanan Reguler:** 2 - 5 hari kerja (bisa disesuaikan).
• Kami berkomitmen mengirimkan hasil sebelum batas waktu yang disepakati!`,
      suggestedActions: [
        { label: '💬 Butuh Layanan Kilat? Hubungi WA', action: 'whatsapp' },
      ],
    };
  }

  // 9. Keamanan / Rahasia / Privasi
  if (
    lower.includes('aman') ||
    lower.includes('rahasia') ||
    lower.includes('privasi') ||
    lower.includes('data') ||
    lower.includes('bocor')
  ) {
    return {
      text: `🔒 **Jaminan Kerahasiaan 100% Aman:**
Privasi Anda adalah prioritas utama kami di DataIn:
• Identitas personal, file tugas, dan riwayat konsultasi dijaga ketat.
• Tidak pernah dipublikasikan atau dibagikan ke pihak ketiga manapun.
• Pengerjaan dilakukan secara profesional dan bebas plagiasi.`,
      suggestedActions: [
        { label: '💬 Konsultasi Sekarang via WA', action: 'whatsapp' },
      ],
    };
  }

  // 10. Garansi / Revisi
  if (
    lower.includes('revisi') ||
    lower.includes('garansi') ||
    lower.includes('salah') ||
    lower.includes('kurang')
  ) {
    return {
      text: `🛡️ **Garansi Revisi Gratis:**
DataIn menyediakan **Garansi Revisi Gratis** sampai tugas, laporan, atau hasil olah data Anda sesuai dengan brief/instruksi awal dan disetujui dosen/guru pengampu.`,
      suggestedActions: [
        { label: '💬 Tanya Admin WA', action: 'whatsapp' },
      ],
    };
  }

  // 11. Salam / Sapaan
  if (
    lower.includes('halo') ||
    lower.includes('hai') ||
    lower.includes('hi') ||
    lower.includes('p') ||
    lower.includes('selamat') ||
    lower.includes('assalamu')
  ) {
    return {
      text: `Halo! 👋 Selamat datang di **DataIn**. Saya Ina, asisten virtual DataIn.

Ada yang bisa saya bantu hari ini? Anda bisa menanyakan info seputar:
• **Olah Data Statistik** (SPSS, SmartPLS, AMOS, R)
• **Asistensi Tugas Kuliah / Makalah / PPT**
• **Bimbingan Skripsi & Pembuatan Laporan**
• **Jasa Responden Kuesioner**`,
      suggestedActions: [
        { label: '📊 Olah Data SPSS/PLS', action: 'prompt', value: 'Bisa jelaskan layanan olah data statistik?' },
        { label: '📚 Bantuan Tugas Kuliah', action: 'prompt', value: 'Bisa bantu tugas kuliah apa saja?' },
        { label: '💬 Chat Admin WhatsApp', action: 'whatsapp' },
      ],
    };
  }

  // 12. Default / Fallback Response
  return {
    text: `Terima kasih atas pertanyaannya! 😊

Saya adalah asisten virtual DataIn. Untuk informasi yang lebih spesifik, pengecekan instruksi file tugas, atau perhitungan diskon harga terbaik, Anda dapat langsung berdiskusi dengan tim Admin kami via WhatsApp. Kami merespon cepat kurang dari 15 menit!`,
    suggestedActions: [
      { label: '💬 Tanya Admin DataIn via WA', action: 'whatsapp' },
      { label: 'Lihat Layanan Lengkap', action: 'prompt', value: 'Apa saja layanan lengkap DataIn?' },
      { label: 'Berapa biaya layanannya?', action: 'prompt', value: 'Berapa estimasi biaya layanan di DataIn?' },
    ],
  };
}
