import { z } from 'zod';

export const BoardSchema = z.object({
  _id: z.string().optional(),
  name: z.string(),
  workspace: z.string(),
  section: z.array(z.string()).optional(),
  taskStatus: z.array(z.string()).optional(),
  totalTask: z.number().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type BoardType = z.infer<typeof BoardSchema>;
