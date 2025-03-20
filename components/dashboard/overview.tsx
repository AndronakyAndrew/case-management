"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

export function Overview() {
  const data = [
    { name: "Мар", всего: 6 },
    { name: "Апр", всего: 0 },
    { name: "Май", всего: 0 },
    { name: "Июн", всего: 0 },
    { name: "Июл", всего: 0 },
    { name: "Авг", всего: 0 },
    { name: "Сен", всего: 0 }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Обзор дел</CardTitle>
        <CardDescription>Количество новых дел за последние 7 месяцев</CardDescription>
      </CardHeader>
      <CardContent className="px-2">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip />
            <Bar dataKey="всего" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

