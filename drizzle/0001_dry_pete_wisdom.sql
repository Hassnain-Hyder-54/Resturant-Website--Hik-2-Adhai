CREATE INDEX `idx_contact_messages_status` ON `contact_messages` (`status`);--> statement-breakpoint
CREATE INDEX `idx_order_items_order_id` ON `order_items` (`order_id`);--> statement-breakpoint
CREATE INDEX `idx_orders_created_at` ON `orders` (`created_at`);--> statement-breakpoint
CREATE INDEX `idx_reservations_created_at` ON `reservations` (`created_at`);--> statement-breakpoint
CREATE INDEX `idx_reservations_date_status` ON `reservations` (`reservation_date`,`status`);--> statement-breakpoint
CREATE INDEX `idx_reviews_approved_created` ON `reviews` (`approved`,`created_at`);--> statement-breakpoint
PRAGMA optimize;
