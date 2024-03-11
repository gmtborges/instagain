import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from '$lib/db/schema';
import sqlite from 'better-sqlite3';
import 'dotenv/config';

if (!process.env.DATABASE_URL) {
	throw new Error('DATABASE_URL is not defined');
}
const client = sqlite(process.env.DATABASE_URL);
client.pragma('journal_mode=WAL');
client.pragma('synchronous=normal');
client.pragma('foreign_keys=on');

const db = drizzle(client, { schema });
migrate(db, { migrationsFolder: 'migrations' });

console.log('Migrations applied successfully.');

client.close();
