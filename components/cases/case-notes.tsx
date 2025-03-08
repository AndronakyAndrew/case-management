"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send } from "lucide-react"

interface CaseNotesProps {
  id: string
}

export function CaseNotes({ id }: CaseNotesProps) {
  const [newNote, setNewNote] = useState("")

  // В реальном приложении данные будут загружаться из API
  const notes = [
    {
      id: "note1",
      content: "Подготовлены и направлены запросы в государственные органы для получения необходимых документов.",
      createdAt: "15 июня 2025, 15:45",
      user: {
        name: "Анна К.",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "АК",
      },
    },
    {
      id: "note2",
      content:
        "Проведена консультация с клиентом. Обсуждены возможные варианты решения спора. Клиент предпочитает продолжить судебное разбирательство.",
      createdAt: "12 июня 2025, 11:30",
      user: {
        name: "Иван П.",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "ИП",
      },
    },
    {
      id: "note3",
      content:
        "Изучены материалы дела. Выявлены потенциальные риски. Необходимо запросить дополнительные документы у клиента.",
      createdAt: "10 июня 2025, 09:15",
      user: {
        name: "Сергей М.",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "СМ",
      },
    },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newNote.trim()) return

    // В реальном приложении здесь будет отправка на сервер
    console.log("Новая заметка:", newNote)
    setNewNote("")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Заметки</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          {notes.map((note) => (
            <div key={note.id} className="rounded-lg border p-4">
              <div className="flex items-center gap-2 mb-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={note.user.avatar} alt={note.user.name} />
                  <AvatarFallback>{note.user.initials}</AvatarFallback>
                </Avatar>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{note.user.name}</span>
                  <span className="text-xs text-muted-foreground">{note.createdAt}</span>
                </div>
              </div>
              <p className="text-sm">{note.content}</p>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="Добавить заметку..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            className="min-h-[100px]"
          />
          <div className="flex justify-end">
            <Button type="submit" className="gap-2">
              <Send className="h-4 w-4" /> Отправить
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

