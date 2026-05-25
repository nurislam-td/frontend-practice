import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Flex,
  Button,
  PasswordInput,
  Stack,
  TextInput,
  Anchor,
  Text,
  Divider,
} from "@mantine/core";

import {
  loginSchema,
  type LoginSchemaValues,
} from "@/features/auth/ui/types/schema";
import { useLogin } from "@/features/auth/ui/hooks/useAuth";
import { Link } from "react-router-dom";
import { routes } from "@/shared/services/router";

const defaultValues: LoginSchemaValues = {
  email: "",
  password: "",
};

export const LoginForm = () => {
  const { loginUseCase } = useLogin();
  const onSubmit: SubmitHandler<LoginSchemaValues> = async (data) => {
    await loginUseCase(data);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchemaValues>({
    resolver: zodResolver(loginSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack>
        <TextInput
          label="Email"
          placeholder="your@email.com"
          {...register("email")}
          error={errors.email?.message}
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          {...register("password")}
          error={errors.password?.message}
        />
        <Button type="submit" loading={isSubmitting}>
          Login
        </Button>
        <Divider label="or" labelPosition="center" />
        <Text ta="center" size="sm" c="dimmed">
          Don&apos;t have an account?{" "}
          <Anchor component={Link} to={routes.signup}>
            Sign up
          </Anchor>
        </Text>
      </Stack>
    </form>
  );
};
