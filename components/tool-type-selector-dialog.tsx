"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Globe, Code, MessageSquare } from "lucide-react"
import { cn } from "@/lib/utils"

interface ToolTypeSelectorDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  agentId: string
}

const toolTypes = [
  {
    id: "http",
    name: "HTTP Request",
    description: "Realiza llamadas HTTP a APIs externas",
    icon: Globe,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
  },
  {
    id: "nodejs",
    name: "NodeJS Script",
    description: "Ejecuta código JavaScript personalizado",
    icon: Code,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/30",
  },
  {
    id: "whatsapp",
    name: "Send WhatsApp",
    description: "Envía mensajes por WhatsApp",
    icon: MessageSquare,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/30",
  },
]

export function ToolTypeSelectorDialog({ open, onOpenChange, agentId }: ToolTypeSelectorDialogProps) {
  const router = useRouter()
  const [selectedType, setSelectedType] = useState<string | null>(null)

  const handleContinue = () => {
    if (selectedType === "http") {
      router.push(`/agents/${agentId}/tools/http/new`)
    } else if (selectedType === "nodejs") {
      console.log("NodeJS tool creator - coming soon")
    } else if (selectedType === "whatsapp") {
      console.log("WhatsApp tool creator - coming soon")
    }
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl bg-[#0D0F12] border-border rounded-t-2xl sm:rounded-2xl max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl font-semibold text-foreground">
            Selecciona el tipo de herramienta
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Elige qué tipo de herramienta quieres crear para tu agente
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-3 sm:gap-4 py-4">
          {toolTypes.map((type) => {
            const Icon = type.icon
            const isSelected = selectedType === type.id

            return (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={cn(
                  "flex items-start gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl border-2 transition-all text-left",
                  "hover:border-primary/50 hover:bg-accent/50",
                  isSelected ? "border-primary bg-primary/5" : "border-border bg-card",
                )}
              >
                <div
                  className={cn(
                    "w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0",
                    type.bgColor,
                  )}
                >
                  <Icon className={cn("w-5 h-5 sm:w-6 sm:h-6", type.color)} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm sm:text-base font-semibold text-foreground mb-0.5 sm:mb-1">{type.name}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">{type.description}</p>
                </div>
                {isSelected && (
                  <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center shrink-0">
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                )}
              </button>
            )
          })}
        </div>

        <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 pt-4 border-t border-border">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="rounded-xl bg-transparent w-full sm:w-auto"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleContinue}
            disabled={!selectedType}
            className="rounded-xl bg-primary hover:bg-primary/90 w-full sm:w-auto"
          >
            Continuar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
