import { z } from 'zod';

export const createStoreSchema = z.object({
  storeName: z.string().min(3).max(30),
});
