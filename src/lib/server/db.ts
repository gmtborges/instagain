import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from '$lib/db/schema';
import sqlite from 'better-sqlite3';
import { DATABASE_URL } from '$env/static/private';

const client = sqlite(DATABASE_URL, { verbose: console.log });
client.pragma('journal_mode=WAL');
client.pragma('synchronous=normal');
client.pragma('foreign_keys=on');

export const db = drizzle(client, { schema });
