"use client";

import { useParams } from "next/navigation";
import { useBriefingChat } from "@/hooks/use-briefing-chat";
import { ChatMessages } from "@/components/briefing/chat-messages";
import { ChatInput } from "@/components/briefing/chat-input";
import { BriefingComplete } from "@/components/briefing/briefing-complete";
import { Wifi, WifiOff } from "lucide-react";

export default function BriefingChatPage() {
  const params = useParams();
  const token = params.token as string;

  const { messages, isTyping, isConnected, isComplete, error, sendMessage } =
    useBriefingChat(token);

  return (
    <div className="flex flex-col h-screen">
      <header className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-zinc-900/80 backdrop-blur-sm">
        <span className="text-zinc-200 font-medium text-sm">
          Briefing Musical
        </span>
        <span className="flex items-center gap-1.5 text-xs">
          {isConnected ? (
            <>
              <Wifi size={14} className="text-green-400" />
              <span className="text-green-400">Conectado</span>
            </>
          ) : (
            <>
              <WifiOff size={14} className="text-zinc-500" />
              <span className="text-zinc-500">Conectando…</span>
            </>
          )}
        </span>
      </header>

      {error && (
        <div className="px-4 py-2 bg-red-900/30 border-b border-red-700/40 text-red-300 text-xs text-center">
          {error}
        </div>
      )}

      <ChatMessages messages={messages} isTyping={isTyping} />

      {isComplete ? (
        <BriefingComplete djName="seu DJ" />
      ) : (
        <ChatInput onSend={sendMessage} disabled={!isConnected || isTyping} />
      )}
    </div>
  );
}
