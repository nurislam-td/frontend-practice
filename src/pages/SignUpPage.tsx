import { Container, Paper, Stack, Title } from "@mantine/core";
import { SignUpForm } from "@/features/auth/ui/SignupForm";

export const SignUpPage = () => {
  return (
    <Container size={420} my={80}>
      <Stack>
        <Title ta={"center"} order={2}>
          Create an account
        </Title>
        <Title c="dimmed" size={"sm"} ta={"center"}>
          Fill in the form below to get started
        </Title>
        <Paper withBorder shadow="md" p={30} radius={"md"}>
          <SignUpForm />
        </Paper>
      </Stack>
    </Container>
  );
};
