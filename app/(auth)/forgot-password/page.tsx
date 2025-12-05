"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, ArrowRight } from "lucide-react"
import { supabase } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    const redirectTo = typeof window !== "undefined" ? `${window.location.origin}/update-password` : undefined
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo })
    if (error) {
      toast({ title: "Error al enviar correo", description: error.message })
      setIsLoading(false)
      return
    }
    toast({ title: "Correo enviado", description: "Revisa tu bandeja para continuar" })
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen min-h-[100dvh] bg-[#0D0F12] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-[#1A1D24] border border-white/10 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-white mb-2">Recuperar contraseña</h2>
        <p className="text-gray-400 text-sm mb-6">Ingresa tu email para recibir un enlace</p>
        <form onSubmit={handleReset} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-300 text-sm font-medium">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input id="email" type="email" placeholder="tu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10 bg-[#0D0F12] border-white/10 text-white placeholder:text-gray-600 rounded-xl h-11" required />
            </div>
          </div>
          <Button type="submit" disabled={isLoading} className="w-full bg-[#5B9FFF] hover:bg-[#4A8FEF] text-white rounded-xl h-11 font-medium">
            {isLoading ? "Enviando..." : (<span className="flex items-center justify-center">Enviar enlace<ArrowRight className="w-4 h-4 ml-2" /></span>)}
          </Button>
        </form>
      </div>
    </div>
  )
}
