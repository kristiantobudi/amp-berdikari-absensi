import { apiClient } from "./interceptor";

export const login = (email: string, password: string) =>
  apiClient.post("/auth/login", { email, password });
