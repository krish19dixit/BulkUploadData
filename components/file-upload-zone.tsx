"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, FileText, AlertCircle } from "lucide-react"

interface FileUploadZoneProps {
  onFilesSelected: (files: File[]) => void
  uploadedCount: number
}

export default function FileUploadZone({ onFilesSelected, uploadedCount }: FileUploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validateFiles = (files: File[]) => {
    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ]

    const validFiles = files.filter((file) => {
      if (!validTypes.includes(file.type)) {
        setError(`Invalid file type: ${file.name}`)
        return false
      }
      if (file.size > 50 * 1024 * 1024) {
        setError(`File too large: ${file.name} (max 50MB)`)
        return false
      }
      return true
    })

    return validFiles
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
    setError("")
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const files = Array.from(e.dataTransfer.files)
    const validFiles = validateFiles(files)
    if (validFiles.length > 0) {
      onFilesSelected(validFiles)
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.currentTarget.files || [])
    const validFiles = validateFiles(files)
    if (validFiles.length > 0) {
      onFilesSelected(validFiles)
      setError("")
    }
  }

  return (
    <div className="space-y-4">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative rounded-xl border-2 border-dashed p-12 text-center transition-all ${
          isDragging
            ? "border-primary bg-primary/5"
            : "border-border bg-secondary/20 hover:border-primary/50 hover:bg-primary/5"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileInput}
          accept=".pdf,.doc,.docx,.txt"
          className="hidden"
        />

        <div className="space-y-3">
          <div className="flex justify-center">
            <div className="rounded-full bg-primary/10 p-4">
              <Upload className="h-6 w-6 text-primary" />
            </div>
          </div>

          <div>
            <p className="text-lg font-semibold text-foreground">Drop your CV files here</p>
            <p className="text-sm text-muted-foreground">
              or{" "}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="font-semibold text-primary hover:underline"
              >
                browse to select
              </button>
            </p>
          </div>

          <p className="text-xs text-muted-foreground">
            Supports PDF, DOCX, DOC, and TXT • Max 50MB per file • Up to 5000+ files
          </p>
        </div>
      </div>

      {error && (
        <div className="flex gap-3 rounded-lg border border-destructive/30 bg-destructive/10 p-4">
          <AlertCircle className="h-5 w-5 flex-shrink-0 text-destructive" />
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      {uploadedCount > 0 && (
        <div className="flex items-center justify-between rounded-lg bg-card px-4 py-3">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{uploadedCount}</span> file{uploadedCount !== 1 ? "s" : ""}{" "}
            ready for processing
          </p>
          <FileText className="h-4 w-4 text-primary" />
        </div>
      )}
    </div>
  )
}
