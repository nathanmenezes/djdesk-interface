"use client";

import { useRef } from "react";
import { useFormStatus } from "react-dom";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

gsap.registerPlugin(useGSAP);

type Props = {
  label: string;
  pendingLabel: string;
};

export function SubmitButton({ label, pendingLabel }: Props) {
  const { pending } = useFormStatus();
  const btnRef = useRef<HTMLButtonElement>(null);

  const { contextSafe } = useGSAP({ scope: btnRef });

  const handleMouseEnter = contextSafe(() => {
    if (pending) return;
    gsap.to(btnRef.current, {
      scale: 1.03,
      duration: 0.2,
      ease: "power2.out",
    });
  });

  const handleMouseLeave = contextSafe(() => {
    gsap.to(btnRef.current, {
      scale: 1,
      duration: 0.2,
      ease: "power2.out",
    });
  });

  return (
    <button
      ref={btnRef}
      type="submit"
      disabled={pending}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="auth-btn will-animate"
    >
      {pending ? pendingLabel : label}
    </button>
  );
}
