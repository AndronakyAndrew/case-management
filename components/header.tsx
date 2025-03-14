"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Menu, Search } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Sidebar } from "@/components/sidebar"
import { useRouter } from "next/navigation"
import Link from "next/link"

export function Header() {
  const router = useRouter()
  const [notificationCount] = useState(3) // Example dynamic notification count

  const handleLogout = () => {
    router.push("/")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur shadow-md transition-colors">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4 md:gap-8">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="md:hidden hover:scale-105 transition-transform"
                aria-label="Open Sidebar"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
              <Sidebar />
            </SheetContent>
          </Sheet>
          <div className="hidden md:flex items-center gap-2 font-bold text-xl text-primary">
            CaseManagement
          </div>
          <div className="relative hidden md:flex items-center w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Поиск..." 
              className="pl-10 py-2 rounded-full shadow-sm focus:ring-2 focus:ring-primary transition-all" 
              aria-label="Search"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="relative hover:scale-105 transition-transform"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            {notificationCount > 0 && (
              <span className="absolute top-1 right-1 flex h-3 w-3 items-center justify-center rounded-full bg-destructive text-[10px] text-white">
                {notificationCount}
              </span>
            )}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-9 w-9 rounded-full hover:scale-105 transition-transform"
                aria-label="User menu"
              >
                <Avatar className="h-9 w-9">
                  <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Аватар" />
                  <AvatarFallback>ИП</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="p-2 shadow-lg rounded-md transition-all">
              <DropdownMenuLabel className="font-semibold">Мой аккаунт</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className="hover:bg-muted rounded-sm">
                <Link href="/dashboard/settings">Настройки</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="hover:bg-muted rounded-sm">
                Выйти
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

