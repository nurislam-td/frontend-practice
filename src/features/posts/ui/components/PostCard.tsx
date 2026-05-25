import type { Post } from "@/features/posts/domain/model";
import { Card, Group, Text, Avatar } from "@mantine/core";

type PostCardProps = {
  post: Post;
};

export function PostCard({ post }: PostCardProps) {
  return (
    <Card shadow="sm" padding={"lg"} radius={"xl"} withBorder>
      <Group mt={"md"} mb={"xs"}>
        <Text fw={600}>{post.title}</Text>
      </Group>

      <Text size="sm" c={"dimmed"}>
        {post.content.length > 100
          ? `${post.content.substring(0, 100)}...`
          : post.content}
      </Text>

      <Group mt={"lg"}>
        <Avatar radius={"xl"} src={post.author.avatar} />
        <Text size="sm">
          {post.author.first_name + " " + post.author.last_name}
        </Text>
      </Group>
    </Card>
  );
}
