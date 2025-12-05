"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Bot, Mail, Lock, User, ArrowRight } from "lucide-react"

export default function RegisterPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden")
      return
    }
    setIsLoading(true)
    // TODO: Implement Supabase registration
    setTimeout(() => setIsLoading(false), 1000)
  }

  return (
    <div className="min-h-screen min-h-[100dvh] bg-[#0D0F12] flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md">
        {/* Logo - responsive sizing */}
        <div className="flex items-center justify-center mb-6 sm:mb-8">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#5B9FFF] to-[#4A7FCC] flex items-center justify-center">
            <Bot className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
          </div>
          <h1 className="ml-2 sm:ml-3 text-xl sm:text-2xl font-bold text-white">AI Agents</h1>
        </div>

        <div className="bg-[#1A1D24] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl">
          <div className="mb-5 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2">Crea tu cuenta</h2>
            <p className="text-gray-400 text-sm">Comienza gratis, sin tarjeta de crédito</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4 sm:space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-300 text-sm font-medium">
                Nombre completo
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Juan Pérez"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10 bg-[#0D0F12] border-white/10 text-white placeholder:text-gray-600 rounded-xl h-11 focus:border-[#5B9FFF] transition-colors text-base sm:text-sm"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300 text-sm font-medium">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-[#0D0F12] border-white/10 text-white placeholder:text-gray-600 rounded-xl h-11 focus:border-[#5B9FFF] transition-colors text-base sm:text-sm"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300 text-sm font-medium">
                  Contraseña
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 bg-[#0D0F12] border-white/10 text-white placeholder:text-gray-600 rounded-xl h-11 focus:border-[#5B9FFF] transition-colors text-base sm:text-sm"
                    required
                    minLength={8}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-300 text-sm font-medium">
                  Confirmar
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10 bg-[#0D0F12] border-white/10 text-white placeholder:text-gray-600 rounded-xl h-11 focus:border-[#5B9FFF] transition-colors text-base sm:text-sm"
                    required
                  />
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-500 -mt-2">Mínimo 8 caracteres</p>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#5B9FFF] hover:bg-[#4A8FEF] text-white rounded-xl h-11 font-medium transition-all duration-200 hover:shadow-lg hover:shadow-[#5B9FFF]/20"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  Creando cuenta...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  Crear cuenta gratis
                  <ArrowRight className="w-4 h-4 ml-2" />
                </span>
              )}
            </Button>
          </form>

          <div className="mt-5 sm:mt-6 text-center">
            <p className="text-gray-400 text-sm">
              ¿Ya tienes una cuenta?{" "}
              <Link href="/login" className="text-[#5B9FFF] hover:text-[#4A8FEF] font-medium transition-colors">
                Inicia sesión
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-gray-500 text-xs mt-6 sm:mt-8 px-4">
          Al registrarte, aceptas nuestros{" "}
          <Link href="/terms" className="text-gray-400 hover:text-gray-300 transition-colors">
            Términos de Servicio
          </Link>{" "}
          y{" "}
          <Link href="/privacy" className="text-gray-400 hover:text-gray-300 transition-colors">
            Política de Privacidad
          </Link>
        </p>
      </div>
    </div>
  )
}
