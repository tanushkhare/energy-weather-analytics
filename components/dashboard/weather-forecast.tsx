"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sun, Cloud, CloudRain, CloudSnow, Wind } from "lucide-react"

const forecast = [
  { day: "Today", icon: Sun, temp: 24, high: 26, low: 18, condition: "Sunny" },
  { day: "Tue", icon: Cloud, temp: 22, high: 23, low: 17, condition: "Cloudy" },
  { day: "Wed", icon: CloudRain, temp: 19, high: 20, low: 15, condition: "Rainy" },
  { day: "Thu", icon: Cloud, temp: 21, high: 22, low: 16, condition: "Cloudy" },
  { day: "Fri", icon: Sun, temp: 25, high: 27, low: 19, condition: "Sunny" },
  { day: "Sat", icon: Wind, temp: 23, high: 24, low: 18, condition: "Windy" },
  { day: "Sun", icon: Sun, temp: 26, high: 28, low: 20, condition: "Sunny" },
]

export function WeatherForecast() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          7-Day Weather Forecast
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Weather conditions affecting energy demand
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {forecast.map((day, index) => (
            <div
              key={day.day}
              className={`flex items-center justify-between rounded-lg p-3 ${
                index === 0 ? "bg-secondary" : "hover:bg-secondary/50"
              } transition-colors`}
            >
              <div className="flex items-center gap-3">
                <day.icon className={`h-6 w-6 ${
                  day.icon === Sun ? "text-chart-4" : 
                  day.icon === CloudRain ? "text-chart-3" : 
                  "text-muted-foreground"
                }`} />
                <div>
                  <p className="font-medium text-foreground">{day.day}</p>
                  <p className="text-xs text-muted-foreground">{day.condition}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-lg font-semibold text-foreground">{day.temp}°</span>
                <div className="text-xs text-muted-foreground">
                  <span className="text-chart-2">{day.high}°</span>
                  {" / "}
                  <span className="text-chart-3">{day.low}°</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
