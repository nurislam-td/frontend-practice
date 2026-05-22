import {
  useWatch,
  useForm,
  type SubmitHandler,
  Controller,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Image,
  Button,
  FileInput,
  Grid,
  TextInput,
  Text,
  Textarea,
  Group,
} from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";

import {
  postFormInputSchema,
  type PostFormInputSchemaValues,
} from "@/features/posts/types/schema";

type Props = {
  onSubmit: SubmitHandler<PostFormInputSchemaValues>;
  defaultValues: PostFormInputSchemaValues;
};

export const PostForm = ({ onSubmit, defaultValues }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<PostFormInputSchemaValues>({
    resolver: zodResolver(postFormInputSchema),
    defaultValues,
    criteriaMode: "all",
  });
  const images = useWatch({
    control,
    name: "images",
    defaultValue: [],
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid>
        <Grid.Col span={12}>
          <TextInput
            label="Title"
            placeholder="Enter post title"
            error={errors.title?.message}
            {...register("title")}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <Textarea
            label="Content"
            placeholder="Enter post content"
            error={errors.content?.message}
            {...register("content")}
          />
        </Grid.Col>

        <Grid.Col span={12}>
          <Controller
            control={control}
            name="images"
            render={({ field }) => (
              <>
                <Dropzone
                  multiple
                  accept={IMAGE_MIME_TYPE}
                  onDrop={(files) => field.onChange(files)}
                  onReject={(files) => console.log(files)}
                >
                  <Group
                    justify="center"
                    gap="xl"
                    mih={220}
                    style={{ pointerEvents: "none" }}
                  >
                    <div style={{ fontSize: 52 }}>🖼️</div>
                    <div>
                      <Text size="xl">Drag images here or click to upload</Text>
                      <Text size="sm" c="dimmed" mt={4}>
                        Multiple image upload supported
                      </Text>
                    </div>
                  </Group>
                </Dropzone>
                {errors.images?.message && (
                  <Text c="red" size="sm" mt={4}>
                    {errors.images.message}
                  </Text>
                )}
              </>
            )}
          />
        </Grid.Col>
        {images?.length > 0 && (
          <Grid.Col span={12}>
            <Grid>
              {images.map((file, index) => (
                <Grid.Col key={index} span={{ base: 12, sm: 6, md: 4 }}>
                  <Image
                    src={URL.createObjectURL(file)}
                    radius="md"
                    h={140}
                    fit="cover"
                  />
                </Grid.Col>
              ))}
            </Grid>
          </Grid.Col>
        )}
        <Grid.Col span={12}>
          <Group justify="flex-end">
            <Button type="submit" loading={isSubmitting}>
              Submit
            </Button>
          </Group>
        </Grid.Col>
      </Grid>
    </form>
  );
};
