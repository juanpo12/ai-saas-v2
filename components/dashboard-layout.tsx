"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Bot, Plug, Key, MessageSquare, Wrench, FileText, Search, Command, Crown, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { useI18n } from "@/lib/i18n"
import { LanguageSelector } from "@/components/language-selector"

interface DashboardLayoutProps {
  children: React.ReactNode
}

const navItems = [
  { icon: Bot, labelKey: "nav.agents", href: "/agents" },
  { icon: Plug, labelKey: "nav.connections", href: "/connections" },
  { icon: Key, labelKey: "nav.keys", href: "/keys" },
  { icon: MessageSquare, labelKey: "nav.messages", href: "/messages" },
  { icon: Wrench, labelKey: "nav.tools", href: "/tools" },
  { icon: FileText, labelKey: "nav.logs", href: "/logs" },
]

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { t } = useI18n()

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [mobileMenuOpen])

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed lg:relative z-50 w-72 lg:w-64 border-r border-border bg-sidebar flex flex-col h-full transition-transform duration-300 ease-in-out",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div className="p-4 lg:p-6 border-b border-sidebar-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Bot className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-lg text-sidebar-foreground">AI Platform</span>
          </div>
          <Button variant="ghost" size="icon" className="lg:hidden rounded-lg" onClick={() => setMobileMenuOpen(false)}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
            return (
              <Link
                key={item.labelKey}
                href={item.href}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                    : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50",
                )}
              >
                <Icon className="w-4 h-4" />
                {t(item.labelKey)}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 space-y-3">
          <div className="bg-gradient-to-br from-sidebar-accent to-sidebar-accent/50 rounded-xl p-4 border border-sidebar-border">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-lg bg-muted flex items-center justify-center">
                <Bot className="w-3.5 h-3.5 text-muted-foreground" />
              </div>
              <span className="text-xs font-medium text-sidebar-foreground/60">{t("plan.current")}</span>
            </div>
            <p className="text-sm font-semibold text-sidebar-foreground mb-1">{t("plan.free")}</p>
            <p className="text-xs text-sidebar-foreground/60 mb-3">1/1 {t("plan.agentsUsed")}</p>
            <Link href="/pricing">
              <Button className="w-full h-8 text-xs rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm transition-all duration-200 hover:shadow-md">
                <Crown className="w-3 h-3 mr-1.5" />
                {t("plan.upgrade")}
              </Button>
            </Link>
          </div>
        </div>

        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-chart-3 flex items-center justify-center text-xs font-semibold text-white">
              JD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">John Doe</p>
              <p className="text-xs text-sidebar-foreground/60 truncate">john@example.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        <header className="h-14 lg:h-16 border-b border-border bg-card/50 backdrop-blur-sm flex items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-2 lg:gap-4 flex-1">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden rounded-lg shrink-0"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>

            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="flex items-center gap-2 px-3 lg:px-4 py-2 rounded-xl bg-input hover:bg-accent transition-colors text-muted-foreground hover:text-foreground group flex-1 lg:flex-none lg:w-96"
            >
              <Search className="w-4 h-4 shrink-0" />
              <span className="text-sm flex-1 text-left truncate">{t("header.search")}</span>
              <kbd className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded bg-muted text-xs font-mono">
                <Command className="w-3 h-3" />K
              </kbd>
            </button>
          </div>

          <LanguageSelector />
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
