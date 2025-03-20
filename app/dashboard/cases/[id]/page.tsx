import { error } from "console"
import { cookies } from "next/headers"
import Link from "next/link"

type CaseData = {
  caseId: string
  caseNumber: string
  clientName: string
  deadLine: string
  status: string
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL

async function getCaseData(caseId: string, authToken: string): Promise<CaseData> {
  const res = await fetch(`${apiUrl}/cases/${caseId}`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    cache: "no-store",
  })

  if (!res.ok) {
    if (res.status === 404) {
      console.error("Case not found")
    }
    throw new Error("Failed to fetch case data")
  }

  return res.json()
}

export default async function CaseDetailPage({ params }: { params: { id: string } }) {
  const { id } = await Promise.resolve(params)

  const cookieStore = await cookies()
  const authToken = cookieStore.get("authToken")?.value

  if (!authToken) {
    throw error("Unauthorized")
  }

  const caseDataResponse = await getCaseData(id, authToken);
  
  const caseData = Array.isArray(caseDataResponse) ? caseDataResponse[0] : caseDataResponse

  // Format the deadline to a more understandable format
  const formattedDeadLine = new Date(caseData.deadLine).toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric"
  })

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-blue-200 to-indigo-200 flex flex-col items-center justify-center p-6">
      {/* Floating Back Button */}
      <div className="absolute top-6 left-6 z-20">
        <Link
          href="/dashboard/cases"
          className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md shadow-lg hover:bg-blue-600 hover:scale-105 transition transform duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          &larr; Назад
        </Link>
      </div>
      {/* Main Content */}
      <div className="z-10">
        {/* Header Section */}
        <header className="mb-8">
          <h1 className="text-4xl font-extrabold text-gray-800">Детали Дела</h1>
        </header>
        {/* Card Section */}
        <div className="max-w-lg w-full bg-white shadow-2xl rounded-xl p-8 transition-transform transform hover:scale-105">
          <div className="mb-4 border-b pb-2">
            <h2 className="text-3xl font-bold text-gray-900">№ {caseData.caseNumber}</h2>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-lg text-gray-700">
                <span className="font-semibold">Имя клиента:</span> {caseData.clientName}
              </p>
            </div>
            <div>
              <p className="text-lg text-gray-700">
                <span className="font-semibold">Срок:</span> {formattedDeadLine}
              </p>
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-lg text-gray-700">Статус:</span>
              <span
                className={`ml-3 inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  caseData.status === "В процессе" ? "bg-yellow-500 text-white" :
                  caseData.status === "Завершен" ? "bg-green-500 text-white" :
                  caseData.status === "Закрыт" ? "bg-red-500 text-white" :
                  caseData.status === "Открыт" ? "bg-blue-500 text-white" :
                  "bg-gray-500 text-white"
                }`}
              >
                {caseData.status}
              </span>
            </div>
          </div>
          {/* Edit Button */}
          <div className="mt-4 flex justify-end">
            <Link
              href={`/dashboard/cases/edit/${caseData.caseId}`}
              className="inline-flex items-center justify-center px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-600 transform hover:scale-105 transition duration-200 focus:outline-none"
            >
              Редактировать
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
