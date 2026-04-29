import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  postSchema,
  type PostSchemaValues,
} from "@/features/posts/types/schema";
import { Button, Stack, TextInput } from "@mantine/core";

export const PostForm = () => {
  const onSubmit: SubmitHandler<PostSchemaValues> = async (
    data: PostSchemaValues,
  ) => {
    repo.createPost(data);
  };

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PostSchemaValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      author: "",
      avatar: "",
      content: "",
      image: "",
      title: "",
    },
    criteriaMode: "all",
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack>
        <TextInput
          label="Title"
          placeholder="Input title"
          {...register("title")}
          error={errors.title?.message}
        />

        <TextInput
          label="Author"
          placeholder="Input author name"
          {...register("author")}
          error={errors.author?.message}
        />
        <TextInput
          label="Content"
          placeholder="Input content"
          {...register("content")}
          error={errors.content?.message}
        />

        <TextInput
          label="Avatar URL"
          placeholder="https://..."
          {...register("avatar")}
          error={errors.avatar?.message}
        />

        <TextInput
          label="Image URL"
          placeholder="https://..."
          {...register("image")}
          error={errors.image?.message}
        />
        <Button type="submit" loading={isSubmitting}>
          Create Post
        </Button>
      </Stack>
    </form>
  );
};
