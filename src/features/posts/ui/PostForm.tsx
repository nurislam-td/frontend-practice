import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Stack, TextInput } from "@mantine/core";

import {
  postSchema,
  type PostSchemaValues,
} from "@/features/posts/types/schema";

type Props = {
  onSubmit: SubmitHandler<PostSchemaValues>;
  defaultValues: PostSchemaValues;
};

export const PostForm = ({ onSubmit, defaultValues }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PostSchemaValues>({
    resolver: zodResolver(postSchema),
    defaultValues,
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
          Submit
        </Button>
      </Stack>
    </form>
  );
};
