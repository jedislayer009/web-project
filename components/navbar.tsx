"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Home, FileText, Pill, Stethoscope, Menu, X, LogOut } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { clearCurrentUser } from "@/lib/utils"
import LanguageSwitcher from "@/components/language-switcher"
import { useTranslation } from "@/components/translation-provider"

const navItems = [
  { name: "dashboard", href: "/dashboard", icon: Home },
  { name: "medical_records", href: "/records", icon: FileText },
  { name: "medications", href: "/medications", icon: Pill },
  { name: "symptom_checker", href: "/symptoms", icon: Stethoscope },
]

export default function Navbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()
  const { t } = useTranslation()

  const handleLogout = () => {
    // Clear current user session
    clearCurrentUser()
    // Redirect to login page
    router.push("/")
  }

  // Don't show navbar on the registration page
  if (pathname === "/") {
    return null
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="rounded-full bg-teal-500 p-1">
              <Stethoscope className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold">doktR G</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 text-sm font-medium transition-colors hover:text-foreground/80",
                  isActive ? "text-foreground" : "text-foreground/60",
                )}
              >
                <Icon className="h-4 w-4" />
                {t(item.name)}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <div className="mr-2">
            <LanguageSwitcher />
          </div>
          <Button variant="destructive" size="sm" className="rounded-full" asChild>
            <Link href="/emergency">{t("emergency")}</Link>
          </Button>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            {t("logout")}
          </Button>
          <ModeToggle />
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t p-4">
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 text-sm font-medium transition-colors hover:text-foreground/80 p-2 rounded-md",
                    isActive ? "text-foreground bg-accent" : "text-foreground/60",
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Icon className="h-4 w-4" />
                  {t(item.name)}
                </Link>
              )
            })}
            <div className="p-2">
              <LanguageSwitcher />
            </div>
            <Button variant="ghost" className="justify-start" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              {t("logout")}
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
