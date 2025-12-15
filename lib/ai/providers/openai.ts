import { AIMessage, AgentConfig } from '../types'
import { decryptApiKey } from '@/lib/utils'
import { getAllTools, clearToolContext } from '../tools'
import { logger } from '@/lib/logger'

type OpenAIChatMessage = { role: 'system' | 'user' | 'assistant'; content: string }

export async function generateOpenAIResponse(
  thread: AIMessage[],
  config: AgentConfig,
): Promise<string> {

  if (!config.api_key) {
    throw new Error('API key de OpenAI no proporcionada')
  }

  let apiKey: string
  try {
    const encryptedData = typeof config.api_key === 'string' ? JSON.parse(config.api_key) : config.api_key
    apiKey = decryptApiKey(encryptedData)
  } catch (error) {
    logger.error('Error desencriptando API key:', error)
    throw new Error('No se pudo desencriptar la API key de OpenAI')
  }

  process.env.OPENAI_API_KEY = apiKey

  const messages: OpenAIChatMessage[] = [
    { role: 'system', content: config.agent_prompt },
    ...thread.map((msg) => ({ role: msg.role, content: msg.body })),
  ]

  const tools = getAllTools()
  logger.info('Preparando llamada a OpenAI:', {
    model: config.model,
    toolCount: Object.keys(tools).length,
    messageCount: messages.length,
    temperature: config.temperature,
    maxTokens: config.max_tokens || 4000,
  })

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: config.model,
      messages,
      temperature: config.temperature,
      max_tokens: config.max_tokens || 4000,
    }),
  })

  if (!response.ok) {
    const err = await response.text()
    logger.error('Error en OpenAI:', err)
    throw new Error('Error llamando a OpenAI')
  }

  const data = await response.json()
  const text = data?.choices?.[0]?.message?.content ?? ''
  logger.info('Respuesta recibida de OpenAI:', { responseLength: text.length, hasResponse: !!text })

  clearToolContext()
  return text || 'No se pudo generar respuesta.'
}
