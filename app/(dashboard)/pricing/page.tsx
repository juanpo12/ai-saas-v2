"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Bot, Check, X, Zap, Crown, Sparkles, MessageSquare, Mail, ArrowLeft } from "lucide-react"
import { useI18n } from "@/lib/i18n"

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")
  const { t, locale } = useI18n()

  const plans = [
    {
      name: "Free",
      price: 0,
      icon: Bot,
      color: "from-gray-500 to-gray-600",
      description:
        locale === "es" ? "Perfecto para empezar" : locale === "pt" ? "Perfeito para começar" : "Perfect to start",
      features: [
        { text: locale === "es" ? "1 agente web" : locale === "pt" ? "1 agente web" : "1 web agent", included: true },
        {
          text: locale === "es" ? "100 mensajes/mes" : locale === "pt" ? "100 mensagens/mês" : "100 messages/month",
          included: true,
        },
        { text: locale === "es" ? "1 conexión" : locale === "pt" ? "1 conexão" : "1 connection", included: true },
        {
          text:
            locale === "es"
              ? "Modelos básicos (GPT-3.5)"
              : locale === "pt"
                ? "Modelos básicos (GPT-3.5)"
                : "Basic models (GPT-3.5)",
          included: true,
        },
        {
          text: locale === "es" ? "1 herramienta HTTP" : locale === "pt" ? "1 ferramenta HTTP" : "1 HTTP tool",
          included: true,
        },
        {
          text: locale === "es" ? "Múltiples agentes" : locale === "pt" ? "Múltiplos agentes" : "Multiple agents",
          included: false,
        },
        {
          text: locale === "es" ? "Soporte prioritario" : locale === "pt" ? "Suporte prioritário" : "Priority support",
          included: false,
        },
      ],
      cta: t("pricing.current"),
      popular: false,
    },
    {
      name: "VIP",
      price: 29,
      icon: Zap,
      color: "from-[#5B9FFF] to-[#4A7FCC]",
      description:
        locale === "es" ? "Para profesionales" : locale === "pt" ? "Para profissionais" : "For professionals",
      features: [
        { text: locale === "es" ? "5 agentes" : locale === "pt" ? "5 agentes" : "5 agents", included: true },
        {
          text:
            locale === "es" ? "5,000 mensajes/mes" : locale === "pt" ? "5.000 mensagens/mês" : "5,000 messages/month",
          included: true,
        },
        { text: locale === "es" ? "5 conexiones" : locale === "pt" ? "5 conexões" : "5 connections", included: true },
        {
          text: locale === "es" ? "Todos los modelos" : locale === "pt" ? "Todos os modelos" : "All models",
          included: true,
        },
        {
          text:
            locale === "es"
              ? "Herramientas ilimitadas"
              : locale === "pt"
                ? "Ferramentas ilimitadas"
                : "Unlimited tools",
          included: true,
        },
        {
          text:
            locale === "es"
              ? "Knowledge base (50MB)"
              : locale === "pt"
                ? "Knowledge base (50MB)"
                : "Knowledge base (50MB)",
          included: true,
        },
        {
          text: locale === "es" ? "Soporte por email" : locale === "pt" ? "Suporte por email" : "Email support",
          included: true,
        },
      ],
      cta: t("pricing.select"),
      popular: true,
    },
    {
      name: "Premium",
      price: 99,
      icon: Crown,
      color: "from-amber-500 to-orange-600",
      description: locale === "es" ? "Para equipos" : locale === "pt" ? "Para equipes" : "For teams",
      features: [
        {
          text: locale === "es" ? "Agentes ilimitados" : locale === "pt" ? "Agentes ilimitados" : "Unlimited agents",
          included: true,
        },
        {
          text:
            locale === "es"
              ? "50,000 mensajes/mes"
              : locale === "pt"
                ? "50.000 mensagens/mês"
                : "50,000 messages/month",
          included: true,
        },
        {
          text:
            locale === "es"
              ? "Conexiones ilimitadas"
              : locale === "pt"
                ? "Conexões ilimitadas"
                : "Unlimited connections",
          included: true,
        },
        { text: locale === "es" ? "Fine-tuning" : locale === "pt" ? "Fine-tuning" : "Fine-tuning", included: true },
        {
          text:
            locale === "es" ? "Knowledge ilimitada" : locale === "pt" ? "Knowledge ilimitada" : "Unlimited knowledge",
          included: true,
        },
        { text: locale === "es" ? "Soporte 24/7" : locale === "pt" ? "Suporte 24/7" : "24/7 support", included: true },
        { text: locale === "es" ? "API dedicada" : locale === "pt" ? "API dedicada" : "Dedicated API", included: true },
        { text: "White-label", included: true },
      ],
      cta: t("pricing.select"),
      popular: false,
    },
  ]

  return (
    <div className="min-h-screen bg-[#0D0F12] text-white">
      <div className="border-b border-white/10 bg-[#0D0F12]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <Link href="/agents" className="flex items-center text-gray-400 hover:text-white transition-colors text-sm">
            <ArrowLeft className="w-4 h-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">{t("agent.back")}</span>
          </Link>
          <div className="flex items-center">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-gradient-to-br from-[#5B9FFF] to-[#4A7FCC] flex items-center justify-center">
              <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <span className="ml-2 font-bold text-sm sm:text-base">AI Agents</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16 text-center">
        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#5B9FFF]/10 border border-[#5B9FFF]/20 mb-4 sm:mb-6">
          <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-[#5B9FFF]" />
          <span className="text-xs sm:text-sm text-[#5B9FFF] font-medium">{t("pricing.popular")}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-balance">{t("pricing.title")}</h1>
        <p className="text-base sm:text-lg lg:text-xl text-gray-400 mb-6 sm:mb-8 max-w-2xl mx-auto text-balance px-4">
          {t("pricing.subtitle")}
        </p>

        <div className="inline-flex items-center gap-2 sm:gap-3 p-1 bg-[#1A1D24] rounded-xl border border-white/10">
          <button
            onClick={() => setBillingCycle("monthly")}
            className={`px-4 sm:px-6 py-2 rounded-lg text-sm font-medium transition-all ${
              billingCycle === "monthly" ? "bg-[#5B9FFF] text-white" : "text-gray-400 hover:text-white"
            }`}
          >
            {locale === "es" ? "Mensual" : locale === "pt" ? "Mensal" : "Monthly"}
          </button>
          <button
            onClick={() => setBillingCycle("yearly")}
            className={`px-4 sm:px-6 py-2 rounded-lg text-sm font-medium transition-all relative ${
              billingCycle === "yearly" ? "bg-[#5B9FFF] text-white" : "text-gray-400 hover:text-white"
            }`}
          >
            {locale === "es" ? "Anual" : locale === "pt" ? "Anual" : "Yearly"}
            <span className="absolute -top-2 -right-2 px-1.5 sm:px-2 py-0.5 bg-green-500 text-white text-[10px] sm:text-xs rounded-full">
              -20%
            </span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 sm:gap-6 pb-4 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 md:grid md:grid-cols-3 md:overflow-visible">
          {plans.map((plan) => {
            const Icon = plan.icon
            const finalPrice = billingCycle === "yearly" ? Math.round(plan.price * 0.8) : plan.price

            return (
              <div
                key={plan.name}
                className={`relative bg-[#1A1D24] border rounded-2xl p-5 sm:p-8 transition-all duration-300 hover:scale-[1.02] min-w-[280px] sm:min-w-0 snap-center flex-shrink-0 md:flex-shrink ${
                  plan.popular
                    ? "border-[#5B9FFF] shadow-xl shadow-[#5B9FFF]/10"
                    : "border-white/10 hover:border-white/20"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2 px-3 sm:px-4 py-1 bg-gradient-to-r from-[#5B9FFF] to-[#4A7FCC] rounded-full text-xs sm:text-sm font-medium whitespace-nowrap">
                    {t("pricing.popular")}
                  </div>
                )}

                <div className="mb-5 sm:mb-6">
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-3 sm:mb-4`}
                  >
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">{plan.name}</h3>
                  <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4">{plan.description}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-bold">${finalPrice}</span>
                    <span className="text-gray-400 text-sm">{t("pricing.monthly")}</span>
                  </div>
                </div>

                <Button
                  className={`w-full rounded-xl h-10 sm:h-11 text-sm font-medium mb-5 sm:mb-6 transition-all ${
                    plan.popular
                      ? "bg-[#5B9FFF] hover:bg-[#4A8FEF] text-white shadow-lg shadow-[#5B9FFF]/20"
                      : plan.name === "Free"
                        ? "bg-white/5 hover:bg-white/10 text-white border border-white/10"
                        : "bg-white/10 hover:bg-white/20 text-white"
                  }`}
                  disabled={plan.name === "Free"}
                >
                  {plan.cta}
                </Button>

                <div className="space-y-2 sm:space-y-3">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2 sm:gap-3">
                      {feature.included ? (
                        <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#5B9FFF]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#5B9FFF]" />
                        </div>
                      ) : (
                        <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <X className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-600" />
                        </div>
                      )}
                      <span className={`text-xs sm:text-sm ${feature.included ? "text-gray-300" : "text-gray-600"}`}>
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-16 sm:mt-24 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
            {locale === "es" ? "¿Tienes preguntas?" : locale === "pt" ? "Tem perguntas?" : "Have questions?"}
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-6">
            <Button className="bg-white/10 hover:bg-white/20 text-white rounded-xl w-full sm:w-auto">
              <Mail className="w-4 h-4 mr-2" />
              {locale === "es" ? "Contactar ventas" : locale === "pt" ? "Contatar vendas" : "Contact sales"}
            </Button>
            <Button className="bg-[#5B9FFF] hover:bg-[#4A8FEF] text-white rounded-xl w-full sm:w-auto">
              <MessageSquare className="w-4 h-4 mr-2" />
              {locale === "es" ? "Chat en vivo" : locale === "pt" ? "Chat ao vivo" : "Live chat"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
