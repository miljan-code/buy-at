import { relations, getTableColumns } from 'drizzle-orm';
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';

import { stores } from './store.js';

export const users = pgTable('user', {
  id: text('id').notNull().primaryKey(),
  name: text('name').notNull(),
  email: text('slug').notNull(),
  password: text('password').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
  stores: many(stores),
}));

export type User = Omit<typeof users.$inferSelect, 'password'>;

const { password, ...userFields } = getTableColumns(users);
export { userFields };
