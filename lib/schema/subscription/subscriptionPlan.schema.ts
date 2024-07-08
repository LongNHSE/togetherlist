import { z } from 'zod';
import { SubscriptionTypeSchema } from './subscriptionType.schema';

export const SubscriptionPlanSchema = z.object({
  userId: z.string(),
  subscriptionTypeId: z.string(),
  subscriptionType: SubscriptionTypeSchema,
  from: z.date(),
  to: z.date().optional(),
  status: z.string().default('active'),
});

export type SubscriptionPlan = z.infer<typeof SubscriptionPlanSchema>;
