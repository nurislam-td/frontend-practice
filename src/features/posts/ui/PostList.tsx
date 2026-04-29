import { usePostQueryTs } from "@/features/posts/hooks/usePosts";
import { PostCard } from "@/features/posts/ui/PostCard";

export function PostList() {
  const { posts, isLoading, error } = usePostQueryTs();
  if (isLoading) return <div></div>;
  if (error) return <div>Some error: {error.message}</div>;
  return (
    <>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </>
  );
}
