import axios from "axios";
import { setupInterceptors } from "@/shared/lib/api/interceptors";

export const API_URL = "http://localhost:8000";

const createAPI = () => {
  const api = axios.create({ baseURL: API_URL });
  setupInterceptors(api);
  return api;
};

export const api = createAPI();
