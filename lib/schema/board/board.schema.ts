import { z } from 'zod';
import { SectionSchema } from './section.schema';

export const BoardSchema = z.object({
  _id: z.string().optional(),
  name: z.string(),
  workspace: z.string(),
  sections: z
    .array(z.string())
    .optional()
    .or(z.array(SectionSchema).optional()),
  taskStatus: z.array(z.string()).optional(),
  totalTask: z.number().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  statuses: z
    .array(
      z.object({
        label: z.string(),
        value: z.number(),
      }),
    )
    .optional(),
});

export type BoardType = z.infer<typeof BoardSchema>;
