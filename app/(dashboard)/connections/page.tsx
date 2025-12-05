"use client"

import { Plus, CheckCircle2, XCircle, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useI18n } from "@/lib/i18n"

const connections = [
  {
    id: 1,
    name: "WhatsApp",
    description: "WhatsApp Business API",
    status: "connected",
    icon: "https://cdn.simpleicons.org/whatsapp/25D366",
    accounts: 3,
  },
  {
    id: 2,
    name: "Gmail",
    description: "Email integration",
    status: "connected",
    icon: "https://cdn.simpleicons.org/gmail/EA4335",
    accounts: 2,
  },
  {
    id: 3,
    name: "Instagram",
    description: "Instagram DMs",
    status: "connected",
    icon: "https://cdn.simpleicons.org/instagram/E4405F",
    accounts: 1,
  },
  {
    id: 4,
    name: "Telegram",
    description: "Telegram Bot",
    status: "disconnected",
    icon: "https://cdn.simpleicons.org/telegram/26A5E4",
    accounts: 0,
  },
  {
    id: 5,
    name: "Slack",
    description: "Slack workspace",
    status: "disconnected",
    icon: "https://cdn.simpleicons.org/slack/4A154B",
    accounts: 0,
  },
  {
    id: 6,
    name: "Messenger",
    description: "Facebook Messenger",
    status: "disconnected",
    icon: "https://cdn.simpleicons.org/messenger/0084FF",
    accounts: 0,
  },
]

export default function ConnectionsPage() {
  const { t } = useI18n()

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t("connections.title")}</h1>
          <p className="text-muted-foreground mt-1">{t("connections.subtitle")}</p>
        </div>
        <Button className="rounded-xl bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          {t("connections.connect")}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {connections.map((connection) => (
          <div
            key={connection.id}
            className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-200 group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center p-2.5">
                <img src={connection.icon || "/placeholder.svg"} alt={connection.name} className="w-full h-full" />
              </div>
              <div className="flex items-center gap-2">
                {connection.status === "connected" ? (
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-green-500/10 text-green-500 text-xs font-medium">
                    <CheckCircle2 className="w-3 h-3" />
                    {t("connections.connected")}
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-muted text-muted-foreground text-xs font-medium">
                    <XCircle className="w-3 h-3" />
                  </div>
                )}
              </div>
            </div>

            <h3 className="font-semibold text-foreground text-lg">{connection.name}</h3>
            <p className="text-sm text-muted-foreground mt-1">{connection.description}</p>

            <div className="mt-4 flex gap-2">
              {connection.status === "connected" ? (
                <>
                  <Button variant="outline" size="sm" className="rounded-lg bg-transparent flex-1">
                    <Settings className="w-3 h-3 mr-1.5" />
                    {t("common.edit")}
                  </Button>
                  <Button variant="ghost" size="sm" className="rounded-lg text-red-500 hover:text-red-600">
                    {t("connections.disconnect")}
                  </Button>
                </>
              ) : (
                <Button size="sm" className="rounded-lg bg-primary hover:bg-primary/90 w-full">
                  {t("connections.connect")}
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
