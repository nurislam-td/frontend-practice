import type { RouteObject } from "react-router-dom";
import { ProtectedLayout } from "../layouts/ProtectedLayout";
import { routes } from "@/shared/services/router";
import { PostPage } from "@/pages/PostPage";

export const protectedRoutes: RouteObject = {
  element: <ProtectedLayout />,
  children: [
    {
      path: routes.posts,
      element: <PostPage />,
    },
  ],
};
