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
