type Author = {
  first_name: string;
  last_name: string;
  avatar: string;
};

type Image = {
  id: number;
  url: string;
  filename: string;
};

export type Post = {
  id: number;
  title: string;
  author: Author;
  content: string;
  images: Image[];
};

export type CreatePost = Omit<Post, "id" | "author" | "images"> & {
  images: File[];
};

export type UpdatePost = Pick<Post, "id"> & Partial<CreatePost>;
