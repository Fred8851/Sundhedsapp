import { pgTable, serial, text, integer, date } from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
	id: serial('id').primaryKey(),
	username: text('username').notNull().unique(),
	password: text('password').notNull()
});

export const dataPost = pgTable('data_post', {
	id: serial('id').primaryKey(),
	value: integer('value').notNull(), // Gemmer værdien fra range-slideren
	created_at: date('created_at').notNull().defaultNow(),
	updated_at: date('updated_at'),
	user_id: integer('user_id')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }) // Cascade delete if user is deleted
});

// Reminder: Ensure migrations are generated and applied after modifying the schema.
