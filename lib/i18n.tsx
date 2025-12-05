"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type Locale = "es" | "en" | "pt"

type Translations = {
  [key: string]: {
    es: string
    en: string
    pt: string
  }
}

export const translations: Translations = {
  // Navigation
  "nav.agents": { es: "Agentes", en: "Agents", pt: "Agentes" },
  "nav.connections": { es: "Conexiones", en: "Connections", pt: "Conexões" },
  "nav.keys": { es: "Keys", en: "Keys", pt: "Keys" },
  "nav.messages": { es: "Mensajes", en: "Messages", pt: "Mensagens" },
  "nav.tools": { es: "Herramientas", en: "Tools", pt: "Ferramentas" },
  "nav.logs": { es: "Logs", en: "Logs", pt: "Logs" },

  // Header
  "header.search": { es: "Buscar...", en: "Search...", pt: "Buscar..." },
  "header.newAgent": { es: "Nuevo Agente", en: "New Agent", pt: "Novo Agente" },

  // Plan
  "plan.current": { es: "Plan Actual", en: "Current Plan", pt: "Plano Atual" },
  "plan.free": { es: "Free", en: "Free", pt: "Grátis" },
  "plan.agentsUsed": { es: "agentes usados", en: "agents used", pt: "agentes usados" },
  "plan.upgrade": { es: "Mejorar Plan", en: "Upgrade Plan", pt: "Melhorar Plano" },

  // Agents
  "agents.title": { es: "Agentes", en: "Agents", pt: "Agentes" },
  "agents.subtitle": {
    es: "Gestiona tus agentes de inteligencia artificial",
    en: "Manage your AI agents",
    pt: "Gerencie seus agentes de IA",
  },
  "agents.create": { es: "Crear Agente", en: "Create Agent", pt: "Criar Agente" },
  "agents.active": { es: "Activo", en: "Active", pt: "Ativo" },
  "agents.paused": { es: "Pausado", en: "Paused", pt: "Pausado" },
  "agents.conversations": { es: "conversaciones", en: "conversations", pt: "conversas" },
  "agents.messages": { es: "mensajes", en: "messages", pt: "mensagens" },
  "agents.lastActive": { es: "Última actividad", en: "Last active", pt: "Última atividade" },
  "agents.edit": { es: "Editar", en: "Edit", pt: "Editar" },

  // Agent Editor
  "agent.prompt": { es: "Prompt", en: "Prompt", pt: "Prompt" },
  "agent.knowledge": { es: "Knowledge", en: "Knowledge", pt: "Knowledge" },
  "agent.config": { es: "Configuración", en: "Configuration", pt: "Configuração" },
  "agent.tools": { es: "Herramientas", en: "Tools", pt: "Ferramentas" },
  "agent.back": { es: "Volver", en: "Back", pt: "Voltar" },
  "agent.saving": { es: "Guardando...", en: "Saving...", pt: "Salvando..." },
  "agent.saved": { es: "Guardado", en: "Saved", pt: "Salvo" },
  "agent.systemPrompt": { es: "System Prompt", en: "System Prompt", pt: "System Prompt" },
  "agent.systemPromptDesc": {
    es: "Define el comportamiento y personalidad de tu agente",
    en: "Define your agent's behavior and personality",
    pt: "Defina o comportamento e personalidade do seu agente",
  },
  "agent.knowledgeBase": { es: "Base de Conocimiento", en: "Knowledge Base", pt: "Base de Conhecimento" },
  "agent.knowledgeDesc": {
    es: "Arrastra archivos aquí o haz clic para seleccionar",
    en: "Drag files here or click to select",
    pt: "Arraste arquivos aqui ou clique para selecionar",
  },
  "agent.knowledgeFormats": {
    es: "Soporta PDF, TXT, MD, DOCX",
    en: "Supports PDF, TXT, MD, DOCX",
    pt: "Suporta PDF, TXT, MD, DOCX",
  },
  "agent.uploadedFiles": { es: "Archivos Subidos", en: "Uploaded Files", pt: "Arquivos Enviados" },
  "agent.model": { es: "Modelo", en: "Model", pt: "Modelo" },
  "agent.temperature": { es: "Temperatura", en: "Temperature", pt: "Temperatura" },
  "agent.precise": { es: "Preciso", en: "Precise", pt: "Preciso" },
  "agent.balanced": { es: "Balanceado", en: "Balanced", pt: "Balanceado" },
  "agent.creative": { es: "Creativo", en: "Creative", pt: "Criativo" },
  "agent.channels": { es: "Canales de Comunicación", en: "Communication Channels", pt: "Canais de Comunicação" },
  "agent.newTool": { es: "Nueva Herramienta", en: "New Tool", pt: "Nova Ferramenta" },
  "agent.toolsDesc": {
    es: "Crea scripts HTTP o NodeJS para extender las capacidades del agente",
    en: "Create HTTP or NodeJS scripts to extend agent capabilities",
    pt: "Crie scripts HTTP ou NodeJS para estender as capacidades do agente",
  },
  "agent.lastEdit": { es: "Última edición hace", en: "Last edit", pt: "Última edição há" },
  "agent.minutes": { es: "min", en: "min", pt: "min" },
  "agent.configure": { es: "Configurar", en: "Configure", pt: "Configurar" },
  "agent.save": { es: "Guardar", en: "Save", pt: "Salvar" },
  "agent.name": { es: "Nombre del Agente", en: "Agent Name", pt: "Nome do Agente" },
  "agent.description": { es: "Descripción", en: "Description", pt: "Descrição" },
  "agent.maxTokens": { es: "Max Tokens", en: "Max Tokens", pt: "Max Tokens" },
  "agent.connect": { es: "Conectar", en: "Connect", pt: "Conectar" },
  "agent.processed": { es: "Procesado", en: "Processed", pt: "Processado" },
  "agent.processing": { es: "Procesando...", en: "Processing...", pt: "Processando..." },
  "agent.uploadFiles": {
    es: "Sube archivos para entrenar tu agente con información específica",
    en: "Upload files to train your agent with specific information",
    pt: "Envie arquivos para treinar seu agente com informações específicas",
  },
  "agent.dragDropFiles": {
    es: "Arrastra archivos aquí o toca para seleccionar",
    en: "Drag files here or tap to select",
    pt: "Arraste arquivos aqui ou toque para selecionar",
  },
  "agent.supportedFormats": {
    es: "PDF, TXT, MD, CSV hasta 10MB",
    en: "PDF, TXT, MD, CSV up to 10MB",
    pt: "PDF, TXT, MD, CSV até 10MB",
  },
  "agent.generalConfig": { es: "Configuración General", en: "General Configuration", pt: "Configuração Geral" },
  "agent.toolActive": { es: "Activa", en: "Active", pt: "Ativa" },
  "agent.toolInactive": { es: "Inactiva", en: "Inactive", pt: "Inativa" },

  // Create Agent Dialog
  "createAgent.title": { es: "Crear Nuevo Agente", en: "Create New Agent", pt: "Criar Novo Agente" },
  "createAgent.subtitle": {
    es: "Configura tu nuevo agente de IA",
    en: "Configure your new AI agent",
    pt: "Configure seu novo agente de IA",
  },
  "createAgent.avatar": { es: "Avatar del Agente", en: "Agent Avatar", pt: "Avatar do Agente" },
  "createAgent.uploadPhoto": { es: "Subir foto", en: "Upload photo", pt: "Enviar foto" },
  "createAgent.name": { es: "Nombre del Agente", en: "Agent Name", pt: "Nome do Agente" },
  "createAgent.namePlaceholder": {
    es: "Ej: Asistente de Ventas",
    en: "Ex: Sales Assistant",
    pt: "Ex: Assistente de Vendas",
  },
  "createAgent.description": { es: "Descripción", en: "Description", pt: "Descrição" },
  "createAgent.descriptionPlaceholder": {
    es: "¿Qué hace este agente?",
    en: "What does this agent do?",
    pt: "O que este agente faz?",
  },
  "createAgent.provider": { es: "Proveedor", en: "Provider", pt: "Provedor" },
  "createAgent.selectProvider": { es: "Selecciona un proveedor", en: "Select a provider", pt: "Selecione um provedor" },
  "createAgent.apiKey": { es: "API Key", en: "API Key", pt: "API Key" },
  "createAgent.selectKey": { es: "Selecciona una key", en: "Select a key", pt: "Selecione uma key" },
  "createAgent.model": { es: "Modelo", en: "Model", pt: "Modelo" },
  "createAgent.selectModel": { es: "Selecciona un modelo", en: "Select a model", pt: "Selecione um modelo" },
  "createAgent.cancel": { es: "Cancelar", en: "Cancel", pt: "Cancelar" },
  "createAgent.create": { es: "Crear Agente", en: "Create Agent", pt: "Criar Agente" },

  // Connections
  "connections.title": { es: "Conexiones", en: "Connections", pt: "Conexões" },
  "connections.subtitle": {
    es: "Conecta tus canales de comunicación",
    en: "Connect your communication channels",
    pt: "Conecte seus canais de comunicação",
  },
  "connections.connect": { es: "Conectar", en: "Connect", pt: "Conectar" },
  "connections.connected": { es: "Conectado", en: "Connected", pt: "Conectado" },
  "connections.disconnect": { es: "Desconectar", en: "Disconnect", pt: "Desconectar" },

  // Keys
  "keys.title": { es: "API Keys", en: "API Keys", pt: "API Keys" },
  "keys.subtitle": {
    es: "Gestiona tus claves de API de proveedores de IA",
    en: "Manage your AI provider API keys",
    pt: "Gerencie suas chaves de API de provedores de IA",
  },
  "keys.add": { es: "Agregar Key", en: "Add Key", pt: "Adicionar Key" },
  "keys.addNew": { es: "Agregar Nueva API Key", en: "Add New API Key", pt: "Adicionar Nova API Key" },
  "keys.provider": { es: "Proveedor", en: "Provider", pt: "Provedor" },
  "keys.selectProvider": { es: "Selecciona un proveedor", en: "Select a provider", pt: "Selecione um provedor" },
  "keys.name": { es: "Nombre de la Key", en: "Key Name", pt: "Nome da Key" },
  "keys.namePlaceholder": { es: "Ej: Key para WhatsApp", en: "Ex: WhatsApp Key", pt: "Ex: Key para WhatsApp" },
  "keys.apiKey": { es: "API Key", en: "API Key", pt: "API Key" },
  "keys.apiKeyPlaceholder": { es: "Pega tu API key aquí", en: "Paste your API key here", pt: "Cole sua API key aqui" },
  "keys.cancel": { es: "Cancelar", en: "Cancel", pt: "Cancelar" },
  "keys.save": { es: "Guardar Key", en: "Save Key", pt: "Salvar Key" },
  "keys.delete": { es: "Eliminar", en: "Delete", pt: "Excluir" },
  "keys.hidden": { es: "Key oculta por seguridad", en: "Key hidden for security", pt: "Key oculta por segurança" },
  "keys.createdAt": { es: "Creada el", en: "Created on", pt: "Criada em" },

  // Messages
  "messages.title": { es: "Mensajes", en: "Messages", pt: "Mensagens" },
  "messages.search": { es: "Buscar conversaciones...", en: "Search conversations...", pt: "Buscar conversas..." },
  "messages.selectChat": { es: "Selecciona un chat", en: "Select a chat", pt: "Selecione um chat" },
  "messages.selectChatDesc": {
    es: "Elige una conversación de la lista para ver los mensajes",
    en: "Choose a conversation from the list to see messages",
    pt: "Escolha uma conversa da lista para ver as mensagens",
  },
  "messages.typeMessage": { es: "Escribe un mensaje...", en: "Type a message...", pt: "Digite uma mensagem..." },
  "messages.send": { es: "Enviar", en: "Send", pt: "Enviar" },
  "messages.back": { es: "Volver", en: "Back", pt: "Voltar" },

  // Tools
  "tools.title": { es: "Herramientas", en: "Tools", pt: "Ferramentas" },
  "tools.subtitle": {
    es: "Crea y gestiona herramientas para tus agentes",
    en: "Create and manage tools for your agents",
    pt: "Crie e gerencie ferramentas para seus agentes",
  },
  "tools.create": { es: "Crear Herramienta", en: "Create Tool", pt: "Criar Ferramenta" },
  "tools.selectType": {
    es: "Selecciona el tipo de herramienta",
    en: "Select tool type",
    pt: "Selecione o tipo de ferramenta",
  },
  "tools.http": { es: "HTTP Request", en: "HTTP Request", pt: "HTTP Request" },
  "tools.httpDesc": {
    es: "Realiza peticiones a APIs externas",
    en: "Make requests to external APIs",
    pt: "Faça requisições para APIs externas",
  },
  "tools.nodejs": { es: "NodeJS Script", en: "NodeJS Script", pt: "Script NodeJS" },
  "tools.nodejsDesc": {
    es: "Ejecuta código JavaScript personalizado",
    en: "Run custom JavaScript code",
    pt: "Execute código JavaScript personalizado",
  },
  "tools.whatsapp": { es: "Send WhatsApp", en: "Send WhatsApp", pt: "Enviar WhatsApp" },
  "tools.whatsappDesc": {
    es: "Envía mensajes de WhatsApp automáticamente",
    en: "Send WhatsApp messages automatically",
    pt: "Envie mensagens do WhatsApp automaticamente",
  },

  // Tool Type Selector
  "toolSelector.title": {
    es: "Selecciona el tipo de herramienta",
    en: "Select tool type",
    pt: "Selecione o tipo de ferramenta",
  },
  "toolSelector.subtitle": {
    es: "Elige qué tipo de herramienta quieres crear para tu agente",
    en: "Choose what type of tool you want to create for your agent",
    pt: "Escolha que tipo de ferramenta você quer criar para seu agente",
  },
  "toolSelector.http": { es: "HTTP Request", en: "HTTP Request", pt: "HTTP Request" },
  "toolSelector.httpDesc": {
    es: "Realiza llamadas HTTP a APIs externas",
    en: "Make HTTP calls to external APIs",
    pt: "Faça chamadas HTTP para APIs externas",
  },
  "toolSelector.nodejs": { es: "NodeJS Script", en: "NodeJS Script", pt: "Script NodeJS" },
  "toolSelector.nodejsDesc": {
    es: "Ejecuta código JavaScript personalizado",
    en: "Run custom JavaScript code",
    pt: "Execute código JavaScript personalizado",
  },
  "toolSelector.whatsapp": { es: "Send WhatsApp", en: "Send WhatsApp", pt: "Enviar WhatsApp" },
  "toolSelector.whatsappDesc": {
    es: "Envía mensajes por WhatsApp",
    en: "Send messages via WhatsApp",
    pt: "Envie mensagens via WhatsApp",
  },
  "toolSelector.continue": { es: "Continuar", en: "Continue", pt: "Continuar" },

  // HTTP Tool
  "httpTool.title": { es: "Nueva Herramienta HTTP", en: "New HTTP Tool", pt: "Nova Ferramenta HTTP" },
  "httpTool.back": { es: "Volver", en: "Back", pt: "Voltar" },
  "httpTool.name": { es: "Nombre de la Herramienta", en: "Tool Name", pt: "Nome da Ferramenta" },
  "httpTool.namePlaceholder": { es: "Ej: Obtener clima", en: "Ex: Get weather", pt: "Ex: Obter clima" },
  "httpTool.description": { es: "Descripción", en: "Description", pt: "Descrição" },
  "httpTool.descriptionPlaceholder": {
    es: "¿Qué hace esta herramienta?",
    en: "What does this tool do?",
    pt: "O que esta ferramenta faz?",
  },
  "httpTool.method": { es: "Método", en: "Method", pt: "Método" },
  "httpTool.url": { es: "URL", en: "URL", pt: "URL" },
  "httpTool.urlPlaceholder": {
    es: "https://api.example.com/endpoint",
    en: "https://api.example.com/endpoint",
    pt: "https://api.example.com/endpoint",
  },
  "httpTool.headers": { es: "Headers", en: "Headers", pt: "Headers" },
  "httpTool.addHeader": { es: "Agregar Header", en: "Add Header", pt: "Adicionar Header" },
  "httpTool.queryParams": { es: "Query Parameters", en: "Query Parameters", pt: "Query Parameters" },
  "httpTool.addParam": { es: "Agregar Parámetro", en: "Add Parameter", pt: "Adicionar Parâmetro" },
  "httpTool.body": { es: "Body (JSON)", en: "Body (JSON)", pt: "Body (JSON)" },
  "httpTool.test": { es: "Probar Request", en: "Test Request", pt: "Testar Request" },
  "httpTool.testing": { es: "Probando...", en: "Testing...", pt: "Testando..." },
  "httpTool.response": { es: "Respuesta", en: "Response", pt: "Resposta" },
  "httpTool.cancel": { es: "Cancelar", en: "Cancel", pt: "Cancelar" },
  "httpTool.save": { es: "Guardar Herramienta", en: "Save Tool", pt: "Salvar Ferramenta" },
  "httpTool.subtitle": {
    es: "Configura una llamada HTTP externa",
    en: "Configure an external HTTP call",
    pt: "Configure uma chamada HTTP externa",
  },
  "httpTool.basicInfo": { es: "Información Básica", en: "Basic Information", pt: "Informação Básica" },
  "httpTool.requestConfig": {
    es: "Configuración de Request",
    en: "Request Configuration",
    pt: "Configuração de Request",
  },
  "httpTool.add": { es: "Agregar", en: "Add", pt: "Adicionar" },
  "httpTool.testRequest": { es: "Probar Request", en: "Test Request", pt: "Testar Request" },
  "httpTool.executing": { es: "Ejecutando...", en: "Executing...", pt: "Executando..." },
  "httpTool.success": { es: "Éxito", en: "Success", pt: "Sucesso" },
  "httpTool.error": { es: "Error", en: "Error", pt: "Erro" },

  // Logs
  "logs.title": { es: "Logs", en: "Logs", pt: "Logs" },
  "logs.subtitle": {
    es: "Registro de actividad de tus agentes",
    en: "Activity logs of your agents",
    pt: "Registro de atividade dos seus agentes",
  },
  "logs.all": { es: "Todos", en: "All", pt: "Todos" },
  "logs.info": { es: "Info", en: "Info", pt: "Info" },
  "logs.warning": { es: "Warning", en: "Warning", pt: "Warning" },
  "logs.error": { es: "Error", en: "Error", pt: "Erro" },
  "logs.success": { es: "Success", en: "Success", pt: "Sucesso" },

  // Pricing
  "pricing.title": { es: "Elige tu Plan", en: "Choose your Plan", pt: "Escolha seu Plano" },
  "pricing.subtitle": {
    es: "Escala tus agentes de IA con el plan perfecto para ti",
    en: "Scale your AI agents with the perfect plan for you",
    pt: "Escale seus agentes de IA com o plano perfeito para você",
  },
  "pricing.monthly": { es: "/mes", en: "/month", pt: "/mês" },
  "pricing.current": { es: "Plan Actual", en: "Current Plan", pt: "Plano Atual" },
  "pricing.select": { es: "Seleccionar", en: "Select", pt: "Selecionar" },
  "pricing.popular": { es: "Más Popular", en: "Most Popular", pt: "Mais Popular" },

  // Auth
  "auth.login": { es: "Iniciar Sesión", en: "Sign In", pt: "Entrar" },
  "auth.register": { es: "Crear Cuenta", en: "Sign Up", pt: "Criar Conta" },
  "auth.email": { es: "Email", en: "Email", pt: "Email" },
  "auth.password": { es: "Contraseña", en: "Password", pt: "Senha" },
  "auth.confirmPassword": { es: "Confirmar Contraseña", en: "Confirm Password", pt: "Confirmar Senha" },
  "auth.name": { es: "Nombre completo", en: "Full name", pt: "Nome completo" },
  "auth.forgotPassword": { es: "¿Olvidaste tu contraseña?", en: "Forgot password?", pt: "Esqueceu a senha?" },
  "auth.noAccount": { es: "¿No tienes cuenta?", en: "Don't have an account?", pt: "Não tem conta?" },
  "auth.hasAccount": { es: "¿Ya tienes cuenta?", en: "Already have an account?", pt: "Já tem conta?" },
  "auth.welcome": { es: "Bienvenido de nuevo", en: "Welcome back", pt: "Bem-vindo de volta" },
  "auth.welcomeSubtitle": {
    es: "Ingresa a tu cuenta para continuar",
    en: "Sign in to your account to continue",
    pt: "Entre na sua conta para continuar",
  },
  "auth.createAccount": { es: "Crea tu cuenta", en: "Create your account", pt: "Crie sua conta" },
  "auth.createAccountSubtitle": {
    es: "Comienza a crear agentes de IA hoy",
    en: "Start creating AI agents today",
    pt: "Comece a criar agentes de IA hoje",
  },

  // Common
  "common.save": { es: "Guardar", en: "Save", pt: "Salvar" },
  "common.cancel": { es: "Cancelar", en: "Cancel", pt: "Cancelar" },
  "common.delete": { es: "Eliminar", en: "Delete", pt: "Excluir" },
  "common.edit": { es: "Editar", en: "Edit", pt: "Editar" },
  "common.create": { es: "Crear", en: "Create", pt: "Criar" },
  "common.close": { es: "Cerrar", en: "Close", pt: "Fechar" },
  "common.loading": { es: "Cargando...", en: "Loading...", pt: "Carregando..." },
  "common.noResults": { es: "Sin resultados", en: "No results", pt: "Sem resultados" },
  "common.key": { es: "Clave", en: "Key", pt: "Chave" },
  "common.value": { es: "Valor", en: "Value", pt: "Valor" },
}

interface I18nContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string) => string
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("es")

  useEffect(() => {
    const saved = localStorage.getItem("locale") as Locale
    if (saved && ["es", "en", "pt"].includes(saved)) {
      setLocale(saved)
    }
  }, [])

  const handleSetLocale = (newLocale: Locale) => {
    setLocale(newLocale)
    localStorage.setItem("locale", newLocale)
  }

  const t = (key: string): string => {
    return translations[key]?.[locale] || key
  }

  return <I18nContext.Provider value={{ locale, setLocale: handleSetLocale, t }}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error("useI18n must be used within I18nProvider")
  }
  return context
}
