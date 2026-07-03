"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Sun, Wind, Droplets, Flame, Atom } from "lucide-react"

const sources = [
  { name: "Solar", icon: Sun, value: 35, color: "bg-chart-4", trend: "+5.2%" },
  { name: "Wind", icon: Wind, value: 28, color: "bg-primary", trend: "+3.1%" },
  { name: "Hydro", icon: Droplets, value: 18, color: "bg-chart-3", trend: "-1.2%" },
  { name: "Natural Gas", icon: Flame, value: 12, color: "bg-chart-2", trend: "-2.5%" },
  { name: "Nuclear", icon: Atom, value: 7, color: "bg-chart-5", trend: "0%" },
]

export function EnergySources() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          Energy Sources Mix
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Current power generation by source
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {sources.map((source) => (
          <div key={source.name} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <source.icon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">{source.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-foreground">{source.value}%</span>
                <span className={`text-xs ${
                  source.trend.startsWith("+") ? "text-success" : 
                  source.trend.startsWith("-") ? "text-chart-2" : 
                  "text-muted-foreground"
                }`}>
                  {source.trend}
                </span>
              </div>
            </div>
            <Progress value={source.value} className="h-2" />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
