export interface PublicEventResponse {
  publicLink: string;
  name: string;
  clientName: string;
  type: string | null;
  eventDate: string | null;
  djArtisticName: string;
}

export type ChatMessageType =
  | "CHUNK"
  | "DONE"
  | "ERROR"
  | "SESSION_STARTED"
  | "BRIEFING_COMPLETE";

export interface ChatStreamMessage {
  type: ChatMessageType;
  sessionId: string;
  content?: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  isStreaming?: boolean;
}

export interface BriefingChatState {
  sessionId: string | null;
  messages: ChatMessage[];
  isConnected: boolean;
  isTyping: boolean;
  isComplete: boolean;
  error: string | null;
}

export interface BriefingResultResponse {
  eventSlug: string;
  summary: string;
  guestProfile: string;
  vibe: string;
  preferredStyles: string[];
  forbiddenStyles: string[];
  requiredSongs: Array<{
    title: string;
    artist: string;
    moment?: string;
    notes?: string;
  }>;
  forbiddenSongs: Array<{
    titleOrArtist: string;
    reason?: string;
  }>;
  moments: Array<{
    name: string;
    vibe?: string;
    styles?: string[];
    observation?: string;
  }>;
  generatedAt: string;
}

