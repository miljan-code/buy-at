import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.string().min(3).max(30),
  description: z.string().optional(),
  image: z.string().optional(),
  featured: z.boolean().optional(),
  price: z.number().positive(),
  category: z.string().min(1),
  quantity: z.number().optional(),
  storeSlug: z.string().min(1),
});