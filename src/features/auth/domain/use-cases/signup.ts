import type { JWTPair, SignUp } from "@/features/auth/domain/model";
import type {
  IAuthAPI,
  ITokenStorage,
} from "@/features/auth/domain/interfaces";

export type SignUpUseCase = (data: SignUp) => Promise<JWTPair>;

export const signUpUseCaseFactory = (
  storage: ITokenStorage,
  authApi: IAuthAPI,
): SignUpUseCase => {
  return async (data: SignUp) => {
    const jwtPair = await authApi.signup(data);
    storage.setPair(jwtPair);
    return jwtPair;
  };
};
