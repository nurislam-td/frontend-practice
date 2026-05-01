import { CreatePost } from "@/features/posts/ui/CreatePost";
import { PostList } from "@/features/posts/ui/PostList";
import { Container, Group, SimpleGrid, Stack } from "@mantine/core";

export function PostPage() {
  return (
    <Container size="md" py="xl">
      <Stack>
        <Group justify="center">
          <CreatePost />
        </Group>
        <SimpleGrid cols={{ base: 3 }}>
          <PostList />
        </SimpleGrid>
      </Stack>
    </Container>
  );
}
