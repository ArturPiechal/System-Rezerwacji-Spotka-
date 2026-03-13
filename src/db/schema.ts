import { jsonb, pgTable, text, timestamp, uuid, integer } from 'drizzle-orm/pg-core';
import { Availability } from '@/types';

export const users = pgTable('users', {
  id: text('id').primaryKey(),  
  name: text('name').notNull(),
  username: text('username').notNull().unique(),
  email: text('email').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow(),
  avatarUrl: text('avatar_url'),
  availability: jsonb('availability').$type<Availability>().default({
    monday: { from: "09:00", to: "17:00", active: true },
    tuesday: { from: "09:00", to: "17:00", active: true },
    wednesday: { from: "09:00", to: "17:00", active: true },
    thursday: { from: "09:00", to: "17:00", active: true },
    friday: { from: "09:00", to: "17:00", active: true },
    saturday: { from: "00:00", to: "00:00", active: false },
    sunday: { from: "00:00", to: "00:00", active: false },
  })
});

export const events = pgTable('events', {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id").notNull().references(() => users.id, {onDelete: 'cascade'}),
  text: text("text").notNull(),
  duration: integer("duration").notNull(),
  description: text("description"),
  slug: text("slug").notNull(),
});

export const bookings = pgTable('bookings', {
  id: uuid("id").primaryKey().defaultRandom(),
  event_id: uuid("event_id").notNull().references(() => events.id, {onDelete: 'cascade'}),
  user_id: text("user_id").notNull().references(() => users.id, {onDelete: 'cascade'}),
  guestName: text("guest_name").notNull(),
  guestEmail: text("guest_email").notNull(),
  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time").notNull(),
  status: text("status").notNull()
})

