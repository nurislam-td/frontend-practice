import { api } from "@/shared/services/api/http";
import type { CreatePost, Post } from "@/features/posts/domain/model";
import type { Page } from "@/shared/domain/model";

export const postApi = {
  async getPosts(): Promise<Page<Post>> {
    return api
      .get<Page<Post>>("/posts", {
        params: { limit: 100, offset: 0 },
      })
      .then((result) => result.data);
  },

  async createPost(createPost: CreatePost): Promise<{ id: number }> {
    const formData = new FormData();
    const toStrFields = ["title", "content"] as const;
    toStrFields.forEach((field) =>
      formData.append(field, String(createPost[field])),
    );
    createPost.images.forEach((image) => formData.append("images", image));
    return api
      .post<{ id: number }>("/posts", formData)
      .then((result) => result.data);
  },

  async getPost(postId: number | string): Promise<Post> {
    return api.get<Post>(`/posts/${postId}`).then((result) => result.data);
  },
};
