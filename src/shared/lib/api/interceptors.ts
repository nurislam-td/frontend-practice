import type {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import type {
  ApiError,
  JwtResponse,
  RequestPromiseHandlers,
} from "@/shared/lib/api/types";
import axios from "axios";
import { API_URL } from "@/shared/lib/api/http";

function normalizeError(error: AxiosError): ApiError {
  if (error.response && error.response.data) {
    const responseData = {
      ...error.response.data,
      statusCode: error.response.status,
    } as ApiError;
    return responseData;
  }
  return {
    statusCode: 500,
    reasonCode: "UNKNOWN_REASON",
  };
}

function setupResponseInterceptors(api: AxiosInstance) {
  let isRefreshing = false;
  let requestPromiseHandlersQueue: RequestPromiseHandlers[] = [];
  const retryingRequests = new WeakSet<InternalAxiosRequestConfig>();
  const processQueue = (error: AxiosError | null, token: string | null) => {
    requestPromiseHandlersQueue.forEach((handler) => {
      if (error) {
        handler.reject(error);
      } else if (token) {
        handler.resolve(token);
      } else {
        throw Error("Unexpected use processQueue function");
      }
    });
    requestPromiseHandlersQueue = [];
  };

  api.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => {
      return response;
    },

    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig;

      if (
        error.response?.status !== 401 ||
        retryingRequests.has(originalRequest)
      ) {
        return Promise.reject(normalizeError(error));
      }
      retryingRequests.add(originalRequest);

      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          requestPromiseHandlersQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api.request(originalRequest);
          })
          .catch((err: AxiosError) => Promise.reject(normalizeError(err)));
      }

      isRefreshing = true;

      try {
        const refresh_token = localStorage.getItem("refresh_token");
        const { data } = await axios.post<JwtResponse>(`${API_URL}/api/auth`, {
          refresh_token,
        }); // TODO withCredentials : true

        localStorage.setItem("access_token", data.access_token); // TODO use runtime memory (store or etc.)
        localStorage.setItem("refresh_token", data.refresh_token); // TODO use HTTP-ONLY cookies
        originalRequest.headers.Authorization = `Bearer ${data.access_token}`;
        api.request(originalRequest);
        processQueue(null, data.access_token);
      } catch {
        processQueue(error, null);
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        return Promise.reject(normalizeError(error));
      } finally {
        isRefreshing = false;
      }

      return Promise.reject(normalizeError(error));
    },
  );
}

export function setupInterceptors(api: AxiosInstance): void {
  api.interceptors.request.use((config) => {
    const token: string | null = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  setupResponseInterceptors(api);
}
