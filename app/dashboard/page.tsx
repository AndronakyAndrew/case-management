
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Overview } from "@/components/dashboard/overview"
import { RecentCases } from "@/components/dashboard/recent-cases"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { cookies } from "next/headers"

interface Case {
  id: string
  status: "inProgress" | "completed" | "needsAttention" | string
  // ... other fields
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL

async function fetchCases(): Promise<Case[]> {
  const cookieStore = await cookies()
  const authToken = cookieStore.get('authToken')?.value
  const res = await fetch(`${apiUrl}/cases`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error("Не удалось загрузить дела")
  }

  const data = await res.json()
  return Array.isArray(data) ? data : data.cases
}

export default async function DashboardPage() {
  let cases: Case[] = []
  let error: string | null = null

  try {
    cases = await fetchCases()
  } catch (err: any) {
    error = err.message
  }

  // Compute statistics based on case statuses
  const totalTasks = cases.length
  const inProgressTasks = cases.filter(c => c.status === "inProgress").length
  const completedTasks = cases.filter(c => c.status === "completed").length
  const needsAttentionTasks = cases.filter(c => c.status === "needsAttention").length

  // Compute percentages relative to total tasks (if any)
  const inProgressPercentage = totalTasks ? Math.round((inProgressTasks / totalTasks) * 100) : 0
  const completedPercentage = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0
  const needsAttentionPercentage = totalTasks ? Math.round((needsAttentionTasks / totalTasks) * 100) : 0

  // For simplicity, keeping totalChangePercentage static; update as needed.
  const statsData = {
    totalTasks,
    totalChangePercentage: 1,
    inProgressTasks,
    inProgressPercentage,
    completedTasks,
    completedPercentage,
    needsAttentionTasks,
    needsAttentionPercentage,
  }

  return (
    <div className="space-y-8 p-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold tracking-tight">Панель управления</h1>
        <p className="text-lg text-muted-foreground">Обзор ваших дел и статистика</p>
      </div>

      {error ? (
        <p>Ошибка: {error}</p>
      ) : (
        <>
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Статистика дел</CardTitle>
              <CardDescription>Обновлено недавно</CardDescription>
            </CardHeader>
            <CardContent>
              <DashboardStats data={statsData} />
            </CardContent>
          </Card>

          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Обзор</TabsTrigger>
              <TabsTrigger value="recent">Последние дела</TabsTrigger>
              <TabsTrigger value="analytics">Аналитика</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <Overview />
            </TabsContent>
            <TabsContent value="recent" className="space-y-4">
              <RecentCases />
            </TabsContent>
            <TabsContent value="analytics" className="space-y-4">
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle>Аналитика</CardTitle>
                  <CardDescription>Подробная статистика по вашим делам</CardDescription>
                </CardHeader>
                <CardContent className="h-[400px] flex items-center justify-center border rounded-md">
                  <p className="text-muted-foreground">Графики и диаграммы будут отображаться здесь</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  )
}

