"use client"

import { useTranslation } from "@/components/translation-provider"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"

export default function LanguageSwitcher() {
  const { language, setLanguage } = useTranslation()

  const handleLanguageChange = (newLanguage: "en" | "hi" | "kn") => {
    console.log("Changing language to:", newLanguage)
    setLanguage(newLanguage)
    // Force a page reload to ensure all components update
    window.location.reload()
  }

  return (
    <div className="flex items-center gap-1">
      <Globe className="h-4 w-4 mr-1" />
      <Button
        variant={language === "en" ? "default" : "outline"}
        size="sm"
        onClick={() => handleLanguageChange("en")}
        className="px-2 py-1 h-8"
      >
        EN
      </Button>
      <Button
        variant={language === "hi" ? "default" : "outline"}
        size="sm"
        onClick={() => handleLanguageChange("hi")}
        className="px-2 py-1 h-8"
      >
        हिन्दी
      </Button>
      <Button
        variant={language === "kn" ? "default" : "outline"}
        size="sm"
        onClick={() => handleLanguageChange("kn")}
        className="px-2 py-1 h-8"
      >
        ಕನ್ನಡ
      </Button>
    </div>
  )
}
