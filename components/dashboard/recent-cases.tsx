import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function RecentCases() {
  const recentCases = [
    {
      id: "1234",
      title: "Договор с ООО «Альфа»",
      client: "ООО «Альфа»",
      status: "В процессе",
      statusColor: "bg-amber-500",
      date: "15 июня 2025",
      assignee: {
        name: "Иван П.",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "ИП",
      },
    },
    {
      id: "1235",
      title: "Судебное дело №45-678",
      client: "ИП Смирнов",
      status: "Требует внимания",
      statusColor: "bg-destructive",
      date: "12 июня 2025",
      assignee: {
        name: "Анна К.",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "АК",
      },
    },
    {
      id: "1236",
      title: "Регистрация товарного знака",
      client: "ЗАО «Бета»",
      status: "Завершено",
      statusColor: "bg-emerald-500",
      date: "10 июня 2025",
      assignee: {
        name: "Сергей М.",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "СМ",
      },
    },
    {
      id: "1237",
      title: "Консультация по налогам",
      client: "ООО «Гамма»",
      status: "В процессе",
      statusColor: "bg-amber-500",
      date: "8 июня 2025",
      assignee: {
        name: "Елена В.",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "ЕВ",
      },
    },
    {
      id: "1238",
      title: "Трудовой спор",
      client: "ООО «Дельта»",
      status: "Завершено",
      statusColor: "bg-emerald-500",
      date: "5 июня 2025",
      assignee: {
        name: "Иван П.",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "ИП",
      },
    },
  ]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Последние дела</CardTitle>
          <CardDescription>Недавно созданные и обновленные дела</CardDescription>
        </div>
        <Link href="/dashboard/cases">
          <Button variant="outline" size="sm" className="gap-1">
            Все дела <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentCases.map((caseItem) => (
            <div key={caseItem.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
              <div className="space-y-1">
                <Link href={`/dashboard/cases/${caseItem.id}`} className="font-medium hover:underline">
                  {caseItem.title}
                </Link>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{caseItem.client}</span>
                  <span>•</span>
                  <span>{caseItem.date}</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${caseItem.statusColor}`} />
                  <span className="text-sm">{caseItem.status}</span>
                </div>
                <Avatar className="h-8 w-8">
                  <AvatarImage src={caseItem.assignee.avatar} alt={caseItem.assignee.name} />
                  <AvatarFallback>{caseItem.assignee.initials}</AvatarFallback>
                </Avatar>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

