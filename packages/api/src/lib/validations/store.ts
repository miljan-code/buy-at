import { z } from 'zod';

export const createStoreSchema = z.object({
  storeName: z.string().min(3).max(30),
  coverImage: z.union([z.string().url(), z.null(), z.undefined()]),
});

export const updateStoreSchema = createStoreSchema.extend({
  id: z.string(),
  logo: z.union([z.string().url(), z.undefined()]),
  favicon: z.union([z.string().url(), z.undefined()]),
});
