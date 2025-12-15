type ToolContext = {
  organizationId?: string
  agentId?: string
  agentName?: string
  hasSpecificKnowledge?: boolean
  channelCapabilities?: Record<string, boolean>
}

let context: ToolContext = {}

export function setToolContext(next: ToolContext) {
  context = { ...context, ...next }
}

export function getToolContext(): ToolContext {
  return context
}

export function clearToolContext() {
  context = {}
}

export function getChannelCapabilities(): Record<string, boolean> {
  return { whatsapp: false, gmail: false, outlook: false, imap: false, web: true }
}

export function getAllTools() {
  return {}
}

