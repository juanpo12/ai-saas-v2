"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Bot, MoreVertical, Play, Pause } from "lucide-react"
import { AgentEditor } from "@/components/agent-editor"
import { CreateAgentDialog } from "@/components/create-agent-dialog"
import { cn } from "@/lib/utils"
import { useI18n } from "@/lib/i18n"

const mockAgents = [
  {
    id: "1",
    name: "Customer Support Bot",
    description: "Handles customer inquiries and support tickets",
    status: "active",
    lastActive: "2 min ago",
    messagesCount: 1247,
  },
  {
    id: "2",
    name: "Sales Assistant",
    description: "Qualifies leads and schedules meetings",
    status: "active",
    lastActive: "5 min ago",
    messagesCount: 892,
  },
  {
    id: "3",
    name: "Content Writer",
    description: "Generates blog posts and social media content",
    status: "paused",
    lastActive: "1 hour ago",
    messagesCount: 456,
  },
]

export function AgentsView() {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null)
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const { t } = useI18n()

  const handleCreateAgent = (agentData: any) => {
    console.log("[v0] Creating agent:", agentData)
  }

  if (selectedAgent) {
    return <AgentEditor agentId={selectedAgent} onBack={() => setSelectedAgent(null)} />
  }

  return (
    <>
      <div className="p-4 lg:p-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 lg:mb-8">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-1 lg:mb-2">{t("agents.title")}</h1>
            <p className="text-sm lg:text-base text-muted-foreground">{t("agents.subtitle")}</p>
          </div>
          <Button
            onClick={() => setShowCreateDialog(true)}
            className="rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 h-10 lg:h-11 px-4 lg:px-6 w-full sm:w-auto"
          >
            <Plus className="w-4 h-4 mr-2" />
            {t("agents.create")}
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
          {mockAgents.map((agent) => (
            <Card
              key={agent.id}
              className="rounded-2xl bg-card border-border hover:border-primary/50 transition-all duration-300 cursor-pointer group overflow-hidden"
              onClick={() => setSelectedAgent(agent.id)}
            >
              <div className="p-4 lg:p-6">
                <div className="flex items-start justify-between mb-3 lg:mb-4">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Bot className="w-5 h-5 lg:w-6 lg:h-6 text-primary" />
                  </div>
                  <button className="p-2 hover:bg-accent rounded-lg transition-colors">
                    <MoreVertical className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>

                <h3 className="text-base lg:text-lg font-semibold text-foreground mb-1 lg:mb-2 group-hover:text-primary transition-colors">
                  {agent.name}
                </h3>
                <p className="text-xs lg:text-sm text-muted-foreground mb-3 lg:mb-4 line-clamp-2">
                  {agent.description}
                </p>

                <div className="flex items-center justify-between pt-3 lg:pt-4 border-t border-border">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={agent.status === "active" ? "default" : "secondary"}
                      className={cn(
                        "rounded-full px-2 lg:px-3 py-0.5 lg:py-1 text-xs font-medium",
                        agent.status === "active"
                          ? "bg-primary/20 text-primary border-primary/30"
                          : "bg-muted text-muted-foreground",
                      )}
                    >
                      {agent.status === "active" ? (
                        <>
                          <Play className="w-3 h-3 mr-1 inline" />
                          {t("agents.active")}
                        </>
                      ) : (
                        <>
                          <Pause className="w-3 h-3 mr-1 inline" />
                          {t("agents.paused")}
                        </>
                      )}
                    </Badge>
                  </div>
                  <span className="text-xs text-muted-foreground">{agent.messagesCount} msgs</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {showCreateDialog && (
        <CreateAgentDialog onClose={() => setShowCreateDialog(false)} onCreate={handleCreateAgent} />
      )}
    </>
  )
}
