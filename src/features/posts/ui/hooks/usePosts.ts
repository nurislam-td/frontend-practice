import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type { Post } from "@/features/posts/domain/model";
import { postApi } from "@/features/posts/services/api/postApi";

const POSTS_QUERY_KEY = ["posts"] as const;

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
    queryFn: () => postApi.getPosts().then((res) => res.data),
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

export const usePostDetail = (postId: number) => {
  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: [...POSTS_QUERY_KEY, postId],
    queryFn: () => postApi.getPost(postId),
  });
  return { post, isLoading, error };
};
