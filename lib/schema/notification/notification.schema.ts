import { z } from 'zod';
import { WorkspaceSchema } from '../workspace/workspace.schema';
import { TaskSchema } from '../task/task.schema';
import { UserSchema } from '../user.schema';
import { create } from 'domain';

export const NotificationSchema = z.object({
  _id: z.string().optional(),
  workspace: WorkspaceSchema,
  task: TaskSchema,
  to: UserSchema,
  status: z.string(),
  isNewStatus: z.boolean().optional(),
  isNewAssignee: z.boolean().optional(),
  oldStatus: z.string().optional(),
  newStatus: z.string().optional(),
  assignee: UserSchema.optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  user: UserSchema.optional(),
});

export type NotificationType = z.infer<typeof NotificationSchema>;
