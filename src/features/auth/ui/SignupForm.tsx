import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  NumberInput,
  PasswordInput,
  Select,
  Stack,
  TextInput,
} from "@mantine/core";

import {
  signupSchema,
  type SignUpSchemaValues,
} from "@/features/auth/types/schema";
import { useSignUp } from "@/features/auth/hooks/useAuth";

const defaultValues: SignUpSchemaValues = {
  email: "",
  first_name: "",
  last_name: "",
  gender: "other",
  age: undefined,
  password: "",
  confirmPassword: "",
};

export const SignUpForm = () => {
  const mutation = useSignUp();
  const onSubmit: SubmitHandler<SignUpSchemaValues> = (data) => {
    mutation.mutate(data);
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<SignUpSchemaValues>({
    resolver: zodResolver(signupSchema),
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
        <PasswordInput
          label="Confirm password"
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />

        <TextInput
          label="First name"
          {...register("first_name")}
          error={errors.first_name?.message}
        />

        <TextInput
          label="Last name"
          {...register("last_name")}
          error={errors.last_name?.message}
        />

        <Select
          label="Gender"
          data={[
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
            { value: "other", label: "Other" },
          ]}
          defaultValue={defaultValues?.gender ?? "other"}
          onChange={(value) =>
            setValue("gender", value as SignUpSchemaValues["gender"])
          }
          error={errors.gender?.message}
        />

        <NumberInput
          label="Age"
          placeholder="Optional"
          onChange={(value) =>
            setValue("age", typeof value === "number" ? value : undefined)
          }
          error={errors.age?.message}
        />

        <Button type="submit" loading={isSubmitting}>
          Sign up
        </Button>
      </Stack>
    </form>
  );
};
