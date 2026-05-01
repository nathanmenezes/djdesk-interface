import { apiPost } from "@/lib/http";
import type { LoginRequest, RegisterRequest, TokenResponse } from "@/types/auth";

export const authService = {
  login: (request: LoginRequest) =>
    apiPost<TokenResponse>("/v1/auth/login", request),

  register: (request: RegisterRequest) =>
    apiPost<TokenResponse>("/v1/auth/register", request),

  refresh: (refreshToken: string) =>
    apiPost<TokenResponse>("/v1/auth/refresh", { refreshToken }),

  logout: (refreshToken: string) =>
    apiPost<void>("/v1/auth/logout", { refreshToken }),
};
