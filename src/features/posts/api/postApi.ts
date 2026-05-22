import { api } from "@/shared/lib/api/http";
import type { CreatePost, Post } from "@/features/posts/types/std";

export const postApi = {
  async getPosts(): Promise<Post[]> {
    return api.get<Post[]>("/posts", {}).then((result) => result.data);
  },

  async createPost(createPost: CreatePost): Promise<void> {
    const formData = new FormData();
    const toStrFields = ["title", "content"] as const;
    toStrFields.forEach((field) =>
      formData.append(field, String(createPost[field])),
    );
    createPost.images.forEach((image) => formData.append("images", image));
    api.post<void>("/posts", formData);
  },
};
