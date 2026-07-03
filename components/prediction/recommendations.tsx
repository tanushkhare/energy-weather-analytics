"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Lightbulb, CheckCircle } from "lucide-react"
import type { PredictionResult } from "@/lib/prediction-data"

interface RecommendationsProps {
  result: PredictionResult | null
}

export function Recommendations({ result }: RecommendationsProps) {
  if (!result || result.recommendations.length === 0) {
    return (
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-warning" />
            Recommendations
          </CardTitle>
          <CardDescription>
            AI-powered suggestions based on predicted conditions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex h-24 items-center justify-center text-muted-foreground">
            <p>Generate a prediction to see recommendations</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-warning" />
          Recommendations
        </CardTitle>
        <CardDescription>
          AI-powered suggestions based on predicted conditions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {result.recommendations.map((recommendation, index) => (
            <li 
              key={index}
              className="flex items-start gap-3 rounded-lg border border-border/50 bg-secondary/30 p-3"
            >
              <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-success" />
              <span className="text-sm text-foreground">{recommendation}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
