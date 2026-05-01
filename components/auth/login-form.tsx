"use client";

import { useRef } from "react";
import { useActionState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { loginAction } from "@/actions/auth.actions";
import { FieldError } from "./field-error";
import { SubmitButton } from "./submit-button";
import type { ActionState } from "@/types/auth";

gsap.registerPlugin(useGSAP);

const initialState: ActionState = {};

export function LoginForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useActionState(loginAction, initialState);

  useGSAP(
    () => {
      gsap.from(".auth-field", {
        autoAlpha: 0,
        y: 16,
        duration: 0.5,
        stagger: 0.09,
        ease: "power2.out",
      });
    },
    { scope: formRef }
  );

  return (
    <form ref={formRef} action={formAction} className="flex flex-col gap-5">
      {state.message && (
        <p
          className="rounded px-3 py-2 text-sm"
          style={{
            background: "oklch(0.15 0.07 25)",
            border: "1px solid oklch(0.4 0.18 25)",
            color: "oklch(0.8 0.15 25)",
          }}
        >
          {state.message}
        </p>
      )}

      <div className="auth-field flex flex-col gap-1">
        <label
          htmlFor="email"
          className="text-xs font-medium uppercase tracking-widest"
          style={{ color: "oklch(0.6 0.08 25)" }}
        >
          E-mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="auth-input"
        />
        <FieldError errors={state.fieldErrors?.email} />
      </div>

      <div className="auth-field flex flex-col gap-1">
        <label
          htmlFor="password"
          className="text-xs font-medium uppercase tracking-widest"
          style={{ color: "oklch(0.6 0.08 25)" }}
        >
          Senha
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="auth-input"
        />
        <FieldError errors={state.fieldErrors?.password} />
      </div>

      <div className="auth-field">
        <SubmitButton label="Entrar" pendingLabel="Entrando..." />
      </div>
    </form>
  );
}
