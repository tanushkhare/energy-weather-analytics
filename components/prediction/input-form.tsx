"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Thermometer, Droplets, Wind, Gauge, Calendar, Clock, Zap } from "lucide-react"
import type { PredictionInput } from "@/lib/prediction-data"

interface InputFormProps {
  onPredict: (input: PredictionInput) => void
  isLoading: boolean
}

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

export function InputForm({ onPredict, isLoading }: InputFormProps) {
  const [temperature, setTemperature] = useState(20)
  const [humidity, setHumidity] = useState(50)
  const [windSpeed, setWindSpeed] = useState(10)
  const [pressure, setPressure] = useState(1013)
  const [month, setMonth] = useState(new Date().getMonth() + 1)
  const [timeOfDay, setTimeOfDay] = useState<'morning' | 'afternoon' | 'evening' | 'night'>('afternoon')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onPredict({
      temperature,
      humidity,
      windSpeed,
      pressure,
      month,
      timeOfDay
    })
  }

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          Input Parameters
        </CardTitle>
        <CardDescription>
          Enter current or forecasted conditions to predict weather and energy efficiency
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Temperature */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2">
                <Thermometer className="h-4 w-4 text-accent" />
                Temperature
              </Label>
              <span className="text-sm font-mono text-primary">{temperature}°C</span>
            </div>
            <Slider
              value={[temperature]}
              onValueChange={(v) => setTemperature(v[0])}
              min={-10}
              max={45}
              step={1}
              className="cursor-pointer"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>-10°C</span>
              <span>45°C</span>
            </div>
          </div>

          {/* Humidity */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2">
                <Droplets className="h-4 w-4 text-chart-3" />
                Humidity
              </Label>
              <span className="text-sm font-mono text-primary">{humidity}%</span>
            </div>
            <Slider
              value={[humidity]}
              onValueChange={(v) => setHumidity(v[0])}
              min={0}
              max={100}
              step={1}
              className="cursor-pointer"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0%</span>
              <span>100%</span>
            </div>
          </div>

          {/* Wind Speed */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2">
                <Wind className="h-4 w-4 text-chart-1" />
                Wind Speed
              </Label>
              <span className="text-sm font-mono text-primary">{windSpeed} km/h</span>
            </div>
            <Slider
              value={[windSpeed]}
              onValueChange={(v) => setWindSpeed(v[0])}
              min={0}
              max={50}
              step={1}
              className="cursor-pointer"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0 km/h</span>
              <span>50 km/h</span>
            </div>
          </div>

          {/* Pressure */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2">
                <Gauge className="h-4 w-4 text-chart-4" />
                Atmospheric Pressure
              </Label>
              <span className="text-sm font-mono text-primary">{pressure} hPa</span>
            </div>
            <Slider
              value={[pressure]}
              onValueChange={(v) => setPressure(v[0])}
              min={980}
              max={1040}
              step={1}
              className="cursor-pointer"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>980 hPa</span>
              <span>1040 hPa</span>
            </div>
          </div>

          {/* Month and Time Selectors */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-chart-5" />
                Month
              </Label>
              <Select value={month.toString()} onValueChange={(v) => setMonth(parseInt(v))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {months.map((m, i) => (
                    <SelectItem key={i} value={(i + 1).toString()}>
                      {m}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                Time of Day
              </Label>
              <Select value={timeOfDay} onValueChange={(v) => setTimeOfDay(v as typeof timeOfDay)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning">Morning (6AM-12PM)</SelectItem>
                  <SelectItem value="afternoon">Afternoon (12PM-6PM)</SelectItem>
                  <SelectItem value="evening">Evening (6PM-10PM)</SelectItem>
                  <SelectItem value="night">Night (10PM-6AM)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                Analyzing...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Generate Prediction
              </span>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
