export type Post = {
  id: number;
  title: string;
  author: string;
  content: string;
  avatar: string;
  image: string;
};

export type CreatePost = Omit<Post, "id" | "avatar" | "image">;
export type UpdatePost = Pick<Post, "id"> & Partial<CreatePost>;
