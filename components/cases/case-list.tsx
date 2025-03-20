"use client";

import Link from "next/link"
import React from "react"
import { Button } from "@/components/ui/button"
import DeleteCaseButton from "./DeleteCaseButton"

interface Case {
  caseId: string
  caseNumber: string
  clientName: string
  status: string
}

interface CaseListProps {
  data: Case[]
}

export function CaseList({ data }: CaseListProps) {
  const [cases, setCases] = React.useState<Case[]>(data)

  const getStatusClasses = (status: string) => {
    switch (status) {
      case "В процессе":
        return {
          stripe: "bg-yellow-500",
          badge: "bg-yellow-500"
        }
      case "Завершен":
        return {
          stripe: "bg-green-500",
          badge: "bg-green-500"
        }
      case "Открыт":
        return{
          stripe: "bg-blue-500",
          badge: "bg-blue-500"
        }
      case "Закрыт":
        return {
          stripe: "bg-red-500",
          badge: "bg-red-500"
        }
      default:
        return {
          stripe: "bg-gray-500",
          badge: "bg-gray-500"
        }
    }
  }

  const handleDelete = (deletedId: string) => {
    setCases(cases.filter(c => c.caseId !== deletedId))
  }

  if (!cases.length) {
    return <div className="text-center text-gray-500 py-4">Нет дел для отображения.</div>
  }

  const getStatusClasses = (status: string) => {
    switch (status) {
      case "В процессе":
        return {
          stripe: "bg-yellow-500",
          badge: "bg-yellow-500"
        }
      case "Закрыт":
        return {
          stripe: "bg-green-500",
          badge: "bg-green-500"
        }
      default:
        return {
          stripe: "bg-green-500",
          badge: "bg-green-500"
        }
    }
  }

  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {cases.map((c) => {
        const { stripe, badge } = getStatusClasses(c.status)
        return (
          <li
            key={c.caseId}
            className="bg-white rounded-lg shadow-md overflow-hidden transition transform hover:shadow-xl hover:-translate-y-2"
          >
            <div className={`${stripe} h-1`} />
            <div className="p-6 flex flex-col justify-between h-full">
              <div>
                <div className="mb-4">
                  <span className="block text-xs font-medium text-gray-400">Номер дела</span>
                  <span className="block text-xl font-bold text-gray-800">{c.caseNumber}</span>
                </div>
                <div className="mb-4">
                  <span className="block text-xs font-medium text-gray-400">Клиент</span>
                  <span className="block text-lg text-gray-700">{c.clientName}</span>
                </div>
                <div className="mb-4">
                  <span className="block text-xs font-medium text-gray-400">Статус</span>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold text-white ${badge}`}
                  >
                    {c.status}
                  </span>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <Link href={`/dashboard/cases/${c.caseId}`}>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 border border-blue-500 text-blue-500 px-4 py-2 rounded-full hover:bg-blue-50 transition-colors duration-200"
                  >
                    <span>Детали</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Button>
                </Link>
                {/* Delete button */}
                <DeleteCaseButton caseId={c.caseId} onDelete={() => handleDelete(c.caseId)} />
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
