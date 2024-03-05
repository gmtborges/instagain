import * as schema from '$lib/db/schema';
import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { fileURLToPath } from 'url';
import csv from 'csv-parser';
import fs from 'fs';
import path from 'path';
import type { InstagramGiveaway } from '$lib/db/schema';
import { Argon2id } from 'oslo/password';
import { generateId } from 'lucia';

const client = createClient({
	url: process.env.DATABASE_URL!
});
const db = drizzle(client, { schema });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function seedGiveaways() {
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

async function seedUsers() {
	console.log('delete users...');
	await db.delete(schema.emailVerificationCodes);
	await db.delete(schema.sessions);
	await db.delete(schema.users);

	const hashedPassword = await new Argon2id().hash('abcd1234');

	await db.insert(schema.users).values({
		id: generateId(15),
		fullName: 'Test User',
		email: 'user@test.com',
		emailVerified: true,
		hashedPassword
	});
}

async function seed() {
	await seedGiveaways();
	await seedUsers();
}

seed();
