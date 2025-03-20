import { cookies } from "next/headers"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CaseList } from "@/components/cases/case-list"
import { CaseFilters } from "@/components/cases/case-filters"
import { Plus, Search } from "lucide-react"
import Link from "next/link"

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default async function CasesPage() {
  
  const cookieStore = await cookies()
    const authToken = cookieStore.get('authToken')?.value

    const res = await fetch(`${apiUrl}/cases`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      cache: "no-store",
    })

    if (!res.ok) {
      console.log(`${res.status} ${res.statusText}`)
    }

    const text = await res.text()
    let data = []
    try {
      data = text ? JSON.parse(text) : []
      console.log("Fetched data:", data)
    } catch (err) {
      console.error("Error parsing JSON:", err)
    }
  try {
    

    return (
      <main className="max-w-7xl mx-auto p-6 transform -translate-x-4 -translate-y-2">
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="p-4 bg-gradient-to-r from-blue-100 to-blue-50 rounded-md shadow-md">
              <h1 className="text-3xl font-bold tracking-tight text-gray-800">Дела</h1>
              <p className="mt-1 text-lg text-gray-600">Управляйте всеми вашими делами</p>
            </div>
            <Link href="/dashboard/cases/add" className="transition-transform duration-200 hover:scale-105">
              <Button className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white gap-2 shadow-md hover:shadow-lg px-4 py-2 rounded-md">
                <Plus className="h-4 w-4" /> Новое дело
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-64 flex-shrink-0">
            <CaseFilters />
          </div>
          <div className="flex-1 space-y-6">
            <div className="relative bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-500 shadow-md hover:shadow-xl transition-all duration-300 focus-within:ring-2 focus-within:ring-blue-500">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground transition-colors duration-300" />
              <Input placeholder="Поиск дел..." className="pl-12 border-0 focus:outline-none" />
            </div>
            <CaseList data={data} />
          </div>
        </div>
      </main>
    )
  } catch (error) {
    console.error("Error fetching cases:", error)
    return <div>Ошибка загрузки данных дел.</div>
  }
}

