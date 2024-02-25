import { sql } from 'drizzle-orm';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
	id: text('id').primaryKey(),
	username: text('username'),
	fullName: text('full_name'),
	hashedPassword: text('hashed_password')
});

export const instagramGiveaways = sqliteTable('instagram_giveaways', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
	description: text('description').notNull(),
	endDate: text('end_date').notNull(),
	link: text('link').notNull(),
	image: text('image')
});
