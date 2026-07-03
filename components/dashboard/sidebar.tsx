"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Zap,
  Cloud,
  BarChart3,
  TrendingUp,
  Settings,
  Database,
  Activity,
  Sun,
  Thermometer,
  Wind,
  Droplets,
} from "lucide-react"

const menuItems = [
  {
    title: "Overview",
    items: [
      { icon: LayoutDashboard, label: "Dashboard", active: true },
      { icon: Activity, label: "Real-time Data" },
    ],
  },
  {
    title: "Energy",
    items: [
      { icon: Zap, label: "Consumption" },
      { icon: TrendingUp, label: "Predictions" },
      { icon: BarChart3, label: "Analytics" },
      { icon: Database, label: "Historical Data" },
    ],
  },
  {
    title: "Weather",
    items: [
      { icon: Cloud, label: "Current Weather" },
      { icon: Sun, label: "Forecast" },
      { icon: Thermometer, label: "Temperature" },
      { icon: Wind, label: "Wind Speed" },
      { icon: Droplets, label: "Humidity" },
    ],
  },
  {
    title: "Settings",
    items: [
      { icon: Settings, label: "Preferences" },
    ],
  },
]

export function Sidebar() {
  const [activeItem, setActiveItem] = useState("Dashboard")

  return (
    <aside className="hidden w-64 flex-shrink-0 border-r border-border bg-sidebar lg:block">
      <div className="flex h-full flex-col py-4">
        {menuItems.map((section) => (
          <div key={section.title} className="mb-4 px-4">
            <h3 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {section.title}
            </h3>
            <nav className="space-y-1">
              {section.items.map((item) => (
                <button
                  key={item.label}
                  onClick={() => setActiveItem(item.label)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                    activeItem === item.label
                      ? "bg-sidebar-accent text-sidebar-primary"
                      : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        ))}
      </div>
    </aside>
  )
}
