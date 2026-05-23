import { useMutation } from "@tanstack/react-query";

import { authApiClient } from "@/features/auth/services/api/authApi";
import { tokenStorage } from "@/features/auth/services/store/jwt";

import type { IAuthAPI } from "@/features/auth/domain/interfaces";
import {
  signUpUseCaseFactory,
  type SignUpUseCase,
} from "@/features/auth/domain/use-cases/signup";
import {
  loginUseCaseFactory,
  type LoginUseCase,
} from "@/features/auth/domain/use-cases/login";

const useAuthApi = (): IAuthAPI => {
  const signupMutation = useMutation({
    mutationFn: authApiClient.signup,
  });
  const loginMutation = useMutation({
    mutationFn: authApiClient.login,
  });
  return {
    signup: signupMutation.mutateAsync,
    login: loginMutation.mutateAsync,
  };
};

export const useSignUp = (): { signupUseCase: SignUpUseCase } => {
  const signupUseCase = signUpUseCaseFactory(tokenStorage, useAuthApi());
  return { signupUseCase };
};

export const useLogin = (): { loginUseCase: LoginUseCase } => {
  const loginUseCase = loginUseCaseFactory(tokenStorage, useAuthApi());
  return { loginUseCase };
};
