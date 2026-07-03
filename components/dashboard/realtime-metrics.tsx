"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  YAxis,
} from "recharts"

const generateData = () => {
  return Array.from({ length: 20 }, (_, i) => ({
    time: i,
    value: Math.floor(Math.random() * 500) + 2500,
  }))
}

export function RealtimeMetrics() {
  const [data, setData] = useState(generateData())
  const [currentValue, setCurrentValue] = useState(2847)

  useEffect(() => {
    const interval = setInterval(() => {
      const newValue = Math.floor(Math.random() * 500) + 2500
      setCurrentValue(newValue)
      setData((prev) => {
        const newData = [...prev.slice(1), { time: prev.length, value: newValue }]
        return newData
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-foreground">
          Real-time Power Load
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Live monitoring of grid power consumption
        </p>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-4xl font-bold text-primary">{currentValue.toLocaleString()}</span>
          <span className="text-lg text-muted-foreground">kW</span>
          <div className="ml-auto flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
            <span className="text-xs text-muted-foreground">Live</span>
          </div>
        </div>
        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <YAxis hide domain={['dataMin - 100', 'dataMax + 100']} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(270, 5%, 13%)",
                  border: "1px solid hsl(270, 5%, 22%)",
                  borderRadius: "8px",
                  color: "hsl(0, 0%, 95%)",
                }}
                labelFormatter={() => "Current"}
                formatter={(value: number) => [`${value.toLocaleString()} kW`, "Load"]}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="hsl(180, 70%, 45%)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-xs text-muted-foreground">Min</p>
            <p className="text-sm font-semibold text-foreground">2,124 kW</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Avg</p>
            <p className="text-sm font-semibold text-foreground">2,756 kW</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Max</p>
            <p className="text-sm font-semibold text-foreground">3,421 kW</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
