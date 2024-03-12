import { defineConfig } from 'drizzle-kit';

if (!process.env.DATABASE_URL) {
	throw new Error('DATABASE_URL environment variable is required');
}
export default defineConfig({
	schema: './src/lib/db/schema.ts',
	out: './migrations',
	driver: 'better-sqlite',
	dbCredentials: {
		url: process.env.DATABASE_URL
	},
	verbose: true
});
