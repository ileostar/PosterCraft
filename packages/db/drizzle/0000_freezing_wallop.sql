CREATE TABLE `user` (
	`id` int AUTO_INCREMENT NOT NULL,
	`username` varchar(256) NOT NULL,
	`password` text,
	`nickname` text,
	`avatar` varchar(256),
	`role` enum('admin','normal') DEFAULT 'normal',
	`email` varchar(256) NOT NULL,
	`phone_number` varchar(256),
	`oauth_uid` varchar(256),
	`oauth_access_token` text,
	`oauth_refresh_token` text,
	`oauth_expires_at` timestamp,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `user_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_username_unique` UNIQUE(`username`),
	CONSTRAINT `user_oauth_uid_unique` UNIQUE(`oauth_uid`)
);
--> statement-breakpoint
CREATE TABLE `work` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` text,
	`cover_img` varchar(256),
	`is_template` boolean,
	`is_public` boolean,
	`is_hot` boolean,
	`author` varchar(256),
	`copied_count` int,
	`status` int DEFAULT 1,
	`user_id` int,
	`channels` int,
	`latest_publishAt` timestamp,
	CONSTRAINT `work_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `work` ADD CONSTRAINT `work_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;