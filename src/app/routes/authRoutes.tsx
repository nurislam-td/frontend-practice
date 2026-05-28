import type { RouteObject } from "react-router-dom";
import { AuthLayout } from "@/app/layouts/AuthLayout";
import { routes } from "@/shared/services/router";
import { LoginPage } from "@/pages/auth/LoginPage";
import { SignUpPage } from "@/pages/auth/SignUpPage";

export const authRoutes: RouteObject = {
  element: <AuthLayout />,
  children: [
    {
      path: routes.login,
      element: <LoginPage />,
    },
    {
      path: routes.signup,
      element: <SignUpPage />,
    },
  ],
};
