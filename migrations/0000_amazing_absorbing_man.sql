CREATE TABLE `instagram_giveaways` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`description` text NOT NULL,
	`end_date` text NOT NULL,
	`link` text NOT NULL,
	`image` text
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`username` text,
	`full_name` text,
	`hashed_password` text
);
