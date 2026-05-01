"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

gsap.registerPlugin(useGSAP);

type Props = {
  width?: number;
  height?: number;
  className?: string;
};

export function WaveSvg({ width = 300, height = 80, className }: Props) {
  const containerRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(".wave-line", {
          autoAlpha: 0.15,
          duration: 1.8,
          stagger: { each: 0.3, repeat: -1, yoyo: true },
          ease: "sine.inOut",
        });
      });
      return () => mm.revert();
    },
    { scope: containerRef }
  );

  return (
    <svg
      ref={containerRef}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      className={`will-animate-opacity ${className ?? ""}`}
      aria-hidden="true"
    >
      {[0, 10, 20, 30].map((offset, i) => (
        <path
          key={i}
          className="wave-line"
          d={`M0,${height / 2 + offset} C${width / 4},${height / 2 + offset - 20} ${(width * 3) / 4},${height / 2 + offset + 20} ${width},${height / 2 + offset}`}
          stroke="oklch(0.42 0.15 25)"
          strokeWidth="1.5"
          strokeOpacity={0.6 - i * 0.1}
        />
      ))}
    </svg>
  );
}
