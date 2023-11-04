import { z } from 'zod';

const baseProductSchema = z.object({
  name: z.string().min(3).max(30),
  description: z.string().optional(),
  image: z.string().optional(),
  featured: z.boolean().optional(),
  price: z.number().positive(),
  category: z.string().min(1),
  quantity: z.number().optional(),
});

export const createProductSchema = baseProductSchema.extend({
  storeSlug: z.string().min(1),
});

export const updateProductSchema = baseProductSchema.extend({
  id: z.string(),
});
