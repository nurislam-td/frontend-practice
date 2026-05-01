import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import type { PostSchemaValues } from "@/features/posts/types/schema";
import { PostForm } from "@/features/posts/ui/PostForm";
import { usePostCreate } from "@/features/posts/hooks/usePosts";

export const CreatePost = () => {
  const createMutation = usePostCreate();
  const [opened, { open, close }] = useDisclosure(false);
  const onSubmit = (data: PostSchemaValues) => {
    createMutation.mutate(data);
    close();
    console.log("Created Post with ", data);
  };
  const defaultValues: PostSchemaValues = {
    author: "",
    avatar: "",
    content: "",
    image: "",
    title: "",
  };
  return (
    <>
      <Button onClick={open}>Create Post</Button>
      <Modal opened={opened} onClose={close} title="Create Post">
        <PostForm onSubmit={onSubmit} defaultValues={defaultValues} />
      </Modal>
    </>
  );
};
