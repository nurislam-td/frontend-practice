import { api } from "@/shared/lib/api/http";
import { type SignUp, type JWTPair } from "@/features/auth/use-cases/model";

const prefix = "auth";
export const authApiClient = {
  async signup(dto: SignUp): Promise<JWTPair> {
    return api
      .post<JWTPair>(`${prefix}/signup`, dto)
      .then((response) => response.data);
  },
};
