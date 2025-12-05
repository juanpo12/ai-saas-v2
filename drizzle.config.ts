import { defineConfig } from 'drizzle-kit'
import { config as dotenvConfig } from 'dotenv'

dotenvConfig({ path: '.env.local' })

export default defineConfig({
  schema: './lib/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
    ssl: true,
  },
  strict: true,
  verbose: true,
})
