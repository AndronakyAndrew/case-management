"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function CaseFilters() {
  return (
    <div className="bg-gradient-to-r from-sky-50 to-white p-6 rounded-xl shadow-lg border border-gray-200 space-y-6">
      <div>
        <h3 className="mb-4 text-xl font-bold text-gray-800">Статус</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <Checkbox id="status-all" />
            <Label htmlFor="status-all" className="text-base text-gray-700">Все</Label>
          </div>
          <div className="flex items-center space-x-3">
            <Checkbox id="status-in-progress" />
            <Label htmlFor="status-in-progress" className="text-base text-gray-700">В процессе</Label>
          </div>
          <div className="flex items-center space-x-3">
            <Checkbox id="status-completed" />
            <Label htmlFor="status-completed" className="text-base text-gray-700">Завершено</Label>
          </div>
          <div className="flex items-center space-x-3">
            <Checkbox id="status-attention" />
            <Label htmlFor="status-attention" className="text-base text-gray-700">Требует внимания</Label>
          </div>
        </div>
      </div>

      <Separator className="bg-gray-300" />

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="date">
          <AccordionTrigger className="text-base font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-200">
            Дата создания
          </AccordionTrigger>
          <AccordionContent className="pt-2">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Checkbox id="date-all" />
                <Label htmlFor="date-all" className="text-base text-gray-700">Все время</Label>
              </div>
              <div className="flex items-center space-x-3">
                <Checkbox id="date-today" />
                <Label htmlFor="date-today" className="text-base text-gray-700">Сегодня</Label>
              </div>
              <div className="flex items-center space-x-3">
                <Checkbox id="date-week" />
                <Label htmlFor="date-week" className="text-base text-gray-700">Последняя неделя</Label>
              </div>
              <div className="flex items-center space-x-3">
                <Checkbox id="date-month" />
                <Label htmlFor="date-month" className="text-base text-gray-700">Последний месяц</Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Separator className="bg-gray-300" />

      <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium text-lg py-3 rounded-full transition-all duration-200 shadow-md hover:shadow-lg">
        Применить фильтры
      </Button>
    </div>
  )
}

