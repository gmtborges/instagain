CREATE TABLE `users_instagram_giveaways` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` text NOT NULL,
	`giveaway_id` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`giveaway_id`) REFERENCES `instagram_giveaways`(`id`) ON UPDATE no action ON DELETE no action
);
