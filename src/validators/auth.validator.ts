import { z } from 'zod';

export const registerSchema = {
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().min(1),
    role: z.enum(['admin','hr','manager','employee']).optional()
  })
};

export const loginSchema = {
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6)
  })
};
