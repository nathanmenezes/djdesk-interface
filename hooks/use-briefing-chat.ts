"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import type {
  BriefingChatState,
  ChatStreamMessage,
} from "@/types/briefing";

const WS_URL =
  process.env.NEXT_PUBLIC_WS_URL ?? "http://localhost:8080/api/ws";

function createId() {
  return Math.random().toString(36).slice(2);
}

export function useBriefingChat(publicToken: string) {
  const clientRef = useRef<Client | null>(null);
  const [state, setState] = useState<BriefingChatState>({
    sessionId: null,
    messages: [],
    isConnected: false,
    isTyping: false,
    isComplete: false,
    error: null,
  });

  const appendChunk = useCallback((token: string) => {
    setState((prev) => {
      const messages = [...prev.messages];
      const last = messages[messages.length - 1];
      if (last?.isStreaming && last.role === "assistant") {
        messages[messages.length - 1] = {
          ...last,
          content: last.content + token,
        };
      } else {
        messages.push({
          id: createId(),
          role: "assistant",
          content: token,
          isStreaming: true,
        });
      }
      return { ...prev, messages, isTyping: false };
    });
  }, []);

  const finalizeStreaming = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isTyping: false,
      messages: prev.messages.map((m) =>
        m.isStreaming ? { ...m, isStreaming: false } : m
      ),
    }));
  }, []);

  const handleFrame = useCallback(
    (frame: ChatStreamMessage) => {
      switch (frame.type) {
        case "CHUNK":
          appendChunk(frame.content ?? "");
          break;
        case "DONE":
          finalizeStreaming();
          break;
        case "BRIEFING_COMPLETE":
          finalizeStreaming();
          setState((prev) => ({ ...prev, isComplete: true }));
          break;
        case "ERROR":
          setState((prev) => ({
            ...prev,
            isTyping: false,
            error: frame.content ?? "Erro desconhecido",
          }));
          break;
      }
    },
    [appendChunk, finalizeStreaming]
  );

  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS(WS_URL),
    });

    client.onConnect = () => {
      setState((prev) => ({ ...prev, isConnected: true }));

      client.subscribe(
        `/topic/briefing/session/${publicToken}`,
        (msg) => {
          try {
            const frame: ChatStreamMessage = JSON.parse(msg.body);
            if (frame.type === "SESSION_STARTED") {
              const sessionId = frame.sessionId;
              setState((prev) => ({ ...prev, sessionId, isTyping: true }));
              client.subscribe(`/topic/briefing/${sessionId}`, (m) => {
                const f: ChatStreamMessage = JSON.parse(m.body);
                handleFrame(f);
              });
            }
          } catch (e) {
            console.error("WS parse error", e);
          }
        }
      );

      client.publish({
        destination: "/app/briefing/start",
        body: JSON.stringify({ publicToken }),
      });
    };

    client.onDisconnect = () => {
      setState((prev) => ({ ...prev, isConnected: false }));
    };

    client.activate();
    clientRef.current = client;

    return () => {
      client.deactivate();
    };
  }, [publicToken, handleFrame]);

  const sendMessage = useCallback(
    (message: string) => {
      const sessionId = state.sessionId;
      if (!clientRef.current || !sessionId) return;

      setState((prev) => ({
        ...prev,
        isTyping: true,
        messages: [
          ...prev.messages,
          { id: createId(), role: "user", content: message },
        ],
      }));

      clientRef.current.publish({
        destination: `/app/briefing/${sessionId}/message`,
        body: JSON.stringify({ message }),
      });
    },
    [state.sessionId]
  );

  return { ...state, sendMessage };
}
