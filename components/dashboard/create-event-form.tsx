"use client";

import { useRef, useState, useActionState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { createEventAction } from "@/actions/event.actions";
import { FieldError } from "@/components/auth/field-error";
import { SubmitButton } from "@/components/auth/submit-button";
import {
  SUGGESTED_ADDITIONAL_FIELDS,
  SUGGESTED_EVENT_TYPES,
} from "@/types/event";
import type { ActionState } from "@/types/auth";

gsap.registerPlugin(useGSAP);

type CustomField = { id: number; key: string; value: string };

const initialState: ActionState = {};

export function CreateEventForm() {
  const [state, formAction] = useActionState(createEventAction, initialState);
  const [activeChips, setActiveChips] = useState<string[]>([]);
  const [chipValues, setChipValues] = useState<Record<string, string>>({});
  const [customFields, setCustomFields] = useState<CustomField[]>([]);
  const formRef = useRef<HTMLFormElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".form-field", {
          autoAlpha: 0,
          y: 12,
          stagger: 0.06,
          duration: 0.45,
          ease: "power3.out",
        });
      });
      return () => mm.revert();
    },
    { scope: formRef }
  );

  function toggleChip(key: string) {
    setActiveChips((prev) => {
      const isActive = prev.includes(key);
      if (isActive) {
        setChipValues((vals) => {
          const updated = { ...vals };
          delete updated[key];
          return updated;
        });
        return prev.filter((k) => k !== key);
      }
      return [...prev, key];
    });
  }

  function addCustomField() {
    setCustomFields((prev) => [...prev, { id: Date.now(), key: "", value: "" }]);
  }

  function removeCustomField(id: number) {
    setCustomFields((prev) => prev.filter((f) => f.id !== id));
  }

  function updateCustomField(id: number, field: "key" | "value", val: string) {
    setCustomFields((prev) =>
      prev.map((f) => (f.id === id ? { ...f, [field]: val } : f))
    );
  }

  const combinedAdditional = {
    ...chipValues,
    ...Object.fromEntries(
      customFields.filter((f) => f.key.trim()).map((f) => [f.key.trim(), f.value])
    ),
  };

  return (
    <form ref={formRef} action={formAction} className="flex flex-col gap-6">
      {state.message && (
        <p className="text-xs text-center" style={{ color: "oklch(0.65 0.18 25)" }}>
          {state.message}
        </p>
      )}

      <input type="hidden" name="additionalInfo" value={JSON.stringify(combinedAdditional)} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="form-field flex flex-col gap-2">
          <label className="text-xs uppercase tracking-widest font-medium" style={{ color: "oklch(0.62 0.12 25)" }}>
            Nome do evento
          </label>
          <input name="name" className="auth-input" placeholder="Ex: Casamento Silva" />
          <FieldError errors={state.fieldErrors?.name} />
        </div>

        <div className="form-field flex flex-col gap-2">
          <label className="text-xs uppercase tracking-widest font-medium" style={{ color: "oklch(0.62 0.12 25)" }}>
            Nome do cliente
          </label>
          <input name="clientName" className="auth-input" placeholder="Ex: Ana e Lucas" />
          <FieldError errors={state.fieldErrors?.clientName} />
        </div>

        <div className="form-field flex flex-col gap-2">
          <label className="text-xs uppercase tracking-widest font-medium" style={{ color: "oklch(0.62 0.12 25)" }}>
            Tipo de evento
          </label>
          <input
            name="type"
            list="event-type-suggestions"
            className="auth-input"
            placeholder="Ex: Casamento"
          />
          <datalist id="event-type-suggestions">
            {SUGGESTED_EVENT_TYPES.map((t) => (
              <option key={t} value={t} />
            ))}
          </datalist>
        </div>

        <div className="form-field flex flex-col gap-2">
          <label className="text-xs uppercase tracking-widest font-medium" style={{ color: "oklch(0.62 0.12 25)" }}>
            Data do evento
          </label>
          <input name="eventDate" type="date" className="auth-input" />
        </div>
      </div>

      <div className="form-field flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <span className="text-xs uppercase tracking-widest font-medium" style={{ color: "oklch(0.62 0.12 25)" }}>
            Informações adicionais
          </span>
          <div className="flex-1 h-px" style={{ background: "oklch(0.22 0.07 25 / 0.5)" }} />
        </div>

        <div className="flex flex-wrap gap-2">
          {SUGGESTED_ADDITIONAL_FIELDS.map((field) => {
            const active = activeChips.includes(field.key);
            return (
              <button
                key={field.key}
                type="button"
                onClick={() => toggleChip(field.key)}
                className="rounded-full px-3 py-1 text-xs font-medium transition-all duration-200"
                style={{
                  background: active ? "oklch(0.30 0.13 25 / 0.85)" : "oklch(0.13 0.04 25)",
                  color: active ? "oklch(0.85 0.08 18)" : "oklch(0.52 0.09 25)",
                  border: `1px solid ${active ? "oklch(0.45 0.15 25)" : "oklch(0.26 0.08 25)"}`,
                  boxShadow: active ? "0 0 8px oklch(0.45 0.15 25 / 0.3)" : "none",
                }}
              >
                {active ? "✓ " : "+ "}
                {field.label}
              </button>
            );
          })}
        </div>

        {activeChips.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SUGGESTED_ADDITIONAL_FIELDS.filter((f) => activeChips.includes(f.key)).map((field) => (
              <div key={field.key} className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-widest" style={{ color: "oklch(0.52 0.09 25)" }}>
                  {field.label}
                </label>
                <input
                  className="auth-input"
                  placeholder={field.label}
                  value={chipValues[field.key] ?? ""}
                  onChange={(e) =>
                    setChipValues((prev) => ({ ...prev, [field.key]: e.target.value }))
                  }
                />
              </div>
            ))}
          </div>
        )}

        {customFields.length > 0 && (
          <div className="flex flex-col gap-3">
            {customFields.map((field) => (
              <div key={field.id} className="flex gap-2 items-center">
                <input
                  className="auth-input flex-1"
                  placeholder="Campo"
                  value={field.key}
                  onChange={(e) => updateCustomField(field.id, "key", e.target.value)}
                />
                <input
                  className="auth-input flex-[2]"
                  placeholder="Valor"
                  value={field.value}
                  onChange={(e) => updateCustomField(field.id, "value", e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => removeCustomField(field.id)}
                  className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full text-xs transition-colors"
                  style={{
                    background: "oklch(0.13 0.04 25)",
                    color: "oklch(0.52 0.12 25)",
                    border: "1px solid oklch(0.26 0.08 25)",
                  }}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={addCustomField}
          className="self-start text-xs uppercase tracking-widest font-medium flex items-center gap-1.5 transition-colors"
          style={{ color: "oklch(0.52 0.12 25)" }}
        >
          <span
            className="w-5 h-5 flex items-center justify-center rounded-full text-base leading-none"
            style={{ background: "oklch(0.14 0.045 25)", border: "1px solid oklch(0.30 0.10 25)" }}
          >
            +
          </span>
          Adicionar campo personalizado
        </button>
      </div>

      <div className="form-field pt-2">
        <SubmitButton label="Criar evento" pendingLabel="Criando..." />
      </div>
    </form>
  );
}

