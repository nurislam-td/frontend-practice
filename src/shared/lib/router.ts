import { useNavigate, type NavigateFunction } from "react-router-dom";
import type { IRouter } from "../domain/interfaces";

export const routes = {
  posts: "/posts",
};

class ReactRouter implements IRouter {
  private navigate: NavigateFunction;

  constructor(navigate: NavigateFunction) {
    this.navigate = navigate;
  }

  navigateToPosts(): void {
    this.navigate(routes.posts);
  }
}

export const useRouter = (): IRouter => {
  const navigate = useNavigate();
  return new ReactRouter(navigate);
};
