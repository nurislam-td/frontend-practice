import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import type { Post } from "@/features/posts/types/std";
import { postApi } from "@/features/posts/api/postApi";

export function usePost(): {
  posts: Post[];
  isLoading: boolean;
  error: Error | null;
} {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  useEffect(() => {
    postApi
      .getPosts()
      .then(setPosts)
      .catch((e) => setError(e))
      .finally(() => setLoading(false));
  }, []);
  return { posts, isLoading, error };
}

export function usePostQueryTs(): {
  posts: Post[];
  isLoading: boolean;
  error: Error | null;
} {
  const {
    data: posts = [],
    isLoading,
    error,
  } = useQuery<Post[], Error>({
    queryKey: ["posts"],
    queryFn: () => postApi.getPosts(),
  });

  return { posts, isLoading, error };
}

export const usePostCreate = () => {
  pass;
};
