"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useLanguage } from "@/contexts/language-context"
import { LanguageSwitch } from "@/components/language-switch"
import { ThemeToggle } from "@/components/theme-toggle"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

export function Header() {
  const { t } = useLanguage()
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { href: "/", label: t("home") },
    { href: "/about", label: t("about") },
    { href: "/publications", label: t("publications") },
    { href: "/blog", label: t("blog") },
    { href: "/gallery", label: t("gallery") },
  ]

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-200",
        isScrolled ? "bg-background/80 backdrop-blur-md border-b" : "bg-background",
      )}
    >
      <div className="container-wide">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-lg font-medium">
            Facundo Decunta
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <ul className="flex">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      pathname === item.href
                        ? "text-foreground bg-secondary"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/50",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex items-center ml-4 space-x-2">
              <LanguageSwitch />
              <ThemeToggle />
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center space-x-2 md:hidden">
            <ThemeToggle />
            <LanguageSwitch />
            <button
              onClick={toggleMenu}
              aria-label="Toggle menu"
              className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container-wide py-4">
            <ul className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "block px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      pathname === item.href
                        ? "text-foreground bg-secondary"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/50",
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-4 border-t">
              <LanguageSwitch />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
