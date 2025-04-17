"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { FileText, Home } from "lucide-react"
import { cn } from "@/lib/utils"

export function AdminHeader() {
  const pathname = usePathname()

  const navItems = [
    {
      href: "/admin/blog",
      label: "Blog Posts",
      icon: FileText,
      active: pathname.includes("/admin/blog"),
    },
    {
      href: "/",
      label: "View Site",
      icon: Home,
      active: false,
    },
  ]

  return (
    <header className="border-b bg-background">
      <div className="container-wide">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="text-lg font-medium">
              Admin Dashboard
            </Link>

            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={item.active ? "default" : "ghost"}
                    className={cn("flex items-center gap-1", item.active ? "bg-foreground text-background" : "")}
                  >
                    <item.icon size={16} />
                    {item.label}
                  </Button>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}
