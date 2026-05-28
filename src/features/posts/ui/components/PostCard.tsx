import type { Post } from "@/features/posts/domain/model";
import { routes } from "@/shared/services/router";
import { Card, Group, Text, Avatar } from "@mantine/core";
import { Link } from "react-router-dom";

type PostCardProps = {
  post: Post;
};

export function PostCard({ post }: PostCardProps) {
  return (
    <Card
      component={Link}
      to={routes.postDetail(post.id)}
      shadow="sm"
      padding={"lg"}
      radius={"xl"}
      withBorder
    >
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
