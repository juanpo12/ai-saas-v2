import { pgTable, uuid, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core"

export const profiles = pgTable(
  "profiles",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    user_id: uuid("user_id").notNull(),
    full_name: text("full_name"),
    avatar_url: text("avatar_url"),
    plan: text("plan").notNull().default("free"),
    created_at: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({
    userIdUnique: uniqueIndex("profiles_user_id_unique").on(t.user_id),
  }),
)
