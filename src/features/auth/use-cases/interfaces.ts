import { type JWTPair, type SignUp } from "@/features/auth/use-cases/model";
export interface ITokenStorage {
  getAccessToken(): string | null;
  setAccessToken(token: string): void;
  getRefreshToken(): string | null;
  setRefreshToken(token: string): void;

  setPair(tokens: JWTPair): void;
  getPair(): JWTPair;
}

export interface IAuthAPI {
  signup(dto: SignUp): Promise<JWTPair>;
}
