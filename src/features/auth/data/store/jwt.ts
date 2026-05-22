import { BaseWebStorage } from "@/shared/lib/stores/browser";
import type { JWTPair } from "@/features/auth/use-cases/model";
import type { ITokenStorage } from "@/features/auth/use-cases/interfaces";

class TokenStorage extends BaseWebStorage implements ITokenStorage {
  getAccessToken(): string | null {
    return this.get("access_token");
  }
  setAccessToken(token: string): void {
    this.set("access_token", token);
  }
  getRefreshToken(): string | null {
    return this.get("refresh_token");
  }
  setRefreshToken(token: string): void {
    this.set("refresh_token", token);
  }

  setPair(tokens: JWTPair): void {
    this.set("access_token", tokens.access_token);
    this.set("refresh_token", tokens.refresh_token);
  }

  getPair(): JWTPair {
    return {
      access_token: this.get("access_token") ?? "",
      refresh_token: this.get("refresh_token") ?? "",
    };
  }
}

export const tokenStorage = new TokenStorage();
