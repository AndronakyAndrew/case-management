"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function CaseFilters() {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="mb-2 text-sm font-medium">Статус</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="status-all" />
            <Label htmlFor="status-all">Все</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="status-in-progress" />
            <Label htmlFor="status-in-progress">В процессе</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="status-completed" />
            <Label htmlFor="status-completed">Завершено</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="status-attention" />
            <Label htmlFor="status-attention">Требует внимания</Label>
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="mb-2 text-sm font-medium">Приоритет</h3>
        <RadioGroup defaultValue="all">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="priority-all" />
            <Label htmlFor="priority-all">Все</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="high" id="priority-high" />
            <Label htmlFor="priority-high">Высокий</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="medium" id="priority-medium" />
            <Label htmlFor="priority-medium">Средний</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="low" id="priority-low" />
            <Label htmlFor="priority-low">Низкий</Label>
          </div>
        </RadioGroup>
      </div>

      <Separator />

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="assignee">
          <AccordionTrigger className="text-sm font-medium">Ответственный</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-1">
              <div className="flex items-center space-x-2">
                <Checkbox id="assignee-all" />
                <Label htmlFor="assignee-all">Все</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="assignee-ivan" />
                <Label htmlFor="assignee-ivan">Иван П.</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="assignee-anna" />
                <Label htmlFor="assignee-anna">Анна К.</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="assignee-sergey" />
                <Label htmlFor="assignee-sergey">Сергей М.</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="assignee-elena" />
                <Label htmlFor="assignee-elena">Елена В.</Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="date">
          <AccordionTrigger className="text-sm font-medium">Дата создания</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-1">
              <div className="flex items-center space-x-2">
                <Checkbox id="date-all" />
                <Label htmlFor="date-all">Все время</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="date-today" />
                <Label htmlFor="date-today">Сегодня</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="date-week" />
                <Label htmlFor="date-week">Последняя неделя</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="date-month" />
                <Label htmlFor="date-month">Последний месяц</Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Separator />

      <Button className="w-full">Применить фильтры</Button>
    </div>
  )
}

