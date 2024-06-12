import { z } from 'zod';

export const TaskStatusSchema = z.object({
  name: z.string(),
  color: z.string(),
  index: z.number(),
  _id: z.string(),
  label: z.string(),
  value: z.number(),
});

export type TaskStatusType = z.infer<typeof TaskStatusSchema>;
