"use client"

import { Filter, Download, AlertCircle, CheckCircle2, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useI18n } from "@/lib/i18n"

const logs = [
  {
    id: 1,
    timestamp: "2024-01-20 14:32:15",
    agent: "Soporte Cliente",
    level: "info",
    message: "Conversación iniciada con usuario María García",
    details: "Session ID: sess_abc123",
  },
  {
    id: 2,
    timestamp: "2024-01-20 14:30:42",
    agent: "Ventas Bot",
    level: "success",
    message: "Lead calificado exitosamente",
    details: "Lead ID: lead_xyz789",
  },
  {
    id: 3,
    timestamp: "2024-01-20 14:28:11",
    agent: "Onboarding",
    level: "error",
    message: "Error al procesar documento",
    details: "Error: File size exceeds limit (5MB)",
  },
  {
    id: 4,
    timestamp: "2024-01-20 14:25:33",
    agent: "Soporte Cliente",
    level: "info",
    message: "Ticket creado automáticamente",
    details: "Ticket ID: tick_def456",
  },
  {
    id: 5,
    timestamp: "2024-01-20 14:22:08",
    agent: "Ventas Bot",
    level: "success",
    message: "Email de seguimiento enviado",
    details: "Email ID: email_ghi789",
  },
]

export default function LogsPage() {
  const { t } = useI18n()

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t("logs.title")}</h1>
          <p className="text-muted-foreground mt-1">{t("logs.subtitle")}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="rounded-xl bg-transparent">
            <Filter className="w-4 h-4 mr-2" />
            {t("logs.all")}
          </Button>
          <Button variant="outline" className="rounded-xl bg-transparent">
            <Download className="w-4 h-4 mr-2" />
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        {logs.map((log) => (
          <div
            key={log.id}
            className="p-4 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-200"
          >
            <div className="flex items-start gap-4">
              <div className="shrink-0 mt-1">
                {log.level === "error" && (
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                    <AlertCircle className="w-4 h-4 text-red-500" />
                  </div>
                )}
                {log.level === "success" && (
                  <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  </div>
                )}
                {log.level === "info" && (
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <Info className="w-4 h-4 text-blue-500" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground font-mono">{log.timestamp}</span>
                  <span className="text-xs px-2 py-0.5 rounded-md bg-primary/10 text-primary">{log.agent}</span>
                </div>
                <p className="text-sm text-foreground mt-1 font-medium">{log.message}</p>
                <p className="text-xs text-muted-foreground mt-1 font-mono">{log.details}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
