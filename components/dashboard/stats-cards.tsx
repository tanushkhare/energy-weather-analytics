"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, TrendingUp, TrendingDown, Cloud, Thermometer, Droplets, Wind } from "lucide-react"

const stats = [
  {
    title: "Current Consumption",
    value: "2,847",
    unit: "kWh",
    change: "+12.5%",
    trend: "up",
    icon: Zap,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    title: "Predicted (24h)",
    value: "3,156",
    unit: "kWh",
    change: "+8.2%",
    trend: "up",
    icon: TrendingUp,
    color: "text-chart-2",
    bgColor: "bg-chart-2/10",
  },
  {
    title: "Temperature",
    value: "24",
    unit: "°C",
    change: "-2.1°C",
    trend: "down",
    icon: Thermometer,
    color: "text-chart-4",
    bgColor: "bg-chart-4/10",
  },
  {
    title: "Weather",
    value: "Partly Cloudy",
    unit: "",
    change: "Clear tonight",
    trend: "neutral",
    icon: Cloud,
    color: "text-chart-3",
    bgColor: "bg-chart-3/10",
  },
  {
    title: "Humidity",
    value: "65",
    unit: "%",
    change: "+5%",
    trend: "up",
    icon: Droplets,
    color: "text-chart-1",
    bgColor: "bg-chart-1/10",
  },
  {
    title: "Wind Speed",
    value: "12",
    unit: "km/h",
    change: "NW",
    trend: "neutral",
    icon: Wind,
    color: "text-chart-5",
    bgColor: "bg-chart-5/10",
  },
]

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {stats.map((stat) => (
        <Card key={stat.title} className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <div className={`rounded-lg p-2 ${stat.bgColor}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-foreground">{stat.value}</span>
              <span className="text-sm text-muted-foreground">{stat.unit}</span>
            </div>
            <div className="mt-1 flex items-center gap-1 text-xs">
              {stat.trend === "up" && (
                <TrendingUp className="h-3 w-3 text-success" />
              )}
              {stat.trend === "down" && (
                <TrendingDown className="h-3 w-3 text-chart-2" />
              )}
              <span className={stat.trend === "up" ? "text-success" : stat.trend === "down" ? "text-chart-2" : "text-muted-foreground"}>
                {stat.change}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
