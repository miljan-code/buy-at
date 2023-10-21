import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

import * as schema from './schema/index.js';

const client = postgres(process.env.DATABASE_URL!, { onnotice: () => null });

export const db = drizzle(client, { schema });

await migrate(db, { migrationsFolder: 'db/migrations' });
