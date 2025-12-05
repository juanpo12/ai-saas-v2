"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Lock, Check } from "lucide-react"
import { supabase } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast({ title: "Contraseñas no coinciden", description: "Verifica ambos campos" })
      return
    }
    setIsLoading(true)
    const { error } = await supabase.auth.updateUser({ password })
    if (error) {
      toast({ title: "Error al actualizar", description: error.message })
      setIsLoading(false)
      return
    }
    toast({ title: "Contraseña actualizada", description: "Ahora puedes iniciar sesión" })
    router.push("/login")
  }

  return (
    <div className="min-h-screen bg-[#0D0F12] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-[#1A1D24] border border-white/10 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-white mb-2">Definir nueva contraseña</h2>
        <p className="text-gray-400 text-sm mb-6">Ingresa y confirma tu nueva contraseña</p>
        <form onSubmit={handleUpdate} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-300 text-sm font-medium">Nueva contraseña</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10 bg-[#0D0F12] border-white/10 text-white placeholder:text-gray-600 rounded-xl h-11" required minLength={8} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm" className="text-gray-300 text-sm font-medium">Confirmar</Label>
            <div className="relative">
              <Check className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input id="confirm" type="password" placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="pl-10 bg-[#0D0F12] border-white/10 text-white placeholder:text-gray-600 rounded-xl h-11" required />
            </div>
          </div>
          <Button type="submit" disabled={isLoading} className="w-full bg-[#5B9FFF] hover:bg-[#4A8FEF] text-white rounded-xl h-11 font-medium">{isLoading ? "Actualizando..." : "Actualizar contraseña"}</Button>
        </form>
      </div>
    </div>
  )
}
