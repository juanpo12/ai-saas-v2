import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core"

export const profiles = pgTable("profiles", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: uuid("user_id").notNull(),
  full_name: text("full_name"),
  avatar_url: text("avatar_url"),
  plan: text("plan").notNull().default("free"),
  created_at: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
})
