"use client"

import { Cloud, Zap, BarChart3 } from "lucide-react"

export function Header() {
  return (
    <header className="border-b border-border/50 bg-card/30 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Zap className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">EnergyPredict</h1>
            <p className="text-xs text-muted-foreground">Weather & Energy Forecasting</p>
          </div>
        </div>
        
        <nav className="hidden items-center gap-6 md:flex">
          <a href="#" className="flex items-center gap-2 text-sm font-medium text-primary">
            <BarChart3 className="h-4 w-4" />
            Predictions
          </a>
          <a href="#" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground">
            <Cloud className="h-4 w-4" />
            Weather
          </a>
          <a href="#" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground">
            <Zap className="h-4 w-4" />
            Energy
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <span className="hidden rounded-full bg-success/10 px-3 py-1 text-xs font-medium text-success sm:inline-flex">
            System Online
          </span>
        </div>
      </div>
    </header>
  )
}
