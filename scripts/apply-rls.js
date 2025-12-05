const postgres = require('postgres')
const dotenv = require('dotenv')

dotenv.config({ path: '.env.local' })

async function main() {
  const url = process.env.DATABASE_URL
  if (!url) throw new Error('DATABASE_URL no está definido en .env.local')

  const sql = postgres(url, { ssl: 'require' })
  try {
    await sql.begin(async (tx) => {
      await tx`ALTER TABLE "profiles" ENABLE ROW LEVEL SECURITY`
      await tx`CREATE POLICY "profiles_select_own" ON "profiles" FOR SELECT USING (user_id = auth.uid())`
      await tx`CREATE POLICY "profiles_insert_own" ON "profiles" FOR INSERT WITH CHECK (user_id = auth.uid())`
      await tx`CREATE POLICY "profiles_update_own" ON "profiles" FOR UPDATE USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid())`
    })
    console.log('RLS aplicado para tabla profiles')
  } finally {
    await sql.end({ timeout: 5 })
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

