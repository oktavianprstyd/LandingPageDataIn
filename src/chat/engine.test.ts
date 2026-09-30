// src/chat/engine.test.ts
import { describe, it, expect } from 'vitest';
import { resolveReply } from './engine';
import { ORDER_AWAL, type LayananId, type OrderState } from './orderFlow';
import { CHAT_INTENTS } from './knowledge';

function kirim(pesan: string, state: OrderState = ORDER_AWAL) {
  return resolveReply(pesan, state);
}

describe('Engine chatbot DataIn (tanpa AI)', () => {
  describe('Lapis 1: jawaban topik resmi', () => {
    it('menjelaskan layanan responden, bukan cuma menyuruh chat admin', () => {
      const r = kirim('apakah ada jasa pengisian kuesioner responden?');
      expect(r.text.toLowerCase()).toContain('responden');
      expect(r.text.toLowerCase()).toContain('manusia asli');
      expect(r.suggestedActions.length).toBeGreaterThan(0);
    });

    it('menjelaskan layanan olah data lengkap dengan software dan outputnya', () => {
      const r = kirim('Bisa jelaskan layanan olah data statistik dengan SmartPLS dan SPSS?');
      expect(r.intentId).toBe('olah-data');
      expect(r.text).toContain('SPSS');
      expect(r.text).toContain('Interpretasi narasi Bab 4');
      expect(r.text).toContain('Garansi revisi gratis');
    });

    it('menjelaskan bantuan tugas, bimbingan skripsi, laporan, dan desain canva', () => {
      expect(kirim('bisa bantu pembuatan makalah dan essay kuliah?').intentId).toBe('tugas');
      expect(kirim('mau konsultasi bimbingan skripsi bab 1').intentId).toBe('skripsi');
      expect(kirim('bisa bantu laporan pkl dan kkn?').intentId).toBe('laporan');
      expect(kirim('apa saja layanan desain canva yang tersedia?').intentId).toBe('canva');
    });

    it('menjawab kebijakan biaya tanpa mengarang nominal rupiah', () => {
      const r = kirim('Berapa biaya olah data SPSS?');
      expect(r.intentId).toBe('harga');
      expect(r.text.toLowerCase()).toContain('gratis');
      expect(r.text).not.toMatch(/Rp\s?\d/i);
    });

    it('tidak ada satupun jawaban yang menyebut nominal rupiah pasti', () => {
      for (const intent of CHAT_INTENTS) {
        expect(intent.jawaban).not.toMatch(/Rp\s?\d/i);
      }
    });

    it('setiap intent selalu punya jawaban panjang dan aksi lanjutan', () => {
      for (const intent of CHAT_INTENTS) {
        expect(intent.jawaban.length).toBeGreaterThan(120);
        expect(intent.actions.length).toBeGreaterThan(0);
      }
    });

    it('menjawab kontak resmi dan estimasi waktu pengerjaan', () => {
      expect(kirim('nomor whatsapp admin dong').text).toContain('+62 822-2744-5735');
      const waktu = kirim('berapa lama pengerjaannya?');
      expect(waktu.intentId).toBe('waktu');
      expect(waktu.text).toContain('24 jam');
    });

    it('menjawab sapaan ramah beserta menu topik', () => {
      const r = kirim('halo');
      expect(r.intentId).toBe('salam');
      expect(r.text).toContain('Ina');
      expect(r.suggestedActions.length).toBeGreaterThanOrEqual(5);
    });
  });

  describe('Lapis 2: alur pemesanan responden (tidak pernah looping)', () => {
    it('menanyakan jumlah responden lebih dulu, tanpa membocorkan link WA', () => {
      const r = kirim('saya mau pesan joki responden');
      expect(r.intentId).toBe('order-flow');
      expect(r.text.toLowerCase()).toContain('berapa responden');
      expect(r.text).not.toContain('wa.me');
      expect(r.text).not.toContain('FORMAT ORDER JOKI RESPONDEN');
    });

    it('mengisi 4 slot satu per satu tanpa mengulang pertanyaan yang sama', () => {
      let state: OrderState = ORDER_AWAL;

      const r1 = kirim('saya mau pesan joki responden', state);
      state = r1.orderState;
      expect(r1.text.toLowerCase()).toContain('berapa responden');
      expect(state.jumlah).toBeNull();

      const r2 = kirim('100 responden', state);
      state = r2.orderState;
      expect(state.jumlah).toBe('100 responden');
      expect(r2.text.toLowerCase()).toContain('kriteria');

      const r3 = kirim('mahasiswa aktif di Jakarta', state);
      state = r3.orderState;
      expect(state.kriteria).toBe('mahasiswa aktif di Jakarta');
      expect(r3.text.toLowerCase()).toContain('link');

      const r4 = kirim('https://forms.gle/abc123', state);
      state = r4.orderState;
      expect(state.link).toBe('https://forms.gle/abc123');
      expect(r4.text.toLowerCase()).toContain('deadline');

      const r5 = kirim('deadline lusa ya kak', state);
      state = r5.orderState;
      expect(state.deadline).toBe('lusa');
      expect(r5.text).toContain('https://wa.me/6282227445735?text=');
      expect(r5.suggestedActions.some((a) => a.label.includes('Lanjut ke WA'))).toBe(true);
      expect(r5.suggestedActions.find((a) => a.label.includes('Lanjut ke WA'))?.url).toContain(
        'https://wa.me/6282227445735?text='
      );
    });

    it('menyelesaikan pesanan walau semua data dikirim dalam satu pesan', () => {
      const r = kirim(
        'halo kak, saya butuh 100 responden mahasiswa aktif di Jakarta, linknya https://forms.gle/xyz dan deadline lusa ya'
      );
      expect(r.orderState.jumlah).toBe('100 responden');
      expect(r.orderState.kriteria).toBe('mahasiswa aktif di Jakarta');
      expect(r.orderState.link).toBe('https://forms.gle/xyz');
      expect(r.orderState.deadline).toBe('lusa');
      expect(r.text).toContain('Rincian pesanan');
      expect(r.text).toContain('https://wa.me/6282227445735?text=');
    });

    it('link WhatsApp yang dihasilkan sudah ter-URL-encode rapi', () => {
      const r = kirim('butuh 50 responden umum, forms.gle/abc, deadline 3 hari');
      const url = r.suggestedActions.find((a) => a.action === 'whatsapp' && a.url)?.url ?? '';
      expect(url).toContain('50%20responden');
      expect(url).not.toContain(' ');
      expect(url).not.toContain('%25');
    });

    it('pertanyaan menyela di tengah alur tidak menghapus data yang sudah diisi', () => {
      const stateSementara: OrderState = {
        ...ORDER_AWAL,
        aktif: true,
        layanan: 'responden',
        jumlah: '100 responden',
      };
      const r = kirim('berapa biaya layanannya?', stateSementara);
      expect(r.intentId).toBe('harga');
      expect(r.orderState.jumlah).toBe('100 responden');
      expect(r.suggestedActions.some((a) => a.value === 'lanjut pesanan')).toBe(true);
    });

    it('memberi template kosong hanya kalau user memintanya secara eksplisit', () => {
      const r = kirim('minta format order dong');
      expect(r.intentId).toBe('format-order');
      expect(r.text).toContain('FORMAT ORDER JOKI RESPONDEN');
      expect(r.text).toContain('Link kuesioner:');
    });
  });

  describe('Lapis 2b: alur pemesanan semua layanan DataIn', () => {
    const LAYANAN: Array<{ pemicu: string; id: LayananId; kataTemplate: string }> = [
      { pemicu: 'saya butuh bantuan tugas kuliah', id: 'tugas', kataTemplate: 'FORMAT ORDER' },
      { pemicu: 'tolong olah data skripsi saya pakai spss', id: 'olah-data', kataTemplate: 'FORMAT ORDER' },
      { pemicu: 'saya mau bikin laporan pkl', id: 'laporan', kataTemplate: 'FORMAT ORDER' },
      { pemicu: 'butuh bimbingan skripsi bab 3', id: 'skripsi', kataTemplate: 'BIMBINGAN SKRIPSI' },
      { pemicu: 'saya butuh desain canva untuk poster', id: 'canva', kataTemplate: 'DESAIN CANVA' },
    ];

    it.each(LAYANAN)('mulai alur pesanan untuk layanan $id', ({ pemicu, id }) => {
      const r = kirim(pemicu);
      expect(r.intentId).toBe('order-flow');
      expect(r.orderState.layanan).toBe(id);
      expect(r.orderState.aktif).toBe(true);
      expect(r.text.length).toBeGreaterThan(40);
    });

    it.each(LAYANAN)(
      'layanan $id menanyakan detail, kebutuhan, lalu deadline tanpa looping',
      ({ pemicu, kataTemplate }) => {
        let state: OrderState = ORDER_AWAL;
        const r1 = kirim(pemicu, state);
        state = r1.orderState;
        expect(r1.text.toLowerCase()).toContain('apa');

        const r2 = kirim('topik saya tentang dampak UMKM digital', state);
        state = r2.orderState;
        expect(state.detail).toBe('topik tentang dampak UMKM digital');

        const r3 = kirim('perlu revisi tambahan dan 10 halaman', state);
        state = r3.orderState;
        expect(state.kebutuhan).toBe('perlu revisi tambahan dan 10 halaman');

        const r4 = kirim('deadline 5 hari lagi', state);
        expect(state.deadline).toBeNull();
        expect(r4.orderState.deadline).toBe('5 hari lagi');
        expect(r4.text).toContain('Rincian pesanan');
        const wa = r4.suggestedActions.find((x) => x.action === 'whatsapp' && x.url);
        expect(decodeURIComponent(wa?.url ?? '')).toContain(kataTemplate);
        expect(r4.suggestedActions.some((x) => x.action === 'whatsapp' && x.url)).toBe(true);
      }
    );

    it('mengenali layanan dari variasi kata dan tetap menanyakan detail', () => {
      for (const pemicu of [
        'bantu dong tugas essay saya',
        'tolong dong olah data pake spss',
        'minta tolong bikin laporan magang',
        'butuh bantuan skripsi untuk bab 1',
        'tolong bikin desain canva untuk feed',
      ]) {
        const r = kirim(pemicu);
        expect(r.intentId).toBe('order-flow');
        expect(r.orderState.layanan).not.toBeNull();
      }
    });

    it('menghasilkan pesan WhatsApp ter-encode yang siap kirim', () => {
      let state: OrderState = ORDER_AWAL;
      state = kirim('saya butuh bantuan tugas kuliah', state).orderState;
      state = kirim('makalah tentang manajemen keuangan', state).orderState;
      state = kirim('perlu 10 halaman dan referensi', state).orderState;
      const r = kirim('deadline besok pagi', state);
      const url = r.suggestedActions.find((a) => a.action === 'whatsapp' && a.url)?.url ?? '';
      expect(url).toContain('https://wa.me/6282227445735?text=');
      expect(url).not.toContain(' ');
      expect(r.text).toContain('manajemen keuangan');
      expect(r.text).toContain('10 halaman');
    });
  });

  describe('Tambahan cakupan topik & stem Indonesia', () => {
    it.each([
      ['pembayaran', 'bisa bayar pakai apa saja?'],
      ['pembayaran', 'metode pembayarannya apa'],
      ['tim', 'ada tim ناشi di dataIn?'],
      ['tim', 'siapa yang ngerjain tugas saya'],
      ['profil', 'dataIn ini perusahaan apa?'],
      ['profil', 'sejak kapan dataIn buka?'],
      ['operasional', 'saya urusan, mau tambah peserta lagi?'],
      ['testimoni', 'ada review dari clients?'],
      ['testimoni', 'review dari mereka bagaimana?'],
      ['file', 'file yang dikirim format apa?'],
      ['file', 'hasil akhir ppt-nya file apa'],
      ['ketentuan', 'pembatalannya bagaimana?'],
      ['ketentuan', 'gimana kalau revisi ternyata gagal?'],
    ])('menjawab intent %s untuk pertanyaan berbahasa santai', (intentId, pesan) => {
      const r = kirim(pesan);
      expect(r.intentId).toBe(intentId);
      expect(r.text.length).toBeGreaterThan(80);
    });

    it('tetap aman untuk pertanyaan di luar scope walau memakai kata umum', () => {
      expect(kirim('rekomendasi film bagus dong').intentId).toBe('luar-scope');
      expect(kirim('timnas Indonesia menang').intentId).toBe('luar-scope');
    });
  });

  describe('Lapis 3: penjaga topik di luar scope', () => {
    it('menolak ramah lalu menawarkan menu, tanpa menjawab isi pertanyaannya', () => {
      const r = kirim('bagaimana resep rendang daging sapi yang empuk?');
      expect(r.intentId).toBe('luar-scope');
      expect(r.text).toContain('di luar bidang Ina');
      expect(r.text).not.toContain('rendang');
      expect(r.suggestedActions.length).toBeGreaterThanOrEqual(5);
    });

    it('menolak pertanyaan di luar scope lain dengan pesan yang sama-sama aman', () => {
      for (const pesan of [
        'siapa yang menang sepak bola semalam?',
        'bisa kasih cheat game mobile legends?',
        'bagaimana ramalan zodiak scorpio minggu ini?',
        'rekomendasi film bagus dong',
      ]) {
        const r = kirim(pesan);
        expect(r.intentId).toBe('luar-scope');
        expect(r.text).toContain('di luar bidang Ina');
      }
    });

    it('tidak menebak pertanyaan asing, tapi menampilkan menu topik', () => {
      const r = kirim('bagaimana cara beternak kambing yang menguntungkan?');
      expect(r.intentId).toBe('tidak-dikenal');
      expect(r.text).toContain('belum bisa Ina jawab');
      expect(r.suggestedActions.length).toBeGreaterThanOrEqual(5);
    });

    it('input terlalu pendek diminta diperjelas', () => {
      const r = kirim('apa?');
      expect(r.intentId).toBe('tidak-dikenal');
    });

    it('tetap menolak topik luar scope walau sedang dalam alur pemesanan', () => {
      const stateSementara: OrderState = { ...ORDER_AWAL, aktif: true, jumlah: '100 responden' };
      const r = kirim('resep nasi goreng enak dong', stateSementara);
      expect(r.intentId).toBe('luar-scope');
      expect(r.orderState.jumlah).toBe('100 responden');
    });
  });

  describe('Perilaku deterministik & reset', () => {
    it('memberi jawaban identik untuk input yang sama (tidak berubah-ubah)', () => {
      const a = kirim('apa saja layanan DataIn?');
      const b = kirim('apa saja layanan DataIn?');
      expect(a.text).toBe(b.text);
      expect(a.suggestedActions).toEqual(b.suggestedActions);
    });

    it('reset memulai ulang state pemesanan', () => {
      const stateSementara: OrderState = { ...ORDER_AWAL, aktif: true, jumlah: '100 responden' };
      const r = kirim('reset', stateSementara);
      expect(r.intentId).toBe('ulang');
      expect(r.orderState.jumlah).toBeNull();
      expect(r.orderState.aktif).toBe(false);
    });

    it('setiap balasan selalu punya aksi agar user tidak buntu', () => {
      for (const pesan of [
        'halo',
        'berapa biaya?',
        'saya mau pesan responden',
        'resep rendang',
        'blablabla tidak jelas',
      ]) {
        expect(kirim(pesan).suggestedActions.length).toBeGreaterThan(0);
      }
    });
  });

  describe('Data pesanan tetap bersih (regresi)', () => {
    /** Semua nilai slot yang akan ikut terkirim ke admin lewat WhatsApp. */
    function isianPesanan(state: OrderState): string {
      return [
        state.jumlah,
        state.kriteria,
        state.link,
        state.detail,
        state.kebutuhan,
        state.deadline,
      ]
        .filter((v): v is string => Boolean(v))
        .join(' | ');
    }

    it('chip "Lanjut Isi Pesanan" tidak pernah tersimpan sebagai data', () => {
      let state = kirim('saya butuh 100 responden').orderState;
      const r = kirim('lanjut pesanan', state);
      state = r.orderState;
      expect(state.kriteria).toBeNull();
      expect(isianPesanan(state)).not.toContain('lanjut pesanan');
      expect(r.text.toLowerCase()).toContain('kriteria');
    });

    it.each([
      ['sapaan', 'halo kak'],
      ['persetujuan', 'iya'],
      ['persetujuan singkat', 'ok'],
      ['perintah bot', 'lanjut isi pesanan'],
      ['janji link', 'linknya sudah saya kirim'],
    ])('%s tidak mengotori slot yang sedang ditanyakan', (_label, pesan) => {
      const awal = kirim('saya butuh tugas esai').orderState;
      const r = kirim(pesan, awal);
      expect(isianPesanan(r.orderState)).toBe('');
      expect(r.orderState.layanan).toBe('tugas');
    });

    it('pertanyaan di tengah alur dijawab tanpa menjadi detail pesanan', () => {
      const awal = kirim('saya butuh laporan').orderState;
      const tanya = kirim('berapa lama pengerjaannya?', awal);
      expect(tanya.intentId).toBe('waktu');
      expect(tanya.orderState.detail).toBeNull();

      const jawab = kirim('laporan magang di pt abc', awal);
      expect(jawab.orderState.detail).toBe('laporan magang di pt abc');
    });

    it('pertanyaan yang tidak dikenali pun tidak mengotori slot pesanan', () => {
      const awal = kirim('saya butuh tugas esai').orderState;
      const tanya = kirim('ituNmnya berapa ya kak?', awal);
      expect(tanya.orderState.detail).toBeNull();
      expect(tanya.orderState.layanan).toBe('tugas');
    });

    it('user boleh ganti layanan di tengah percakapan', () => {
      const awal = kirim('saya butuh tugas esai').orderState;
      const ganti = kirim('oh tunggu, saya butuh 100 responden', awal);
      expect(ganti.orderState.layanan).toBe('responden');
      expect(ganti.orderState.jumlah).toBe('100 responden');
      expect(ganti.orderState.detail).toBeNull();
    });

    it('menyebut layanan lain di dalam jawaban tidak mengganti layanan berjalan', () => {
      const awal = kirim('saya butuh olah data spss').orderState;
      const jawab = kirim('data 150 responden, uji regresi dan validitas', awal);
      expect(jawab.orderState.layanan).toBe('olah-data');
      expect(jawab.orderState.detail).toContain('regresi');
    });

    it('deadline tidak mencuri isi slot sebelumnya', () => {
      const awal = kirim('saya butuh tugas esai').orderState;
      const detail = kirim('essay tentang teori pasar targeting', awal).orderState;
      const kebutuhan = kirim('perlu 10 halaman dan sitasi', detail);
      expect(kebutuhan.orderState.kebutuhan).toBe('perlu 10 halaman dan sitasi');
      expect(kebutuhan.orderState.deadline).toBeNull();
    });

    it('teks deadline pada pesan pembuka tidak ikut jadi detail', () => {
      const r = kirim('butuh tugas esai deadline besok');
      expect(r.orderState.deadline).toBe('besok');
      expect(isianPesanan(r.orderState)).not.toContain('deadline besok');
    });

    it('jawaban "nggak ada kebutuhan khusus" tetap dihitung sebagai isi', () => {
      let state = kirim('saya butuh tugas esai').orderState;
      state = kirim('essay tentang teori pasar', state).orderState;
      const r = kirim('nggak ada kebutuhan khusus', state);
      expect(r.orderState.kebutuhan).toBe('Tidak ada kebutuhan khusus');
      expect(r.text.toLowerCase()).toContain('deadline');
    });

    it('pesan WhatsApp tidak pernah memuat kata bawaan percakapan', () => {
      let state = kirim('saya butuh 100 responden mahasiswa jakarta').orderState;
      state = kirim('ok', state).orderState;
      state = kirim('lanjut pesanan', state).orderState;
      state = kirim('https://forms.gle/abc123', state).orderState;
      const r = kirim('deadline besok', state);
      const pesan = decodeURIComponent(
        r.suggestedActions.find((a) => a.action === 'whatsapp' && a.url)?.url ?? ''
      );
      expect(pesan).toContain('100 responden');
      expect(pesan).toContain('mahasiswa jakarta');
      expect(pesan).not.toMatch(/\b(ok|oya|lanjut pesanan)\b/i);
    });
  });
});
