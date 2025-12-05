const postgres = require('postgres')
const dotenv = require('dotenv')

dotenv.config({ path: '.env.local' })

async function main() {
  const url = process.env.DATABASE_URL
  if (!url) throw new Error('DATABASE_URL no está definido en .env.local')

  const sql = postgres(url, { ssl: 'require' })
  try {
    await sql.begin(async (tx) => {
      await tx`ALTER TABLE "agents" ADD COLUMN IF NOT EXISTS "agent_display_name" text`
      await tx`ALTER TABLE "agents" ADD COLUMN IF NOT EXISTS "backup_provider_slug" text`
      await tx`ALTER TABLE "agents" ADD COLUMN IF NOT EXISTS "backup_provider_key_id" uuid`
      await tx`ALTER TABLE "agents" ADD COLUMN IF NOT EXISTS "backup_model" text`
      await tx`ALTER TABLE "agents" ADD COLUMN IF NOT EXISTS "temperature" double precision DEFAULT 0.7`
      await tx`ALTER TABLE "agents" ADD COLUMN IF NOT EXISTS "max_tokens" integer DEFAULT 1000`
      await tx`ALTER TABLE "agents" ADD COLUMN IF NOT EXISTS "channel" text`
      await tx`ALTER TABLE "agents" ADD COLUMN IF NOT EXISTS "channel_connection_id" uuid`
      await tx`ALTER TABLE "agents" ADD COLUMN IF NOT EXISTS "has_specific_knowledge" boolean`
      await tx`ALTER TABLE "agents" ADD COLUMN IF NOT EXISTS "filters" jsonb`
      await tx`ALTER TABLE "agents" ADD COLUMN IF NOT EXISTS "tools" jsonb`
      await tx`ALTER TABLE "agents" ADD COLUMN IF NOT EXISTS "tools_input_production" jsonb`
      await tx`ALTER TABLE "agents" ADD COLUMN IF NOT EXISTS "tools_input_development" jsonb`

      const [fkBackupExists] = await tx`
        SELECT EXISTS (
          SELECT 1 FROM pg_constraint WHERE conname = 'agents_backup_provider_key_id_provider_keys_id_fk'
        ) AS exists
      `
      if (!fkBackupExists.exists) {
        await tx`ALTER TABLE "agents" ADD CONSTRAINT "agents_backup_provider_key_id_provider_keys_id_fk" FOREIGN KEY ("backup_provider_key_id") REFERENCES "public"."provider_keys"("id")`
      }
      await tx`ALTER TABLE "profiles" ENABLE ROW LEVEL SECURITY`
      await tx`DROP POLICY IF EXISTS "profiles_select_own" ON "profiles"`
      await tx`DROP POLICY IF EXISTS "profiles_insert_own" ON "profiles"`
      await tx`DROP POLICY IF EXISTS "profiles_update_own" ON "profiles"`
      await tx`CREATE POLICY "profiles_select_own" ON "profiles" FOR SELECT USING (user_id = auth.uid())`
      await tx`CREATE POLICY "profiles_insert_own" ON "profiles" FOR INSERT WITH CHECK (user_id = auth.uid())`
      await tx`CREATE POLICY "profiles_update_own" ON "profiles" FOR UPDATE USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid())`

      await tx`ALTER TABLE "provider_keys" ENABLE ROW LEVEL SECURITY`
      await tx`DROP POLICY IF EXISTS "provider_keys_select_own" ON "provider_keys"`
      await tx`DROP POLICY IF EXISTS "provider_keys_insert_own" ON "provider_keys"`
      await tx`DROP POLICY IF EXISTS "provider_keys_update_own" ON "provider_keys"`
      await tx`CREATE POLICY "provider_keys_select_own" ON "provider_keys" FOR SELECT USING (user_id = auth.uid())`
      await tx`CREATE POLICY "provider_keys_insert_own" ON "provider_keys" FOR INSERT WITH CHECK (user_id = auth.uid())`
      await tx`CREATE POLICY "provider_keys_update_own" ON "provider_keys" FOR UPDATE USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid())`

      await tx`ALTER TABLE "agents" ENABLE ROW LEVEL SECURITY`
      await tx`DROP POLICY IF EXISTS "agents_select_own" ON "agents"`
      await tx`DROP POLICY IF EXISTS "agents_insert_own" ON "agents"`
      await tx`DROP POLICY IF EXISTS "agents_update_own" ON "agents"`

      await tx`CREATE POLICY "agents_select_own" ON "agents" FOR SELECT USING (user_id = auth.uid())`

      const [backupCol] = await tx`
        SELECT EXISTS (
          SELECT 1 FROM information_schema.columns
          WHERE table_schema = 'public' AND table_name = 'agents' AND column_name = 'backup_provider_key_id'
        ) AS exists
      `

      if (backupCol.exists) {
        await tx`CREATE POLICY "agents_insert_own" ON "agents" FOR INSERT WITH CHECK (
          user_id = auth.uid()
          AND (
            provider_key_id IS NULL OR EXISTS (SELECT 1 FROM provider_keys pk WHERE pk.id = provider_key_id AND pk.user_id = auth.uid())
          )
          AND (
            backup_provider_key_id IS NULL OR EXISTS (SELECT 1 FROM provider_keys pk2 WHERE pk2.id = backup_provider_key_id AND pk2.user_id = auth.uid())
          )
        )`
        await tx`CREATE POLICY "agents_update_own" ON "agents" FOR UPDATE USING (user_id = auth.uid()) WITH CHECK (
          user_id = auth.uid()
          AND (
            provider_key_id IS NULL OR EXISTS (SELECT 1 FROM provider_keys pk WHERE pk.id = provider_key_id AND pk.user_id = auth.uid())
          )
          AND (
            backup_provider_key_id IS NULL OR EXISTS (SELECT 1 FROM provider_keys pk2 WHERE pk2.id = backup_provider_key_id AND pk2.user_id = auth.uid())
          )
        )`
      } else {
        await tx`CREATE POLICY "agents_insert_own" ON "agents" FOR INSERT WITH CHECK (
          user_id = auth.uid()
          AND (
            provider_key_id IS NULL OR EXISTS (SELECT 1 FROM provider_keys pk WHERE pk.id = provider_key_id AND pk.user_id = auth.uid())
          )
        )`
        await tx`CREATE POLICY "agents_update_own" ON "agents" FOR UPDATE USING (user_id = auth.uid()) WITH CHECK (
          user_id = auth.uid()
          AND (
            provider_key_id IS NULL OR EXISTS (SELECT 1 FROM provider_keys pk WHERE pk.id = provider_key_id AND pk.user_id = auth.uid())
          )
        )`
      }
    })
    console.log('RLS aplicado para tablas: profiles, provider_keys, agents')
  } finally {
    await sql.end({ timeout: 5 })
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
