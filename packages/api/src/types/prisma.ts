import type { User as UserDB } from '@prisma/client';

export type User = Omit<UserDB, 'password'>;
