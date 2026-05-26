import { routes } from "@/shared/services/router";
import { Navigate, Outlet } from "react-router-dom";

export function ProtectedLayout() {
  const isAuth = true;
  if (!isAuth) {
    return <Navigate to={routes.login} replace />;
  }
  return <Outlet />;
}
