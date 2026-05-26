import type { RouteObject } from "react-router-dom";
import { AuthLayout } from "../layouts/AuthLayout";
import { routes } from "@/shared/services/router";
import { LoginPage } from "@/pages/LoginPage";
import { SignUpPage } from "@/pages/SignUpPage";

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
