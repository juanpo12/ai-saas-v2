import { MessageSquare } from "lucide-react"

export default function MessagesPage() {
  return (
    <div className="flex-1 flex items-center justify-center bg-background">
      <div className="text-center space-y-3">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
          <MessageSquare className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-xl font-semibold text-foreground">Selecciona una conversación</h3>
        <p className="text-sm text-muted-foreground max-w-sm">
          Elige un chat de la lista para ver los mensajes y responder a tus usuarios
        </p>
      </div>
    </div>
  )
}
