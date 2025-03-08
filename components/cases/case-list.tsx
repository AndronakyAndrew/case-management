import React from "react"

interface Case {
  id: string
  caseNumber: string
  clientName: string
  status: string
}

interface CaseListProps {
  data: Case[]
}

export function CaseList({ data }: CaseListProps) {
  if (!data.length) {
    return <div className="text-center text-gray-500 py-4">Нет дел для отображения.</div>
  }

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {data.map((c) => (
        <li key={c.id} className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
          <div className="mb-2">
            <span className="block text-sm font-medium text-gray-500">Номер дела</span>
            <span className="block text-lg font-semibold text-gray-800">{c.caseNumber}</span>
          </div>
          <div className="mb-2">
            <span className="block text-sm font-medium text-gray-500">Клиент</span>
            <span className="block text-lg text-gray-800">{c.clientName}</span>
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-500">Статус</span>
            <span
              className={`inline-block px-2 py-1 rounded-full text-xs font-semibold text-white ${
                c.status === "Active"
                  ? "bg-green-500"
                  : c.status === "Pending"
                  ? "bg-yellow-500"
                  : "bg-gray-500"
              }`}>
              {c.status}
            </span>
          </div>
        </li>
      ))}
    </ul>
  )
}
