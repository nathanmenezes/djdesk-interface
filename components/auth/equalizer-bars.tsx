"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

gsap.registerPlugin(useGSAP);

type Props = {
  bars?: number;
  maxHeight?: number;
  className?: string;
};

export function EqualizerBars({ bars = 10, maxHeight = 40, className }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(".eq-bar", {
          scaleY: (i) => 0.2 + Math.random() * 0.8,
          duration: (i) => 0.3 + Math.random() * 0.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: { each: 0.05, from: "random" },
        });
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".eq-bar", { scaleY: 0.5 });
      });
      return () => mm.revert();
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className={`flex items-end gap-[3px] ${className ?? ""}`}
      aria-hidden="true"
    >
      {Array.from({ length: bars }).map((_, i) => (
        <div
          key={i}
          className="eq-bar will-animate"
          style={{
            width: 4,
            height: maxHeight,
            background: `oklch(${0.35 + (i % 3) * 0.05} 0.15 25)`,
            transformOrigin: "bottom center",
            borderRadius: "2px 2px 0 0",
          }}
        />
      ))}
    </div>
  );
}
