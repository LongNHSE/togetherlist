import { z } from 'zod';
import { TaskSchema, TaskType } from '../task/task.schema';

export const SectionSchema = z.object({
  _id: z.string().optional(),
  name: z.string(),
  board: z.string(),
  tasks: z.array(z.string()).or(z.array(TaskSchema)).optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type SectionType = z.infer<typeof SectionSchema>;
