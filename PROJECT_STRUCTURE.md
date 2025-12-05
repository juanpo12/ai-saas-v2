# 🤖 AI Agents Platform - Documentación Completa del Proyecto

## 📋 Tabla de Contenidos
1. [Visión General](#visión-general)
2. [Arquitectura del Proyecto](#arquitectura-del-proyecto)
3. [Estructura de Carpetas](#estructura-de-carpetas)
4. [Sistema de Rutas](#sistema-de-rutas)
5. [Componentes Principales](#componentes-principales)
6. [Vistas y Funcionalidades](#vistas-y-funcionalidades)
7. [Sistema de Autenticación](#sistema-de-autenticación)
8. [Sistema de Planes y Pricing](#sistema-de-planes-y-pricing)
9. [Integraciones Planificadas](#integraciones-planificadas)
10. [Diseño y Estilos](#diseño-y-estilos)
11. [Tecnologías Utilizadas](#tecnologías-utilizadas)
12. [Flujos de Usuario](#flujos-de-usuario)

---

## 🎯 Visión General

**AI Agents Platform** es una plataforma SaaS moderna para crear, gestionar y desplegar agentes de inteligencia artificial. La aplicación permite a los usuarios:

- Crear y configurar agentes de IA personalizados
- Gestionar múltiples proveedores de IA (OpenAI, Anthropic, Google, etc.)
- Conectar canales de comunicación (WhatsApp, Gmail, Instagram)
- Administrar conversaciones y mensajes
- Crear herramientas personalizadas (HTTP requests, scripts NodeJS)
- Monitorear logs y actividad de los agentes

### Características Principales
- ✨ **Interfaz Dark Mode Minimalista** inspirada en Vercel/Replit/Notion
- 🚀 **Fluidez Extrema** con transiciones suaves y guardado automático
- 🎨 **Diseño Moderno** con tarjetas rounded-2xl y tipografía Inter
- 📱 **Responsive** adaptado a todos los dispositivos
- 🔐 **Sistema de Autenticación** con Supabase (planificado)
- 💳 **Sistema de Planes** (Free, VIP, Premium)

---

## 🏗️ Arquitectura del Proyecto

### Stack Tecnológico
- **Framework**: Next.js 15.5.4 (App Router)
- **React**: 19.1.0
- **TypeScript**: 5.x
- **Styling**: Tailwind CSS 4.1.9
- **UI Components**: shadcn/ui + Radix UI
- **Animaciones**: tw-animate-css
- **Forms**: React Hook Form + Zod
- **Analytics**: Vercel Analytics
- **Base de Datos**: Supabase (planificado)

### Patrón de Arquitectura
- **App Router de Next.js 15**: Utiliza el nuevo sistema de rutas basado en carpetas
- **Route Groups**: Separación lógica entre autenticación y dashboard
- **Server Components**: Por defecto, con Client Components donde sea necesario
- **Layouts Anidados**: Layouts específicos para cada sección

---

## 📁 Estructura de Carpetas

\`\`\`
ai-agents-platform/
├── app/                                    # Directorio principal de Next.js App Router
│   ├── (auth)/                            # Route Group: Páginas de autenticación
│   │   ├── layout.tsx                     # Layout sin sidebar para auth
│   │   ├── login/
│   │   │   └── page.tsx                   # Página de inicio de sesión
│   │   └── register/
│   │       └── page.tsx                   # Página de registro
│   │
│   ├── (dashboard)/                       # Route Group: Páginas del dashboard
│   │   ├── layout.tsx                     # Layout con sidebar y header
│   │   ├── page.tsx                       # Dashboard principal (home)
│   │   ├── agents/
│   │   │   └── page.tsx                   # Lista de agentes
│   │   ├── connections/
│   │   │   └── page.tsx                   # Gestión de conexiones (WhatsApp, Gmail, etc.)
│   │   ├── keys/
│   │   │   └── page.tsx                   # Gestión de API keys
│   │   ├── messages/
│   │   │   ├── layout.tsx                 # Layout especial con sidebar de chats
│   │   │   ├── page.tsx                   # Vista inicial de mensajes
│   │   │   └── [id]/
│   │   │       └── page.tsx               # Vista de conversación específica
│   │   ├── tools/
│   │   │   └── page.tsx                   # Lista de herramientas
│   │   ├── logs/
│   │   │   └── page.tsx                   # Logs del sistema
│   │   └── pricing/
│   │       └── page.tsx                   # Página de planes y pricing
│   │
│   ├── agents/
│   │   └── [id]/
│   │       └── tools/
│   │           └── http/
│   │               └── new/
│   │                   └── page.tsx       # Formulario de creación de HTTP tool
│   │
│   ├── messages/
│   │   └── loading.tsx                    # Loading state para mensajes
│   │
│   ├── layout.tsx                         # Root layout (sin DashboardLayout)
│   └── globals.css                        # Estilos globales y variables CSS
│
├── components/                            # Componentes reutilizables
│   ├── dashboard-layout.tsx              # Layout principal con sidebar y header
│   ├── agents-view.tsx                   # Vista de lista de agentes
│   ├── agent-editor.tsx                  # Editor completo de agente con tabs
│   ├── create-agent-dialog.tsx           # Modal para crear nuevo agente
│   ├── tool-type-selector-dialog.tsx     # Modal para seleccionar tipo de herramienta
│   ├── theme-provider.tsx                # Provider de tema dark/light
│   │
│   └── ui/                               # Componentes UI de shadcn
│       ├── accordion.tsx
│       ├── alert-dialog.tsx
│       ├── alert.tsx
│       ├── avatar.tsx
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── checkbox.tsx
│       ├── dialog.tsx
│       ├── dropdown-menu.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── select.tsx
│       ├── separator.tsx
│       ├── slider.tsx
│       ├── switch.tsx
│       ├── tabs.tsx
│       ├── textarea.tsx
│       ├── toast.tsx
│       ├── tooltip.tsx
│       └── ... (más componentes UI)
│
├── hooks/                                # Custom React hooks
│   ├── use-mobile.ts                     # Hook para detectar dispositivos móviles
│   └── use-toast.ts                      # Hook para sistema de notificaciones
│
├── lib/                                  # Utilidades y helpers
│   └── utils.ts                          # Funciones utilitarias (cn, etc.)
│
├── public/                               # Archivos estáticos
│   ├── placeholder-logo.png
│   ├── placeholder-logo.svg
│   ├── placeholder-user.jpg
│   └── placeholder.svg
│
├── next.config.mjs                       # Configuración de Next.js
├── package.json                          # Dependencias del proyecto
├── tsconfig.json                         # Configuración de TypeScript
├── postcss.config.mjs                    # Configuración de PostCSS
└── components.json                       # Configuración de shadcn/ui
\`\`\`

---

## 🛣️ Sistema de Rutas

### Route Groups
El proyecto utiliza **Route Groups** de Next.js para organizar las rutas sin afectar la URL:

#### `(auth)` - Rutas de Autenticación
- **Layout**: Sin sidebar, solo contenido centrado
- **Rutas**:
  - `/login` - Inicio de sesión
  - `/register` - Registro de usuario

#### `(dashboard)` - Rutas del Dashboard
- **Layout**: Con sidebar fija y header superior
- **Rutas**:
  - `/` - Dashboard principal
  - `/agents` - Lista de agentes
  - `/connections` - Gestión de conexiones
  - `/keys` - Gestión de API keys
  - `/messages` - Sistema de mensajería
  - `/messages/[id]` - Conversación específica
  - `/tools` - Lista de herramientas
  - `/logs` - Logs del sistema
  - `/pricing` - Planes y pricing

### Rutas Especiales

#### Creación de Herramientas HTTP
- **Ruta**: `/agents/[id]/tools/http/new`
- **Descripción**: Formulario completo para crear HTTP requests
- **Características**:
  - Selección de método HTTP (GET, POST, PUT, DELETE, PATCH, etc.)
  - Configuración de URL y query parameters
  - Headers personalizables
  - Body JSON para métodos POST/PUT/PATCH
  - Botón de prueba de request

---

## 🧩 Componentes Principales

### 1. `dashboard-layout.tsx`
**Ubicación**: `components/dashboard-layout.tsx`

**Descripción**: Layout principal del dashboard que envuelve todas las páginas autenticadas.

**Características**:
- **Sidebar fija** con navegación principal
- **Header superior** con:
  - Búsqueda global (Cmd+K)
  - Botón "Nuevo Agente"
  - Avatar de usuario
- **Sección de plan** en el sidebar:
  - Muestra plan actual (Free/VIP/Premium)
  - Indicador de uso de recursos
  - Botón "Mejorar Plan"
- **Navegación activa** con indicadores visuales

**Secciones del Sidebar**:
1. 🤖 Agentes
2. 🔗 Conexiones
3. 🔑 Keys
4. 💬 Mensajes
5. 🛠️ Herramientas
6. 📊 Logs

---

### 2. `create-agent-dialog.tsx`
**Ubicación**: `components/create-agent-dialog.tsx`

**Descripción**: Modal elegante para crear nuevos agentes de IA.

**Campos del Formulario**:
1. **Avatar del Agente**:
   - Upload de imagen con preview
   - Placeholder con icono de bot
   - Drag & drop o click para subir

2. **Información Básica**:
   - Nombre del agente (requerido)
   - Descripción (opcional)

3. **Configuración de IA**:
   - **Proveedor**: Selección basada en keys existentes
     - OpenAI
     - Anthropic
     - Google
     - Otros proveedores configurados
   - **Key Específica**: Dropdown con keys del proveedor seleccionado
     - Muestra nombre personalizado de la key
     - Icono del proveedor
   - **Modelo**: Modelos disponibles según el proveedor
     - OpenAI: GPT-4, GPT-4 Turbo, GPT-3.5
     - Anthropic: Claude 3 Opus, Claude 3 Sonnet
     - Google: Gemini Pro, Gemini Ultra

4. **Configuración Avanzada**:
   - **Temperatura**: Slider de 0 a 1
     - 0-0.3: Preciso
     - 0.4-0.7: Balanceado
     - 0.8-1.0: Creativo

5. **System Prompt** (opcional):
   - Editor de texto con sintaxis highlighting
   - Placeholder con ejemplo

**Flujo de Creación**:
1. Usuario hace clic en "Nuevo Agente"
2. Se abre el modal con animación suave
3. Usuario completa los campos requeridos
4. Botón "Crear Agente" se habilita cuando todo está completo
5. Al crear, se cierra el modal y se redirige al editor del agente

---

### 3. `agent-editor.tsx`
**Ubicación**: `components/agent-editor.tsx`

**Descripción**: Editor completo de agente con sistema de tabs.

**Tabs Disponibles**:

#### Tab 1: Prompt
- **Editor tipo código** con sintaxis highlighting
- **Guardado automático** con indicador visual
- **Variables disponibles**: Lista de variables que puede usar
- **Preview en tiempo real** (opcional)

#### Tab 2: Knowledge
- **Drag & Drop de archivos**:
  - Documentos PDF
  - Archivos de texto
  - URLs para scraping
- **Lista de archivos subidos**:
  - Nombre del archivo
  - Tamaño
  - Estado de embeddings:
    - ⏳ Procesando
    - ✅ Completado
    - ❌ Error
- **Botón "Agregar Conocimiento"**

#### Tab 3: Configuración
- **Información del Agente**:
  - Nombre
  - Descripción
  - Avatar
- **Configuración del Modelo**:
  - Proveedor
  - Key
  - Modelo
  - Temperatura
  - Max tokens
- **Canales de Comunicación**:
  - WhatsApp (vía Unipile)
  - Gmail
  - Instagram
  - Telegram
  - Otros
- **Comportamiento**:
  - Respuesta automática
  - Horario de actividad
  - Idioma preferido

#### Tab 4: Herramientas
- **Lista de herramientas configuradas**:
  - Nombre
  - Tipo (HTTP, NodeJS, WhatsApp)
  - Estado (Activa/Inactiva)
  - Última ejecución
- **Botón "Nueva Herramienta"**:
  - Abre modal de selección de tipo
  - Opciones:
    - 🌐 HTTP Request
    - 💻 NodeJS Script
    - 📱 Send WhatsApp

---

### 4. `tool-type-selector-dialog.tsx`
**Ubicación**: `components/tool-type-selector-dialog.tsx`

**Descripción**: Modal para seleccionar el tipo de herramienta a crear.

**Opciones**:
1. **HTTP Request**:
   - Icono: 🌐
   - Descripción: "Realiza peticiones HTTP a APIs externas"
   - Acción: Navega a `/agents/[id]/tools/http/new`

2. **NodeJS Script**:
   - Icono: 💻
   - Descripción: "Ejecuta código JavaScript personalizado"
   - Acción: Abre editor de código inline

3. **Send WhatsApp**:
   - Icono: 📱
   - Descripción: "Envía mensajes de WhatsApp automáticamente"
   - Acción: Abre configurador de WhatsApp

---

## 📱 Vistas y Funcionalidades

### 1. Dashboard Principal (`/`)
**Archivo**: `app/(dashboard)/page.tsx`

**Contenido**:
- **Métricas principales**:
  - Total de agentes
  - Mensajes procesados hoy
  - Conexiones activas
  - Uso de API
- **Gráficos**:
  - Actividad de agentes (últimos 7 días)
  - Distribución de mensajes por canal
- **Agentes recientes**:
  - Lista de últimos 5 agentes creados/editados
  - Estado (Activo/Pausado)
  - Última actividad
- **Acciones rápidas**:
  - Crear nuevo agente
  - Ver todos los mensajes
  - Configurar nueva conexión

---

### 2. Agentes (`/agents`)
**Archivo**: `app/(dashboard)/agents/page.tsx`

**Contenido**:
- **Header**:
  - Título "Agentes"
  - Botón "+ Crear Agente"
  - Filtros (Todos, Activos, Pausados)
  - Búsqueda

- **Lista de Agentes** (Grid de tarjetas):
  - **Información por tarjeta**:
    - Avatar del agente
    - Nombre
    - Descripción corta
    - Estado (Activo/Pausado)
    - Proveedor y modelo
    - Métricas:
      - Mensajes procesados
      - Última actividad
      - Tasa de éxito
    - Botones de acción:
      - Editar
      - Pausar/Activar
      - Eliminar

- **Estados visuales**:
  - Activo: Badge verde
  - Pausado: Badge gris
  - Error: Badge rojo

**Interacciones**:
- Click en tarjeta → Abre editor del agente
- Click en "Crear Agente" → Abre modal de creación
- Hover → Muestra acciones adicionales

---

### 3. Conexiones (`/connections`)
**Archivo**: `app/(dashboard)/connections/page.tsx`

**Descripción**: Gestión de integraciones con canales de comunicación.

**Contenido**:
- **Header**:
  - Título "Conexiones"
  - Botón "+ Nueva Conexión"

- **Grid de Conexiones Disponibles**:
  
  #### WhatsApp
  - **Icono**: Logo de WhatsApp
  - **Estado**: Conectado/Desconectado
  - **Información**:
    - Número conectado
    - Mensajes enviados hoy
    - Última sincronización
  - **Acciones**:
    - Configurar
    - Desconectar
    - Ver logs

  #### Gmail
  - **Icono**: Logo de Gmail
  - **Estado**: Conectado/Desconectado
  - **Información**:
    - Cuenta conectada
    - Emails procesados
    - Última sincronización
  - **Acciones**:
    - Configurar
    - Desconectar
    - Ver logs

  #### Instagram
  - **Icono**: Logo de Instagram
  - **Estado**: Conectado/Desconectado
  - **Información**:
    - Cuenta conectada
    - Mensajes directos procesados
    - Última sincronización
  - **Acciones**:
    - Configurar
    - Desconectar
    - Ver logs

  #### Telegram
  - **Icono**: Logo de Telegram
  - **Estado**: Disponible (no conectado)
  - **Acción**: Conectar

  #### Slack
  - **Icono**: Logo de Slack
  - **Estado**: Disponible (no conectado)
  - **Acción**: Conectar

  #### Discord
  - **Icono**: Logo de Discord
  - **Estado**: Disponible (no conectado)
  - **Acción**: Conectar

**Flujo de Conexión**:
1. Usuario hace clic en "Conectar"
2. Se abre modal con instrucciones
3. Usuario autoriza la conexión (OAuth o API key)
4. Sistema verifica la conexión
5. Conexión aparece como "Conectada"

---

### 4. Keys (`/keys`)
**Archivo**: `app/(dashboard)/keys/page.tsx`

**Descripción**: Gestión de API keys de proveedores de IA.

**Contenido**:
- **Header**:
  - Título "API Keys"
  - Botón "+ Nueva Key"

- **Lista de Keys Guardadas**:
  - **Información por key**:
    - Icono del proveedor (OpenAI, Anthropic, Google, etc.)
    - Nombre personalizado (ej: "Key para WhatsApp")
    - Proveedor
    - Fecha de creación
    - Última vez usada
    - Estado (Activa/Inactiva)
  - **Acciones**:
    - Editar nombre
    - Desactivar/Activar
    - Eliminar
  - **Seguridad**:
    - ❌ NO se puede copiar la key
    - ❌ NO se puede ver la key
    - Solo se muestra: `sk-...****...****`

**Modal "Nueva Key"**:
1. **Seleccionar Proveedor**:
   - OpenAI
   - Anthropic
   - Google AI
   - Cohere
   - Hugging Face
   - Otros

2. **Nombre Personalizado**:
   - Input de texto
   - Ejemplo: "Key para WhatsApp", "Key de producción"

3. **API Key**:
   - Input de texto (tipo password)
   - Validación en tiempo real
   - Mensaje: "Esta key se guardará encriptada y no podrás verla después"

4. **Botón "Guardar Key"**:
   - Valida la key con el proveedor
   - Guarda encriptada en la base de datos
   - Cierra el modal

**Seguridad**:
- Keys encriptadas en la base de datos
- No se pueden recuperar después de guardar
- Solo se pueden eliminar o reemplazar

---

### 5. Mensajes (`/messages`)
**Archivo**: `app/(dashboard)/messages/page.tsx` y `app/(dashboard)/messages/[id]/page.tsx`

**Descripción**: Sistema de mensajería con layout especial.

**Layout Especial** (`app/(dashboard)/messages/layout.tsx`):
- **Sidebar de Chats** (izquierda, 320px):
  - Búsqueda de conversaciones
  - Lista de chats:
    - Avatar del contacto
    - Nombre
    - Último mensaje (preview)
    - Timestamp
    - Badge de mensajes no leídos
  - Filtros:
    - Todos
    - No leídos
    - Archivados
  - Scroll infinito

- **Área de Conversación** (derecha, resto del espacio):
  - Header de conversación:
    - Avatar y nombre del contacto
    - Estado (En línea/Última vez)
    - Canal (WhatsApp, Gmail, etc.)
    - Acciones (Archivar, Marcar como leído)
  - Mensajes:
    - Burbujas de chat
    - Timestamp
    - Estado de entrega (enviado, entregado, leído)
    - Respuestas del agente marcadas
  - Input de respuesta:
    - Textarea
    - Botón enviar
    - Opciones de formato

**Vista Inicial** (`/messages`):
- Mensaje de bienvenida
- "Selecciona una conversación para comenzar"
- Ilustración

**Vista de Conversación** (`/messages/[id]`):
- Conversación completa cargada
- Scroll automático al último mensaje
- Indicador de "escribiendo..."
- Carga de mensajes antiguos al hacer scroll arriba

---

### 6. Herramientas (`/tools`)
**Archivo**: `app/(dashboard)/tools/page.tsx`

**Contenido**:
- **Header**:
  - Título "Herramientas"
  - Botón "+ Nueva Herramienta"

- **Lista de Herramientas**:
  - **Información por herramienta**:
    - Icono según tipo (HTTP, NodeJS, WhatsApp)
    - Nombre
    - Tipo
    - Descripción
    - Agentes que la usan
    - Última ejecución
    - Tasa de éxito
  - **Acciones**:
    - Editar
    - Duplicar
    - Eliminar
    - Ver logs

- **Filtros**:
  - Todas
  - HTTP Requests
  - NodeJS Scripts
  - WhatsApp

---

### 7. Logs (`/logs`)
**Archivo**: `app/(dashboard)/logs/page.tsx`

**Contenido**:
- **Header**:
  - Título "Logs"
  - Filtros:
    - Por agente
    - Por tipo (Info, Warning, Error)
    - Por fecha
  - Búsqueda

- **Tabla de Logs**:
  - **Columnas**:
    - Timestamp
    - Nivel (Info/Warning/Error)
    - Agente
    - Mensaje
    - Detalles
  - **Colores**:
    - Info: Azul
    - Warning: Amarillo
    - Error: Rojo
  - **Acciones**:
    - Ver detalles completos
    - Exportar logs

- **Paginación**:
  - 50 logs por página
  - Navegación entre páginas

---

### 8. Pricing (`/pricing`)
**Archivo**: `app/(dashboard)/pricing/page.tsx`

**Descripción**: Página de planes y precios.

**Contenido**:
- **Header**:
  - Título "Elige tu plan"
  - Subtítulo: "Escala tu negocio con IA"
  - Toggle: Mensual/Anual (20% descuento)

- **Grid de Planes** (3 columnas):

  #### Plan Free
  - **Precio**: $0/mes
  - **Características**:
    - ✅ 1 agente web
    - ✅ 100 mensajes/mes
    - ✅ 1 conexión
    - ✅ Herramientas básicas
    - ✅ Soporte por email
    - ❌ Knowledge base
    - ❌ Herramientas avanzadas
    - ❌ Prioridad en soporte
  - **Botón**: "Plan Actual" (si es el plan actual)
  - **Badge**: "Gratis"

  #### Plan VIP
  - **Precio**: $29/mes ($24/mes anual)
  - **Características**:
    - ✅ 5 agentes
    - ✅ 5,000 mensajes/mes
    - ✅ 5 conexiones
    - ✅ Herramientas avanzadas
    - ✅ Knowledge base (100MB)
    - ✅ Soporte prioritario
    - ✅ Analytics avanzados
    - ❌ Agentes ilimitados
    - ❌ Soporte 24/7
  - **Botón**: "Mejorar a VIP"
  - **Badge**: "Popular"

  #### Plan Premium
  - **Precio**: $99/mes ($79/mes anual)
  - **Características**:
    - ✅ Agentes ilimitados
    - ✅ Mensajes ilimitados
    - ✅ Conexiones ilimitadas
    - ✅ Todas las herramientas
    - ✅ Knowledge base ilimitada
    - ✅ Soporte 24/7
    - ✅ Analytics avanzados
    - ✅ API access
    - ✅ White label
    - ✅ Onboarding personalizado
  - **Botón**: "Mejorar a Premium"
  - **Badge**: "Mejor valor"

- **Comparación Detallada**:
  - Tabla con todas las características
  - Comparación lado a lado

- **FAQ**:
  - Preguntas frecuentes sobre planes
  - Información de facturación

---

### 9. Formulario HTTP Tool (`/agents/[id]/tools/http/new`)
**Archivo**: `app/agents/[id]/tools/http/new/page.tsx`

**Descripción**: Formulario completo para crear herramientas de HTTP request.

**Contenido**:

#### Sección 1: Información Básica
- **Nombre de la Herramienta**:
  - Input de texto
  - Ejemplo: "Obtener clima", "Buscar productos"
- **Descripción**:
  - Textarea
  - Explicación de qué hace la herramienta

#### Sección 2: Configuración HTTP
- **Método HTTP**:
  - Dropdown con todos los métodos:
    - GET
    - POST
    - PUT
    - DELETE
    - PATCH
    - HEAD
    - OPTIONS
  - Icono de color según método

- **URL del Endpoint**:
  - Input de texto
  - Validación de URL
  - Ejemplo: `https://api.example.com/v1/users`

#### Sección 3: Query Parameters
- **Lista dinámica de parámetros**:
  - Botón "+ Agregar Parámetro"
  - Cada parámetro tiene:
    - Key (nombre del parámetro)
    - Value (valor del parámetro)
    - Botón eliminar
  - Ejemplo:
    - `city` = `Madrid`
    - `units` = `metric`

#### Sección 4: Headers
- **Lista dinámica de headers**:
  - Botón "+ Agregar Header"
  - Cada header tiene:
    - Key (nombre del header)
    - Value (valor del header)
    - Botón eliminar
  - Headers comunes sugeridos:
    - `Content-Type`
    - `Authorization`
    - `Accept`
  - Ejemplo:
    - `Content-Type` = `application/json`
    - `Authorization` = `Bearer {{API_KEY}}`

#### Sección 5: Body (solo para POST, PUT, PATCH)
- **Editor JSON**:
  - Textarea con sintaxis highlighting
  - Validación de JSON en tiempo real
  - Ejemplo:
    \`\`\`json
    {
      "name": "{{user_name}}",
      "email": "{{user_email}}"
    }
    \`\`\`
- **Variables disponibles**:
  - Lista de variables que puede usar
  - Formato: `{{variable_name}}`

#### Sección 6: Autenticación
- **Tipo de autenticación**:
  - Ninguna
  - API Key
  - Bearer Token
  - Basic Auth
  - OAuth 2.0
- **Campos según tipo seleccionado**

#### Sección 7: Respuesta
- **Mapeo de respuesta**:
  - Definir qué campos de la respuesta usar
  - JSONPath para extraer datos
  - Ejemplo: `$.data.temperature`

#### Sección 8: Prueba
- **Botón "Probar Request"**:
  - Ejecuta la request con los datos configurados
  - Muestra la respuesta:
    - Status code (con color)
    - Headers de respuesta
    - Body de respuesta (formateado)
    - Tiempo de respuesta
  - Estados:
    - ✅ Éxito (200-299)
    - ⚠️ Redirección (300-399)
    - ❌ Error del cliente (400-499)
    - ❌ Error del servidor (500-599)

#### Botones de Acción
- **Guardar**: Guarda la herramienta
- **Guardar y Probar**: Guarda y ejecuta una prueba
- **Cancelar**: Vuelve a la lista de herramientas

---

## 🔐 Sistema de Autenticación

### Login (`/login`)
**Archivo**: `app/(auth)/login/page.tsx`

**Diseño**:
- **Layout centrado** sin sidebar
- **Fondo dark** (#0D0F12)
- **Tarjeta de login** con rounded-2xl

**Contenido**:
- **Logo** de la plataforma
- **Título**: "Bienvenido de nuevo"
- **Formulario**:
  - Email
  - Password
  - Checkbox "Recordarme"
  - Link "¿Olvidaste tu contraseña?"
- **Botón "Iniciar Sesión"**
- **Separador**: "o continúa con"
- **Botones de OAuth**:
  - Google
  - GitHub
- **Link**: "¿No tienes cuenta? Regístrate"

**Validaciones**:
- Email válido
- Password mínimo 8 caracteres
- Mensajes de error claros

**Integración con Supabase** (planificado):
- `supabase.auth.signInWithPassword()`
- Manejo de errores
- Redirección al dashboard

---

### Register (`/register`)
**Archivo**: `app/(auth)/register/page.tsx`

**Diseño**:
- Similar al login
- **Título**: "Crea tu cuenta"

**Contenido**:
- **Logo** de la plataforma
- **Formulario**:
  - Nombre completo
  - Email
  - Password
  - Confirmar password
  - Checkbox "Acepto los términos y condiciones"
- **Botón "Crear Cuenta"**
- **Separador**: "o continúa con"
- **Botones de OAuth**:
  - Google
  - GitHub
- **Link**: "¿Ya tienes cuenta? Inicia sesión"

**Validaciones**:
- Nombre no vacío
- Email válido y único
- Password:
  - Mínimo 8 caracteres
  - Al menos una mayúscula
  - Al menos un número
  - Al menos un carácter especial
- Passwords coinciden
- Términos aceptados

**Integración con Supabase** (planificado):
- `supabase.auth.signUp()`
- Email de verificación
- Redirección al dashboard

---

## 💳 Sistema de Planes y Pricing

### Planes Disponibles

#### 1. Plan Free
**Precio**: $0/mes

**Límites**:
- 1 agente web
- 100 mensajes/mes
- 1 conexión activa
- Herramientas básicas (HTTP requests)
- 10MB de knowledge base
- Soporte por email (48h respuesta)

**Ideal para**:
- Probar la plataforma
- Proyectos personales
- Prototipos

---

#### 2. Plan VIP
**Precio**: $29/mes ($24/mes anual)

**Límites**:
- 5 agentes
- 5,000 mensajes/mes
- 5 conexiones activas
- Todas las herramientas (HTTP, NodeJS, WhatsApp)
- 100MB de knowledge base
- Soporte prioritario (12h respuesta)
- Analytics avanzados
- Logs por 30 días

**Ideal para**:
- Pequeñas empresas
- Freelancers
- Startups

**Características adicionales**:
- Webhooks
- Integraciones avanzadas
- Personalización de respuestas

---

#### 3. Plan Premium
**Precio**: $99/mes ($79/mes anual)

**Límites**:
- Agentes ilimitados
- Mensajes ilimitados
- Conexiones ilimitadas
- Todas las herramientas
- Knowledge base ilimitada
- Soporte 24/7 (1h respuesta)
- Analytics avanzados
- Logs ilimitados
- API access
- White label
- Onboarding personalizado

**Ideal para**:
- Empresas medianas y grandes
- Agencias
- Casos de uso complejos

**Características adicionales**:
- SLA garantizado
- Servidor dedicado (opcional)
- Consultoría incluida
- Desarrollo de features personalizadas

---

### Gestión de Planes

**Upgrade de Plan**:
1. Usuario hace clic en "Mejorar Plan" en el sidebar
2. Navega a `/pricing`
3. Selecciona el plan deseado
4. Hace clic en "Mejorar a [Plan]"
5. Se abre checkout de Stripe (planificado)
6. Completa el pago
7. Plan se actualiza inmediatamente
8. Recibe email de confirmación

**Downgrade de Plan**:
- Se aplica al final del período de facturación
- Usuario mantiene acceso hasta el final del período
- Se notifica por email

**Cancelación**:
- Usuario puede cancelar en cualquier momento
- Mantiene acceso hasta el final del período pagado
- Datos se conservan por 30 días

---

## 🔌 Integraciones Planificadas

### 1. Supabase (Base de Datos y Auth)
**Estado**: Planificado

**Uso**:
- **Autenticación**:
  - Email/Password
  - OAuth (Google, GitHub)
  - Magic Links
- **Base de Datos**:
  - Usuarios
  - Agentes
  - Mensajes
  - Conversaciones
  - Keys (encriptadas)
  - Herramientas
  - Logs
- **Storage**:
  - Avatares de agentes
  - Archivos de knowledge base
  - Exports

**Tablas Principales**:
\`\`\`sql
-- users (manejada por Supabase Auth)
-- profiles
id, user_id, full_name, avatar_url, plan, created_at

-- agents
id, user_id, name, description, avatar_url, provider, model, 
temperature, system_prompt, status, created_at, updated_at

-- api_keys
id, user_id, provider, name, encrypted_key, created_at, last_used_at

-- connections
id, user_id, type, config, status, created_at

-- messages
id, conversation_id, agent_id, content, role, channel, 
created_at, metadata

-- conversations
id, agent_id, contact_name, contact_id, channel, 
last_message_at, unread_count

-- tools
id, agent_id, name, type, config, created_at

-- logs
id, agent_id, level, message, metadata, created_at
\`\`\`

---

### 2. Stripe (Pagos)
**Estado**: Planificado

**Uso**:
- Suscripciones mensuales/anuales
- Gestión de planes
- Webhooks para eventos de pago
- Portal de cliente para gestionar suscripción

**Productos en Stripe**:
- Free (sin producto, plan por defecto)
- VIP ($29/mes)
- Premium ($99/mes)

---

### 3. Unipile (Canales de Comunicación)
**Estado**: Planificado

**Uso**:
- Integración con WhatsApp Business
- Integración con Gmail
- Integración con Instagram DMs
- Integración con Telegram
- API unificada para todos los canales

---

### 4. Proveedores de IA
**Estado**: Listo para integrar

**Proveedores Soportados**:
- OpenAI (GPT-4, GPT-3.5)
- Anthropic (Claude 3)
- Google AI (Gemini)
- Cohere
- Hugging Face
- Otros (vía API keys)

---

## 🎨 Diseño y Estilos

### Sistema de Colores

**Paleta Principal**:
\`\`\`css
--background: #0D0F12        /* Fondo principal */
--foreground: #FAFAFA        /* Texto principal */
--primary: #5B9FFF           /* Color primario (azul) */
--card: #1A1D23              /* Fondo de tarjetas */
--border: #2A2D35            /* Bordes */
--muted: #3A3D45             /* Texto secundario */
\`\`\`

**Colores Semánticos**:
\`\`\`css
--success: #10B981           /* Verde para éxito */
--warning: #F59E0B           /* Amarillo para advertencias */
--error: #EF4444             /* Rojo para errores */
--info: #3B82F6              /* Azul para información */
\`\`\`

---

### Tipografía

**Fuente Principal**: Inter
- **Headings**: Inter Bold (700)
- **Body**: Inter Regular (400)
- **Captions**: Inter Medium (500)

**Tamaños**:
\`\`\`css
--text-xs: 0.75rem    /* 12px */
--text-sm: 0.875rem   /* 14px */
--text-base: 1rem     /* 16px */
--text-lg: 1.125rem   /* 18px */
--text-xl: 1.25rem    /* 20px */
--text-2xl: 1.5rem    /* 24px */
--text-3xl: 1.875rem  /* 30px */
--text-4xl: 2.25rem   /* 36px */
\`\`\`

---

### Espaciado

**Sistema de Espaciado** (basado en 4px):
\`\`\`css
--spacing-1: 0.25rem   /* 4px */
--spacing-2: 0.5rem    /* 8px */
--spacing-3: 0.75rem   /* 12px */
--spacing-4: 1rem      /* 16px */
--spacing-5: 1.25rem   /* 20px */
--spacing-6: 1.5rem    /* 24px */
--spacing-8: 2rem      /* 32px */
--spacing-10: 2.5rem   /* 40px */
--spacing-12: 3rem     /* 48px */
\`\`\`

---

### Bordes y Sombras

**Border Radius**:
\`\`\`css
--radius-sm: 0.5rem    /* 8px */
--radius-md: 0.75rem   /* 12px */
--radius-lg: 1rem      /* 16px */
--radius-xl: 1.5rem    /* 24px */
--radius-2xl: 2rem     /* 32px - usado en tarjetas principales */
\`\`\`

**Sombras**:
\`\`\`css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05)
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1)
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1)
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.15)
\`\`\`

---

### Transiciones

**Duración**:
\`\`\`css
--transition-fast: 150ms
--transition-base: 200ms
--transition-slow: 300ms
\`\`\`

**Easing**:
\`\`\`css
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1)
--ease-out: cubic-bezier(0, 0, 0.2, 1)
--ease-in: cubic-bezier(0.4, 0, 1, 1)
\`\`\`

**Aplicación**:
- Hover states: 150ms
- Modals/Dialogs: 200ms
- Page transitions: 300ms

---

### Componentes UI

**Botones**:
- **Primary**: Fondo #5B9FFF, texto blanco
- **Secondary**: Fondo #1A1D23, texto #FAFAFA
- **Ghost**: Transparente, hover #1A1D23
- **Destructive**: Fondo #EF4444, texto blanco

**Tarjetas**:
- Fondo: #1A1D23
- Border: 1px solid #2A2D35
- Border radius: 2rem (32px)
- Padding: 1.5rem (24px)
- Hover: Sombra sutil

**Inputs**:
- Fondo: #1A1D23
- Border: 1px solid #2A2D35
- Border radius: 0.75rem (12px)
- Focus: Border #5B9FFF, ring #5B9FFF/20

**Badges**:
- Activo: Verde (#10B981)
- Pausado: Gris (#6B7280)
- Error: Rojo (#EF4444)
- Info: Azul (#3B82F6)

---

## 🛠️ Tecnologías Utilizadas

### Frontend
- **Next.js 15.5.4**: Framework React con App Router
- **React 19.1.0**: Biblioteca UI
- **TypeScript 5.x**: Tipado estático
- **Tailwind CSS 4.1.9**: Framework CSS utility-first
- **shadcn/ui**: Componentes UI accesibles
- **Radix UI**: Primitivos UI sin estilos
- **Lucide React**: Iconos
- **React Hook Form**: Gestión de formularios
- **Zod**: Validación de esquemas
- **date-fns**: Manipulación de fechas
- **Recharts**: Gráficos y visualizaciones

### Backend (Planificado)
- **Supabase**: Base de datos PostgreSQL y autenticación
- **Supabase Storage**: Almacenamiento de archivos
- **Stripe**: Procesamiento de pagos
- **Unipile**: Integración con canales de comunicación

### Herramientas de Desarrollo
- **ESLint**: Linting de código
- **PostCSS**: Procesamiento de CSS
- **Vercel Analytics**: Analytics de la aplicación

---

## 🔄 Flujos de Usuario

### Flujo 1: Registro y Primer Agente

1. **Usuario visita la landing page**
2. **Click en "Comenzar Gratis"**
3. **Página de registro** (`/register`)
   - Completa formulario
   - Acepta términos
   - Click en "Crear Cuenta"
4. **Email de verificación**
   - Usuario verifica email
5. **Redirección al dashboard** (`/`)
   - Mensaje de bienvenida
   - Tutorial interactivo (opcional)
6. **Click en "Crear tu primer agente"**
7. **Modal de creación de agente**
   - Sube avatar (opcional)
   - Ingresa nombre: "Asistente de Ventas"
   - Ingresa descripción
   - Selecciona proveedor: OpenAI
   - Selecciona key: "Key de producción"
   - Selecciona modelo: GPT-4
   - Ajusta temperatura: 0.7
   - Ingresa system prompt
   - Click en "Crear Agente"
8. **Redirección al editor del agente**
   - Tab "Prompt" abierto
   - Mensaje: "Agente creado exitosamente"
9. **Usuario configura el agente**:
   - Tab "Knowledge": Sube documentos
   - Tab "Configuración": Conecta WhatsApp
   - Tab "Herramientas": Agrega HTTP tool
10. **Agente listo para usar**

---

### Flujo 2: Crear Herramienta HTTP

1. **Usuario está en el editor de un agente**
2. **Click en tab "Herramientas"**
3. **Click en "Nueva Herramienta"**
4. **Modal de selección de tipo**
   - Click en "HTTP Request"
5. **Redirección a formulario HTTP** (`/agents/[id]/tools/http/new`)
6. **Usuario completa el formulario**:
   - Nombre: "Obtener Clima"
   - Descripción: "Obtiene el clima actual de una ciudad"
   - Método: GET
   - URL: `https://api.openweathermap.org/data/2.5/weather`
   - Query params:
     - `q` = `{{city}}`
     - `appid` = `{{WEATHER_API_KEY}}`
     - `units` = `metric`
   - Headers:
     - `Accept` = `application/json`
7. **Click en "Probar Request"**
   - Sistema ejecuta la request
   - Muestra respuesta:
     - Status: 200 OK
     - Body: JSON con datos del clima
8. **Click en "Guardar"**
9. **Redirección al editor del agente**
   - Herramienta aparece en la lista
   - Mensaje: "Herramienta creada exitosamente"

---

### Flujo 3: Gestionar Conversaciones

1. **Usuario navega a Mensajes** (`/messages`)
2. **Vista inicial**: "Selecciona una conversación"
3. **Sidebar de chats muestra**:
   - 5 conversaciones activas
   - 2 con mensajes no leídos (badge rojo)
4. **Usuario hace click en una conversación**
5. **Redirección a** `/messages/[id]`
6. **Se carga la conversación**:
   - Historial de mensajes
   - Scroll automático al último mensaje
7. **Usuario lee los mensajes**
8. **Usuario escribe una respuesta**:
   - Escribe en el textarea
   - Click en "Enviar"
9. **Mensaje se envía**:
   - Aparece en la conversación
   - Se marca como enviado
10. **Agente responde automáticamente** (si está configurado)
11. **Usuario ve la respuesta del agente**
    - Marcada con badge "Agente"

---

### Flujo 4: Upgrade de Plan

1. **Usuario está en el dashboard**
2. **Ve el indicador de límite**:
   - "1/1 agentes usados"
   - Mensaje: "Has alcanzado el límite de tu plan Free"
3. **Click en "Mejorar Plan"**
4. **Redirección a** `/pricing`
5. **Usuario compara planes**:
   - Free: 1 agente
   - VIP: 5 agentes
   - Premium: Ilimitado
6. **Usuario selecciona VIP**
7. **Click en "Mejorar a VIP"**
8. **Redirección a Stripe Checkout** (planificado)
9. **Usuario completa el pago**:
   - Ingresa datos de tarjeta
   - Confirma pago
10. **Redirección al dashboard**
    - Mensaje: "Plan actualizado a VIP"
    - Indicador ahora muestra: "1/5 agentes usados"
11. **Usuario recibe email de confirmación**

---

## 📝 Notas de Implementación

### Estado Actual
- ✅ Estructura de rutas completa
- ✅ Diseño UI/UX implementado
- ✅ Componentes principales creados
- ✅ Sistema de navegación funcional
- ✅ Formularios de creación implementados
- ⏳ Integración con Supabase (pendiente)
- ⏳ Integración con Stripe (pendiente)
- ⏳ Integración con proveedores de IA (pendiente)
- ⏳ Sistema de autenticación real (pendiente)

### Próximos Pasos
1. **Integrar Supabase**:
   - Configurar proyecto en Supabase
   - Crear tablas en la base de datos
   - Implementar autenticación
   - Conectar formularios con la base de datos

2. **Integrar Stripe**:
   - Configurar productos y precios
   - Implementar checkout
   - Configurar webhooks
   - Implementar portal de cliente

3. **Integrar Proveedores de IA**:
   - Implementar llamadas a APIs
   - Gestionar API keys de forma segura
   - Implementar streaming de respuestas
   - Manejar errores y rate limits

4. **Implementar Funcionalidades Avanzadas**:
   - Sistema de knowledge base con embeddings
   - Ejecución de herramientas HTTP
   - Ejecución de scripts NodeJS
   - Integración con Unipile para canales

5. **Testing y Optimización**:
   - Tests unitarios
   - Tests de integración
   - Optimización de rendimiento
   - SEO

---

## 🎯 Conclusión

Este proyecto es una plataforma SaaS completa para gestionar agentes de IA con un diseño moderno, fluido y profesional. La arquitectura está diseñada para escalar y agregar nuevas funcionalidades fácilmente. El sistema de rutas está bien organizado, los componentes son reutilizables, y el diseño sigue las mejores prácticas de UI/UX.

La integración con Supabase, Stripe y proveedores de IA permitirá convertir esta aplicación en un producto completamente funcional y listo para producción.
