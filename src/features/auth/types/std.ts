export type SignUp = {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  gender: "male" | "female" | "other";
  age?: number | null | undefined;
};

export type UserId = {
  user_id: number;
};
