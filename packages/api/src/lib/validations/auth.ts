import { z } from 'zod';

export const registerUserSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
});

export const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
