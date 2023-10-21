import { index, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

import { users } from './user.js';

export const stores = pgTable(
  'store',
  {
    id: text('id').notNull().primaryKey(),
    name: text('name').notNull(),
    slug: text('slug').notNull(),
    ownerId: text('owner_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  store => ({
    slugIdx: index('slug_idx').on(store.slug),
  })
);

export const storesRelations = relations(stores, ({ one }) => ({
  owner: one(users, {
    fields: [stores.ownerId],
    references: [users.id],
  }),
}));
