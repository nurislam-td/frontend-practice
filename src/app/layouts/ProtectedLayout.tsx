import { routes } from "@/shared/services/router";
import { tokenStorage } from "@/shared/services/stores/jwt";
import { Navigate, Outlet } from "react-router-dom";

export function ProtectedLayout() {
  const accessToken = tokenStorage.getAccessToken();

  if (!accessToken) {
    return <Navigate to={routes.login} replace />;
  }

  return <Outlet />;
}
