"use client"

import { useState } from "react"
import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { BarChart3, FileText, Home, Settings, Users, Calendar, MessageSquare, CircleAlert } from "lucide-react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { VisuallyHidden } from  "@/components/ui/visually-hidden"

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items?: {
    href: string
    title: string
    icon: React.ReactNode
  }[]
}

export function Sidebar({ className, ...props }: SidebarNavProps) {
  const pathname = usePathname()
  const [isSupportOpen, setSupportOpen] = useState(false)

  const items = [
    {
      href: "/dashboard",
      title: "Обзор",
      icon: <Home className="h-5 w-5" />,
    },
    {
      href: "/dashboard/cases",
      title: "Дела",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      href: "/dashboard/calendar",
      title: "Календарь",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      href: "/dashboard/clients",
      title: "Клиенты",
      icon: <Users className="h-5 w-5" />,
    },
    {
      href: "/dashboard/messages",
      title: "Сообщения",
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      href: "/dashboard/reports",
      title: "Отчеты",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      href: "/dashboard/settings",
      title: "Настройки",
      icon: <Settings className="h-5 w-5" />,
    },
    {
      href: "/dashboard/subscription",
      title: "Подписки",
      icon: <CircleAlert className="h-5 w-5" />,
    }
  ]

  return (
    <>
      <nav
        className={cn("hidden md:block w-64 flex-shrink-0 border-r bg-background h-[calc(100vh-4rem)] p-4", className)}
        {...props}
      >
        <div className="flex h-full flex-col justify-between">
          <div className="space-y-1">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  pathname === item.href || (pathname && pathname.startsWith(`${item.href}/`))
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground"
                )}
              >
                {item.icon}
                {item.title}
              </Link>
            ))}
          </div>
          <div className="space-y-4">
            <div className="rounded-md bg-muted p-4">
              <h4 className="mb-2 text-sm font-medium">Нужна помощь?</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Обратитесь в нашу службу поддержки для получения помощи
              </p>
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => setSupportOpen(true)}
              >
                Связаться с поддержкой
              </Button>
            </div>
          </div>
        </div>
      </nav>
      {isSupportOpen && (
        <Dialog open={isSupportOpen} onOpenChange={setSupportOpen}>
          <DialogContent>
            <VisuallyHidden>
              <DialogTitle>Служба поддержки</DialogTitle>
            </VisuallyHidden>
            <h2 className="mb-4 text-2xl font-bold text-gray-800">Служба поддержки</h2>
            <p className="mb-6 text-gray-600">
              Если вам нужна помощь, пожалуйста, напишите нам по адресу{" "}
              <a href="mailto:andronakya@gmail.com" className="text-blue-500 underline">
                andronakya@gmail.com
              </a>.
            </p>
            <Button onClick={() => setSupportOpen(false)}>Закрыть</Button>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
