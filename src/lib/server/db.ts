import { drizzle } from 'drizzle-orm/libsql';
import * as schema from '$lib/db/schema';
import { createClient } from '@libsql/client';
import { DATABASE_URL, DATABASE_AUTH_TOKEN } from '$env/static/private';

const client = createClient({
  url: DATABASE_URL,
  authToken: DATABASE_AUTH_TOKEN
});

export const db = drizzle(client, { schema });
