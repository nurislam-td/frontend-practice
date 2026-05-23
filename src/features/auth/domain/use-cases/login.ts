import type { JWTPair, Login } from "@/features/auth/domain/model";
import type {
  IAuthAPI,
  ITokenStorage,
} from "@/features/auth/domain/interfaces";

export type LoginUseCase = (data: Login) => Promise<JWTPair>;

export const loginUseCaseFactory = (
  storage: ITokenStorage,
  authApi: IAuthAPI,
): LoginUseCase => {
  return async (data: Login) => {
    const jwtPair = await authApi.login(data);
    storage.setPair(jwtPair);
    return jwtPair;
  };
};
