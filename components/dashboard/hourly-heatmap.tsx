"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const hours = Array.from({ length: 24 }, (_, i) => i)

// Generate sample heatmap data
const generateHeatmapData = () => {
  return days.map((day) => ({
    day,
    hours: hours.map((hour) => {
      // Simulate higher usage during peak hours (8-10, 18-21)
      let base = Math.random() * 30 + 20
      if (hour >= 8 && hour <= 10) base += 40
      if (hour >= 18 && hour <= 21) base += 50
      if (hour >= 0 && hour <= 5) base -= 20
      if (day === "Sat" || day === "Sun") base -= 15
      return Math.max(10, Math.min(100, base))
    }),
  }))
}

const heatmapData = generateHeatmapData()

const getColor = (value: number) => {
  if (value < 30) return "bg-chart-3/20"
  if (value < 50) return "bg-chart-3/40"
  if (value < 70) return "bg-primary/50"
  if (value < 85) return "bg-chart-2/60"
  return "bg-chart-2"
}

export function HourlyHeatmap() {
  return (
    <Card className="col-span-2 bg-card border-border">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          Weekly Usage Pattern
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Hourly energy consumption heatmap
        </p>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <div className="min-w-[600px]">
            {/* Hour labels */}
            <div className="flex mb-2">
              <div className="w-12" />
              {hours.filter((_, i) => i % 3 === 0).map((hour) => (
                <div
                  key={hour}
                  className="flex-1 text-center text-xs text-muted-foreground"
                  style={{ width: `${100 / 8}%` }}
                >
                  {hour.toString().padStart(2, "0")}:00
                </div>
              ))}
            </div>
            
            {/* Heatmap rows */}
            {heatmapData.map((row) => (
              <div key={row.day} className="flex items-center mb-1">
                <div className="w-12 text-xs font-medium text-muted-foreground">
                  {row.day}
                </div>
                <div className="flex flex-1 gap-0.5">
                  {row.hours.map((value, hourIndex) => (
                    <div
                      key={hourIndex}
                      className={`flex-1 h-6 rounded-sm ${getColor(value)} transition-colors hover:ring-1 hover:ring-foreground/20`}
                      title={`${row.day} ${hourIndex}:00 - ${value.toFixed(0)}% capacity`}
                    />
                  ))}
                </div>
              </div>
            ))}
            
            {/* Legend */}
            <div className="flex items-center justify-end gap-4 mt-4">
              <span className="text-xs text-muted-foreground">Low</span>
              <div className="flex gap-1">
                <div className="h-4 w-6 rounded-sm bg-chart-3/20" />
                <div className="h-4 w-6 rounded-sm bg-chart-3/40" />
                <div className="h-4 w-6 rounded-sm bg-primary/50" />
                <div className="h-4 w-6 rounded-sm bg-chart-2/60" />
                <div className="h-4 w-6 rounded-sm bg-chart-2" />
              </div>
              <span className="text-xs text-muted-foreground">High</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
