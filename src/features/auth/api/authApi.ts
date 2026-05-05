import { api } from "@/shared/lib/api/http";
import { type UserId, type SignUp } from "@/features/auth/types/std";

const prefix = "auth";
export const authApi = {
  async signup(dto: SignUp): Promise<number> {
    return api
      .post<UserId>(`${prefix}/signup`, dto)
      .then((response) => response.data.user_id);
  },
};
