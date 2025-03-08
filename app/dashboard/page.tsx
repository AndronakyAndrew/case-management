import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Overview } from "@/components/dashboard/overview"
import { RecentCases } from "@/components/dashboard/recent-cases"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"

export default function DashboardPage() {
  const statsData = {
    totalTasks: 4,
    totalChangePercentage: 1,
    inProgressTasks: 4,
    inProgressPercentage: 1, // number from 0 to 100
    completedTasks: 0,
    completedPercentage: 0,
    needsAttentionTasks: 4,
    needsAttentionPercentage: 1,
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Панель управления</h1>
        <p className="text-muted-foreground">Обзор ваших дел и статистика</p>
      </div>

      <DashboardStats data={statsData} />

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
          <Card>
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
    </div>
  )
}

