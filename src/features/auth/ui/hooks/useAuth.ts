import { useMutation } from "@tanstack/react-query";
import { authApiClient } from "@/features/auth/data/api/authApi";
import {
  signUpUseCaseFactory,
  type SignUpUseCase,
} from "@/features/auth/use-cases/signup";
import { tokenStorage } from "@/features/auth/data/store/jwt";
import type { IAuthAPI } from "@/features/auth/use-cases/interfaces";

export const useSignUp = (): { signupUseCase: SignUpUseCase } => {
  const mutation = useMutation({
    mutationFn: authApiClient.signup,
  });
  const authApiImpl: IAuthAPI = {
    signup: mutation.mutateAsync,
  };

  const signupUseCase = signUpUseCaseFactory(tokenStorage, authApiImpl);

  return { signupUseCase };
};
