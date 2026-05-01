"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import Link from "next/link";
import { EVENT_STATUS_LABELS, type EventResponse } from "@/types/event";

gsap.registerPlugin(useGSAP);

interface EventCardProps {
  event: EventResponse;
  index: number;
}

export function EventCard({ event, index }: EventCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(cardRef.current, {
          autoAlpha: 0,
          y: 20,
          duration: 0.5,
          delay: index * 0.08,
          ease: "power3.out",
        });
      });
      return () => mm.revert();
    },
    { scope: cardRef }
  );

  const formattedDate = event.eventDate
    ? new Date(event.eventDate).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : null;

  return (
    <div
      ref={cardRef}
      className="group flex flex-col gap-4 rounded-xl p-5"
      style={{
        background: "oklch(0.11 0.032 25)",
        border: "1px solid oklch(0.26 0.09 25 / 0.7)",
        willChange: "transform, opacity",
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-0.5 min-w-0">
          <h3
            className="font-semibold text-sm truncate"
            style={{ color: "oklch(0.88 0.05 18)" }}
          >
            {event.name}
          </h3>
          <p className="text-xs truncate" style={{ color: "oklch(0.52 0.1 25)" }}>
            {event.clientName}
          </p>
        </div>

        <span
          className="shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wide"
          style={{
            background: "oklch(0.22 0.1 25 / 0.6)",
            color: "oklch(0.68 0.14 25)",
            border: "1px solid oklch(0.32 0.12 25 / 0.5)",
          }}
        >
          {EVENT_STATUS_LABELS[event.status] ?? event.status}
        </span>
      </div>

      <div className="flex items-center gap-4 text-xs" style={{ color: "oklch(0.45 0.08 25)" }}>
        {event.type && (
          <span className="flex items-center gap-1">
            <svg viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3">
              <path d="M8 2a6 6 0 1 0 0 12A6 6 0 0 0 8 2zm0 10a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-6a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
            </svg>
            {event.type}
          </span>
        )}
        {formattedDate && (
          <span className="flex items-center gap-1">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-3 h-3">
              <rect x="2" y="3" width="12" height="11" rx="1.5" />
              <path d="M5 1v3M11 1v3M2 7h12" />
            </svg>
            {formattedDate}
          </span>
        )}
      </div>

      <Link
        href={`/dashboard/events/${event.slug}`}
        className="text-xs font-medium tracking-wide uppercase self-start"
        style={{ color: "oklch(0.62 0.14 25)" }}
      >
        Ver detalhes →
      </Link>
    </div>
  );
}
