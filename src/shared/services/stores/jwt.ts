import { BaseWebStorage } from "@/shared/lib/stores/browser";
import type { JWTPair } from "@/features/auth/domain/model";
import type { ITokenStorage } from "@/features/auth/domain/interfaces";

class TokenStorage extends BaseWebStorage implements ITokenStorage {
  //TODO use Runtime Memory not web localStorage
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

  clear(): void {
    this.remove("access_token");
    this.remove("refresh_token");
  }
}

export const tokenStorage = new TokenStorage();
