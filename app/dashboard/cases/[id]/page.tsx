import { cookies } from "next/headers"

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
      console.error('Case not found')
    }
    throw new Error('Failed to fetch case data')
  }

  return res.json()
}

export default async function CaseDetailPage({ params }: { params: { id: string } }) {
  const cookieStore = await cookies()
  const authToken = cookieStore.get("authToken")?.value

  if (!authToken) {
    throw new Error('Authentication required')
  }

  const caseDataResponse = await getCaseData(params.id, authToken)
  // If the API returns an array, use the first case object.
  const caseData = Array.isArray(caseDataResponse) ? caseDataResponse[0] : caseDataResponse

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">№ case: {caseData.caseNumber}</h2>
        <div className="space-y-3">
          <p className="text-gray-700">
            <span className="font-semibold">Имя клиента:</span> {caseData.clientName}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Срок:</span> {caseData.deadLine}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Статус:</span>
            <span
              className={`ml-2 inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                caseData.status === "Active"
                  ? "bg-green-500 text-white"
                  : caseData.status === "Pending"
                  ? "bg-yellow-500 text-white"
                  : "bg-gray-500 text-white"
              }`}
            >
              {caseData.status}
            </span>
          </p>
        </div>
        
      </div>
    </div>
  )
}
