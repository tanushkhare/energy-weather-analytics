"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { History } from "lucide-react"
import { historicalData } from "@/lib/prediction-data"

const monthlyData = Array.from({ length: 12 }, (_, i) => {
  const monthData = historicalData.filter(d => d.month === i + 1)
  return {
    month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
    consumption: Math.round(monthData.reduce((s, d) => s + d.energyConsumption, 0) / monthData.length),
    solar: Math.round(monthData.reduce((s, d) => s + d.solarEfficiency, 0) / monthData.length),
    wind: Math.round(monthData.reduce((s, d) => s + d.windEfficiency, 0) / monthData.length),
  }
})

export function HistoryChart() {
  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm lg:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="h-5 w-5 text-primary" />
          Historical Trends
        </CardTitle>
        <CardDescription>
          Monthly average energy consumption and renewable efficiency based on past data
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} />
              <XAxis 
                dataKey="month" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                yAxisId="left"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                label={{ value: 'kWh', angle: -90, position: 'insideLeft', fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis 
                yAxisId="right"
                orientation="right"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                label={{ value: '%', angle: 90, position: 'insideRight', fill: 'hsl(var(--muted-foreground))' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  borderColor: 'hsl(var(--border))',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
              />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="consumption"
                stroke="hsl(var(--accent))"
                strokeWidth={2}
                dot={{ fill: 'hsl(var(--accent))', strokeWidth: 0 }}
                name="Consumption (kWh)"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="solar"
                stroke="hsl(var(--warning))"
                strokeWidth={2}
                dot={{ fill: 'hsl(var(--warning))', strokeWidth: 0 }}
                name="Solar Efficiency (%)"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="wind"
                stroke="hsl(var(--chart-1))"
                strokeWidth={2}
                dot={{ fill: 'hsl(var(--chart-1))', strokeWidth: 0 }}
                name="Wind Efficiency (%)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
