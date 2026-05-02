"use client";

import { useState } from "react";

interface CopyLinkButtonProps {
  url: string;
}

export function CopyLinkButton({ url }: CopyLinkButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200"
      style={{
        background: copied
          ? "oklch(0.28 0.12 25 / 0.8)"
          : "oklch(0.22 0.1 25 / 0.6)",
        color: copied ? "oklch(0.72 0.18 25)" : "oklch(0.62 0.14 25)",
        border: copied
          ? "1px solid oklch(0.42 0.16 25 / 0.8)"
          : "1px solid oklch(0.32 0.12 25 / 0.5)",
      }}
    >
      {copied ? (
        <>
          <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
            <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0z" />
          </svg>
          Copiado!
        </>
      ) : (
        <>
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-3.5 h-3.5">
            <rect x="5" y="5" width="9" height="9" rx="1.5" />
            <path d="M2 10.5V3a1 1 0 0 1 1-1h7.5" />
          </svg>
          Copiar link
        </>
      )}
    </button>
  );
}
