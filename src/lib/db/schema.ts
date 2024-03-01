import { sql } from 'drizzle-orm';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export const users = sqliteTable('users', {
	id: text('id').primaryKey(),
	username: text('username').unique().notNull(),
	fullName: text('full_name'),
	hashedPassword: text('hashed_password').notNull()
});

export const emailVerification = sqliteTable('email_verifications', {
	id: text('id').notNull().primaryKey(),
	code: text('code').notNull(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id),
	email: text('email').notNull(),
	expiresAt: integer('expires_at').notNull()
});

export const sessions = sqliteTable('sessions', {
	id: text('id').notNull().primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id),
	expiresAt: integer('expires_at').notNull()
});

export type InstagramGiveaway = typeof instagramGiveaways.$inferSelect;
export type InsertInstagramGiveaway = typeof instagramGiveaways.$inferInsert;

export const instagramGiveaways = sqliteTable('instagram_giveaways', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
	endDate: text('end_date').notNull(),
	link: text('link').notNull(),
	category: text('category'),
	shouldFollow: integer('should_follow', { mode: 'boolean' })
		.notNull()
		.default(false),
	shouldFollowOthers: integer('should_follow_others', { mode: 'boolean' })
		.notNull()
		.default(false),
	shouldComment: integer('should_comment', { mode: 'boolean' })
		.notNull()
		.default(false),
	shouldMention: integer('should_mention', { mode: 'boolean' })
		.notNull()
		.default(false)
});
