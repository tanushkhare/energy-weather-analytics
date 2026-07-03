"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

const data = [
  { day: "Mon", actual: 2400, predicted: 2300, variance: 4.3 },
  { day: "Tue", actual: 2100, predicted: 2200, variance: -4.5 },
  { day: "Wed", actual: 2800, predicted: 2750, variance: 1.8 },
  { day: "Thu", actual: 2600, predicted: 2650, variance: -1.9 },
  { day: "Fri", actual: 2900, predicted: 2850, variance: 1.7 },
  { day: "Sat", actual: 2200, predicted: 2300, variance: -4.3 },
  { day: "Sun", actual: 1800, predicted: 1850, variance: -2.7 },
]

export function PredictionChart() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          Weekly Prediction Accuracy
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Comparing actual vs predicted energy usage
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(270, 5%, 22%)" />
              <XAxis 
                dataKey="day" 
                stroke="hsl(0, 0%, 60%)" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="hsl(0, 0%, 60%)" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(270, 5%, 13%)",
                  border: "1px solid hsl(270, 5%, 22%)",
                  borderRadius: "8px",
                  color: "hsl(0, 0%, 95%)",
                }}
                labelStyle={{ color: "hsl(0, 0%, 60%)" }}
              />
              <Bar dataKey="actual" fill="hsl(180, 70%, 45%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="predicted" fill="hsl(35, 80%, 55%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-sm bg-primary" />
            <span className="text-muted-foreground">Actual</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-sm bg-chart-2" />
            <span className="text-muted-foreground">Predicted</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
