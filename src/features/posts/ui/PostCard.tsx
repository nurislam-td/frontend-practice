import type { Post } from "@/features/posts/types/std";
import { Card, Group, Text, Image, Avatar } from "@mantine/core";

export function PostCard({ post }: { post: Post }) {
  return (
    <Card shadow="sm" padding={"lg"} radius={"xl"} withBorder>
      <Card.Section>
        <Image height={180} alt={post.title} src={post.image} />
      </Card.Section>

      <Group mt={"md"} mb={"xs"}>
        <Text fw={600}>{post.title}</Text>
      </Group>

      <Text size="sm" c={"dimmed"}>
        {post.content}
      </Text>

      <Group mt={"lg"}>
        <Avatar radius={"xl"} src={post.avatar} />
        <Text size="sm">{post.author}</Text>
      </Group>
    </Card>
  );
}
