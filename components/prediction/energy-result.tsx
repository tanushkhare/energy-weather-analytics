"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Zap, Sun, Wind, Activity, TrendingUp } from "lucide-react"
import type { PredictionResult } from "@/lib/prediction-data"

interface EnergyResultProps {
  result: PredictionResult | null
}

export function EnergyResult({ result }: EnergyResultProps) {
  if (!result) {
    return (
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Energy Efficiency
          </CardTitle>
          <CardDescription>
            Predicted energy metrics based on weather conditions
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

  const { energyPrediction } = result

  const getEfficiencyColor = (value: number) => {
    if (value >= 70) return 'text-success'
    if (value >= 40) return 'text-warning'
    return 'text-destructive'
  }

  const getEfficiencyLabel = (value: number) => {
    if (value >= 80) return 'Excellent'
    if (value >= 60) return 'Good'
    if (value >= 40) return 'Moderate'
    return 'Low'
  }

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          Energy Efficiency
        </CardTitle>
        <CardDescription>
          Predicted energy metrics based on weather conditions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Efficiency */}
        <div className="rounded-lg bg-secondary/50 p-6 text-center">
          <div className="relative mx-auto mb-4 h-32 w-32">
            <svg className="h-32 w-32 -rotate-90 transform" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                className="text-border"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                strokeDasharray={`${energyPrediction.overallEfficiency * 2.51} 251`}
                className={getEfficiencyColor(energyPrediction.overallEfficiency)}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-3xl font-bold ${getEfficiencyColor(energyPrediction.overallEfficiency)}`}>
                {energyPrediction.overallEfficiency}%
              </span>
              <span className="text-xs text-muted-foreground">Overall</span>
            </div>
          </div>
          <p className={`text-lg font-semibold ${getEfficiencyColor(energyPrediction.overallEfficiency)}`}>
            {getEfficiencyLabel(energyPrediction.overallEfficiency)} Efficiency
          </p>
        </div>

        {/* Individual Metrics */}
        <div className="grid gap-4">
          {/* Solar Efficiency */}
          <div className="rounded-lg border border-border/50 bg-secondary/30 p-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sun className="h-5 w-5 text-warning" />
                <span className="font-medium">Solar Efficiency</span>
              </div>
              <span className={`font-mono font-bold ${getEfficiencyColor(energyPrediction.solarEfficiency)}`}>
                {energyPrediction.solarEfficiency}%
              </span>
            </div>
            <Progress value={energyPrediction.solarEfficiency} className="h-2" />
          </div>

          {/* Wind Efficiency */}
          <div className="rounded-lg border border-border/50 bg-secondary/30 p-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wind className="h-5 w-5 text-chart-1" />
                <span className="font-medium">Wind Efficiency</span>
              </div>
              <span className={`font-mono font-bold ${getEfficiencyColor(energyPrediction.windEfficiency)}`}>
                {energyPrediction.windEfficiency}%
              </span>
            </div>
            <Progress value={energyPrediction.windEfficiency} className="h-2" />
          </div>

          {/* Predicted Consumption */}
          <div className="rounded-lg border border-border/50 bg-secondary/30 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-accent" />
                <span className="font-medium">Predicted Consumption</span>
              </div>
              <span className="font-mono font-bold text-foreground">
                {energyPrediction.consumption} kWh
              </span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Based on similar historical conditions
            </p>
          </div>
        </div>

        {/* Trend Indicator */}
        <div className="flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 p-3">
          <TrendingUp className="h-5 w-5 text-primary" />
          <p className="text-sm text-foreground">
            {energyPrediction.solarEfficiency > energyPrediction.windEfficiency
              ? 'Solar energy is the primary renewable source for these conditions'
              : 'Wind energy is the primary renewable source for these conditions'}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
