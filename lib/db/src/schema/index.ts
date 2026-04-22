import {
  pgTable,
  text,
  integer,
  doublePrecision,
  boolean,
  timestamp,
  jsonb,
  serial,
} from "drizzle-orm/pg-core";

export const caregiversTable = pgTable("caregivers", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  city: text("city").notNull(),
  bio: text("bio").notNull(),
  services: jsonb("services").$type<string[]>().notNull(),
  pricePerHour: doublePrecision("price_per_hour").notNull(),
  rating: doublePrecision("rating").notNull(),
  reviewCount: integer("review_count").notNull(),
  availableNow: boolean("available_now").notNull(),
  verified: boolean("verified").notNull().default(true),
  avatarColor: text("avatar_color").notNull(),
  lat: doublePrecision("lat").notNull(),
  lng: doublePrecision("lng").notNull(),
  radiusKm: doublePrecision("radius_km").notNull(),
  certifications: jsonb("certifications").$type<string[]>().notNull(),
  yearsExperience: integer("years_experience").notNull(),
  availability: jsonb("availability")
    .$type<{ day: string; slots: { hour: string; free: boolean }[] }[]>()
    .notNull(),
});

export const reviewsTable = pgTable("reviews", {
  id: text("id").primaryKey(),
  caregiverId: text("caregiver_id").notNull(),
  caregiverName: text("caregiver_name").notNull(),
  authorName: text("author_name").notNull(),
  authorRole: text("author_role").notNull(),
  city: text("city").notNull(),
  rating: integer("rating").notNull(),
  comment: text("comment").notNull(),
  date: text("date").notNull(),
  verified: boolean("verified").notNull().default(true),
  featured: boolean("featured").notNull().default(false),
});

export const bookingsTable = pgTable("bookings", {
  id: serial("id").primaryKey(),
  caregiverId: text("caregiver_id").notNull(),
  caregiverName: text("caregiver_name").notNull(),
  familyName: text("family_name").notNull(),
  service: text("service").notNull(),
  date: text("date").notNull(),
  hours: doublePrecision("hours").notNull(),
  total: doublePrecision("total").notNull(),
  status: text("status").notNull().default("confirmed"),
  notes: text("notes"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const chatMessagesTable = pgTable("chat_messages", {
  id: serial("id").primaryKey(),
  room: text("room").notNull(),
  author: text("author").notNull(),
  text: text("text").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type Caregiver = typeof caregiversTable.$inferSelect;
export type Review = typeof reviewsTable.$inferSelect;
export type Booking = typeof bookingsTable.$inferSelect;
export type ChatMessage = typeof chatMessagesTable.$inferSelect;
