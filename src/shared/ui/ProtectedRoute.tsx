import { Navigate } from "react-router-dom";
import { routes } from "@/shared/services/router";
import { tokenStorage } from "@/shared/services/stores/jwt";

type Props = {
  children: React.ReactNode;
};

export const ProtectedRoute = ({ children }: Props) => {
  const accessToken = tokenStorage.getAccessToken();

  if (!accessToken) {
    return <Navigate to={routes.login} replace />;
  }

  return children;
};
