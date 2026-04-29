import { api } from "@/shared/lib/api/http";
import type { CreatePost, Post } from "../types/std";

export const postApi = {
  async getPosts(): Promise<Post[]> {
    return api.get<Post[]>("/posts", {}).then((result) => result.data);
  },

  async createPost(createPost: CreatePost): Promise<void> {
    api.post<void>("/posts", createPost);
  },
};
