import { loginUseCaseFactory } from "@/features/auth/domain/use-cases/login";
import { signUpUseCaseFactory } from "@/features/auth/domain/use-cases/signup";
import { authApiClient } from "@/features/auth/services/api/authApi";
import { useRouter } from "@/shared/services/router";
import { tokenStorage } from "@/shared/services/stores/jwt";
import { useMemo, type ReactNode } from "react";
import { AuthDIContext } from "./authDIContext";

type Props = {
  children: ReactNode;
};

export function AuthDIProvider({ children }: Props) {
  const router = useRouter();
  const dependencies = useMemo(
    () => ({
      loginUseCase: loginUseCaseFactory(tokenStorage, authApiClient, router),
      signUpUseCase: signUpUseCaseFactory(tokenStorage, authApiClient, router),
    }),
    [router],
  );

  return (
    <AuthDIContext.Provider value={dependencies}>
      {children}
    </AuthDIContext.Provider>
  );
}
