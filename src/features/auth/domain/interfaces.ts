import {
  type Login,
  type JWTPair,
  type SignUp,
} from "@/features/auth/domain/model";

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
  login(dto: Login): Promise<JWTPair>;
}
