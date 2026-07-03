"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Cloud, CloudRain, CloudLightning, Sun } from "lucide-react"
import type { PredictionResult } from "@/lib/prediction-data"

interface WeatherResultProps {
  result: PredictionResult | null
}

const weatherIcons = {
  clear: Sun,
  cloudy: Cloud,
  rainy: CloudRain,
  stormy: CloudLightning,
}

const weatherColors = {
  clear: "text-warning",
  cloudy: "text-muted-foreground",
  rainy: "text-chart-3",
  stormy: "text-chart-5",
}

const weatherLabels = {
  clear: "Clear Sky",
  cloudy: "Cloudy",
  rainy: "Rainy",
  stormy: "Stormy",
}

export function WeatherResult({ result }: WeatherResultProps) {
  if (!result) {
    return (
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cloud className="h-5 w-5 text-primary" />
            Weather Prediction
          </CardTitle>
          <CardDescription>
            Enter parameters and click predict to see weather probabilities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex h-48 items-center justify-center text-muted-foreground">
            <p>Waiting for input...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const { weatherProbabilities } = result
  const sortedWeather = Object.entries(weatherProbabilities)
    .sort(([, a], [, b]) => b - a)
  
  const topWeather = sortedWeather[0][0] as keyof typeof weatherIcons
  const TopIcon = weatherIcons[topWeather]

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Cloud className="h-5 w-5 text-primary" />
          Weather Prediction
        </CardTitle>
        <CardDescription>
          Probability of each weather condition based on input parameters
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Main Prediction Display */}
        <div className="flex items-center justify-center gap-4 rounded-lg bg-secondary/50 p-6">
          <TopIcon className={`h-16 w-16 ${weatherColors[topWeather]}`} />
          <div>
            <p className="text-3xl font-bold text-foreground">
              {weatherProbabilities[topWeather]}%
            </p>
            <p className="text-sm text-muted-foreground">
              Most likely: {weatherLabels[topWeather]}
            </p>
          </div>
        </div>

        {/* All Probabilities */}
        <div className="space-y-4">
          {sortedWeather.map(([condition, probability]) => {
            const Icon = weatherIcons[condition as keyof typeof weatherIcons]
            const color = weatherColors[condition as keyof typeof weatherColors]
            const label = weatherLabels[condition as keyof typeof weatherLabels]
            
            return (
              <div key={condition} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className={`h-4 w-4 ${color}`} />
                    <span className="text-sm font-medium">{label}</span>
                  </div>
                  <span className="text-sm font-mono text-primary">{probability}%</span>
                </div>
                <Progress 
                  value={probability} 
                  className="h-2"
                />
              </div>
            )
          })}
        </div>

        {/* Confidence Indicator */}
        <div className="rounded-lg border border-border/50 bg-secondary/30 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Prediction Confidence</span>
            <span className={`text-lg font-bold ${
              result.confidence >= 80 ? 'text-success' : 
              result.confidence >= 60 ? 'text-warning' : 'text-destructive'
            }`}>
              {result.confidence}%
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
