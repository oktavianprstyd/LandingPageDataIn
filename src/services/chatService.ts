// src/services/chatService.ts
// Chatbot DataIn kini 100% lokal: mesin aturan, tanpa AI, tanpa panggilan jaringan.

import type { SuggestedAction } from '../types/chat';
import { ORDER_AWAL, type OrderState } from '../chat/orderFlow';
import { resolveReply } from '../chat/engine';

export interface ChatSendResult {
  text: string;
  suggestedActions: SuggestedAction[];
  intentId: string;
  orderState: OrderState;
}

/** Jeda kecil agar indikator "sedang mengetik" terasa natural. */
function jedaSingkat(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Menghasilkan balasan chatbot secara instan dari mesin aturan lokal.
 * Tidak ada network request, jadi selalu tersedia dan tidak pernah kena rate limit.
 */
export async function sendChatMessage(
  userMessage: string,
  orderState: OrderState = ORDER_AWAL
): Promise<ChatSendResult> {
  await jedaSingkat(220);
  return resolveReply(userMessage, orderState);
}
