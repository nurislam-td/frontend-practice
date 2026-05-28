import { useParams } from "react-router-dom";
import { usePostDetail } from "./hooks/usePosts";
import { Loader, Text, Card, Stack, Group, Avatar } from "@mantine/core";

export const PostDetail = () => {
  const { postId = "-1" } = useParams();

  const { post, isLoading, error } = usePostDetail(Number.parseInt(postId));

  if (isLoading) {
    return <Loader />;
  }

  if (error || !post) {
    return <Text>Post not found</Text>;
  }

  return (
    <Card shadow="sm" padding="xl" radius="xl" withBorder>
      <Stack gap="lg">
        <Text size="xl" fw={700}>
          {post.title}
        </Text>

        <Text>{post.content}</Text>

        <Group>
          <Avatar src={post.author.avatar} radius="xl" />

          <div>
            <Text fw={500}>
              {post.author.first_name} {post.author.last_name}
            </Text>

            <Text size="sm" c="dimmed">
              Author
            </Text>
          </div>
        </Group>
      </Stack>
    </Card>
  );
};
