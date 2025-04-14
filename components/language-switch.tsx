"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

export function LanguageSwitch() {
  const { language, setLanguage } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "es" : "en")
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="text-xs font-medium px-3 py-1 h-8 rounded-md border-black/10 hover:bg-black hover:text-white transition-colors"
    >
      {language === "en" ? "ES" : "EN"}
    </Button>
  )
}
