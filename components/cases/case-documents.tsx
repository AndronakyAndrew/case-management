import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Download, Eye, Upload, Trash2 } from "lucide-react"

interface CaseDocumentsProps {
  id: string
}

export function CaseDocuments({ id }: CaseDocumentsProps) {
  // В реальном приложении данные будут загружаться из API
  const documents = [
    {
      id: "doc1",
      name: "Исковое заявление.pdf",
      type: "PDF",
      size: "1.2 MB",
      uploadedBy: "Анна К.",
      uploadedAt: "15 июня 2025",
    },
    {
      id: "doc2",
      name: "Договор поставки.docx",
      type: "DOCX",
      size: "845 KB",
      uploadedBy: "Иван П.",
      uploadedAt: "12 июня 2025",
    },
    {
      id: "doc3",
      name: "Акт приема-передачи.pdf",
      type: "PDF",
      size: "650 KB",
      uploadedBy: "Анна К.",
      uploadedAt: "12 июня 2025",
    },
    {
      id: "doc4",
      name: "Доверенность.pdf",
      type: "PDF",
      size: "420 KB",
      uploadedBy: "Сергей М.",
      uploadedAt: "10 июня 2025",
    },
    {
      id: "doc5",
      name: "Платежное поручение.pdf",
      type: "PDF",
      size: "380 KB",
      uploadedBy: "Иван П.",
      uploadedAt: "8 июня 2025",
    },
  ]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Документы по делу</CardTitle>
        <Button className="gap-2">
          <Upload className="h-4 w-4" /> Загрузить
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {documents.map((doc) => (
            <div key={doc.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium">{doc.name}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{doc.type}</span>
                    <span>•</span>
                    <span>{doc.size}</span>
                    <span>•</span>
                    <span>Загружено: {doc.uploadedAt}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

