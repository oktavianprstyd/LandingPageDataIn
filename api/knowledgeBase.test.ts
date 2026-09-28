// api/knowledgeBase.test.ts
import { describe, it, expect } from 'vitest';
import { retrieveContext, checkDomainRelevance } from './knowledgeBase';

describe('RAG knowledgeBase', () => {
  it('retrieves relevant knowledge chunks for statistics query', () => {
    const { chunks, contextText } = retrieveContext('Bisa bantu olah data statistik dengan SmartPLS dan SPSS?', 2);
    expect(chunks.length).toBeGreaterThan(0);
    expect(chunks.some((c) => c.id === 'kb-olah-data')).toBe(true);
    expect(contextText).toContain('Olah Data Statistik');
  });

  it('retrieves relevant knowledge chunks for college assignments', () => {
    const { chunks, contextText } = retrieveContext('Butuh bantuan pembuatan makalah dan resume materi kuliah', 2);
    expect(chunks.length).toBeGreaterThan(0);
    expect(chunks.some((c) => c.id === 'kb-tugas-kuliah')).toBe(true);
    expect(contextText).toContain('Asistensi Tugas');
  });

  it('retrieves respondent knowledge for questionnaire query', () => {
    const { chunks } = retrieveContext('Apakah ada jasa pengisian kuesioner responden penelitian?', 2);
    expect(chunks.some((c) => c.id === 'kb-responden')).toBe(true);
  });

  it('retrieves official respondent order format when asked for format order', () => {
    const { chunks, contextText } = retrieveContext('Minta format pemesanan joki responden kuesioner', 2);
    expect(chunks.some((c) => c.id === 'kb-format-order-responden')).toBe(true);
    expect(contextText).toContain('FORMAT ORDER JOKI RESPONDEN');
  });

  it('detects off-topic queries correctly', () => {
    expect(checkDomainRelevance('Bagaimana resep membuat rendang daging sapi empuk?').isOffTopic).toBe(true);
    expect(checkDomainRelevance('Siapa yang menang pertandingan sepak bola semalam?').isOffTopic).toBe(true);
    expect(checkDomainRelevance('Bisa kasih cheat game mobile legends?').isOffTopic).toBe(true);
    expect(checkDomainRelevance('Bagaimana ramalan zodiak scorpio minggu ini?').isOffTopic).toBe(true);
  });

  it('keeps academic and DataIn related queries on-topic', () => {
    expect(checkDomainRelevance('Bisa bantu olah data SPSS Bab 4?').isOffTopic).toBe(false);
    expect(checkDomainRelevance('Berapa estimasi biaya asistensi tugas makalah?').isOffTopic).toBe(false);
    expect(checkDomainRelevance('Apakah kerahasiaan identitas saya dijamin aman?').isOffTopic).toBe(false);
    expect(checkDomainRelevance('Bagaimana cara order via WhatsApp?').isOffTopic).toBe(false);
  });
});
