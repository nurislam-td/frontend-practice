import { useMutation } from "@tanstack/react-query";

import { useAuthDI } from "./useAuthDI";

export const useSignUp = () => {
  const { signUpUseCase } = useAuthDI();
  return useMutation({
    mutationFn: signUpUseCase,
  });
};

export const useLogin = () => {
  const { loginUseCase } = useAuthDI();
  return useMutation({
    mutationFn: loginUseCase,
  });
};
