# AI Agents Platform (ai-saas-v2)

Plataforma SaaS moderna para crear y gestionar agentes de IA. Construida con Next.js 15, estilo dark minimalista inspirado en Vercel/Replit/Notion.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38bdf8?style=flat-square&logo=tailwindcss)
![Supabase](https://img.shields.io/badge/Supabase-Auth-3ecf8e?style=flat-square&logo=supabase)

---

## Overview

AgentHub empowers users to create, configure, and deploy AI agents with ease. Connect your preferred AI providers (OpenAI, Anthropic, Google), integrate communication channels (WhatsApp, Gmail, Instagram), and extend agent capabilities with custom HTTP and Node.js tools.

## Features

### Agent Management
- **Visual Agent Builder** - Create agents with custom avatars, system prompts, and configurations
- **Multi-Provider Support** - Connect OpenAI, Anthropic, Google AI, Mistral, and Cohere
- **Knowledge Base** - Upload documents with drag & drop, automatic embedding generation
- **Custom Tools** - Extend agents with HTTP requests and Node.js scripts

### Communication Channels
- **WhatsApp Integration** - Connect agents to WhatsApp via Unipile
- **Email Support** - Gmail and Outlook integration
- **Social Media** - Instagram, Messenger, and Telegram connections
- **Unified Inbox** - Manage all conversations in one place

### Security & API Keys
- **Secure Key Storage** - Encrypted storage for all API keys
- **Provider Management** - Organize keys by provider with custom labels
- **No Key Exposure** - Keys are never displayed or copyable after creation

### Monitoring & Logs
- **Real-time Logs** - Track all agent interactions and API calls
- **Conversation History** - Full message history with search
- **Usage Analytics** - Monitor token usage and costs per agent

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| UI Components | shadcn/ui + Radix UI |
| Database | Supabase (PostgreSQL) |
| Authentication | Supabase Auth |
| Icons | Lucide React |

## Project Structure

\`\`\`
├── app/
│   ├── (auth)/              # Authentication pages
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/         # Protected dashboard routes
│   │   ├── agents/          # Agent management
│   │   ├── connections/     # Channel integrations
│   │   ├── keys/            # API key management
│   │   ├── logs/            # Activity logs
│   │   ├── messages/        # Unified inbox
│   │   ├── pricing/         # Subscription plans
│   │   └── tools/           # Tool management
│   └── layout.tsx           # Root layout
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── dashboard-layout.tsx # Main dashboard shell
│   ├── agents-view.tsx      # Agent list & grid
│   ├── agent-editor.tsx     # Agent configuration
│   └── ...
└── lib/
    └── utils.ts             # Utility functions
\`\`\`

## Design System

### Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--background` | `#0D0F12` | Main background |
| `--foreground` | `#FFFFFF` | Primary text |
| `--primary` | `#5B9FFF` | Accent color, CTAs |
| `--muted` | `#1A1D24` | Secondary backgrounds |
| `--border` | `#2A2F3C` | Borders, dividers |

### Typography

- **Font Family**: Inter (sans-serif)
- **Headings**: Semi-bold, tracking tight
- **Body**: Regular weight, relaxed line height

## Subscription Plans

| Feature | Free | VIP ($19/mo) | Premium ($49/mo) |
|---------|------|--------------|------------------|
| Agents | 1 | 5 | Unlimited |
| Messages/month | 100 | 5,000 | Unlimited |
| Channels | Web only | +WhatsApp | All channels |
| Knowledge Base | 1MB | 100MB | 1GB |
| Custom Tools | - | 3 | Unlimited |
| Priority Support | - | - | Yes |

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm, npm, or yarn
- Supabase account

### Installation

\`\`\`bash
# Clone the repository
git clone https://github.com/juanpo12/ai-saas-v2.git
cd ai-saas-v2

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local

# Run development server
pnpm dev
\`\`\`

### Environment Variables

\`\`\`env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
\`\`\`

## Supabase

### Configuración rápida

- Crea un proyecto en Supabase y copia `Project URL` y `anon key`.
- Añade las variables en `.env.local` como se muestra arriba.
- Instala dependencias: `pnpm add @supabase/ssr @supabase/supabase-js`.

### Clientes

**Cliente de navegador** (`lib/supabase/client.ts`):

```ts
import { createBrowserClient } from "@supabase/ssr"

export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
```

**Cliente de servidor** (`lib/supabase/server.ts`):

```ts
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export function createSupabaseServer() {
  const cookieStore = cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            )
          } catch {}
        },
      },
    },
  )
}
```

### Middleware de protección de rutas

- Controla acceso a rutas protegidas y redirecciones entre páginas públicas/privadas.
- Invitados acceden a `/login` y `/register`; usuarios autenticados son redirigidos a `/` si intentan entrar allí.

Fragmento clave (`middleware.ts`):

```ts
import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"

const AUTH_PAGES = new Set<`/${string}`>([
  "/login",
  "/register",
  "/forgot-password",
  "/update-password",
])

export async function middleware(req: NextRequest) {
  let supabaseResponse = NextResponse.next({ request: req })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => req.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request: req })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          )
        },
      },
    },
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { pathname } = new URL(req.url)

  if (user && AUTH_PAGES.has(pathname as `/${string}`)) {
    return NextResponse.redirect(new URL("/", req.url))
  }

  if (!user && !AUTH_PAGES.has(pathname as `/${string}`)) {
    const loginUrl = new URL("/login", req.url)
    const target = pathname === "/login" || pathname === "/register" ? "/" : pathname
    loginUrl.searchParams.set("redirectTo", target)
    return NextResponse.redirect(loginUrl)
  }

  return supabaseResponse
}
```

### Uso en Server Components y Server Actions

Obtén el usuario autenticado o ejecuta acciones seguras en el servidor:

```ts
// app/(dashboard)/agents/actions.ts
"use server"
import { createSupabaseServer } from "@/lib/supabase/server"

export async function getCurrentUser() {
  const supabase = createSupabaseServer()
  const { data: { user } } = await supabase.auth.getUser()
  return user
}
```

### Uso en Client Components

Autenticación en el cliente con el browser client:

```ts
import { supabase } from "@/lib/supabase/client"

async function login(email: string, password: string) {
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
}

async function logout() {
  await supabase.auth.signOut()
}
```

### Logout en la navbar

Añade un botón junto al selector de idioma usando el cliente de navegador:

```tsx
import { supabase } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

function NavbarActions() {
  const router = useRouter()
  return (
    <>
      {/* <LanguageSelector /> */}
      <Button
        variant="ghost"
        className="ml-2 rounded-lg"
        onClick={async () => {
          await supabase.auth.signOut()
          router.push("/login")
        }}
      >
        Logout
      </Button>
    </>
  )
}
```

### Cookies y SSR

- Se usan los métodos `cookies.getAll` y `cookies.setAll` para compatibilidad futura de `@supabase/ssr`.
- No expongas claves en el cliente; mantén todas las variables en `.env.local`.

## Roadmap

- [x] Supabase authentication (login, register, reset)
- [ ] Database schema & migrations
- [ ] Real-time message sync
- [ ] Stripe payment integration
- [ ] Agent analytics dashboard
- [ ] Webhook support for tools
- [ ] Team collaboration features
- [ ] API documentation

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting a PR.

## License

MIT License - see [LICENSE](LICENSE) for details.

---

<p align="center">
  Built with care for the AI-first generation
</p>
