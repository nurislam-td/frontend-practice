import { PostList } from "@/features/posts/ui/PostList";
import { Container, SimpleGrid } from "@mantine/core";

export function PostPage() {
  return (
    <Container size="lg" py="xl">
      <SimpleGrid
        cols={{ base: 1, sm: 2, md: 1 }}
        // spacing="lg"
      >
        <PostList />
      </SimpleGrid>
    </Container>
  );
}
