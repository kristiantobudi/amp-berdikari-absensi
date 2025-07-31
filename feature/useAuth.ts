import { apiClient } from "@/api/interceptor";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface LoginInput {
  login: string;
  password: string;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface LoginResponse {
  message: string;
  token: string;
  user: User;
}

export const useLogin = (options?: {
  onSuccess?: (data: LoginResponse) => void;
  onError?: (error: unknown) => void;
  onSettled?: () => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation<LoginResponse, unknown, LoginInput>({
    mutationFn: async (data) => {
      try {
        const response = await apiClient.post<LoginResponse>(
          "/api/login",
          data
        );
        return response.data;
      } catch (error: unknown) {
        let message = "Login gagal";

        if (axios.isAxiosError(error)) {
          message =
            error.response?.data?.error ||
            error.response?.data?.message ||
            "Login gagal";
        }

        throw new Error(message);
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
    onSettled: () => {
      options?.onSettled?.();
    },
  });
};

export const useLogout = () => {
  useMutation({
    mutationFn: () => apiClient.post("/api/logout"),
  });
};

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: () => {
      const response = apiClient.get("/api/profile");
      return response;
    },
  });
};
