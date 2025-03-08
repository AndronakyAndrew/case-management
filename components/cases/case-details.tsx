import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface CaseDetailsProps {
  id: string
}

export function CaseDetails({ id }: CaseDetailsProps) {
  // В реальном приложении данные будут загружаться из API
  const caseData = {
    id,
    title: "Судебное дело №45-678",
    description:
      "Представление интересов клиента в арбитражном суде по делу о взыскании задолженности по договору поставки.",
    client: {
      name: "ИП Смирнов",
      contact: "Смирнов Алексей Петрович",
      phone: "+7 (999) 123-45-67",
      email: "smirnov@example.com",
      avatar: "/placeholder.svg?height=64&width=64",
      initials: "АС",
    },
    assignee: {
      name: "Анна К.",
      position: "Юрист",
      avatar: "/placeholder.svg?height=64&width=64",
      initials: "АК",
    },
    status: "В процессе",
    priority: "Высокий",
    category: "Арбитражные споры",
    createdAt: "12 июня 2025",
    updatedAt: "15 июня 2025",
    dueDate: "30 июля 2025",
    court: "Арбитражный суд г. Тирасполь",
    caseNumber: "А-12345/2025",
    amount: "450 000 руб.",
    nextHearing: "25 июня 2025, 10:00",
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Основная информация</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">Название дела</h4>
            <p>{caseData.title}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">Описание</h4>
            <p className="text-sm">{caseData.description}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Категория</h4>
              <p className="text-sm">{caseData.category}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Номер дела</h4>
              <p className="text-sm">{caseData.caseNumber}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Статус</h4>
              <Badge
                variant="outline"
                className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 hover:text-amber-500"
              >
                {caseData.status}
              </Badge>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Приоритет</h4>
              <Badge
                variant="outline"
                className="bg-destructive/10 text-destructive hover:bg-destructive/20 hover:text-destructive"
              >
                {caseData.priority}
              </Badge>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Дата создания</h4>
              <p className="text-sm">{caseData.createdAt}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Срок исполнения</h4>
              <p className="text-sm">{caseData.dueDate}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Клиент</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={caseData.client.avatar} alt={caseData.client.name} />
                <AvatarFallback>{caseData.client.initials}</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-medium">{caseData.client.name}</h4>
                <p className="text-sm text-muted-foreground">{caseData.client.contact}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Телефон</h4>
                <p className="text-sm">{caseData.client.phone}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Email</h4>
                <p className="text-sm">{caseData.client.email}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Судебная информация</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Суд</h4>
              <p className="text-sm">{caseData.court}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Сумма иска</h4>
                <p className="text-sm">{caseData.amount}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Следующее заседание</h4>
                <p className="text-sm">{caseData.nextHearing}</p>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Ответственный</h4>
              <div className="flex items-center gap-2 mt-1">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={caseData.assignee.avatar} alt={caseData.assignee.name} />
                  <AvatarFallback>{caseData.assignee.initials}</AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  {caseData.assignee.name}, {caseData.assignee.position}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

