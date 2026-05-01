export class ApiHttpError extends Error {
  constructor(
    public readonly status: number,
    public readonly errorCode: string,
    public readonly messageKey: string,
    message: string
  ) {
    super(message);
    this.name = "ApiHttpError";
  }
}

const baseUrl = process.env.API_URL ?? "http://localhost:8080/api";

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const response = await fetch(`${baseUrl}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new ApiHttpError(
      response.status,
      error.errorCode ?? "ERR-UNKNOWN",
      error.messageKey ?? "error.unknown",
      error.message ?? "Erro inesperado"
    );
  }

  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}
