import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import { TranslationProvider } from "@/components/translation-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "doktR G - Smart Healthcare App",
  description: "AI-powered healthcare management application",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <TranslationProvider>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
              <Navbar />
              <main className="container mx-auto px-4 py-6">{children}</main>
            </div>
          </TranslationProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
