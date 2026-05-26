import { useNavigate } from "react-router-dom";
import type { IRouter } from "../domain/interfaces";
import { useMemo } from "react";

export const routes = {
  posts: "/posts",
  login: "/login",
  signup: "/signup",
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
