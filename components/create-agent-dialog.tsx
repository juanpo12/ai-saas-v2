"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { X, Sparkles, Upload, User } from "lucide-react"

interface CreateAgentDialogProps {
  onClose: () => void
  onCreate: (agent: {
    name: string
    description: string
    avatar: string
    provider: string
    keyId: string
    model: string
    temperature: number
    systemPrompt: string
  }) => void
}

const mockKeys = [
  { id: "1", name: "Key para WhatsApp", provider: "openai" },
  { id: "2", name: "Key principal", provider: "openai" },
  { id: "3", name: "Claude para soporte", provider: "anthropic" },
  { id: "4", name: "Key de prueba", provider: "google" },
]

const providerModels: Record<string, { value: string; label: string }[]> = {
  openai: [
    { value: "gpt-4-turbo", label: "GPT-4 Turbo" },
    { value: "gpt-4", label: "GPT-4" },
    { value: "gpt-3.5-turbo", label: "GPT-3.5 Turbo" },
  ],
  anthropic: [
    { value: "claude-3-opus", label: "Claude 3 Opus" },
    { value: "claude-3-sonnet", label: "Claude 3 Sonnet" },
    { value: "claude-3-haiku", label: "Claude 3 Haiku" },
  ],
  google: [
    { value: "gemini-pro", label: "Gemini Pro" },
    { value: "gemini-ultra", label: "Gemini Ultra" },
  ],
}

export function CreateAgentDialog({ onClose, onCreate }: CreateAgentDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    avatar: "",
    provider: "",
    keyId: "",
    model: "",
    temperature: 0.7,
    systemPrompt: "",
  })

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [previewUrl, setPreviewUrl] = useState<string>("")

  const availableKeys = mockKeys.filter((key) => key.provider === formData.provider)
  const availableModels = formData.provider ? providerModels[formData.provider] || [] : []
  const availableProviders = Array.from(new Set(mockKeys.map((key) => key.provider)))

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setPreviewUrl(result)
        setFormData({ ...formData, avatar: result })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onCreate(formData)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full sm:max-w-2xl bg-card border border-border rounded-t-3xl sm:rounded-3xl shadow-2xl animate-in slide-in-from-bottom sm:zoom-in-95 duration-200 max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 lg:p-6 border-b border-border sticky top-0 bg-card z-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <Sparkles className="w-4 h-4 lg:w-5 lg:h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg lg:text-xl font-semibold text-foreground">Crear Nuevo Agente</h2>
              <p className="text-xs lg:text-sm text-muted-foreground hidden sm:block">
                Configura tu agente de IA en segundos
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="rounded-xl hover:bg-accent">
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 lg:p-6 space-y-4 lg:space-y-6">
          <div className="space-y-4">
            {/* Avatar */}
            <div>
              <Label className="text-sm font-medium text-foreground mb-2 block">Avatar del Agente</Label>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl bg-accent border-2 border-border overflow-hidden flex items-center justify-center">
                    {previewUrl ? (
                      <img
                        src={previewUrl || "/placeholder.svg"}
                        alt="Avatar preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-6 h-6 lg:w-8 lg:h-8 text-muted-foreground" />
                    )}
                  </div>
                </div>
                <div className="flex-1">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="rounded-xl text-sm"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Subir Imagen
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">Dale una cara a tu agente (opcional)</p>
                </div>
              </div>
            </div>

            {/* Name */}
            <div>
              <Label htmlFor="name" className="text-sm font-medium text-foreground mb-2 block">
                Nombre del Agente
              </Label>
              <Input
                id="name"
                placeholder="ej: Customer Support Bot"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="rounded-xl bg-input border-border h-10 lg:h-11"
                required
              />
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description" className="text-sm font-medium text-foreground mb-2 block">
                Descripción
              </Label>
              <Textarea
                id="description"
                placeholder="Describe qué hace este agente..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="rounded-xl bg-input border-border resize-none text-sm"
                rows={3}
                required
              />
            </div>

            {/* Provider */}
            <div>
              <Label htmlFor="provider" className="text-sm font-medium text-foreground mb-2 block">
                Proveedor de IA
              </Label>
              <select
                id="provider"
                value={formData.provider}
                onChange={(e) => {
                  setFormData({ ...formData, provider: e.target.value, keyId: "", model: "" })
                }}
                className="w-full px-4 py-2.5 rounded-xl bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                required
              >
                <option value="">Selecciona un proveedor</option>
                {availableProviders.map((provider) => (
                  <option key={provider} value={provider}>
                    {provider === "openai" && "OpenAI"}
                    {provider === "anthropic" && "Anthropic"}
                    {provider === "google" && "Google"}
                  </option>
                ))}
              </select>
            </div>

            {/* Key */}
            {formData.provider && (
              <div>
                <Label htmlFor="keyId" className="text-sm font-medium text-foreground mb-2 block">
                  API Key
                </Label>
                <select
                  id="keyId"
                  value={formData.keyId}
                  onChange={(e) => setFormData({ ...formData, keyId: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                  required
                >
                  <option value="">Selecciona una key</option>
                  {availableKeys.map((key) => (
                    <option key={key.id} value={key.id}>
                      {key.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Model */}
            {formData.provider && formData.keyId && (
              <div>
                <Label htmlFor="model" className="text-sm font-medium text-foreground mb-2 block">
                  Modelo
                </Label>
                <select
                  id="model"
                  value={formData.model}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                  required
                >
                  <option value="">Selecciona un modelo</option>
                  {availableModels.map((model) => (
                    <option key={model.value} value={model.value}>
                      {model.label}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Temperature */}
            <div>
              <Label htmlFor="temperature" className="text-sm font-medium text-foreground mb-2 block">
                Temperatura
                <span className="text-muted-foreground font-normal ml-2">({formData.temperature})</span>
              </Label>
              <input
                id="temperature"
                type="range"
                min="0"
                max="2"
                step="0.1"
                value={formData.temperature}
                onChange={(e) => setFormData({ ...formData, temperature: Number.parseFloat(e.target.value) })}
                className="w-full h-2 bg-input rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Preciso</span>
                <span>Balanceado</span>
                <span>Creativo</span>
              </div>
            </div>

            {/* System Prompt */}
            <div>
              <Label htmlFor="prompt" className="text-sm font-medium text-foreground mb-2 block">
                System Prompt
                <span className="text-muted-foreground font-normal ml-2">(opcional)</span>
              </Label>
              <Textarea
                id="prompt"
                placeholder="Eres un asistente experto en..."
                value={formData.systemPrompt}
                onChange={(e) => setFormData({ ...formData, systemPrompt: e.target.value })}
                className="rounded-xl bg-input border-border resize-none font-mono text-xs lg:text-sm"
                rows={4}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-4 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="rounded-xl bg-transparent w-full sm:w-auto"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 w-full sm:w-auto"
              disabled={
                !formData.name || !formData.description || !formData.provider || !formData.keyId || !formData.model
              }
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Crear Agente
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
