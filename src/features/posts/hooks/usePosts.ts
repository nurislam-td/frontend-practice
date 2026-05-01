import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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

const POSTS_QUERY_KEY = ["posts"];

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
    queryKey: POSTS_QUERY_KEY,
    queryFn: () => postApi.getPosts(),
  });

  return { posts, isLoading, error };
}

export const usePostCreate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postApi.createPost,
    onMutate: (variables) => {
      console.log("Before request sended");
      console.log("Variables", variables);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: POSTS_QUERY_KEY });
      console.log("Successful creation post and posts cache invalidation");
    },
    onError: (error, variables) => {
      console.log("Error while create post", error);
      console.log("Variables: ", variables);
    },
    onSettled: () => {
      console.log("finally block of request ");
    },
  });
};
