import { pgTable, uuid, text, timestamp, uniqueIndex, boolean, integer, doublePrecision, jsonb } from "drizzle-orm/pg-core"

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

export const providers = pgTable(
  "providers",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    slug: text("slug").notNull(),
    name: text("name").notNull(),
    created_at: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({
    slugUnique: uniqueIndex("providers_slug_unique").on(t.slug),
  }),
)

export const provider_keys = pgTable(
  "provider_keys",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    user_id: uuid("user_id").notNull(),
    provider_slug: text("provider_slug").notNull(),
    label: text("label"),
    secret_encrypted: text("secret_encrypted").notNull(),
    created_at: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({
    userProviderLabelUnique: uniqueIndex("provider_keys_user_provider_label_unique").on(
      t.user_id,
      t.provider_slug,
      t.label,
    ),
  }),
)

export const agents = pgTable(
  "agents",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    user_id: uuid("user_id").notNull(),
    name: text("name").notNull(),
    agent_display_name: text("agent_display_name"),
    system_prompt: text("system_prompt"),
    provider_slug: text("provider_slug"),
    provider_key_id: uuid("provider_key_id").references(() => provider_keys.id),
    model: text("model"),
    backup_provider_slug: text("backup_provider_slug"),
    backup_provider_key_id: uuid("backup_provider_key_id").references(() => provider_keys.id),
    backup_model: text("backup_model"),
    temperature: doublePrecision("temperature").default(0.7),
    max_tokens: integer("max_tokens").default(1000),
    channel: text("channel"),
    channel_connection_id: uuid("channel_connection_id"),
    has_specific_knowledge: boolean("has_specific_knowledge"),
    filters: jsonb("filters"),
    tools: jsonb("tools"),
    tools_input_production: jsonb("tools_input_production"),
    tools_input_development: jsonb("tools_input_development"),
    created_at: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
)

export const conversations = pgTable(
  "conversations",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    user_id: uuid("user_id").notNull(),
    agent_id: uuid("agent_id").notNull(),
    title: text("title"),
    created_at: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
)

export const messages = pgTable(
  "messages",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    conversation_id: uuid("conversation_id").notNull(),
    user_id: uuid("user_id").notNull(),
    role: text("role").notNull(),
    content: text("content").notNull(),
    created_at: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
)
