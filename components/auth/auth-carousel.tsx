"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { VinylSvg } from "./vinyl-svg";
import { WaveSvg } from "./wave-svg";
import { EqualizerBars } from "./equalizer-bars";

gsap.registerPlugin(useGSAP);

const slides = [
  {
    gradient:
      "radial-gradient(ellipse at 65% 35%, oklch(0.22 0.13 25) 0%, oklch(0.10 0.06 25) 45%, oklch(0 0 0) 100%)",
    quote: "O som que define momentos",
    author: "— Sua identidade como DJ",
    Decoration: () => (
      <VinylSvg size={260} className="opacity-60" />
    ),
  },
  {
    gradient:
      "radial-gradient(ellipse at 35% 60%, oklch(0.18 0.09 330) 0%, oklch(0.10 0.05 20) 40%, oklch(0 0 0) 100%)",
    quote: "Cada evento tem sua vibe",
    author: "— Briefing inteligente",
    Decoration: () => (
      <WaveSvg width={320} height={100} className="opacity-70" />
    ),
  },
  {
    gradient:
      "radial-gradient(ellipse at 55% 45%, oklch(0.14 0.06 15) 0%, oklch(0.08 0.04 25) 50%, oklch(0 0 0) 100%)",
    quote: "Controle total da festa",
    author: "— DJDesk Platform",
    Decoration: () => (
      <EqualizerBars bars={16} maxHeight={60} className="opacity-50" />
    ),
  },
];

export function AuthCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const currentIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const { contextSafe } = useGSAP(
    () => {
      gsap.set(slideRefs.current.slice(1), { autoAlpha: 0 });
      gsap.set(slideRefs.current[0], { autoAlpha: 1 });
    },
    { scope: containerRef }
  );

  const goToSlide = contextSafe((next: number) => {
    const prev = currentIndexRef.current;
    if (prev === next) return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap
        .timeline()
        .to(slideRefs.current[prev], {
          autoAlpha: 0,
          scale: 1.04,
          duration: 0.6,
          ease: "power2.in",
        })
        .to(
          slideRefs.current[next],
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.7,
            ease: "power2.out",
          },
          "-=0.2"
        );
    });
    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(slideRefs.current[prev], { autoAlpha: 0 });
      gsap.set(slideRefs.current[next], { autoAlpha: 1 });
    });

    currentIndexRef.current = next;
    setActiveIndex(next);
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const next = (currentIndexRef.current + 1) % slides.length;
      goToSlide(next);
    }, 5000);
    return () => clearInterval(interval);
  }, [goToSlide]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden select-none"
    >
      {slides.map((slide, i) => (
        <div
          key={i}
          ref={(el) => {
            slideRefs.current[i] = el;
          }}
          className="absolute inset-0 flex flex-col items-center justify-center px-12 will-animate-opacity"
          style={{ background: slide.gradient }}
        >
          <div className="flex flex-col items-center gap-8">
            <slide.Decoration />
            <div className="text-center space-y-2 max-w-xs">
              <p
                className="font-serif text-2xl leading-snug"
                style={{ color: "oklch(0.88 0.04 18)" }}
              >
                &ldquo;{slide.quote}&rdquo;
              </p>
              <p
                className="text-sm tracking-widest uppercase"
                style={{ color: "oklch(0.52 0.12 25)" }}
              >
                {slide.author}
              </p>
            </div>
          </div>
        </div>
      ))}

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className="w-2 h-2 rounded-full transition-colors duration-300"
            style={{
              background:
                i === activeIndex
                  ? "oklch(0.52 0.18 25)"
                  : "oklch(0.28 0.06 25)",
            }}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-16">
        <EqualizerBars bars={20} maxHeight={28} className="opacity-30" />
      </div>

      <div className="absolute top-8 left-8 z-10">
        <span
          className="font-sans text-xl font-black tracking-[0.2em] uppercase"
          style={{ color: "oklch(0.88 0.05 18)" }}
        >
          DJ<span style={{ color: "oklch(0.52 0.18 25)" }}>Desk</span>
        </span>
      </div>
    </div>
  );
}
