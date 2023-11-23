import { z } from 'zod';

const baseCategorySchema = z.object({
  name: z.string().min(3).max(30),
  bilboard: z.string().min(1).max(30),
  attributes: z.array(
    z.object({
      name: z.string(),
      options: z.array(z.string()),
    }),
  ),
});

export const createCategorySchema = baseCategorySchema.extend({
  storeSlug: z.string(),
});

export const updateCategorySchema = baseCategorySchema.extend({
  id: z.string(),
});
