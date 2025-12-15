import { generateOpenAIResponse } from './providers/openai'
import { AIMessage, AgentConfig } from './types'

export async function generateResponse(thread: AIMessage[], config: AgentConfig) {
  return generateOpenAIResponse(thread, config)
}
