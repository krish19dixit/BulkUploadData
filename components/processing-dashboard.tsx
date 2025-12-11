"use client"

import { useState, useEffect } from "react"
import { CheckCircle2, AlertCircle, Clock, RotateCcw, Pause as Pause2, Play } from "lucide-react"

interface ProcessingDashboardProps {
  files: File[]
}

interface FileStatus {
  name: string
  status: "pending" | "processing" | "completed" | "failed"
  progress: number
  timestamp: string
}

export default function ProcessingDashboard({ files }: ProcessingDashboardProps) {
  const [fileStatuses, setFileStatuses] = useState<FileStatus[]>(
    files.map((file) => ({
      name: file.name,
      status: "pending",
      progress: 0,
      timestamp: new Date().toISOString(),
    })),
  )
  const [isPaused, setIsPaused] = useState(false)

  // Simulate file processing
  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      setFileStatuses((prev) =>
        prev.map((file) => {
          if (file.status === "completed" || file.status === "failed") {
            return file
          }

          const newProgress = file.progress + Math.random() * 30

          if (newProgress >= 100) {
            // Random 10% failure rate
            const isSuccess = Math.random() > 0.1
            return {
              ...file,
              progress: 100,
              status: isSuccess ? "completed" : "failed",
              timestamp: new Date().toISOString(),
            }
          }

          return {
            ...file,
            progress: Math.min(newProgress, 99),
            status: file.status === "pending" ? "processing" : file.status,
            timestamp: new Date().toISOString(),
          }
        }),
      )
    }, 500)

    return () => clearInterval(interval)
  }, [isPaused])

  const completed = fileStatuses.filter((f) => f.status === "completed").length
  const failed = fileStatuses.filter((f) => f.status === "failed").length
  const processing = fileStatuses.filter((f) => f.status === "processing").length

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />
      case "failed":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      case "processing":
        return <Clock className="h-5 w-5 text-yellow-500 animate-spin" />
      default:
        return <Clock className="h-5 w-5 text-muted-foreground" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex gap-3">
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="flex items-center gap-2 rounded-lg border border-border bg-secondary/30 px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary/50 transition-colors"
        >
          {isPaused ? (
            <>
              <Play className="h-4 w-4" />
              Resume
            </>
          ) : (
            <>
              <Pause2 className="h-4 w-4" />
              Pause
            </>
          )}
        </button>
        <button className="flex items-center gap-2 rounded-lg border border-border bg-secondary/30 px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary/50 transition-colors">
          <RotateCcw className="h-4 w-4" />
          Retry Failed
        </button>
        <button className="ml-auto rounded-lg border border-border bg-secondary/30 px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary/50 transition-colors">
          Download Report
        </button>
      </div>

      {/* Stats Bar */}
      <div className="flex gap-4 rounded-lg bg-card p-4">
        <div className="flex-1">
          <p className="text-xs text-muted-foreground">Processing Speed</p>
          <p className="mt-1 text-lg font-semibold text-foreground">
            {processing > 0 ? Math.ceil(processing) : 0} file{processing !== 1 ? "s" : ""}/min
          </p>
        </div>
        <div className="flex-1 border-l border-border pl-4">
          <p className="text-xs text-muted-foreground">Completed</p>
          <p className="mt-1 text-lg font-semibold text-green-500">
            {completed}/{fileStatuses.length}
          </p>
        </div>
        <div className="flex-1 border-l border-border pl-4">
          <p className="text-xs text-muted-foreground">Failed</p>
          <p className="mt-1 text-lg font-semibold text-red-500">{failed}</p>
        </div>
        <div className="flex-1 border-l border-border pl-4">
          <p className="text-xs text-muted-foreground">ETA</p>
          <p className="mt-1 text-lg font-semibold text-foreground">
            ~{Math.max(0, Math.ceil((fileStatuses.length - completed - failed) / Math.max(processing, 1)))}m
          </p>
        </div>
      </div>

      {/* File List */}
      <div className="rounded-lg border border-border bg-card">
        <div className="border-b border-border px-6 py-4">
          <h3 className="font-semibold text-foreground">Processing Queue</h3>
        </div>

        <div className="divide-y divide-border">
          {fileStatuses.map((file, idx) => (
            <div key={idx} className="px-6 py-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {getStatusIcon(file.status)}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {file.status === "completed"
                        ? "Successfully processed"
                        : file.status === "failed"
                          ? "Failed to process"
                          : file.status === "processing"
                            ? "Processing..."
                            : "Waiting in queue"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-32">
                    <div className="h-2 w-full rounded-full bg-border">
                      <div
                        className="h-full rounded-full bg-primary transition-all duration-300"
                        style={{ width: `${file.progress}%` }}
                      />
                    </div>
                    <p className="mt-1 text-right text-xs font-medium text-muted-foreground">
                      {Math.round(file.progress)}%
                    </p>
                  </div>

                  {file.status === "failed" && (
                    <button className="rounded px-2 py-1 text-xs font-medium text-primary hover:bg-primary/10">
                      Retry
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
