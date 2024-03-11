import { migrate } from 'drizzle-orm/libsql/migrator';
import { drizzle } from 'drizzle-orm/libsql';
import * as schema from '$lib/db/schema';
import { createClient } from '@libsql/client';

const client = createClient({
	url: process.env.DATABASE_URL!,
	authToken: process.env.DATABASE_AUTH_TOKEN
});

const db = drizzle(client, { schema });

async function main() {
	await migrate(db, { migrationsFolder: 'migrations' });
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
