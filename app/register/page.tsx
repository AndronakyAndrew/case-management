"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import Cookies from "js-cookie"

const apiUrl = 'http://localhost:8080';

export default function RegisterPage() {
    const [Username, setUsername] = useState("")
    const [Password, setPassword] = useState("")
    const [Email, setEmail] = useState("")
    const [Role, setRole] = useState("user")
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const { toast } = useToast()
    
  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
        setIsLoading(true)
    
        try {
          const response = await fetch(`${apiUrl}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Username, Password, Email, Role }),
          })
          
          if (!response.ok) {
            toast({ title: "Ошибка регистрации", description: "Registration failed" })
            return
          }
          
          router.push("/dashboard")
        } catch (error) {
          console.error('Error during register:', error)
           toast({
             title: "Ошибка регистрации",
             description: error instanceof Error ? error.message : "Произошла неизвестная ошибка",
           })
        } finally {
          setIsLoading(false)
        }
      }
      return (
        <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Регистрация в системе</CardTitle>
              <CardDescription>Введите ваши учетные данные для регистрация</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Имя пользователя</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Имя пользователя"
                    value={Username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Пароль</Label>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={Password}
                    placeholder="Пароль"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="Email"
                        value={Email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="role">Роль</Label>
                    <Input
                        id="role"
                        type="role"
                        placeholder="Роль"
                        value={Role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                    />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Регистрация..." : "Зарегистрироваться"}
                </Button>
                <div className="text-center text-sm">
                  Есть аккаунта?{" "}
                  <Link href="/login" className="text-primary hover:underline">
                    Войти
                  </Link>
                </div>
              </CardFooter>
            </form>
          </Card>
        </div>
      )
}