import type { LoginUseCase } from "@/features/auth/domain/use-cases/login";
import type { SignUpUseCase } from "@/features/auth/domain/use-cases/signup";
import { createContext } from "react";

type AuthDIContextType = {
  loginUseCase: LoginUseCase;
  signUpUseCase: SignUpUseCase;
};

export const AuthDIContext = createContext<AuthDIContextType | null>(null);
