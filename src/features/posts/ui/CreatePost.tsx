import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import type { PostFormInputSchemaValues } from "@/features/posts/ui/types/schema";
import { PostForm } from "@/features/posts/ui/components/PostForm";
import { usePostCreate } from "@/features/posts/ui/hooks/usePosts";

export const CreatePost = () => {
  const createMutation = usePostCreate();
  const [opened, { open, close }] = useDisclosure(false);
  const onSubmit = (data: PostFormInputSchemaValues) => {
    createMutation.mutate(data);
    close();
    console.log("Created Post with ", data);
  };
  const defaultValues: PostFormInputSchemaValues = {
    content: "",
    title: "",
    images: [],
  };

  return (
    <>
      <Button onClick={open} w="45%">
        Create Post
      </Button>
      <Modal opened={opened} onClose={close} title="Create Post" size={"65rem"}>
        <PostForm onSubmit={onSubmit} defaultValues={defaultValues} />
      </Modal>
    </>
  );
};
