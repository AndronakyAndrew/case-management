import { cookies } from "next/headers"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CaseList } from "@/components/cases/case-list"
import { CaseFilters } from "@/components/cases/case-filters"
import { Plus, Search } from "lucide-react"
import Link from "next/link"

const apiUrl = 'http://localhost:8080';

export default async function CasesPage() {
  try {
    const cookieStore = await cookies()
    const authToken = cookieStore.get('authToken')?.value

    const res = await fetch(`${apiUrl}/cases`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      cache: "no-store",
    })

    if (!res.ok) {
      throw new Error(`Failed to fetch cases: ${res.statusText}`)
    }

    const text = await res.text()
    let data = []
    try {
      data = text ? JSON.parse(text) : []
      console.log("Fetched data:", data)
    } catch (err) {
      console.error("Error parsing JSON:", err)
    }

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Дела</h1>
            <p className="text-muted-foreground">Управляйте всеми вашими делами</p>
          </div>
          <Link href="/dashboard/cases/add">
            <Button className="gap-2">
              <Plus className="h-4 w-4" /> Новое дело
            </Button>
          </Link>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-64 flex-shrink-0">
            <CaseFilters />
          </div>
          <div className="flex-1 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Поиск дел..." className="pl-10" />
            </div>
            <CaseList data={data} />
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error("Error fetching cases:", error)
    return <div>Ошибка загрузки данных дел.</div>
  }
}

