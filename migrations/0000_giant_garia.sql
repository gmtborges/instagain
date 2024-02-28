CREATE TABLE `instagram_giveaways` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`end_date` text NOT NULL,
	`link` text NOT NULL,
	`category` text,
	`should_follow` integer DEFAULT false NOT NULL,
	`should_follow_others` integer DEFAULT false NOT NULL,
	`should_comment` integer DEFAULT false NOT NULL,
	`should_mention` integer DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`username` text,
	`full_name` text,
	`hashed_password` text
);
