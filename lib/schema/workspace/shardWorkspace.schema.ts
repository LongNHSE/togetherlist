import { z } from 'zod';
import { UserSchema } from '../user.schema';
import { WorkspaceSchema } from './workspace.schema';

export const SharedWorkspaceSchema = z.object({
  _id: z.string().optional(),
  memberId: z.string().or(UserSchema),
  workspaceId: z.string(),
  role: z.string(),
  status: z.string(),
  workspace: WorkspaceSchema,
});

export type SharedWorkspaceType = z.infer<typeof SharedWorkspaceSchema>;
