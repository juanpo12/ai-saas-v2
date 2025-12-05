"use client"

import { Send, MoreVertical, Phone, Video, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import Link from "next/link"

const chatMessages = [
  {
    id: 1,
    sender: "user",
    message: "Hola, necesito ayuda con mi cuenta",
    time: "10:30",
  },
  {
    id: 2,
    sender: "agent",
    message: "¡Hola! Claro, con gusto te ayudo. ¿Qué necesitas?",
    time: "10:31",
  },
  {
    id: 3,
    sender: "user",
    message: "No puedo acceder a mi dashboard",
    time: "10:32",
  },
  {
    id: 4,
    sender: "agent",
    message: "Entiendo. ¿Has intentado restablecer tu contraseña?",
    time: "10:33",
  },
  {
    id: 5,
    sender: "user",
    message: "Sí, pero no recibo el correo",
    time: "10:35",
  },
  {
    id: 6,
    sender: "agent",
    message: "Déjame revisar tu cuenta. ¿Cuál es tu email registrado?",
    time: "10:36",
  },
]

export default function ChatPage({ params }: { params: { id: string } }) {
  const [message, setMessage] = useState("")

  return (
    <div className="flex flex-col h-full">
      <div className="p-3 lg:p-4 border-b border-border bg-card flex items-center justify-between">
        <div className="flex items-center gap-2 lg:gap-3">
          <Link href="/messages" className="md:hidden">
            <Button variant="ghost" size="icon" className="rounded-lg shrink-0">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-full bg-linear-to-br from-primary to-chart-3 flex items-center justify-center text-xs lg:text-sm font-semibold text-white shrink-0">
            MG
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-foreground text-sm lg:text-base truncate">María García</h3>
            <p className="text-xs text-muted-foreground truncate">WhatsApp • En línea</p>
          </div>
        </div>
        <div className="flex items-center gap-1 lg:gap-2 shrink-0">
          <Button variant="ghost" size="icon" className="rounded-lg hidden sm:flex">
            <Phone className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-lg hidden sm:flex">
            <Video className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-lg">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-3 lg:space-y-4 bg-background">
        {chatMessages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === "agent" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[85%] sm:max-w-md px-3 lg:px-4 py-2 lg:py-2.5 rounded-2xl ${
                msg.sender === "agent"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-foreground"
              }`}
            >
              <p className="text-sm">{msg.message}</p>
              <span
                className={`text-xs mt-1 block ${
                  msg.sender === "agent" ? "text-primary-foreground/70" : "text-muted-foreground"
                }`}
              >
                {msg.time}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 lg:p-4 border-t border-border bg-card">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Escribe un mensaje..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 px-3 lg:px-4 py-2 lg:py-2.5 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors text-sm"
          />
          <Button className="rounded-xl bg-primary hover:bg-primary/90 px-4 lg:px-6 shrink-0">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
