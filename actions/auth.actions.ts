"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { authService } from "@/services/auth.service";
import { clearSession, getRefreshToken, setSession } from "@/lib/session";
import { ApiHttpError } from "@/lib/http";
import type { ActionState } from "@/types/auth";

const loginSchema = z.object({
  email: z.string().email({ message: "E-mail inválido" }),
  password: z.string().min(1, { message: "Senha obrigatória" }),
});

const registerSchema = z.object({
  fullName: z.string().min(2, { message: "Nome completo obrigatório" }),
  artisticName: z.string().min(1, { message: "Nome artístico obrigatório" }),
  email: z.string().email({ message: "E-mail inválido" }),
  password: z
    .string()
    .min(8, { message: "Senha deve ter no mínimo 8 caracteres" }),
});

export async function loginAction(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors };
  }

  try {
    const token = await authService.login(parsed.data);
    await setSession(token.accessToken, token.refreshToken, token.expiresIn);
  } catch (err) {
    if (err instanceof ApiHttpError) {
      return { message: err.message };
    }
    return { message: "Erro inesperado. Tente novamente." };
  }

  redirect("/dashboard");
}

export async function registerAction(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const parsed = registerSchema.safeParse({
    fullName: formData.get("fullName"),
    artisticName: formData.get("artisticName"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors };
  }

  try {
    const token = await authService.register(parsed.data);
    await setSession(token.accessToken, token.refreshToken, token.expiresIn);
  } catch (err) {
    if (err instanceof ApiHttpError) {
      return { message: err.message };
    }
    return { message: "Erro inesperado. Tente novamente." };
  }

  redirect("/dashboard");
}

export async function logoutAction(): Promise<void> {
  const refreshToken = await getRefreshToken();
  if (refreshToken) {
    await authService.logout(refreshToken).catch(() => {});
  }
  await clearSession();
  redirect("/login");
}
