import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, FileText, Clock, CheckCircle, AlertCircle } from "lucide-react"

interface DashboardStatsProps {
    data: {
        totalTasks: number,
        totalChangePercentage: number,
        inProgressTasks: number,
        inProgressPercentage: number, // number from 0 to 100
        completedTasks: number,
        completedPercentage: number,
        needsAttentionTasks: number,
        needsAttentionPercentage: number,
    }
}

export function DashboardStats({ data }: DashboardStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Всего дел</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.totalTasks}</div>
          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
            <span className="text-emerald-500 flex items-center">
              <ArrowUpRight className="h-3 w-3" /> {data.totalChangePercentage > 0 ? `+${data.totalChangePercentage}%` : `${data.totalChangePercentage}%`}
            </span>
            с прошлого месяца
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">В процессе</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.inProgressTasks}</div>
          <div className="h-1 w-full bg-muted mt-2 rounded-full overflow-hidden">
            <div className="h-full bg-amber-500" style={{ width: `${data.inProgressPercentage}%` }} />
          </div>
          <p className="text-xs text-muted-foreground mt-1">{data.inProgressPercentage}% от всех дел</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Завершено</CardTitle>
          <CheckCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.completedTasks}</div>
          <div className="h-1 w-full bg-muted mt-2 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500" style={{ width: `${data.completedPercentage}%` }} />
          </div>
          <p className="text-xs text-muted-foreground mt-1">{data.completedPercentage}% от всех дел</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Требуют внимания</CardTitle>
          <AlertCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.needsAttentionTasks}</div>
          <div className="h-1 w-full bg-muted mt-2 rounded-full overflow-hidden">
            <div className="h-full bg-destructive" style={{ width: `${data.needsAttentionPercentage}%` }} />
          </div>
          <p className="text-xs text-muted-foreground mt-1">{data.needsAttentionPercentage}% от всех дел</p>
        </CardContent>
      </Card>
    </div>
  )
}

