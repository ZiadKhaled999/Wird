import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  mastodonInstance: text("mastodon_instance"),
  mastodonAccessToken: text("mastodon_access_token"),
  mastodonId: text("mastodon_id"),
  startDate: timestamp("start_date"),
  currentVerseIndex: integer("current_verse_index").default(0),
  daysPosted: integer("days_posted").default(0),
});

export const verses = pgTable("verses", {
  id: serial("id").primaryKey(),
  surahNumber: integer("surah_number").notNull(),
  surahName: text("surah_name").notNull(),
  surahNameEnglish: text("surah_name_english").notNull(),
  verseNumber: integer("verse_number").notNull(),
  verseText: text("verse_text").notNull(),
  verseTextEnglish: text("verse_text_english"),
});

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  verseId: integer("verse_id").notNull().references(() => verses.id),
  postId: text("post_id"),
  postedAt: timestamp("posted_at").defaultNow(),
  success: boolean("success").default(true),
  errorMessage: text("error_message"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  mastodonInstance: true,
  mastodonAccessToken: true,
  mastodonId: true,
  startDate: true,
  currentVerseIndex: true,
  daysPosted: true,
});

export const updateUserSchema = createInsertSchema(users).pick({
  mastodonInstance: true,
  mastodonAccessToken: true,
  mastodonId: true,
  startDate: true,
  currentVerseIndex: true,
  daysPosted: true,
});

export const insertVerseSchema = createInsertSchema(verses);
export const insertPostSchema = createInsertSchema(posts);

export type InsertUser = z.infer<typeof insertUserSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;
export type InsertPost = z.infer<typeof insertPostSchema>;
export type User = typeof users.$inferSelect;
export type Verse = typeof verses.$inferSelect;
export type Post = typeof posts.$inferSelect;
