"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

gsap.registerPlugin(useGSAP);

type Props = {
  size?: number;
  className?: string;
};

export function VinylSvg({ size = 220, className }: Props) {
  const vinylRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(vinylRef.current, {
          rotation: 360,
          duration: 8,
          ease: "none",
          repeat: -1,
          transformOrigin: "50% 50%",
        });
      });
      return () => mm.revert();
    },
    { scope: vinylRef }
  );

  return (
    <svg
      ref={vinylRef}
      width={size}
      height={size}
      viewBox="0 0 220 220"
      fill="none"
      className={`will-animate ${className ?? ""}`}
      aria-hidden="true"
    >
      <circle cx="110" cy="110" r="108" stroke="oklch(0.28 0.1 25)" strokeWidth="1.5" fill="oklch(0.06 0.02 25)" />
      <circle cx="110" cy="110" r="90" stroke="oklch(0.24 0.09 25)" strokeWidth="1" fill="none" />
      <circle cx="110" cy="110" r="75" stroke="oklch(0.22 0.08 25)" strokeWidth="1" fill="none" />
      <circle cx="110" cy="110" r="60" stroke="oklch(0.2 0.07 25)" strokeWidth="1" fill="none" />
      <circle cx="110" cy="110" r="45" stroke="oklch(0.18 0.06 25)" strokeWidth="1" fill="none" />
      <circle cx="110" cy="110" r="32" stroke="oklch(0.16 0.05 25)" strokeWidth="1" fill="oklch(0.08 0.03 25)" />
      <circle cx="110" cy="110" r="18" stroke="oklch(0.32 0.13 25)" strokeWidth="1.5" fill="oklch(0.06 0.02 25)" />
      <circle cx="110" cy="110" r="8" fill="oklch(0.32 0.13 25)" />
      <circle cx="110" cy="110" r="4" fill="oklch(0.06 0.02 25)" />
    </svg>
  );
}
