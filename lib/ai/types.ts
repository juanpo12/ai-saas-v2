export type AIMessage = {
  role: 'user' | 'assistant'
  body: string
}

export type EncryptedApiKey = {
  encrypted: string
  iv: string
  authTag: string
}

export type AgentConfig = {
  id: string
  agent_name: string
  has_specific_knowledge?: boolean
  api_key: string | EncryptedApiKey
  model: string
  temperature: number
  max_tokens?: number
  agent_prompt: string
}
