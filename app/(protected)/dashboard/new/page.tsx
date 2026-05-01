"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { CreateEventForm } from "@/components/dashboard/create-event-form";

gsap.registerPlugin(useGSAP);

export default function NewEventPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const vinylRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".panel-item", {
          autoAlpha: 0,
          y: 18,
          duration: 0.55,
          stagger: 0.08,
          ease: "power3.out",
        });
        gsap.to(vinylRef.current, {
          rotation: 360,
          duration: 22,
          repeat: -1,
          ease: "none",
          transformOrigin: "center center",
        });
      });
      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef} className="min-h-screen flex bg-background">
      <aside
        className="hidden lg:flex lg:w-[420px] xl:w-[460px] shrink-0 flex-col justify-between p-10"
        style={{
          background: "oklch(0.09 0.028 25)",
          borderRight: "1px solid oklch(0.28 0.09 25 / 0.5)",
        }}
      >
        <div className="panel-item">
          <Link
            href="/dashboard"
            className="text-xs uppercase tracking-widest inline-flex items-center gap-2"
            style={{ color: "oklch(0.5 0.1 25)" }}
          >
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-3.5 h-3.5">
              <path d="M10 3L5 8l5 5" />
            </svg>
            Voltar
          </Link>
        </div>

        <div className="panel-item flex flex-col items-center gap-8">
          <svg
            ref={vinylRef}
            viewBox="0 0 220 220"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-64 h-64 will-animate"
          >
            <circle cx="110" cy="110" r="106" fill="oklch(0.10 0.03 25)" stroke="oklch(0.24 0.09 25)" strokeWidth="1.5" />
            {[90, 80, 70, 60, 50, 40].map((r) => (
              <circle key={r} cx="110" cy="110" r={r} fill="none" stroke="oklch(0.20 0.06 25)" strokeWidth="0.7" />
            ))}
            <circle cx="110" cy="110" r="32" fill="oklch(0.28 0.13 25)" />
            <circle cx="110" cy="110" r="22" fill="oklch(0.22 0.10 25)" />
            <circle cx="110" cy="110" r="6" fill="oklch(0.075 0.022 25)" />
            <circle cx="110" cy="110" r="3" fill="oklch(0.50 0.18 25 / 0.8)" />
          </svg>

          <div className="text-center flex flex-col gap-2">
            <span
              className="font-sans text-3xl font-black tracking-[0.18em] uppercase"
              style={{ color: "oklch(0.88 0.05 18)" }}
            >
              DJ<span style={{ color: "oklch(0.56 0.20 25)" }}>Desk</span>
            </span>
            <p
              className="text-xs uppercase tracking-[0.18em] max-w-[220px] leading-relaxed"
              style={{ color: "oklch(0.48 0.10 25)" }}
            >
              Crie a experiência perfeita para seus clientes
            </p>
          </div>
        </div>

        <div className="panel-item flex justify-center gap-1.5">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="w-0.5 rounded-full"
              style={{
                height: `${8 + Math.sin(i * 0.9) * 10 + Math.random() * 6}px`,
                background: `oklch(${0.28 + i * 0.02} 0.10 25 / 0.6)`,
              }}
            />
          ))}
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto flex flex-col">
        <div className="flex items-center justify-between p-6 lg:hidden panel-item">
          <Link
            href="/dashboard"
            className="text-xs uppercase tracking-widest"
            style={{ color: "oklch(0.5 0.1 25)" }}
          >
            ← Voltar
          </Link>
          <span
            className="font-sans text-lg font-black tracking-[0.18em] uppercase"
            style={{ color: "oklch(0.88 0.05 18)" }}
          >
            DJ<span style={{ color: "oklch(0.56 0.20 25)" }}>Desk</span>
          </span>
        </div>

        <div className="flex-1 flex flex-col justify-center px-8 py-10 lg:px-14 xl:px-20 max-w-2xl w-full mx-auto">
          <div className="panel-item mb-8">
            <h1
              className="text-2xl font-bold tracking-wide"
              style={{ color: "oklch(0.88 0.05 18)" }}
            >
              Novo evento
            </h1>
            <p
              className="text-xs uppercase tracking-widest mt-1"
              style={{ color: "oklch(0.48 0.10 25)" }}
            >
              Preencha os dados para criar o evento
            </p>
          </div>

          <div className="panel-item">
            <CreateEventForm />
          </div>
        </div>
      </main>
    </div>
  );
}

