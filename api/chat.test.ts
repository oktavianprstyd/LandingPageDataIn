// api/chat.test.ts
import { describe, it, expect } from 'vitest';
import {
  sanitizeWhatsAppLinks,
  generateSuggestedActions,
  generateFallbackReply,
  extractOrderState,
  buildPrefilledWhatsAppUrl,
  type ChatHistoryItem,
} from './chat';

describe('Chat multi-turn conversational funnel & helpers', () => {
  describe('sanitizeWhatsAppLinks', () => {
    it('properly URI encodes markdown WhatsApp links that contain spaces and newlines', () => {
      const rawText = `Oke siap Kak! Ini linknya:
[👉 Lanjut Pesan via WhatsApp Admin](https://wa.me/6282227445735?text=Halo Admin DataIn!
FORMAT ORDER JOKI RESPONDEN
Jumlah responden: 100 responden)
Tinggal klik ya Kak!`;

      const sanitized = sanitizeWhatsAppLinks(rawText);
      expect(sanitized).toContain('https://wa.me/6282227445735?text=Halo%20Admin%20DataIn');
      expect(sanitized).not.toContain('text=Halo Admin DataIn');
      expect(sanitized).toContain('[👉 Lanjut Pesan via WhatsApp Admin](');
    });

    it('leaves text without WhatsApp link untouched', () => {
      const plainText = 'Halo Kak, ada yang bisa Ina bantu hari ini?';
      expect(sanitizeWhatsAppLinks(plainText)).toBe(plainText);
    });
  });

  describe('generateSuggestedActions', () => {
    it('shows criteria chips when AI asks for respondent criteria (Turn 1)', () => {
      const actions = generateSuggestedActions(
        'saya butuh 100 responden',
        'Ohh oke siap Kak! Boleh banget. Kira-kira kriteria respondennya seperti apa ya Kak? 😊'
      );
      const labels = actions.map((a) => a.label);
      expect(labels).toContain('🎓 Mahasiswa Aktif');
      expect(labels).toContain('👥 Umum (Semua Kalangan)');
      expect(labels).toContain('📍 Domisili Jabodetabek');
      // Must NOT prematurely show "Kirim Format via WA"
      expect(labels).not.toContain('💬 Kirim Format via WA');
    });

    it('shows deadline chips when AI asks for link/deadline (Turn 2)', () => {
      const actions = generateSuggestedActions(
        'mahasiswa aktif di Jakarta',
        'Wah siap Kak! Boleh minta link kuesionernya dan info deadline-nya kapan ya Kak? 😊'
      );
      const labels = actions.map((a) => a.label);
      expect(labels).toContain('⚡ Deadline 1-2 Hari');
      expect(labels).toContain('📅 Deadline 3-5 Hari');
    });

    it('shows WhatsApp prefilled handover button when AI provides prefilled link (Turn 3)', () => {
      const reply = `Semua data sudah Ina rangkum:
[👉 Lanjut Pesan via WhatsApp Admin](https://wa.me/6282227445735?text=Halo%20Admin%20DataIn!)`;
      const actions = generateSuggestedActions('ini linknya deadline lusa', reply);
      expect(actions.some((a) => a.label === '📲 Lanjut ke WA (Data Sudah Terisi)')).toBe(true);
      expect(actions[0].url).toContain('https://wa.me/6282227445735?text=');
    });
  });

  describe('3-Step Conversational Order Funnel (Turn-by-turn verification)', () => {
    it('Turn 1: Cust specifies quantity ("saya butuh 100 responden") -> AI asks criteria warmly without dumping template', () => {
      const turn1Response = generateFallbackReply('saya butuh 100 responden', []);
      expect(turn1Response.text.toLowerCase()).toContain('kriteria');
      expect(turn1Response.text).not.toContain('FORMAT ORDER JOKI RESPONDEN');
      expect(turn1Response.text).not.toContain('https://wa.me/');
    });

    it('Turn 2: Cust provides criteria ("mahasiswa aktif di Jakarta") -> AI asks for link and deadline', () => {
      const history: ChatHistoryItem[] = [
        { sender: 'user', text: 'saya butuh 100 responden' },
        { sender: 'assistant', text: 'Ohh oke siap Kak! Boleh banget. Kira-kira kriteria respondennya seperti apa ya Kak? 😊' },
      ];
      const turn2Response = generateFallbackReply('mahasiswa aktif di Jakarta', history);
      expect(turn2Response.text.toLowerCase()).toContain('link');
      expect(turn2Response.text.toLowerCase()).toContain('deadline');
      expect(turn2Response.text).not.toContain('FORMAT ORDER JOKI RESPONDEN');
    });

    it('Turn 3: Cust provides link & deadline -> AI compiles summary and gives prefilled WhatsApp link', () => {
      const history: ChatHistoryItem[] = [
        { sender: 'user', text: 'saya butuh 100 responden' },
        { sender: 'assistant', text: 'Ohh oke siap Kak! Boleh banget. Kira-kira kriteria respondennya seperti apa ya Kak? 😊' },
        { sender: 'user', text: 'mahasiswa aktif di Jakarta' },
        { sender: 'assistant', text: 'Wah siap Kak! Boleh minta link kuesionernya dan info deadline-nya kapan ya Kak? 😊' },
      ];
      const turn3Response = generateFallbackReply('ini linknya https://forms.gle/abc deadline lusa ya kak', history);
      expect(turn3Response.text).toContain('https://wa.me/6282227445735?text=');
      expect(turn3Response.suggestedActions?.some((a) => a.label === '📲 Lanjut ke WA (Data Sudah Terisi)')).toBe(true);
    });

    it('Direct order request: User asks specifically for empty format -> AI provides template', () => {
      const formatResponse = generateFallbackReply('minta format order dong', []);
      expect(formatResponse.text).toContain('FORMAT ORDER JOKI RESPONDEN');
      expect(formatResponse.text).toContain('Link kuesioner:');
    });
  });

  describe('Order State Extraction & Prefilled URL Generator', () => {
    it('accurately extracts order parameters across conversation turns', () => {
      const history: ChatHistoryItem[] = [
        { sender: 'user', text: 'saya butuh 100 responden' },
        { sender: 'assistant', text: 'Ohh oke siap Kak! Kira-kira kriteria respondennya seperti apa ya?' },
        { sender: 'user', text: 'mahasiswa aktif di Jakarta' },
        { sender: 'assistant', text: 'Wah siap Kak! Boleh minta link kuesionernya dan info deadline-nya kapan ya?' },
      ];
      const state = extractOrderState(history, 'ini linknya https://forms.gle/xyz deadline lusa ya');
      expect(state.jumlahResponden).toBe('100 responden');
      expect(state.kriteriaResponden).toBe('mahasiswa aktif di Jakarta');
      expect(state.linkKuesioner).toBe('https://forms.gle/xyz');
      expect(state.deadline).toBe('lusa');
      expect(state.isComplete).toBe(true);

      const waUrl = buildPrefilledWhatsAppUrl(state);
      expect(waUrl).toContain('https://wa.me/6282227445735?text=');
      expect(waUrl).toContain('100%20responden');
      expect(waUrl).toContain('mahasiswa%20aktif%20di%20Jakarta');
      expect(waUrl).toContain('forms.gle%2Fxyz');
    });
  });
});
