"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Save,
  Play,
  FileCode,
  Database,
  Settings,
  Wrench,
  Upload,
  Check,
  Loader2,
  X,
  Plus,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { ToolTypeSelectorDialog } from "@/components/tool-type-selector-dialog"
import { useI18n } from "@/lib/i18n"

interface AgentEditorProps {
  agentId: string
  onBack: () => void
}

export function AgentEditor({ agentId, onBack }: AgentEditorProps) {
  const { t } = useI18n()
  const [isSaving, setIsSaving] = useState(false)
  const [activeTab, setActiveTab] = useState("prompt")
  const [showToolSelector, setShowToolSelector] = useState(false)

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => setIsSaving(false), 1000)
  }

  return (
    <div className="h-full flex flex-col">
      <div className="min-h-14 lg:h-16 border-b border-border bg-card/50 backdrop-blur-sm flex flex-col sm:flex-row sm:items-center justify-between px-4 lg:px-6 py-2 sm:py-0 gap-2 sm:gap-0">
        <div className="flex items-center gap-2 lg:gap-4">
          <Button variant="ghost" size="sm" onClick={onBack} className="rounded-xl hover:bg-accent shrink-0">
            <ArrowLeft className="w-4 h-4 lg:mr-2" />
            <span className="hidden lg:inline">{t("agent.back")}</span>
          </Button>
          <div className="h-6 w-px bg-border hidden sm:block" />
          <div className="min-w-0">
            <h2 className="text-sm lg:text-lg font-semibold text-foreground truncate">Customer Support Bot</h2>
            <p className="text-xs text-muted-foreground hidden sm:block">
              {t("agent.lastEdit")} 5 {t("agent.minutes")}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 lg:gap-3 self-end sm:self-auto">
          {isSaving && (
            <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="w-4 h-4 animate-spin" />
              {t("agent.saving")}
            </div>
          )}
          <Badge variant="outline" className="rounded-full bg-primary/10 text-primary border-primary/30 text-xs">
            <Play className="w-3 h-3 mr-1" />
            {t("agents.active")}
          </Badge>
          <Button variant="outline" size="sm" className="rounded-xl bg-transparent hidden lg:flex">
            <Settings className="w-4 h-4 mr-2" />
            {t("agent.configure")}
          </Button>
          <Button size="sm" onClick={handleSave} className="rounded-xl bg-primary hover:bg-primary/90">
            <Save className="w-4 h-4 lg:mr-2" />
            <span className="hidden lg:inline">{t("agent.save")}</span>
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4 lg:p-8">
        <div className="max-w-5xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="rounded-2xl bg-card border border-border p-1 mb-4 lg:mb-6 w-full overflow-x-auto flex justify-start lg:justify-center">
              <TabsTrigger
                value="prompt"
                className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs lg:text-sm shrink-0"
              >
                <FileCode className="w-4 h-4 lg:mr-2" />
                <span className="hidden sm:inline">{t("agent.prompt")}</span>
              </TabsTrigger>
              <TabsTrigger
                value="knowledge"
                className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs lg:text-sm shrink-0"
              >
                <Database className="w-4 h-4 lg:mr-2" />
                <span className="hidden sm:inline">{t("agent.knowledge")}</span>
              </TabsTrigger>
              <TabsTrigger
                value="config"
                className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs lg:text-sm shrink-0"
              >
                <Settings className="w-4 h-4 lg:mr-2" />
                <span className="hidden sm:inline">{t("agent.config")}</span>
              </TabsTrigger>
              <TabsTrigger
                value="tools"
                className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs lg:text-sm shrink-0"
              >
                <Wrench className="w-4 h-4 lg:mr-2" />
                <span className="hidden sm:inline">{t("agent.tools")}</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="prompt" className="space-y-4 lg:space-y-6">
              <Card className="rounded-2xl bg-card border-border p-4 lg:p-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-foreground mb-2 block">{t("agent.systemPrompt")}</Label>
                    <Textarea
                      placeholder="Eres un asistente de soporte al cliente..."
                      className="min-h-[250px] lg:min-h-[400px] font-mono text-xs lg:text-sm bg-input border-border rounded-xl resize-none"
                      defaultValue={`Eres un asistente de soporte al cliente experto y amigable.

Tu objetivo es ayudar a los usuarios a resolver sus problemas de manera rápida y efectiva.

Directrices:
- Sé cortés y profesional en todo momento
- Proporciona respuestas claras y concisas
- Si no sabes algo, admítelo y ofrece alternativas
- Siempre pregunta si el usuario necesita más ayuda

Contexto:
- Trabajas para una empresa de software SaaS
- Tienes acceso a la documentación del producto
- Puedes crear tickets de soporte si es necesario`}
                    />
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="knowledge" className="space-y-4 lg:space-y-6">
              <Card className="rounded-2xl bg-card border-border p-4 lg:p-6">
                <div className="space-y-4 lg:space-y-6">
                  <div>
                    <h3 className="text-base lg:text-lg font-semibold text-foreground mb-2">
                      {t("agent.knowledgeBase")}
                    </h3>
                    <p className="text-xs lg:text-sm text-muted-foreground mb-4">{t("agent.uploadFiles")}</p>
                  </div>

                  <div className="border-2 border-dashed border-border rounded-2xl p-8 lg:p-12 text-center hover:border-primary/50 transition-colors cursor-pointer group">
                    <Upload className="w-10 h-10 lg:w-12 lg:h-12 text-muted-foreground mx-auto mb-4 group-hover:text-primary transition-colors" />
                    <p className="text-xs lg:text-sm font-medium text-foreground mb-1">{t("agent.dragDropFiles")}</p>
                    <p className="text-xs text-muted-foreground">{t("agent.supportedFormats")}</p>
                  </div>

                  <div className="space-y-3">
                    {[
                      { name: "product-docs.pdf", status: "completed", size: "2.4 MB" },
                      { name: "faq.md", status: "completed", size: "156 KB" },
                      { name: "training-data.csv", status: "processing", size: "5.1 MB" },
                    ].map((file, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-3 lg:p-4 rounded-xl bg-accent border border-border"
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <div
                            className={cn(
                              "w-8 h-8 lg:w-10 lg:h-10 rounded-lg flex items-center justify-center shrink-0",
                              file.status === "completed" ? "bg-primary/20" : "bg-muted",
                            )}
                          >
                            {file.status === "completed" ? (
                              <Check className="w-4 h-4 lg:w-5 lg:h-5 text-primary" />
                            ) : (
                              <Loader2 className="w-4 h-4 lg:w-5 lg:h-5 text-muted-foreground animate-spin" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs lg:text-sm font-medium text-foreground truncate">{file.name}</p>
                            <p className="text-xs text-muted-foreground truncate">
                              {file.size} • {file.status === "completed" ? t("agent.processed") : t("agent.processing")}
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="rounded-lg shrink-0 ml-2">
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="config" className="space-y-4 lg:space-y-6">
              <Card className="rounded-2xl bg-card border-border p-4 lg:p-6">
                <div className="space-y-4 lg:space-y-6">
                  <div>
                    <h3 className="text-base lg:text-lg font-semibold text-foreground mb-4">
                      {t("agent.generalConfig")}
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium text-foreground mb-2 block">{t("agent.name")}</Label>
                        <Input defaultValue="Customer Support Bot" className="rounded-xl bg-input border-border" />
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-foreground mb-2 block">
                          {t("agent.description")}
                        </Label>
                        <Textarea
                          defaultValue="Handles customer inquiries and support tickets"
                          className="rounded-xl bg-input border-border resize-none"
                          rows={3}
                        />
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-foreground mb-2 block">{t("agent.model")}</Label>
                        <select className="w-full px-4 py-2 rounded-xl bg-input border border-border text-foreground">
                          <option>GPT-4 Turbo</option>
                          <option>GPT-3.5 Turbo</option>
                          <option>Claude 3 Opus</option>
                          <option>Claude 3 Sonnet</option>
                        </select>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium text-foreground mb-2 block">
                            {t("agent.temperature")}
                          </Label>
                          <Input
                            type="number"
                            defaultValue="0.7"
                            step="0.1"
                            min="0"
                            max="2"
                            className="rounded-xl bg-input border-border"
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-foreground mb-2 block">
                            {t("agent.maxTokens")}
                          </Label>
                          <Input type="number" defaultValue="2000" className="rounded-xl bg-input border-border" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 lg:pt-6 border-t border-border">
                    <h3 className="text-base lg:text-lg font-semibold text-foreground mb-4">{t("agent.channels")}</h3>
                    <div className="space-y-3">
                      {["WhatsApp", "Telegram", "Slack", "Discord"].map((channel) => (
                        <div
                          key={channel}
                          className="flex items-center justify-between p-3 lg:p-4 rounded-xl bg-accent border border-border"
                        >
                          <span className="text-xs lg:text-sm font-medium text-foreground">{channel}</span>
                          <Button variant="outline" size="sm" className="rounded-lg bg-transparent text-xs">
                            {t("agent.connect")}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="tools" className="space-y-4 lg:space-y-6">
              <Card className="rounded-2xl bg-card border-border p-4 lg:p-6">
                <div className="space-y-4 lg:space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-base lg:text-lg font-semibold text-foreground mb-1 lg:mb-2">
                        {t("agent.tools")}
                      </h3>
                      <p className="text-xs lg:text-sm text-muted-foreground">{t("agent.toolsDesc")}</p>
                    </div>
                    <Button
                      className="rounded-xl bg-primary hover:bg-primary/90 w-full sm:w-auto"
                      onClick={() => setShowToolSelector(true)}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      {t("agent.newTool")}
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {[
                      { name: "Create Support Ticket", type: "HTTP", status: "active" },
                      { name: "Search Documentation", type: "NodeJS", status: "active" },
                      { name: "Send Email", type: "HTTP", status: "inactive" },
                    ].map((tool, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-3 lg:p-4 rounded-xl bg-accent border border-border hover:border-primary/50 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                            <Wrench className="w-4 h-4 lg:w-5 lg:h-5 text-primary" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs lg:text-sm font-medium text-foreground truncate">{tool.name}</p>
                            <p className="text-xs text-muted-foreground">{tool.type}</p>
                          </div>
                        </div>
                        <Badge
                          variant={tool.status === "active" ? "default" : "secondary"}
                          className={cn(
                            "rounded-full text-xs shrink-0 ml-2",
                            tool.status === "active"
                              ? "bg-primary/20 text-primary border-primary/30"
                              : "bg-muted text-muted-foreground",
                          )}
                        >
                          {tool.status === "active" ? t("agent.toolActive") : t("agent.toolInactive")}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <ToolTypeSelectorDialog open={showToolSelector} onOpenChange={setShowToolSelector} agentId={agentId} />
    </div>
  )
}
