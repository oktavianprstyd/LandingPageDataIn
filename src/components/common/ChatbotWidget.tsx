// src/components/common/ChatbotWidget.tsx
import { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  RotateCcw,
  Bot,
  ExternalLink,
  MessageCircle,
} from 'lucide-react';
import type { ChatMessage, SuggestedAction } from '../../types/chat';
import { sendChatMessage } from '../../services/chatService';
import { ORDER_AWAL, type OrderState } from '../../chat/orderFlow';
import { WA_URL } from '../../data/socialMedia';
import { WA_NUMBER } from '../../data/contact';

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'welcome-1',
    sender: 'assistant',
    text: `Halo! 👋 Saya **Ina**, asisten resmi **DataIn**.

Saya siap menjelaskan semua layanan kami — mulai dari joki responden kuesioner, olah data SPSS/SmartPLS, bantuan tugas, sampai bimbingan skripsi.

Mau mulai dari yang mana Kak? 😊`,
    timestamp: new Date(),
    suggestedActions: [
      { label: '👥 Jasa Responden Kuesioner', action: 'prompt', value: 'Saya butuh responden kuesioner' },
      { label: '📊 Olah Data SPSS/SmartPLS', action: 'prompt', value: 'Bisa jelaskan layanan olah data statistik?' },
      { label: '📚 Bantuan Tugas Kuliah', action: 'prompt', value: 'Bisa bantu tugas kuliah dan makalah apa saja?' },
      { label: '💰 Cek Estimasi Biaya', action: 'prompt', value: 'Berapa estimasi biaya layanan di DataIn?' },
    ],
  },
];

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnreadNotification, setHasUnreadNotification] = useState(true);
  const [orderState, setOrderState] = useState<OrderState>({ ...ORDER_AWAL });

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of messages container
  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior,
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom('smooth');
      setHasUnreadNotification(false);
      // Focus input when opened on non-touch devices
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages.length, isTyping]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend ?? inputText).trim();
    if (!text || isTyping) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    try {
      const response = await sendChatMessage(text, orderState);
      setOrderState(response.orderState);
      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: response.text,
        timestamp: new Date(),
        suggestedActions: response.suggestedActions,
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      const errorMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: 'Maaf Kak, Ina sedang kesulitan memproses pesan itu 🙏 Silakan ulangi sekali lagi, atau langsung chat admin WhatsApp ya.',
        timestamp: new Date(),
        suggestedActions: [{ label: '💬 Hubungi Admin WA', action: 'whatsapp' }],
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleActionClick = (action: SuggestedAction) => {
    if (action.action === 'whatsapp') {
      const targetUrl =
        action.url ||
        (action.value
          ? `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(action.value)}`
          : WA_URL);
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    } else if (action.action === 'prompt' && action.value) {
      handleSendMessage(action.value);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        ...INITIAL_MESSAGES[0],
        id: `welcome-${Date.now()}`,
        timestamp: new Date(),
      },
    ]);
    setOrderState({ ...ORDER_AWAL });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Helper to format text with code blocks, markdown links, bold (**bold**), and linebreaks
  const renderFormattedText = (raw: string) => {
    // Check for markdown code blocks ``` ... ```
    const codeBlockRegex = /```([\s\S]*?)```/g;
    const segments = raw.split(codeBlockRegex);

    return segments.map((segment, segIdx) => {
      // Odd indices are code blocks
      if (segIdx % 2 === 1) {
        return (
          <div
            key={segIdx}
            className="my-2 p-2.5 bg-slate-50 border border-[#D8CFC4] rounded-xl text-[11px] font-mono whitespace-pre-wrap select-all text-slate-800 shadow-inner"
          >
            {segment.trim()}
          </div>
        );
      }

      const lines = segment.split('\n');
      return (
        <span key={segIdx} className="block">
          {lines.map((line, idx) => {
            // Match markdown links [text](url) and bold **bold**
            const tokenRegex = /(\[[^\]]+\]\(https?:\/\/[^\s)]+\)|\*\*.*?\*\*)/g;
            const parts = line.split(tokenRegex);
            return (
              <span key={idx} className="block min-h-[1.15rem]">
                {parts.map((part, pIdx) => {
                  // Check for markdown link [label](url)
                  const linkMatch = part.match(/^\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)$/);
                  if (linkMatch) {
                    const [, rawLabel, url] = linkMatch;
                    const label = rawLabel.replace(/^\*\*|\*\*$/g, '').trim();
                    const isWA = url.includes('wa.me');
                    return (
                      <a
                        key={pIdx}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={
                          isWA
                            ? 'inline-flex items-center gap-1.5 my-1.5 px-3.5 py-2 rounded-full bg-[#128C7E] hover:bg-[#075E54] active:scale-95 text-white font-bold text-xs shadow-md transition-all'
                            : 'text-[#002D80] font-semibold underline hover:opacity-80'
                        }
                      >
                        {isWA && <MessageCircle className="w-3.5 h-3.5 fill-white" />}
                        <span>{label}</span>
                        <ExternalLink className="w-3 h-3 opacity-80" />
                      </a>
                    );
                  }

                  if (part.startsWith('**') && part.endsWith('**')) {
                    return (
                      <strong key={pIdx} className="font-semibold text-[#002D80]">
                        {part.slice(2, -2)}
                      </strong>
                    );
                  }
                  return part;
                })}
              </span>
            );
          })}
        </span>
      );
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-auto font-sans">
      {/* CHAT WINDOW POPUP */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="DataIn AI Assistant Chat Window"
          data-lenis-prevent="true"
          className="mb-3 w-[calc(100vw-32px)] sm:w-[380px] h-[530px] max-h-[82vh] bg-white border border-[#D8CFC4] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300 transition-all"
        >
          {/* Header */}
          <div className="bg-[#002D80] text-white px-4 py-3.5 flex items-center justify-between shadow-md relative z-10">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-white/15 border border-white/25 flex items-center justify-center text-amber-300">
                  <Bot className="w-5 h-5" />
                </div>
                <span
                  aria-label="Online status"
                  className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#002D80]"
                />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-heading font-extrabold text-sm text-white tracking-tight">
                    Ina • DataIn AI
                  </h3>
                  <span className="px-1.5 py-0.2 rounded text-[10px] bg-amber-400/20 text-amber-300 font-semibold uppercase tracking-wider">
                    Beta
                  </span>
                </div>
                <p className="text-[11px] text-blue-200/90 font-medium">
                  Aktif 24/7 • Asisten Akademik
                </p>
              </div>
            </div>

            {/* Header Action Buttons */}
            <div className="flex items-center gap-1">
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                title="Chat Admin WhatsApp"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#128C7E] hover:bg-[#075E54] text-[11px] font-bold text-white transition-all shadow-sm mr-1"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-white" />
                <span className="hidden xs:inline">WA Admin</span>
              </a>

              <button
                type="button"
                onClick={handleResetChat}
                title="Reset Percakapan"
                aria-label="Reset Percakapan"
                className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Tutup Chat"
                aria-label="Tutup Chat"
                className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div
            ref={messagesContainerRef}
            data-lenis-prevent="true"
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-4 space-y-3.5 bg-[#FAF6F0]/60"
          >
            {messages.map((msg) => {
              const isAssistant = msg.sender === 'assistant';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isAssistant ? 'items-start' : 'items-end'}`}
                >
                  <div
                    className={`max-w-[86%] sm:max-w-[82%] px-3.5 py-2.5 rounded-2xl text-xs sm:text-[13px] leading-relaxed shadow-sm transition-all ${
                      isAssistant
                        ? 'bg-white text-slate-800 border border-[#D8CFC4]/70 rounded-tl-sm'
                        : 'bg-[#002D80] text-white rounded-tr-sm'
                    }`}
                  >
                    {renderFormattedText(msg.text)}
                  </div>

                  {/* Render Suggested Action Chips */}
                  {isAssistant && msg.suggestedActions && msg.suggestedActions.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5 max-w-[95%]">
                      {msg.suggestedActions.map((action, idx) => {
                        const isWA = action.action === 'whatsapp';
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleActionClick(action)}
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all border shadow-2xs active:scale-95 text-left ${
                              isWA
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100 hover:border-emerald-400 font-bold'
                                : 'bg-white text-[#002D80] border-[#D8CFC4] hover:border-[#002D80] hover:bg-[#F4F0EA]'
                            }`}
                          >
                            {isWA && <MessageCircle className="w-3 h-3 fill-emerald-600 text-emerald-600" />}
                            <span>{action.label}</span>
                            {isWA && <ExternalLink className="w-3 h-3 opacity-70" />}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Timestamp */}
                  <span className="text-[10px] text-slate-400 mt-1 px-1">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 text-slate-500">
                <div className="bg-white border border-[#D8CFC4]/70 px-3.5 py-2 rounded-2xl rounded-tl-sm flex items-center gap-1.5 shadow-sm">
                  <span className="w-1.5 h-1.5 bg-[#002D80] rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 bg-[#002D80] rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 bg-[#002D80] rounded-full animate-bounce" />
                </div>
                <span className="text-[11px] text-slate-400 italic">Ina sedang mengetik...</span>
              </div>
            )}
          </div>

          {/* Quick Suggestion Pills (Only shown when not typing) */}
          {!isTyping && messages.length <= 2 && (
            <div className="px-3 py-1.5 bg-[#FAF6F0] border-t border-[#D8CFC4]/40 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <span className="text-[10px] font-bold text-slate-500 uppercase shrink-0">
                Topik:
              </span>
              <button
                type="button"
                onClick={() => handleSendMessage('Bisa bantu tugas apa saja?')}
                className="text-[11px] text-slate-700 bg-white border border-[#D8CFC4] rounded-full px-2.5 py-0.5 whitespace-nowrap hover:border-[#002D80] hover:text-[#002D80]"
              >
                📚 Jasa Tugas
              </button>
              <button
                type="button"
                onClick={() => handleSendMessage('Bisa olah data SPSS & SmartPLS?')}
                className="text-[11px] text-slate-700 bg-white border border-[#D8CFC4] rounded-full px-2.5 py-0.5 whitespace-nowrap hover:border-[#002D80] hover:text-[#002D80]"
              >
                📊 Olah Data
              </button>
              <button
                type="button"
                onClick={() => handleSendMessage('Berapa tarif responden kuesioner?')}
                className="text-[11px] text-slate-700 bg-white border border-[#D8CFC4] rounded-full px-2.5 py-0.5 whitespace-nowrap hover:border-[#002D80] hover:text-[#002D80]"
              >
                👥 Responden
              </button>
            </div>
          )}

          {/* Input Form */}
          <div className="p-3 bg-white border-t border-[#D8CFC4]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Tanya apa saja seputar tugas/olah data..."
                disabled={isTyping}
                aria-label="Ketik pesan untuk AI DataIn"
                className="flex-1 bg-[#FAF6F0] border border-[#D8CFC4] rounded-full px-4 py-2 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#002D80] focus:ring-1 focus:ring-[#002D80] transition-colors disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isTyping}
                aria-label="Kirim pesan"
                className="w-9 h-9 rounded-full bg-[#002D80] hover:bg-[#002060] active:scale-95 text-white flex items-center justify-center shrink-0 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md"
              >
                <Send className="w-4 h-4 ml-0.5" />
              </button>
            </form>
            <p className="text-[10px] text-center text-slate-400 mt-1.5">
              DataIn AI Assistant • Jawaban instan 24/7
            </p>
          </div>
        </div>
      )}

      {/* FLOATING LAUNCHER BUTTON */}
      <div className="flex items-center gap-2.5">
        {!isOpen && hasUnreadNotification && (
          <div
            onClick={() => setIsOpen(true)}
            className="cursor-pointer bg-white text-slate-800 border border-[#D8CFC4] shadow-xl rounded-full px-3.5 py-1.5 text-xs font-semibold flex items-center gap-1.5 hover:border-[#002D80] transition-all animate-bounce"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>Tanya AI DataIn</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
        )}

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Tutup Chatbot DataIn' : 'Buka Chatbot AI DataIn'}
          className="relative w-14 h-14 rounded-full bg-[#002D80] hover:bg-[#002060] text-white flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer border-2 border-white group"
        >
          {isOpen ? (
            <X className="w-6 h-6 transition-transform group-hover:rotate-90 duration-200" />
          ) : (
            <>
              <MessageSquare className="w-6 h-6 fill-white/20" />
              <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300 absolute top-2 right-2 animate-pulse" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
