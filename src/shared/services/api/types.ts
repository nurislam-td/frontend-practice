import type { AxiosError } from "axios";

export type ResponseApiError = {
  reason_code?: string;
  message?: string;
};
export type ApiError = {
  statusCode: number;
  reasonCode: string;
  message?: string;
};
export type RequestPromiseHandlers = {
  resolve: (token: string) => void;
  reject: (error: AxiosError) => void;
};
export type JwtResponse = {
  access_token: string;
  refresh_token: string;
};
