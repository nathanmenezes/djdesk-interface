"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { eventService } from "@/services/event.service";
import { ApiHttpError } from "@/lib/http";
import type { ActionState } from "@/types/auth";

const createEventSchema = z.object({
  name: z.string().min(1, { message: "Nome do evento obrigatório" }),
  clientName: z.string().min(1, { message: "Nome do cliente obrigatório" }),
  type: z.string().optional(),
  eventDate: z.string().optional(),
});

export async function createEventAction(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const parsed = createEventSchema.safeParse({
    name: formData.get("name"),
    clientName: formData.get("clientName"),
    type: formData.get("type") || undefined,
    eventDate: formData.get("eventDate") || undefined,
  });

  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors };
  }

  const additionalInfoRaw = formData.get("additionalInfo");
  let additionalInfo: Record<string, string> | undefined;

  if (additionalInfoRaw) {
    try {
      additionalInfo = JSON.parse(additionalInfoRaw as string);
    } catch {
      additionalInfo = undefined;
    }
  }

  try {
    await eventService.create({
      ...parsed.data,
      eventDate: parsed.data.eventDate
        ? new Date(parsed.data.eventDate).toISOString()
        : undefined,
      additionalInfo,
    });
  } catch (err) {
    if (err instanceof ApiHttpError) {
      return { message: err.message };
    }
    return { message: "Erro inesperado. Tente novamente." };
  }

  redirect("/dashboard");
}
