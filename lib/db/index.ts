import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import { profiles } from "./schema"

const connectionString = process.env.DATABASE_URL
if (!connectionString) throw new Error("DATABASE_URL is required")

const ssl = process.env.DATABASE_SSL === "true"

const globalForDb = globalThis as unknown as {
  sql: ReturnType<typeof postgres> | undefined
  db: ReturnType<typeof drizzle> | undefined
}

const sql = globalForDb.sql ?? postgres(connectionString, { ssl: ssl ? "require" : undefined, max: 1 })
if (!globalForDb.sql) globalForDb.sql = sql

export const db = globalForDb.db ?? drizzle(sql, { schema: { profiles } })
if (!globalForDb.db) globalForDb.db = db
