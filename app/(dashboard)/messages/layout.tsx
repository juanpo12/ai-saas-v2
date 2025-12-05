"use client"

import type React from "react"

import { Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Suspense } from "react"
import { cn } from "@/lib/utils"

const conversations = [
  {
    id: "1",
    user: "María García",
    lastMessage: "Gracias por tu ayuda!",
    time: "5 min",
    unread: 0,
    channel: "WhatsApp",
    avatar: "MG",
  },
  {
    id: "2",
    user: "Carlos Ruiz",
    lastMessage: "Me interesa el plan premium",
    time: "15 min",
    unread: 2,
    channel: "Telegram",
    avatar: "CR",
  },
  {
    id: "3",
    user: "Ana López",
    lastMessage: "¿Cómo configuro mi agente?",
    time: "1h",
    unread: 1,
    channel: "Email",
    avatar: "AL",
  },
  {
    id: "4",
    user: "Pedro Martínez",
    lastMessage: "Perfecto, muchas gracias",
    time: "2h",
    unread: 0,
    channel: "WhatsApp",
    avatar: "PM",
  },
  {
    id: "5",
    user: "Laura Sánchez",
    lastMessage: "¿Tienen soporte en español?",
    time: "3h",
    unread: 0,
    channel: "Instagram",
    avatar: "LS",
  },
]

export default function MessagesLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [searchQuery, setSearchQuery] = useState("")

  const isViewingChat = pathname !== "/messages" && pathname.startsWith("/messages/")

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex h-full overflow-hidden">
        <div
          className={cn(
            "w-full md:w-80 border-r border-border bg-card flex flex-col transition-all duration-300",
            isViewingChat ? "hidden md:flex" : "flex",
          )}
        >
          <div className="p-4 border-b border-border space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-foreground">Conversaciones</h2>
              <Button variant="ghost" size="icon" className="rounded-lg">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar chats..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-lg bg-background border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {conversations.map((conversation) => {
              const isActive = pathname === `/messages/${conversation.id}`
              return (
                <Link
                  key={conversation.id}
                  href={`/messages/${conversation.id}`}
                  className={cn(
                    "block p-4 border-b border-border hover:bg-background transition-colors",
                    isActive && "bg-background",
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-primary to-chart-3 flex items-center justify-center text-xs font-semibold text-white shrink-0">
                      {conversation.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium text-foreground text-sm truncate">{conversation.user}</h3>
                        <span className="text-xs text-muted-foreground">{conversation.time}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground truncate">{conversation.lastMessage}</p>
                        {conversation.unread > 0 && (
                          <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-xs font-semibold text-primary-foreground ml-2 shrink-0">
                            {conversation.unread}
                          </div>
                        )}
                      </div>
                      <span className="text-xs px-1.5 py-0.5 rounded bg-primary/10 text-primary mt-1 inline-block">
                        {conversation.channel}
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        <div
          className={cn("flex-1 flex flex-col transition-all duration-300", isViewingChat ? "flex" : "hidden md:flex")}
        >
          {children}
        </div>
      </div>
    </Suspense>
  )
}
