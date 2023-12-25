import { z } from 'zod';

export const AuthCredenialsValidator = z.object({
  email: z.string().email(),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters long.',
  }),
});

export type TAuthCredenialsValidator = z.infer<typeof AuthCredenialsValidator>;
