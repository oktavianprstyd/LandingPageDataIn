// src/components/common/ChatbotWidget.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ChatbotWidget from './ChatbotWidget';

describe('ChatbotWidget', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.open = vi.fn();
    Element.prototype.scrollIntoView = vi.fn();
    Element.prototype.scrollTo = vi.fn();
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        text: '📊 Layanan Olah Data Statistik DataIn: Kami melayani olah data statistik SPSS, SmartPLS, AMOS, dan R.',
        suggestedActions: [{ label: '💬 Tanya Biaya via WA', action: 'whatsapp' }],
      }),
    } as any);
  });

  it('renders launcher button in closed state initially', () => {
    render(<ChatbotWidget />);
    const launcher = screen.getByRole('button', { name: /Buka Chatbot AI DataIn/i });
    expect(launcher).toBeInTheDocument();
    expect(screen.getByText(/Tanya AI DataIn/i)).toBeInTheDocument();
  });

  it('opens chat window when launcher is clicked', async () => {
    render(<ChatbotWidget />);
    const launcher = screen.getByRole('button', { name: /Buka Chatbot AI DataIn/i });
    fireEvent.click(launcher);

    expect(screen.getByRole('dialog', { name: /DataIn AI Assistant Chat Window/i })).toBeInTheDocument();
    expect(screen.getByText(/Ina • DataIn AI/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Saya/i)[0]).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Tanya apa saja seputar tugas/i)).toBeInTheDocument();
  });

  it('can send a message and receive response', async () => {
    const user = userEvent.setup();
    render(<ChatbotWidget />);

    // Open chat
    fireEvent.click(screen.getByRole('button', { name: /Buka Chatbot AI DataIn/i }));

    const input = screen.getByPlaceholderText(/Tanya apa saja seputar tugas/i);
    await user.type(input, 'Berapa biaya olah data spss?');
    
    const sendButton = screen.getByRole('button', { name: /Kirim pesan/i });
    await user.click(sendButton);

    // Verify user message appears
    expect(screen.getByText('Berapa biaya olah data spss?')).toBeInTheDocument();

    // Verify bot response appears after async response
    await waitFor(
      () => {
        expect(screen.getByText(/Layanan Olah Data Statistik DataIn/i)).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  it('can reset chat messages', async () => {
    render(<ChatbotWidget />);
    fireEvent.click(screen.getByRole('button', { name: /Buka Chatbot AI DataIn/i }));

    const resetButton = screen.getByTitle(/Reset Percakapan/i);
    fireEvent.click(resetButton);

    expect(screen.getByText(/Ina • DataIn AI/i)).toBeInTheDocument();
  });

  it('closes chat window when close button is clicked', async () => {
    render(<ChatbotWidget />);
    fireEvent.click(screen.getByRole('button', { name: /Buka Chatbot AI DataIn/i }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    const closeButton = screen.getByTitle(/Tutup Chat/i);
    fireEvent.click(closeButton);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
