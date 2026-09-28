// src/types/chat.ts

export interface SuggestedAction {
  label: string;
  action: 'prompt' | 'whatsapp';
  value?: string;
  url?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: Date;
  suggestedActions?: SuggestedAction[];
}
