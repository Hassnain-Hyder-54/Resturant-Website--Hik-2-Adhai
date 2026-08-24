import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const reservations = sqliteTable(
  'reservations',
  {
    id: text('id').primaryKey(),
    customerName: text('customer_name').notNull(),
    phone: text('phone').notNull(),
    email: text('email'),
    reservationDate: text('reservation_date').notNull(),
    reservationTime: text('reservation_time').notNull(),
    guestCount: integer('guest_count').notNull(),
    occasion: text('occasion').notNull().default('Casual dining'),
    seating: text('seating').notNull().default('No preference'),
    notes: text('notes').notNull().default(''),
    status: text('status').notNull().default('pending'),
    createdAt: integer('created_at').notNull(),
  },
  (table) => [
    index('idx_reservations_created_at').on(table.createdAt),
    index('idx_reservations_date_status').on(table.reservationDate, table.status),
  ],
);

export const orders = sqliteTable(
  'orders',
  {
    id: text('id').primaryKey(),
    customerName: text('customer_name').notNull(),
    phone: text('phone').notNull(),
    orderType: text('order_type').notNull(),
    notes: text('notes').notNull().default(''),
    total: integer('total').notNull(),
    status: text('status').notNull().default('received'),
    userId: text('user_id'),
    createdAt: integer('created_at').notNull(),
  },
  (table) => [index('idx_orders_created_at').on(table.createdAt)],
);

export const orderItems = sqliteTable(
  'order_items',
  {
    id: text('id').primaryKey(),
    orderId: text('order_id')
      .notNull()
      .references(() => orders.id, { onDelete: 'cascade' }),
    menuItemId: text('menu_item_id').notNull(),
    itemName: text('item_name').notNull(),
    unitPrice: integer('unit_price').notNull(),
    quantity: integer('quantity').notNull(),
  },
  (table) => [index('idx_order_items_order_id').on(table.orderId)],
);

export const contactMessages = sqliteTable(
  'contact_messages',
  {
    id: text('id').primaryKey(),
    customerName: text('customer_name').notNull(),
    email: text('email').notNull(),
    phone: text('phone'),
    subject: text('subject').notNull(),
    message: text('message').notNull(),
    status: text('status').notNull().default('new'),
    createdAt: integer('created_at').notNull(),
  },
  (table) => [index('idx_contact_messages_status').on(table.status)],
);

export const reviews = sqliteTable(
  'reviews',
  {
    id: text('id').primaryKey(),
    customerName: text('customer_name').notNull(),
    rating: integer('rating').notNull(),
    comment: text('comment').notNull(),
    approved: integer('approved', { mode: 'boolean' }).notNull().default(false),
    createdAt: integer('created_at').notNull(),
  },
  (table) => [index('idx_reviews_approved_created').on(table.approved, table.createdAt)],
);
