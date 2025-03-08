import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FileText, MessageSquare, Calendar, Clock } from "lucide-react"

interface CaseTimelineProps {
  id: string
}

export function CaseTimeline({ id }: CaseTimelineProps) {
  // В реальном приложении данные будут загружаться из API
  const timeline = [
    {
      id: "event1",
      type: "document",
      title: "Загружен документ",
      description: "Исковое заявление.pdf",
      date: "15 июня 2025, 14:30",
      user: {
        name: "Анна К.",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "АК",
      },
      icon: <FileText className="h-4 w-4" />,
    },
    {
      id: "event2",
      type: "status",
      title: "Изменен статус",
      description: "Статус изменен с 'Новое' на 'В процессе'",
      date: "12 июня 2025, 10:15",
      user: {
        name: "Иван П.",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "ИП",
      },
      icon: <Clock className="h-4 w-4" />,
    },
    {
      id: "event3",
      type: "comment",
      title: "Добавлен комментарий",
      description: "Необходимо подготовить дополнительные документы для суда",
      date: "12 июня 2025, 09:45",
      user: {
        name: "Анна К.",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "АК",
      },
      icon: <MessageSquare className="h-4 w-4" />,
    },
    {
      id: "event4",
      type: "appointment",
      title: "Назначено заседание",
      description: "Судебное заседание назначено на 25 июня 2025, 10:00",
      date: "10 июня 2025, 16:20",
      user: {
        name: "Сергей М.",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "СМ",
      },
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      id: "event5",
      type: "document",
      title: "Загружен документ",
      description: "Договор поставки.docx",
      date: "8 июня 2025, 11:05",
      user: {
        name: "Иван П.",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "ИП",
      },
      icon: <FileText className="h-4 w-4" />,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Хронология событий</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative space-y-4 before:absolute before:inset-0 before:left-4 before:ml-[6.5px] before:h-full before:w-[1px] before:bg-muted">
          {timeline.map((event) => (
            <div key={event.id} className="flex gap-4 pb-4 last:pb-0">
              <div className="relative z-10 flex h-5 w-5 items-center justify-center rounded-full bg-background ring-1 ring-border">
                {event.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">{event.title}</h4>
                  <span className="text-xs text-muted-foreground">{event.date}</span>
                </div>
                <p className="text-sm">{event.description}</p>
                <div className="mt-1 flex items-center gap-2">
                  <Avatar className="h-5 w-5">
                    <AvatarImage src={event.user.avatar} alt={event.user.name} />
                    <AvatarFallback>{event.user.initials}</AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-muted-foreground">{event.user.name}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

