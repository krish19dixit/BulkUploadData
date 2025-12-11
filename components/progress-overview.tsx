"use client"

import { BarChart3, CheckCircle2, Clock, AlertCircle } from "lucide-react"

interface ProgressOverviewProps {
  fileCount: number
}

export default function ProgressOverview({ fileCount }: ProgressOverviewProps) {
  const stats = [
    {
      label: "Total Files",
      value: fileCount,
      icon: BarChart3,
      color: "text-primary",
    },
    {
      label: "Processing",
      value: Math.ceil(fileCount * 0.3),
      icon: Clock,
      color: "text-yellow-500",
    },
    {
      label: "Completed",
      value: Math.ceil(fileCount * 0.5),
      icon: CheckCircle2,
      color: "text-green-500",
    },
    {
      label: "Failed",
      value: Math.max(0, fileCount - Math.ceil(fileCount * 0.8)),
      icon: AlertCircle,
      color: "text-red-500",
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="mt-2 text-3xl font-bold text-foreground">{stat.value}</p>
            </div>
            <stat.icon className={`h-8 w-8 ${stat.color}`} />
          </div>
        </div>
      ))}
    </div>
  )
}
