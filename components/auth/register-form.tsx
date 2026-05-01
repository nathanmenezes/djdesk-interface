"use client";

import { useActionState } from "react";
import { registerAction } from "@/actions/auth.actions";
import { FieldError } from "./field-error";
import { SubmitButton } from "./submit-button";
import type { ActionState } from "@/types/auth";

const initialState: ActionState = {};

export function RegisterForm() {
  const [state, formAction] = useActionState(registerAction, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {state.message && (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
          {state.message}
        </p>
      )}

      <div>
        <label
          htmlFor="fullName"
          className="block text-sm font-medium text-zinc-700"
        >
          Nome completo
        </label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          autoComplete="name"
          required
          className="mt-1 block w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-zinc-500"
        />
        <FieldError errors={state.fieldErrors?.fullName} />
      </div>

      <div>
        <label
          htmlFor="artisticName"
          className="block text-sm font-medium text-zinc-700"
        >
          Nome artístico
        </label>
        <input
          id="artisticName"
          name="artisticName"
          type="text"
          required
          className="mt-1 block w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-zinc-500"
        />
        <FieldError errors={state.fieldErrors?.artisticName} />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-zinc-700"
        >
          E-mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="mt-1 block w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-zinc-500"
        />
        <FieldError errors={state.fieldErrors?.email} />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-zinc-700"
        >
          Senha
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          className="mt-1 block w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-zinc-500"
        />
        <FieldError errors={state.fieldErrors?.password} />
      </div>

      <SubmitButton label="Criar conta" pendingLabel="Criando conta..." />
    </form>
  );
}
