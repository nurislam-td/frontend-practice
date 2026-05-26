import { routes } from "@/shared/services/router";
import { Navigate, type RouteObject } from "react-router-dom";

export const rootRedirect: RouteObject = {
  path: "/",
  element: <Navigate to={routes.posts} replace />,
};
