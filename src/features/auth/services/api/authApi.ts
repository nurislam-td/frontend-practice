import { api } from "@/shared/services/api/http";
import {
  type SignUp,
  type JWTPair,
  type Login,
} from "@/features/auth/domain/model";

const prefix = "auth";
export const authApiClient = {
  async signup(dto: SignUp): Promise<JWTPair> {
    return api
      .post<JWTPair>(`${prefix}/signup`, dto)
      .then((response) => response.data);
  },
  async login(dto: Login): Promise<JWTPair> {
    return api
      .post<JWTPair>(`${prefix}/login`, dto)
      .then((response) => response.data);
  },
};
