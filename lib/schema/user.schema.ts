import { z } from 'zod';

export const UserSchema = z.object({
  _id: z.string().optional(),
  firstName: z.string(),
  lastName: z.string(),
  username: z.string(),
  email: z.string(),
  password: z.string().optional(),
  role: z.enum(['admin', 'user', 'staff']).default('user').optional(),
  status: z.enum(['active', 'inactive']).default('active').optional(),
  avatar: z.string().optional(),
  phone: z.string().optional(),
  gender: z.string().optional(),
  refreshToken: z.string().optional(),
  bio: z.string().optional(),
});

export type UserType = z.infer<typeof UserSchema>;
