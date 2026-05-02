import { cn } from "@/lib/utils";
import type { ChatMessage } from "@/types/briefing";

interface ChatBubbleProps {
  message: ChatMessage;
}

export function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex w-full",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
          isUser
            ? "bg-purple-600 text-white rounded-br-sm"
            : "bg-zinc-800/80 text-zinc-100 border border-zinc-700/50 rounded-bl-sm"
        )}
      >
        {message.content}
        {message.isStreaming && (
          <span className="inline-block w-1.5 h-3.5 bg-purple-400 ml-1 animate-pulse rounded-sm" />
        )}
      </div>
    </div>
  );
}
