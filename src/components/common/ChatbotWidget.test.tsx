// src/components/common/ChatbotWidget.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ChatbotWidget from './ChatbotWidget';

const BUKA = /Buka Chatbot AI DataIn/i;
const INPUT = /Tanya apa saja seputar tugas/i;

describe('ChatbotWidget', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.open = vi.fn();
    Element.prototype.scrollIntoView = vi.fn();
    Element.prototype.scrollTo = vi.fn();
  });

  function buka() {
    render(<ChatbotWidget />);
    fireEvent.click(screen.getByRole('button', { name: BUKA }));
  }

  it('menampilkan tombol launcher saat tertutup', () => {
    render(<ChatbotWidget />);
    expect(screen.getByRole('button', { name: BUKA })).toBeInTheDocument();
    expect(screen.getByText(/Tanya AI DataIn/i)).toBeInTheDocument();
  });

  it('membuka jendela chat beserta sapaan resmi', () => {
    buka();
    expect(screen.getByRole('dialog', { name: /DataIn AI Assistant Chat Window/i })).toBeInTheDocument();
    expect(screen.getByText(/Ina • DataIn AI/i)).toBeInTheDocument();
    expect(screen.getByText(/asisten resmi/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(INPUT)).toBeInTheDocument();
  });

  it('membalas pesan memakai engine lokal tanpa memanggil jaringan', async () => {
    const fetchSpy = vi.fn();
    globalThis.fetch = fetchSpy;

    const user = userEvent.setup();
    buka();

    await user.type(screen.getByPlaceholderText(INPUT), 'berapa biaya olah data spss?');
    await user.click(screen.getByRole('button', { name: /Kirim pesan/i }));

    expect(screen.getByText('berapa biaya olah data spss?')).toBeInTheDocument();

    await waitFor(
      () => {
        expect(screen.getByText(/Kebijakan Biaya/i)).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('menjalankan alur pemesanan responden bertahap', async () => {
    const user = userEvent.setup();
    buka();

    await user.type(screen.getByPlaceholderText(INPUT), 'saya butuh responden kuesioner');
    await user.click(screen.getByRole('button', { name: /Kirim pesan/i }));

    await waitFor(
      () => {
        expect(screen.getAllByText(/berapa responden/i).length).toBeGreaterThan(0);
      },
      { timeout: 3000 }
    );
  });

  it('mereset percakapan', () => {
    buka();
    fireEvent.click(screen.getByTitle(/Reset Percakapan/i));
    expect(screen.getByText(/asisten resmi/i)).toBeInTheDocument();
  });

  it('menutup jendela chat', () => {
    buka();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    fireEvent.click(screen.getByTitle(/Tutup Chat/i));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
