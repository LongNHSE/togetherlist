import { z } from 'zod';

export const SubscriptionTypeSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  price: z.number().min(0, 'Price must be a positive number'),
  duration: z.number().min(1, 'Duration must be at least 1'),
  _id: z.string().optional(), // Assuming _id is managed by MongoDB and not always provided on input
});

export type SubscriptionType = z.infer<typeof SubscriptionTypeSchema>;
