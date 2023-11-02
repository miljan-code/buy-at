import { z } from 'zod';

export const createCategorySchema = z.object({
  name: z.string().min(3).max(30),
  bilboard: z.string().min(1).max(30),
  storeSlug: z.string(),
});
