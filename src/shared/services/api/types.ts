import type { AxiosError } from "axios";

export type ApiError = {
  statusCode: number;
  reasonCode: string;
  message?: string | null;
};
export type RequestPromiseHandlers = {
  resolve: (token: string) => void;
  reject: (error: AxiosError) => void;
};
export type JwtResponse = {
  access_token: string;
  refresh_token: string;
};
