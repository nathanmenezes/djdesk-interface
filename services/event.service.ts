import { authenticatedGet, authenticatedPost } from "@/lib/api";
import type { CreateEventPayload, EventResponse } from "@/types/event";

export const eventService = {
  create: (payload: CreateEventPayload) =>
    authenticatedPost<EventResponse>("/v1/events", payload),

  list: () => authenticatedGet<EventResponse[]>("/v1/events"),

  find: (slug: string) => authenticatedGet<EventResponse>(`/v1/events/${slug}`),
};
