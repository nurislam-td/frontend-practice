import { useNavigate } from "react-router-dom";
import type { IRouter } from "@/shared/domain/interfaces";
import { useMemo } from "react";

export const routes = {
  posts: "/posts",
  login: "/login",
  signup: "/signup",

  postDetail(postId: number | string) {
    return `/posts/${postId}`;
  },
} as const;

export const useRouter = (): IRouter => {
  const navigate = useNavigate();
  return useMemo(
    () => ({
      navigateToPosts() {
        navigate(routes.posts);
      },
    }),
    [navigate],
  );
};
