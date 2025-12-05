"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Plus, X, Play, Loader2, Check, AlertCircle } from "lucide-react"
import { useI18n } from "@/lib/i18n"

const HTTP_METHODS = ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"]

interface QueryParam {
  key: string
  value: string
}

interface Header {
  key: string
  value: string
}

export default function NewHttpToolPage() {
  const router = useRouter()
  const params = useParams()
  const { t } = useI18n()
  const agentId = params.id as string

  const [toolName, setToolName] = useState("")
  const [description, setDescription] = useState("")
  const [method, setMethod] = useState("GET")
  const [url, setUrl] = useState("")
  const [queryParams, setQueryParams] = useState<QueryParam[]>([{ key: "", value: "" }])
  const [headers, setHeaders] = useState<Header[]>([{ key: "", value: "" }])
  const [body, setBody] = useState("")
  const [testStatus, setTestStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [testResponse, setTestResponse] = useState("")

  const addQueryParam = () => {
    setQueryParams([...queryParams, { key: "", value: "" }])
  }

  const removeQueryParam = (index: number) => {
    setQueryParams(queryParams.filter((_, i) => i !== index))
  }

  const updateQueryParam = (index: number, field: "key" | "value", value: string) => {
    const updated = [...queryParams]
    updated[index][field] = value
    setQueryParams(updated)
  }

  const addHeader = () => {
    setHeaders([...headers, { key: "", value: "" }])
  }

  const removeHeader = (index: number) => {
    setHeaders(headers.filter((_, i) => i !== index))
  }

  const updateHeader = (index: number, field: "key" | "value", value: string) => {
    const updated = [...headers]
    updated[index][field] = value
    setHeaders(updated)
  }

  const handleTestRequest = async () => {
    setTestStatus("loading")
    setTestResponse("")

    setTimeout(() => {
      const success = Math.random() > 0.3
      setTestStatus(success ? "success" : "error")
      setTestResponse(
        success
          ? JSON.stringify({ status: 200, data: { message: "Request successful" } }, null, 2)
          : JSON.stringify({ status: 500, error: "Connection failed" }, null, 2),
      )
    }, 1500)
  }

  const handleSave = () => {
    router.push(`/agents/${agentId}`)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="min-h-14 lg:h-16 border-b border-border bg-card/50 backdrop-blur-sm flex flex-col sm:flex-row sm:items-center justify-between px-4 lg:px-6 py-2 sm:py-0 gap-2 sm:gap-0">
        <div className="flex items-center gap-2 lg:gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push(`/agents/${agentId}`)}
            className="rounded-xl hover:bg-accent shrink-0"
          >
            <ArrowLeft className="w-4 h-4 lg:mr-2" />
            <span className="hidden lg:inline">{t("httpTool.back")}</span>
          </Button>
          <div className="h-6 w-px bg-border hidden sm:block" />
          <div className="min-w-0">
            <h2 className="text-sm lg:text-lg font-semibold text-foreground truncate">{t("httpTool.title")}</h2>
            <p className="text-xs text-muted-foreground hidden sm:block">{t("httpTool.subtitle")}</p>
          </div>
        </div>

        <Button onClick={handleSave} className="rounded-xl bg-primary hover:bg-primary/90 w-full sm:w-auto">
          {t("httpTool.save")}
        </Button>
      </div>

      <div className="p-4 lg:p-8">
        <div className="max-w-4xl mx-auto space-y-4 lg:space-y-6">
          {/* Basic Info */}
          <Card className="rounded-2xl bg-card border-border p-4 lg:p-6">
            <h3 className="text-base lg:text-lg font-semibold text-foreground mb-3 lg:mb-4">
              {t("httpTool.basicInfo")}
            </h3>
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-foreground mb-2 block">{t("httpTool.name")}</Label>
                <Input
                  placeholder={t("httpTool.namePlaceholder")}
                  value={toolName}
                  onChange={(e) => setToolName(e.target.value)}
                  className="rounded-xl bg-input border-border"
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-foreground mb-2 block">{t("httpTool.description")}</Label>
                <Textarea
                  placeholder={t("httpTool.descriptionPlaceholder")}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="rounded-xl bg-input border-border resize-none"
                  rows={3}
                />
              </div>
            </div>
          </Card>

          {/* Request Configuration */}
          <Card className="rounded-2xl bg-card border-border p-4 lg:p-6">
            <h3 className="text-base lg:text-lg font-semibold text-foreground mb-3 lg:mb-4">
              {t("httpTool.requestConfig")}
            </h3>
            <div className="space-y-4 lg:space-y-6">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="w-full sm:w-32 lg:w-40">
                  <Label className="text-sm font-medium text-foreground mb-2 block">{t("httpTool.method")}</Label>
                  <select
                    value={method}
                    onChange={(e) => setMethod(e.target.value)}
                    className="w-full px-3 lg:px-4 py-2 rounded-xl bg-input border border-border text-foreground font-medium text-sm"
                  >
                    {HTTP_METHODS.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex-1">
                  <Label className="text-sm font-medium text-foreground mb-2 block">{t("httpTool.url")}</Label>
                  <Input
                    placeholder={t("httpTool.urlPlaceholder")}
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="rounded-xl bg-input border-border font-mono text-xs lg:text-sm"
                  />
                </div>
              </div>

              {/* Query Parameters */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Label className="text-sm font-medium text-foreground">{t("httpTool.queryParams")}</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={addQueryParam}
                    className="rounded-lg bg-transparent text-xs"
                  >
                    <Plus className="w-3 h-3 lg:w-4 lg:h-4 mr-1" />
                    {t("httpTool.add")}
                  </Button>
                </div>
                <div className="space-y-2">
                  {queryParams.map((param, index) => (
                    <div key={index} className="flex flex-col sm:flex-row gap-2">
                      <Input
                        placeholder={t("common.key")}
                        value={param.key}
                        onChange={(e) => updateQueryParam(index, "key", e.target.value)}
                        className="rounded-xl bg-input border-border font-mono text-xs lg:text-sm flex-1"
                      />
                      <Input
                        placeholder={t("common.value")}
                        value={param.value}
                        onChange={(e) => updateQueryParam(index, "value", e.target.value)}
                        className="rounded-xl bg-input border-border font-mono text-xs lg:text-sm flex-1"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeQueryParam(index)}
                        className="rounded-lg shrink-0 self-end sm:self-auto"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Headers */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Label className="text-sm font-medium text-foreground">{t("httpTool.headers")}</Label>
                  <Button variant="outline" size="sm" onClick={addHeader} className="rounded-lg bg-transparent text-xs">
                    <Plus className="w-3 h-3 lg:w-4 lg:h-4 mr-1" />
                    {t("httpTool.add")}
                  </Button>
                </div>
                <div className="space-y-2">
                  {headers.map((header, index) => (
                    <div key={index} className="flex flex-col sm:flex-row gap-2">
                      <Input
                        placeholder="Header name"
                        value={header.key}
                        onChange={(e) => updateHeader(index, "key", e.target.value)}
                        className="rounded-xl bg-input border-border font-mono text-xs lg:text-sm flex-1"
                      />
                      <Input
                        placeholder="Header value"
                        value={header.value}
                        onChange={(e) => updateHeader(index, "value", e.target.value)}
                        className="rounded-xl bg-input border-border font-mono text-xs lg:text-sm flex-1"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeHeader(index)}
                        className="rounded-lg shrink-0 self-end sm:self-auto"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Body (for POST, PUT, PATCH) */}
              {["POST", "PUT", "PATCH"].includes(method) && (
                <div>
                  <Label className="text-sm font-medium text-foreground mb-2 block">{t("httpTool.body")}</Label>
                  <Textarea
                    placeholder='{\n  "key": "value"\n}'
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    className="rounded-xl bg-input border-border font-mono text-xs lg:text-sm resize-none"
                    rows={6}
                  />
                </div>
              )}
            </div>
          </Card>

          {/* Test Request */}
          <Card className="rounded-2xl bg-card border-border p-4 lg:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <h3 className="text-base lg:text-lg font-semibold text-foreground">{t("httpTool.testRequest")}</h3>
              <Button
                onClick={handleTestRequest}
                disabled={!url || testStatus === "loading"}
                className="rounded-xl bg-primary hover:bg-primary/90 w-full sm:w-auto"
              >
                {testStatus === "loading" ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {t("httpTool.testing")}
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    {t("httpTool.test")}
                  </>
                )}
              </Button>
            </div>

            {testStatus !== "idle" && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  {testStatus === "loading" && (
                    <Badge
                      variant="outline"
                      className="rounded-full bg-blue-500/10 text-blue-500 border-blue-500/30 text-xs"
                    >
                      <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                      {t("httpTool.executing")}
                    </Badge>
                  )}
                  {testStatus === "success" && (
                    <Badge
                      variant="outline"
                      className="rounded-full bg-green-500/10 text-green-500 border-green-500/30 text-xs"
                    >
                      <Check className="w-3 h-3 mr-1" />
                      {t("httpTool.success")}
                    </Badge>
                  )}
                  {testStatus === "error" && (
                    <Badge
                      variant="outline"
                      className="rounded-full bg-red-500/10 text-red-500 border-red-500/30 text-xs"
                    >
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {t("httpTool.error")}
                    </Badge>
                  )}
                </div>

                {testResponse && (
                  <div className="rounded-xl bg-input border border-border p-3 lg:p-4 overflow-x-auto">
                    <pre className="text-xs font-mono text-foreground whitespace-pre-wrap break-all sm:break-normal sm:whitespace-pre">
                      {testResponse}
                    </pre>
                  </div>
                )}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
