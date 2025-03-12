"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-600 p-6">
            <Card className="w-full max-w-md rounded-lg shadow-xl animate-fadeIn transition-transform duration-300 hover:scale-105">
                <CardHeader className="space-y-2 border-b border-gray-300 pb-4">
                    <CardTitle className="text-3xl font-extrabold text-center text-gray-900">
                        Регистрация в системе
                    </CardTitle>
                    <CardDescription className="text-center text-gray-700">
                        Введите ваши учетные данные для регистрации
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="username" className="text-gray-700 font-medium">
                                Имя пользователя
                            </Label>
                            <Input
                                id="username"
                                type="text"
                                placeholder="Имя пользователя"
                                value={Username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-gray-700 font-medium">
                                Пароль
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Пароль"
                                value={Password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-gray-700 font-medium">
                                Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Email"
                                value={Email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="role" className="text-gray-700 font-medium">
                                Роль
                            </Label>
                            <Input
                                id="role"
                                type="text"
                                placeholder="Роль"
                                value={Role}
                                onChange={(e) => setRole(e.target.value)}
                                required
                                className="border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4 pt-4">
                        <Button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition-colors duration-200"
                            disabled={isLoading}
                        >
                            {isLoading ? "Регистрация..." : "Зарегистрироваться"}
                        </Button>
                        <div className="text-center text-sm text-gray-800">
                            Уже есть аккаунт?{" "}
                            <Link href="/login" className="text-blue-500 hover:underline font-medium">
                                Войти
                            </Link>
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}