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

async function apiFetch<T>(
  path: string,
  options: {
    method: string;
    body?: unknown;
    token?: string;
  }
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (options.token) {
    headers["Authorization"] = `Bearer ${options.token}`;
  }

  const response = await fetch(`${baseUrl}${path}`, {
    method: options.method,
    headers,
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
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

export function apiPost<T>(path: string, body: unknown, token?: string): Promise<T> {
  return apiFetch<T>(path, { method: "POST", body, token });
}

export function apiGet<T>(path: string, token?: string): Promise<T> {
  return apiFetch<T>(path, { method: "GET", token });
}
