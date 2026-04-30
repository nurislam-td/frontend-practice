import { CreatePost } from "@/features/posts/ui/CreatePost";
import { PostList } from "@/features/posts/ui/PostList";
import { Container, SimpleGrid } from "@mantine/core";

export function PostPage() {
  return (
    <Container size="lg" py="xl">
      <SimpleGrid cols={{ base: 1 }}>
        <CreatePost />
        <PostList />
      </SimpleGrid>
    </Container>
  );
}
