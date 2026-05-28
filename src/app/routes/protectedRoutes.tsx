import type { RouteObject } from "react-router-dom";
import { ProtectedLayout } from "@/app/layouts/ProtectedLayout";
import { routes } from "@/shared/services/router";
import { PostPage } from "@/pages/posts/PostPage";
import { PostDetailPage } from "@/pages/posts/PostDetailPage";

export const protectedRoutes: RouteObject = {
  element: <ProtectedLayout />,
  children: [
    {
      path: routes.posts,
      element: <PostPage />,
    },
    {
      path: routes.postDetail(":postId"),
      element: <PostDetailPage />,
    },
  ],
};
