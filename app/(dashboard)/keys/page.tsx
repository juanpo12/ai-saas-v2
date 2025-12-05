"use client"

import { Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const savedKeys = [
  {
    id: 1,
    name: "Key para WhatsApp",
    provider: "OpenAI",
    icon: "https://cdn.simpleicons.org/openai/white",
    created: "2024-01-15",
    lastUsed: "Hace 2 horas",
  },
  {
    id: 2,
    name: "Producción Principal",
    provider: "Anthropic",
    icon: "https://cdn.simpleicons.org/anthropic/white",
    created: "2024-01-10",
    lastUsed: "Hace 1 día",
  },
  {
    id: 3,
    name: "Testing Gmail",
    provider: "Google",
    icon: "https://cdn.simpleicons.org/google/white",
    created: "2024-01-05",
    lastUsed: "Hace 3 días",
  },
]

const providers = [
  { name: "OpenAI", icon: "https://cdn.simpleicons.org/openai/white" },
  { name: "Anthropic", icon: "https://cdn.simpleicons.org/anthropic/white" },
  { name: "Google", icon: "https://cdn.simpleicons.org/google/white" },
  { name: "Groq", icon: "https://cdn.simpleicons.org/meta/white" },
  { name: "Mistral", icon: "https://cdn.simpleicons.org/mistral/white" },
]

export default function KeysPage() {
  const [showNewKeyForm, setShowNewKeyForm] = useState(false)
  const [selectedProvider, setSelectedProvider] = useState("")
  const [keyName, setKeyName] = useState("")
  const [apiKey, setApiKey] = useState("")

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">API Keys</h1>
          <p className="text-muted-foreground mt-1">Gestiona las claves de acceso a proveedores de IA</p>
        </div>
        <Button
          className="rounded-xl bg-primary hover:bg-primary/90"
          onClick={() => setShowNewKeyForm(!showNewKeyForm)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Nueva Key
        </Button>
      </div>

      {showNewKeyForm && (
        <div className="p-6 rounded-2xl bg-card border border-border space-y-4">
          <h3 className="font-semibold text-foreground">Agregar nueva API Key</h3>

          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Proveedor</label>
            <div className="grid grid-cols-5 gap-2">
              {providers.map((provider) => (
                <button
                  key={provider.name}
                  onClick={() => setSelectedProvider(provider.name)}
                  className={`p-4 rounded-xl border transition-all duration-200 ${
                    selectedProvider === provider.name
                      ? "border-primary bg-primary/10"
                      : "border-border bg-background hover:border-primary/50"
                  }`}
                >
                  <img src={provider.icon || "/placeholder.svg"} alt={provider.name} className="w-6 h-6 mx-auto mb-2" />
                  <p className="text-xs text-center text-foreground">{provider.name}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Nombre personalizado</label>
            <input
              type="text"
              placeholder="ej: Key para WhatsApp"
              value={keyName}
              onChange={(e) => setKeyName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">API Key</label>
            <input
              type="password"
              placeholder="sk-..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <div className="flex gap-2">
            <Button className="rounded-xl bg-primary hover:bg-primary/90">Guardar Key</Button>
            <Button variant="outline" className="rounded-xl bg-transparent" onClick={() => setShowNewKeyForm(false)}>
              Cancelar
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {savedKeys.map((key) => (
          <div
            key={key.id}
            className="p-5 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center p-2">
                  <img src={key.icon || "/placeholder.svg"} alt={key.provider} className="w-full h-full" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">{key.name}</h3>
                    <span className="text-xs px-2 py-0.5 rounded-md bg-primary/10 text-primary">{key.provider}</span>
                  </div>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-xs text-muted-foreground">Creada: {key.created}</span>
                    <span className="text-xs text-muted-foreground">Último uso: {key.lastUsed}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="rounded-lg text-red-500 hover:text-red-600">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 rounded-2xl bg-yellow-500/10 border border-yellow-500/20">
        <div className="flex gap-3">
          <div className="w-5 h-5 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-yellow-500 text-xs">⚠</span>
          </div>
          <div>
            <h4 className="font-semibold text-yellow-500">Mantén tus keys seguras</h4>
            <p className="text-sm text-yellow-500/80 mt-1">
              Las keys se guardan encriptadas y no se pueden recuperar después. Si pierdes acceso, deberás crear una
              nueva.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
