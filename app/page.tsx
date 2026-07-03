"use client"

import { useState } from "react"
import { Header } from "@/components/prediction/header"
import { InputForm } from "@/components/prediction/input-form"
import { WeatherResult } from "@/components/prediction/weather-result"
import { EnergyResult } from "@/components/prediction/energy-result"
import { Recommendations } from "@/components/prediction/recommendations"
import { HistoryChart } from "@/components/prediction/history-chart"
import { predictWeatherAndEnergy, type PredictionInput, type PredictionResult } from "@/lib/prediction-data"

export default function PredictionPage() {
  const [result, setResult] = useState<PredictionResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handlePredict = (input: PredictionInput) => {
    setIsLoading(true)
    
    // Simulate API call delay for better UX
    setTimeout(() => {
      const prediction = predictWeatherAndEnergy(input)
      setResult(prediction)
      setIsLoading(false)
    }, 800)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page Title */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground">
            Weather & Energy Prediction
          </h2>
          <p className="mt-1 text-muted-foreground">
            Input environmental parameters to predict weather conditions and energy efficiency based on historical data patterns
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Input Form - Left Column */}
          <div className="lg:col-span-1">
            <InputForm onPredict={handlePredict} isLoading={isLoading} />
          </div>

          {/* Results - Right Columns */}
          <div className="space-y-6 lg:col-span-2">
            <div className="grid gap-6 md:grid-cols-2">
              <WeatherResult result={result} />
              <EnergyResult result={result} />
            </div>
            <Recommendations result={result} />
          </div>
        </div>

        {/* Historical Data Chart */}
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <HistoryChart />
          
          {/* Quick Stats */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Database className="h-5 w-5 text-primary" />
                Training Data Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-secondary/50 p-4">
                <p className="text-2xl font-bold text-foreground">24</p>
                <p className="text-sm text-muted-foreground">Historical data points</p>
              </div>
              <div className="rounded-lg bg-secondary/50 p-4">
                <p className="text-2xl font-bold text-foreground">12</p>
                <p className="text-sm text-muted-foreground">Months of coverage</p>
              </div>
              <div className="rounded-lg bg-secondary/50 p-4">
                <p className="text-2xl font-bold text-foreground">5</p>
                <p className="text-sm text-muted-foreground">Input parameters</p>
              </div>
              <div className="rounded-lg bg-secondary/50 p-4">
                <p className="text-2xl font-bold text-foreground">K-NN</p>
                <p className="text-sm text-muted-foreground">Prediction algorithm</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer Info */}
        <div className="mt-8 rounded-lg border border-border/50 bg-card/30 p-6">
          <h3 className="mb-2 font-semibold text-foreground">How It Works</h3>
          <p className="text-sm text-muted-foreground">
            This prediction system uses a K-Nearest Neighbors (KNN) algorithm trained on historical weather and energy data. 
            By analyzing patterns from past conditions including temperature, humidity, wind speed, and atmospheric pressure, 
            the model predicts weather probabilities (clear, cloudy, rainy, stormy) and estimates energy efficiency metrics 
            for solar and wind power generation. The confidence score reflects how closely your input matches historical patterns.
          </p>
        </div>
      </main>
    </div>
  )
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Database } from "lucide-react"
