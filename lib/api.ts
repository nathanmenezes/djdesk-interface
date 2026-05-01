import { getAccessToken } from "@/lib/session";
import { apiGet, apiPost } from "@/lib/http";

export async function authenticatedGet<T>(path: string): Promise<T> {
  const token = await getAccessToken();
  return apiGet<T>(path, token);
}

export async function authenticatedPost<T>(path: string, body: unknown): Promise<T> {
  const token = await getAccessToken();
  return apiPost<T>(path, body, token);
}
