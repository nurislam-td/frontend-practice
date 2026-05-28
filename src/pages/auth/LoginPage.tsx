import { LoginForm } from "@/features/auth/ui/LoginForm";
import { Center, Container, Paper, Stack, Title } from "@mantine/core";

export const LoginPage = () => {
  return (
    <Center mih="100vh">
      <Container size={420} w="100%">
        <Paper withBorder shadow="md" p={30} radius="md">
          <Stack>
            <Title ta="center" order={2}>
              Login an account
            </Title>

            <Title c="dimmed" size="sm" ta="center">
              Fill in the form below to get started
            </Title>

            <LoginForm />
          </Stack>
        </Paper>
      </Container>
    </Center>
  );
};
