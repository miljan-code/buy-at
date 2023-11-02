import { z } from 'zod';

export const createStoreSchema = z.object({
  storeName: z.string().min(3).max(30),
  coverImage: z.string(),
});

export const updateStoreSchema = createStoreSchema.extend({
  id: z.string(),
  logo: z.string(),
  favicon: z.string(),
  slug: z.string().min(3).max(30),
});
