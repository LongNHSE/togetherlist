import { z } from 'zod';

export const TaskStatusSchema = z.object({
  name: z.string(),
  color: z.string(),
  index: z.number(),
});

export type TaskStatusType = z.infer<typeof TaskStatusSchema>;
