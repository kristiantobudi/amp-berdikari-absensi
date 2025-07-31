import { z } from "zod";

export const loginSchema = z.object({
  login: z.string().min(1, {
    message: "Username is required.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});
