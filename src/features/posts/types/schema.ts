import { z } from "zod";

export const postSchema = z.object({
  title: z.string().min(3, "Min 3 symbols").max(100, "Max 100 symbol"),
  author: z.string().min(2, "Min 2 symbols"),
  content: z.string().min(10, "Min 10 symbols"),
  avatar: z.url("Incorrect URL avatar"),
  image: z.url("Incorrect URL image"),
});

export type PostSchemaValues = z.infer<typeof postSchema>;
