import { Plus, Code, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"

const tools = [
  {
    id: 1,
    name: "Weather API",
    type: "HTTP",
    description: "Obtiene información del clima en tiempo real",
    endpoint: "https://api.weather.com/v1/current",
    usedBy: 3,
  },
  {
    id: 2,
    name: "Database Query",
    type: "NodeJS",
    description: "Consulta la base de datos de usuarios",
    endpoint: "function queryUsers()",
    usedBy: 5,
  },
  {
    id: 3,
    name: "Send Email",
    type: "HTTP",
    description: "Envía emails transaccionales",
    endpoint: "https://api.sendgrid.com/v3/mail/send",
    usedBy: 8,
  },
  {
    id: 4,
    name: "Calculate Price",
    type: "NodeJS",
    description: "Calcula precios con descuentos y promociones",
    endpoint: "function calculatePrice()",
    usedBy: 2,
  },
]

export default function ToolsPage() {
  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Herramientas</h1>
          <p className="text-muted-foreground mt-1">Scripts y funciones para extender tus agentes</p>
        </div>
        <Button className="rounded-xl bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Nueva Herramienta
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tools.map((tool) => (
          <div
            key={tool.id}
            className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-200 group cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4 flex-1">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  {tool.type === "HTTP" ? (
                    <Globe className="w-6 h-6 text-primary" />
                  ) : (
                    <Code className="w-6 h-6 text-primary" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">{tool.name}</h3>
                    <span className="text-xs px-2 py-0.5 rounded-md bg-muted text-muted-foreground">{tool.type}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{tool.description}</p>
                  <code className="text-xs text-primary/80 mt-2 block font-mono">{tool.endpoint}</code>
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Usado por {tool.usedBy} agentes</span>
              <Button variant="outline" size="sm" className="rounded-lg bg-transparent">
                Editar
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
