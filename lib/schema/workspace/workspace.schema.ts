import z from 'zod';
import { ConfigSchema } from './config.schema';
import { UserSchema } from '../user.schema';

export const WorkspaceSchema = z.object({
  _id: z.string().optional(),
  banner: z.string().optional(),
  config: ConfigSchema,
  description: z.string(),
  members: z.array(z.string()).or(z.array(UserSchema)),
  name: z.string(),
  owner: z.string().or(UserSchema),
  status: z.string(),
});

export type WorkspaceType = z.infer<typeof WorkspaceSchema>;
