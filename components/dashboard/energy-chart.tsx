"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

const data = [
  { time: "00:00", consumption: 1200, prediction: 1180 },
  { time: "02:00", consumption: 980, prediction: 1020 },
  { time: "04:00", consumption: 850, prediction: 890 },
  { time: "06:00", consumption: 1100, prediction: 1150 },
  { time: "08:00", consumption: 1800, prediction: 1750 },
  { time: "10:00", consumption: 2400, prediction: 2350 },
  { time: "12:00", consumption: 2800, prediction: 2750 },
  { time: "14:00", consumption: 2650, prediction: 2700 },
  { time: "16:00", consumption: 2900, prediction: 2850 },
  { time: "18:00", consumption: 3200, prediction: 3100 },
  { time: "20:00", consumption: 2800, prediction: 2900 },
  { time: "22:00", consumption: 2100, prediction: 2150 },
]

export function EnergyChart() {
  return (
    <Card className="col-span-2 bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg font-semibold text-foreground">
            Energy Consumption
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Real-time vs Predicted consumption (kWh)
          </p>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-primary" />
            <span className="text-muted-foreground">Actual</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-chart-2" />
            <span className="text-muted-foreground">Predicted</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorConsumption" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(180, 70%, 45%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(180, 70%, 45%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorPrediction" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(35, 80%, 55%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(35, 80%, 55%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(270, 5%, 22%)" />
              <XAxis 
                dataKey="time" 
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
                tickFormatter={(value) => `${value}`}
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
              <Area
                type="monotone"
                dataKey="consumption"
                stroke="hsl(180, 70%, 45%)"
                fillOpacity={1}
                fill="url(#colorConsumption)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="prediction"
                stroke="hsl(35, 80%, 55%)"
                fillOpacity={1}
                fill="url(#colorPrediction)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
