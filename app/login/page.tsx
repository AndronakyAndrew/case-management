"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import Cookies from "js-cookie"

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function LoginPage() {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Username, Password }),
      });

      if (!response.ok) {
        toast({ title: "Ошибка входа", description: "Authentication failed" });
        return;
      }

      const data = await response.json();

      if (!data.token) {
        toast({ title: "Ошибка входа", description: "No token received from authentication server" });
        return;
      }

      Cookies.set("authToken", data.token, { expires: 7 });
      router.push("/dashboard");
    } catch (error) {
      console.error("Error during login:", error);
      toast({
        title: "Ошибка входа",
        description: error instanceof Error ? error.message : "Произошла неизвестная ошибка",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-600 p-6">
      <Card className="w-full max-w-md rounded-lg shadow-xl animate-fadeIn transition-transform duration-300 hover:scale-105">
        <CardHeader className="space-y-2 border-b border-gray-300 pb-4">
          <CardTitle className="text-3xl font-extrabold text-center text-gray-900">
            Вход в систему
          </CardTitle>
          <CardDescription className="text-center text-gray-700">
            Введите ваши учетные данные для входа
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
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-gray-700 font-medium">
                  Пароль
                </Label>
                <Link href="/forgot-password" className="text-sm text-blue-500 hover:underline">
                  Забыли пароль?
                </Link>
              </div>
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
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 pt-4">
            <Button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition-colors duration-200"
              disabled={isLoading}
            >
              {isLoading ? "Вход..." : "Войти"}
            </Button>
            <div className="text-center text-sm text-gray-800">
              Нет аккаунта?{" "}
              <Link href="/register" className="text-blue-500 hover:underline font-medium">
                Зарегистрироваться
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

