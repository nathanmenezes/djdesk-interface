import { PublicEventResponse } from "@/types/briefing";
import { apiGet } from "@/lib/http";

export async function getPublicEvent(
  token: string
): Promise<PublicEventResponse> {
  return apiGet<PublicEventResponse>(`/v1/public/events/${token}`);
}
