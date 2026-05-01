export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  fullName: string;
  artisticName: string;
  email: string;
  password: string;
};

export type TokenResponse = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
};

export type FieldErrors = Record<string, string[]>;

export type ActionState = {
  success?: boolean;
  message?: string;
  fieldErrors?: FieldErrors;
};
