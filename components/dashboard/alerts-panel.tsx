"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Info, CheckCircle, XCircle } from "lucide-react"

const alerts = [
  {
    id: 1,
    type: "warning",
    title: "High Demand Expected",
    message: "Energy demand predicted to peak at 18:00 today. Consider load balancing.",
    time: "2 min ago",
    icon: AlertTriangle,
  },
  {
    id: 2,
    type: "info",
    title: "Weather Update",
    message: "Storm system approaching. Wind power generation may increase by 15%.",
    time: "15 min ago",
    icon: Info,
  },
  {
    id: 3,
    type: "success",
    title: "Prediction Accuracy",
    message: "Model accuracy improved to 97.2% over the last 24 hours.",
    time: "1 hour ago",
    icon: CheckCircle,
  },
  {
    id: 4,
    type: "error",
    title: "Sensor Offline",
    message: "Grid sensor #42 is not responding. Maintenance team notified.",
    time: "3 hours ago",
    icon: XCircle,
  },
]

const typeStyles = {
  warning: "border-l-warning text-warning",
  info: "border-l-chart-3 text-chart-3",
  success: "border-l-success text-success",
  error: "border-l-destructive text-destructive",
}

const badgeVariants = {
  warning: "bg-warning/10 text-warning border-warning/20",
  info: "bg-chart-3/10 text-chart-3 border-chart-3/20",
  success: "bg-success/10 text-success border-success/20",
  error: "bg-destructive/10 text-destructive border-destructive/20",
}

export function AlertsPanel() {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg font-semibold text-foreground">
            System Alerts
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Recent notifications and warnings
          </p>
        </div>
        <Badge variant="outline" className="bg-secondary">
          {alerts.length} Active
        </Badge>
      </CardHeader>
      <CardContent className="space-y-3">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`rounded-lg border-l-4 bg-secondary/50 p-4 ${typeStyles[alert.type as keyof typeof typeStyles].split(" ")[0]}`}
          >
            <div className="flex items-start gap-3">
              <alert.icon className={`h-5 w-5 mt-0.5 ${typeStyles[alert.type as keyof typeof typeStyles].split(" ")[1]}`} />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-foreground">{alert.title}</h4>
                  <span className="text-xs text-muted-foreground">{alert.time}</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{alert.message}</p>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
