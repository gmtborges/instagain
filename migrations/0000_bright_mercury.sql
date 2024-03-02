CREATE TABLE `email_verification_codes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`code` text NOT NULL,
	`user_id` text NOT NULL,
	`email` text NOT NULL,
	`expires_at` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
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
CREATE TABLE `sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`expires_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`full_name` text,
	`email` text,
	`email_verified` integer DEFAULT false NOT NULL,
	`hashed_password` text NOT NULL,
	`provider_id` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_provider_id_unique` ON `users` (`provider_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `email_idx` ON `users` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `provider_id_idx` ON `users` (`provider_id`);