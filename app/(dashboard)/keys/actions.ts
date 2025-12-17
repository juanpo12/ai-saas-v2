"use server"

import { db } from "@/lib/db"
import { provider_keys } from "@/lib/db/schema"
import { and, eq } from "drizzle-orm"
import { decryptApiKey } from "@/lib/utils"
import { createSupabaseServer } from "@/lib/supabase/server"

export async function decryptProviderKeyById(id: string) {
  const supabase = await createSupabaseServer()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user?.id) throw new Error("No autenticado")
  const rows = await db
    .select()
    .from(provider_keys)
    .where(and(eq(provider_keys.id, id), eq(provider_keys.user_id, user.id as string)))
    .limit(1)
  if (rows.length === 0) throw new Error("Key no encontrada")
  const enc = JSON.parse(rows[0].secret_encrypted)
  return decryptApiKey(enc)
}

export async function decryptProviderSecret(secretEncrypted: string) {
  const enc = JSON.parse(secretEncrypted)
  return decryptApiKey(enc)
}
