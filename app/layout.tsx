import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin", "cyrillic"] })

export const metadata: Metadata = {
  title: "CaseManagement - Система управления делами",
  description: "Профессиональная система управления делами для бизнеса"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}



import './globals.css'