import type { Store, User as UserDB } from '@prisma/client';

export type User = Omit<UserDB, 'password'> & {
  stores: Store[];
};
