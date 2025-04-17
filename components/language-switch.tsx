"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

export function LanguageSwitch() {
  const { language, setLanguage } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "es" : "en")
  }

  return (
    <Button variant="ghost" size="sm" onClick={toggleLanguage} className="h-8 px-2 rounded-md flex items-center gap-1">
      <span className="text-sm font-medium">{language === "en" ? "English" : "Español"}</span>
      <span className="text-xs text-muted-foreground">({language === "en" ? "ES" : "EN"})</span>
    </Button>
  )
}
