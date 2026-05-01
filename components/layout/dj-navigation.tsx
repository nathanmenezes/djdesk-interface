"use client";

import { useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

gsap.registerPlugin(useGSAP);

const NAV_ITEMS = [
  {
    href: "/dashboard",
    label: "Eventos",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" stroke="currentColor" className="w-5 h-5">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="3" />
        <path d="M12 3v2M12 19v2M3 12h2M19 12h2" />
      </svg>
    ),
  },
  {
    href: "/dashboard/profile",
    label: "Perfil",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" stroke="currentColor" className="w-5 h-5">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    ),
  },
  {
    href: "/dashboard/settings",
    label: "Config",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" stroke="currentColor" className="w-5 h-5">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.1 7a8 8 0 0 1 .9 2.3l-2.1 1.2a5.9 5.9 0 0 0 0 3L20 14.7A8 8 0 0 1 19.1 17l-2.4-.3a6 6 0 0 1-2.6 1.5l-.7 2.4a8 8 0 0 1-2.8 0l-.7-2.4A6 6 0 0 1 7.3 16.7L4.9 17A8 8 0 0 1 4 14.7l2.1-1.2a5.9 5.9 0 0 0 0-3L4 9.3A8 8 0 0 1 4.9 7l2.4.3a6 6 0 0 1 2.6-1.5l.7-2.4a8 8 0 0 1 2.8 0l.7 2.4A6 6 0 0 1 16.7 7.3z" />
      </svg>
    ),
  },
];

export function DjNavigation() {
  const pathname = usePathname();
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  const activeIndex = NAV_ITEMS.findIndex((item) =>
    pathname === item.href ||
    (item.href !== "/dashboard" && pathname.startsWith(item.href))
  );
  const currentIndex = activeIndex >= 0 ? activeIndex : 0;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(containerRef.current, {
          autoAlpha: 0,
          y: 20,
          duration: 0.6,
          ease: "power3.out",
          delay: 0.3,
        });
      });
      return () => mm.revert();
    },
    { scope: containerRef }
  );

  function handleTabClick(index: number, href: string) {
    const items = containerRef.current?.querySelectorAll(".nav-item");
    if (!items) return;
    const target = items[index] as HTMLElement;
    const indicator = indicatorRef.current;
    if (!indicator || !target) return;

    gsap.to(indicator, {
      x: target.offsetLeft - 8,
      width: target.offsetWidth,
      duration: 0.35,
      ease: "power2.inOut",
    });

    router.push(href);
  }

  return (
    <div
      ref={containerRef}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
      style={{ willChange: "transform, opacity" }}
    >
      <div
        className="relative flex items-center gap-1 rounded-full px-2 py-2"
        style={{
          background: "rgba(0,0,0,0.85)",
          backdropFilter: "blur(16px)",
          border: "1px solid oklch(0.28 0.1 25 / 0.6)",
          boxShadow: "0 0 24px oklch(0.32 0.13 25 / 0.3)",
        }}
      >
        <div
          ref={indicatorRef}
          className="absolute rounded-full pointer-events-none"
          style={{
            height: "calc(100% - 8px)",
            top: "4px",
            left: "8px",
            width: "72px",
            background: "oklch(0.28 0.12 25 / 0.7)",
            boxShadow: "0 0 12px oklch(0.52 0.18 25 / 0.5)",
            transform: `translateX(${currentIndex * 80}px)`,
          }}
        />

        {NAV_ITEMS.map((item, i) => {
          const isActive = i === currentIndex;
          return (
            <button
              key={item.href}
              onClick={() => handleTabClick(i, item.href)}
              className="nav-item relative z-10 flex flex-col items-center gap-0.5 rounded-full px-4 py-2"
              style={{
                color: isActive
                  ? "oklch(0.88 0.06 18)"
                  : "oklch(0.45 0.08 25)",
                minWidth: "72px",
                transition: "color 0.25s ease",
              }}
            >
              {item.icon}
              <span className="text-[10px] font-medium tracking-wider uppercase">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
