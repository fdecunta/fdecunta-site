"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useLanguage } from "@/contexts/language-context"
import { LanguageSwitch } from "@/components/language-switch"
import { Menu, X } from "lucide-react"

export function Navigation() {
  const { t } = useLanguage()
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const navItems = [
    { href: "/", label: t("home") },
    { href: "/about", label: t("about") },
    { href: "/publications", label: t("publications") },
    { href: "/blog", label: t("blog") },
    { href: "/gallery", label: t("gallery") },
  ]

  return (
    <nav className="flex items-center justify-between py-4">
      <Link href="/" className="text-lg font-medium">
        Jane Smith
      </Link>

      {/* Mobile menu button */}
      <button className="block md:hidden" onClick={toggleMenu} aria-label="Toggle menu">
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Desktop navigation */}
      <div className="hidden md:flex items-center space-x-8">
        <ul className="flex space-x-8">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`py-2 transition-colors ${
                  pathname === item.href ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <LanguageSwitch />
      </div>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-background border-b md:hidden z-50 py-6 px-4 fade-in">
          <ul className="flex flex-col space-y-6">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`block py-2 transition-colors ${
                    pathname === item.href
                      ? "text-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 pt-6 border-t">
            <LanguageSwitch />
          </div>
        </div>
      )}
    </nav>
  )
}
