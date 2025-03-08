import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CaseDetails } from "@/components/cases/case-details"
import { CaseDocuments } from "@/components/cases/case-documents"
import { CaseTimeline } from "@/components/cases/case-timeline"
import { CaseNotes } from "@/components/cases/case-notes"
import { ArrowLeft, Edit, Trash } from "lucide-react"
import Link from "next/link"

export default function CaseDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/cases">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold tracking-tight">Дело №{params.id}</h1>
              <Badge>В процессе</Badge>
            </div>
            <p className="text-muted-foreground">Создано: 15 июня 2025 • Последнее обновление: 2 дня назад</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="destructive" size="icon">
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="details" className="space-y-4">
        <TabsList>
          <TabsTrigger value="details">Детали</TabsTrigger>
          <TabsTrigger value="documents">Документы</TabsTrigger>
          <TabsTrigger value="timeline">Хронология</TabsTrigger>
          <TabsTrigger value="notes">Заметки</TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="space-y-4">
          <CaseDetails id={params.id} />
        </TabsContent>
        <TabsContent value="documents" className="space-y-4">
          <CaseDocuments id={params.id} />
        </TabsContent>
        <TabsContent value="timeline" className="space-y-4">
          <CaseTimeline id={params.id} />
        </TabsContent>
        <TabsContent value="notes" className="space-y-4">
          <CaseNotes id={params.id} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

