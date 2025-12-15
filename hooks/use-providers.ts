'use client'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

type ProviderKeyRecord = {
  id: string
  provider_slug: string
  provider_name: string
  label: string
  created_at: string
  secret_encrypted: string
}

type AddProviderInput = {
  slug: string
  name: string
  key: string
  label: string
}

export function useProviders(initialSlug?: string) {
  const [keys, setKeys] = useState<ProviderKeyRecord[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const abortRef = useRef<AbortController | null>(null)

  const refresh = useCallback(async (slug?: string) => {
    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller
    setLoading(true)
    setError(null)
    try {
      const qs = slug ? `?slug=${encodeURIComponent(slug)}` : ''
      const res = await fetch(`/api/providers${qs}`, { signal: controller.signal })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.error || 'Error fetching providers')
      }
      const data = (await res.json()) as { success: boolean; keys: ProviderKeyRecord[] }
      setKeys(Array.isArray(data.keys) ? data.keys : [])
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }, [])

  const addProvider = useCallback(async (input: AddProviderInput) => {
    const res = await fetch('/api/providers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    })
    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      throw new Error(data?.error || 'Error creating provider')
    }
    const data = (await res.json()) as {
      success: boolean
      provider: { slug: string; name: string }
      key: ProviderKeyRecord
    }
    if (data?.key) setKeys((prev) => [data.key, ...prev])
    return data
  }, [])

  const decryptKey = useCallback(async (secretEncrypted: string) => {
    const payload = JSON.parse(secretEncrypted)
    const res = await fetch('/api/crypto', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'decrypt', data: payload }),
    })
    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      throw new Error(data?.error || 'Error decrypting key')
    }
    const data = (await res.json()) as { success: boolean; data: string }
    return data.data
  }, [])

  const bySlug = useMemo(() => {
    const map = new Map<string, { slug: string; name: string; keys: ProviderKeyRecord[] }>()
    for (const k of keys) {
      const current = map.get(k.provider_slug) ?? { slug: k.provider_slug, name: k.provider_name, keys: [] }
      current.keys.push(k)
      map.set(k.provider_slug, current)
    }
    return map
  }, [keys])

  const list = useMemo(() => Array.from(bySlug.values()), [bySlug])

  const getBySlug = useCallback(
    (slug: string) => list.find((p) => p.slug === slug),
    [list],
  )

  useEffect(() => {
    refresh(initialSlug)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    keys,
    providers: list,
    loading,
    error,
    refresh,
    addProvider,
    decryptKey,
    getBySlug,
  }
}
