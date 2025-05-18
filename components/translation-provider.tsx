"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { getTranslation, type Language } from "@/lib/translations"

interface TranslationContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const TranslationContext = createContext<TranslationContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key) => key,
})

export function useTranslation() {
  return useContext(TranslationContext)
}

export function TranslationProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")
  const [mounted, setMounted] = useState(false)

  // Load saved language preference on mount
  useEffect(() => {
    setMounted(true)
    try {
      const savedLanguage = localStorage.getItem("doktrg_language") as Language
      console.log("Loaded language from localStorage:", savedLanguage)
      if (savedLanguage && ["en", "hi", "kn"].includes(savedLanguage)) {
        setLanguage(savedLanguage)
        document.documentElement.setAttribute("lang", savedLanguage)
      }
    } catch (error) {
      console.error("Error loading language preference:", error)
    }
  }, [])

  // Handle language change
  const handleSetLanguage = (lang: Language) => {
    console.log("Setting language to:", lang)
    setLanguage(lang)
    try {
      // Save language preference to localStorage immediately
      localStorage.setItem("doktrg_language", lang)
      // Set the lang attribute on the html element
      document.documentElement.setAttribute("lang", lang)
    } catch (error) {
      console.error("Error saving language preference:", error)
    }
  }

  // Translation function
  const t = (key: string) => {
    return getTranslation(key, language)
  }

  return (
    <TranslationContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  )
}
