import type { JWTPair, Login } from "@/features/auth/domain/model";
import type {
  IAuthAPI,
  ITokenStorage,
} from "@/features/auth/domain/interfaces";
import type { IRouter } from "@/shared/domain/interfaces";

export type LoginUseCase = (data: Login) => Promise<JWTPair>;

export const loginUseCaseFactory = (
  storage: ITokenStorage,
  authApi: IAuthAPI,
  router: IRouter,
): LoginUseCase => {
  return async (data: Login) => {
    const jwtPair = await authApi.login(data);
    storage.setPair(jwtPair);
    router.navigateToPosts();
    return jwtPair;
  };
};
