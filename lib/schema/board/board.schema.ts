import { z } from 'zod';
import { SectionSchema } from './section.schema';
import { TaskStatusSchema } from './task-status.schema';

export const BoardSchema = z.object({
  _id: z.string().optional(),
  name: z.string(),
  workspace: z.string(),
  sections: z
    .array(z.string())
    .optional()
    .or(z.array(SectionSchema).optional()),
  taskStatus: z.array(TaskStatusSchema),
  totalTask: z.number().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  statuses: z.array(TaskStatusSchema),
});

export type BoardType = z.infer<typeof BoardSchema>;
