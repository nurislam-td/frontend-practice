import z from "zod";

export const signupSchema = z
  .object({
    email: z.email(),
    password: z
      .string()
      .min(5, "Must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[a-z]/, "Must contain at least one lowercase letter")
      .regex(/\d/, "Must contain at least one number")
      .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),
    first_name: z.string().max(12),
    last_name: z.string().max(12),
    gender: z.enum(["male", "female", "other"]),
    age: z.number().optional(),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignUpSchemaValues = z.infer<typeof signupSchema>;
