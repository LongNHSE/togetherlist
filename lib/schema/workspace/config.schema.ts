import z from 'zod';

export const ConfigSchema = z.object({
  visibility: z.boolean().default(true),
  boardCreationRestrictions: z.boolean().default(false),
  sharingBoardRestrictions: z.boolean().default(false),
});

export type ConfigType = z.infer<typeof ConfigSchema>;
