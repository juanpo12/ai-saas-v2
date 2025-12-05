"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Bot, Mail, Lock, ArrowRight } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // TODO: Implement Supabase login
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
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2">Bienvenido de vuelta</h2>
            <p className="text-gray-400 text-sm">Ingresa a tu cuenta para continuar</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 sm:space-y-5">
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

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-gray-300 text-sm font-medium">
                  Contraseña
                </Label>
                <Link href="/forgot-password" className="text-xs text-[#5B9FFF] hover:text-[#4A8FEF] transition-colors">
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
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
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#5B9FFF] hover:bg-[#4A8FEF] text-white rounded-xl h-11 font-medium transition-all duration-200 hover:shadow-lg hover:shadow-[#5B9FFF]/20"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  Ingresando...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  Ingresar
                  <ArrowRight className="w-4 h-4 ml-2" />
                </span>
              )}
            </Button>
          </form>

          <div className="mt-5 sm:mt-6 text-center">
            <p className="text-gray-400 text-sm">
              ¿No tienes una cuenta?{" "}
              <Link href="/register" className="text-[#5B9FFF] hover:text-[#4A8FEF] font-medium transition-colors">
                Regístrate gratis
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-gray-500 text-xs mt-6 sm:mt-8 px-4">
          Al continuar, aceptas nuestros{" "}
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
