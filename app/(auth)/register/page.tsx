"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { RegisterForm } from "@/components/auth/register-form";
import { EqualizerBars } from "@/components/auth/equalizer-bars";

gsap.registerPlugin(useGSAP);

export default function RegisterPage() {
  const panelRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".panel-item", {
          autoAlpha: 0,
          y: 20,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
        });
      });
      return () => mm.revert();
    },
    { scope: panelRef }
  );

  return (
    <div
      ref={panelRef}
      className="w-full max-w-sm flex flex-col gap-5"
    >
      <div className="panel-item flex flex-col gap-1">
        <span
          className="font-sans text-2xl font-black tracking-[0.2em] uppercase"
          style={{ color: "oklch(0.88 0.05 18)" }}
        >
          DJ<span style={{ color: "oklch(0.52 0.18 25)" }}>Desk</span>
        </span>
        <p
          className="text-xs uppercase tracking-widest"
          style={{ color: "oklch(0.48 0.1 25)" }}
        >
          Crie sua conta
        </p>
      </div>

      <div className="panel-item">
        <EqualizerBars bars={12} maxHeight={24} />
      </div>

      <div className="panel-item">
        <RegisterForm />
      </div>

      <p
        className="panel-item text-center text-xs"
        style={{ color: "oklch(0.48 0.06 25)" }}
      >
        Já tem conta?{" "}
        <Link
          href="/login"
          className="font-medium underline"
          style={{ color: "oklch(0.62 0.14 25)" }}
        >
          Entrar
        </Link>
      </p>
    </div>
  );
}
