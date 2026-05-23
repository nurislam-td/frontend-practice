export type SignUp = {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  gender: "male" | "female" | "other";
  age?: number | null | undefined;
};

export type Login = {
  email: string;
  password: string;
};

export type UserId = {
  user_id: number;
};

export type JWTPair = {
  access_token: string;
  refresh_token: string;
};
