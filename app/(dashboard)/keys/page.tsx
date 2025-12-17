"use client"
import { Plus, Trash2, Loader2, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useMemo, useState } from "react"
import { useI18n } from "@/lib/i18n"
import { useProviders } from "@/hooks/use-providers"
import { logger } from "@/lib/logger"
import { useToast } from "@/hooks/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const PROVIDER_OPTIONS = [
  { slug: "openai", name: "OpenAI" },
  { slug: "anthropic", name: "Anthropic" },
  { slug: "google", name: "Google" },
  { slug: "groq", name: "Groq" },
  { slug: "mistral", name: "Mistral" },
]

function sourcesForSlug(slug: string) {
  const s = slug.toLowerCase()
  return [
    `https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${s}.svg`,
    `https://unpkg.com/simple-icons/icons/${s}.svg`,
    `https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/${s}.svg`,
  ]
}

function BrandIcon({ slug, name, className }: { slug: string; name: string; className?: string }) {
  const [idx, setIdx] = useState(0)
  const sources = sourcesForSlug(slug)
  const src = sources[idx]
  return src ? (
    <img
      src={src}
      alt={name}
      className={className ?? "w-6 h-6 mx-auto mb-2"}
      style={{ filter: "invert(1)" }}
      onError={() => setIdx((i) => (i + 1 < sources.length ? i + 1 : i))}
    />
  ) : (
    <div className={className ?? "w-6 h-6 mx-auto mb-2 flex items-center justify-center"}>
      <Bot className="w-5 h-5 text-primary" />
    </div>
  )
}

export default function KeysPage() {
  const [showNewKeyForm, setShowNewKeyForm] = useState(false)
  const [selectedProvider, setSelectedProvider] = useState<string>("")
  const [keyName, setKeyName] = useState("")
  const [apiKey, setApiKey] = useState("")
  const { t } = useI18n()
  const { keys, loading, error, refresh, addProvider, deleteKey } = useProviders()
  const { toast } = useToast()
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null)

  useEffect(() => {
    if (error) {
      toast({ title: "Error", description: error })
    }
  }, [error, toast])

  const providerCards = useMemo(
    () => PROVIDER_OPTIONS.map((p) => ({ ...p })),
    [],
  )

  async function handleSave() {
    try {
      const selected = PROVIDER_OPTIONS.find((p) => p.slug === selectedProvider)
      if (!selected) {
        toast({ title: "Selecciona un proveedor", description: "Debes elegir un proveedor para guardar la key." })
        return
      }
      if (!keyName.trim() || !apiKey.trim()) {
        toast({ title: "Campos requeridos", description: "Nombre e API Key son obligatorios." })
        return
      }
      await addProvider({ slug: selected.slug, name: selected.name, key: apiKey.trim(), label: keyName.trim() })
      toast({ title: "Key guardada", description: "La key fue almacenada de forma segura." })
      setShowNewKeyForm(false)
      setKeyName("")
      setApiKey("")
      setSelectedProvider("")
      await refresh()
    } catch (e) {
      logger.error("Error al guardar provider/key:", e)
      toast({
        title: "Error al guardar",
        description: e instanceof Error ? e.message : "Error desconocido",
      })
    }
  }
  async function handleDelete(id: string) {
    try {
      await deleteKey(id)
      toast({ title: "Key eliminada", description: "La key fue eliminada correctamente." })
    } catch (e) {
      logger.error("Error al eliminar key:", e)
      toast({
        title: "Error al eliminar",
        description: e instanceof Error ? e.message : "Error desconocido",
      })
    }
  }

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t("keys.title")}</h1>
          <p className="text-muted-foreground mt-1">{t("keys.subtitle")}</p>
        </div>
        <Button
          className="rounded-xl bg-primary hover:bg-primary/90"
          onClick={() => setShowNewKeyForm(!showNewKeyForm)}
        >
          <Plus className="w-4 h-4 mr-2" />
          {t("keys.add")}
        </Button>
      </div>

      {showNewKeyForm && (
        <div className="p-6 rounded-2xl bg-card border border-border space-y-4">
          <h3 className="font-semibold text-foreground">{t("keys.addNew")}</h3>

          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">{t("keys.provider")}</label>
            <div className="grid grid-cols-5 gap-2">
              {providerCards.map((provider) => (
                <button
                  key={provider.slug}
                  onClick={() => setSelectedProvider(provider.slug)}
                  className={`p-4 rounded-xl border transition-all duration-200 ${
                    selectedProvider === provider.slug
                      ? "border-primary bg-primary/10"
                      : "border-border bg-background hover:border-primary/50"
                  }`}
                >
                  <BrandIcon slug={provider.slug} name={provider.name} />
                  <p className="text-xs text-center text-foreground">{provider.name}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">{t("keys.name")}</label>
            <input
              type="text"
              placeholder={t("keys.namePlaceholder")}
              value={keyName}
              onChange={(e) => setKeyName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">{t("keys.apiKey")}</label>
            <input
              type="password"
              placeholder={t("keys.apiKeyPlaceholder")}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <div className="flex gap-2">
            <Button className="rounded-xl bg-primary hover:bg-primary/90" onClick={handleSave}>
              {t("keys.save")}
            </Button>
            <Button variant="outline" className="rounded-xl bg-transparent" onClick={() => setShowNewKeyForm(false)}>
              {t("keys.cancel")}
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {loading && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Cargando keys...</span>
          </div>
        )}
        {!loading && keys.length === 0 && (
          <div className="text-sm text-muted-foreground">{t("keys.empty")}</div>
        )}
        {!loading &&
          keys.map((key) => (
            <div
              key={key.id}
              className="p-5 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center p-2">
                    <BrandIcon slug={key.provider_slug} name={key.provider_name} className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">{key.label}</h3>
                      <span className="text-xs px-2 py-0.5 rounded-md bg-primary/10 text-primary">
                        {key.provider_name}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-xs text-muted-foreground">
                        {t("keys.createdAt")}: {new Date(key.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-lg text-red-500 hover:text-red-600"
                        onClick={() => setPendingDeleteId(key.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>{t("keys.confirmDeleteTitle") || "Eliminar key"}</AlertDialogTitle>
                        <AlertDialogDescription>
                          {t("keys.confirmDeleteDesc") || "Esta acción no se puede deshacer. ¿Seguro que quieres eliminar esta key?"}
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setPendingDeleteId(null)}>
                          {t("keys.cancel") || "Cancelar"}
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={async () => {
                            if (pendingDeleteId) {
                              await handleDelete(pendingDeleteId)
                              setPendingDeleteId(null)
                            }
                          }}
                          className="bg-red-500 hover:bg-red-600 text-white"
                        >
                          {t("keys.delete") || "Eliminar"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </div>
          ))}
      </div>

      <div className="p-6 rounded-2xl bg-yellow-500/10 border border-yellow-500/20">
        <div className="flex gap-3">
          <div className="w-5 h-5 rounded-full bg-yellow-500/20 flex items-center justify-center shrink-0 mt-0.5">
            <span className="text-yellow-500 text-xs">!</span>
          </div>
          <div>
            <h4 className="font-semibold text-yellow-500">{t("keys.hidden")}</h4>
          </div>
        </div>
      </div>
    </div>
  )
}
