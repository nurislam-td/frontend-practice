import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { authRoutes } from "./authRoutes";
import { protectedRoutes } from "./protectedRoutes";
import { rootRedirect } from "./rootRedirect";

const router = createBrowserRouter([authRoutes, protectedRoutes, rootRedirect]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
