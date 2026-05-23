import { LoginForm } from "@/features/auth/ui/LoginForm";
import { Container, Paper, Stack, Title } from "@mantine/core";

export const LoginPage = () => {
  return (
    <Container size={420} my={80}>
      <Stack>
        <Title ta={"center"} order={2}>
          Login an account
        </Title>
        <Title c="dimmed" size={"sm"} ta={"center"}>
          Fill in the form below to get started
        </Title>
        <Paper withBorder shadow="md" p={30} radius={"md"}>
          <LoginForm />
        </Paper>
      </Stack>
    </Container>
  );
};
