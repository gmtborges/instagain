import * as schema from '$lib/db/schema';
import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { fileURLToPath } from 'url';
import csv from 'csv-parser';
import fs from 'fs';
import path from 'path';

type InstagramGiveaway = typeof schema.instagramGiveaways.$inferInsert;

const client = createClient({
	url: process.env.DATABASE_URL!
});
const db = drizzle(client, { schema });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function seed() {
	console.log('delete instagram_giveaways...');
	await db.delete(schema.instagramGiveaways);

	const rows: InstagramGiveaway[] = [];
	fs.createReadStream(path.join(__dirname, './seed.csv'))
		.pipe(csv())
		.on('data', (data) => {
			rows.push(data);
		})
		.on('end', async () => {
			await db.insert(schema.instagramGiveaways).values(rows);
			console.log('Seed done');
		});
}

seed();
