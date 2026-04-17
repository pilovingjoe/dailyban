import { z } from 'zod';

//Will reuse for logging in and making account
export const RegistrationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(64),
});

export const GetUserSchema = z.object({
  userEmail: z.string().email(),
});

